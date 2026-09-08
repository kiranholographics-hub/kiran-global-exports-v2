import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from '@/components/ProductCard/ProductCard.module.css';

/* ═══════════════════════════════════════════════
 * Renders a Linen category with the exact same visual
 * treatment as ProductCard, so it blends into the same
 * grid — links to the real category listing page now
 * that Linen has its own product catalogue and detail
 * pages (see LinenCategoryPage / LinenDetail).
═══════════════════════════════════════════════ */
export default function LinenTile({ slug, image }) {
  const { t } = useTranslation();
  const name = t(`linen.categories.${slug}.name`);
  const description = t(`linen.categories.${slug}.description`);

  return (
    <Link
      to={`/linen/${slug}`}
      className={styles.card}
      aria-label={`View ${name}`}
    >
      <div className={styles.mediaWrap}>
        <span className={styles.media}>
          <img
            src={image}
            alt={name}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </span>
        <div className={styles.mediaOverlay} aria-hidden="true" />
        <span className={styles.quickTag} aria-hidden="true">
          {t('productCard.viewDetails')}
        </span>
      </div>

      <div className={styles.body}>
        <p className={styles.category}>{t('nav.linen')}</p>
        <p className={styles.name}>{name}</p>
        <p className={styles.desc}>{description}</p>
        <span className={styles.link}>
          {t('productCard.requestDetails')}
          <span className={styles.linkArrow} aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
