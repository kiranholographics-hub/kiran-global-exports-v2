import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO/SEO';
import NotFoundContent from '@/components/NotFoundContent/NotFoundContent';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { getCategoryBySlug } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import { getLinenProductPath } from '@/data/linenHierarchy';
import styles from './TowelHierarchy.module.css';

/* ═══════════════════════════════════════════════ */
export default function LinenCategoryPage() {
  const { t } = useTranslation();
  const { slug } = useParams();

  const category   = getCategoryBySlug('linen');
  const subcategory = category?.subcategories.find(
    (item) => item.slug === slug
  );
  const products = getProductsByCategory('linen').filter(
    (item) => item.subcategory === slug
  );

  /* ── 404 ──────────────────────────────────── */
  if (!subcategory) return <NotFoundContent />;

  /* ── Derived ──────────────────────────────── */
  const name = t(`linen.categories.${slug}.name`);
  const description = t(`linen.categories.${slug}.description`);
  const productCount = products.length;

  return (
    <>
      <SEO
        title={`${name} | Premium Linen Supplier & Exporter`}
        description={`${description} Developed for hospitality, retail and private-label buyers by Kiran Global Exports.`}
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
            <Link to="/linen">{t('nav.linen')}</Link>
            <span aria-hidden="true">/</span>
            <strong aria-current="page">
              {name}
            </strong>
          </nav>

          {/* ── Back Link ─────────────────────── */}
          <Link to="/linen" className={styles.back}>
            {t('categoryPage.backTo', { name: t('nav.linen') })}
          </Link>

          {/* ── Sub Hero ──────────────────────── */}
          <ScrollReveal>
            <header className={styles.subHero}>
              <p className="eyebrow">{t('nav.linen')}</p>
              <h1>{name}</h1>
              <p className={styles.lead}>
                {description}
              </p>
            </header>
          </ScrollReveal>

          {/* ── Products Grid ─────────────────── */}
          {productCount > 0 && (
            <section
              className={styles.section}
              aria-labelledby="linen-collection-heading"
            >
              {/* Section heading */}
              <ScrollReveal>
                <div className={styles.sectionHeading}>
                  <div>
                    <p className="eyebrow">
                      {t('categoryPage.availableReference', { count: productCount })}
                    </p>
                    <h2 id="linen-collection-heading">
                      {t('categoryPage.productCollection')}
                    </h2>
                  </div>
                </div>
              </ScrollReveal>

              {/* Product grid */}
              <div
                className={styles.productGrid}
                role="list"
                aria-label={`${name} products`}
              >
                {products.map((product, index) => (
                  <ScrollReveal
                    key={product.id}
                    delay={index * 0.06}
                    className={styles.revealItem}
                  >
                    <Link
                      className={styles.productCard}
                      to={getLinenProductPath(product)}
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
                        {name}
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
                {t('linen.cta.eyebrow')}
              </p>
              <h2>{t('categoryPage.requestProductDetails')}</h2>
              <Link
                to={`/contact?interest=${encodeURIComponent(name)}`}
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
