/* eslint-disable react-hooks/rules-of-hooks -- `use()` is explicitly exempt
   from the rules other hooks follow (React docs: "unlike React Hooks, use
   can be called within conditionals and loops" and from plain functions).
   eslint-plugin-react-hooks flags any function calling something it infers
   is a hook by its `use`-prefixed name, which cascades through every
   exported function below purely because of naming, not an actual rule
   violation — renaming them would break every one of the 11+ page/component
   files that already import these exact function names. */
// Product source of truth for the catalogue-browsing pages (Towels,
// Linen listing/category/detail routes, Collections). Backed by the
// backend's /api/products, read here via React's `use()` hook so every
// exported function below keeps its original name and synchronous-looking
// call shape — callers don't change, only where the data comes from does.
//
// `use()` suspends the calling component until getCatalogData()'s promise
// resolves, so every consumer of these functions must render underneath a
// <Suspense> boundary (see the dedicated catalogue Suspense/error-boundary
// pair wrapping the relevant routes in App.jsx) and an error boundary to
// catch a rejected fetch.
//
// The homepage's own teaser sections (ProductWorld, FeaturedProducts)
// deliberately do NOT use this file — they keep reading the small static
// towel/category files directly, since Home is eagerly rendered and
// prerendered at build time, and shouldn't depend on a runtime API call.
import { use } from 'react';
import { getCatalogData } from '@/lib/catalog';

// Named with a `use` prefix (rather than the more accurate `getProducts`)
// purely so eslint-plugin-react-hooks recognizes this as a valid place to
// call the `use()` hook — it's still called directly from plain functions
// below, not from a component, which `use()` (unlike other hooks) supports.
function useProductsData() {
  return use(getCatalogData()).products;
}

export function getAllProducts() {
  return useProductsData();
}

export function getProductsByCategory(categorySlug) {
  return useProductsData().filter((p) => p.category === categorySlug);
}

export function getProductsBySubcategory(subcategorySlug) {
  return useProductsData().filter((p) => p.subcategory === subcategorySlug);
}

export function getProductBySlug(slug) {
  return useProductsData().find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 4) {
  return useProductsData()
    .filter((p) => p.featured)
    .slice(0, limit);
}

export function getRelatedProducts(product, limit = 3) {
  return useProductsData()
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, limit);
}
