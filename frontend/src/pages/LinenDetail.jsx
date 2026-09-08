import { useParams } from 'react-router-dom';
import ProductDetail from '@/components/ProductDetail/ProductDetail';

/* ═══════════════════════════════════════════════
 * /linen/:categorySlug/:productSlug → product detail,
 * same spec-sheet layout used for Towels and Rugs.
═══════════════════════════════════════════════ */
export default function LinenDetailPage() {
  const { productSlug } = useParams();
  return <ProductDetail categorySlug="linen" slug={productSlug} />;
}
