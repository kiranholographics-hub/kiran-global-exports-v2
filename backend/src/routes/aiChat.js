import { Router } from 'express';
import ChatLead from '../models/ChatLead.js';
import { getAiReply } from '../aiClient.js';

const router = Router();

// POST /api/ai-chat  { message, history, leadId? }
router.post('/', async (req, res) => {
  const { message, history, leadId } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  // Defense in depth: if the request carries a leadId, make sure that lead
  // was actually approved before letting the AI answer. (The frontend also
  // gates the UI itself, but a server-side check can't be bypassed by
  // calling the API directly.) Requests without a leadId — e.g. from an
  // older frontend build — are allowed through unchanged.
  if (leadId) {
    try {
      const lead = await ChatLead.findById(leadId);
      if (!lead || lead.status !== 'approved') {
        return res.status(403).json({ error: 'This chat has not been approved yet.' });
      }
    } catch {
      return res.status(403).json({ error: 'This chat has not been approved yet.' });
    }
  }

  try {
    const reply = await getAiReply(message.trim().slice(0, 2000), Array.isArray(history) ? history : []);
    res.json({ reply });
  } catch (err) {
    console.error('[ai-chat] failed:', err.message);
    res.status(502).json({ error: 'AI assistant unavailable.' });
  }
});

export default router;
