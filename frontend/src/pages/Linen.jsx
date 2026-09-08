import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO/SEO';
import LinenCatalogue from '@/components/LinenCatalogue/LinenCatalogue';

export default function LinenPage() {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title={t('linen.seo.title')}
        description={t('linen.seo.description')}
        noindex
      />
      <LinenCatalogue />
    </>
  );
}
