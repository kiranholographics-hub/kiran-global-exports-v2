import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import HqShell from '@/components/Hq/HqShell';
import MarketCard from '@/components/Hq/MarketCard';
import LandingPagesPanel from '@/components/Hq/LandingPagesPanel';
import { fetchMarkets, fetchMarketStats, createMarket } from '@/lib/markets';
import { ApiError } from '@/lib/api';
import styles from './HqDashboard.module.css';
import cardStyles from '@/components/Hq/HqCards.module.css';

const STATUSES = ['draft', 'active', 'paused', 'archived'];
const EMPTY_NEW = { countryName: '', countryCode: '', slug: '' };

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function HqDashboard() {
  const { token } = useAuth();
  const [markets, setMarkets] = useState(null);
  const [marketStats, setMarketStats] = useState(null);
  const [tab, setTab] = useState('markets');
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [error, setError] = useState('');
  const [newMarket, setNewMarket] = useState(EMPTY_NEW);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await fetchMarkets(token);
      setMarkets(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load markets.');
    }
    // The activity numbers are a bonus: if they fail the cards still work.
    try {
      setMarketStats(await fetchMarketStats(token));
    } catch {
      setMarketStats(null);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const stats = useMemo(() => {
    const list = markets || [];
    return {
      total: list.length,
      active: list.filter((m) => m.status === 'active').length,
      draft: list.filter((m) => m.status === 'draft').length,
      paused: list.filter((m) => m.status === 'paused').length,
    };
  }, [markets]);

  const visibleMarkets = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return (markets || []).filter(
      (m) =>
        (statusFilter === 'all' || m.status === statusFilter) &&
        (!needle || `${m.countryName} ${m.countryCode} ${m.slug}`.toLowerCase().includes(needle))
    );
  }, [markets, query, statusFilter]);

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewMarket((v) => {
      const next = { ...v, [name]: value };
      if (name === 'countryName' && !v.slug) next.slug = slugify(value);
      return next;
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    try {
      await createMarket(token, newMarket);
      setNewMarket(EMPTY_NEW);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not create market.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <HqShell title="Global Markets">
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats.total}</span>
          <span className={styles.statLabel}>Total Markets</span>
        </div>
        <div className={`${styles.statCard} ${styles.statCardActive}`}>
          <span className={styles.statNumber}>{stats.active}</span>
          <span className={styles.statLabel}>Active</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats.draft}</span>
          <span className={styles.statLabel}>Draft</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats.paused}</span>
          <span className={styles.statLabel}>Paused</span>
        </div>
      </div>

      {error && (
        <p className={styles.error} role="alert" aria-live="assertive">
          {error}
        </p>
      )}

      {tab === 'markets' && (
        <section className={styles.panel}>
          <h2 className={styles.panelTitle}>Add a market</h2>
          <form className={styles.addForm} onSubmit={handleCreate}>
            <label>
              Country name
              <input name="countryName" value={newMarket.countryName} onChange={handleNewChange} required placeholder="Australia" />
            </label>
            <label>
              Country code
              <input name="countryCode" value={newMarket.countryCode} onChange={handleNewChange} required placeholder="AU" maxLength={5} />
            </label>
            <label>
              URL slug
              <input name="slug" value={newMarket.slug} onChange={handleNewChange} required placeholder="australia" />
            </label>
            <button type="submit" className={styles.addButton} disabled={creating}>
              {creating ? 'Adding…' : 'Add market'}
            </button>
          </form>
        </section>
      )}

      <div className={cardStyles.tabs} role="tablist" aria-label="Pages to manage">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'markets'}
          className={`${cardStyles.tab} ${tab === 'markets' ? cardStyles.tabActive : ''}`}
          onClick={() => setTab('markets')}
        >
          Market pages
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'pages'}
          className={`${cardStyles.tab} ${tab === 'pages' ? cardStyles.tabActive : ''}`}
          onClick={() => setTab('pages')}
        >
          Export &amp; solution pages
        </button>
      </div>

      {tab === 'markets' && (
        <section>
          <div className={cardStyles.toolbar}>
            <input
              className={cardStyles.search}
              type="search"
              aria-label="Search markets"
              placeholder="Search markets…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              className={cardStyles.filter}
              aria-label="Filter by status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All statuses</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {markets === null && <p className={styles.muted}>Loading…</p>}
          {markets && markets.length === 0 && <p className={styles.muted}>No markets yet — add one above.</p>}
          {markets && markets.length > 0 && visibleMarkets.length === 0 && (
            <p className={styles.muted}>No market matches that search.</p>
          )}
          <div className={cardStyles.cardList}>
            {visibleMarkets.map((m) => (
              <MarketCard
                key={m.id}
                market={m}
                stats={marketStats?.[m.id]}
                token={token}
                onChanged={load}
                onError={setError}
              />
            ))}
          </div>
        </section>
      )}

      {tab === 'pages' && <LandingPagesPanel token={token} onError={setError} />}
    </HqShell>
  );
}
