import { ApiError } from './api';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Public — no auth. Used by the live market pages (MarketPage.jsx, via
// React's use() hook) and, at build time, by the two SEO scripts
// (generate-seo-files.js, prerender.mjs) to discover which markets are
// currently active.
//
// Cached PER SLUG so use() sees the same settled promise across re-renders
// instead of firing a fresh fetch every render (use() needs a stable
// promise reference for the same logical request — the same reason
// lib/catalog.js caches getCatalogData()'s promise).
const marketCache = new Map();

export function fetchMarketBySlug(slug) {
  if (!marketCache.has(slug)) {
    marketCache.set(slug, loadMarket(slug));
  }
  return marketCache.get(slug);
}

export function resetMarketCache(slug) {
  marketCache.delete(slug);
}

async function loadMarket(slug) {
  let res;
  try {
    res = await fetch(`${API_BASE}/api/markets/public/${encodeURIComponent(slug)}`);
  } catch {
    // Unreachable is not the same as missing: a 404 means the market was
    // deactivated in /hq and the page should say so, while this means we
    // simply could not ask. MarketPage renders its hand-written copy for
    // this case instead of an error, which is also what lets CI prerender
    // those pages with real content.
    return { unreachable: true };
  }
  if (res.status === 404) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(data.error || 'Something went wrong.', res.status);
  }
  return data;
}
