import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRouter from './routes/auth.js';
import enquiriesRouter from './routes/enquiries.js';
import productsRouter from './routes/products.js';
import categoriesRouter from './routes/categories.js';
import aiChatRouter from './routes/aiChat.js';
import chatLeadRouter from './routes/chatLead.js';
import visitsRouter from './routes/visits.js';

const app = express();

// Correct visitor IP detection (used by the visit-country lookup and
// rate-limiting) when this API sits behind a reverse proxy / hosting
// platform's load balancer (Render, Railway, Nginx, etc.) — without this,
// req.ip would return the proxy's own address instead of the visitor's,
// and every visit would resolve to the same "Unknown" country once live.
// "1" trusts exactly one hop, the normal case for a single reverse proxy.
// Set TRUST_PROXY=0 in .env if this API is ever exposed with no proxy in
// front of it at all (direct internet-facing), to avoid IP spoofing via
// a forged X-Forwarded-For header.
app.set('trust proxy', process.env.TRUST_PROXY ?? 1);

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((o) => o.trim());

app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'kiran-global-exports-api' });
});

app.use('/api/auth', authRouter);
app.use('/api/enquiries', enquiriesRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/ai-chat', aiChatRouter);
app.use('/api/chat/lead', chatLeadRouter);
app.use('/api/visits', visitsRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[app] unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
