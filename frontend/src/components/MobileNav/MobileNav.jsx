import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { siteConfig } from '@/data/config';
import styles from './MobileNav.module.css';

/* ── Animation Variants ────────────────────────── */
const overlayVariants = {
  initial: { clipPath: 'inset(0 0 100% 0)' },
  animate: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    clipPath: 'inset(0 0 100% 0)',
    transition: { duration: 0.50, ease: [0.4, 0, 1, 1] },
  },
};

const itemVariants = {
  initial:  { opacity: 0, y: 20 },
  animate:  (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay:    0.18 + i * 0.07,
      duration: 0.55,
      ease:     [0.16, 1, 0.3, 1],
    },
  }),
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const footerVariants = {
  initial:  { opacity: 0, y: 10 },
  animate:  {
    opacity: 1,
    y: 0,
    transition: { delay: 0.55, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/* ═══════════════════════════════════════════════ */
export default function MobileNav({ open, onClose }) {
  const { t } = useTranslation();
  const panelRef = useRef(null);

  /* ── Keyboard + scroll lock ──────────────────── */
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    /* Focus first link */
    const firstLink = panelRef.current?.querySelector('a');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav"
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={t('mobileNav.srLabel')}
          ref={panelRef}
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >

          {/* Film grain texture */}
          <div
            className={styles.grain}
            aria-hidden="true"
          />

          {/* ── Nav Links ─────────────────────── */}
          <nav aria-label={t('mobileNav.primaryAria')}>
            <ul>
              {siteConfig.nav.filter((item) => !item.hideFromHeader).map((item, i) => (
                <motion.li
                  key={item.href}
                  className={styles.navItem}
                  variants={itemVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={i}
                >
                  <Link
                    to={item.href}
                    className={styles.navLink}
                    onClick={onClose}
                  >
                    {/* Index number */}
                    <span
                      className={styles.navNumber}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Label */}
                    <span>{t(item.labelKey)}</span>

                    {/* Arrow */}
                    <span
                      className={styles.navArrow}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* ── Footer ────────────────────────── */}
          <motion.div
            className={styles.footer}
            variants={footerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* CTA Button */}
            <Link
              to={siteConfig.headerCta.href}
              className={styles.ctaLink}
              onClick={onClose}
            >
              <span>{t(siteConfig.headerCta.labelKey)}</span>
            </Link>

            {/* Contact info */}
            <div className={styles.footerInfo}>
              <p>{siteConfig.contact.email}</p>
              <p>{siteConfig.contact.phone}</p>
              <p
                className={styles.footerOrigin}
                aria-hidden="true"
              >
                {t('common.madeInIndiaShort')}
              </p>
            </div>

          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}