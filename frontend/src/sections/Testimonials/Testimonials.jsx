import { useState, useEffect } from 'react';
import SectionHeading from '@/components/SectionHeading/SectionHeading';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { fetchTestimonials } from '@/lib/testimonials';
import styles from './Testimonials.module.css';

/* ═══════════════════════════════════════════════ */
export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(null);

  useEffect(() => {
    fetchTestimonials().then(setTestimonials).catch(() => setTestimonials([]));
  }, []);

  // Renders nothing until we know there's something to show — no empty
  // section, no loading flash, on a marketing page.
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className={`section section--spacious ${styles.section}`}>
      <div className="container">
        <SectionHeading
          eyebrow="Trusted worldwide"
          title="What our buyers say"
          align="center"
        />

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.id} delay={i * 0.06}>
              <figure className={styles.card}>
                {t.rating && (
                  <div className={styles.stars} aria-label={`${t.rating} out of 5 stars`}>
                    {'★'.repeat(t.rating)}
                    <span className={styles.starsEmpty}>{'★'.repeat(5 - t.rating)}</span>
                  </div>
                )}
                <blockquote className={styles.quote}>“{t.quote}”</blockquote>
                <figcaption className={styles.author}>
                  <span className={styles.authorName}>{t.authorName}</span>
                  {(t.authorRole || t.country) && (
                    <span className={styles.authorMeta}>
                      {[t.authorRole, t.country].filter(Boolean).join(' · ')}
                    </span>
                  )}
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
