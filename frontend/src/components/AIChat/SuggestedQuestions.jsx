import { motion } from 'framer-motion';
import styles from './AIChat.module.css';

const chipVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function SuggestedQuestions({ questions, onSelect, disabled }) {
  if (!questions.length) return null;

  return (
    <div className={styles.quickQuestions} role="group" aria-label="Suggested questions">
      {questions.map((question, index) => (
        <motion.button
          key={question}
          type="button"
          custom={index}
          variants={chipVariants}
          initial="hidden"
          animate="visible"
          onClick={() => onSelect(question)}
          disabled={disabled}
        >
          {question}
        </motion.button>
      ))}
    </div>
  );
}
