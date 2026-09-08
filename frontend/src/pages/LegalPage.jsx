import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO/SEO';
import PageIntro from '@/components/PageIntro/PageIntro';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { siteConfig } from '@/data/config';
import styles from './LegalPage.module.css';

/* ═══════════════════════════════════════════════ */
export default function LegalPage({ kind }) {
  const { t } = useTranslation();
  const content = t(`legal.${kind}`, { returnObjects: true });
  if (!content || typeof content !== 'object') return null;

  return (
    <>
      <SEO
        title={content.title}
        description={content.description}
        noindex
      />

      {/* ── Page Intro ──────────────────────────── */}
      <PageIntro
        eyebrow={content.eyebrow}
        title={content.title}
        lead={content.intro}
        breadcrumbs={[
          { label: t('nav.home'), href: '/' },
          { label: content.title },
        ]}
      />

      {/* ── Main Content ────────────────────────── */}
      <main className={styles.main}>
        <div className="container">

          {/* Notice Banner */}
          <ScrollReveal>
            <div className={styles.notice}>
              <div className={styles.noticeInner}>
                <span
                  className={styles.noticeIcon}
                  aria-hidden="true"
                >
                  !
                </span>
                <p className={styles.noticeText}>
                  {t('legal.noticeBanner')}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Sections */}
          <div className={styles.sections}>
            {content.sections.map((s, i) => (
              <ScrollReveal key={s.heading} delay={i * 0.07}>
                <section
                  aria-labelledby={`legal-${kind}-${i}`}
                >
                  {/* Step number */}
                  <span
                    className={styles.sectionNumber}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Heading */}
                  <h2 id={`legal-${kind}-${i}`}>
                    {s.heading}
                  </h2>

                  {/* Body */}
                  <p>{s.body}</p>

                </section>
              </ScrollReveal>
            ))}

            {/* Last updated */}
            <p className={styles.lastUpdated}>
              {t('legal.lastUpdated')}
            </p>

            {/* Contact note */}
            <ScrollReveal>
              <div className={styles.contactNote}>
                <p>
                  {t('legal.contactNotePrefix')}{' '}
                  {content.shortName},{' '}
                  {t('legal.contactNoteMiddle')}{' '}
                  <a href={`mailto:${siteConfig.contact.email}`}>
                    {siteConfig.contact.email}
                  </a>
                  {' '}{t('legal.contactNoteOr')}{' '}
                  <Link to="/contact">{t('legal.contactPageLink')}</Link>.
                </p>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </main>
    </>
  );
}
