import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './SectionHeading.module.css';

/* ═══════════════════════════════════════════════ */
/**
 * SectionHeading — Universal reusable section header
 *
 * Props:
 *  eyebrow   — small uppercase label above title
 *  title     — main heading text
 *  lead      — optional subtitle paragraph
 *  align     — 'left' | 'center'
 *  as        — heading tag: 'h2' | 'h3' (default: 'h2')
 *  divider   — show accent divider line (default: true)
 *  className — passthrough className
 *  id        — optional id for aria-labelledby
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align     = 'left',
  as: HeadingTag = 'h2',
  divider   = true,
  className,
  id,
}) {
  const isCenter = align === 'center';

  const wrapClass = [
    styles.wrap,
    isCenter ? styles.center : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapClass}>

      {/* ── Eyebrow ──────────────────────────── */}
      {eyebrow && (
        <ScrollReveal>
          <p className="eyebrow">{eyebrow}</p>
        </ScrollReveal>
      )}

      {/* ── Title ────────────────────────────── */}
      <ScrollReveal delay={0.08}>
        <HeadingTag
          className={styles.title}
          id={id}
        >
          {title}
        </HeadingTag>
      </ScrollReveal>

      {/* ── Accent Divider ───────────────────── */}
      {divider && (
        <ScrollReveal delay={0.12}>
          <div
            className={styles.divider}
            aria-hidden="true"
          />
        </ScrollReveal>
      )}

      {/* ── Lead ─────────────────────────────── */}
      {lead && (
        <ScrollReveal delay={0.16}>
          <p className={styles.lead}>{lead}</p>
        </ScrollReveal>
      )}

    </div>
  );
}