import { useTranslation } from 'react-i18next';
import SectionHeading from '@/components/SectionHeading/SectionHeading';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './WhyKiran.module.css';

/* ═══════════════════════════════════════════════ */
export default function WhyKiran() {
  const { t } = useTranslation();
  const points = t('home.whyKiran.points', { returnObjects: true });

  return (
    <section className={`section section--spacious ${styles.section}`}>
      <div className="container">

        {/* ── Section Heading ──────────────────── */}
        <SectionHeading
          eyebrow={t('home.whyKiran.eyebrow')}
          title={t('home.whyKiran.title')}
          align="center"
        />

        {/* ── Points Grid ──────────────────────── */}
        <div className={styles.grid}>
          {points.map((p, i) => {
            const n = String(i + 1).padStart(2, '0');
            return (
              <ScrollReveal key={p.title} delay={i * 0.07}>
                <div className={styles.item}>

                  {/* Ghost large number — decorative bg */}
                  <span
                    className={styles.ghostN}
                    aria-hidden="true"
                  >
                    {n}
                  </span>

                  {/* Number label */}
                  <span className={styles.n}>{n}</span>

                  {/* Title */}
                  <h3 className={styles.title}>
                    {p.title}
                    <span
                      className={styles.titleUnderline}
                      aria-hidden="true"
                    />
                  </h3>

                  {/* Body */}
                  <p className={styles.body}>{p.body}</p>

                  {/* Bottom Tag — visible on hover */}
                  <span
                    className={styles.itemFooter}
                    aria-hidden="true"
                  >
                    — {p.tag}
                  </span>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
