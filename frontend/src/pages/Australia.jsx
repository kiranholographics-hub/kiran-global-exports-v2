import SEO from '@/components/SEO/SEO';
import PageIntro from '@/components/PageIntro/PageIntro';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import SectionHeading from '@/components/SectionHeading/SectionHeading';
import CTASection from '@/components/CTASection/CTASection';
import styles from './Australia.module.css';

/* ── Why Kiran Global Exports for Australian buyers ─── */
const REASONS = [
  {
    title: 'Sample-first, always',
    body: 'GSM, size, colour, border and packaging are set to your specification. Nothing goes to bulk production until you have approved a physical sample.',
  },
  {
    title: 'Direct mill terms',
    body: 'Quotations and shipment come directly from the mill on FOB terms — your commercial relationship is with the manufacturer, not a trading middleman.',
  },
  {
    title: 'Batch-matched repeat orders',
    body: 'Colour is approved by lab dip before bulk dyeing, and every batch is checked against the approved sample, so your second container matches your first.',
  },
  {
    title: 'Export documentation ready',
    body: 'Certificates of origin, packing lists and the compliance documentation your customs broker will ask for are prepared as a standard part of every order.',
  },
];

/* ── FAQ ───────────────────────────────────────────── */
const FAQS = [
  {
    q: 'Which Australian ports can you ship to?',
    a: 'We coordinate FOB shipment to major Australian ports including Sydney, Melbourne, Brisbane and Fremantle — your freight forwarder handles the onward leg from origin.',
  },
  {
    q: 'What is the minimum order quantity?',
    a: 'MOQ varies by product and is confirmed per specification once your sample is approved — ask our export team for the figure on the specific towel or rug you need.',
  },
  {
    q: 'Can you match an existing product we already import?',
    a: 'Yes — send a photo or a physical reference and we will develop a matching specification (GSM, construction, border, colour) before quoting.',
  },
  {
    q: 'Do you provide private-label or branded packaging?',
    a: 'Yes — woven labels, branded packaging and custom construction are all available; see our Custom & Private Label page for details.',
  },
];

/* ═══════════════════════════════════════════════ */
export default function AustraliaPage() {
  return (
    <>
      <SEO
        title="Cotton Towel & Bathrobe Exporter to Australia"
        description="Kiran Global Exports supplies cotton towels, bathrobes and rugs to Australian importers and distributors — sample-first, FOB direct from our partner mill in Solapur."
      />

      <PageIntro
        eyebrow="Australia"
        title="Terry towels and rugs, exported to Australia."
        lead="Sample-approved specification, shipped FOB direct from our partner mill — built for hospitality, retail and private-label buyers across Australia."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Australia' },
        ]}
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
              title="Built for Australian importers who reorder."
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
              title="Questions Australian buyers ask us."
            />
          </ScrollReveal>

          <div className={styles.faqList}>
            {FAQS.map((f, i) => (
              <ScrollReveal key={f.q} delay={i * 0.06} className={styles.faqItem}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Australia Inquiry"
        title="Send us your specification."
        lead="Tell us the product, size, GSM and quantity you need — our export team replies within 24 hours with an FOB quotation."
        primaryHref="/contact?country=Australia"
        primaryLabel="Contact Our Export Team"
        secondaryHref="/collections"
        secondaryLabel="Browse Collections"
        note="Typical response within 24 hours"
      />
    </>
  );
}
