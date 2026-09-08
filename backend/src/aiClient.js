import OpenAI from 'openai';

let client = null;

function getClient() {
  if (client) return client;
  if (!process.env.OPENAI_API_KEY) return null;
  client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}

// Edit this freely — it's the only place the assistant's product/company
// knowledge lives. Keep it factual; the model is told to defer to a human
// for anything it's not sure of rather than guess at pricing or specs.
const SYSTEM_PROMPT = `
You are the AI assistant on the Kiran Global Exports website (kiranglobalexports.com), a
textile export company based in Jaipur, Rajasthan, India, manufacturing at the V P Mundada
plant in Solapur, Maharashtra.

Company facts you can use:
- Products: beach towels, zero-twist towels, vat-dyed towels, bath mats, bathrobes — all
  100% cotton ringspun. Also a rugs collection (handcrafted and machine-made).
- Sells FOB (Free On Board).
- Current export volume: 15–20 containers/month.
- Buyer countries served: USA, Brazil, Germany, South Korea, Japan, Israel, Canada.
- Offers custom / private-label programmes: buyer's branding, logo embroidery/jacquard,
  custom packaging and colourways.
- Manufacturing is in Solapur; the Jaipur office is the marketing/export HQ — never say
  products are "made" or "woven" in Jaipur.

How to answer:
- Be concise, warm, and professional — this is a B2B export enquiry chat, not a casual chatbot.
- Never invent exact prices, MOQs, lead times, or certifications you don't have facts for
  above — instead say a team member will confirm exact figures, and point them to the
  Contact page.
- If asked something outside towels/rugs/export/company scope, gently redirect back to how
  you can help with their sourcing needs.
- Keep replies to a few sentences unless the visitor is asking for a detailed breakdown.
`.trim();

/**
 * @param {string} message - latest visitor message
 * @param {{role: 'user'|'assistant', content: string}[]} history - prior turns
 * @returns {Promise<string>}
 */
export async function getAiReply(message, history = []) {
  const openai = getClient();
  if (!openai) {
    throw new Error('OPENAI_API_KEY not configured');
  }

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history
      .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-10),
    { role: 'user', content: message },
  ];

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    max_tokens: 500,
    messages,
  });

  const reply = response.choices?.[0]?.message?.content;
  if (!reply) throw new Error('No content in AI response');
  return reply;
}
