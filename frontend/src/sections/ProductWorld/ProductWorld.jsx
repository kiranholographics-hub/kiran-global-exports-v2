import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ImageReveal from '@/components/ImageReveal/ImageReveal';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { categories } from '@/data/categories';
import styles from './ProductWorld.module.css';

/* ── Panel index label ─────────────────────────── */
const PANEL_INDEX = {
  towels: '01',
  linen: '02',
};

/* ═══════════════════════════════════════════════ */
export default function ProductWorld() {
  const { t } = useTranslation();

  return (
    <section className={styles.section} aria-label="Our Collections">

      {categories.map((cat) => {
        const itemsRaw = t(`home.productWorld.${cat.slug}.items`, {
          returnObjects: true,
        });

        // i18next can return a string/object when a translation key is
        // missing or has the wrong structure. Always provide an array to
        // the renderer so the component cannot crash on items.map().
        const items = Array.isArray(itemsRaw) ? itemsRaw : [];

        return (
          <Link
            to={`/${cat.slug}`}
            key={cat.slug}
            className={styles.panel}
            aria-label={t('home.productWorld.exploreAria', { name: cat.name })}
          >

            {/* ── Background Image ──────────────── */}
            <ImageReveal
              src={cat.heroImage}
              alt={`${cat.name} collection`}
              label={`${cat.name} — Category Image`}
              className={styles.media}
              reveal={false}
            />

            {/* ── Cinematic Overlay ─────────────── */}
            <div className={styles.overlay} aria-hidden="true" />

            {/* ── Large Corner Index ────────────── */}
            <span className={styles.cornerIndex} aria-hidden="true">
              {PANEL_INDEX[cat.slug]}
            </span>

            {/* ── Content ───────────────────────── */}
            <div className={styles.content}>
              <ScrollReveal>

                {/* Eyebrow */}
                <p className={styles.panelEyebrow}>
                  {PANEL_INDEX[cat.slug]} — {t('home.productWorld.collectionSuffix')}
                </p>

                {/* Title */}
                <h2 className={styles.title}>
                  {cat.name}
                </h2>

                {/* Accent divider */}
                <div
                  className={styles.titleDivider}
                  aria-hidden="true"
                />

                {/* Item List */}
                <ul className={styles.list}>
                  {items.map((item) => (
                    <li key={String(item)}>{item}</li>
                  ))}
                </ul>

                {/* CTA */}
                <span className={styles.cta}>
                  {t('home.productWorld.exploreCta', { name: cat.name })}
                  <span
                    className={styles.ctaArrow}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </span>

              </ScrollReveal>
            </div>

          </Link>
        );
      })}

    </section>
  );
}
