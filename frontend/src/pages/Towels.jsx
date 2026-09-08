import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO/SEO';
import TowelCatalogue from '@/components/TowelCatalogue/TowelCatalogue';

export default function TowelsPage() {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title={t('catalogue.towels.seoTitle')}
        description={t('catalogue.towels.seoDescription')}
        noindex
      />
      <TowelCatalogue />
    </>
  );
}
