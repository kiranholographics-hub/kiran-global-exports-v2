import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import certifications from '@/data/certifications';
import styles from './CertificationGallery.module.css';

/* ═══════════════════════════════════════════════ */
export default function CertificationGallery() {
  const { t } = useTranslation();
  const TRUST_CHIPS = [
    t('certifications.chips.quality'),
    t('certifications.chips.ethical'),
    t('certifications.chips.compliant'),
  ];

  return (
    <section
      className={styles.section}
      aria-labelledby="certifications-heading"
    >
      <div className={`container ${styles.inner}`}>

        {/* ══ Intro Column ═════════════════════════ */}
        <div className={styles.intro}>
          <ScrollReveal>

            {/* Eyebrow */}
            <p className={styles.introEyebrow}>
              {t('certifications.eyebrow')}
            </p>

            {/* Heading */}
            <h2 id="certifications-heading">
              {t('certifications.heading')}
            </h2>

            {/* Warm divider */}
            <div
              className={styles.introDivider}
              aria-hidden="true"
            />

            {/* Copy */}
            <p>
              {t('certifications.copy')}
            </p>

            {/* Trust Chips */}
            <div
              className={styles.trustChips}
              aria-label="Trust indicators"
            >
              {TRUST_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className={styles.trustChip}
                >
                  <span
                    className={styles.trustChipDot}
                    aria-hidden="true"
                  />
                  {chip}
                </span>
              ))}
            </div>

          </ScrollReveal>
        </div>

        {/* ══ Certification Logo Gallery ═══════════ */}
        <div
          className={styles.gallery}
          role="list"
          aria-label="Certifications and compliance standards"
        >
          {certifications.map((cert, index) => (
            <ScrollReveal
              key={cert.name}
              delay={index * 0.06}
              amount={0.2}
            >
              <div
                className={styles.logoItem}
                role="listitem"
              >
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={cert.alt}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <p className={styles.textOnly}>{cert.text}</p>
                )}
                {cert.caption && (
                  <p className={styles.caption}>{cert.caption}</p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
