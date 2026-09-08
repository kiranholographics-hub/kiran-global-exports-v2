import { Fragment, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import styles from './Manufacturing.module.css';

/* ── GSAP Plugin ───────────────────────────────── */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ═══════════════════════════════════════════════
 * Horizontal scroll is built with CSS `position: sticky`
 * (not GSAP's `pin: true`). GSAP only drives the horizontal
 * translate via scrub — it never restructures the DOM, so
 * there's nothing for React to conflict with when this
 * section unmounts mid-animation (e.g. navigating away
 * while scrolled partway through) — no pin-spacer to revert.
═══════════════════════════════════════════════ */
export default function Manufacturing() {
  const { t } = useTranslation();
  const STEPS = t('home.manufacturing.steps', { returnObjects: true });
  const sectionRef    = useRef(null);
  const stickyRef      = useRef(null);
  const trackRef       = useRef(null);
  const fillRef         = useRef(null);
  const [reduced, setReduced] = useState(false);

  /* ── Reduced Motion Listener ─────────────────── */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  /* ── GSAP Horizontal Scroll (sticky-driven) ──── */
  useEffect(() => {
    if (reduced) return undefined;
    if (window.innerWidth < 860) return undefined;

    const section = sectionRef.current;
    const track    = trackRef.current;
    if (!section || !track) return undefined;

    let tween;
    let trigger;

    const ctx = gsap.context(() => {
      const distance = track.scrollWidth - window.innerWidth;
      if (distance <= 0) return;

      // The section needs to be tall enough that scrolling through it
      // covers the full horizontal distance while the sticky wrap stays
      // stuck to the viewport top.
      section.style.height = `${window.innerHeight + distance}px`;

      const onUpdate = (self) => {
        if (fillRef.current) {
          fillRef.current.style.width = `${self.progress * 100}%`;
        }
      };

      tween = gsap.to(track, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          onUpdate,
        },
      });
      trigger = tween.scrollTrigger;
    }, sectionRef);

    return () => {
      trigger?.kill();
      tween?.kill();
      ctx.revert();
      if (section) section.style.height = '';
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} section--dark`}
      aria-label="Manufacturing Process"
    >
      <div ref={stickyRef} className={styles.stickyWrap}>

        {/* ── Intro ─────────────────────────────── */}
        <div className={styles.intro}>
          <p className="eyebrow">{t('home.manufacturing.eyebrow')}</p>
          <h2 className={styles.heading}>
            {t('home.manufacturing.heading')}
          </h2>
        </div>

        {/* ── Scroll Progress Bar ───────────────── */}
        <div className={styles.progressBar} aria-hidden="true">
          <div className={styles.progressTrack}>
            <div
              ref={fillRef}
              className={styles.progressFill}
            />
          </div>
          <div className={styles.progressLabel}>
            <span>{t('home.manufacturing.start')}</span>
            <span>{STEPS.length} {t('home.manufacturing.stepsSuffix')}</span>
          </div>
        </div>

        {/* ── Horizontal Track ──────────────────── */}
        <div className={styles.trackViewport}>
          <div ref={trackRef} className={styles.track}>
            {STEPS.map((step, i) => {
              const n = String(i + 1).padStart(2, '0');
              return (
                <Fragment key={step.title}>
                  {/* Card */}
                  <div
                    className={styles.card}
                    role="article"
                    aria-label={`Step ${n}: ${step.title}`}
                  >
                    {/* Ghost number bg */}
                    <span
                      className={styles.ghostN}
                      aria-hidden="true"
                    >
                      {n}
                    </span>

                    {/* Step number */}
                    <span className={styles.n}>{n}</span>

                    {/* Title */}
                    <h3 className={styles.title}>
                      {step.title}
                      <span
                        className={styles.titleLine}
                        aria-hidden="true"
                      />
                    </h3>

                    {/* Body */}
                    <p className={styles.body}>{step.body}</p>

                    {/* Tag — visible on hover */}
                    <span
                      className={styles.cardTag}
                      aria-hidden="true"
                    >
                      {step.tag}
                    </span>

                  </div>

                  {/* Connector line between cards (not after last) */}
                  {i < STEPS.length - 1 && (
                    <div
                      className={styles.connector}
                      aria-hidden="true"
                    />
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
