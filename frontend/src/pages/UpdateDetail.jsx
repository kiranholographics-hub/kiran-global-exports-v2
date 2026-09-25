import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO/SEO';
import NotFoundContent from '@/components/NotFoundContent/NotFoundContent';
import { fetchUpdateBySlug } from '@/lib/updates';
import styles from './UpdateDetail.module.css';

/**
 * Renders an update's body.
 *
 * Blank-line-separated paragraphs, as before — plus two things a buyer
 * guide needs and a company announcement never did: a block starting
 * "## " becomes a subheading, and a block whose lines all start "- "
 * becomes a bulleted list. Anything else is still a paragraph, so every
 * update written before this renders exactly as it did.
 *
 * Deliberately not a Markdown parser. These are two rules that earn their
 * place; a dependency that handles inline formatting, tables and raw HTML
 * would also hand whoever writes an update the ability to inject it.
 */
function renderBody(body) {
  return body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, i) => {
      if (block.startsWith('## ')) {
        return <h2 key={i}>{block.slice(3).trim()}</h2>;
      }
      const lines = block.split('\n').map((line) => line.trim());
      if (lines.length > 1 && lines.every((line) => line.startsWith('- '))) {
        return (
          <ul key={i}>
            {lines.map((line, j) => (
              <li key={j}>{line.slice(2).trim()}</li>
            ))}
          </ul>
        );
      }
      return <p key={i}>{block}</p>;
    });
}

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
                  <img src={update.coverImage} alt={update.title} />
                </div>
              )}

              <div className={styles.body}>
                {renderBody(update.body)}
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
