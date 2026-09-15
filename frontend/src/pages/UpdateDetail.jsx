import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO/SEO';
import NotFoundContent from '@/components/NotFoundContent/NotFoundContent';
import { fetchUpdateBySlug } from '@/lib/updates';
import styles from './UpdateDetail.module.css';

export default function UpdateDetail() {
  const { slug } = useParams();
  const [update, setUpdate] = useState(undefined); // undefined = loading, null = not found
  const [error, setError] = useState('');

  useEffect(() => {
    setUpdate(undefined);
    setError('');
    fetchUpdateBySlug(slug)
      .then(setUpdate)
      .catch((err) => {
        if (err.status === 404) setUpdate(null);
        else setError('Could not load this update right now.');
      });
  }, [slug]);

  if (update === null) return <NotFoundContent />;

  return (
    <>
      {update && (
        <SEO
          title={update.title}
          description={update.excerpt || update.body.slice(0, 155)}
          image={update.coverImage}
          type="article"
          article={{ datePublished: update.publishedAt, dateModified: update.updatedAt }}
        />
      )}

      <section className={styles.section}>
        <div className={`container ${styles.inner}`}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/updates">Updates</Link>
          </nav>

          {error && <p className={styles.error}>{error}</p>}
          {update === undefined && !error && <p className={styles.muted}>Loading…</p>}

          {update && (
            <article>
              <time className={styles.date} dateTime={update.publishedAt}>
                {new Date(update.publishedAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <h1 className={styles.title}>{update.title}</h1>

              {update.coverImage && (
                <div className={styles.cover}>
                  <img src={update.coverImage} alt="" />
                </div>
              )}

              <div className={styles.body}>
                {update.body
                  .split(/\n\s*\n/)
                  .filter((p) => p.trim())
                  .map((para, i) => (
                    <p key={i}>{para.trim()}</p>
                  ))}
              </div>

              <Link to="/updates" className={styles.backLink}>
                ← Back to Updates
              </Link>
            </article>
          )}
        </div>
      </section>
    </>
  );
}
