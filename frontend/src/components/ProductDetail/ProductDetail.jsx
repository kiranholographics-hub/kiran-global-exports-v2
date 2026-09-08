import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO/SEO';
import NotFoundContent from '@/components/NotFoundContent/NotFoundContent';
import ImageReveal from '@/components/ImageReveal/ImageReveal';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import ProductCard from '@/components/ProductCard/ProductCard';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { getCategoryBySlug } from '@/data/categories';
import styles from './ProductDetail.module.css';

/* ═══════════════════════════════════════════════ */
export default function ProductDetail({
  categorySlug,
  parentCategorySlug,
  slug,
}) {
  const { t } = useTranslation();
  const product = getProductBySlug(slug);

  /* ── Spec Rows Config ──────────────────────────── */
  const SPEC_ROWS = [
    [t('productDetail.specs.material'), 'material'],
    [t('productDetail.specs.gsm'), 'gsm'],
    [t('productDetail.specs.size'), 'size'],
    [t('productDetail.specs.construction'), 'construction'],
    [t('productDetail.specs.colors'), 'colors', (v) => v.join(', ')],
    [t('productDetail.specs.applications'), 'applications', (v) => v.join(', ')],
    [t('productDetail.specs.customization'), 'customization'],
    [t('productDetail.specs.branding', 'Branding'), 'branding'],
    [t('productDetail.specs.moq'), 'moq'],
    [t('productDetail.specs.packing'), 'packing'],
  ];

  /* ── 404 State ───────────────────────────────── */
  if (!product || product.category !== categorySlug) {
    return (
      <>
        <SEO title={t('productDetail.notFoundTitle')} noindex />
        <NotFoundContent
          title={t('productDetail.notFoundHeading')}
          copy={t('productDetail.notFoundCopy')}
        />
      </>
    );
  }

  /* ── Data ────────────────────────────────────── */
  const category       = getCategoryBySlug(categorySlug);
  const parentCategory = parentCategorySlug
    ? getCategoryBySlug('towels')?.subcategories.find(
        (item) => item.slug === parentCategorySlug
      )
    : null;
  const related = getRelatedProducts(product, 3);

  const interestLabel =
    categorySlug === 'towels' ? 'Towels' : categorySlug === 'rugs' ? 'Rugs' : 'Linen';
  const inquiryHref = `/contact?product=${encodeURIComponent(
    product.slug
  )}&interest=${encodeURIComponent(interestLabel)}`;

  const productType =
    categorySlug === 'towels' ? 'Towel' : categorySlug === 'rugs' ? 'Rug' : 'Linen Product';

  return (
    <>
      <SEO
        title={`${product.name} — Premium ${productType}`}
        description={product.shortDescription}
        image={product.images?.[0]}
        noindex
      />

      {/* ══ Hero ══════════════════════════════════ */}
      <section className={styles.hero}>

        {/* Breadcrumbs */}
        <div className={`container ${styles.crumbWrap}`}>
          <nav
            aria-label="Breadcrumb"
            className={styles.breadcrumbs}
          >
            <ol>
              <li>
                <Link to="/">{t('nav.home')}</Link>
                <span
                  className={styles.breadcrumbSep}
                  aria-hidden="true"
                >
                  /
                </span>
              </li>
              <li>
                <Link to={`/${categorySlug}`}>
                  {category.name}
                </Link>
                <span
                  className={styles.breadcrumbSep}
                  aria-hidden="true"
                >
                  /
                </span>
              </li>
              {parentCategory && (
                <li>
                  <Link to={`/towels/${parentCategory.slug}`}>
                    {parentCategory.name}
                  </Link>
                  <span
                    className={styles.breadcrumbSep}
                    aria-hidden="true"
                  >
                    /
                  </span>
                </li>
              )}
              <li>
                <span aria-current="page">
                  {product.name}
                </span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Main Grid */}
        <div className={`container ${styles.grid}`}>

          {/* ── Gallery Column ──────────────────── */}
          <div className={styles.gallery}>
            {product.images.map((src, i) => (
              <ImageReveal
                key={src}
                src={src}
                alt={`${product.name} — view ${i + 1}`}
                label={product.name}
                className={styles.image}
                priority={i === 0}
              />
            ))}
          </div>

          {/* ── Info Column ─────────────────────── */}
          <div className={styles.info}>
            <ScrollReveal>

              {/* Eyebrow */}
              <p className={styles.infoEyebrow}>
                {category.name}
              </p>

              {/* Title */}
              <h1 className={styles.title}>
                {product.name}
              </h1>

              {/* Divider */}
              <div
                className={styles.infoDivider}
                aria-hidden="true"
              />

              {/* Short description */}
              <p className={styles.short}>
                {product.shortDescription}
              </p>

              {/* Full description */}
              {product.description && (
                <p className={styles.desc}>
                  {product.description}
                </p>
              )}

              {/* Specs */}
              <dl className={styles.specs}>
                {SPEC_ROWS.map(([label, key, fmt]) => {
                  const value = product[key];
                  if (!value) return null;
                  return (
                    <div
                      key={key}
                      className={styles.specRow}
                    >
                      <dt>{label}</dt>
                      <dd>{fmt ? fmt(value) : value}</dd>
                    </div>
                  );
                })}
              </dl>

              {/* Best For (when supplied) */}
              {product.bestFor && (
                <div className={styles.bestFor}>
                  <p className={styles.bestForLabel}>
                    {t('productDetail.bestForLabel')}
                  </p>
                  <p className={styles.bestForText}>{product.bestFor}</p>
                </div>
              )}

              {/* CTA Block */}
              <div className={styles.ctaBlock}>
                <p className={styles.ctaHeading}>
                  {t('productDetail.interestedHeading')}
                </p>
                <p className={styles.ctaSubtext}>
                  {t('productDetail.interestedSubtext')}
                </p>
                <Link
                  to={inquiryHref}
                  className={styles.cta}
                >
                  <span className={styles.ctaInner}>
                    {t('common.contactExportTeam')}
                    <span
                      className={styles.ctaArrow}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </div>

            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ══ Related Products ══════════════════════ */}
      {related.length > 0 && (
        <section
          className={`section section--spacious ${styles.relatedSection}`}
        >
          <div className="container">

            {/* Header */}
            <ScrollReveal>
              <div className={styles.relatedHeader}>
                <div>
                  <p className="eyebrow">{t('productDetail.youMayAlsoLike')}</p>
                  <h2 className={styles.relatedTitle}>
                    {t('productDetail.moreFrom', { name: category.name })}
                  </h2>
                </div>

                {/* View all link */}
                <Link
                  to={`/${categorySlug}`}
                  className={styles.relatedAll}
                >
                  {t('productDetail.viewAll')}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </ScrollReveal>

            {/* Related Grid */}
            <div className={styles.relatedGrid}>
              {related.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 0.08}>
                  <ProductCard product={p} />
                </ScrollReveal>
              ))}
            </div>

          </div>
        </section>
      )}

    </>
  );
}
