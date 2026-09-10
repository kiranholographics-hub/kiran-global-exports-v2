import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { siteConfig } from '@/data/config';
import styles from './GlobalExport.module.css';

/* ═══════════════════════════════════════════════ */
export default function GlobalExport() {
  const { t } = useTranslation();

  const STATS = [
    { number: '7+', label: t('home.globalExport.stats.countries') },
    { number: '22+', label: t('home.globalExport.stats.years') },
  ];

  return (
    <section className={`section section--spacious ${styles.section}`}>
      <div className={`container ${styles.grid}`}>

        {/* ══ Left — Text Column ═══════════════════ */}
        <div className={styles.textCol}>
          <ScrollReveal>

            {/* Eyebrow */}
            <p className="eyebrow">{t('home.globalExport.eyebrow')}</p>

            {/* Heading */}
            <h2 className={styles.heading}>
              {t('home.globalExport.heading')}
            </h2>

            {/* Divider */}
            <div
              className={styles.divider}
              aria-hidden="true"
            />

            {/* Copy */}
            <p className={styles.copy}>
              {t('home.globalExport.copy')}
            </p>

            {/* Stats Row */}
            <div className={styles.stats}>
              {STATS.map((s) => (
                <div key={s.label} className={styles.stat}>
                  <span className={styles.statNumber}>
                    {s.number}
                  </span>
                  <span className={styles.statLabel}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

          </ScrollReveal>
        </div>

        {/* ══ Right — Regions Panel ════════════════ */}
        <ScrollReveal delay={0.15}>
          <div className={styles.regionsWrap}>

            {/* Corner tag */}
            <span
              className={styles.panelTag}
              aria-hidden="true"
            >
              {t('home.globalExport.panelTag')}
            </span>

            {/* Panel header */}
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>
                {t('home.globalExport.panelTitle')}
              </span>
              <span className={styles.panelCount}>
                {siteConfig.exportRegions.length}
              </span>
            </div>

            {/* Regions list */}
            <ul
              className={styles.regions}
              aria-label="Export regions"
            >
              {siteConfig.exportRegions.map((region, i) => (
                <li
                  key={region.value}
                  style={{
                    transitionDelay: `${i * 40}ms`,
                  }}
                >
                  {/* Pulse dot */}
                  <span
                    className={styles.dot}
                    aria-hidden="true"
                  />

                  {/* Region name */}
                  <span className={styles.regionName}>
                    {t(region.labelKey)}
                  </span>

                  {/* Row index */}
                  <span
                    className={styles.regionIndex}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </li>
              ))}
            </ul>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
