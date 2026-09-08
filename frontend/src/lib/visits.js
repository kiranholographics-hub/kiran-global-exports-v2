const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

/**
 * Reports a page view to the backend. Always fire-and-forget: never
 * throws, never blocks navigation, and silently does nothing if the
 * backend is unreachable — a failed visit ping should never be visible
 * to the visitor.
 */
export function reportVisit(path) {
  try {
    fetch(`${API_BASE}/api/visits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path,
        referrer: document.referrer || '',
      }),
      keepalive: true, // lets the request complete even if the visitor navigates away immediately
    }).catch(() => {});
  } catch {
    // ignore — e.g. fetch unavailable in some edge environment
  }
}
