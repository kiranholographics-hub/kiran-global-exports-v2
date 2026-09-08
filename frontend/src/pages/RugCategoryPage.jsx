import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO/SEO';
import NotFoundContent from '@/components/NotFoundContent/NotFoundContent';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { getCategoryBySlug } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import styles from './TowelHierarchy.module.css';

/* ═══════════════════════════════════════════════ */
export default function RugCategoryPage() {
  const { t } = useTranslation();
  const { slug } = useParams();

  const category   = getCategoryBySlug('rugs');
  const collection = category?.subcategories.find(
    (item) => item.slug === slug
  );
  const products = getProductsByCategory('rugs').filter(
    (item) => item.subcategory === slug
  );

  /* ── 404 ──────────────────────────────────── */
  if (!collection) return <NotFoundContent />;

  /* ── Derived ──────────────────────────────── */
  const hasProducts  = products.length > 0;
  const productCount = products.length;

  return (
    <>
      <SEO
        title={`${collection.name} | Premium Rug Supplier & Exporter`}
        description={`${collection.name} developed for hospitality, retail and private-label buyers by Kiran Global Exports.`}
        image={products[0]?.images?.[0] || category.heroImage}
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
            <Link to="/rugs">{t('nav.rugs')}</Link>
            <span aria-hidden="true">/</span>
            <strong aria-current="page">
              {collection.name}
            </strong>
          </nav>

          {/* ── Back Link ─────────────────────── */}
          <Link to="/rugs" className={styles.back}>
            {t('categoryPage.backTo', { name: t('nav.rugs') })}
          </Link>

          {/* ── Sub Hero ──────────────────────── */}
          <ScrollReveal>
            <header className={styles.subHero}>
              <p className="eyebrow">{t('categoryPage.rugCollectionEyebrow')}</p>
              <h1>{collection.name}</h1>
              <p className={styles.lead}>
                {hasProducts
                  ? t('categoryPage.rugAvailableLead')
                  : t('categoryPage.rugCustomLead')}
              </p>
            </header>
          </ScrollReveal>

          {/* ── Products Grid ─────────────────── */}
          {hasProducts && (
            <section
              className={styles.section}
              aria-labelledby="rug-collection-heading"
            >
              {/* Section heading */}
              <ScrollReveal>
                <div className={styles.sectionHeading}>
                  <div>
                    <p className="eyebrow">
                      {t('categoryPage.availableReference', { count: productCount })}
                    </p>
                    <h2 id="rug-collection-heading">
                      {t('categoryPage.productCollection')}
                    </h2>
                  </div>
                </div>
              </ScrollReveal>

              {/* Product grid */}
              <div
                className={styles.productGrid}
                role="list"
                aria-label={`${collection.name} products`}
              >
                {products.map((product, index) => (
                  <ScrollReveal
                    key={product.id}
                    delay={index * 0.06}
                    className={styles.revealItem}
                  >
                    <Link
                      className={styles.productCard}
                      to={`/rugs/${product.slug}`}
                      role="listitem"
                      aria-label={`View ${product.name}`}
                    >

                      {/* Media */}
                      <div className={styles.productMedia}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          loading={index > 1 ? 'lazy' : 'eager'}
                          decoding="async"
                        />
                        <span aria-hidden="true">
                          {t('categoryPage.viewDetails')} ↗
                        </span>
                      </div>

                      {/* Body */}
                      <p className="eyebrow">
                        {collection.name}
                      </p>
                      <h3>{product.name}</h3>
                      <p>{product.shortDescription}</p>

                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </section>
          )}

          {/* ── CTA Block ─────────────────────── */}
          <ScrollReveal>
            <div className={styles.cta}>
              <p className="eyebrow">
                {t('catalogue.rugs.ctaEyebrow')}
              </p>
              <h2>{t('categoryPage.requestRugDetails')}</h2>
              <Link
                to={`/contact?interest=${encodeURIComponent(collection.name)}`}
              >
                <span>{t('categoryPage.contactExportTeamArrow')} ↗</span>
              </Link>
            </div>
          </ScrollReveal>

        </div>
      </main>
    </>
  );
}
