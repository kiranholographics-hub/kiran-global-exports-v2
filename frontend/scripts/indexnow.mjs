// Tells search engines which pages a deploy added or changed, via IndexNow.
//
//   node scripts/indexnow.mjs <sitemap before the deploy> <sitemap after>
//
// Bing, Yandex, Seznam and Naver read IndexNow and usually crawl a
// submitted URL within hours instead of waiting for their next pass over
// the sitemap. Google does not take part — it still finds new pages through
// the sitemap and Search Console — so this adds to that, it does not
// replace it.
//
// Only the URLs that are new, or whose <lastmod> changed, are sent:
// submitting the whole site on every deploy is the pattern IndexNow asks
// sites not to follow. The key is the <key>.txt file in public/, which the
// deploy ships to the site root, where the engines check it.

import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = 'www.kiranglobal-exports.com';
const publicDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');

const keyFile = readdirSync(publicDir).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('no IndexNow key file (<32 hex characters>.txt) in public/');
const key = keyFile.slice(0, -4);

// loc -> lastmod (or null).
function entries(file) {
  const xml = readFileSync(file, 'utf-8');
  const map = new Map();
  for (const [, block] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = /<loc>([^<]+)<\/loc>/.exec(block)?.[1];
    if (loc) map.set(loc, /<lastmod>([^<]+)<\/lastmod>/.exec(block)?.[1] ?? null);
  }
  return map;
}

const [beforeFile, afterFile] = process.argv.slice(2);
if (!beforeFile || !afterFile) throw new Error('usage: indexnow.mjs <sitemap before> <sitemap after>');

const before = entries(beforeFile);
const after = entries(afterFile);
const urlList = [...after]
  .filter(([loc, lastmod]) => !before.has(loc) || before.get(loc) !== lastmod)
  .map(([loc]) => loc);

if (!urlList.length) {
  console.log('No new or changed URLs in the sitemap — nothing to submit.');
  process.exit(0);
}

console.log(`Submitting ${urlList.length} URLs:`);
urlList.forEach((u) => console.log(`  ${u}`));

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key,
    keyLocation: `https://${HOST}/${keyFile}`,
    urlList,
  }),
  signal: AbortSignal.timeout(30_000),
});
// 200 and 202 both mean accepted (202: the key is still being checked).
console.log(`IndexNow answered HTTP ${res.status}`);
if (res.status !== 200 && res.status !== 202) process.exit(1);
