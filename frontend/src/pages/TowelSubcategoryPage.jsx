import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO/SEO';
import NotFoundContent from '@/components/NotFoundContent/NotFoundContent';
import ProductDetail from '@/components/ProductDetail/ProductDetail';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { getProductBySlug } from '@/data/products';
import {
  getTowelMainCategory,
  getTowelSubcategory,
  getTowelProductPath,
} from '@/data/towelHierarchy';
import styles from './TowelHierarchy.module.css';

/* ═══════════════════════════════════════════════
 * TowelSubcategoryPage
 *
 * Handles three route cases:
 *  1. Legacy / flat product slug  → renders ProductDetail
 *  2. Valid subcategory           → renders subcategory page
 *  3. No match                    → renders 404
 *
 * Route: /towels/:categorySlug/:subtypeSlug
═══════════════════════════════════════════════ */
export default function TowelSubcategoryPage() {
  const { t } = useTranslation();
  const { categorySlug, subtypeSlug } = useParams();

  /* ── 1. Legacy flat product fallback ─────────── */
  const legacyProduct = getProductBySlug(subtypeSlug);
  if (legacyProduct && legacyProduct.category === 'towels') {
    return (
      <ProductDetail
        categorySlug="towels"
        slug={subtypeSlug}
      />
    );
  }

  /* ── 2. Resolve category + subcategory ───────── */
  const category = getTowelMainCategory(categorySlug);
  const subtype  = getTowelSubcategory(categorySlug, subtypeSlug);

  /* ── 3. 404 ──────────────────────────────────── */
  if (!category || !subtype) return <NotFoundContent />;

  /* ── Derived ─────────────────────────────────── */
  const productCount = subtype.products.length;

  return (
    <>
      <SEO
        title={`${subtype.name} | Kiran Global Exports`}
        description={`${subtype.description} Explore the product collection and request details from Kiran Global Exports.`}
        image={subtype.representativeImage}
        noindex
      />

      <main className={styles.page}>
        <div className="container">

          {/* ── Breadcrumbs ───────────────────── */}
          <nav
            className={styles.breadcrumbs}
            aria-label="Breadcrumb"
          >
            <Link to="/">{t('nav.home')}</Link>
            <span aria-hidden="true">/</span>
            <Link to="/towels">{t('nav.towels')}</Link>
            <span aria-hidden="true">/</span>
            <Link to={`/towels/${category.slug}`}>
              {category.name}
            </Link>
            <span aria-hidden="true">/</span>
            <strong aria-current="page">
              {subtype.name}
            </strong>
          </nav>

          {/* ── Back Link ─────────────────────── */}
          <Link
            to={`/towels/${category.slug}`}
            className={styles.back}
          >
            {t('categoryPage.backTo', { name: category.name })}
          </Link>

          {/* ── Sub Hero ──────────────────────── */}
          <ScrollReveal>
            <header className={styles.subHero}>
              <p className="eyebrow">
                {t('categoryPage.collectionSubcategoryProducts', { category: category.name })}
              </p>
              <h1>{subtype.name}</h1>
              <p className={styles.lead}>
                {subtype.description}
              </p>
            </header>
          </ScrollReveal>

          {/* ── Product Grid ──────────────────── */}
          <section
            className={styles.section}
            aria-labelledby="subtype-products-heading"
          >

            {/* Section heading */}
            <ScrollReveal>
              <div className={styles.sectionHeading}>
                <div>
                  <p className="eyebrow">
                    {t('categoryPage.availableReference', { count: productCount })}
                  </p>
                  <h2 id="subtype-products-heading">
                    {t('categoryPage.productCollection')}
                  </h2>
                </div>
              </div>
            </ScrollReveal>

            {/* Grid */}
            <div
              className={styles.productGrid}
              role="list"
              aria-label={`${subtype.name} products`}
            >
              {subtype.products.map((product, index) => (
                <ScrollReveal
                  key={product.id}
                  delay={index * 0.06}
                  className={styles.revealItem}
                >
                  <Link
                    className={styles.productCard}
                    to={getTowelProductPath(product)}
                    role="listitem"
                    aria-label={`View ${product.name}`}
                  >

                    {/* Media */}
                    <div className={styles.productMedia}>
                      <img
                        src={product.images[0]}
                        alt={product.alt || product.name}
                        loading={index > 1 ? 'lazy' : 'eager'}
                        decoding="async"
                      />
                      <span aria-hidden="true">
                        {t('categoryPage.viewDetails')} ↗
                      </span>
                    </div>

                    {/* Body */}
                    <p className="eyebrow">{subtype.name}</p>
                    <h3>{product.name}</h3>
                    <p>{product.shortDescription}</p>

                  </Link>
                </ScrollReveal>
              ))}
            </div>

          </section>

          {/* ── CTA Block ─────────────────────── */}
          <ScrollReveal>
            <div className={styles.cta}>
              <p className="eyebrow">{t('categoryPage.b2bDevelopment')}</p>
              <h2>{t('categoryPage.requestProductDetails')}</h2>
              <Link
                to={`/contact?interest=${encodeURIComponent(
                  subtype.name
                )}`}
              >
                {t('categoryPage.contactExportTeamArrow')}{' '}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </ScrollReveal>

        </div>
      </main>
    </>
  );
}
