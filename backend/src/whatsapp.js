// WhatsApp sender via MSG91's WhatsApp API — used to notify the owner's
// phone about new website visits instead of email. MSG91 acts as the Meta
// Business Solution Provider, so no separate Meta developer app is needed
// once the number is connected and the template is approved.
//
// One-time setup (done): connected the WhatsApp Business number to MSG91
// (WhatsApp > Number), created and got the "website_visit_alert" template
// approved (WhatsApp > Manage Templates).
//
// Env vars (see .env.example):
//   MSG91_AUTH_KEY                  — from MSG91 dashboard > Authkey
//   MSG91_WHATSAPP_INTEGRATED_NUMBER — the connected sending number
//     (digits only, with country code, e.g. 919983911181)
//   NOTIFY_WHATSAPP_NUMBER          — owner's number to notify, same format

function getConfig() {
  const { MSG91_AUTH_KEY, MSG91_WHATSAPP_INTEGRATED_NUMBER, NOTIFY_WHATSAPP_NUMBER } = process.env;
  if (!MSG91_AUTH_KEY || !MSG91_WHATSAPP_INTEGRATED_NUMBER || !NOTIFY_WHATSAPP_NUMBER) return null;
  return { MSG91_AUTH_KEY, MSG91_WHATSAPP_INTEGRATED_NUMBER, NOTIFY_WHATSAPP_NUMBER };
}

/**
 * Sends the "website_visit_alert" WhatsApp template via MSG91.
 * Never throws — a failed send should not block whatever triggered it.
 */
export async function sendWhatsApp({ count, country, page }) {
  const config = getConfig();
  if (!config) {
    console.warn('[whatsapp] MSG91_AUTH_KEY / MSG91_WHATSAPP_INTEGRATED_NUMBER / NOTIFY_WHATSAPP_NUMBER not set — WhatsApp message will not be sent.');
    return { sent: false, reason: 'not-configured' };
  }

  try {
    const response = await fetch('https://api.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/bulk/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authkey: config.MSG91_AUTH_KEY,
      },
      body: JSON.stringify({
        integrated_number: config.MSG91_WHATSAPP_INTEGRATED_NUMBER,
        content_type: 'template',
        payload: {
          messaging_product: 'whatsapp',
          type: 'template',
          template: {
            name: 'website_visit_alert',
            language: { code: 'en', policy: 'deterministic' },
            namespace: null,
            to_and_components: [
              {
                to: [config.NOTIFY_WHATSAPP_NUMBER],
                components: {
                  body_count: { type: 'text', value: String(count), parameter_name: 'count' },
                  body_country: { type: 'text', value: String(country), parameter_name: 'country' },
                  body_page: { type: 'text', value: String(page), parameter_name: 'page' },
                },
              },
            ],
          },
        },
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.type === 'error') {
      throw new Error(data.message || `MSG91 responded ${response.status}`);
    }
    return { sent: true };
  } catch (err) {
    console.error('[whatsapp] Failed to send message:', err.message);
    return { sent: false, reason: err.message };
  }
}
