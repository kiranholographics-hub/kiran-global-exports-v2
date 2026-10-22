// Pure helpers that turn raw Mongo aggregation output into per-market
// activity numbers for the /hq "Global Markets" cards. Kept free of any
// database import so it can be unit-tested with plain arrays
// (backend/test/marketStats.test.js).

// Enquiry.country is free text typed into the contact form, so "USA",
// "United States" and "the United States" all mean the same market.
const COUNTRY_ALIASES = {
  usa: 'united states',
  us: 'united states',
  'u.s.': 'united states',
  'u.s.a.': 'united states',
  america: 'united states',
  'united states of america': 'united states',
  uk: 'united kingdom',
  'u.k.': 'united kingdom',
  'great britain': 'united kingdom',
  england: 'united kingdom',
  uae: 'united arab emirates',
  'u.a.e.': 'united arab emirates',
  dubai: 'united arab emirates',
  korea: 'south korea',
  'republic of korea': 'south korea',
  holland: 'netherlands',
  'the netherlands': 'netherlands',
};

export function normalizeCountry(value) {
  const base = String(value || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^the\s+/, '');
  return COUNTRY_ALIASES[base] || base;
}

// '/usa/?utm=x' -> '/usa'. Visit.path is stored as the browser reported it.
export function normalizePath(value) {
  const clean = String(value || '/')
    .split('?')[0]
    .split('#')[0]
    .toLowerCase()
    .replace(/\/+$/, '');
  return clean || '/';
}

function emptyStats() {
  return {
    enquiries: { total: 0, last30: 0, lastAt: null },
    pageViews: { total: 0, last30: 0 },
    visitsFromCountry: { total: 0, last30: 0 },
  };
}

/**
 * @param markets       [{ id, slug, countryName, countryCode }]
 * @param enquiryGroups [{ country, total, last30, lastAt }]  (grouped by raw country text)
 * @param pathGroups    [{ path, total, last30 }]             (grouped by Visit.path)
 * @param countryGroups [{ countryCode, total, last30 }]      (grouped by Visit.countryCode)
 * @returns { [marketId]: stats }
 */
export function buildMarketStats(markets, enquiryGroups, pathGroups, countryGroups) {
  const enquiryByCountry = new Map();
  for (const g of enquiryGroups) {
    const key = normalizeCountry(g.country);
    const cur = enquiryByCountry.get(key) || { total: 0, last30: 0, lastAt: null };
    cur.total += g.total || 0;
    cur.last30 += g.last30 || 0;
    if (g.lastAt && (!cur.lastAt || new Date(g.lastAt) > new Date(cur.lastAt))) cur.lastAt = g.lastAt;
    enquiryByCountry.set(key, cur);
  }

  const viewsByPath = new Map();
  for (const g of pathGroups) {
    const key = normalizePath(g.path);
    const cur = viewsByPath.get(key) || { total: 0, last30: 0 };
    cur.total += g.total || 0;
    cur.last30 += g.last30 || 0;
    viewsByPath.set(key, cur);
  }

  const visitsByCode = new Map();
  for (const g of countryGroups) {
    const key = String(g.countryCode || '').toUpperCase();
    if (!key) continue;
    const cur = visitsByCode.get(key) || { total: 0, last30: 0 };
    cur.total += g.total || 0;
    cur.last30 += g.last30 || 0;
    visitsByCode.set(key, cur);
  }

  const out = {};
  for (const m of markets) {
    const stats = emptyStats();

    const enq = enquiryByCountry.get(normalizeCountry(m.countryName));
    if (enq) stats.enquiries = { ...enq };

    // A market has two public pages: /<slug> and the sourcing guide at
    // /export/<slug>-cotton-towel-supplier.
    for (const p of [`/${m.slug}`, `/export/${m.slug}-cotton-towel-supplier`]) {
      const v = viewsByPath.get(p.toLowerCase());
      if (v) {
        stats.pageViews.total += v.total;
        stats.pageViews.last30 += v.last30;
      }
    }

    const vis = visitsByCode.get(String(m.countryCode || '').toUpperCase());
    if (vis) stats.visitsFromCountry = { ...vis };

    out[m.id] = stats;
  }
  return out;
}

// ── Input cleaning for the editable page text ───────────────────────

function clean(value, max) {
  return String(value ?? '').replace(/[<>]/g, '').trim().slice(0, max);
}

export function cleanFaqs(list, { maxItems = 12 } = {}) {
  if (!Array.isArray(list)) return [];
  return list
    .slice(0, maxItems)
    .map((f) => ({ q: clean(f?.q, 200), a: clean(f?.a, 1500) }))
    .filter((f) => f.q && f.a);
}

export function cleanParagraphs(list, { maxItems = 8 } = {}) {
  if (!Array.isArray(list)) return [];
  return list
    .slice(0, maxItems)
    .map((p) => clean(p, 2500))
    .filter(Boolean);
}

export function cleanText(value, max) {
  return clean(value, max);
}
