import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { waLink, mailtoLink, telLink } from '@/data/config';
import styles from './FloatingInquire.module.css';

/* ── Panel Links Config ────────────────────────── */
const PANEL_LINKS = [
  {
    id:        'inquiry',
    labelKey:  'floatingInquire.sendInquiry',
    href:      '/contact',
    type:      'internal',
    className: styles.panelLinkPrimary,
    arrow:     '→',
  },
  {
    id:        'whatsapp',
    labelKey:  'floatingInquire.whatsapp',
    href:      null, // uses waLink()
    type:      'whatsapp',
    className: styles.panelLinkWhatsapp,
    arrow:     '↗',
  },
  {
    id:        'email',
    labelKey:  'floatingInquire.email',
    href:      null, // uses mailtoLink()
    type:      'email',
    arrow:     '↗',
  },
  {
    id:        'call',
    labelKey:  'floatingInquire.call',
    href:      null, // uses telLink()
    type:      'tel',
    arrow:     '↗',
  },
];

/* ── Panel animation variants ──────────────────── */
const panelVariants = {
  hidden: {
    opacity:  0,
    y:        12,
    scale:    0.96,
    transition: { duration: 0.20 },
  },
  visible: {
    opacity: 1,
    y:       0,
    scale:   1,
    transition: {
      duration:      0.30,
      ease:          [0.16, 1, 0.3, 1],
      staggerChildren: 0.04,
      delayChildren:   0.05,
    },
  },
  exit: {
    opacity: 0,
    y:       10,
    scale:   0.97,
    transition: { duration: 0.18 },
  },
};

const linkVariants = {
  hidden:  { opacity: 0, x: 8 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
  },
};

/* ── Helper — resolve href ─────────────────────── */
function resolveHref(link) {
  if (link.type === 'whatsapp') return waLink();
  if (link.type === 'email')    return mailtoLink();
  if (link.type === 'tel')      return telLink();
  return link.href;
}

/* ═══════════════════════════════════════════════ */
export default function FloatingInquire() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  /* Close on Escape key */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  /* Close on scroll — UX best practice */
  useEffect(() => {
    if (!open) return;
    const handler = () => setOpen(false);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [open]);

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.backdrop}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className={styles.wrap}>

        {/* ── Panel ───────────────────────────── */}
        <AnimatePresence>
          {open && (
            <motion.div
              className={styles.panel}
              role="menu"
              aria-label={t('floatingInquire.getInTouch')}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >

              {/* Panel header */}
              <div className={styles.panelHeader}>
                {t('floatingInquire.getInTouch')}
              </div>

              {/* Links */}
              {PANEL_LINKS.map((link) => {
                const href      = resolveHref(link);
                const isExternal = ['whatsapp', 'email', 'tel'].includes(link.type);
                const className  = `${styles.panelLink} ${link.className || ''}`.trim();

                return (
                  <motion.div
                    key={link.id}
                    variants={linkVariants}
                    role="none"
                  >
                    {link.type === 'internal' ? (
                      <Link
                        to={href}
                        className={className}
                        role="menuitem"
                        onClick={() => setOpen(false)}
                      >
                        <span className={styles.panelLinkText}>
                          {t(link.labelKey)}
                        </span>
                        <span
                          className={styles.panelLinkArrow}
                          aria-hidden="true"
                        >
                          {link.arrow}
                        </span>
                      </Link>
                    ) : (
                      <a
                        href={href}
                        className={className}
                        role="menuitem"
                        target={link.type === 'whatsapp' ? '_blank' : undefined}
                        rel={link.type === 'whatsapp' ? 'noopener noreferrer' : undefined}
                        onClick={() => setOpen(false)}
                      >
                        <span className={styles.panelLinkText}>
                          {t(link.labelKey)}
                        </span>
                        <span
                          className={styles.panelLinkArrow}
                          aria-hidden="true"
                        >
                          {link.arrow}
                        </span>
                      </a>
                    )}
                  </motion.div>
                );
              })}

              {/* Panel footer */}
              <div className={styles.panelFooter}>
                {t('floatingInquire.responseNote')}
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Trigger Button ──────────────────── */}
        <motion.button
          type="button"
          className={styles.trigger}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="menu"
          aria-label={open ? t('floatingInquire.closeAria') : t('floatingInquire.openAria')}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Pulse dot — only when closed */}
          {!open && (
            <span
              className={styles.triggerDot}
              aria-hidden="true"
            />
          )}

          {/* Label */}
          {open ? t('floatingInquire.closeLabel') : t('floatingInquire.inquireLabel')}

          {/* Close icon when open */}
          {open && (
            <span
              className={styles.triggerClose}
              aria-hidden="true"
            >
              ✕
            </span>
          )}
        </motion.button>

      </div>
    </>
  );
}
