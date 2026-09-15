import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import HqShell from '@/components/Hq/HqShell';
import ImagePicker from '@/components/Hq/ImagePicker';
import {
  fetchAllCertifications,
  createCertification,
  editCertification,
  deleteCertification,
} from '@/lib/certifications';
import { ApiError } from '@/lib/api';
import styles from './HqCertifications.module.css';

const EMPTY_FORM = { name: '', image: '', alt: '', text: '', caption: '', order: '0', published: true };

export default function HqCertifications() {
  const { token } = useAuth();
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await fetchAllCertifications(token);
      setItems(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load certifications.');
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

  const openEditForm = (c) => {
    setEditingId(c.id);
    setForm({
      name: c.name,
      image: c.image || '',
      alt: c.alt || '',
      text: c.text || '',
      caption: c.caption || '',
      order: String(c.order ?? 0),
      published: c.published,
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
        await editCertification(token, editingId, form);
      } else {
        await createCertification(token, form);
      }
      closeForm();
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not save this certification.');
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (c) => {
    setError('');
    try {
      await editCertification(token, c.id, { published: !c.published });
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not update this certification.');
    }
  };

  const handleDelete = async (c) => {
    if (!window.confirm(`Delete "${c.name}"? This can't be undone.`)) return;
    setError('');
    try {
      await deleteCertification(token, c.id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not delete this certification.');
    }
  };

  return (
    <HqShell title="Certifications">
      <div className={styles.header}>
        <p className={styles.muted}>
          Shows as the certification strip near the footer on every page. Until you add any here,
          the site keeps showing its existing built-in certifications — nothing changes live until
          you publish something.
        </p>
        {!formOpen && (
          <button type="button" className={styles.primaryBtn} onClick={openNewForm}>
            + New certification
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
          <h2 className={styles.formTitle}>{editingId ? 'Edit certification' : 'New certification'}</h2>

          <label>
            Name <span aria-hidden="true">*</span>
            <input
              type="text"
              value={form.name}
              onChange={(ev) => setForm({ ...form, name: ev.target.value })}
              placeholder="e.g. OEKO-TEX STANDARD 100"
              required
            />
          </label>

          <label>
            Logo image (leave blank for a text-only compliance line)
            <ImagePicker
              value={form.image}
              onChange={(url) => setForm({ ...form, image: url })}
              token={token}
              placeholder="Paste an image URL, or upload/choose below"
            />
          </label>

          <div className={styles.row}>
            <label>
              Image alt text
              <input
                type="text"
                value={form.alt}
                onChange={(ev) => setForm({ ...form, alt: ev.target.value })}
                placeholder="Describes the logo for accessibility — falls back to the name"
              />
            </label>

            <label>
              Text-only line (used when there's no logo)
              <input
                type="text"
                value={form.text}
                onChange={(ev) => setForm({ ...form, text: ev.target.value })}
                placeholder="e.g. REACH & GPSR compliant"
              />
            </label>
          </div>

          <label>
            Caption (optional attribution line)
            <input
              type="text"
              value={form.caption}
              onChange={(ev) => setForm({ ...form, caption: ev.target.value })}
              placeholder="e.g. Held by our manufacturing partner, V P Mundada (Solapur)"
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
              {saving ? 'Saving…' : editingId ? 'Save changes' : 'Add certification'}
            </button>
            <button type="button" className={styles.ghostBtn} onClick={closeForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <section className={styles.panel}>
        {items === null && !error && <p className={styles.muted}>Loading…</p>}
        {items && items.length === 0 && (
          <p className={styles.muted}>
            No certifications added here yet — the site is still showing its existing built-in list.
          </p>
        )}
        {items && items.length > 0 && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((c) => (
                  <tr key={c.id}>
                    <td>
                      {c.image ? (
                        <img src={c.image} alt="" className={styles.thumb} />
                      ) : (
                        <span className={styles.muted}>—</span>
                      )}
                    </td>
                    <td>
                      <div className={styles.name}>{c.name}</div>
                      {c.caption && <div className={styles.caption}>{c.caption}</div>}
                    </td>
                    <td>
                      <span className={c.published ? styles.badgePublished : styles.badgeDraft}>
                        {c.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className={styles.actions}>
                      <button type="button" className={styles.linkBtn} onClick={() => openEditForm(c)}>
                        Edit
                      </button>
                      <button type="button" className={styles.linkBtn} onClick={() => togglePublished(c)}>
                        {c.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button type="button" className={styles.linkBtnDanger} onClick={() => handleDelete(c)}>
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
