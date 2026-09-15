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

export function fetchTeam() {
  return request('/api/team');
}

export function fetchAllTeam(token) {
  return request('/api/team/admin/all', token);
}

export function createTeamMember(token, payload) {
  return request('/api/team', token, { method: 'POST', body: JSON.stringify(payload) });
}

export function editTeamMember(token, id, payload) {
  return request(`/api/team/${id}`, token, { method: 'PATCH', body: JSON.stringify(payload) });
}

export function deleteTeamMember(token, id) {
  return request(`/api/team/${id}`, token, { method: 'DELETE' });
}
