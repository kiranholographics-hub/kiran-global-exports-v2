import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import ImageReveal from '@/components/ImageReveal/ImageReveal';
import styles from './BrandIntro.module.css';

/* ═══════════════════════════════════════════════ */
export default function BrandIntro() {
  const { t } = useTranslation();

  const STATS = [
    { number: '20+', label: t('home.brandIntro.stats.years') },
    { number: '10+', label: t('home.brandIntro.stats.countries') },
    { number: '1972', label: t('home.brandIntro.stats.clients') },
  ];

  return (
    <section className={`section section--spacious ${styles.section}`}>
      <div className={`container ${styles.grid}`}>

        {/* ══ Text Column ══════════════════════════ */}
        <div className={styles.textCol}>

          {/* Eyebrow */}
          <ScrollReveal>
            <p className="eyebrow">{t('home.brandIntro.eyebrow')}</p>
          </ScrollReveal>

          {/* Heading */}
          <ScrollReveal delay={0.1}>
            <h2 className={styles.heading}>
              {t('home.brandIntro.heading')}
            </h2>
          </ScrollReveal>

          {/* Accent Divider */}
          <ScrollReveal delay={0.15}>
            <div className={styles.divider} aria-hidden="true" />
          </ScrollReveal>

          {/* Copy 1 */}
          <ScrollReveal delay={0.2}>
            <p className={styles.copy}>
              {t('home.brandIntro.copy1')}
            </p>
          </ScrollReveal>

          {/* Copy 2 */}
          <ScrollReveal delay={0.3}>
            <p className={styles.copy}>
              {t('home.brandIntro.copy2')}
            </p>
          </ScrollReveal>

          {/* Copy 3 */}
          <ScrollReveal delay={0.35}>
            <p className={styles.copy}>
              {t('home.brandIntro.copy3')}
            </p>
          </ScrollReveal>

          {/* Stats Row */}
          <ScrollReveal delay={0.4}>
            <div className={styles.stats}>
              {STATS.map((s) => (
                <div key={s.label} className={styles.stat}>
                  <span className={styles.statNumber}>{s.number}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

        </div>

        {/* ══ Image Column ═════════════════════════ */}
        <div className={styles.imageCol}>

          {/* Main Image */}
          <ScrollReveal delay={0.15}>
            <div className={styles.imageMain}>
              <ImageReveal
                src="/images/towels/hero.jpg"
                alt="Folded premium cotton towels in a natural colour palette"
                label="Brand Story — Primary Image"
              />
              {/* Floating label */}
              <span className={styles.imageBadge}>
                {t('home.brandIntro.premiumCotton')}
              </span>
              {/* Corner decoration */}
              <div className={styles.cornerTag} aria-hidden="true" />
            </div>
          </ScrollReveal>

          {/* Detail Image */}
          <ScrollReveal delay={0.30}>
            <div className={styles.imageDetail}>
              <ImageReveal
                src="/images/custom/development.jpg"
                alt="Close-up of woven textile texture"
                label="Brand Story — Detail"
              />
              {/* Floating label */}
              <span className={styles.imageBadge}>
                {t('home.brandIntro.handcrafted')}
              </span>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
