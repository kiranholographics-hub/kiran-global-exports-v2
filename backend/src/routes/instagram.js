import { Router } from 'express';

const router = Router();

// Registered as this app's Instagram Business Login redirect URI. The
// current access token was generated directly from the Meta developer
// dashboard rather than through this flow, so this just needs to exist
// (Meta requires a live, non-404 redirect URI to save the login setup) —
// wire up a real code-exchange here if a future re-auth flow needs it.
router.get('/callback', (_req, res) => {
  res.send('Instagram connected. You can close this tab.');
});

export default router;
