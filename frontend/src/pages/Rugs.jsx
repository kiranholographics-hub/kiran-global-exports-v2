import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO/SEO';
import RugCatalogue from '@/components/RugCatalogue/RugCatalogue';

/* ═══════════════════════════════════════════════
 * Rugs Page — wraps the full RugCatalogue component
 * Hero + category grid + CTA all handled inside
 * RugCatalogue — this page only manages SEO.
═══════════════════════════════════════════════ */
export default function RugsPage() {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title={t('catalogue.rugs.seoTitle')}
        description={t('catalogue.rugs.seoDescription')}
        noindex
      />
      <RugCatalogue />
    </>
  );
}