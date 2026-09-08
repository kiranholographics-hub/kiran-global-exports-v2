const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export async function submitEnquiry(payload) {
  let res;
  try {
    res = await fetch(`${API_BASE}/api/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new ApiError(
      'Could not reach the server. Please check your connection and try again, or email us directly.',
      0
    );
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(data.error || 'Something went wrong. Please try again.', res.status);
  }
  return data;
}
