import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import HqShell from '@/components/Hq/HqShell';
import ImagePicker from '@/components/Hq/ImagePicker';
import { fetchAllUpdates, createUpdate, editUpdate, deleteUpdate, suggestUpdateSeo } from '@/lib/updates';
import { fetchMarkets } from '@/lib/markets';
import { ApiError } from '@/lib/api';
import styles from './HqUpdates.module.css';

const EMPTY_FORM = { title: '', excerpt: '', body: '', coverImage: '', published: true, markets: [], publishedAt: '' };

// <input type="datetime-local"> wants "YYYY-MM-DDTHH:mm" in the viewer's own
// time zone; the API stores an exact instant.
function toLocalInput(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const isScheduled = (u) => u.published && new Date(u.publishedAt) > new Date();

export default function HqUpdates() {
  const { token } = useAuth();
  const [updates, setUpdates] = useState(null);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [suggesting, setSuggesting] = useState(false);
  const [markets, setMarkets] = useState([]);
  // 'all' = every country page; 'selected' = only the ticked ones.
  const [audience, setAudience] = useState('all');
  // The date the form opened with, so an edit that never touches the date
  // field does not rewrite it (the input has no seconds).
  const [originalPublishedAt, setOriginalPublishedAt] = useState('');

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

  // The country pages that exist, for the "Show on" picker. A failure here
  // only means the picker is empty; posting to all countries still works.
  useEffect(() => {
    fetchMarkets(token)
      .then((list) => setMarkets(list.filter((m) => m.status !== 'archived')))
      .catch(() => setMarkets([]));
  }, [token]);

  const marketName = (slug) => markets.find((m) => m.slug === slug)?.countryName || slug;

  const openNewForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setAudience('all');
    setOriginalPublishedAt('');
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
      markets: update.markets || [],
      publishedAt: toLocalInput(update.publishedAt),
    });
    setOriginalPublishedAt(toLocalInput(update.publishedAt));
    setAudience(update.markets?.length ? 'selected' : 'all');
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const toggleMarket = (slug) =>
    setForm((f) => ({
      ...f,
      markets: f.markets.includes(slug) ? f.markets.filter((s) => s !== slug) : [...f.markets, slug],
    }));

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError('');
    if (audience === 'selected' && form.markets.length === 0) {
      setError('Tick at least one country, or choose All countries.');
      return;
    }
    setSaving(true);
    try {
      const payload = { ...form, markets: audience === 'all' ? [] : form.markets };
      if (form.publishedAt && form.publishedAt !== originalPublishedAt) {
        payload.publishedAt = new Date(form.publishedAt).toISOString();
      } else {
        delete payload.publishedAt;
      }
      const saved = editingId
        ? await editUpdate(token, editingId, payload)
        : await createUpdate(token, payload);
      // An API that has not been updated yet saves the post but ignores the
      // country choice and sends back no `markets` at all — say so rather
      // than let it look as though the choice was kept.
      if (!Array.isArray(saved?.markets)) {
        setError(
          'Saved — but the server is on an older version and ignored the country choice, so this post shows on every country page. Update the API, then edit this post again.'
        );
        setSaving(false);
        setFormOpen(false);
        setEditingId(null);
        await load();
        return;
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

  const handleSuggestSeo = async () => {
    setError('');
    setSuggesting(true);
    try {
      const suggestion = await suggestUpdateSeo(token, { title: form.title, body: form.body });
      setForm((f) => ({
        ...f,
        title: suggestion.title || f.title,
        excerpt: suggestion.excerpt || f.excerpt,
      }));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not generate suggestions right now.');
    } finally {
      setSuggesting(false);
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

          <div>
            <button
              type="button"
              className={styles.ghostBtn}
              onClick={handleSuggestSeo}
              disabled={suggesting || !form.body.trim()}
            >
              {suggesting ? 'Thinking…' : '✨ Suggest SEO title & excerpt'}
            </button>
            <p className={styles.hint}>
              Uses AI to suggest a search-friendly title and excerpt from what you've written
              above — write the body first, then tweak the suggestion if needed.
            </p>
          </div>

          <label>
            Cover image (optional)
            <ImagePicker
              value={form.coverImage}
              onChange={(url) => setForm({ ...form, coverImage: url })}
              token={token}
              placeholder="Paste an image URL, or upload/choose below"
            />
          </label>

          <fieldset className={styles.audience}>
            <legend>Show on country pages</legend>
            <label className={styles.checkboxLabel}>
              <input
                type="radio"
                name="audience"
                checked={audience === 'all'}
                onChange={() => setAudience('all')}
              />
              All countries
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="radio"
                name="audience"
                checked={audience === 'selected'}
                onChange={() => setAudience('selected')}
              />
              Only the countries I tick
            </label>
            {audience === 'selected' && (
              <div className={styles.marketGrid}>
                {markets.length === 0 && <p className={styles.hint}>No country pages found.</p>}
                {markets.map((m) => (
                  <label key={m.slug} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={form.markets.includes(m.slug)}
                      onChange={() => toggleMarket(m.slug)}
                    />
                    {m.countryName}
                    {m.status !== 'active' && <span className={styles.hint}> ({m.status})</span>}
                  </label>
                ))}
              </div>
            )}
            <p className={styles.hint}>
              The post always stays at /updates. This only chooses which country pages (for example
              /usa) show it as a latest update.
            </p>
          </fieldset>

          <label>
            Publish date &amp; time
            <input
              type="datetime-local"
              value={form.publishedAt}
              onChange={(ev) => setForm({ ...form, publishedAt: ev.target.value })}
            />
            <span className={styles.hint}>
              Leave empty to publish now. Pick a future time to schedule it: the post stays hidden
              until then, then appears on its own. Search engines see it after the next site deploy.
            </span>
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
              {saving
                ? 'Saving…'
                : editingId
                  ? 'Save changes'
                  : form.publishedAt && new Date(form.publishedAt) > new Date()
                    ? 'Schedule update'
                    : 'Publish update'}
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
                  <th>Shown on</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {updates.map((u) => (
                  <tr key={u.id}>
                    <td className={styles.nowrap}>
                      {new Date(u.publishedAt).toLocaleDateString()}
                      {isScheduled(u) && (
                        <div className={styles.excerpt}>
                          {new Date(u.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      )}
                    </td>
                    <td>
                      <div className={styles.title}>{u.title}</div>
                      {u.excerpt && <div className={styles.excerpt}>{u.excerpt}</div>}
                    </td>
                    <td className={styles.excerpt}>
                      {u.markets?.length ? u.markets.map(marketName).join(', ') : 'All countries'}
                    </td>
                    <td>
                      <span
                        className={
                          isScheduled(u)
                            ? styles.badgeScheduled
                            : u.published
                              ? styles.badgePublished
                              : styles.badgeDraft
                        }
                      >
                        {isScheduled(u) ? 'Scheduled' : u.published ? 'Published' : 'Draft'}
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
