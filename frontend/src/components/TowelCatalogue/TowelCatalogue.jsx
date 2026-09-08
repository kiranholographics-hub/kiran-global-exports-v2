import { Link } from 'react-router-dom';
import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useTranslation } from 'react-i18next';
import CinematicHeroVideo from '@/components/CinematicHeroVideo/CinematicHeroVideo';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { getCategoryBySlug } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import { getRepresentativeImage } from '@/data/towelHierarchy';
import styles from './TowelCatalogue.module.css';

/* ═══════════════════════════════════════════════ */
export default function TowelCatalogue() {
  const { t } = useTranslation();
  const category = getCategoryBySlug('towels');
  const products  = getProductsByCategory('towels');

  /* Build subcategory data */
  const categories = category.subcategories
    .map((item) => ({
      ...item,
      products: products.filter(
        (product) => product.subcategory === item.slug
      ),
      representativeImage: getRepresentativeImage(item.slug),
    }))
    .filter((item) => item.products.length && item.representativeImage);

  /* Scroll parallax */
  const heroRef        = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const contentY       = useTransform(scrollYProgress, [0, 1],    ['0%', '14%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const mediaScale     = useTransform(scrollYProgress, [0, 1],    [1.08, prefersReduced ? 1.08 : 1.28]);

  return (
    <div className={styles.catalogue}>

      {/* ══ Cinematic Hero ════════════════════════ */}
      <section
        ref={heroRef}
        className={styles.hero}
        aria-label="Towel collection introduction"
      >
        <div className={styles.heroStage}>

          {/* Media */}
          <div className={styles.heroMediaWrap}>
            <CinematicHeroVideo
              className={styles.heroMedia}
              style={{ scale: mediaScale }}
              desktopSource="/videos/Towel-page.mp4"
              mobileSource="/videos/Towel-page.mp4"
              poster="/images/towels/hero.jpg"
            />
            <div
              className={styles.heroOverlay}
              aria-hidden="true"
            />
          </div>

          {/* Content */}
          <motion.div
            className={styles.heroContent}
            style={{ y: contentY, opacity: contentOpacity }}
          >

            {/* Eyebrow */}
            <motion.p
              className={styles.heroEyebrow}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {t('catalogue.towels.heroEyebrow')}
            </motion.p>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.90,
                delay:    0.12,
                ease:     [0.16, 1, 0.3, 1],
              }}
            >
              {t('catalogue.towels.heroTitle')}
            </motion.h1>

            {/* Lead */}
            <motion.p
              className={styles.heroLead}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.85,
                delay:    0.30,
                ease:     [0.16, 1, 0.3, 1],
              }}
            >
              {t('catalogue.towels.heroLead')}
            </motion.p>

            {/* Actions */}
            <motion.div
              className={styles.heroActions}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.85,
                delay:    0.50,
                ease:     [0.16, 1, 0.3, 1],
              }}
            >
              <a
                href="#towel-categories"
                className={styles.heroPrimary}
              >
                <span>{t('catalogue.towels.exploreCta')}</span>
              </a>
              <Link
                to="/contact"
                className={styles.heroSecondary}
              >
                <span>{t('common.contactExportTeam')}</span>
              </Link>
            </motion.div>

          </motion.div>

          {/* Scroll Cue */}
          <motion.div
            className={styles.heroScrollCue}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.8 }}
            aria-hidden="true"
          >
            <div className={styles.scrollLine} />
            <p>{t('home.hero.scroll')}</p>
          </motion.div>

        </div>
      </section>

      {/* ══ Category Grid ═════════════════════════ */}
      <div id="towel-categories">
        <section
          className="container"
          aria-label="Main towel categories"
        >

          {/* Header */}
          <ScrollReveal>
            <div className={styles.categoryHeader}>
              <div>
                <p className="eyebrow">{t('catalogue.towels.categoriesEyebrow')}</p>
                <h2>{t('catalogue.towels.categoriesTitle')}</h2>
              </div>
              <p>
                {t('catalogue.towels.collectionsCount', { count: categories.length })}
              </p>
            </div>
          </ScrollReveal>

          {/* Grid */}
          <div
            className={styles.categoryGrid}
            role="list"
            aria-label="Towel categories"
          >
            {categories.map((item, index) => (
              <ScrollReveal
                key={item.slug}
                delay={index * 0.07}
              >
                <Link
                  className={styles.categoryCard}
                  to={`/towels/${item.slug}`}
                  role="listitem"
                  aria-label={`Explore ${item.name} towel collection`}
                >

                  {/* Media */}
                  <div className={styles.categoryMedia}>
                    <img
                      src={item.representativeImage}
                      alt={`${item.name} towel collection`}
                      loading={index < 3 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    <span aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Body */}
                  <div className={styles.categoryBody}>
                    <h2>{item.name}</h2>
                    <p>
                      {t('catalogue.reference', { count: item.products.length })}
                      {' · '}
                      {t('catalogue.viewCollection')}
                    </p>
                    <span aria-hidden="true">↗</span>
                  </div>

                </Link>
              </ScrollReveal>
            ))}
          </div>

        </section>
      </div>

      {/* ══ Catalogue CTA ════════════════════════ */}
      <section className={styles.catalogueCta}>
        <div className="container">
          <ScrollReveal>
            <p className="eyebrow">
              {t('catalogue.towels.ctaEyebrow')}
            </p>
            <h2>
              {t('catalogue.towels.ctaTitle')}
            </h2>
            <Link to="/contact">
              {t('catalogue.requestProductDetails')}{' '}
              <span aria-hidden="true">↗</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
