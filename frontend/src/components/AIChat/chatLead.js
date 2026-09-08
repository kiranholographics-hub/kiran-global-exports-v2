// ---------------------------------------------------------------------------
// AIChat — pre-chat lead capture + manual-approval gate
// ---------------------------------------------------------------------------
// Flow: visitor fills Name / Email / Question -> submitChatLead() sends it to
// the backend, which is expected to email the team and hold the lead as
// "pending" until a human approves it. The widget then polls
// fetchLeadStatus() until it comes back "approved" (or "declined") and only
// then unlocks the AI chat.
//
// Backend contract (to be implemented):
//   POST /api/chat/lead        { name, email, question }
//        -> { leadId, status: 'pending' }
//        (also expected to email the team with the same details so they can
//         approve/decline — e.g. via a link in that email hitting an admin
//         endpoint that flips the lead's status)
//   GET  /api/chat/lead/:leadId/status
//        -> { status: 'pending' | 'approved' | 'declined' }
//
// In LOCAL DEV ONLY (`npm run dev`), if that backend isn't reachable, calls
// fall back to a mock so the gate -> pending -> approved flow can still be
// demoed end to end: a mock lead auto-approves itself a few seconds after
// submission. This mock NEVER runs in a production build — a visitor's chat
// must always go through a real human approval there. If the backend is
// unreachable in production, submission surfaces a clear connection error
// instead of silently unlocking the chat.
// ---------------------------------------------------------------------------

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

/**
 * Submit the pre-chat form. Always resolves (never throws).
 * - In dev, a backend failure falls back to a mock lead so the UI stays testable.
 * - In production, a backend failure returns status:'error' — never a silent approval.
 * @returns {Promise<{leadId:string|null, status:string, mocked:boolean, mockApproveAt?:number}>}
 */
export async function submitChatLead({ name, email, question }) {
  try {
    const response = await fetch(`${API_BASE}/api/chat/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, question }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.leadId) throw new Error(data.error || 'bad-response');
    return { leadId: data.leadId, status: data.status || 'pending', mocked: false };
  } catch {
    if (import.meta.env.DEV) {
      // No backend running locally — simulate a pending lead that
      // auto-approves shortly, so the approval flow is fully testable.
      return {
        leadId: `mock-${Date.now()}`,
        status: 'pending',
        mocked: true,
        mockApproveAt: Date.now() + 5000 + Math.random() * 4000,
      };
    }
    // Production and the backend is unreachable — never fake an approval.
    return { leadId: null, status: 'error', mocked: false };
  }
}

/**
 * Poll the approval status of a lead returned by submitChatLead().
 * @param {{leadId:string, mocked:boolean, mockApproveAt?:number}} lead
 * @returns {Promise<'pending'|'approved'|'declined'>}
 */
export async function fetchLeadStatus(lead) {
  if (lead.mocked) {
    return Date.now() >= lead.mockApproveAt ? 'approved' : 'pending';
  }
  try {
    const response = await fetch(`${API_BASE}/api/chat/lead/${lead.leadId}/status`);
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.status) throw new Error('bad-response');
    return data.status;
  } catch {
    // Transient network hiccup — stay pending rather than falsely declining.
    return 'pending';
  }
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
