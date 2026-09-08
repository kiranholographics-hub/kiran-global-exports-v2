import { useEffect, useRef } from 'react';
import styles from './AIChat.module.css';

export default function ChatInput({ value, onChange, onSend, disabled, inputRef }) {
  const localRef = useRef(null);
  const ref = inputRef || localRef;

  // Auto-grow the textarea up to a small cap, then scroll internally.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
  }, [value, ref]);

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSend();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        ref={ref}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about towels, rugs, MOQ..."
        aria-label="Message Kiran AI assistant"
        rows={1}
        maxLength={1500}
        disabled={disabled}
      />
      <button
        type="submit"
        className={styles.sendBtn}
        disabled={!value.trim() || disabled}
        aria-label="Send message"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 8L14 2L9.5 14L7.5 9L2 8Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        </svg>
      </button>
    </form>
  );
}
