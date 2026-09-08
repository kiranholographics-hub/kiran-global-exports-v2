import { useParams } from 'react-router-dom';
import ProductDetail from '@/components/ProductDetail/ProductDetail';

/* ═══════════════════════════════════════════════
 * TowelDetailPage — resolves both flat and nested
 * towel product routes:
 *
 *  /towels/:slug              → flat product
 *  /towels/:categorySlug/:productSlug → nested
 *
 * parentCategorySlug is passed only when the route
 * has a real category slug (not 'towels' itself).
═══════════════════════════════════════════════ */
export default function TowelDetailPage() {
  const { slug, categorySlug, productSlug } = useParams();

  /* If nested route — categorySlug is the parent */
  const parentCategorySlug =
    categorySlug && categorySlug !== 'towels'
      ? categorySlug
      : undefined;

  /* productSlug from nested route, or slug from flat route */
  const resolvedSlug = productSlug || slug;

  return (
    <ProductDetail
      categorySlug="towels"
      parentCategorySlug={parentCategorySlug}
      slug={resolvedSlug}
    />
  );
}