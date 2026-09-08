import { Router } from 'express';
import ChatLead from '../models/ChatLead.js';
import { sendLeadNotification } from '../mailer.js';
import { verifyAction } from '../security.js';

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 20;
const requests = new Map();

function clean(value, max = 200) {
  return String(value || '').replace(/[<>]/g, '').trim().slice(0, max);
}

function rateLimited(ip) {
  const now = Date.now();
  const current = requests.get(ip) || { count: 0, start: now };
  if (now - current.start > WINDOW_MS) {
    requests.set(ip, { count: 1, start: now });
    return false;
  }
  current.count += 1;
  requests.set(ip, current);
  return current.count > MAX_REQUESTS;
}

function decisionPage({ title, message, ok }) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <style>
      body { font-family: Arial, sans-serif; background:#faf6ef; color:#1e1a17; display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; }
      .card { background:#fffdf9; border:1px solid rgba(30,26,23,.1); border-radius:12px; padding:2.5rem; max-width:420px; text-align:center; box-shadow:0 12px 50px rgba(30,26,23,.12); }
      h1 { font-size:1.2rem; margin-bottom:.5rem; color: ${ok ? '#2f6b3a' : '#a0392a'}; }
      p { color:#7a6a5a; font-size:.9rem; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>${title}</h1>
      <p>${message}</p>
    </div>
  </body>
</html>`;
}

// POST /api/chat/lead — visitor submits the pre-chat form
router.post('/', async (req, res) => {
  if (rateLimited(req.ip)) {
    return res.status(429).json({ error: 'Too many requests from this connection. Please try again later.' });
  }

  const body = req.body || {};
  const name = clean(body.name, 200);
  const email = clean(body.email, 200).toLowerCase();
  const question = clean(body.question, 2000);

  if (!name) return res.status(400).json({ error: 'Name is required.' });
  if (!email || !EMAIL_RE.test(email)) return res.status(400).json({ error: 'A valid email is required.' });

  try {
    const lead = await ChatLead.create({ name, email, question });
    const leadJson = lead.toJSON();

    // Don't let a slow/broken mail provider block the response to the visitor.
    sendLeadNotification(leadJson).catch((err) => console.error('[chatLead] notify failed:', err.message));

    res.status(201).json({ leadId: leadJson.id, status: leadJson.status });
  } catch (err) {
    console.error('[chatLead] create error:', err.message);
    res.status(500).json({ error: 'Could not save your request. Please try again.' });
  }
});

// GET /api/chat/lead/:leadId/status — frontend polls this while pending
router.get('/:leadId/status', async (req, res) => {
  try {
    const lead = await ChatLead.findById(req.params.leadId);
    if (!lead) return res.status(404).json({ error: 'Lead not found.' });
    res.json({ status: lead.status });
  } catch {
    // Malformed id, etc. — treat the same as not found.
    res.status(404).json({ error: 'Lead not found.' });
  }
});

// GET /api/chat/lead/:leadId/approve?token=... — clicked from the team email
router.get('/:leadId/approve', async (req, res) => {
  const { leadId } = req.params;
  const { token } = req.query;

  if (!verifyAction(leadId, 'approve', token)) {
    return res.status(403).send(decisionPage({ title: 'Invalid or expired link', message: 'This approval link is not valid.', ok: false }));
  }

  try {
    const lead = await ChatLead.findByIdAndUpdate(leadId, { status: 'approved', decidedAt: new Date() }, { new: true });
    if (!lead) return res.status(404).send(decisionPage({ title: 'Lead not found', message: 'This chat request no longer exists.', ok: false }));
    res.send(decisionPage({ title: 'Chat approved', message: `${lead.name}'s chat has been unlocked. You can close this tab.`, ok: true }));
  } catch {
    res.status(404).send(decisionPage({ title: 'Lead not found', message: 'This chat request no longer exists.', ok: false }));
  }
});

// GET /api/chat/lead/:leadId/decline?token=... — clicked from the team email
router.get('/:leadId/decline', async (req, res) => {
  const { leadId } = req.params;
  const { token } = req.query;

  if (!verifyAction(leadId, 'decline', token)) {
    return res.status(403).send(decisionPage({ title: 'Invalid or expired link', message: 'This decline link is not valid.', ok: false }));
  }

  try {
    const lead = await ChatLead.findByIdAndUpdate(leadId, { status: 'declined', decidedAt: new Date() }, { new: true });
    if (!lead) return res.status(404).send(decisionPage({ title: 'Lead not found', message: 'This chat request no longer exists.', ok: false }));
    res.send(decisionPage({ title: 'Chat declined', message: `${lead.name}'s chat request has been declined.`, ok: true }));
  } catch {
    res.status(404).send(decisionPage({ title: 'Lead not found', message: 'This chat request no longer exists.', ok: false }));
  }
});

// GET /api/chat/lead — stopgap listing, admin-key protected (same pattern as /api/enquiries)
router.get('/', async (req, res) => {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey || req.get('x-admin-key') !== adminKey) return res.status(404).json({ error: 'Not found' });
  try {
    const leads = await ChatLead.find().sort({ createdAt: -1 }).limit(200);
    res.json(leads.map((l) => l.toJSON()));
  } catch (err) {
    console.error('[chatLead] list error:', err.message);
    res.status(500).json({ error: 'Could not load chat leads.' });
  }
});

export default router;
