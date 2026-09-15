import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import HqShell from '@/components/Hq/HqShell';
import { fetchAllUpdates, createUpdate, editUpdate, deleteUpdate } from '@/lib/updates';
import { ApiError } from '@/lib/api';
import styles from './HqUpdates.module.css';

const EMPTY_FORM = { title: '', excerpt: '', body: '', coverImage: '', published: true };

export default function HqUpdates() {
  const { token } = useAuth();
  const [updates, setUpdates] = useState(null);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await fetchAllUpdates(token);
      setUpdates(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load updates.');
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

  const openEditForm = (update) => {
    setEditingId(update.id);
    setForm({
      title: update.title,
      excerpt: update.excerpt || '',
      body: update.body,
      coverImage: update.coverImage || '',
      published: update.published,
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
        await editUpdate(token, editingId, form);
      } else {
        await createUpdate(token, form);
      }
      closeForm();
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not save this update.');
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (update) => {
    setError('');
    try {
      await editUpdate(token, update.id, { published: !update.published });
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not update this post.');
    }
  };

  const handleDelete = async (update) => {
    if (!window.confirm(`Delete "${update.title}"? This can't be undone.`)) return;
    setError('');
    try {
      await deleteUpdate(token, update.id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not delete this update.');
    }
  };

  return (
    <HqShell title="Updates">
      <div className={styles.header}>
        <p className={styles.muted}>
          Posts show on your site at <code>/updates</code> — fresh, dated content Google likes to see.
        </p>
        {!formOpen && (
          <button type="button" className={styles.primaryBtn} onClick={openNewForm}>
            + New update
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
          <h2 className={styles.formTitle}>{editingId ? 'Edit update' : 'New update'}</h2>

          <label>
            Title <span aria-hidden="true">*</span>
            <input
              type="text"
              value={form.title}
              onChange={(ev) => setForm({ ...form, title: ev.target.value })}
              placeholder="e.g. Now shipping our new Kitchen Linen range"
              required
            />
          </label>

          <label>
            Short excerpt
            <input
              type="text"
              value={form.excerpt}
              onChange={(ev) => setForm({ ...form, excerpt: ev.target.value })}
              placeholder="One line shown in the updates list"
            />
          </label>

          <label>
            Body <span aria-hidden="true">*</span>
            <textarea
              rows={8}
              value={form.body}
              onChange={(ev) => setForm({ ...form, body: ev.target.value })}
              placeholder="Write the full update here. Leave a blank line between paragraphs."
              required
            />
          </label>

          <label>
            Cover image URL
            <input
              type="text"
              value={form.coverImage}
              onChange={(ev) => setForm({ ...form, coverImage: ev.target.value })}
              placeholder="/images/updates/example.webp (optional)"
            />
          </label>

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
              {saving ? 'Saving…' : editingId ? 'Save changes' : 'Publish update'}
            </button>
            <button type="button" className={styles.ghostBtn} onClick={closeForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <section className={styles.panel}>
        {updates === null && !error && <p className={styles.muted}>Loading…</p>}
        {updates && updates.length === 0 && (
          <p className={styles.muted}>No updates yet — post your first one above.</p>
        )}
        {updates && updates.length > 0 && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {updates.map((u) => (
                  <tr key={u.id}>
                    <td className={styles.nowrap}>{new Date(u.publishedAt).toLocaleDateString()}</td>
                    <td>
                      <div className={styles.title}>{u.title}</div>
                      {u.excerpt && <div className={styles.excerpt}>{u.excerpt}</div>}
                    </td>
                    <td>
                      <span className={u.published ? styles.badgePublished : styles.badgeDraft}>
                        {u.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className={styles.actions}>
                      <button type="button" className={styles.linkBtn} onClick={() => openEditForm(u)}>
                        Edit
                      </button>
                      <button type="button" className={styles.linkBtn} onClick={() => togglePublished(u)}>
                        {u.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button type="button" className={styles.linkBtnDanger} onClick={() => handleDelete(u)}>
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
