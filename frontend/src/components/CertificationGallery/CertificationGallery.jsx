import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import staticCertifications from '@/data/certifications';
import { fetchCertifications } from '@/lib/certifications';
import styles from './CertificationGallery.module.css';

/* ═══════════════════════════════════════════════ */
export default function CertificationGallery() {
  const { t } = useTranslation();
  const TRUST_CHIPS = [
    t('certifications.chips.quality'),
    t('certifications.chips.ethical'),
    t('certifications.chips.compliant'),
  ];

  // Dashboard-managed certifications (via /hq/certifications) take over
  // only once the owner actually publishes some — until then this keeps
  // showing the existing built-in list, so nothing changes live on its
  // own and nobody has to re-enter the current certificates by hand.
  const [dashboardCerts, setDashboardCerts] = useState(null);
  useEffect(() => {
    fetchCertifications().then(setDashboardCerts).catch(() => setDashboardCerts([]));
  }, []);
  const certifications =
    dashboardCerts && dashboardCerts.length > 0 ? dashboardCerts : staticCertifications;

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
              key={cert.id || cert.name}
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
                    alt={cert.alt || cert.name}
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
