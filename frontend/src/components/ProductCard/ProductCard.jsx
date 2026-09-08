import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ImageReveal from '@/components/ImageReveal/ImageReveal';
import { getTowelProductPath } from '@/data/towelHierarchy';
import styles from './ProductCard.module.css';

/* ── Helper — resolve product href ─────────────── */
function resolveHref(product) {
  if (product.category === 'towels') {
    return getTowelProductPath(product);
  }
  return `/${product.category}/${product.slug}`;
}

/* ── Helper — format category label ────────────── */
function formatCategory(str = '') {
  return str.replaceAll('-', ' ');
}

/* ═══════════════════════════════════════════════ */
export default function ProductCard({ product }) {
  const { t } = useTranslation();
  const href = resolveHref(product);

  return (
    <Link
      to={href}
      className={styles.card}
      aria-label={`View details for ${product.name}`}
    >

      {/* ── Media ─────────────────────────────── */}
      <div className={styles.mediaWrap}>

        <ImageReveal
          src={product.images?.[0]}
          alt={product.alt || product.name}
          label={product.name}
          className={styles.media}
        />

        {/* Hover overlay */}
        <div
          className={styles.mediaOverlay}
          aria-hidden="true"
        />

        {/* Quick tag */}
        <span
          className={styles.quickTag}
          aria-hidden="true"
        >
          {t('productCard.viewDetails')}
        </span>

      </div>

      {/* ── Body ──────────────────────────────── */}
      <div className={styles.body}>

        {/* Category */}
        {product.subcategory && (
          <p className={styles.category}>
            {formatCategory(product.subcategory)}
          </p>
        )}

        {/* Name */}
        <p className={styles.name}>{product.name}</p>

        {/* Description */}
        {product.shortDescription && (
          <p className={styles.desc}>
            {product.shortDescription}
          </p>
        )}

        {/* CTA link */}
        <span className={styles.link}>
          {t('productCard.requestDetails')}
          <span
            className={styles.linkArrow}
            aria-hidden="true"
          >
            →
          </span>
        </span>

      </div>

    </Link>
  );
}