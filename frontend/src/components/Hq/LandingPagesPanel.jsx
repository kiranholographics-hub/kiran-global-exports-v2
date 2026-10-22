import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  fetchPageOverridesAdmin,
  savePageOverride,
  resetPageOverride,
  resetPageOverridesCache,
} from '@/lib/pageOverrides';
import { ApiError } from '@/lib/api';
import { getLandingPageGroups, getSeoLandingPage } from '@/data/seoLandingPages';
import PageTextForm from './PageTextForm';
import styles from './HqCards.module.css';

const SAVED_MESSAGE =
  'Saved. The live page shows this now; Google sees it after the next deploy.';

const GROUP_TITLES = {
  export: 'Country sourcing guides  /export/…',
  solutions: 'Solution pages  /solutions/…',
};

function PageCard({ item, override, token, onChanged, onError }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const [, section, slug] = item.href.split('/');
  const defaults = useMemo(() => getSeoLandingPage(section, slug), [section, slug]);
  const edited = Boolean(override);

  async function run(action, success) {
    setBusy(true);
    setMessage('');
    onError('');
    try {
      await action();
      resetPageOverridesCache();
      setMessage(success);
      await onChanged();
    } catch (err) {
      onError(err instanceof ApiError ? err.message : 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  }

  const handleSave = (payload) =>
    run(() => savePageOverride(token, section, slug, payload), SAVED_MESSAGE);

  const handleReset = () =>
    run(
      () => resetPageOverride(token, section, slug),
      'Reset to the text that ships with the site.'
    );

  if (!defaults) return null;
  const bodyId = `landing-body-${section}-${slug}`;

  return (
    <article className={`${styles.card} ${open ? styles.cardOpen : ''}`}>
      <div className={styles.cardHead}>
        <button
          type="button"
          className={styles.cardToggle}
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => setOpen((v) => !v)}
        >
          <span>
            <span className={styles.cardTitle}>{item.label}</span>
            <span className={styles.cardSub}>{item.href}</span>
          </span>
          {edited && <span className={`${styles.badge} ${styles.badgeEdited}`}>Text edited</span>}
          <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} aria-hidden="true">
            ▾
          </span>
        </button>
        <a className={styles.linkOut} href={item.href} target="_blank" rel="noreferrer">
          Website ↗
        </a>
      </div>

      {open && (
        <div className={styles.cardBody} id={bodyId}>
          <PageTextForm
            key={override?.updatedAt || 'default'}
            defaults={defaults}
            current={override}
            showIntro
            saving={busy}
            onSave={handleSave}
            onReset={handleReset}
          />
          {message && (
            <p className={styles.message} role="status">
              {message}
            </p>
          )}
        </div>
      )}
    </article>
  );
}

/**
 * The 28 country sourcing guides and the solution pages — hand-written in
 * code, editable here. Saved text is stored as an override and replaces the
 * built-in copy field by field.
 */
export default function LandingPagesPanel({ token, onError }) {
  const [overrides, setOverrides] = useState({});
  const [query, setQuery] = useState('');

  const load = useCallback(async () => {
    try {
      const rows = await fetchPageOverridesAdmin(token);
      const map = {};
      for (const row of rows) map[`${row.section}/${row.slug}`] = row;
      setOverrides(map);
    } catch (err) {
      onError(err instanceof ApiError ? err.message : 'Could not load edited page text.');
    }
  }, [token, onError]);

  useEffect(() => {
    load();
  }, [load]);

  const groups = useMemo(() => getLandingPageGroups(), []);
  const needle = query.trim().toLowerCase();

  return (
    <>
      <div className={styles.toolbar}>
        <input
          className={styles.search}
          type="search"
          aria-label="Search pages"
          placeholder="Search pages…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {['export', 'solutions'].map((section) => {
        const items = groups[section].filter(
          (item) => !needle || `${item.label} ${item.href}`.toLowerCase().includes(needle)
        );
        if (items.length === 0) return null;
        return (
          <section key={section}>
            <h3 className={styles.groupTitle}>
              {GROUP_TITLES[section]} ({items.length})
            </h3>
            <div className={styles.cardList}>
              {items.map((item) => (
                <PageCard
                  key={item.href}
                  item={item}
                  override={overrides[item.href.slice(1)]}
                  token={token}
                  onChanged={load}
                  onError={onError}
                />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
