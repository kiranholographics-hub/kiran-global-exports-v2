import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/Auth/AuthProvider';
import { ApiError } from '@/lib/api';
import styles from './HqLogin.module.css';

const EMPTY = { email: '', password: '' };

export default function HqLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    try {
      await login(values.email, values.password);
      navigate('/hq', { replace: true });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof ApiError ? err.message : 'Could not sign in. Please try again.');
    }
  };

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate aria-label="HQ login">
        <p className={styles.eyebrow}>Kiran Global Exports</p>
        <h1 className={styles.title}>HQ Sign In</h1>

        <label htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="username"
            value={values.email}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
          />
        </label>

        {status === 'error' && (
          <p className={styles.error} role="alert" aria-live="assertive">
            {errorMessage}
          </p>
        )}

        <button type="submit" className={styles.submit} disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
          {status === 'submitting' ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
