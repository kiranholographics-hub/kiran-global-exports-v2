import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO/SEO';
import PageIntro from '@/components/PageIntro/PageIntro';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import ImageReveal from '@/components/ImageReveal/ImageReveal';
import SectionHeading from '@/components/SectionHeading/SectionHeading';
import CTASection from '@/components/CTASection/CTASection';
import CertificationGallery from '@/components/CertificationGallery/CertificationGallery';
import { siteConfig } from '@/data/config';
import styles from './About.module.css';

/* ═══════════════════════════════════════════════ */
export default function AboutPage() {
  const { t } = useTranslation();
  const PILLARS = t('about.approach.pillars', { returnObjects: true });
  const MUNDADA_PRODUCTS = t('about.mundadaProducts', { returnObjects: true });
  const RUG_SERVICES = t('about.rugServices', { returnObjects: true });

  return (
    <>
      <SEO
        title={t('about.seo.title')}
        description={t('about.seo.description')}
      />

      {/* ── Page Intro ──────────────────────────── */}
      <PageIntro
        eyebrow={t('about.intro.eyebrow')}
        title={t('about.intro.title')}
        lead={t('about.intro.lead')}
        breadcrumbs={[
          { label: t('nav.home'), href: '/' },
          { label: t('nav.about') },
        ]}
      />

      {/* ══ Brand Story ═══════════════════════════ */}
      <section className="section section--spacious">
        <div className={`container ${styles.grid}`}>

          {/* Image */}
          <ScrollReveal direction="left">
            <ImageReveal
              src="/images/about/about.webp"
              alt="Textile production floor"
              label="About — Production"
              className={styles.image}
            />
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal delay={0.12}>
            <h2 className={styles.heading}>
              {t('about.brandStory.heading')}
            </h2>
            <div
              className={styles.divider}
              aria-hidden="true"
            />
            <p className={styles.copy}>
              {t('about.brandStory.copy1')}
            </p>
            <p className={styles.copy}>
              {t('about.brandStory.copy2')}
            </p>
          </ScrollReveal>

        </div>
      </section>

      {/* ══ Company Structure ═════════════════════ */}
      <section className={styles.structureSection}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.structureCard}>
              <p className="eyebrow">{t('about.structure.eyebrow')}</p>
              <h2 className={styles.structureTitle}>
                {t('about.structure.title')}
              </h2>
              <p className={styles.structureBody}>
                {t('about.structure.body1')}
              </p>
              <p className={styles.structureBody}>
                {t('about.structure.body2')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ Our Approach ══════════════════════════ */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow={t('about.approach.eyebrow')}
            title={t('about.approach.title')}
          />

          {/* Pillars grid */}
          <div className={styles.pillars}>
            {PILLARS.map((p, i) => (
              <ScrollReveal
                key={p.title}
                delay={i * 0.07}
                className={styles.pillar}
              >
                {/* Step number */}
                <span
                  className={styles.pillarNumber}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Partner Section ═══════════════════════ */}
      <section className={`section section--spacious ${styles.partnerSection}`}>
        <div className="container">

          <ScrollReveal>
            <SectionHeading
              eyebrow={t('about.partner.eyebrow')}
              title={t('about.partner.title')}
            />
            <p className={styles.partnerLead}>
              {t('about.partner.lead')}
            </p>
          </ScrollReveal>

          {/* Partner Grid */}
          <div className={styles.partnerGrid}>

            {/* Brand Card */}
            <ScrollReveal delay={0.1}>
              <div className={styles.partnerBrandCard}>
                <div className={styles.logoWrap}>
                  <img
                    src="/images/partners/mundada-towels-logo.webp"
                    alt="Mundada Towels logo"
                    className={styles.partnerLogo}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className={styles.partnerTagline}>
                  {t('about.partner.tagline')}
                </p>
                <div className={styles.partnerMeta}>
                  <span>{t('about.partner.established')}</span>
                  <span>{t('about.partner.location')}</span>
                </div>
                <a
                  className={styles.textLink}
                  href="https://www.mundadatowels.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('about.partner.visitLink')}
                </a>
              </div>
            </ScrollReveal>

            {/* Partner Content */}
            <ScrollReveal delay={0.15} className={styles.partnerContent}>
              <p className={styles.copy}>
                {t('about.partner.copy1')}
              </p>
              <p className={styles.copy}>
                {t('about.partner.copy2')}
              </p>
              <p className={styles.copy}>
                {t('about.partner.copy3')}
              </p>

              {/* Product Tags */}
              <div
                className={styles.productTags}
                aria-label="Product types"
              >
                {MUNDADA_PRODUCTS.map((product) => (
                  <span key={product}>{product}</span>
                ))}
              </div>
            </ScrollReveal>

          </div>

          {/* Location Grid */}
          <div className={styles.locationGrid}>

            {/* Location Card */}
            <ScrollReveal className={styles.locationCard}>
              <p className="eyebrow">{t('about.locationCard.eyebrow')}</p>
              <h3>{t('about.locationCard.title')}</h3>
              <p>
                155/3A, Gandhi Nagar, Akkalkot Road,<br />
                Solapur, Maharashtra, India
              </p>
              <a
                className={styles.mapLink}
                href="https://www.google.com/maps/search/?api=1&query=155%2F3A%2C%20Gandhi%20Nagar%2C%20Akkalkot%20Road%2C%20Solapur%2C%20Maharashtra%20413006"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('about.locationCard.mapLink')}
              </a>
            </ScrollReveal>

            {/* Map */}
            <ScrollReveal delay={0.1} className={styles.mapCard}>
              <iframe
                title="Mundada Towels location in Solapur"
                src="https://www.google.com/maps?q=155%2F3A%2C%20Gandhi%20Nagar%2C%20Akkalkot%20Road%2C%20Solapur%2C%20Maharashtra%20413006&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Map showing Mundada Towels location in Solapur"
              />
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ══ Rug Section ═══════════════════════════ */}
      <section className={`section section--spacious ${styles.rugSection}`}>
        <div className="container">
          <div className={styles.rugGrid}>

            {/* Left — text */}
            <ScrollReveal>
              <SectionHeading
                eyebrow={t('about.rugSection.eyebrow')}
                title={t('about.rugSection.title')}
              />
              <p className={styles.partnerLead}>
                {t('about.rugSection.lead')}
              </p>
              <p className={styles.copy}>
                {t('about.rugSection.copy')}
              </p>
            </ScrollReveal>

            {/* Right — service list */}
            <ScrollReveal
              delay={0.12}
              className={styles.rugListWrap}
            >
              <div
                className={styles.rugList}
                role="list"
                aria-label="Rug services"
              >
                {RUG_SERVICES.map((service, i) => (
                  <div
                    className={styles.rugItem}
                    key={service}
                    role="listitem"
                  >
                    <span aria-hidden="true">
                      0{i + 1}
                    </span>
                    <strong>{service}</strong>
                  </div>
                ))}
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ══ Registered & Compliant ════════════════ */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <SectionHeading
              eyebrow={t('about.registration.eyebrow')}
              title={t('about.registration.title')}
              align="center"
            />
            <p className={styles.registrationMeta}>
              {t('about.registration.iecLabel')}: <strong>{siteConfig.contact.iecCode}</strong>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <CTASection
        eyebrow={t('about.cta.eyebrow')}
        title={t('about.cta.title')}
        lead={t('about.cta.lead')}
        primaryHref="/contact"
        primaryLabel={t('common.contactExportTeam')}
        secondaryHref="/collections"
        secondaryLabel={t('notFound.browseCollections')}
        note={t('common.responseNote')}
      />

    </>
  );
}
