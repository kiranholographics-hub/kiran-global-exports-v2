import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO/SEO';
import PageIntro from '@/components/PageIntro/PageIntro';
import ContactForm from '@/components/ContactForm/ContactForm';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { siteConfig, waLink, mailtoLink, telLink } from '@/data/config';
import styles from './Contact.module.css';

/* ═══════════════════════════════════════════════ */
export default function ContactPage() {
  const { t } = useTranslation();

  const CONTACT_ITEMS = [
    {
      id:      'email',
      label:   t('contact.side.email'),
      display: siteConfig.contact.email,
      href:    () => mailtoLink(),
      type:    'link',
    },
    {
      id:      'whatsapp',
      label:   t('contact.side.whatsapp'),
      display: siteConfig.contact.whatsapp,
      href:    () => waLink(),
      type:    'link',
      external: true,
      className: styles.whatsappLink,
    },
    {
      id:      'call',
      label:   t('contact.side.call'),
      display: siteConfig.contact.phone,
      href:    () => telLink(),
      type:    'link',
    },
    {
      id:      'address',
      label:   t('contact.side.address'),
      display: siteConfig.contact.address,
      type:    'text',
    },
  ];

  return (
    <>
      <SEO
        title={t('contact.seo.title')}
        description={t('contact.seo.description')}
      />

      {/* ── Page Intro ──────────────────────────── */}
      <PageIntro
        eyebrow={t('contact.intro.eyebrow')}
        title={t('contact.intro.title')}
        lead={t('contact.intro.lead')}
        breadcrumbs={[
          { label: t('contact.intro.breadcrumbHome'), href: '/' },
          { label: t('contact.intro.breadcrumbContact') },
        ]}
        meta={[
          { label: t('contact.intro.metaResponse') },
          { label: t('contact.intro.metaNoCommitment') },
        ]}
      />

      {/* ── Main Section ────────────────────────── */}
      <section className="section section--spacious">
        <div className={`container ${styles.grid}`}>

          {/* ── Form Column ─────────────────────── */}
          <div className={styles.formCol}>
            <ContactForm />
          </div>

          {/* ── Side Column ─────────────────────── */}
          <ScrollReveal
            delay={0.12}
            className={styles.sideCol}
          >
            <div className={styles.directBlock}>

              {/* Eyebrow */}
              <p className="eyebrow">{t('contact.side.eyebrow')}</p>

              {/* Heading */}
              <h2 className={styles.blockHeading}>
                {t('contact.side.heading')}
              </h2>

              {/* Contact person */}
              <p className={styles.contactPerson}>
                {t('contact.side.contactPerson')}: <strong>{siteConfig.contact.person}</strong> — {siteConfig.contact.personTitle}
              </p>

              {/* Divider */}
              <div
                className={styles.blockDivider}
                aria-hidden="true"
              />

              {/* Contact List */}
              <ul
                className={styles.directList}
                aria-label="Direct contact options"
              >
                {CONTACT_ITEMS.map((item) => (
                  <li key={item.id}>

                    {/* Label */}
                    <span>{item.label}</span>

                    {/* Link or text */}
                    {item.type === 'link' ? (
                      <a
                        href={item.href()}
                        className={item.className}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                      >
                        {item.display}
                      </a>
                    ) : (
                      <span>{item.display}</span>
                    )}

                  </li>
                ))}
              </ul>

              {/* Response badge */}
              <div
                className={styles.responseBadge}
                aria-label="Response time indicator"
              >
                <span
                  className={styles.responseDot}
                  aria-hidden="true"
                />
                {t('contact.side.responseBadge')}
              </div>

            </div>
          </ScrollReveal>

        </div>
      </section>

    </>
  );
}
