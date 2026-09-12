// Runs before `vite build` (see package.json "build" script). Writes
// public/sitemap.xml from the same structured product data the site
// renders from, so it lands in dist/ automatically when Vite copies
// public/ verbatim. This is a pure client-rendered SPA (no server-side
// rendering), so a build-time static sitemap is the practical approach —
// it's regenerated fresh on every build.
//
// Only pages that are actually indexable go in here. Towels,
// Collections and Linen (plus every individual product page under them)
// carry <SEO noindex> — the old kiranglobalexports.com site already ranks
// for those exact product keywords, so indexing the same content twice
// would have the two sites competing with each other. Keep this list in
// sync with whichever pages still have noindex removed.
//
// Market pages (/australia, /usa, ...) are added dynamically below by
// fetching the live list of ACTIVE markets from the production API —
// activating a new market in /hq is what gets it into the sitemap, no
// code change needed. If that fetch fails (network blip in the build
// container), this warns and continues with the static list only rather
// than failing the whole build — a transient miss here self-corrects on
// the next successful deploy, whereas hard-failing every build over one
// bad network call would block unrelated fixes too.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { siteConfig } from '../src/data/config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, '../public/sitemap.xml');

const STATIC_ROUTES = [
  { path: '', priority: '1.0' },
  { path: '/about', priority: '0.8' },
  { path: '/custom', priority: '0.7' },
  { path: '/export', priority: '0.7' },
  { path: '/contact', priority: '0.9' },
  { path: '/privacy-policy', priority: '0.3' },
  { path: '/terms-and-conditions', priority: '0.3' },
];

// process.env, not import.meta.env — this is a plain Node script run
// outside Vite's transform pipeline, so it reads the raw environment
// variable the build container sets rather than Vite's client-side
// injected version.
const API_BASE = process.env.VITE_API_URL || 'https://api.kiranglobal-exports.com';

async function fetchActiveMarketRoutes() {
  try {
    const res = await fetch(`${API_BASE}/api/markets/public`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const markets = await res.json();
    return markets.map((m) => ({ path: `/${m.slug}`, priority: '0.7' }));
  } catch (err) {
    console.warn(`[generate-seo-files] could not fetch active markets (${err.message}) — sitemap will omit market pages this build.`);
    return [];
  }
}

async function main() {
  const routes = [...STATIC_ROUTES, ...(await fetchActiveMarketRoutes())];

  const urls = routes
    .map(
      ({ path: route, priority }) =>
        `  <url>\n    <loc>${siteConfig.siteUrl}${route}</loc>\n    <priority>${priority}</priority>\n  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  writeFileSync(outPath, xml, 'utf-8');
  console.log(`[generate-seo-files] wrote ${routes.length} indexable routes to public/sitemap.xml`);
}

main();
