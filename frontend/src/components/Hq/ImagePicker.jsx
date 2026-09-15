import { useState, useRef } from 'react';
import { fetchMediaLibrary, uploadMedia, deleteMedia, mediaUrl } from '@/lib/media';
import { ApiError } from '@/lib/api';
import styles from './ImagePicker.module.css';

/**
 * ImagePicker — a URL field plus an upload button and a "choose from
 * library" panel of previously-uploaded images. Kept as a plain text
 * input under the hood so pasting an external URL or an existing
 * /images/... site asset still works exactly as before.
 *
 * Props: value (string), onChange(url), token, placeholder
 */
export default function ImagePicker({ value, onChange, token, placeholder }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [library, setLibrary] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (ev) => {
    const file = ev.target.files?.[0];
    ev.target.value = '';
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const media = await uploadMedia(token, file);
      onChange(mediaUrl(media.id));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not upload this image.');
    } finally {
      setUploading(false);
    }
  };

  const openLibrary = async () => {
    setLibraryOpen((open) => !open);
    if (library !== null) return; // already loaded
    setError('');
    try {
      const items = await fetchMediaLibrary(token);
      setLibrary(items);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load the image library.');
    }
  };

  const pickFromLibrary = (id) => {
    onChange(mediaUrl(id));
    setLibraryOpen(false);
  };

  const removeFromLibrary = async (ev, id) => {
    ev.stopPropagation();
    if (!window.confirm('Delete this image from the library? This can\'t be undone.')) return;
    try {
      await deleteMedia(token, id);
      setLibrary((items) => items.filter((m) => m.id !== id));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not delete this image.');
    }
  };

  return (
    <div className={styles.wrap}>
      {value && (
        <div className={styles.preview}>
          <img src={value} alt="" />
        </div>
      )}

      <input
        type="text"
        value={value}
        onChange={(ev) => onChange(ev.target.value)}
        placeholder={placeholder}
      />

      <div className={styles.actions}>
        <button type="button" className={styles.actionBtn} onClick={() => fileInputRef.current?.click()} disabled={uploading}>
          {uploading ? 'Uploading…' : 'Upload new'}
        </button>
        <button type="button" className={styles.actionBtn} onClick={openLibrary}>
          Choose from library
        </button>
        {value && (
          <button type="button" className={styles.actionBtn} onClick={() => onChange('')}>
            Remove
          </button>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFileChange} />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {libraryOpen && (
        <div className={styles.library}>
          {library === null && <p className={styles.muted}>Loading…</p>}
          {library && library.length === 0 && <p className={styles.muted}>No images uploaded yet.</p>}
          {library && library.length > 0 && (
            <div className={styles.libraryGrid}>
              {library.map((m) => (
                <div key={m.id} className={styles.libraryItem}>
                  <button
                    type="button"
                    className={styles.libraryPick}
                    onClick={() => pickFromLibrary(m.id)}
                    title={m.filename}
                  >
                    <img src={mediaUrl(m.id)} alt={m.filename} loading="lazy" />
                  </button>
                  <button
                    type="button"
                    className={styles.libraryDelete}
                    onClick={(ev) => removeFromLibrary(ev, m.id)}
                    aria-label={`Delete ${m.filename}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
