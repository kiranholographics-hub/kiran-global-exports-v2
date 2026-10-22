import { useMemo, useState } from 'react';
import { updateMarket, deleteMarket } from '@/lib/markets';
import { ApiError } from '@/lib/api';
import { getMarketContent } from '@/data/marketContent';
import PageTextForm from './PageTextForm';
import styles from './HqCards.module.css';

const STATUSES = ['draft', 'active', 'paused', 'archived'];
const SAVED_MESSAGE =
  'Saved. The live page shows this now; Google sees it after the next deploy.';

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString() : '—';
}

function Activity({ number, label }) {
  return (
    <div className={styles.activityItem}>
      <span className={styles.activityNumber}>{number}</span>
      <span className={styles.activityLabel}>{label}</span>
    </div>
  );
}

/**
 * One market on the /hq Global Markets screen: a header row with the status
 * control, and an expandable body with the country's activity numbers and
 * editors for its SEO title/description and page text.
 */
export default function MarketCard({ market, stats, token, onChanged, onError }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notes, setNotes] = useState(market.notes || '');
  const [message, setMessage] = useState('');

  const defaults = useMemo(
    () => getMarketContent(market.slug, market.countryName),
    [market.slug, market.countryName]
  );

  const saved = {
    seoTitle: market.seoTitle,
    seoDescription: market.seoDescription,
    heading: market.content?.heading,
    lead: market.content?.lead,
    faqs: market.content?.faqs,
  };
  const edited = Boolean(
    saved.seoTitle || saved.seoDescription || saved.heading || saved.lead || saved.faqs?.length
  );

  async function run(action, success) {
    setBusy(true);
    setMessage('');
    onError('');
    try {
      await action();
      if (success) setMessage(success);
      await onChanged();
    } catch (err) {
      onError(err instanceof ApiError ? err.message : 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  }

  const handleStatus = (e) =>
    run(() => updateMarket(token, market.id, { status: e.target.value }));

  const handleSaveText = (payload) =>
    run(
      () =>
        updateMarket(token, market.id, {
          seoTitle: payload.seoTitle,
          seoDescription: payload.seoDescription,
          content: { heading: payload.heading, lead: payload.lead, faqs: payload.faqs },
        }),
      SAVED_MESSAGE
    );

  const handleResetText = () =>
    run(
      () =>
        updateMarket(token, market.id, {
          seoTitle: '',
          seoDescription: '',
          content: { heading: '', lead: '', faqs: [] },
        }),
      'Reset to the text that ships with the site.'
    );

  const handleSaveNotes = () =>
    run(() => updateMarket(token, market.id, { notes }), 'Notes saved.');

  const handleDelete = () => {
    if (!window.confirm(`Delete the ${market.countryName} market? This can't be undone.`)) return;
    run(() => deleteMarket(token, market.id));
  };

  const bodyId = `market-body-${market.id}`;

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
            <span className={styles.cardTitle}>
              {market.countryName} ({market.countryCode})
            </span>
            <span className={styles.cardSub}>/{market.slug}</span>
          </span>
          {edited && <span className={`${styles.badge} ${styles.badgeEdited}`}>Text edited</span>}
          <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} aria-hidden="true">
            ▾
          </span>
        </button>
        {market.status === 'active' && (
          <a className={styles.linkOut} href={`/${market.slug}`} target="_blank" rel="noreferrer">
            Website ↗
          </a>
        )}
        <select
          aria-label={`Status of the ${market.countryName} market`}
          className={`${styles.statusSelect} ${styles[`status_${market.status}`]}`}
          value={market.status}
          onChange={handleStatus}
          disabled={busy}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {open && (
        <div className={styles.cardBody} id={bodyId}>
          <h4 className={styles.sectionTitle}>Customer activity</h4>
          {stats ? (
            <div className={styles.activityGrid}>
              <Activity number={stats.enquiries.last30} label="Enquiries, last 30 days" />
              <Activity number={stats.enquiries.total} label="Enquiries, all time" />
              <Activity number={formatDate(stats.enquiries.lastAt)} label="Latest enquiry" />
              <Activity number={stats.pageViews.last30} label="Views of this market's pages, 30 days" />
              <Activity number={stats.pageViews.total} label="Views of this market's pages, all time" />
              <Activity
                number={stats.visitsFromCountry.last30}
                label={`Visitors from ${market.countryName}, 30 days`}
              />
            </div>
          ) : (
            <p className={styles.hint}>Activity numbers are not available right now.</p>
          )}
          <p className={styles.hint}>
            Enquiries are matched on the country typed in the contact form. Views count{' '}
            <code>/{market.slug}</code> and <code>/export/{market.slug}-cotton-towel-supplier</code>.
          </p>

          <PageTextForm
            key={market.updatedAt}
            defaults={defaults}
            current={saved}
            saving={busy}
            onSave={handleSaveText}
            onReset={handleResetText}
          />

          <h4 className={styles.sectionTitle}>Internal notes</h4>
          <label className={styles.field}>
            Notes (never shown on the site)
            <textarea
              className={styles.textarea}
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
          <div className={styles.rowButtons}>
            <button type="button" className={styles.secondaryButton} onClick={handleSaveNotes} disabled={busy}>
              Save notes
            </button>
            {message && (
              <span className={styles.message} role="status">
                {message}
              </span>
            )}
            <button type="button" className={styles.dangerButton} onClick={handleDelete} disabled={busy}>
              Delete market
            </button>
          </div>

          <div className={styles.metaRow}>
            <span>Created on {formatDate(market.createdAt)}</span>
            <span>Last activated on {formatDate(market.activatedAt)}</span>
          </div>
        </div>
      )}
    </article>
  );
}
