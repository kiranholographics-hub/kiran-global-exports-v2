import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO/SEO';
import NotFoundContent from '@/components/NotFoundContent/NotFoundContent';

/* ═══════════════════════════════════════════════ */
export default function NotFound() {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title={t('notFound.seoTitle')}
        noindex
      />
      <NotFoundContent />
    </>
  );
}