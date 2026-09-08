import { Link } from 'react-router-dom';
import PageIntro from '@/components/PageIntro/PageIntro';
import ProductCard from '@/components/ProductCard/ProductCard';
import SectionHeading from '@/components/SectionHeading/SectionHeading';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import CTASection from '@/components/CTASection/CTASection';
import { getCategoryBySlug } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import styles from './CategoryListing.module.css';

/* ═══════════════════════════════════════════════ */
export default function CategoryListing({ categorySlug }) {
  const category = getCategoryBySlug(categorySlug);
  const products  = getProductsByCategory(categorySlug);

  /* Group products by subcategory */
  const bySubcategory = category.subcategories
    .map((sub) => ({
      sub,
      items: products.filter((p) => p.subcategory === sub.slug),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <>

      {/* ── Page Intro ──────────────────────────── */}
      <PageIntro
        eyebrow="Collection"
        title={category.name}
        lead={category.intro}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: category.name },
        ]}
      />

      {/* ── Subcategory Chip Nav ─────────────────── */}
      <div className="container">
        <nav
          aria-label={`${category.name} categories`}
          className={styles.chipRow}
        >
          {category.subcategories.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className={styles.chip}
            >
              <span>{s.name}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* ── Subcategory Product Sections ─────────── */}
      {bySubcategory.map(({ sub, items }, groupIndex) => (
        <section
          key={sub.slug}
          id={sub.slug}
          className={`section ${styles.subSection}`}
          aria-labelledby={`heading-${sub.slug}`}
        >
          <div className="container">

            {/* Subcategory header */}
            <ScrollReveal>
              <div className={styles.subHeader}>
                <SectionHeading
                  title={sub.name}
                  as="h2"
                  id={`heading-${sub.slug}`}
                />
                <span
                  className={styles.productCount}
                  aria-label={`${items.length} products`}
                >
                  {items.length} {items.length === 1 ? 'Style' : 'Styles'}
                </span>
              </div>
            </ScrollReveal>

            {/* Product grid */}
            {items.length > 0 ? (
              <div
                className={styles.grid}
                role="list"
                aria-label={`${sub.name} products`}
              >
                {items.map((p, i) => (
                  <ScrollReveal
                    key={p.id}
                    delay={i * 0.06}
                  >
                    <div role="listitem">
                      <ProductCard product={p} />
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <div
                className={styles.emptyState}
                aria-live="polite"
              >
                No products in this category yet
              </div>
            )}

          </div>
        </section>
      ))}

      {/* ── Bottom Note ─────────────────────────── */}
      <div className="container">
        <div className={styles.noteSection}>
          <ScrollReveal>
            <p className={styles.note}>
              Looking for a category not shown above? Every type listed
              can be developed to your specification.{' '}
              <Link to="/custom">
                Discuss your requirements
              </Link>{' '}
              with our export team.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* ── CTA Section ─────────────────────────── */}
      <CTASection
        eyebrow="Interested In This Range?"
        title="Contact our export team."
        lead="Share your specification and estimated quantity — we'll respond with full product details."
        primaryLabel="Request Product Details"
        primaryHref="/contact"
        secondaryLabel="Browse All Collections"
        secondaryHref="/collections"
        note="Typical response within 24 hours"
      />

    </>
  );
}