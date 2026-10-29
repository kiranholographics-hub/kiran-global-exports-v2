import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Link from '@/components/Link/Link';
import SEO from '@/components/SEO/SEO';
import NotFoundContent from '@/components/NotFoundContent/NotFoundContent';
import { fetchUpdateBySlug } from '@/lib/updates';
import { getLandingPagesForArticle, getToolsForArticle } from '@/data/articleGuides';
import { GUIDE_TRANSLATIONS } from '@/data/guideTranslations';
import { LANDING_TRANSLATIONS } from '@/data/landingTranslations';
import { siteConfig } from '@/data/config';
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
// The page's own interface text. A translated guide takes its language's
// version from src/data/guideTranslations; every other article keeps this.
const EN_UI = {
  home: 'Home',
  updates: 'Updates',
  loading: 'Loading…',
  loadError: 'Could not load this update right now.',
  publishedBy: 'Published by',
  related: 'Related sourcing guides',
  back: '← Back to Updates',
};

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
  const { i18n } = useTranslation();
  const [fetched, setFetched] = useState(undefined); // undefined = loading, null = not found
  const [error, setError] = useState('');

  // The article itself always comes from the API — its dates, cover and
  // whether it is published at all. A translated guide lays its language's
  // title, excerpt and body over it.
  const translation = GUIDE_TRANSLATIONS[i18n.language];
  const copy = translation?.guides[slug];
  const ui = copy ? translation.ui : EN_UI;
  const update = fetched && copy ? { ...fetched, ...copy } : fetched;

  // On a translated guide, only the landing pages that exist in the same
  // language, under their translated titles; an English list under a
  // Spanish article reads as two pages stitched together.
  const landing = LANDING_TRANSLATIONS[i18n.language]?.pages;
  const guides = getLandingPagesForArticle(slug).flatMap((g) => {
    if (!copy) return [g];
    const translated = landing?.[g.href.replace(/^\//, '')];
    return translated ? [{ href: g.href, label: translated.seoTitle }] : [];
  });
  // The calculator is English only, so a translated guide does not list it.
  if (!copy) guides.push(...getToolsForArticle(slug));

  useEffect(() => {
    setFetched(undefined);
    setError('');
    fetchUpdateBySlug(slug)
      .then(setFetched)
      .catch((err) => {
        if (err.status === 404) setFetched(null);
        else setError(ui.loadError);
      });
  }, [slug, ui.loadError]);

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
            <Link to="/">{ui.home}</Link>
            <span aria-hidden="true">/</span>
            <Link to="/updates">{ui.updates}</Link>
          </nav>

          {error && <p className={styles.error}>{error}</p>}
          {update === undefined && !error && <p className={styles.muted}>{ui.loading}</p>}

          {update && (
            <article>
              <time className={styles.date} dateTime={update.publishedAt}>
                {new Date(update.publishedAt).toLocaleDateString(copy ? i18n.language : undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <h1 className={styles.title}>{update.title}</h1>

              {/* Who stands behind the guide. Taken from the same config
                  the contact page uses, so the name and title cannot drift
                  apart between pages. */}
              <p className={styles.byline}>
                {ui.publishedBy} <strong>{siteConfig.contact.person}</strong>,{' '}
                {siteConfig.contact.personTitle}, {siteConfig.brandName}
              </p>

              {update.coverImage && (
                <div className={styles.cover}>
                  <img src={update.coverImage} alt={update.title} />
                </div>
              )}

              <div className={styles.body}>
                {renderBody(update.body)}
              </div>

              {guides.length > 0 && (
                <aside className={styles.guides}>
                  <h2>{ui.related}</h2>
                  <ul>
                    {guides.map((g) => (
                      <li key={g.href}>
                        <Link to={g.href}>{g.label}</Link>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}

              <Link to="/updates" className={styles.backLink}>
                {ui.back}
              </Link>
            </article>
          )}
        </div>
      </section>
    </>
  );
}
