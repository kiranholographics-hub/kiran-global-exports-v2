import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import HqShell from '@/components/Hq/HqShell';
import { fetchAllTeam, createTeamMember, editTeamMember, deleteTeamMember } from '@/lib/team';
import { ApiError } from '@/lib/api';
import styles from './HqTeam.module.css';

const EMPTY_FORM = { name: '', role: '', bio: '', photo: '', order: '0', published: true };

export default function HqTeam() {
  const { token } = useAuth();
  const [members, setMembers] = useState(null);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await fetchAllTeam(token);
      setMembers(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load team members.');
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

  const openEditForm = (m) => {
    setEditingId(m.id);
    setForm({
      name: m.name,
      role: m.role || '',
      bio: m.bio || '',
      photo: m.photo || '',
      order: String(m.order ?? 0),
      published: m.published,
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
        await editTeamMember(token, editingId, form);
      } else {
        await createTeamMember(token, form);
      }
      closeForm();
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not save this team member.');
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (m) => {
    setError('');
    try {
      await editTeamMember(token, m.id, { published: !m.published });
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not update this team member.');
    }
  };

  const handleDelete = async (m) => {
    if (!window.confirm(`Remove "${m.name}" from the team page? This can't be undone.`)) return;
    setError('');
    try {
      await deleteTeamMember(token, m.id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not delete this team member.');
    }
  };

  return (
    <HqShell title="Team">
      <div className={styles.header}>
        <p className={styles.muted}>
          Published team members show on the <code>/about</code> page — a real team helps Google
          (and buyers) trust the company.
        </p>
        {!formOpen && (
          <button type="button" className={styles.primaryBtn} onClick={openNewForm}>
            + New team member
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
          <h2 className={styles.formTitle}>{editingId ? 'Edit team member' : 'New team member'}</h2>

          <div className={styles.row}>
            <label>
              Name <span aria-hidden="true">*</span>
              <input
                type="text"
                value={form.name}
                onChange={(ev) => setForm({ ...form, name: ev.target.value })}
                placeholder="e.g. Rohan Mundada"
                required
              />
            </label>

            <label>
              Role
              <input
                type="text"
                value={form.role}
                onChange={(ev) => setForm({ ...form, role: ev.target.value })}
                placeholder="e.g. Export Manager"
              />
            </label>
          </div>

          <label>
            Short bio
            <textarea
              rows={4}
              value={form.bio}
              onChange={(ev) => setForm({ ...form, bio: ev.target.value })}
              placeholder="A couple of lines about their role or experience"
            />
          </label>

          <div className={styles.row}>
            <label>
              Photo URL
              <input
                type="text"
                value={form.photo}
                onChange={(ev) => setForm({ ...form, photo: ev.target.value })}
                placeholder="/images/team/example.webp (optional)"
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
          </div>
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
              {saving ? 'Saving…' : editingId ? 'Save changes' : 'Add team member'}
            </button>
            <button type="button" className={styles.ghostBtn} onClick={closeForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <section className={styles.panel}>
        {members === null && !error && <p className={styles.muted}>Loading…</p>}
        {members && members.length === 0 && (
          <p className={styles.muted}>No team members yet — add your first one above.</p>
        )}
        {members && members.length > 0 && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.id}>
                    <td className={styles.name}>{m.name}</td>
                    <td>{m.role || <span className={styles.muted}>—</span>}</td>
                    <td>
                      <span className={m.published ? styles.badgePublished : styles.badgeDraft}>
                        {m.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className={styles.actions}>
                      <button type="button" className={styles.linkBtn} onClick={() => openEditForm(m)}>
                        Edit
                      </button>
                      <button type="button" className={styles.linkBtn} onClick={() => togglePublished(m)}>
                        {m.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button type="button" className={styles.linkBtnDanger} onClick={() => handleDelete(m)}>
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
