import { getCategoryBySlug } from './categories';
import { getProductsByCategory } from './products';

export const towelMainCategorySlugs = () => getCategoryBySlug('towels').subcategories.map((item) => item.slug);

export function getTowelMainCategory(slug) {
  const category = getCategoryBySlug('towels');
  const item = category?.subcategories.find((entry) => entry.slug === slug);
  if (!item) return null;
  const products = getProductsByCategory('towels').filter((product) => product.subcategory === slug);
  if (!products.length) return null;
  return {
    ...item,
    slug,
    description: category.intro,
    products,
    subcategories: getTowelSubcategories(slug),
    representativeImage: getRepresentativeImage(slug),
  };
}

export function getTowelSubcategories(categorySlug) {
  const products = getProductsByCategory('towels').filter((product) => product.subcategory === categorySlug);
  const grouped = new Map();
  products.forEach((product) => {
    if (!product.subtype) return;
    if (!grouped.has(product.subtype)) grouped.set(product.subtype, []);
    grouped.get(product.subtype).push(product);
  });
  return [...grouped.entries()].map(([slug, items]) => ({
    slug,
    name: items[0].subtypeName || slug.replaceAll('-', ' '),
    description: items[0].subtypeDescription || `${items[0].name} products developed for buyer review.`,
    products: items,
    representativeImage: items[0].images[0],
  }));
}

export function getTowelSubcategory(categorySlug, subtypeSlug) {
  return getTowelSubcategories(categorySlug).find((item) => item.slug === subtypeSlug) || null;
}

export function getRepresentativeImage(categorySlug) {
  return getProductsByCategory('towels').find((product) => product.subcategory === categorySlug)?.images?.[0] || null;
}

export function getTowelProductPath(product) {
  const category = product.subcategory;
  return product.subtype ? `/towels/${category}/${product.subtype}/${product.slug}` : `/towels/${category}/${product.slug}`;
}
