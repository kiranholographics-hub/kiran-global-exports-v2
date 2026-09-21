// Every route the deploy workflow prerenders, verifies and ships.
//
// Kept here rather than in .github/workflows/deploy.yml because that list
// used to be repeated in the workflow's render, verify and package steps,
// and a route added to the app but not to all three simply never reached
// the site. One list, imported by all of them.
//
// The towel routes below are served by pages that read the catalogue from
// the backend (src/data/products.js fetches /api/products), so unlike the
// landing pages they cannot be derived statically — and rendering them
// needs VITE_API_URL pointing at the real API, or every one of them comes
// out as a not-found page.

import { SEO_LANDING_ROUTES } from './seoLandingPages.js';

export const TOWEL_CATEGORY_ROUTES = [
  '/towels/bath-towels',
  '/towels/bath-sheets',
  '/towels/hotel-hospitality',
  '/towels/jacquard',
  '/towels/waffle',
  '/towels/zero-twist',
  '/towels/dobby-border',
  '/towels/pool-beach',
  '/towels/logo-custom',
  '/towels/bath-mats',
  '/towels/kitchen',
  '/towels/bamboo-specialty',
  '/towels/accessories',
];

export const TOWEL_PRODUCT_ROUTES = [
  '/towels/bath-towels/album-bath-towel',
  '/towels/bath-sheets/album-bath-sheet',
  '/towels/hotel-hospitality/album-hotel-border-towel',
  '/towels/jacquard/album-jacquard-towel',
  '/towels/waffle/album-waffle-towel',
  '/towels/zero-twist/album-zero-twist-towel',
  '/towels/dobby-border/album-greek-border-towel',
  '/towels/pool-beach/album-pool-towel',
  '/towels/logo-custom/album-logo-towel',
  '/towels/bath-mats/album-cotton-bath-mat',
  '/towels/kitchen/album-kitchen-napkin',
  '/towels/bamboo-specialty/album-bamboo-towel',
  '/towels/accessories/album-terry-gloves',
];

export const DEPLOY_ROUTES = [
  ...SEO_LANDING_ROUTES,
  ...TOWEL_CATEGORY_ROUTES,
  ...TOWEL_PRODUCT_ROUTES,
];
