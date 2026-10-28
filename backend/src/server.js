import 'dotenv/config';
import app from './app.js';
import { connectDB } from './db.js';
import { startVisitDigest } from './visitDigest.js';
import { shareDueInstagramPosts } from './routes/updates.js';

const PORT = process.env.PORT || 4000;

connectDB().finally(() => {
  app.listen(PORT, () => {
    console.log(`[server] Kiran Global Exports API listening on port ${PORT}`);
  });
  startVisitDigest();
  // Scheduled posts reach Instagram when their time comes, not when saved.
  setInterval(() => {
    shareDueInstagramPosts().catch((err) => console.error('[updates] scheduled share failed:', err.message));
  }, 5 * 60 * 1000);
});
