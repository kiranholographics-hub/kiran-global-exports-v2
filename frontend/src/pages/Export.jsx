import SEO from '@/components/SEO/SEO';
import PageIntro from '@/components/PageIntro/PageIntro';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import SectionHeading from '@/components/SectionHeading/SectionHeading';
import CTASection from '@/components/CTASection/CTASection';
import { useTranslation } from 'react-i18next';
import { siteConfig } from '@/data/config';
import styles from './Export.module.css';

/* ── Export Steps ──────────────────────────────── */
const STEPS = [
  {
    title: 'Specification',
    body:  'We confirm product specification, quantity and destination requirements together.',
  },
  {
    title: 'Sampling',
    body:  'Samples are developed and approved before bulk production begins.',
  },
  {
    title: 'Production & QC',
    body:  'Bulk production runs with quality checks against the approved specification.',
  },
  {
    title: 'Packing & Documentation',
    body:  'Export packing and documentation prepared for your destination market.',
  },
  {
    title: 'Shipping & Coordination',
    body:  'Coordinated dispatch with regular status communication through to delivery.',
  },
];

/* ── Stats ─────────────────────────────────────── */
const STATS = [
  { number: '10+', label: 'Years Exporting'   },
  { number: '[Confirm]', label: 'Countries Shipped To'  },
  { number: '1972', label: 'Mill Established'      },
];

/* ═══════════════════════════════════════════════ */
export default function ExportPage() {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title="Export Capability — International B2B Supply"
        description="Kiran Global Exports supplies premium towels and rugs to hospitality, retail and distribution buyers across North America, Europe, the Middle East, Australia and Asia-Pacific."
      />

      {/* ── Page Intro ──────────────────────────── */}
      <PageIntro
        eyebrow="Export"
        title="From India to global markets."
        lead="Built around reliable sourcing, quality control and buyer-focused export coordination."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Export' },
        ]}
        meta={[
          { label: '[Confirm]+ Countries' },
          { label: '10+ Years Active' },
          { label: 'B2B Focused' },
        ]}
      />

      {/* ══ Regions Section ═══════════════════════ */}
      <section className={`section section--spacious ${styles.regionsSection}`}>
        <div className="container">

          {/* Header */}
          <ScrollReveal>
            <SectionHeading
              eyebrow="Regions Served"
              title="Where our textiles travel."
            />
          </ScrollReveal>

          {/* Region grid panel */}
          <ScrollReveal delay={0.1}>
            <div className={styles.regionPanel}>
              <div
                className={styles.regionGrid}
                role="list"
                aria-label="Export regions"
              >
                {siteConfig.exportRegions.map((r) => (
                  <div
                    key={r.value}
                    className={styles.region}
                    role="listitem"
                  >
                    <span className={styles.regionText}>
                      <span
                        className={styles.regionDot}
                        aria-hidden="true"
                      />
                      {t(r.labelKey)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Stats row */}
          <ScrollReveal delay={0.2}>
            <div className={styles.statsRow}>
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
      </section>

      {/* ══ Steps Section ═════════════════════════ */}
      <section
        className={`section section--spacious ${styles.stepsSection}`}
      >
        <div className="container">

          {/* Header */}
          <ScrollReveal>
            <SectionHeading
              eyebrow="How It Works"
              title="A coordinated export process."
              lead="From inquiry to delivery — every step handled with direct communication and consistent quality control."
            />
          </ScrollReveal>

          {/* Steps list */}
          <ol
            className={styles.steps}
            aria-label="Export process steps"
          >
            {STEPS.map((s, i) => (
              <ScrollReveal
                key={s.title}
                delay={i * 0.07}
                as="li"
                className={styles.step}
              >
                {/* Step number */}
                <span
                  className={styles.stepNumber}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Step content */}
                <div className={styles.stepContent}>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>

                {/* Arrow — visible on hover */}
                <span
                  className={styles.stepArrow}
                  aria-hidden="true"
                >
                  →
                </span>

              </ScrollReveal>
            ))}
          </ol>

        </div>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <CTASection
        eyebrow="Export Inquiry"
        title="Discuss your destination market."
        lead="Our export team will confirm feasibility, lead time and next steps for your region."
        primaryHref="/contact"
        primaryLabel="Contact Our Export Team"
        secondaryHref="/collections"
        secondaryLabel="Browse Collections"
        note="Typical response within 24 hours"
      />

    </>
  );
}