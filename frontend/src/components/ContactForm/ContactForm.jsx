import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { siteConfig } from '@/data/config';
import { submitEnquiry, ApiError } from '@/lib/api';
import styles from './ContactForm.module.css';

/* ── Empty State ───────────────────────────────── */
const EMPTY = {
  name:              '',
  company:           '',
  country:           '',
  email:             '',
  phone:             '',
  productInterest:   '',
  estimatedQuantity: '',
  message:           '',
};

/* ── Animation Variants ────────────────────────── */
const formVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
  },
  exit:    { opacity: 0, y: -10,
    transition: { duration: 0.3 }
  },
};

/* ═══════════════════════════════════════════════ */
export default function ContactForm() {
  const { t } = useTranslation();
  const [searchParams]    = useSearchParams();
  const productSlug       = searchParams.get('product')  || '';
  const prefilledInterest = searchParams.get('interest') || '';
  const prefilledCountry  = searchParams.get('country')  || '';

  const [values, setValues] = useState(() => ({
    ...EMPTY,
    country: prefilledCountry,
    productInterest: prefilledInterest,
    message: productSlug
      ? t('contact.form.productInterestNote', { product: productSlug.replace(/-/g, ' ') })
      : '',
  }));

  const [status, setStatus]           = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  /* ── Handlers ──────────────────────────────── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    try {
      await submitEnquiry({ ...values, productSlug, source: 'website' });
      setStatus('success');
      setValues(EMPTY);
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof ApiError
          ? err.message
          : t('contact.form.genericError')
      );
    }
  };

  /* ── Success State ─────────────────────────── */
  if (status === 'success') {
    return (
      <motion.div
        className={styles.success}
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Success Icon */}
        <div
          className={styles.successIcon}
          aria-hidden="true"
        >
          ✓
        </div>

        <p className="eyebrow">{t('contact.form.successEyebrow')}</p>

        <h3>{t('contact.form.successTitle')}</h3>

        <p>
          {t('contact.form.successBody')}{' '}
          <a href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>.
        </p>

        <button
          type="button"
          className={styles.again}
          onClick={() => setStatus('idle')}
        >
          {t('contact.form.sendAnother')}
        </button>
      </motion.div>
    );
  }

  /* ── Form ──────────────────────────────────── */
  return (
    <motion.form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      variants={formVariants}
      initial="hidden"
      animate="visible"
      aria-label={t('contact.form.ariaLabel')}
    >

      {/* ── Row 1 — Name + Company ──────────── */}
      <div className={styles.row}>
        <label htmlFor="name">
          {t('contact.form.name')}<span aria-hidden="true">*</span>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            placeholder={t('contact.form.namePlaceholder')}
          />
        </label>

        <label htmlFor="company">
          {t('contact.form.company')}
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={handleChange}
            placeholder={t('contact.form.companyPlaceholder')}
          />
        </label>
      </div>

      {/* ── Row 2 — Country + Email ─────────── */}
      <div className={styles.row}>
        <label htmlFor="country">
          {t('contact.form.country')}<span aria-hidden="true">*</span>
          <input
            id="country"
            name="country"
            type="text"
            required
            autoComplete="country-name"
            value={values.country}
            onChange={handleChange}
            placeholder={t('contact.form.countryPlaceholder')}
          />
        </label>

        <label htmlFor="email">
          {t('contact.form.email')}<span aria-hidden="true">*</span>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            placeholder={t('contact.form.emailPlaceholder')}
          />
        </label>
      </div>

      {/* ── Row 3 — Phone + Product Interest ── */}
      <div className={styles.row}>
        <label htmlFor="phone">
          {t('contact.form.phone')}
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={handleChange}
            placeholder={t('contact.form.phonePlaceholder')}
          />
        </label>

        <label htmlFor="productInterest">
          {t('contact.form.productInterest')}<span aria-hidden="true">*</span>
          <select
            id="productInterest"
            name="productInterest"
            required
            value={values.productInterest}
            onChange={handleChange}
          >
            <option value="" disabled>
              {t('contact.form.selectOption')}
            </option>
            {siteConfig.productInterestOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {t(opt.labelKey)}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* ── Form Divider ────────────────────── */}
      <div
        className={styles.formDivider}
        aria-hidden="true"
      />

      {/* ── Quantity ────────────────────────── */}
      <label htmlFor="estimatedQuantity">
        {t('contact.form.quantity')}
        <input
          id="estimatedQuantity"
          name="estimatedQuantity"
          type="text"
          value={values.estimatedQuantity}
          onChange={handleChange}
          placeholder={t('contact.form.quantityPlaceholder')}
        />
        <span className={styles.fieldHint}>
          {t('contact.form.quantityHint')}
        </span>
      </label>

      {/* ── Message ─────────────────────────── */}
      <label htmlFor="message">
        {t('contact.form.message')}
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          placeholder={t('contact.form.messagePlaceholder')}
        />
      </label>

      {/* ── Error Banner ────────────────────── */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            className={styles.error}
            role="alert"
            aria-live="assertive"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── Submit ──────────────────────────── */}
      <button
        type="submit"
        className={styles.submit}
        disabled={status === 'submitting'}
        aria-busy={status === 'submitting'}
      >
        <span className={styles.submitInner}>
          {status === 'submitting' ? (
            <>
              <span
                className={styles.spinner}
                aria-hidden="true"
              />
              {t('contact.form.sending')}
            </>
          ) : (
            t('contact.form.submit')
          )}
        </span>
      </button>

      {/* Submit note */}
      <p className={styles.submitNote}>
        {t('contact.form.submitNote')}
      </p>

    </motion.form>
  );
}
