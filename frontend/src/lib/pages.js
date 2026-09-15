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

export function fetchPageBySlug(slug) {
  return request(`/api/pages/${slug}`);
}

export function fetchAllPages(token) {
  return request('/api/pages/admin/all', token);
}

export function createPage(token, payload) {
  return request('/api/pages', token, { method: 'POST', body: JSON.stringify(payload) });
}

export function editPage(token, id, payload) {
  return request(`/api/pages/${id}`, token, { method: 'PATCH', body: JSON.stringify(payload) });
}

export function deletePage(token, id) {
  return request(`/api/pages/${id}`, token, { method: 'DELETE' });
}
