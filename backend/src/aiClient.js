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
  100% cotton ringspun. Also a linen collection (bed, table & dining, home textiles).
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
- If asked something outside towels/linen/export/company scope, gently redirect back to how
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
    max_completion_tokens: 500,
    messages,
  });

  const reply = response.choices?.[0]?.message?.content;
  if (!reply) throw new Error('No content in AI response');
  return reply;
}

const SEO_SYSTEM_PROMPT = `
You are an SEO copywriter for Kiran Global Exports, a B2B cotton towel/bathrobe and linen
exporter. Given a draft post's title and body, suggest a better page title and meta
description for search engines.

Rules:
- Base everything only on the text given — never invent facts, prices, certifications or
  claims that aren't in the body.
- Match the plain, factual tone already used on the site — no hype, no exaggerated claims.
- title: specific and keyword-rich (what a B2B buyer would actually search for), under 60
  characters, no clickbait, no surrounding quote marks.
- excerpt: a natural meta-description summarizing the post, 120-155 characters.
- Reply with ONLY a JSON object: {"title": "...", "excerpt": "..."}
- Write in the same language as the input body.
`.trim();

/**
 * @param {{ title?: string, body: string }} draft
 * @returns {Promise<{ title: string, excerpt: string }>}
 */
export async function suggestSeoMeta({ title, body }) {
  const openai = getClient();
  if (!openai) {
    throw new Error('OPENAI_API_KEY not configured');
  }

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    max_completion_tokens: 300,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: SEO_SYSTEM_PROMPT },
      { role: 'user', content: `Draft title: ${title || '(none yet)'}\n\nBody:\n${body}` },
    ],
  });

  const raw = response.choices?.[0]?.message?.content;
  if (!raw) throw new Error('No content in AI response');

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('Could not parse AI response');
  }
  return {
    title: typeof parsed.title === 'string' ? parsed.title.trim() : '',
    excerpt: typeof parsed.excerpt === 'string' ? parsed.excerpt.trim() : '',
  };
}
