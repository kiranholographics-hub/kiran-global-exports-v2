// Production static server for the built React (Vite) app. This is what
// makes the frontend "plain Node.js" end to end: `npm run build` compiles
// the SPA into dist/, then `npm run serve` boots this Express server to
// serve it — no Next.js runtime involved anywhere.
//
// For local development, `npm run dev` (Vite's own dev server, also
// Node.js) is faster — hot module reload, no rebuild step. Use this
// server for anything that should look like production: testing the real
// build output, or actually deploying.

import express from 'express';
import compression from 'compression';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 3000;
const API_BASE = process.env.VITE_API_URL || 'https://api.kiranglobal-exports.com';

const app = express();

app.use(compression());
app.use(express.static(DIST_DIR, { index: false }));

// Known top-level SPA routes (see App.jsx) — anything under one of these
// is either a real static page or a deep link React Router resolves
// client-side (product slugs etc. aren't re-validated here). A single
// path segment that ISN'T one of these might still be a live market page
// (/usa, /australia, ...), which is data-driven and can't be hardcoded —
// so that one case is checked against the API below instead of assumed.
const KNOWN_TOP_LEVEL_ROUTES = new Set([
  'about', 'towels', 'linen', 'collections', 'export', 'custom',
  'contact', 'updates', 'pages', 'privacy-policy', 'terms-and-conditions', 'hq',
]);

// Cached so a real 404 doesn't cost an API round trip on every request —
// refreshed periodically since markets can be activated/deactivated from
// /hq without a redeploy.
let marketSlugsCache = new Set();
async function refreshMarketSlugs() {
  try {
    const res = await fetch(`${API_BASE}/api/markets/public`);
    if (!res.ok) return;
    const markets = await res.json();
    marketSlugsCache = new Set(markets.map((m) => m.slug));
  } catch (err) {
    console.error('[frontend] could not refresh market slugs:', err.message);
  }
}
refreshMarketSlugs();
setInterval(refreshMarketSlugs, 10 * 60 * 1000).unref();

// Client-side routing (React Router) — any non-file route falls back to
// index.html so deep links like /towels/classic-bath-towel work on a
// hard refresh.
//
// If `scripts/prerender.mjs` has run, some routes (the indexable ones —
// see public/sitemap.xml) have their own real, fully-rendered
// dist/<route>/index.html instead of the generic shell. Serve that
// specific file when it exists so crawlers get real content immediately;
// fall back to the plain SPA shell for every other route.
app.use((req, res) => {
  const segments = req.path.split('/').filter(Boolean);
  const isKnownRoute =
    segments.length === 0 ||
    KNOWN_TOP_LEVEL_ROUTES.has(segments[0]) ||
    (segments.length === 1 && marketSlugsCache.has(segments[0]));

  const prerendered = path.join(DIST_DIR, req.path, 'index.html');
  if (fs.existsSync(prerendered)) {
    return res.sendFile(prerendered);
  }

  // Genuinely unknown paths get a real 404 status — the SPA shell still
  // renders (React Router's own catch-all <NotFound> route), but a
  // crawler correctly sees this as "not a page" instead of a soft-404.
  res.status(isKnownRoute ? 200 : 404).sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[frontend] Kiran Global Exports serving dist/ on port ${PORT}`);
  console.log('[frontend] Run `npm run build` first if dist/ does not exist yet.');
});
