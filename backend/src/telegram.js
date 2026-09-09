// Telegram Bot sender — used to notify the owner's phone about new website
// visits instead of email. No business verification, no DLT-style
// registration, no dedicated phone number required — just a bot token and
// the owner's chat ID.
//
// One-time setup:
//   1. In Telegram, message @BotFather -> /newbot -> follow the prompts
//      (choose a name and a username ending in "bot")
//   2. BotFather replies with a token like 123456789:ABCdef...
//   3. Open a chat with your new bot and send it any message (e.g. "hi")
//      so it's allowed to message you back
//   4. Visit https://api.telegram.org/bot<TOKEN>/getUpdates in a browser —
//      find "chat":{"id": <NUMBER>, ...} in the response, that's your
//      TELEGRAM_CHAT_ID
//
// Env vars (see .env.example):
//   TELEGRAM_BOT_TOKEN — from BotFather
//   TELEGRAM_CHAT_ID   — the owner's chat ID, from getUpdates above

function getConfig() {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return null;
  return { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID };
}

/**
 * Sends a plain-text message via the Telegram Bot API. Never throws — a
 * failed send should not block whatever triggered it.
 */
export async function sendTelegramMessage(text) {
  const config = getConfig();
  if (!config) {
    console.warn('[telegram] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set — Telegram message will not be sent.');
    return { sent: false, reason: 'not-configured' };
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${config.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: config.TELEGRAM_CHAT_ID, text }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.ok) {
      throw new Error(data.description || `Telegram API responded ${response.status}`);
    }
    return { sent: true };
  } catch (err) {
    console.error('[telegram] Failed to send message:', err.message);
    return { sent: false, reason: err.message };
  }
}
