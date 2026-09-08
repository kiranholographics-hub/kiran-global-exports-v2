import { useEffect, useRef, createContext, useContext, useCallback } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ── GSAP Plugin ───────────────────────────────── */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ═══════════════════════════════════════════════
   CONTEXT — expose lenis instance to children
═══════════════════════════════════════════════ */
const LenisContext = createContext(null);

/**
 * useLenis — access the Lenis instance anywhere in the tree.
 *
 * @example
 * const lenis = useLenis();
 * lenis?.scrollTo('#section', { offset: -80 });
 */
export function useLenis() {
  return useContext(LenisContext);
}

/* ── Lenis config ──────────────────────────────── */
const LENIS_CONFIG = {
  duration:        1.10,
  easing:          (t) => 1 - Math.pow(1 - t, 3), // cubic ease-out
  smoothWheel:     true,
  wheelMultiplier: 1.0,
  touchMultiplier: 1.1,
  infinite:        false,
  orientation:     'vertical',
  gestureOrientation: 'vertical',
  normalizeWheel: false,
};

/* ═══════════════════════════════════════════════ */
/**
 * SmoothScrollProvider
 *
 * Wires Lenis smooth scrolling into GSAP's ScrollTrigger
 * ticker so pinned / scrubbed animations stay in sync with
 * the eased scroll position.
 *
 * - No-op on server (SSR safe)
 * - Skipped when prefers-reduced-motion is set
 * - Exposes lenis instance via `useLenis()` hook
 * - Auto-refreshes ScrollTrigger on resize
 * - Handles hash anchor links on mount
 *
 * @param {object}   props
 * @param {ReactNode} props.children
 */
export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  /* ── scrollTo helper (stable ref) ─────────────── */
  const scrollTo = useCallback((target, options = {}) => {
    lenisRef.current?.scrollTo(target, {
      offset: -80,
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      ...options,
    });
  }, []);

  useEffect(() => {
    /* ── SSR guard ─────────────────────────────── */
    if (typeof window === 'undefined') return undefined;

    /* ── Reduced motion — skip smooth scroll ────── */
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return undefined;

    /* ── Init Lenis ─────────────────────────────── */
    const lenis = new Lenis(LENIS_CONFIG);
    lenisRef.current = lenis;

    /* ── Sync with GSAP ScrollTrigger ──────────── */
    lenis.on('scroll', ScrollTrigger.update);

    const tickerFn = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    /* ── Handle hash anchor on mount ────────────── */
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        /* Small delay — let page paint first */
        setTimeout(() => {
          lenis.scrollTo(target, { offset: -80, duration: 1.4 });
        }, 400);
      }
    }

    /* ── Intercept anchor clicks ─────────────────── */
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const id     = anchor.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target, { offset: -80, duration: 1.2 });

      /* Update URL hash without scroll jump */
      window.history.pushState(null, '', id);
    };

    document.addEventListener('click', handleAnchorClick);

    /* ── Refresh ScrollTrigger on resize ─────────── */
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    /* ── Pause on visibility change ──────────────── */
    const handleVisibility = () => {
      if (document.hidden) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    /* ── Cleanup ─────────────────────────────────── */
    return () => {
      gsap.ticker.remove(tickerFn);
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      clearTimeout(resizeTimer);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
}