import { ApiError } from './api';

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

async function request(path, token) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
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

export function fetchVisitSummary(token) {
  return request('/api/visits/summary', token);
}
