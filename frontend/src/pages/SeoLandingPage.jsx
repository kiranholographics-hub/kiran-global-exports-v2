import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Link from '@/components/Link/Link';
import SEO from '@/components/SEO/SEO';
import PageIntro from '@/components/PageIntro/PageIntro';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import SectionHeading from '@/components/SectionHeading/SectionHeading';
import CTASection from '@/components/CTASection/CTASection';
import NotFoundContent from '@/components/NotFoundContent/NotFoundContent';
import {
  CAPABILITIES,
  PRODUCT_RANGE,
  getSeoLandingPage,
  getRelatedLandingPages,
} from '@/data/seoLandingPages';
import { getArticlesForLandingPage } from '@/data/articleGuides';
import { LANDING_TRANSLATIONS } from '@/data/landingTranslations';
import styles from './SeoLandingPage.module.css';

// The page's own interface text. A translated page takes its language's
// version from src/data/landingTranslations; every other page — including
// an English-only page reached under a language prefix — keeps this, so its
// headings never come out in one language over copy in another.
const EN_UI = {
  home: 'Home',
  sections: { export: 'Export', solutions: 'Solutions' },
  meta: ['Mill Direct, FOB', '100% Cotton Ringspun', 'Sample First'],
  whoWeSupply: 'Who we supply',
  howEyebrow: 'How we supply',
  howTitle: 'Made to your specification, at the mill.',
  rangeEyebrow: 'Product range',
  rangeTitle: 'What we manufacture.',
  cataloguePdf: 'Download our product catalogue (PDF)',
  catalogueOnline: 'Browse our full catalogue online',
  faqEyebrow: 'Frequently asked',
  faqTitle: 'What buyers ask us first.',
  relatedEyebrow: 'Also supplying',
  relatedTitle: 'Other markets and solutions.',
  ctaEyebrow: (name) => `${name} Inquiry`,
  ctaTitle: 'Send us your specification.',
  ctaLead: 'Tell us the product, size, GSM and quantity you need — our export team replies within 24 hours with an FOB quotation.',
  emailSubject: (name) => `${name} inquiry — Kiran Global Exports`,
  ctaPrimary: 'Contact Our Export Team',
  ctaSecondary: 'Browse Collections',
  ctaNote: 'Typical response within 24 hours',
};

const SECTION_HREFS = { export: '/export', solutions: '/export' };

/* ═══════════════════════════════════════════════ */
export default function SeoLandingPage({ section }) {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const page = getSeoLandingPage(section, slug, i18n.language);
  const ui = page?.translated ? LANDING_TRANSLATIONS[i18n.language].ui : EN_UI;
  const parent = {
    label: ui.sections[section] || ui.sections.export,
    href: SECTION_HREFS[section] || SECTION_HREFS.export,
  };

  // One array for the rendered trail and its BreadcrumbList markup, so the
  // two can't describe different paths — and memoised, since a fresh array
  // each render would have <SEO> rewrite every tag in <head> each time.
  // Computed above the not-found return because hooks can't run
  // conditionally.
  const breadcrumbs = useMemo(
    () => [
      { label: ui.home, href: '/' },
      { label: parent.label, href: parent.href },
      { label: page?.eyebrow },
    ],
    [ui.home, parent.label, parent.href, page?.eyebrow]
  );

  const related = getRelatedLandingPages(section, slug, i18n.language);
  // The buyer guides are English-only; a translated page leaves them out
  // rather than ending in a list of English titles.
  const guides = page?.translated ? [] : getArticlesForLandingPage(section, slug);

  if (!page) {
    return (
      <>
        <SEO title="Page Not Found" noindex />
        <NotFoundContent
          title="We couldn’t find that page."
          copy="It may have been moved, renamed or removed. Browse our collections or contact our export team for help."
        />
      </>
    );
  }

  return (
    <>
      <SEO
        title={page.seoTitle}
        description={page.seoDescription}
        faqs={page.faqs}
        breadcrumbs={breadcrumbs}
      />

      <PageIntro
        eyebrow={page.eyebrow}
        title={page.heading}
        lead={page.lead}
        breadcrumbs={breadcrumbs}
        meta={page.meta || ui.meta.map((label) => ({ label }))}
      />

      {/* ══ Unique body copy ══════════════════════
          Comes before the shared CAPABILITIES/PRODUCT_RANGE blocks on
          purpose: those nine words-for-word identical sections are what
          made these pages look like each other to a crawler, so the text
          that is only on this page has to be the text it reads first. */}
      <section className={`section section--spacious ${styles.introSection}`}>
        <div className="container">
          <div className={styles.introLayout}>
            <ScrollReveal className={styles.introBody}>
              {page.intro.map((para) => (
                <p key={para.slice(0, 40)} className={styles.introPara}>{para}</p>
              ))}
            </ScrollReveal>

            <ScrollReveal delay={0.08} className={styles.buyersCard}>
              <h2 className={styles.buyersTitle}>{ui.whoWeSupply}</h2>
              <ul className={styles.buyersList}>
                {page.buyers.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══ What you get ══════════════════════════ */}
      <section className={`section section--spacious ${styles.capabilitySection}`}>
        <div className="container">
          <ScrollReveal>
            <SectionHeading
              eyebrow={ui.howEyebrow}
              title={ui.howTitle}
            />
          </ScrollReveal>

          <div className={styles.capabilityGrid}>
            {(page.capabilities || CAPABILITIES).map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 0.07} className={styles.capability}>
                <span className={styles.capabilityNumber} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Range ═════════════════════════════════ */}
      <section className={`section section--spacious ${styles.rangeSection}`}>
        <div className="container">
          <ScrollReveal>
            <SectionHeading
              eyebrow={ui.rangeEyebrow}
              title={page.rangeTitle || ui.rangeTitle}
            />
          </ScrollReveal>

          <ScrollReveal>
            <ul className={styles.rangeList}>
              {(page.range || PRODUCT_RANGE).map((item) => (
                <li key={item} className={styles.rangeItem}>{item}</li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal className={styles.rangeLinks}>
            <a
              href="/downloads/kiran-global-exports-catalogue.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.rangeLink}
            >
              {ui.cataloguePdf}
            </a>
            {/* Our own retail/general-catalogue site — a genuinely different
                destination for a visitor who wants to browse the full range
                online rather than the export-specific brief this page is
                about, not a reciprocal-link scheme. */}
            <a
              href="https://www.kiranglobalexports.com"
              target="_blank"
              rel="noopener"
              className={styles.rangeLink}
            >
              {ui.catalogueOnline}
            </a>
            {page.relatedMarket && (
              <Link to={page.relatedMarket.href} className={styles.rangeLink}>
                {page.relatedMarket.label}
              </Link>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════ */}
      <section className={`section section--spacious ${styles.faqSection}`}>
        <div className="container">
          <ScrollReveal>
            <SectionHeading
              eyebrow={ui.faqEyebrow}
              title={ui.faqTitle}
            />
          </ScrollReveal>

          <div className={styles.faqList}>
            {page.faqs.map((f, i) => (
              <ScrollReveal key={f.q} delay={i * 0.06} className={styles.faqItem}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Buyer guides ══════════════════════════ */}
      {guides.length > 0 && (
        <section className={`section ${styles.relatedSection}`}>
          <div className="container">
            <ScrollReveal>
              <SectionHeading
                eyebrow="Further reading"
                title="Buyer guides on this topic."
              />
            </ScrollReveal>

            <ScrollReveal>
              <ul className={styles.relatedList}>
                {guides.map((g) => (
                  <li key={g.href}>
                    <Link to={g.href} className={styles.relatedLink}>{g.label}</Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ══ Related pages ═════════════════════════ */}
      {related.length > 0 && (
        <section className={`section ${styles.relatedSection}`}>
          <div className="container">
            <ScrollReveal>
              <SectionHeading
                eyebrow={ui.relatedEyebrow}
                title={ui.relatedTitle}
              />
            </ScrollReveal>

            <ScrollReveal>
              <ul className={styles.relatedList}>
                {related.map((r) => (
                  <li key={r.href}>
                    <Link to={r.href} className={styles.relatedLink}>{r.label}</Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>
      )}

      <CTASection
        eyebrow={ui.ctaEyebrow(page.eyebrow)}
        title={ui.ctaTitle}
        lead={ui.ctaLead}
        emailSubject={ui.emailSubject(page.eyebrow)}
        // 'Hospitality' and 'Private Label' are not countries, so only the
        // export pages prefill it.
        emailCountry={page.section === 'export' ? page.eyebrow : undefined}
        primaryHref="/contact"
        primaryLabel={ui.ctaPrimary}
        secondaryHref="/collections"
        secondaryLabel={ui.ctaSecondary}
        note={ui.ctaNote}
      />
    </>
  );
}
