// Whether the live site is behind the database: a guide or market page
// published, changed or removed in /hq since the last deploy.
//
// Guides and market pages are written in /hq, but only reach the site as
// prerendered pages when the deploy workflow runs. The scheduled deploy
// runs this first and only rebuilds when it reports a difference, so a
// guide published in /hq goes live by the next morning without anyone
// starting a deploy, and a day with nothing new costs nothing.
//
// Compares the API with the live sitemap, which the deploy writes from the
// same API. Prints what differs and writes deploy=true|false to
// $GITHUB_OUTPUT when that is set. Exits non-zero if the API or the site
// cannot be read — a deploy then is the one thing not to do (see
// REQUIRE_API in generate-seo-files.js).

import { appendFileSync } from 'node:fs';

const API = process.env.VITE_API_URL || 'https://api.kiranglobal-exports.com';
const SITE = 'https://www.kiranglobal-exports.com';

async function get(url) {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(15_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res;
    } catch (err) {
      if (attempt >= 3) throw new Error(`${url}: ${err.message}`);
      await new Promise((resolve) => setTimeout(resolve, 10_000));
    }
  }
}

// Same date generate-seo-files.js writes as the guide's <lastmod>.
function toDate(value) {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

const [updates, markets, sitemap] = await Promise.all([
  get(`${API}/api/updates`).then((r) => r.json()),
  get(`${API}/api/markets/public`).then((r) => r.json()),
  get(`${SITE}/sitemap.xml?cachebust=${Date.now()}`).then((r) => r.text()),
]);

// loc -> lastmod (or null) for every entry in the live sitemap.
const live = new Map();
for (const [, block] of sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const loc = /<loc>([^<]+)<\/loc>/.exec(block)?.[1];
  if (loc) live.set(loc, /<lastmod>([^<]+)<\/lastmod>/.exec(block)?.[1] ?? null);
}
if (!live.size) throw new Error('the live sitemap has no entries');

const differences = [];
const guideUrls = new Set();

for (const u of updates) {
  const url = `${SITE}/updates/${u.slug}/`;
  guideUrls.add(url);
  const lastmod = toDate(u.updatedAt) || toDate(u.publishedAt);
  if (!live.has(url)) differences.push(`new guide       ${url}`);
  else if (lastmod && live.get(url) !== lastmod) differences.push(`changed guide   ${url} (${live.get(url)} -> ${lastmod})`);
}

// Only the English guide URLs: the translated ones (/es/updates/...) come
// from the repo, not /hq, and are deployed with the code that adds them.
for (const url of live.keys()) {
  if (/^https:\/\/www\.kiranglobal-exports\.com\/updates\/[^/]+\/$/.test(url) && !guideUrls.has(url)) {
    differences.push(`removed guide   ${url}`);
  }
}

for (const m of markets) {
  const url = `${SITE}/${m.slug}/`;
  if (!live.has(url)) differences.push(`new market page ${url}`);
}

console.log(`${updates.length} guides and ${markets.length} market pages in the API, ${live.size} URLs in the live sitemap.`);
if (differences.length) {
  console.log('The live site is behind /hq:');
  differences.forEach((d) => console.log(`  ${d}`));
} else {
  console.log('Nothing new since the last deploy.');
}

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `deploy=${differences.length > 0}\n`);
}
