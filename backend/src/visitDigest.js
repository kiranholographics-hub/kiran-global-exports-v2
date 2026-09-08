import Visit from './models/Visit.js';
import { sendVisitDigest } from './mailer.js';

let running = false;
let timer = null;

async function tick(windowMinutes) {
  if (running) return; // never let two runs overlap
  running = true;
  try {
    const visits = await Visit.find({ notified: false }).sort({ createdAt: 1 }).limit(500);
    if (!visits.length) return;

    const result = await sendVisitDigest(visits, { windowMinutes });
    if (result.sent) {
      const ids = visits.map((v) => v._id);
      await Visit.updateMany({ _id: { $in: ids } }, { $set: { notified: true } });
    }
    // If the email failed to send (e.g. SMTP hiccup), the visits stay
    // notified:false and get swept up — and re-tried — on the next tick.
  } catch (err) {
    console.error('[visitDigest] tick failed:', err.message);
  } finally {
    running = false;
  }
}

/**
 * Starts the recurring visit-digest job. Call once, after connectDB(), from
 * server.js. Safe to call in environments without SMTP configured — the
 * mailer just no-ops and visits stay queued.
 */
export function startVisitDigest() {
  const windowMinutes = Number(process.env.VISIT_DIGEST_INTERVAL_MINUTES) || 20;
  const intervalMs = windowMinutes * 60 * 1000;

  if (timer) clearInterval(timer);
  timer = setInterval(() => tick(windowMinutes), intervalMs);
  // Also do an initial pass shortly after boot in case visits queued up
  // while the server was down (see the buffered case above), rather than
  // waiting a full interval for the first email.
  setTimeout(() => tick(windowMinutes), 30 * 1000);

  console.log(`[visitDigest] started — checking every ${windowMinutes} min`);
}
