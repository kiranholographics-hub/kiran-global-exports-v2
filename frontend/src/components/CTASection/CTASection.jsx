import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { mailtoLink, inquiryEmailBody } from '@/data/config';
import styles from './CTASection.module.css';

export default function CTASection({
  eyebrow,
  title,
  lead,
  note,
  primaryHref = '/contact',
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  // Pass these and the section leads with an email button instead of the
  // form. Buyers send their own specification by email rather than
  // filling anything in, so on the pages where an inquiry actually starts
  // the form is the second option, not the first.
  emailSubject,
  emailProduct,
  emailCountry,
}) {
  const { t } = useTranslation();
  const resolvedPrimaryLabel = primaryLabel || t('common.contactExportTeam');
  const emailHref = emailSubject
    ? mailtoLink(emailSubject, inquiryEmailBody({ productName: emailProduct, country: emailCountry }))
    : null;
  return (
    <section className={`section section--dark ${styles.section}`}>
      <div className={`container`}>
        <div className={styles.inner}>

          <ScrollReveal>

            {/* ── Eyebrow ───────────────────────── */}
            {eyebrow && (
              <p className={styles.eyebrow}>
                {eyebrow}
              </p>
            )}

            {/* ── Title ────────────────────────── */}
            <h2 className={styles.title}>{title}</h2>

            {/* ── Warm Divider ─────────────────── */}
            <div className={styles.divider} aria-hidden="true" />

            {/* ── Lead Text ────────────────────── */}
            {lead && (
              <p className={styles.lead}>{lead}</p>
            )}

            {/* ── CTA Buttons ──────────────────── */}
            <div className={styles.actions}>

              {emailHref ? (
                <>
                  {/* Opens the buyer's own mail client with the questions
                      we would have to ask anyway already written in. */}
                  <a href={emailHref} className={styles.primary}>
                    <span>Email your specification</span>
                  </a>
                  <Link to={primaryHref} className={styles.secondary}>
                    <span>{resolvedPrimaryLabel}</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to={primaryHref} className={styles.primary}>
                    <span>{resolvedPrimaryLabel}</span>
                  </Link>
                  {secondaryHref && (
                    <Link to={secondaryHref} className={styles.secondary}>
                      <span>{secondaryLabel}</span>
                    </Link>
                  )}
                </>
              )}

            </div>

            {/* ── Small Note (optional) ─────────── */}
            {note && (
              <p className={styles.note}>{note}</p>
            )}

          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}