// Every route the deploy workflow prerenders, verifies and ships.
//
// Kept here rather than in .github/workflows/deploy.yml because that list
// used to be repeated in the workflow's render, verify and package steps,
// and a route added to the app but not to all three simply never reached
// the site. One list, imported by all of them.
//
// The towel routes are derived from the catalogue rather than typed out.
// The hand-written list they replace had every product slug prefixed with
// "album-" — a prefix no product actually carries — so all thirteen of
// them rendered as the not-found page, and it was missing the bathrobe &
// spa category along with seven products entirely. A list that has to be
// kept in step with the data by hand is a list that will be wrong again.
//
// Unlike the landing pages these are served by pages that read the
// catalogue from the backend (src/data/products.js fetches /api/products),
// so rendering them needs VITE_API_URL pointing at the real API, and the
// render browser needs to be allowed to call it — see the note on the
// Puppeteer launch args in the workflow. towelCatalog.js is the repo's own
// copy of that catalogue: if the API ever disagrees with it, these routes
// render as not-found pages and the deploy stops, which is the point.

import { SEO_LANDING_ROUTES } from './seoLandingPages.js';
import { towelProducts } from './towelCatalog.js';
import { linenProducts } from './linenCatalog.js';

// Mirrors getTowelProductPath() in towelHierarchy.js, which can't be
// imported here: it pulls in products.js, and that module calls React's
// use() hook, which plain Node (how the workflow reads this file) can't
// load.
function towelProductPath(product) {
  return product.subtype
    ? `/towels/${product.subcategory}/${product.subtype}/${product.slug}`
    : `/towels/${product.subcategory}/${product.slug}`;
}

export const TOWEL_CATEGORY_ROUTES = [
  ...new Set(towelProducts.map((p) => `/towels/${p.subcategory}`)),
];

export const TOWEL_PRODUCT_ROUTES = towelProducts.map(towelProductPath);

// Linen has no subtype level, so its paths are always category/product.
export const LINEN_CATEGORY_ROUTES = [
  ...new Set(linenProducts.map((p) => `/linen/${p.subcategory}`)),
];

export const LINEN_PRODUCT_ROUTES = linenProducts.map(
  (p) => `/linen/${p.subcategory}/${p.slug}`
);

// The three listing pages at the top of the catalogue. They read the API
// too, so like everything below them they are an empty shell to a crawler
// unless they are rendered here.
export const CATALOGUE_INDEX_ROUTES = ['/towels', '/linen', '/collections'];

export const DEPLOY_ROUTES = [
  ...SEO_LANDING_ROUTES,
  ...CATALOGUE_INDEX_ROUTES,
  ...TOWEL_CATEGORY_ROUTES,
  ...TOWEL_PRODUCT_ROUTES,
  ...LINEN_CATEGORY_ROUTES,
  ...LINEN_PRODUCT_ROUTES,
];
