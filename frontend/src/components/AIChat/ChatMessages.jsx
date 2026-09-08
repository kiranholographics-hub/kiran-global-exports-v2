import { motion } from 'framer-motion';
import styles from './AIChat.module.css';

const bubbleVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } },
};

function formatTime(timestamp) {
  try {
    return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(
      new Date(timestamp)
    );
  } catch {
    return '';
  }
}

export default function ChatMessages({ messages, loading, error, onRetry, messagesEndRef, listRef }) {
  return (
    <div className={styles.messages} aria-live="polite" ref={listRef}>
      {messages.map((item, index) => (
        <motion.div
          key={item.id ?? index}
          className={`${styles.messageRow} ${item.role === 'user' ? styles.rowUser : styles.rowAssistant}`}
          variants={bubbleVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={`${styles.message} ${item.role === 'user' ? styles.user : styles.assistant}`}>
            {item.content}
          </div>
          {item.timestamp && (
            <span className={styles.timestamp}>{formatTime(item.timestamp)}</span>
          )}
        </motion.div>
      ))}

      {loading && (
        <motion.div
          className={`${styles.messageRow} ${styles.rowAssistant}`}
          variants={bubbleVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={`${styles.message} ${styles.assistant} ${styles.typing}`} aria-label="AI assistant is typing">
            <span /><span /><span />
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          className={`${styles.messageRow} ${styles.rowAssistant}`}
          variants={bubbleVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={`${styles.message} ${styles.assistant} ${styles.errorBubble}`} role="alert">
            {error}
            <button type="button" className={styles.retryBtn} onClick={onRetry}>
              Try again
            </button>
          </div>
        </motion.div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
