import { useEffect, useRef } from 'react';
import styles from './AIChat.module.css';

export default function ChatHeader({ titleId, menuOpen, onToggleMenu, onClearChat, onClose }) {
  const menuRef = useRef(null);

  // Close the kebab menu on outside click or Escape.
  useEffect(() => {
    if (!menuOpen) return;
    function handlePointer(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onToggleMenu(false);
      }
    }
    function handleKey(event) {
      if (event.key === 'Escape') onToggleMenu(false);
    }
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen, onToggleMenu]);

  return (
    <header className={styles.header}>
      <div className={styles.brandMark} aria-hidden="true">KGE</div>

      <div className={styles.headerText}>
        <strong id={titleId}>Kiran Global Exports</strong>
        <span>
          <i aria-hidden="true" />
          Online
        </span>
      </div>

      <div className={styles.headerActions} ref={menuRef}>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={() => onToggleMenu(!menuOpen)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-label="Chat options"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="3" r="1.4" fill="currentColor" />
            <circle cx="8" cy="8" r="1.4" fill="currentColor" />
            <circle cx="8" cy="13" r="1.4" fill="currentColor" />
          </svg>
        </button>

        {menuOpen && (
          <div className={styles.menu} role="menu">
            <button
              type="button"
              role="menuitem"
              className={styles.menuItem}
              onClick={() => {
                onClearChat();
                onToggleMenu(false);
              }}
            >
              Clear chat
            </button>
          </div>
        )}

        <button
          type="button"
          className={styles.iconBtn}
          onClick={onClose}
          aria-label="Close chat"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}
