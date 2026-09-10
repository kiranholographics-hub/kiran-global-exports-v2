import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import HqShell from '@/components/Hq/HqShell';
import { fetchMarkets, createMarket, updateMarket, deleteMarket } from '@/lib/markets';
import { ApiError } from '@/lib/api';
import styles from './HqDashboard.module.css';

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

  const handleStatusChange = async (id, status) => {
    setError('');
    try {
      await updateMarket(token, id, { status });
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not update market.');
    }
  };

  const handleDelete = async (id, countryName) => {
    if (!window.confirm(`Delete the ${countryName} market? This can't be undone.`)) return;
    setError('');
    try {
      await deleteMarket(token, id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not delete market.');
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

      <section className={styles.panel}>
        <h2 className={styles.panelTitle}>Markets</h2>
        {markets === null && <p className={styles.muted}>Loading…</p>}
        {markets && markets.length === 0 && <p className={styles.muted}>No markets yet — add one above.</p>}
        {markets && markets.length > 0 && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {markets.map((m) => (
                  <tr key={m.id}>
                    <td>{m.countryName} ({m.countryCode})</td>
                    <td><code>/{m.slug}</code></td>
                    <td>
                      <select
                        className={`${styles.statusSelect} ${styles[`status_${m.status}`]}`}
                        value={m.status}
                        onChange={(e) => handleStatusChange(m.id, e.target.value)}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td>{new Date(m.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button type="button" className={styles.deleteButton} onClick={() => handleDelete(m.id, m.countryName)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </HqShell>
  );
}
