// Runs before `vite build` (see package.json "build" script). Writes
// public/sitemap.xml from the same structured product data the site
// renders from, so it lands in dist/ automatically when Vite copies
// public/ verbatim. This is a pure client-rendered SPA (no server-side
// rendering), so a build-time static sitemap is the practical approach —
// it's regenerated fresh on every build.
//
// Only pages that are actually indexable go in here.
//
// The catalogue — Towels, Linen, Collections and every category and
// product page under them — used to be excluded and marked <SEO
// noindex>, to keep this site from competing with the old
// kiranglobalexports.com, which already ranked for those exact product
// keywords. That call was reversed: this site is the one being ranked
// now, so the noindex came off and the routes are listed below.
//
// Two consequences worth knowing. Both sites now target the same
// product keywords, so which page Google prefers is out of our hands
// until the old site redirects here or points its canonical tags this
// way. And catalogue pages read the API at runtime, so they carry real
// content for a crawler only because the deploy workflow prerenders
// them (see src/data/deployRoutes.js) — a route listed here that the
// workflow does not render would submit an empty shell.
//
// The legal pages keep their noindex and are deliberately NOT listed:
// a URL that is in the sitemap and noindex at the same time is
// reported as an error in Search Console, which is noise in exactly
// the report used to check on everything else.
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
import { SEO_LANDING_ROUTES } from '../src/data/seoLandingPages.js';
import { TOWEL_CATEGORY_ROUTES, TOWEL_PRODUCT_ROUTES } from '../src/data/deployRoutes.js';
import { linenProducts } from '../src/data/linenCatalog.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, '../public/sitemap.xml');

// Derived the same way the deploy workflow derives what it renders, so a
// product added to the catalogue is listed here and prerendered without
// either list being edited.
const LINEN_CATEGORY_ROUTES = [
  ...new Set(linenProducts.map((item) => `/linen/${item.subcategory}`)),
];
const LINEN_PRODUCT_ROUTES = linenProducts.map(
  (item) => `/linen/${item.subcategory}/${item.slug}`
);

const STATIC_ROUTES = [
  { path: '', priority: '1.0' },
  { path: '/about', priority: '0.8' },
  { path: '/custom', priority: '0.7' },
  { path: '/export', priority: '0.7' },
  { path: '/contact', priority: '0.9' },
  // Search-led landing pages — these are the pages we actively want
  // ranking for sourcing queries, so they sit just under /contact.
  ...SEO_LANDING_ROUTES.map((route) => ({ path: route, priority: '0.8' })),
  // Catalogue. Listing pages above their categories, categories above
  // individual products — the priority is only a hint about which of our
  // own pages matters more to us, not a ranking lever.
  { path: '/towels', priority: '0.8' },
  { path: '/linen', priority: '0.8' },
  { path: '/collections', priority: '0.7' },
  ...TOWEL_CATEGORY_ROUTES.map((route) => ({ path: route, priority: '0.7' })),
  ...LINEN_CATEGORY_ROUTES.map((route) => ({ path: route, priority: '0.7' })),
  ...TOWEL_PRODUCT_ROUTES.map((route) => ({ path: route, priority: '0.6' })),
  ...LINEN_PRODUCT_ROUTES.map((route) => ({ path: route, priority: '0.6' })),
];

// process.env, not import.meta.env — this is a plain Node script run
// outside Vite's transform pipeline, so it reads the raw environment
// variable the build container sets rather than Vite's client-side
// injected version.
const API_BASE = process.env.VITE_API_URL || 'https://api.kiranglobal-exports.com';

// Published updates, the same way: /hq is where they are written, so the
// list only exists in the database. Without this an article could be
// published and sit there with nothing telling Google it exists.
async function fetchUpdateRoutes() {
  try {
    const res = await fetch(`${API_BASE}/api/updates`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const updates = await res.json();
    if (!updates.length) return [];
    return [
      { path: '/updates', priority: '0.6' },
      ...updates.map((u) => ({ path: `/updates/${u.slug}`, priority: '0.6' })),
    ];
  } catch (err) {
    console.warn(`[generate-seo-files] could not fetch updates (${err.message}) — sitemap will omit them this build.`);
    return [];
  }
}

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
  const [marketRoutes, updateRoutes] = await Promise.all([
    fetchActiveMarketRoutes(),
    fetchUpdateRoutes(),
  ]);
  const routes = [...STATIC_ROUTES, ...marketRoutes, ...updateRoutes];

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
