import { ApiError } from './api';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function request(path, token, options = {}) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
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

// Full absolute URL — these images are served by the backend, not the
// frontend build, so a plain "/api/media/<id>" would resolve against
// the wrong origin wherever this string is used as an <img src>.
export function mediaUrl(id) {
  return `${API_BASE}/api/media/${id}`;
}

export function fetchMediaLibrary(token) {
  return request('/api/media', token);
}

export function uploadMedia(token, file) {
  const formData = new FormData();
  formData.append('file', file);
  return request('/api/media', token, { method: 'POST', body: formData });
}

export function deleteMedia(token, id) {
  return request(`/api/media/${id}`, token, { method: 'DELETE' });
}
