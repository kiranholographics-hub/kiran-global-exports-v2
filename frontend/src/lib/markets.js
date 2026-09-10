import { ApiError } from './api';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

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

export function fetchMarkets(token) {
  return request('/api/markets', token);
}

export function createMarket(token, market) {
  return request('/api/markets', token, { method: 'POST', body: JSON.stringify(market) });
}

export function updateMarket(token, id, update) {
  return request(`/api/markets/${id}`, token, { method: 'PATCH', body: JSON.stringify(update) });
}

export function deleteMarket(token, id) {
  return request(`/api/markets/${id}`, token, { method: 'DELETE' });
}
