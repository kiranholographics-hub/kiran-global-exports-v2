import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styles from './Loader.module.css';

/* ── Config ────────────────────────────────────── */
const SESSION_KEY  = 'kge-loaded';
const LOADER_DELAY = 1100; // ms

/* ── Exit transition ───────────────────────────── */
const exitTransition = {
  duration: 0.65,
  ease: [0.16, 1, 0.3, 1],
};

/* ═══════════════════════════════════════════════ */
/**
 * Minimal brand loader shown ONCE per session.
 * Skipped on repeat visits & prefers-reduced-motion.
 */
export default function Loader() {
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  // Separate from `visible` — guarantees the loader (including its
  // "Loading" text) leaves the DOM even if the exit animation never runs
  // (e.g. requestAnimationFrame is paused because the tab is backgrounded).
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const alreadyLoaded = sessionStorage.getItem(SESSION_KEY);
    const delay = alreadyLoaded || prefersReduced ? 0 : LOADER_DELAY;

    const showTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SESSION_KEY, '1');
    }, delay);

    const unmountTimer = setTimeout(() => {
      setMounted(false);
    }, delay + exitTransition.duration * 1000 + 250);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(unmountTimer);
    };
  }, [prefersReduced]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.loader}
          exit={{
            opacity: 0,
            transition: exitTransition,
          }}
          aria-label={t('loader.ariaLabel')}
          aria-live="polite"
          role="status"
        >

          {/* ── Inner Content ───────────────────── */}
          <div className={styles.inner}>

            {/* Logo Box + Brand Mark */}
            <div className={styles.logoWrap}>

              {/* Letter mark box */}
              <motion.div
                className={styles.logoBox}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.70,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                KGE
              </motion.div>

              {/* Brand name */}
              <motion.span
                className={styles.mark}
                initial={{ opacity: 0, letterSpacing: '0.45em' }}
                animate={{ opacity: 1, letterSpacing: '0.18em' }}
                transition={{
                  duration: 0.85,
                  delay: 0.10,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Kiran Global Exports
              </motion.span>

              {/* Tagline */}
              <motion.span
                className={styles.tagline}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.70,
                  delay: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {t('loader.tagline')}
              </motion.span>

            </div>

            {/* Progress Bar */}
            <motion.div
              className={styles.barWrap}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className={styles.barTrack}>
                <motion.span
                  className={styles.bar}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.80,
                    delay: 0.20,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </div>

              {/* Loading label */}
              <motion.span
                className={styles.barLabel}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {t('loader.loading')}
              </motion.span>

            </motion.div>

          </div>

          {/* ── Bottom Origin Tag ──────────────── */}
          <motion.p
            className={styles.origin}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            aria-hidden="true"
          >
            {t('common.madeInIndiaShort')}
          </motion.p>

        </motion.div>
      )}
    </AnimatePresence>
  );
}