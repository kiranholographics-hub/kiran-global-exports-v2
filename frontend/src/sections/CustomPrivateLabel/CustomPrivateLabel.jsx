import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import ImageReveal from '@/components/ImageReveal/ImageReveal';
import styles from './CustomPrivateLabel.module.css';

/* ═══════════════════════════════════════════════ */
export default function CustomPrivateLabel() {
  const { t } = useTranslation();
  const POINTS = t('home.customPrivateLabel.points', { returnObjects: true });

  return (
    <section className={`section section--spacious ${styles.section}`}>
      <div className={`container ${styles.grid}`}>

        {/* ══ Left — Image Column ══════════════════ */}
        <ScrollReveal delay={0.1}>
          <div className={styles.mediaWrap}>

            {/* Main Image */}
            <ImageReveal
              src="/images/custom/private-label.jpg"
              alt="Custom private-label textile development"
              label="Custom / Private Label"
              className={styles.media}
            />

            {/* Floating badge */}
            <span
              className={styles.mediaBadge}
              aria-hidden="true"
            >
              {t('home.customPrivateLabel.badge')}
            </span>

            {/* Decorative corner */}
            <div
              className={styles.mediaCorner}
              aria-hidden="true"
            />

          </div>
        </ScrollReveal>

        {/* ══ Right — Text Column ══════════════════ */}
        <div className={styles.textCol}>
          <ScrollReveal>

            {/* Eyebrow */}
            <p className="eyebrow">
              {t('home.customPrivateLabel.eyebrow')}
            </p>

            {/* Heading */}
            <h2 className={styles.heading}>
              {t('home.customPrivateLabel.heading')}
            </h2>

            {/* Accent divider */}
            <div
              className={styles.divider}
              aria-hidden="true"
            />

            {/* Copy */}
            <p className={styles.copy}>
              {t('home.customPrivateLabel.copy')}
            </p>

          </ScrollReveal>

          {/* Points List */}
          <ScrollReveal delay={0.15}>
            <ul
              className={styles.list}
              aria-label="Custom capabilities"
            >
              {POINTS.map((p) => (
                <li key={p}>
                  {/* Dot */}
                  <span
                    className={styles.listDot}
                    aria-hidden="true"
                  />

                  {/* Text */}
                  <span className={styles.listText}>{p}</span>

                  {/* Check on hover */}
                  <span
                    className={styles.listCheck}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* CTA Button */}
          <ScrollReveal delay={0.2}>
            <Link
              to="/custom"
              className={styles.cta}
            >
              <span className={styles.ctaText}>
                {t('home.customPrivateLabel.cta')}
                <span
                  className={styles.ctaArrow}
                  aria-hidden="true"
                >
                  →
                </span>
              </span>
            </Link>

            {/* Trust note */}
            <p className={styles.trustNote}>
              {t('home.customPrivateLabel.trustNote')}
            </p>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
