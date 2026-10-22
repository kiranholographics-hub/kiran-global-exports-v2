import { ApiError } from './api';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// ── Public side ────────────────────────────────────────────────────
// Admin-edited text for the /export/* and /solutions/* landing pages.
// The pages always render their built-in copy first and only swap in a
// row from here if one exists, so a slow or unreachable API can never
// leave a page empty — which matters because CI prerenders these pages
// and the build must not depend on the API being up.

let publicCache = null;

async function loadPublic() {
  try {
    const res = await fetch(`${API_BASE}/api/page-overrides/public`);
    if (!res.ok) return {};
    const rows = await res.json();
    const map = {};
    for (const row of rows) map[`${row.section}/${row.slug}`] = row;
    return map;
  } catch {
    return {};
  }
}

// Never rejects: resolves to {} when nothing could be loaded.
export function fetchPageOverrides() {
  if (!publicCache) publicCache = loadPublic();
  return publicCache;
}

export function resetPageOverridesCache() {
  publicCache = null;
}

// Each field replaces the default only when it holds something.
export function applyPageOverride(page, override) {
  if (!page || !override) return page;
  return {
    ...page,
    seoTitle: override.seoTitle || page.seoTitle,
    seoDescription: override.seoDescription || page.seoDescription,
    heading: override.heading || page.heading,
    lead: override.lead || page.lead,
    intro: override.intro?.length ? override.intro : page.intro,
    faqs: override.faqs?.length ? override.faqs : page.faqs,
  };
}

// ── Admin side ─────────────────────────────────────────────────────

async function request(path, token, options = {}) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
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

export function fetchPageOverridesAdmin(token) {
  return request('/api/page-overrides', token);
}

export function savePageOverride(token, section, slug, body) {
  return request(`/api/page-overrides/${section}/${slug}`, token, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export function resetPageOverride(token, section, slug) {
  return request(`/api/page-overrides/${section}/${slug}`, token, { method: 'DELETE' });
}
