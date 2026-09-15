import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import HqShell from '@/components/Hq/HqShell';
import { fetchAllTestimonials, createTestimonial, editTestimonial, deleteTestimonial } from '@/lib/testimonials';
import { ApiError } from '@/lib/api';
import styles from './HqTestimonials.module.css';

const EMPTY_FORM = { authorName: '', authorRole: '', country: '', quote: '', rating: '5', order: '0', published: true };

export default function HqTestimonials() {
  const { token } = useAuth();
  const [testimonials, setTestimonials] = useState(null);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await fetchAllTestimonials(token);
      setTestimonials(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load testimonials.');
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const openNewForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEditForm = (t) => {
    setEditingId(t.id);
    setForm({
      authorName: t.authorName,
      authorRole: t.authorRole || '',
      country: t.country || '',
      quote: t.quote,
      rating: t.rating ? String(t.rating) : '',
      order: String(t.order ?? 0),
      published: t.published,
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError('');
    setSaving(true);
    try {
      if (editingId) {
        await editTestimonial(token, editingId, form);
      } else {
        await createTestimonial(token, form);
      }
      closeForm();
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not save this testimonial.');
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (t) => {
    setError('');
    try {
      await editTestimonial(token, t.id, { published: !t.published });
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not update this testimonial.');
    }
  };

  const handleDelete = async (t) => {
    if (!window.confirm(`Delete the testimonial from "${t.authorName}"? This can't be undone.`)) return;
    setError('');
    try {
      await deleteTestimonial(token, t.id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not delete this testimonial.');
    }
  };

  return (
    <HqShell title="Testimonials">
      <div className={styles.header}>
        <p className={styles.muted}>
          Published testimonials show in the trust section on your homepage.
        </p>
        {!formOpen && (
          <button type="button" className={styles.primaryBtn} onClick={openNewForm}>
            + New testimonial
          </button>
        )}
      </div>

      {error && (
        <p className={styles.error} role="alert" aria-live="assertive">
          {error}
        </p>
      )}

      {formOpen && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>{editingId ? 'Edit testimonial' : 'New testimonial'}</h2>

          <div className={styles.row}>
            <label>
              Author name <span aria-hidden="true">*</span>
              <input
                type="text"
                value={form.authorName}
                onChange={(ev) => setForm({ ...form, authorName: ev.target.value })}
                placeholder="e.g. James Carter"
                required
              />
            </label>

            <label>
              Role / company
              <input
                type="text"
                value={form.authorRole}
                onChange={(ev) => setForm({ ...form, authorRole: ev.target.value })}
                placeholder="e.g. Purchasing Manager, ABC Hotels"
              />
            </label>
          </div>

          <div className={styles.row}>
            <label>
              Country
              <input
                type="text"
                value={form.country}
                onChange={(ev) => setForm({ ...form, country: ev.target.value })}
                placeholder="e.g. United States"
              />
            </label>

            <label>
              Rating (1–5)
              <input
                type="number"
                min="1"
                max="5"
                value={form.rating}
                onChange={(ev) => setForm({ ...form, rating: ev.target.value })}
              />
            </label>
          </div>

          <label>
            Quote <span aria-hidden="true">*</span>
            <textarea
              rows={5}
              value={form.quote}
              onChange={(ev) => setForm({ ...form, quote: ev.target.value })}
              placeholder="What did they say about working with you?"
              required
            />
          </label>

          <label>
            Display order
            <input
              type="number"
              value={form.order}
              onChange={(ev) => setForm({ ...form, order: ev.target.value })}
              placeholder="0"
            />
          </label>
          <p className={styles.hint}>Lower numbers show first. Leave as 0 if it doesn't matter.</p>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={form.published}
              onChange={(ev) => setForm({ ...form, published: ev.target.checked })}
            />
            Published (visible on the live site)
          </label>

          <div className={styles.formActions}>
            <button type="submit" className={styles.primaryBtn} disabled={saving}>
              {saving ? 'Saving…' : editingId ? 'Save changes' : 'Publish testimonial'}
            </button>
            <button type="button" className={styles.ghostBtn} onClick={closeForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <section className={styles.panel}>
        {testimonials === null && !error && <p className={styles.muted}>Loading…</p>}
        {testimonials && testimonials.length === 0 && (
          <p className={styles.muted}>No testimonials yet — add your first one above.</p>
        )}
        {testimonials && testimonials.length > 0 && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Author</th>
                  <th>Quote</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <div className={styles.author}>{t.authorName}</div>
                      {t.authorRole && <div className={styles.role}>{t.authorRole}</div>}
                      {t.country && <div className={styles.role}>{t.country}</div>}
                    </td>
                    <td className={styles.quote}>“{t.quote}”</td>
                    <td>
                      <span className={t.published ? styles.badgePublished : styles.badgeDraft}>
                        {t.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className={styles.actions}>
                      <button type="button" className={styles.linkBtn} onClick={() => openEditForm(t)}>
                        Edit
                      </button>
                      <button type="button" className={styles.linkBtn} onClick={() => togglePublished(t)}>
                        {t.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button type="button" className={styles.linkBtnDanger} onClick={() => handleDelete(t)}>
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
