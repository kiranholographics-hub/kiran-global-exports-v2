// ---------------------------------------------------------------------------
// Post-build prerendering script
// ---------------------------------------------------------------------------
// This project is a Vite + React Router SPA — not Next.js. Vite has no
// built-in SSR/SSG toggle, so "turn on SSR" isn't a one-line setting here.
// This script gets the same practical result a different way: after
// `vite build`, it visits every page we want Google to index in a real
// headless browser, waits for React (and the SEO component, which sets
// title/meta/canonical via useEffect) to finish rendering, and saves the
// resulting fully-rendered HTML as a static file at that route's path.
//
// The result: a crawler requesting /about gets real, complete HTML
// immediately — no JavaScript execution required on Google's end — while
// real visitors still get the normal fast client-side SPA experience
// (index.html's own JS bundle rehydrates over the static markup).
//
// Usage:
//   npm install --save-dev puppeteer
//   npm run build
//   node scripts/prerender.mjs
//
// Or wire it up as a single step: add to package.json
//   "postbuild": "node scripts/prerender.mjs"
// so it runs automatically every time `npm run build` finishes.
// ---------------------------------------------------------------------------

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import http from 'node:http';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, '..', 'dist');
// Changed from 4173 — if you've run this script before and it was ever
// interrupted (Ctrl+C, a crash) without the server shutting down
// cleanly, a stale process can keep holding the old port on Windows. A
// fresh port number sidesteps that entirely rather than trying to debug
// a zombie process.
const PORT = 4855;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
};

// Only the pages we actually want Google to index (must match
// public/sitemap.xml and each page's <SEO noindex> setting — prerendering
// a noindexed page is harmless but pointless, so keep this list in sync
// rather than trying to crawl every route automatically).
const ROUTES_TO_PRERENDER = [
  '/',
  '/about',
  '/custom',
  '/export',
  '/contact',
  '/privacy-policy',
  '/terms-and-conditions',
];

function startStaticServer() {
  return new Promise((resolve) => {
    // A deliberately minimal, fully-predictable static server — no
    // third-party routing package, no surprises. The logic is exactly:
    // real file on disk -> serve it as-is; anything else -> serve
    // index.html and let React Router take over client-side. This is
    // the same pattern the project's own production server.js already
    // uses successfully.
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      const candidate = path.join(DIST_DIR, urlPath);

      const isRealFile =
        candidate.startsWith(DIST_DIR) && // guard against path traversal
        fsSync.existsSync(candidate) &&
        fsSync.statSync(candidate).isFile();

      const filePath = isRealFile ? candidate : path.join(DIST_DIR, 'index.html');
      const ext = path.extname(filePath).toLowerCase();

      res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream');
      fsSync.createReadStream(filePath).pipe(res);
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function prerenderRoute(browser, route) {
  const page = await browser.newPage();
  const url = `http://localhost:${PORT}${route}`;

  // Block requests that don't matter for SEO content and can otherwise
  // stall navigation entirely:
  //   - hero video files (large, slow, purely decorative)
  //   - the /api/visits call (VisitTracker fires on every route; there's
  //     no backend running during a prerender build step, so this would
  //     always fail — and with strict networkidle0 below, a lingering
  //     failed/retried request can prevent navigation from ever
  //     completing, which is exactly what happened without this)
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const reqUrl = req.url();
    if (reqUrl.endsWith('.mp4') || reqUrl.includes('/api/')) {
      return req.abort();
    }
    req.continue();
  });

  // Surface anything going wrong inside the page itself — without this,
  // a JS error that silently stops the app from rendering (and therefore
  // stops the SEO component's useEffect from ever running) looks
  // identical to "just running a bit slow", which is impossible to tell
  // apart from the outside. (The video/API requests above are
  // deliberately aborted, so their console noise is expected — not
  // logged here to keep output focused on real problems.)
  page.on('pageerror', (err) => {
    console.log(`  [browser page error] ${err.message}`);
  });
  page.on('requestfailed', (req) => {
    const reason = req.failure()?.errorText;
    if (req.url().endsWith('.mp4') || req.url().includes('/api/')) return; // expected — we aborted these
    console.log(`  [request failed] ${req.url()} — ${reason}`);
  });

  const response = await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  if (response.status() >= 400) {
    console.warn(`  ! ${route} responded with HTTP ${response.status()}`);
  }

  // The SEO component sets <title>/<meta>/<link rel="canonical"> inside a
  // useEffect, which runs after the initial paint — wait for the
  // canonical link to actually exist so we don't capture the page before
  // that effect has run. No console/page errors + this still timing out
  // usually just means a slow cold-start mount (large bundle, first
  // headless launch) rather than a real bug — 30s gives it real room
  // before we fall back to capturing whatever's there.
  await page.waitForSelector('link[rel="canonical"]', { timeout: 30000 }).catch(() => {
    console.warn(`  ! canonical link never appeared for ${route} — captured anyway, please check manually`);
  });

  // Settle delay long enough for entrance animations (Framer Motion
  // fade/slide-ins on the hero, staggered content, etc.) to finish, not
  // just for the canonical tag to appear. Capturing mid-animation bakes
  // an `opacity: 0` / mid-transform inline style into the static HTML —
  // real visitors then depend entirely on hydration correctly restarting
  // that animation to ever see the content, which isn't guaranteed. 4s
  // comfortably clears every entrance transition currently on the site
  // (the latest of which finishes around 3.4s in).
  await new Promise((r) => setTimeout(r, 4000));

  const html = await page.content();

  // Definitive check, regardless of whether the wait above succeeded —
  // did the app actually mount real content, or did we just capture the
  // empty index.html shell? This is the answer that actually matters.
  const hasCanonical = html.includes('rel="canonical"');
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const title = titleMatch ? titleMatch[1] : '(no title tag found)';
  console.log(`  content check — title: "${title}" | canonical present: ${hasCanonical}`);

  await page.close();
  return html;
}

async function writeRouteHtml(route, html) {
  // "/" -> dist/index.html (already exists from the build, this overwrites
  // it with the prerendered version). "/about" -> dist/about/index.html so
  // a static file server naturally serves it for that exact path.
  const outDir = route === '/' ? DIST_DIR : path.join(DIST_DIR, route);
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf-8');
}

async function main() {
  try {
    await fs.access(DIST_DIR);
  } catch {
    console.error('dist/ not found — run `npm run build` first.');
    process.exit(1);
  }

  console.log('Starting local static server for dist/ ...');
  const server = await startStaticServer();

  console.log('Launching headless browser ...');
  const browser = await puppeteer.launch({ headless: 'new' });

  let failed = 0;
  for (const route of ROUTES_TO_PRERENDER) {
    try {
      console.log(`Prerendering ${route} ...`);
      const html = await prerenderRoute(browser, route);
      await writeRouteHtml(route, html);
      console.log(`  ✓ saved dist${route === '/' ? '/index.html' : `${route}/index.html`}`);
    } catch (err) {
      failed += 1;
      console.error(`  ✗ failed to prerender ${route}:`, err.message);
    }
  }

  await browser.close();
  server.close();

  if (failed > 0) {
    console.error(`\n${failed} route(s) failed to prerender — check the errors above.`);
    process.exit(1);
  }
  console.log('\nDone. Every route above now has real HTML in dist/, ready to deploy.');
}

main();
