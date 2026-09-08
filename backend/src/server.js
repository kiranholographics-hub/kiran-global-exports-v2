import 'dotenv/config';
import app from './app.js';
import { connectDB } from './db.js';
import { startVisitDigest } from './visitDigest.js';

const PORT = process.env.PORT || 4000;

connectDB().finally(() => {
  app.listen(PORT, () => {
    console.log(`[server] Kiran Global Exports API listening on port ${PORT}`);
  });
  startVisitDigest();
});
