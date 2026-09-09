// MSG91 SMS sender — used to notify the owner's phone about new website
// visits instead of email. Requires an MSG91 account with a DLT-registered
// transactional template (mandatory for sending SMS to Indian numbers).
//
// Env vars (see .env.example):
//   MSG91_AUTH_KEY        — from MSG91 dashboard > API
//   MSG91_SENDER_ID       — 6-char approved sender ID (e.g. KGEXPT)
//   MSG91_DLT_TEMPLATE_ID — the DLT-approved template's Template ID (PE ID)
//   MSG91_MESSAGE_TEMPLATE — the exact approved template text, with
//     {{count}}, {{country}}, {{page}} placeholders substituted in below.
//     Must match the DLT-registered wording exactly (only the variable
//     parts may differ) or MSG91 will reject the send.
//   NOTIFY_PHONE_NUMBER   — owner's number to notify, with country code,
//     digits only (e.g. 919928911181)

function getConfig() {
  const { MSG91_AUTH_KEY, MSG91_SENDER_ID, MSG91_DLT_TEMPLATE_ID, NOTIFY_PHONE_NUMBER } = process.env;
  if (!MSG91_AUTH_KEY || !MSG91_SENDER_ID || !MSG91_DLT_TEMPLATE_ID || !NOTIFY_PHONE_NUMBER) {
    return null;
  }
  return { MSG91_AUTH_KEY, MSG91_SENDER_ID, MSG91_DLT_TEMPLATE_ID, NOTIFY_PHONE_NUMBER };
}

/**
 * Sends a single SMS via MSG91. Never throws — a failed SMS should not
 * block whatever triggered it.
 */
export async function sendSMS(message) {
  const config = getConfig();
  if (!config) {
    console.warn('[sms] MSG91_AUTH_KEY / MSG91_SENDER_ID / MSG91_DLT_TEMPLATE_ID / NOTIFY_PHONE_NUMBER not set — SMS will not be sent.');
    return { sent: false, reason: 'not-configured' };
  }

  try {
    const response = await fetch('https://api.msg91.com/api/v2/sendsms', {
      method: 'POST',
      headers: {
        authkey: config.MSG91_AUTH_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: config.MSG91_SENDER_ID,
        route: '4', // transactional route — required for DLT-registered templates
        country: '91',
        sms: [{ message, to: [config.NOTIFY_PHONE_NUMBER] }],
        DLT_TE_ID: config.MSG91_DLT_TEMPLATE_ID,
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.type === 'error') {
      throw new Error(data.message || `MSG91 responded ${response.status}`);
    }
    return { sent: true };
  } catch (err) {
    console.error('[sms] Failed to send SMS:', err.message);
    return { sent: false, reason: err.message };
  }
}

/**
 * Builds the visit-digest SMS text from MSG91_MESSAGE_TEMPLATE, substituting
 * {{count}}, {{country}}, {{page}} — the top country and page in this batch.
 * Falls back to a plain sentence if no template is configured, so local
 * testing doesn't require a DLT template to see the shape of the message.
 */
export function buildVisitDigestMessage({ count, topCountry, topPage }) {
  const template =
    process.env.MSG91_MESSAGE_TEMPLATE ||
    '{{count}} new visit(s) on your website, mostly from {{country}}, viewing {{page}}.';

  return template
    .replaceAll('{{count}}', String(count))
    .replaceAll('{{country}}', topCountry || 'Unknown')
    .replaceAll('{{page}}', topPage || '/');
}
