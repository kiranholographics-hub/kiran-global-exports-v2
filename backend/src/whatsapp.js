// WhatsApp Cloud API (Meta) sender — used to notify the owner's phone about
// new website visits instead of email. Uses a test-mode WhatsApp Business
// number, which lets you message up to 5 verified recipient numbers with no
// business verification or DLT-style registration required.
//
// Setup (one-time, in Meta for Developers):
//   1. developers.facebook.com > My Apps > Create App > type "Business"
//   2. Add the "WhatsApp" product to the app
//   3. Under WhatsApp > API Setup you get a temporary access token and a
//      "Phone number ID" for Meta's shared test number
//   4. Under "To" / recipient list, add the owner's own number and verify
//      it with the OTP sent to that phone
//   5. Under WhatsApp > Message Templates, create a template (category:
//      Utility) with the wording below, get it approved (usually minutes),
//      then use its exact name here
//
// Env vars (see .env.example):
//   WHATSAPP_ACCESS_TOKEN   — from WhatsApp > API Setup (temporary tokens
//     expire after 24h; generate a permanent one via a System User for
//     production use)
//   WHATSAPP_PHONE_NUMBER_ID — the sending number's ID, from API Setup
//   WHATSAPP_TEMPLATE_NAME  — the approved template's name (not its text)
//   NOTIFY_WHATSAPP_NUMBER  — owner's number to notify, with country code,
//     digits only, no "+" (e.g. 919928911181) — must be a verified test
//     recipient while the app is in development mode

function getConfig() {
  const { WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_TEMPLATE_NAME, NOTIFY_WHATSAPP_NUMBER } = process.env;
  if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_TEMPLATE_NAME || !NOTIFY_WHATSAPP_NUMBER) {
    return null;
  }
  return { WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_TEMPLATE_NAME, NOTIFY_WHATSAPP_NUMBER };
}

/**
 * Sends a WhatsApp template message via the Cloud API. `variables` fills
 * the template's {{1}}, {{2}}, {{3}}... placeholders in order.
 * Never throws — a failed send should not block whatever triggered it.
 */
export async function sendWhatsApp(variables) {
  const config = getConfig();
  if (!config) {
    console.warn('[whatsapp] WHATSAPP_ACCESS_TOKEN / WHATSAPP_PHONE_NUMBER_ID / WHATSAPP_TEMPLATE_NAME / NOTIFY_WHATSAPP_NUMBER not set — WhatsApp message will not be sent.');
    return { sent: false, reason: 'not-configured' };
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v20.0/${config.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: config.NOTIFY_WHATSAPP_NUMBER,
          type: 'template',
          template: {
            name: config.WHATSAPP_TEMPLATE_NAME,
            language: { code: 'en_US' },
            components: [
              {
                type: 'body',
                parameters: variables.map((v) => ({ type: 'text', text: String(v) })),
              },
            ],
          },
        }),
      }
    );

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error?.message || `Meta API responded ${response.status}`);
    }
    return { sent: true };
  } catch (err) {
    console.error('[whatsapp] Failed to send message:', err.message);
    return { sent: false, reason: err.message };
  }
}
