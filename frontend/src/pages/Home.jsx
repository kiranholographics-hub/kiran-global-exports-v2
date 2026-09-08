import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO/SEO';
import Hero from '@/sections/Hero/Hero';
import BrandIntro from '@/sections/BrandIntro/BrandIntro';
import ProductWorld from '@/sections/ProductWorld/ProductWorld';
import FeaturedProducts from '@/sections/FeaturedProducts/FeaturedProducts';
import WhyKiran from '@/sections/WhyKiran/WhyKiran';
import Manufacturing from '@/sections/Manufacturing/Manufacturing';
import GlobalExport from '@/sections/GlobalExport/GlobalExport';
import CollectionsShowcase from '@/sections/CollectionsShowcase/CollectionsShowcase';
import CustomPrivateLabel from '@/sections/CustomPrivateLabel/CustomPrivateLabel';
import CTASection from '@/components/CTASection/CTASection';

/* ═══════════════════════════════════════════════ */
export default function Home() {
  const { t } = useTranslation();
  return (
    <>

      {/* ── SEO ─────────────────────────────────── */}
      <SEO
        title={t('home.seo.title')}
        description={t('home.seo.description')}
      />

      {/* ── 1. Cinematic Hero ───────────────────── */}
      <Hero />

      {/* ── 2. Brand Introduction ───────────────── */}
      <BrandIntro />

      {/* ── 3. Towels + Rugs World ──────────────── */}
      <ProductWorld />

      {/* ── 4. Featured Towel Products ──────────── */}
      <FeaturedProducts />

      {/* ── 5. Why Kiran — Feature Points ───────── */}
      <WhyKiran />

      {/* ── 6. Manufacturing Process ────────────── */}
      <Manufacturing />

      {/* ── 7. Global Export Reach ──────────────── */}
      <GlobalExport />

      {/* ── 8. Collections Showcase ─────────────── */}
      <CollectionsShowcase />

      {/* ── 9. Custom & Private Label ───────────── */}
      <CustomPrivateLabel />

      {/* ── 10. Final CTA ───────────────────────── */}
      <CTASection
        eyebrow={t('home.cta.eyebrow')}
        title={t('home.cta.title')}
        lead={t('home.cta.lead')}
        primaryLabel={t('home.cta.primary')}
        primaryHref="/contact"
        secondaryLabel={t('home.cta.secondary')}
        secondaryHref="/collections"
        note={t('home.cta.note')}
      />

    </>
  );
}