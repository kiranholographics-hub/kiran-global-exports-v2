import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
import styles from './SeoLandingPage.module.css';

const SECTION_LABELS = {
  export: { label: 'Export', href: '/export' },
  solutions: { label: 'Solutions', href: '/export' },
};

/* ═══════════════════════════════════════════════ */
export default function SeoLandingPage({ section }) {
  const { slug } = useParams();
  const page = getSeoLandingPage(section, slug);
  const parent = SECTION_LABELS[section] || SECTION_LABELS.export;

  // One array for the rendered trail and its BreadcrumbList markup, so the
  // two can't describe different paths — and memoised, since a fresh array
  // each render would have <SEO> rewrite every tag in <head> each time.
  // Computed above the not-found return because hooks can't run
  // conditionally.
  const breadcrumbs = useMemo(
    () => [
      { label: 'Home', href: '/' },
      { label: parent.label, href: parent.href },
      { label: page?.eyebrow },
    ],
    [parent.label, parent.href, page?.eyebrow]
  );

  const related = getRelatedLandingPages(section, slug);

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
        meta={[
          { label: 'Mill Direct, FOB' },
          { label: '100% Cotton Ringspun' },
          { label: 'Sample First' },
        ]}
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
              <h2 className={styles.buyersTitle}>Who we supply</h2>
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
              eyebrow="How we supply"
              title="Made to your specification, at the mill."
            />
          </ScrollReveal>

          <div className={styles.capabilityGrid}>
            {CAPABILITIES.map((c, i) => (
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
              eyebrow="Product range"
              title="What we manufacture."
            />
          </ScrollReveal>

          <ScrollReveal>
            <ul className={styles.rangeList}>
              {PRODUCT_RANGE.map((item) => (
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
              Download our product catalogue (PDF)
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
              eyebrow="Frequently asked"
              title="What buyers ask us first."
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

      {/* ══ Related pages ═════════════════════════ */}
      <section className={`section ${styles.relatedSection}`}>
        <div className="container">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Also supplying"
              title="Other markets and solutions."
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

      <CTASection
        eyebrow={`${page.eyebrow} Inquiry`}
        title="Send us your specification."
        lead="Tell us the product, size, GSM and quantity you need — our export team replies within 24 hours with an FOB quotation."
        emailSubject={`${page.eyebrow} inquiry — Kiran Global Exports`}
        // 'Hospitality' and 'Private Label' are not countries, so only the
        // export pages prefill it.
        emailCountry={page.section === 'export' ? page.eyebrow : undefined}
        primaryHref="/contact"
        primaryLabel="Contact Our Export Team"
        secondaryHref="/collections"
        secondaryLabel="Browse Collections"
        note="Typical response within 24 hours"
      />
    </>
  );
}
