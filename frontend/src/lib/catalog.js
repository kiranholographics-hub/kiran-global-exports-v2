const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function getJSON(path) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`);
  } catch {
    throw new ApiError('Could not reach the server.', 0);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(data.error || 'Something went wrong.', res.status);
  }
  return data;
}

// Cached PROMISE (not just the resolved value) so every component that
// needs catalogue data during the same page load shares one in-flight
// request instead of firing duplicate fetches. React's `use()` hook reads
// this promise directly.
let catalogPromise = null;

export function getCatalogData() {
  if (!catalogPromise) {
    // Deliberately does NOT clear the cache on rejection here. React's
    // `use()` needs to see the SAME settled (rejected) promise on the
    // re-render that follows a failed fetch in order to throw synchronously
    // for the nearest error boundary to catch — clearing the cache inside
    // this .catch() would hand that re-render a fresh *pending* promise
    // instead, so it suspends again rather than erroring, which re-fetches
    // forever instead of ever reaching the error boundary. The cache is
    // only cleared explicitly, via resetCatalogCache() from the error
    // boundary's retry button.
    catalogPromise = Promise.all([getJSON('/api/products'), getJSON('/api/categories')]).then(
      ([products, categories]) => ({ products, categories })
    );
  }
  return catalogPromise;
}

// Used by CatalogueErrorBoundary's retry button.
export function resetCatalogCache() {
  catalogPromise = null;
}
