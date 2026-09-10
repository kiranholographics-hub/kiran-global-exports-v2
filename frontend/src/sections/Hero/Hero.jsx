import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useTranslation } from 'react-i18next';
import CinematicHeroVideo from '@/components/CinematicHeroVideo/CinematicHeroVideo';
import styles from './Hero.module.css';

/* ── Word reveal variants ──────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.6,
    },
  },
};

const wordVariants = {
  hidden:  { y: '105%' },
  visible: {
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* ═══════════════════════════════════════════════ */
export default function Hero() {
  const { t } = useTranslation();
  const ref           = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  /* Parallax / scale values */
  const scale      = useTransform(scrollYProgress, [0, 1],    [1,    prefersReduced ? 1    : 0.86]);
  const y          = useTransform(scrollYProgress, [0, 1],    ['0%', '14%']);
  const opacity    = useTransform(scrollYProgress, [0, 0.80], [1, 0]);
  const mediaScale = useTransform(scrollYProgress, [0, 1],    [1.08, prefersReduced ? 1.08 : 1.30]);

  const words = t('home.hero.headline').split(' ');

  return (
    <section
      ref={ref}
      className={styles.hero}
      aria-label="Kiran Global Exports introduction"
    >
      <div className={styles.stage}>

        {/* ── Media Layer ──────────────────────── */}
        <motion.div
          className={styles.mediaWrap}
          style={{ scale }}
        >
          <CinematicHeroVideo
            className={styles.media}
            style={{ scale: mediaScale }}
            fallback={<div className={styles.mediaFallback} />}
          />
          <div className={styles.overlay} aria-hidden="true" />
        </motion.div>

        {/* ── Content Layer ────────────────────── */}
        <motion.div
          className={styles.content}
          style={{ y, opacity }}
        >

          {/* Eyebrow */}
          <motion.p
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('home.hero.eyebrow')}
          </motion.p>

          {/* Headline — staggered word reveal */}
          <motion.h1
            className={styles.headline}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {words.map((word, i) => (
              <span key={i} className={styles.wordMask}>
                <motion.span className={styles.word} variants={wordVariants}>
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('home.hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 1.35,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Primary */}
            <Link to="/collections" className={styles.primary}>
              <span>{t('home.hero.primaryCta')}</span>
            </Link>

            {/* Secondary */}
            <Link to="/contact" className={styles.secondary}>
              <span>{t('home.hero.secondaryCta')}</span>
            </Link>
          </motion.div>

        </motion.div>

        {/* ── Scroll Cue ───────────────────────── */}
        <motion.div
          className={styles.scrollCue}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.0 }}
          aria-hidden="true"
        >
          <div className={styles.scrollLine} />
          <p>{t('home.hero.scroll')}</p>
        </motion.div>

        {/* ── Bottom Left Live Badge ────────────── */}
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.2 }}
          aria-hidden="true"
        >
          <span className={styles.badgeDot} />
          <span>{t('home.hero.badge')}</span>
        </motion.div>

      </div>
    </section>
  );
}
