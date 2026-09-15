import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO/SEO';
import NotFoundContent from '@/components/NotFoundContent/NotFoundContent';
import { fetchPageBySlug } from '@/lib/pages';
import styles from './CustomPage.module.css';

export default function CustomPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(undefined); // undefined = loading, null = not found
  const [error, setError] = useState('');

  useEffect(() => {
    setPage(undefined);
    setError('');
    fetchPageBySlug(slug)
      .then(setPage)
      .catch((err) => {
        if (err.status === 404) setPage(null);
        else setError('Could not load this page right now.');
      });
  }, [slug]);

  if (page === null) return <NotFoundContent />;

  return (
    <>
      {page && (
        <SEO title={page.title} description={page.metaDescription || page.body.slice(0, 155)} />
      )}

      <section className={styles.section}>
        <div className={`container ${styles.inner}`}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
          </nav>

          {error && <p className={styles.error}>{error}</p>}
          {page === undefined && !error && <p className={styles.muted}>Loading…</p>}

          {page && (
            <article>
              <h1 className={styles.title}>{page.title}</h1>

              <div className={styles.body}>
                {page.body
                  .split(/\n\s*\n/)
                  .filter((p) => p.trim())
                  .map((para, i) => (
                    <p key={i}>{para.trim()}</p>
                  ))}
              </div>

              <Link to="/contact" className={styles.ctaLink}>
                Get in touch with our export team →
              </Link>
            </article>
          )}
        </div>
      </section>
    </>
  );
}
