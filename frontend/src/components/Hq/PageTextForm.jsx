import { useState } from 'react';
import styles from './HqCards.module.css';

// Google cuts titles and descriptions off around these lengths. A hint,
// not a limit — the counter just turns amber past it.
const TITLE_HINT = 60;
const DESCRIPTION_HINT = 160;

function same(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function CharCount({ value, hint }) {
  const over = value.length > hint;
  return (
    <span className={`${styles.count} ${over ? styles.countOver : ''}`}>
      {value.length} / {hint}
    </span>
  );
}

/**
 * Editor for the text of one public page: SEO title and description,
 * heading, lead, optional intro paragraphs, and FAQs.
 *
 * `defaults` is the copy that ships with the site; `current` is whatever has
 * been saved over it (or null). The form shows the saved text if there is
 * any, otherwise the default. On save, every field still equal to its
 * default is sent as empty, so the database only ever holds real edits and
 * "Reset to default" is just sending everything empty.
 *
 * Remount it (via `key`) after a save or reset to re-read `current`.
 */
export default function PageTextForm({ defaults, current, showIntro = false, saving, onSave, onReset }) {
  const [form, setForm] = useState({
    seoTitle: current?.seoTitle || defaults.seoTitle || '',
    seoDescription: current?.seoDescription || defaults.seoDescription || '',
    heading: current?.heading || defaults.heading || '',
    lead: current?.lead || defaults.lead || '',
    intro: current?.intro?.length ? current.intro : defaults.intro || [],
    faqs: current?.faqs?.length ? current.faqs : defaults.faqs || [],
  });

  const hasSaved = Boolean(
    current &&
      (current.seoTitle || current.seoDescription || current.heading || current.lead ||
        current.intro?.length || current.faqs?.length)
  );

  const setField = (name) => (e) => setForm((f) => ({ ...f, [name]: e.target.value }));

  const setIntro = (i, value) =>
    setForm((f) => ({ ...f, intro: f.intro.map((p, idx) => (idx === i ? value : p)) }));

  const setFaq = (i, field, value) =>
    setForm((f) => ({
      ...f,
      faqs: f.faqs.map((item, idx) => (idx === i ? { ...item, [field]: value } : item)),
    }));

  const addFaq = () => setForm((f) => ({ ...f, faqs: [...f.faqs, { q: '', a: '' }] }));
  const removeFaq = (i) => setForm((f) => ({ ...f, faqs: f.faqs.filter((_, idx) => idx !== i) }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const faqs = form.faqs
      .map((f) => ({ q: f.q.trim(), a: f.a.trim() }))
      .filter((f) => f.q && f.a);
    const intro = form.intro.map((p) => p.trim()).filter(Boolean);
    onSave({
      seoTitle: form.seoTitle.trim() === (defaults.seoTitle || '') ? '' : form.seoTitle.trim(),
      seoDescription:
        form.seoDescription.trim() === (defaults.seoDescription || '') ? '' : form.seoDescription.trim(),
      heading: form.heading.trim() === (defaults.heading || '') ? '' : form.heading.trim(),
      lead: form.lead.trim() === (defaults.lead || '') ? '' : form.lead.trim(),
      intro: showIntro && !same(intro, defaults.intro || []) ? intro : [],
      faqs: same(faqs, defaults.faqs || []) ? [] : faqs,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className={styles.sectionTitle}>Search result (SEO)</h4>
      <label className={styles.field}>
        SEO title
        <input className={styles.input} value={form.seoTitle} onChange={setField('seoTitle')} />
        <CharCount value={form.seoTitle} hint={TITLE_HINT} />
      </label>
      <label className={styles.field}>
        SEO description
        <textarea
          className={styles.textarea}
          rows={3}
          value={form.seoDescription}
          onChange={setField('seoDescription')}
        />
        <CharCount value={form.seoDescription} hint={DESCRIPTION_HINT} />
      </label>

      <h4 className={styles.sectionTitle}>Page text</h4>
      <label className={styles.field}>
        Heading
        <input className={styles.input} value={form.heading} onChange={setField('heading')} />
      </label>
      <label className={styles.field}>
        Lead paragraph
        <textarea className={styles.textarea} rows={4} value={form.lead} onChange={setField('lead')} />
      </label>

      {showIntro &&
        form.intro.map((para, i) => (
          <label className={styles.field} key={`intro-${i}`}>
            Intro paragraph {i + 1}
            <textarea
              className={styles.textarea}
              rows={5}
              value={para}
              onChange={(e) => setIntro(i, e.target.value)}
            />
          </label>
        ))}

      <h4 className={styles.sectionTitle}>FAQs</h4>
      {form.faqs.map((faq, i) => (
        <div className={styles.faqRow} key={`faq-${i}`}>
          <label className={styles.field}>
            Question {i + 1}
            <input className={styles.input} value={faq.q} onChange={(e) => setFaq(i, 'q', e.target.value)} />
          </label>
          <label className={styles.field}>
            Answer
            <textarea
              className={styles.textarea}
              rows={3}
              value={faq.a}
              onChange={(e) => setFaq(i, 'a', e.target.value)}
            />
          </label>
          <div>
            <button type="button" className={styles.smallButton} onClick={() => removeFaq(i)}>
              Remove question
            </button>
          </div>
        </div>
      ))}
      <button type="button" className={styles.smallButton} onClick={addFaq} disabled={form.faqs.length >= 12}>
        Add question
      </button>

      <div className={styles.rowButtons}>
        <button type="submit" className={styles.primaryButton} disabled={saving}>
          {saving ? 'Saving…' : 'Save changes'}
        </button>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onReset}
          disabled={saving || !hasSaved}
          title={hasSaved ? 'Go back to the text that ships with the site' : 'Nothing edited yet'}
        >
          Reset to default
        </button>
      </div>
    </form>
  );
}
