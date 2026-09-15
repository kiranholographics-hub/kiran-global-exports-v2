import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import HqShell from '@/components/Hq/HqShell';
import { fetchVisitSummary } from '@/lib/visits';
import { ApiError } from '@/lib/api';
import styles from './HqVisitors.module.css';

export default function HqVisitors() {
  const { token } = useAuth();
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const data = await fetchVisitSummary(token);
      setSummary(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load visitor data.');
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const topCountry = summary?.byCountry?.[0];

  return (
    <HqShell title="Visitors">
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{summary?.total ?? '—'}</span>
          <span className={styles.statLabel}>Total Visits</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{summary?.last7Days ?? '—'}</span>
          <span className={styles.statLabel}>Last 7 Days</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{summary?.last30Days ?? '—'}</span>
          <span className={styles.statLabel}>Last 30 Days</span>
        </div>
        <div className={`${styles.statCard} ${styles.statCardWide}`}>
          <span className={styles.statNumber} title={topCountry?.country}>
            {topCountry ? topCountry.country : '—'}
          </span>
          <span className={styles.statLabel}>Top Country</span>
        </div>
      </div>

      {error && (
        <p className={styles.error} role="alert" aria-live="assertive">
          {error}
        </p>
      )}

      <section className={styles.panel}>
        <h2 className={styles.panelTitle}>Visitors by country</h2>
        {summary === null && !error && <p className={styles.muted}>Loading…</p>}
        {summary && summary.byCountry.length === 0 && (
          <p className={styles.muted}>No visits recorded yet.</p>
        )}
        {summary && summary.byCountry.length > 0 && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Visits</th>
                  <th>Share</th>
                </tr>
              </thead>
              <tbody>
                {summary.byCountry.map((c) => {
                  const pct = summary.total ? Math.round((c.count / summary.total) * 100) : 0;
                  return (
                    <tr key={c.country}>
                      <td>{c.country}</td>
                      <td>{c.count}</td>
                      <td>
                        <div className={styles.barWrap}>
                          <div className={styles.bar} style={{ width: `${pct}%` }} />
                          <span className={styles.barLabel}>{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </HqShell>
  );
}
