import { useState } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import HqShell from '@/components/Hq/HqShell';
import { changePassword } from '@/lib/auth';
import { ApiError } from '@/lib/api';
import styles from './HqPassword.module.css';

const MIN_LENGTH = 10;
const EMPTY = { current: '', next: '', again: '' };

export default function HqPassword() {
  const { token, logout } = useAuth();
  const [values, setValues] = useState(EMPTY);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);

  const set = (key) => (ev) => setValues((v) => ({ ...v, [key]: ev.target.value }));

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError('');
    if (values.next.length < MIN_LENGTH) {
      setError(`The new password must be at least ${MIN_LENGTH} characters.`);
      return;
    }
    if (values.next !== values.again) {
      setError('The two new passwords do not match.');
      return;
    }
    setSaving(true);
    try {
      await changePassword(token, values.current, values.next);
      setValues(EMPTY);
      setDone(true);
      // Every earlier login stops working when the password changes, this
      // one included, so go back to the sign-in page.
      setTimeout(logout, 2500);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not change the password.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <HqShell title="Change password">
      {done ? (
        <p className={styles.success} role="status">
          Password changed. You will be signed out now — sign in again with the new password.
        </p>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <p className={styles.muted}>
            Use at least {MIN_LENGTH} characters. Changing it signs you out on every device.
          </p>

          {error && (
            <p className={styles.error} role="alert" aria-live="assertive">
              {error}
            </p>
          )}

          <label htmlFor="current-password">
            Current password
            <input
              id="current-password"
              type="password"
              autoComplete="current-password"
              value={values.current}
              onChange={set('current')}
              required
            />
          </label>

          <label htmlFor="new-password">
            New password
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              value={values.next}
              onChange={set('next')}
              required
            />
          </label>

          <label htmlFor="repeat-password">
            New password again
            <input
              id="repeat-password"
              type="password"
              autoComplete="new-password"
              value={values.again}
              onChange={set('again')}
              required
            />
          </label>

          <div>
            <button type="submit" className={styles.primaryBtn} disabled={saving}>
              {saving ? 'Saving…' : 'Change password'}
            </button>
          </div>
        </form>
      )}
    </HqShell>
  );
}
