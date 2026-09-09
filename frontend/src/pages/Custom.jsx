import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO/SEO';
import PageIntro from '@/components/PageIntro/PageIntro';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import ImageReveal from '@/components/ImageReveal/ImageReveal';
import SectionHeading from '@/components/SectionHeading/SectionHeading';
import CTASection from '@/components/CTASection/CTASection';
import styles from './Custom.module.css';

/* ═══════════════════════════════════════════════ */
export default function CustomPage() {
  const { t } = useTranslation();
  const POINTS = t('custom.capabilities.points', { returnObjects: true });
  const STEPS = t('custom.howItWorks.steps', { returnObjects: true });
  const META = t('custom.intro.meta', { returnObjects: true });

  return (
    <>
      <SEO
        title={t('custom.seo.title')}
        description={t('custom.seo.description')}
      />

      {/* ── Page Intro ──────────────────────────── */}
      <PageIntro
        eyebrow={t('custom.intro.eyebrow')}
        title={t('custom.intro.title')}
        lead={t('custom.intro.lead')}
        breadcrumbs={[
          { label: t('nav.home'), href: '/' },
          { label: t('collections.custom.eyebrow') },
        ]}
        meta={META.map((label) => ({ label }))}
      />

      {/* ══ Capabilities Section ══════════════════ */}
      <section className="section section--spacious">
        <div className={`container ${styles.grid}`}>

          {/* ── Image Column ────────────────────── */}
          <ScrollReveal direction="left">
            <div className={styles.imageWrap}>
              <ImageReveal
                src="/images/custom/development.webp"
                alt="Custom textile development samples"
                label="Custom Development"
                className={styles.image}
              />
              <span
                className={styles.imageBadge}
                aria-hidden="true"
              >
                {t('custom.imageBadge')}
              </span>
              <div
                className={styles.imageCorner}
                aria-hidden="true"
              />
            </div>
          </ScrollReveal>

          {/* ── Points Column ───────────────────── */}
          <div className={styles.pointsCol}>
            <ScrollReveal>
              <SectionHeading
                eyebrow={t('custom.capabilities.eyebrow')}
                title={t('custom.capabilities.title')}
                divider
              />
            </ScrollReveal>

            {/* Points list */}
            <ScrollReveal delay={0.1}>
              <div className={styles.pointsWrap}>
                {POINTS.map((p, i) => (
                  <div
                    key={p.title}
                    className={styles.point}
                  >
                    {/* Step number */}
                    <span
                      className={styles.pointNumber}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Process note */}
            <ScrollReveal delay={0.2}>
              <div className={styles.processNote}>
                <p>
                  <strong>{t('custom.processNoteStrong')}</strong>{' '}
                  {t('custom.processNoteRest')}
                </p>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ══ How It Works ══════════════════════════ */}
      <section
        className={`section section--spacious ${styles.stepsSection}`}
      >
        <div className="container">
          <ScrollReveal>
            <SectionHeading
              eyebrow={t('custom.howItWorks.eyebrow')}
              title={t('custom.howItWorks.title')}
              lead={t('custom.howItWorks.lead')}
              align="center"
            />
          </ScrollReveal>

          {/* Steps grid */}
          <div
            className={styles.stepsGrid}
            role="list"
            aria-label="Development process steps"
          >
            {STEPS.map((step, i) => (
              <ScrollReveal
                key={step.title}
                delay={i * 0.08}
              >
                <div
                  className={styles.step}
                  role="listitem"
                >
                  <span
                    className={styles.stepNumber}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <CTASection
        eyebrow={t('custom.cta.eyebrow')}
        title={t('custom.cta.title')}
        lead={t('custom.cta.lead')}
        primaryHref="/contact"
        primaryLabel={t('common.contactExportTeam')}
        secondaryHref="/collections"
        secondaryLabel={t('notFound.browseCollections')}
        note={t('custom.cta.note')}
      />

    </>
  );
}
