import { use, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '@/components/SEO/SEO';
import PageIntro from '@/components/PageIntro/PageIntro';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import SectionHeading from '@/components/SectionHeading/SectionHeading';
import CTASection from '@/components/CTASection/CTASection';
import NotFoundContent from '@/components/NotFoundContent/NotFoundContent';
import { fetchMarketBySlug } from '@/lib/publicMarkets';
import { REASONS, getMarketContent, getStaticMarket } from '@/data/marketContent';
import { getLandingPageForMarket } from '@/data/seoLandingPages';
import styles from './MarketPage.module.css';

/* ═══════════════════════════════════════════════ */
export default function MarketPage() {
  const { marketSlug } = useParams();
  const fetched = use(fetchMarketBySlug(marketSlug));
  // When the server could not be asked at all, fall back to the
  // hand-written market rather than an error page — see the note in
  // lib/publicMarkets.js.
  const market = fetched?.unreachable ? getStaticMarket(marketSlug) : fetched;

  // Shared by the rendered trail and its BreadcrumbList markup — see the
  // same note in SeoLandingPage.jsx. Above the not-found return because
  // hooks can't run conditionally.
  const breadcrumbs = useMemo(
    () => [{ label: 'Home', href: '/' }, { label: market?.countryName }],
    [market?.countryName]
  );

  if (!market) {
    return (
      <>
        <SEO title="Market Not Found" noindex />
        <NotFoundContent
          title="This market isn't available"
          copy="It may not be active yet, or the link may be out of date. Browse our collections or contact our export team for help."
        />
      </>
    );
  }

  const content = getMarketContent(market.slug, market.countryName);
  // The sourcing guide for this market already links here; this is the
  // same pair read the other way, so neither page is a dead end.
  const guide = getLandingPageForMarket(market.slug);

  return (
    <>
      <SEO
        title={content.seoTitle}
        description={content.seoDescription}
        faqs={content.faqs}
        breadcrumbs={breadcrumbs}
      />

      <PageIntro
        eyebrow={market.countryName}
        title={content.heading}
        lead={content.lead}
        breadcrumbs={breadcrumbs}
        meta={[
          { label: '22+ Years Exporting' },
          { label: 'FOB Direct from Mill' },
          { label: 'Sample First' },
        ]}
      />

      {/* ══ Why section ═══════════════════════════ */}
      <section className={`section section--spacious ${styles.whySection}`}>
        <div className="container">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Why Kiran Global Exports"
              title={`Built for importers in ${market.countryName} who reorder.`}
            />
          </ScrollReveal>

          <div className={styles.reasonGrid}>
            {REASONS.map((r, i) => (
              <ScrollReveal key={r.title} delay={i * 0.07} className={styles.reason}>
                <span className={styles.reasonNumber} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ section ═══════════════════════════ */}
      <section className={`section section--spacious ${styles.faqSection}`}>
        <div className="container">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Frequently Asked"
              title={`Questions buyers in ${market.countryName} ask us.`}
            />
          </ScrollReveal>

          <div className={styles.faqList}>
            {content.faqs.map((f, i) => (
              <ScrollReveal key={f.q} delay={i * 0.06} className={styles.faqItem}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {guide && (
        <section className={`section ${styles.guideSection}`}>
          <div className="container">
            <ScrollReveal className={styles.guideCard}>
              <p className={styles.guideEyebrow}>Sourcing detail</p>
              <h2 className={styles.guideTitle}>{guide.label}</h2>
              <p className={styles.guideBody}>
                This page covers why buyers in {market.countryName} work with
                us. The sourcing guide covers how — the mill, the
                specification, labelling and what each shipment carries.
              </p>
              <Link to={guide.href} className={styles.guideLink}>
                Read the {guide.eyebrow} sourcing guide
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}

      <CTASection
        eyebrow={`${market.countryName} Inquiry`}
        title="Send us your specification."
        lead="Tell us the product, size, GSM and quantity you need — our export team replies within 24 hours with an FOB quotation."
        emailSubject={`Inquiry from ${market.countryName} — Kiran Global Exports`}
        primaryHref={`/contact?country=${encodeURIComponent(market.countryName)}`}
        primaryLabel="Contact Our Export Team"
        secondaryHref="/collections"
        secondaryLabel="Browse Collections"
        note="Typical response within 24 hours"
      />
    </>
  );
}
