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

export function fetchTestimonials(limit) {
  return request(`/api/testimonials${limit ? `?limit=${limit}` : ''}`);
}

export function fetchAllTestimonials(token) {
  return request('/api/testimonials/admin/all', token);
}

export function createTestimonial(token, payload) {
  return request('/api/testimonials', token, { method: 'POST', body: JSON.stringify(payload) });
}

export function editTestimonial(token, id, payload) {
  return request(`/api/testimonials/${id}`, token, { method: 'PATCH', body: JSON.stringify(payload) });
}

export function deleteTestimonial(token, id) {
  return request(`/api/testimonials/${id}`, token, { method: 'DELETE' });
}
