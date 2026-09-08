import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '@/i18n';
import styles from './LanguageSwitcher.module.css';

const panelVariants = {
  hidden: { opacity: 0, y: -6, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.15 } },
};

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const current = SUPPORTED_LANGUAGES.find((l) => l.code === i18n.language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    if (!open) return undefined;
    function handlePointer(event) {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) setOpen(false);
    }
    function handleKey(event) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  function selectLanguage(code) {
    i18n.changeLanguage(code);
    setOpen(false);
  }

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('header.languageAria')}
      >
        <span>{current.shortLabel}</span>
        <svg
          className={styles.chevron}
          data-open={open}
          width="9"
          height="6"
          viewBox="0 0 9 6"
          fill="none"
          aria-hidden="true"
        >
          <path d="M1 1L4.5 4.5L8 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            className={styles.panel}
            role="listbox"
            aria-label={t('header.languageAria')}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <li key={lang.code} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={lang.code === current.code}
                  className={styles.option}
                  data-active={lang.code === current.code}
                  onClick={() => selectLanguage(lang.code)}
                >
                  <span className={styles.optionNative}>{lang.nativeLabel}</span>
                  <span className={styles.optionCode}>{lang.shortLabel}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
