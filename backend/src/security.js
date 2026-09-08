import crypto from 'node:crypto';

const SECRET = process.env.APPROVAL_SECRET || '';

if (!SECRET) {
  console.warn(
    '[security] APPROVAL_SECRET is not set in .env — approve/decline links ' +
      'cannot be safely signed. Add one before using the chat-lead feature.'
  );
}

/**
 * Sign a leadId + action so the resulting token can be safely put in an
 * email link without letting anyone guess or tamper with other leads.
 */
export function signAction(leadId, action) {
  return crypto.createHmac('sha256', SECRET).update(`${leadId}:${action}`).digest('hex');
}

export function verifyAction(leadId, action, token) {
  if (!token) return false;
  const expected = signAction(leadId, action);
  const a = Buffer.from(expected);
  const b = Buffer.from(String(token));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
