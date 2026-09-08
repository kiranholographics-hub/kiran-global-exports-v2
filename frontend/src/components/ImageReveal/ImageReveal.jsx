import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import styles from './ImageReveal.module.css';

/* ── Reveal animation variants ─────────────────── */
const overlayVariants = {
  hidden:  { scaleY: 1 },
  visible: {
    scaleY: 0,
    transition: {
      duration: 0.85,
      ease:     [0.16, 1, 0.3, 1],
      delay:    0.1,
    },
  },
};

const imageVariants = {
  hidden:  { scale: 1.08 },
  visible: {
    scale: 1,
    transition: {
      duration: 1.2,
      ease:     [0.16, 1, 0.3, 1],
    },
  },
};

/* ── SVG placeholder icon ──────────────────────── */
function PlaceholderIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════ */
export default function ImageReveal({
  src,
  alt,
  label,
  className  = '',
  priority   = false,
  reveal     = true,
  sizes,
  style,
}) {
  const [failed, setFailed]   = useState(false);
  const [loaded, setLoaded]   = useState(false);

  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });
  const controls = useAnimation();

  /* Trigger reveal animation when in view */
  useEffect(() => {
    if (isInView && reveal) {
      controls.start('visible');
    }
  }, [isInView, reveal, controls]);

  /* If priority — start immediately */
  useEffect(() => {
    if (priority && reveal) {
      controls.start('visible');
    }
  }, [priority, reveal, controls]);

  /* ── Frame class ─────────────────────────────── */
  const frameClass = [
    styles.frame,
    loaded ? styles.imageLoaded : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  /* ── Image class ─────────────────────────────── */
  const imageClass = [
    styles.image,
    loaded ? styles.loaded : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={frameClass}
      style={style}
    >
      {failed ? (
        /* ── Placeholder ────────────────────── */
        <div
          className={styles.placeholder}
          role="img"
          aria-label={alt}
        >
          <div className={styles.placeholderIcon}>
            <PlaceholderIcon />
            <span className={styles.placeholderLabel}>
              {label || alt}
            </span>
          </div>
        </div>

      ) : reveal ? (
        /* ── Animated Reveal ────────────────── */
        <>
          <motion.img
            className={imageClass}
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            sizes={sizes}
            variants={imageVariants}
            initial="hidden"
            animate={controls}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />

          {/* Overlay wipes upward */}
          <motion.div
            className={styles.revealOverlay}
            variants={overlayVariants}
            initial="hidden"
            animate={controls}
            aria-hidden="true"
          />
        </>

      ) : (
        /* ── Static (no animation) ──────────── */
        <img
          className={imageClass}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}