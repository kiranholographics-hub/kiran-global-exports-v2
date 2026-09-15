import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import HqShell from '@/components/Hq/HqShell';
import { fetchAllPages, createPage, editPage, deletePage } from '@/lib/pages';
import { ApiError } from '@/lib/api';
import styles from './HqPages.module.css';

const EMPTY_FORM = { title: '', metaDescription: '', body: '', published: true };

export default function HqPages() {
  const { token } = useAuth();
  const [pages, setPages] = useState(null);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingSlug, setEditingSlug] = useState('');
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await fetchAllPages(token);
      setPages(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load pages.');
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const openNewForm = () => {
    setEditingId(null);
    setEditingSlug('');
    setForm(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEditForm = (page) => {
    setEditingId(page.id);
    setEditingSlug(page.slug);
    setForm({
      title: page.title,
      metaDescription: page.metaDescription || '',
      body: page.body,
      published: page.published,
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setEditingSlug('');
    setForm(EMPTY_FORM);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError('');
    setSaving(true);
    try {
      if (editingId) {
        await editPage(token, editingId, form);
      } else {
        await createPage(token, form);
      }
      closeForm();
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not save this page.');
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (page) => {
    setError('');
    try {
      await editPage(token, page.id, { published: !page.published });
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not update this page.');
    }
  };

  const handleDelete = async (page) => {
    if (!window.confirm(`Delete "${page.title}"? This can't be undone.`)) return;
    setError('');
    try {
      await deletePage(token, page.id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not delete this page.');
    }
  };

  return (
    <HqShell title="Pages">
      <div className={styles.header}>
        <p className={styles.muted}>
          Each page goes live at <code>/pages/&lt;slug&gt;</code> — use these to target extra
          search terms (e.g. a specific product or country) without needing new code.
        </p>
        {!formOpen && (
          <button type="button" className={styles.primaryBtn} onClick={openNewForm}>
            + New page
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
          <h2 className={styles.formTitle}>{editingId ? 'Edit page' : 'New page'}</h2>
          {editingId && (
            <p className={styles.muted}>
              Live at <code>/pages/{editingSlug}</code> (changing the title also changes the link)
            </p>
          )}

          <label>
            Title <span aria-hidden="true">*</span>
            <input
              type="text"
              value={form.title}
              onChange={(ev) => setForm({ ...form, title: ev.target.value })}
              placeholder="e.g. Cotton Towel Exporter for Canada"
              required
            />
          </label>

          <label>
            Meta description
            <input
              type="text"
              value={form.metaDescription}
              onChange={(ev) => setForm({ ...form, metaDescription: ev.target.value })}
              placeholder="One or two lines shown in Google search results"
            />
          </label>

          <label>
            Body <span aria-hidden="true">*</span>
            <textarea
              rows={10}
              value={form.body}
              onChange={(ev) => setForm({ ...form, body: ev.target.value })}
              placeholder="Write the full page content here. Leave a blank line between paragraphs."
              required
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
              {saving ? 'Saving…' : editingId ? 'Save changes' : 'Publish page'}
            </button>
            <button type="button" className={styles.ghostBtn} onClick={closeForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <section className={styles.panel}>
        {pages === null && !error && <p className={styles.muted}>Loading…</p>}
        {pages && pages.length === 0 && (
          <p className={styles.muted}>No pages yet — create your first one above.</p>
        )}
        {pages && pages.length > 0 && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>URL</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((p) => (
                  <tr key={p.id}>
                    <td className={styles.title}>{p.title}</td>
                    <td className={styles.nowrap}>
                      <a href={`/pages/${p.slug}`} target="_blank" rel="noopener noreferrer" className={styles.urlLink}>
                        /pages/{p.slug}
                      </a>
                    </td>
                    <td>
                      <span className={p.published ? styles.badgePublished : styles.badgeDraft}>
                        {p.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className={styles.actions}>
                      <button type="button" className={styles.linkBtn} onClick={() => openEditForm(p)}>
                        Edit
                      </button>
                      <button type="button" className={styles.linkBtn} onClick={() => togglePublished(p)}>
                        {p.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button type="button" className={styles.linkBtnDanger} onClick={() => handleDelete(p)}>
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
