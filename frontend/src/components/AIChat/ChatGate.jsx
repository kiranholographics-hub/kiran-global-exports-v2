import { useState } from 'react';
import { motion } from 'framer-motion';
import { isValidEmail } from './chatLead';
import styles from './AIChat.module.css';

const fadeVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

export default function ChatGate({ stage, lead, onSubmit, onRetry, submitting }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!name.trim()) nextErrors.name = 'Please enter your name.';
    if (!email.trim()) nextErrors.email = 'Please enter your email.';
    else if (!isValidEmail(email)) nextErrors.email = 'Please enter a valid email.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    onSubmit({ name: name.trim(), email: email.trim(), question: question.trim() });
  }

  if (stage === 'pending') {
    return (
      <motion.div className={styles.gateStatus} variants={fadeVariants} initial="hidden" animate="visible">
        <div className={styles.gateSpinner} aria-hidden="true">
          <span /><span /><span />
        </div>
        <h3>Thanks{lead?.name ? `, ${lead.name}` : ''}!</h3>
        <p>
          We&apos;ve sent your details to our team{lead?.question ? ' along with your question' : ''}.
          You&apos;ll be able to chat here as soon as it&apos;s approved — usually quick.
        </p>
        <p className={styles.gateNote}>We&apos;ll also follow up by email if we don&apos;t hear back from you here.</p>
      </motion.div>
    );
  }

  if (stage === 'declined') {
    return (
      <motion.div className={styles.gateStatus} variants={fadeVariants} initial="hidden" animate="visible">
        <h3>We couldn&apos;t start this chat right now</h3>
        <p>Please reach out through our contact page and our export team will get back to you directly.</p>
        <button type="button" className={styles.gateRetryBtn} onClick={onRetry}>
          Try again
        </button>
      </motion.div>
    );
  }

  if (stage === 'error') {
    return (
      <motion.div className={styles.gateStatus} variants={fadeVariants} initial="hidden" animate="visible">
        <h3>Couldn&apos;t reach our server</h3>
        <p>Please check your connection and try again, or use our contact page instead.</p>
        <button type="button" className={styles.gateRetryBtn} onClick={onRetry}>
          Try again
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form className={styles.gateForm} onSubmit={handleSubmit} variants={fadeVariants} initial="hidden" animate="visible">
      <p className={styles.gateIntro}>
        Please share a few details before we start — this goes straight to our team.
      </p>

      <label className={styles.gateLabel} htmlFor="ai-chat-name">
        Name <span aria-hidden="true">*</span>
      </label>
      <input
        id="ai-chat-name"
        className={styles.gateInput}
        value={name}
        onChange={(event) => setName(event.target.value)}
        aria-required="true"
        aria-invalid={Boolean(errors.name)}
        disabled={submitting}
      />
      {errors.name && <span className={styles.gateError}>{errors.name}</span>}

      <label className={styles.gateLabel} htmlFor="ai-chat-email">
        E-mail <span aria-hidden="true">*</span>
      </label>
      <input
        id="ai-chat-email"
        type="email"
        className={styles.gateInput}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        aria-required="true"
        aria-invalid={Boolean(errors.email)}
        disabled={submitting}
      />
      {errors.email && <span className={styles.gateError}>{errors.email}</span>}

      <label className={styles.gateLabel} htmlFor="ai-chat-question">
        Question
      </label>
      <textarea
        id="ai-chat-question"
        className={styles.gateTextarea}
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        rows={3}
        placeholder="What would you like to know?"
        disabled={submitting}
      />

      <button type="submit" className={styles.gateSubmitBtn} disabled={submitting}>
        {submitting ? 'Sending...' : 'Start the chat'}
      </button>
    </motion.form>
  );
}
