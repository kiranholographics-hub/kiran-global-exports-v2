import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO/SEO';
import NotFoundContent from '@/components/NotFoundContent/NotFoundContent';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import {
  getTowelMainCategory,
  getTowelProductPath,
} from '@/data/towelHierarchy';
import styles from './TowelHierarchy.module.css';

/* ═══════════════════════════════════════════════ */
export default function TowelCategoryPage() {
  const { t } = useTranslation();
  const { categorySlug } = useParams();
  const category = getTowelMainCategory(categorySlug);

  /* ── 404 ──────────────────────────────────── */
  if (!category) return <NotFoundContent />;

  /* ── Derived ──────────────────────────────── */
  const productCount      = category.products.length;
  const hasSubcategories  = category.subcategories.length > 0;
  const paddedCount       = String(productCount).padStart(2, '0');

  return (
    <>
      <SEO
        title={`${category.name} | Premium Towel Supplier & Exporter`}
        description={`${category.name} collections developed for hospitality, retail, spa and private-label buyers by Kiran Global Exports.`}
        image={category.representativeImage}
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
            <strong aria-current="page">
              {category.name}
            </strong>
          </nav>

          {/* ── Back Link ─────────────────────── */}
          <Link to="/towels" className={styles.back}>
            {t('categoryPage.backTo', { name: t('nav.towels') })}
          </Link>

          {/* ── Hero — Two Column ─────────────── */}
          <ScrollReveal>
            <header className={styles.hero}>

              {/* Left — text */}
              <div>
                <p className="eyebrow">
                  {category.name} / {t('categoryPage.reference', { count: productCount })}
                </p>
                <h1>{category.name}</h1>
                <p className={styles.lead}>
                  {category.description}
                </p>
              </div>

              {/* Right — image */}
              <img
                src={category.representativeImage}
                alt={`${category.name} collection`}
                loading="eager"
                decoding="async"
              />

            </header>
          </ScrollReveal>

          {/* ── Subcategories Grid ─────────────── */}
          {hasSubcategories && (
            <section
              className={styles.section}
              aria-labelledby="subcategory-heading"
            >

              {/* Heading */}
              <ScrollReveal>
                <div className={styles.sectionHeading}>
                  <div>
                    <p className="eyebrow">
                      {t('categoryPage.subcategoriesEyebrow', { name: category.name })}
                    </p>
                    <h2 id="subcategory-heading">
                      {t('categoryPage.chooseConstruction')}
                    </h2>
                  </div>
                </div>
              </ScrollReveal>

              {/* Grid */}
              <div
                className={styles.subcategoryGrid}
                role="list"
                aria-label="Towel subcategories"
              >
                {category.subcategories.map((sub, index) => (
                  <ScrollReveal
                    key={sub.slug}
                    delay={index * 0.07}
                  >
                    <Link
                      className={styles.subcategoryCard}
                      to={`/towels/${category.slug}/${sub.slug}`}
                      role="listitem"
                      aria-label={`Explore ${sub.name} collection`}
                    >

                      {/* Media */}
                      <div className={styles.cardMedia}>
                        <img
                          src={sub.representativeImage}
                          alt={`${sub.name} towel collection`}
                          loading={index > 1 ? 'lazy' : 'eager'}
                          decoding="async"
                        />
                        <span aria-hidden="true">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Body */}
                      <h3>{sub.name}</h3>
                      <p>{sub.description}</p>
                      <small>
                        {t('categoryPage.reference', { count: sub.products.length })}
                        {' · '}
                        {t('catalogue.viewCollection')} →
                      </small>

                    </Link>
                  </ScrollReveal>
                ))}
              </div>

            </section>
          )}

          {/* ── All Products Grid ──────────────── */}
          <section
            className={styles.section}
            aria-labelledby="products-heading"
          >

            {/* Heading */}
            <ScrollReveal>
              <div className={styles.sectionHeading}>
                <div>
                  <p className="eyebrow">{t('categoryPage.productCollection')}</p>
                  <h2 id="products-heading">
                    {hasSubcategories
                      ? t('categoryPage.allReferences')
                      : t('categoryPage.realReferences')}
                  </h2>
                </div>
              </div>
            </ScrollReveal>

            {/* Grid */}
            <div
              className={styles.productGrid}
              role="list"
              aria-label={`${category.name} products`}
            >
              {category.products.map((product, index) => (
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
                    <p className="eyebrow">{category.name}</p>
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
              <p className="eyebrow">
                {t('catalogue.towels.ctaEyebrow')}
              </p>
              <h2>{t('categoryPage.requestProductDetails')}</h2>
              <Link
                to={`/contact?interest=${encodeURIComponent(
                  category.name
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
