import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import HqShell from '@/components/Hq/HqShell';
import { fetchEnquiries, updateEnquiryStatus } from '@/lib/enquiries';
import { ApiError } from '@/lib/api';
import styles from './HqEnquiries.module.css';

const STATUSES = ['new', 'contacted', 'closed'];

export default function HqEnquiries() {
  const { token } = useAuth();
  const [enquiries, setEnquiries] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const load = useCallback(async () => {
    try {
      const data = await fetchEnquiries(token);
      setEnquiries(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load enquiries.');
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const stats = useMemo(() => {
    const list = enquiries || [];
    return {
      total: list.length,
      new: list.filter((e) => e.status === 'new').length,
      contacted: list.filter((e) => e.status === 'contacted').length,
      closed: list.filter((e) => e.status === 'closed').length,
    };
  }, [enquiries]);

  const visible = useMemo(() => {
    const list = enquiries || [];
    return filter === 'all' ? list : list.filter((e) => e.status === filter);
  }, [enquiries, filter]);

  const handleStatusChange = async (id, status) => {
    setError('');
    try {
      await updateEnquiryStatus(token, id, status);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not update enquiry.');
    }
  };

  return (
    <HqShell title="Enquiries">
      <div className={styles.statsRow}>
        <button type="button" className={styles.statCard} onClick={() => setFilter('all')} data-active={filter === 'all'}>
          <span className={styles.statNumber}>{stats.total}</span>
          <span className={styles.statLabel}>All</span>
        </button>
        <button type="button" className={`${styles.statCard} ${styles.statCardNew}`} onClick={() => setFilter('new')} data-active={filter === 'new'}>
          <span className={styles.statNumber}>{stats.new}</span>
          <span className={styles.statLabel}>New</span>
        </button>
        <button type="button" className={styles.statCard} onClick={() => setFilter('contacted')} data-active={filter === 'contacted'}>
          <span className={styles.statNumber}>{stats.contacted}</span>
          <span className={styles.statLabel}>Contacted</span>
        </button>
        <button type="button" className={styles.statCard} onClick={() => setFilter('closed')} data-active={filter === 'closed'}>
          <span className={styles.statNumber}>{stats.closed}</span>
          <span className={styles.statLabel}>Closed</span>
        </button>
      </div>

      {error && (
        <p className={styles.error} role="alert" aria-live="assertive">
          {error}
        </p>
      )}

      <section className={styles.panel}>
        {enquiries === null && <p className={styles.muted}>Loading…</p>}
        {enquiries && visible.length === 0 && (
          <p className={styles.muted}>
            {filter === 'all' ? 'No enquiries yet — they’ll show up here as buyers submit the contact form.' : `No ${filter} enquiries.`}
          </p>
        )}
        {enquiries && visible.length > 0 && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name / Company</th>
                  <th>Country</th>
                  <th>Product</th>
                  <th>Contact</th>
                  <th>Message</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((e) => (
                  <tr key={e.id}>
                    <td className={styles.nowrap}>{new Date(e.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className={styles.name}>{e.name}</div>
                      {e.company && <div className={styles.company}>{e.company}</div>}
                    </td>
                    <td>{e.country}</td>
                    <td>
                      {e.productInterest}
                      {e.estimatedQuantity && <div className={styles.qty}>{e.estimatedQuantity}</div>}
                    </td>
                    <td>
                      <a href={`mailto:${e.email}`} className={styles.contactLink}>{e.email}</a>
                      {e.phone && <div className={styles.phone}>{e.phone}</div>}
                    </td>
                    <td className={styles.message}>{e.message || <span className={styles.muted}>—</span>}</td>
                    <td>
                      <select
                        className={`${styles.statusSelect} ${styles[`status_${e.status}`]}`}
                        value={e.status}
                        onChange={(ev) => handleStatusChange(e.id, ev.target.value)}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
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
