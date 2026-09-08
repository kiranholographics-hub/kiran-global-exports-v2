import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO/SEO';
import ProductCard from '@/components/ProductCard/ProductCard';
import LinenTile from '@/components/LinenTile/LinenTile';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import CTASection from '@/components/CTASection/CTASection';
import { getAllProducts } from '@/data/products';
import { linenProducts } from '@/data/linenCatalog';
import styles from './Collections.module.css';

/* ── Worlds Config (name/copy come from i18n; match/href/id stay static) ── */
const WORLD_SLUGS = [
  { id: 'hotel', match: ['Hospitality', 'Resorts'], href: '/towels#hotel', linen: ['bed', 'table-dining'] },
  { id: 'spa', match: ['Spa', 'Wellness'], href: '/towels#spa', linen: ['home-textile'] },
  { id: 'home', match: ['Home'], href: '/towels#home', linen: ['bed', 'home-textile'] },
  { id: 'hospitality', match: ['Hospitality'], href: '/towels#hospitality', linen: ['bed', 'table-dining'] },
  { id: 'retail', match: ['Retail', 'Lifestyle', 'E-commerce'], href: '/towels#retail', linen: ['home-textile', 'custom-private-label'] },
];

// One representative image per Linen subcategory, pulled from the real
// product catalogue (first product found for that subcategory) — keeps
// this in sync with linenCatalog.js automatically instead of maintaining
// a second, separate list of images that can drift out of date.
const linenBySlug = new Map(
  linenProducts.reduce((map, product) => {
    if (!map.has(product.subcategory)) {
      map.set(product.subcategory, { slug: product.subcategory, image: product.images[0] });
    }
    return map;
  }, new Map())
);

/* ── Helper ────────────────────────────────────── */
const productsFor = (match) =>
  getAllProducts().filter((product) =>
    product.applications?.some((item) => match.includes(item))
  );

/* ── Hero animation ────────────────────────────── */
const heroVariants = {
  eyebrow: {
    initial:  { opacity: 0, y: 14 },
    animate:  { opacity: 1, y: 0 },
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
  title: {
    initial:  { opacity: 0, y: 24 },
    animate:  { opacity: 1, y: 0 },
    transition: { duration: 0.90, delay: 0.12, ease: [0.16, 1, 0.3, 1] },
  },
  lead: {
    initial:  { opacity: 0, y: 16 },
    animate:  { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay: 0.28, ease: [0.16, 1, 0.3, 1] },
  },
  link: {
    initial:  { opacity: 0, y: 12 },
    animate:  { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ═══════════════════════════════════════════════ */
export default function CollectionsPage() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t('collections.seo.title')}
        description={t('collections.seo.description')}
        noindex
      />

      {/* ══ Hero ══════════════════════════════════ */}
      <section
        className={styles.hero}
        aria-label="Collections introduction"
      >
        {/* Video */}
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source
            src="/videos/Collection-page.mp4"
            type="video/mp4"
          />
        </video>

        {/* Overlay */}
        <div
          className={styles.overlay}
          aria-hidden="true"
        />

        {/* Content */}
        <div className={`container ${styles.heroContent}`}>

          {/* Eyebrow */}
          <motion.p
            className={styles.heroEyebrow}
            {...heroVariants.eyebrow}
          >
            {t('collections.hero.eyebrow')}
          </motion.p>

          {/* Title */}
          <motion.h1 {...heroVariants.title}>
            {t('collections.hero.title')}
          </motion.h1>

          {/* Lead */}
          <motion.p {...heroVariants.lead}>
            {t('collections.hero.lead')}
          </motion.p>

          {/* CTA link */}
          <motion.a
            className={styles.heroLink}
            href="#collection-list"
            {...heroVariants.link}
          >
            {t('collections.hero.exploreLink')}{' '}
            <span aria-hidden="true">↓</span>
          </motion.a>

        </div>
      </section>

      {/* ══ Collection Worlds ═════════════════════ */}
      <div id="collection-list">
        {WORLD_SLUGS.map((world) => {
          const products = productsFor(world.match);
          const linenItems = (world.linen || []).map((slug) => linenBySlug.get(slug)).filter(Boolean);
          if (!products.length && !linenItems.length) return null;
          const name = t(`home.collectionsShowcase.worlds.${world.id}.name`);
          const copy = t(`collections.worlds.${world.id}.copy`);

          return (
            <section
              key={world.id}
              id={world.id}
              className={styles.collection}
              aria-labelledby={`heading-${world.id}`}
            >
              <div className="container">

                {/* Intro header */}
                <ScrollReveal className={styles.intro}>

                  {/* World label */}
                  <div>
                    <p className="eyebrow">{t('collections.worldLabel')}</p>
                    <h2 id={`heading-${world.id}`}>
                      {name}
                    </h2>
                  </div>

                  {/* Description */}
                  <p>{copy}</p>

                </ScrollReveal>

                {/* Product grid */}
                <div
                  className={styles.grid}
                  role="list"
                  aria-label={`${name} products`}
                >
                  {products.slice(0, 4).map((product, i) => (
                    <ScrollReveal
                      key={product.id}
                      delay={i * 0.07}
                    >
                      <div role="listitem">
                        <ProductCard product={product} />
                      </div>
                    </ScrollReveal>
                  ))}
                  {linenItems.map((item, i) => (
                    <ScrollReveal
                      key={item.slug}
                      delay={(products.slice(0, 4).length + i) * 0.07}
                    >
                      <div role="listitem">
                        <LinenTile slug={item.slug} image={item.image} />
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                {/* View more — if more than 4 products */}
                {products.length > 4 && (
                  <ScrollReveal delay={0.3}>
                    <Link
                      to={world.href}
                      className={styles.viewMore}
                    >
                      {t('collections.viewMore', { name })}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </ScrollReveal>
                )}

              </div>
            </section>
          );
        })}
      </div>

      {/* ══ Custom Section ════════════════════════ */}
      <section
        className={styles.custom}
        aria-labelledby="custom-heading"
      >
        <div className={`container ${styles.customInner}`}>
          <ScrollReveal>
            <p className="eyebrow">{t('collections.custom.eyebrow')}</p>
            <h2 id="custom-heading">
              {t('collections.custom.title')}
            </h2>
            <p>
              {t('collections.custom.copy')}
            </p>
            <Link to="/custom">
              <span>
                {t('collections.custom.link')}
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA Section ─────────────────────────── */}
      <CTASection
        eyebrow={t('collections.cta.eyebrow')}
        title={t('collections.cta.title')}
        lead={t('collections.cta.lead')}
        primaryHref="/contact"
        primaryLabel={t('common.contactExportTeam')}
        secondaryHref="/custom"
        secondaryLabel={t('collections.cta.secondary')}
        note={t('common.responseNote')}
      />

    </>
  );
}
