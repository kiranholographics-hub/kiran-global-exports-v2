import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { towelProducts } from '@/data/towelCatalog';
import { getTowelProductPath } from '@/data/towelHierarchy';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './FeaturedProducts.module.css';

/* ═══════════════════════════════════════════════ */
export default function FeaturedProducts() {
  const { t } = useTranslation();
  const products = towelProducts
    .filter((product) => product.featured)
    .slice(0, 6);

  return (
    <section
      className={`${styles.section} section section--spacious`}
      aria-labelledby="featured-towels-title"
    >
      <div className="container">

        {/* ── Section Heading ─────────────────── */}
        <div className={styles.heading}>
          <div>
            <ScrollReveal>
              <p className="eyebrow">
                {t('home.featuredProducts.eyebrow')}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 id="featured-towels-title">
                {t('home.featuredProducts.title')}
              </h2>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.15}>
            <p>
              {t('home.featuredProducts.lead')}
            </p>
          </ScrollReveal>
        </div>

        {/* ── Product Grid ────────────────────── */}
        <div className={styles.grid}>
          {products.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 0.07}>
              <Link
                to={getTowelProductPath(product)}
                className={styles.card}
                aria-label={`View details for ${product.name}`}
              >

                {/* Media */}
                <div className={styles.media}>
                  <img
                    src={product.images[0]}
                    alt={product.alt}
                    loading={index < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                  />

                  {/* Hover Quick View Tag */}
                  <span
                    className={styles.mediaTag}
                    aria-hidden="true"
                  >
                    {t('home.featuredProducts.viewDetails')}
                  </span>
                </div>

                {/* Body */}
                <div className={styles.body}>

                  {/* Category */}
                  <p className={styles.category}>
                    {product.subcategory.replaceAll('-', ' ')}
                  </p>

                  {/* Name */}
                  <h3>{product.name}</h3>

                  {/* Description */}
                  <p>{product.shortDescription}</p>

                  {/* View Link */}
                  <span className={styles.viewLink}>
                    {t('home.featuredProducts.viewDetails')}
                    <span
                      className={styles.viewArrow}
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </span>

                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* ── Footer Link Row ──────────────────── */}
        <div className={styles.footerLink}>
          <p className={styles.footerNote}>
            {t('home.featuredProducts.showing', { shown: products.length, total: towelProducts.length })}
          </p>

          <Link to="/towels">
            {t('home.featuredProducts.exploreAll')}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
