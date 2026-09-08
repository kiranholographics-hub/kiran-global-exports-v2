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
import styles from './RugCatalogue.module.css';

/* ═══════════════════════════════════════════════ */
export default function RugCatalogue() {
  const { t } = useTranslation();
  const category = getCategoryBySlug('rugs');
  const products  = getProductsByCategory('rugs');

  /* Build collections with representative images */
  const collections = category.subcategories.map((item) => {
    const items = products.filter(
      (product) => product.subcategory === item.slug
    );
    return {
      ...item,
      products:            items,
      representativeImage: items[0]?.images?.[0] || category.heroImage,
    };
  });

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
        aria-label="Rug collection introduction"
      >
        <div className={styles.heroStage}>

          {/* Media */}
          <div className={styles.heroMediaWrap}>
            <CinematicHeroVideo
              className={styles.heroMedia}
              style={{ scale: mediaScale }}
              desktopSource="/videos/Rugs-page.mp4"
              mobileSource="/videos/Rugs-page.mp4"
    
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
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              {t('catalogue.rugs.heroEyebrow')}
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
              {t('catalogue.rugs.heroTitle')}
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
              {t('catalogue.rugs.heroLead')}
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
                href="#rug-categories"
                className={styles.heroPrimary}
              >
                <span>{t('catalogue.rugs.exploreCta')}</span>
              </a>
              <Link
                to="/contact"
                className={styles.heroSecondary}
              >
                <span>{t('common.contactExportTeam')}</span>
              </Link>
            </motion.div>

          </motion.div>

          {/* Scroll cue */}
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
      <div id="rug-categories">
        <section
          className="container"
          aria-label="Main rug categories"
        >

          {/* Header */}
          <ScrollReveal>
            <div className={styles.categoryHeader}>
              <div>
                <p className="eyebrow">{t('catalogue.rugs.categoriesEyebrow')}</p>
                <h2>{t('catalogue.rugs.categoriesTitle')}</h2>
              </div>
              <p>
                {t('catalogue.rugs.collectionsCount', { count: collections.length })}
              </p>
            </div>
          </ScrollReveal>

          {/* Grid */}
          <div
            className={styles.categoryGrid}
            role="list"
            aria-label="Rug collections"
          >
            {collections.map((item, index) => (
              <ScrollReveal
                key={item.slug}
                delay={index * 0.07}
              >
                <Link
                  className={styles.categoryCard}
                  to={`/rugs/${item.slug}`}
                  role="listitem"
                  aria-label={`Explore ${item.name} collection`}
                >

                  {/* Media */}
                  <div className={styles.categoryMedia}>
                    <img
                      src={item.representativeImage}
                      alt={`${item.name} collection`}
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
                      {item.products.length
                        ? `${t('catalogue.reference', { count: item.products.length })} · ${t('catalogue.viewCollection')}`
                        : `${t('catalogue.customDevelopment')} · ${t('catalogue.viewCollection')}`}
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
              {t('catalogue.rugs.ctaEyebrow')}
            </p>
            <h2>
              {t('catalogue.rugs.ctaTitle')}
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
