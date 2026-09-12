import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styles from './NotFoundContent.module.css';

/* ── Variants ──────────────────────────────────── */
const containerVariants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.10, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ═══════════════════════════════════════════════ */
export default function NotFoundContent({ title, copy }) {
  const { t } = useTranslation();

  const QUICK_LINKS = [
    { labelKey: 'notFound.quickLinks.towels', href: '/towels' },
    { labelKey: 'notFound.quickLinks.linen', href: '/linen' },
    { labelKey: 'notFound.quickLinks.collections', href: '/collections' },
    { labelKey: 'notFound.quickLinks.custom', href: '/custom' },
    { labelKey: 'notFound.quickLinks.about', href: '/about' },
  ];

  return (
    <div className={styles.wrap}>
      <motion.div
        className={styles.inner}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* 404 code */}
        <motion.p
          className={styles.code}
          variants={itemVariants}
          aria-hidden="true"
        >
          404
        </motion.p>

        {/* Eyebrow */}
        <motion.p
          className={styles.eyebrow}
          variants={itemVariants}
        >
          {t('notFound.eyebrow')}
        </motion.p>

        {/* Title */}
        <motion.h1
          className={styles.title}
          variants={itemVariants}
        >
          {title || t('notFound.title')}
        </motion.h1>

        {/* Divider */}
        <motion.div
          className={styles.divider}
          variants={itemVariants}
          aria-hidden="true"
        />

        {/* Copy */}
        <motion.p
          className={styles.copy}
          variants={itemVariants}
        >
          {copy || t('notFound.copy')}
        </motion.p>

        {/* Actions */}
        <motion.div
          className={styles.actions}
          variants={itemVariants}
        >
          <Link to="/" className={styles.primary}>
            <span>{t('notFound.returnHome')}</span>
          </Link>
          <Link to="/collections" className={styles.secondary}>
            {t('notFound.browseCollections')}
          </Link>
        </motion.div>

        {/* Quick links */}
        <motion.nav
          className={styles.quickLinks}
          variants={itemVariants}
          aria-label="Quick navigation"
        >
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={styles.quickLink}
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </motion.nav>

      </motion.div>
    </div>
  );
}
