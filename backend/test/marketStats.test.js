import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeCountry,
  normalizePath,
  buildMarketStats,
  cleanFaqs,
  cleanParagraphs,
} from '../src/marketStats.js';

test('normalizeCountry folds the usual spellings together', () => {
  assert.equal(normalizeCountry('USA'), 'united states');
  assert.equal(normalizeCountry('  The United States '), 'united states');
  assert.equal(normalizeCountry('U.S.A.'), 'united states');
  assert.equal(normalizeCountry('UK'), 'united kingdom');
  assert.equal(normalizeCountry('UAE'), 'united arab emirates');
  assert.equal(normalizeCountry('Australia'), 'australia');
  assert.equal(normalizeCountry(undefined), '');
});

test('normalizePath drops query, hash and trailing slash', () => {
  assert.equal(normalizePath('/usa/?utm_source=x'), '/usa');
  assert.equal(normalizePath('/Export/USA-cotton-towel-supplier/#faq'), '/export/usa-cotton-towel-supplier');
  assert.equal(normalizePath('/'), '/');
  assert.equal(normalizePath(''), '/');
});

test('buildMarketStats merges enquiry spellings and both market pages', () => {
  const markets = [
    { id: 'm1', slug: 'usa', countryName: 'United States', countryCode: 'US' },
    { id: 'm2', slug: 'australia', countryName: 'Australia', countryCode: 'AU' },
    { id: 'm3', slug: 'poland', countryName: 'Poland', countryCode: 'PL' },
  ];
  const enquiryGroups = [
    { country: 'usa', total: 3, last30: 1, lastAt: '2026-10-01T00:00:00Z' },
    { country: 'united states', total: 2, last30: 2, lastAt: '2026-10-20T00:00:00Z' },
    { country: 'australia', total: 4, last30: 0, lastAt: '2026-08-01T00:00:00Z' },
  ];
  const pathGroups = [
    { path: '/usa', total: 10, last30: 4 },
    { path: '/usa/', total: 5, last30: 1 },
    { path: '/export/usa-cotton-towel-supplier', total: 7, last30: 3 },
    { path: '/australia?x=1', total: 2, last30: 2 },
    { path: '/towels', total: 99, last30: 50 },
  ];
  const countryGroups = [
    { countryCode: 'US', total: 40, last30: 12 },
    { countryCode: 'us', total: 1, last30: 1 },
    { countryCode: 'AU', total: 6, last30: 0 },
  ];

  const stats = buildMarketStats(markets, enquiryGroups, pathGroups, countryGroups);

  assert.deepEqual(stats.m1.enquiries, { total: 5, last30: 3, lastAt: '2026-10-20T00:00:00Z' });
  assert.deepEqual(stats.m1.pageViews, { total: 22, last30: 8 });
  assert.deepEqual(stats.m1.visitsFromCountry, { total: 41, last30: 13 });

  assert.deepEqual(stats.m2.enquiries, { total: 4, last30: 0, lastAt: '2026-08-01T00:00:00Z' });
  assert.deepEqual(stats.m2.pageViews, { total: 2, last30: 2 });

  // A market with no activity still gets a zeroed entry.
  assert.deepEqual(stats.m3.enquiries, { total: 0, last30: 0, lastAt: null });
  assert.deepEqual(stats.m3.pageViews, { total: 0, last30: 0 });
  assert.deepEqual(stats.m3.visitsFromCountry, { total: 0, last30: 0 });
});

test('cleanFaqs strips tags, drops incomplete rows and caps the list', () => {
  const out = cleanFaqs([
    { q: ' Which <b>ports</b>? ', a: 'Sydney and Melbourne.' },
    { q: 'Missing answer', a: '' },
    { q: '', a: 'Missing question' },
    null,
  ]);
  assert.deepEqual(out, [{ q: 'Which bports/b?', a: 'Sydney and Melbourne.' }]);
  assert.equal(cleanFaqs('nope').length, 0);
  const many = Array.from({ length: 30 }, (_, i) => ({ q: `q${i}`, a: `a${i}` }));
  assert.equal(cleanFaqs(many).length, 12);
});

test('cleanParagraphs trims, drops blanks and caps the list', () => {
  assert.deepEqual(cleanParagraphs(['  one  ', '', '<two>']), ['one', 'two']);
  assert.equal(cleanParagraphs(Array.from({ length: 20 }, (_, i) => `p${i}`)).length, 8);
});
