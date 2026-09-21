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

  const parent = SECTION_LABELS[section] || SECTION_LABELS.export;

  return (
    <>
      <SEO title={page.seoTitle} description={page.seoDescription} />

      <PageIntro
        eyebrow={page.eyebrow}
        title={page.heading}
        lead={page.lead}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: parent.label, href: parent.href },
          { label: page.eyebrow },
        ]}
        meta={[
          { label: 'Mill Direct, FOB' },
          { label: '100% Cotton Ringspun' },
          { label: 'Sample First' },
        ]}
      />

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
            <Link to="/towels" className={styles.rangeLink}>Browse the towel catalogue</Link>
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

      <CTASection
        eyebrow={`${page.eyebrow} Inquiry`}
        title="Send us your specification."
        lead="Tell us the product, size, GSM and quantity you need — our export team replies within 24 hours with an FOB quotation."
        primaryHref="/contact"
        primaryLabel="Contact Our Export Team"
        secondaryHref="/collections"
        secondaryLabel="Browse Collections"
        note="Typical response within 24 hours"
      />
    </>
  );
}
