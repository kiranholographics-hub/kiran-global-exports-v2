const GRAPH_VERSION = 'v21.0';
// The token was issued via Instagram Business Login (IGAA-prefixed), which
// calls the standalone graph.instagram.com host — not graph.facebook.com,
// which is only for tokens issued via Facebook Login for Business.
const GRAPH_BASE = `https://graph.instagram.com/${GRAPH_VERSION}`;
const SITE_URL = 'https://www.kiranglobal-exports.com';

export function isInstagramConfigured() {
  return Boolean(process.env.INSTAGRAM_ACCESS_TOKEN && process.env.INSTAGRAM_BUSINESS_ID);
}

// Cover images may be stored as a site-relative path (e.g. "/images/x.webp")
// or an already-absolute media URL (e.g. from the ImagePicker's upload
// library) — Instagram's Graph API fetches the image itself, so it always
// needs a fully-qualified, publicly reachable URL either way.
function resolveImageUrl(image) {
  try {
    return new URL(image, SITE_URL).toString();
  } catch {
    return `${SITE_URL}${image}`;
  }
}

/**
 * Publishes an image post to the connected Instagram Business account via
 * the Graph API's two-step Content Publishing flow: create a media
 * container, then publish it.
 *
 * @param {{ imageUrl: string, caption: string }} post
 * @returns {Promise<string>} the published media's ID
 */
export async function publishToInstagram({ imageUrl, caption }) {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const businessId = process.env.INSTAGRAM_BUSINESS_ID;
  if (!accessToken || !businessId) {
    throw new Error('Instagram is not configured (missing INSTAGRAM_ACCESS_TOKEN or INSTAGRAM_BUSINESS_ID)');
  }

  const createRes = await fetch(`${GRAPH_BASE}/${businessId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      image_url: resolveImageUrl(imageUrl),
      caption: String(caption || '').slice(0, 2200), // Instagram's caption length limit
      access_token: accessToken,
    }),
  });
  const createData = await createRes.json();
  if (!createRes.ok) {
    throw new Error(createData.error?.message || 'Failed to create Instagram media container');
  }

  const publishRes = await fetch(`${GRAPH_BASE}/${businessId}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      creation_id: createData.id,
      access_token: accessToken,
    }),
  });
  const publishData = await publishRes.json();
  if (!publishRes.ok) {
    throw new Error(publishData.error?.message || 'Failed to publish Instagram media');
  }

  return publishData.id;
}
