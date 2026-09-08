import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
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
}) {
  const { t } = useTranslation();
  const resolvedPrimaryLabel = primaryLabel || t('common.contactExportTeam');
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

              {/* Primary Button */}
              <Link
                to={primaryHref}
                className={styles.primary}
              >
                <span>{resolvedPrimaryLabel}</span>
              </Link>

              {/* Secondary Button (optional) */}
              {secondaryHref && (
                <Link
                  to={secondaryHref}
                  className={styles.secondary}
                >
                  <span>{secondaryLabel}</span>
                </Link>
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