import { useParams } from 'react-router-dom';
import ProductDetail from '@/components/ProductDetail/ProductDetail';
import RugCategoryPage from '@/pages/RugCategoryPage';
import { getCategoryBySlug } from '@/data/categories';

/* ═══════════════════════════════════════════════
 * Smart router — if slug matches a subcategory,
 * show the collection page; otherwise show the
 * individual product detail page.
═══════════════════════════════════════════════ */
export default function RugDetailPage() {
  const { slug } = useParams();
  const category  = getCategoryBySlug('rugs');

  const isCollection = category?.subcategories.some(
    (item) => item.slug === slug
  );

  return isCollection
    ? <RugCategoryPage />
    : <ProductDetail categorySlug="rugs" slug={slug} />;
}