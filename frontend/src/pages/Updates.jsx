import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO/SEO';
import PageIntro from '@/components/PageIntro/PageIntro';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { fetchUpdates } from '@/lib/updates';
import styles from './Updates.module.css';

export default function Updates() {
  const [updates, setUpdates] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUpdates()
      .then(setUpdates)
      .catch(() => setError('Could not load updates right now. Please try again shortly.'));
  }, []);

  return (
    <>
      <SEO
        title="Updates"
        description="Latest news, shipments and product launches from Kiran Global Exports — cotton towel, bathrobe and linen exporters."
      />

      <PageIntro
        eyebrow="News"
        title="Updates"
        lead="What's new at Kiran Global Exports — new products, shipments and export milestones."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Updates' },
        ]}
      />

      <section className="section section--spacious">
        <div className="container">
          {error && <p className={styles.error}>{error}</p>}
          {updates === null && !error && <p className={styles.muted}>Loading…</p>}
          {updates && updates.length === 0 && (
            <p className={styles.muted}>No updates yet — check back soon.</p>
          )}
          {updates && updates.length > 0 && (
            <div className={styles.grid}>
              {updates.map((u, i) => (
                <ScrollReveal key={u.id} delay={i * 0.05}>
                  <Link to={`/updates/${u.slug}`} className={styles.card}>
                    {u.coverImage && (
                      <div className={styles.cardImage}>
                        <img src={u.coverImage} alt={u.title} loading="lazy" />
                      </div>
                    )}
                    <div className={styles.cardBody}>
                      <time className={styles.cardDate} dateTime={u.publishedAt}>
                        {new Date(u.publishedAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <h2 className={styles.cardTitle}>{u.title}</h2>
                      {u.excerpt && <p className={styles.cardExcerpt}>{u.excerpt}</p>}
                      <span className={styles.cardLink}>Read more →</span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
