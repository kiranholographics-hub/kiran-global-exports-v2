// ---------------------------------------------------------------------------
// AIChat — mock reply engine
// ---------------------------------------------------------------------------
// Used only when POST /api/ai-chat is unreachable (e.g. no backend deployed
// yet). Lets the chat UI be fully clicked through and demoed. Once a real
// endpoint exists at VITE_API_URL, live replies are used automatically and
// this file is never called.
// ---------------------------------------------------------------------------

const RULES = [
  {
    test: /hotel|hospitality|resort/i,
    reply:
      'For hotels and resorts we recommend our zero-twist and vat-dyed cotton towels — high absorbency, durable through commercial laundering, and available in bulk with consistent GSM. Would you like a quotation for a specific quantity?',
  },
  {
    test: /custom|private label|logo|branding/i,
    reply:
      'Yes — we offer custom and private-label programs: your branding, logo embroidery/jacquard, custom packaging, and colourways on our towel and linen ranges. Share your target quantity and market and we can outline MOQs.',
  },
  {
    test: /bulk|quotation|quote|price|pricing|cost/i,
    reply:
      'Happy to help with a bulk quotation. Could you share the product type (towels or linen), approximate quantity, and destination country? You can also use our Contact page for a formal FOB quote from our team.',
  },
  {
    test: /moq|minimum order/i,
    reply:
      'MOQs vary by product and customisation level. For standard ranges it is typically container-load based; for private label it depends on the finish. Tell us the product and market and we will confirm the exact MOQ.',
  },
  {
    test: /towel/i,
    reply:
      'We manufacture beach towels, zero-twist, vat-dyed, bath mats and bathrobes — all 100% cotton ringspun. Let me know the segment (retail, hotel, or private label) and I can narrow down the right range for you.',
  },
  {
    test: /export|ship|shipping|container|fob|incoterm/i,
    reply:
      'We export FOB and currently ship 15–20 containers a month to buyers across the US, Brazil, Germany, South Korea, Japan, Israel and Canada. For a shipping timeline and Incoterm details, our export team can walk you through it on the Contact page.',
  },
  {
    test: /contact|talk to|human|sales|team|call|whatsapp/i,
    reply:
      'Of course — you can reach our export team directly via the Contact page, or use the WhatsApp/email details in the footer. Would you like me to summarise this conversation for them first?',
  },
  {
    test: /^(hi|hello|hey|namaste)\b/i,
    reply:
      'Hello! Good to have you here. Are you exploring towels, linen, or a custom/private-label programme today?',
  },
];

const FALLBACK =
  "Thanks for reaching out. I can help with towels, linen, custom/private-label options, MOQs, and export details — could you tell me a bit more about what you're looking for?";

/**
 * Simulates an AI reply for local/demo use when no backend is connected.
 * @param {string} message
 * @returns {Promise<string>}
 */
export function getMockReply(message) {
  const match = RULES.find((rule) => rule.test.test(message));
  const reply = match ? match.reply : FALLBACK;
  const delay = 500 + Math.random() * 650;
  return new Promise((resolve) => setTimeout(() => resolve(reply), delay));
}
