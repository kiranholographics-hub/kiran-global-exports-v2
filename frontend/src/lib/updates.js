import { ApiError } from './api';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function request(path, token, options = {}) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new ApiError('Could not reach the server.', 0);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(data.error || 'Something went wrong.', res.status);
  }
  return data;
}

export function fetchUpdates(limit) {
  return request(`/api/updates${limit ? `?limit=${limit}` : ''}`);
}

// Posts for one country page. Cached per slug so React's use() sees one
// stable promise (same reason as lib/publicMarkets.js). A country page is
// complete without these, so any failure — including an older API that has
// no such route — resolves to an empty list instead of an error.
const marketUpdatesCache = new Map();

export function fetchUpdatesForMarket(marketSlug) {
  if (!marketUpdatesCache.has(marketSlug)) {
    marketUpdatesCache.set(
      marketSlug,
      request(`/api/updates/for-market/${encodeURIComponent(marketSlug)}`)
        .then((list) => (Array.isArray(list) ? list : []))
        .catch(() => [])
    );
  }
  return marketUpdatesCache.get(marketSlug);
}

export function fetchUpdateBySlug(slug) {
  return request(`/api/updates/${slug}`);
}

export function fetchAllUpdates(token) {
  return request('/api/updates/admin/all', token);
}

export function createUpdate(token, payload) {
  return request('/api/updates', token, { method: 'POST', body: JSON.stringify(payload) });
}

export function editUpdate(token, id, payload) {
  return request(`/api/updates/${id}`, token, { method: 'PATCH', body: JSON.stringify(payload) });
}

export function deleteUpdate(token, id) {
  return request(`/api/updates/${id}`, token, { method: 'DELETE' });
}

export function suggestUpdateSeo(token, { title, body }) {
  return request('/api/updates/suggest-seo', token, {
    method: 'POST',
    body: JSON.stringify({ title, body }),
  });
}
