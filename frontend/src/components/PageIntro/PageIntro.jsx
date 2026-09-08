import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './PageIntro.module.css';

/* ═══════════════════════════════════════════════ */
export default function PageIntro({
  eyebrow,
  title,
  lead,
  breadcrumbs,
  meta,         // optional: [{ label: 'Towels' }, { label: '40+ Countries' }]
}) {
  return (
    <section className={styles.intro}>
      <div className={`container ${styles.inner}`}>

        {/* ── Breadcrumbs ──────────────────────── */}
        {breadcrumbs?.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className={styles.breadcrumbs}
          >
            <ol>
              {breadcrumbs.map((b, i) => {
                const isLast = i === breadcrumbs.length - 1;
                return (
                  <li key={b.href || b.label}>

                    {/* Link or current page */}
                    {b.href && !isLast ? (
                      <Link to={b.href}>{b.label}</Link>
                    ) : (
                      <span aria-current="page">
                        {b.label}
                      </span>
                    )}

                    {/* Separator */}
                    {!isLast && (
                      <span
                        className={styles.sep}
                        aria-hidden="true"
                      >
                        /
                      </span>
                    )}

                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        {/* ── Main Content ─────────────────────── */}
        <ScrollReveal>

          {/* Eyebrow */}
          {eyebrow && (
            <p className="eyebrow">{eyebrow}</p>
          )}

          {/* Title */}
          <h1 className={styles.title}>{title}</h1>

          {/* Accent Divider */}
          <div
            className={styles.divider}
            aria-hidden="true"
          />

          {/* Lead */}
          {lead && (
            <p className={styles.lead}>{lead}</p>
          )}

          {/* Meta Tags — optional */}
          {meta?.length > 0 && (
            <div
              className={styles.meta}
              aria-label="Page metadata"
            >
              {meta.map((tag) => (
                <span
                  key={tag.label}
                  className={styles.metaTag}
                >
                  <span
                    className={styles.metaTagDot}
                    aria-hidden="true"
                  />
                  {tag.label}
                </span>
              ))}
            </div>
          )}

        </ScrollReveal>
      </div>
    </section>
  );
}