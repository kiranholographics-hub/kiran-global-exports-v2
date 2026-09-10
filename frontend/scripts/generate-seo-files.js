// Runs before `vite build` (see package.json "build" script). Writes
// public/sitemap.xml from the same structured product data the site
// renders from, so it lands in dist/ automatically when Vite copies
// public/ verbatim. This is a pure client-rendered SPA (no server-side
// rendering), so a build-time static sitemap is the practical approach —
// it's regenerated fresh on every build.
//
// Only pages that are actually indexable go in here. Towels, Rugs,
// Collections and Linen (plus every individual product page under them)
// carry <SEO noindex> — the old kiranglobalexports.com site already ranks
// for those exact product keywords, so indexing the same content twice
// would have the two sites competing with each other. Keep this list in
// sync with whichever pages still have noindex removed.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { siteConfig } from '../src/data/config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, '../public/sitemap.xml');

const routes = [
  { path: '', priority: '1.0' },
  { path: '/about', priority: '0.8' },
  { path: '/custom', priority: '0.7' },
  { path: '/export', priority: '0.7' },
  { path: '/australia', priority: '0.7' },
  { path: '/contact', priority: '0.9' },
  { path: '/privacy-policy', priority: '0.3' },
  { path: '/terms-and-conditions', priority: '0.3' },
];

const urls = routes
  .map(
    ({ path: route, priority }) =>
      `  <url>\n    <loc>${siteConfig.siteUrl}${route}</loc>\n    <priority>${priority}</priority>\n  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

writeFileSync(outPath, xml, 'utf-8');
console.log(`[generate-seo-files] wrote ${routes.length} indexable routes to public/sitemap.xml`);
