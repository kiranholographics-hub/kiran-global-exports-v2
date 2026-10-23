import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import styles from './CinematicHeroVideo.module.css';

const DEFAULT_DESKTOP_SOURCE = '/videos/kiran-hero-desktop.mp4';
const DEFAULT_MOBILE_SOURCE = '/videos/kiran-hero-mobile.mp4';
const DEFAULT_POSTER = '/images/hero/kiran-hero-poster.jpg';

function getIsMobile() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 767px)').matches;
}

function getSource(isMobile, desktopSource, mobileSource) {
  return isMobile ? mobileSource : desktopSource;
}

export default function CinematicHeroVideo({
  className = '',
  style,
  desktopSource = DEFAULT_DESKTOP_SOURCE,
  mobileSource = DEFAULT_MOBILE_SOURCE,
  poster = DEFAULT_POSTER,
}) {
  const videoRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const [isMobile, setIsMobile] = useState(getIsMobile);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  // The film is 5-9 MB. Starting that download during first paint competes
  // with the poster, the fonts and the page's own scripts, and the poster is
  // what the visitor (and Google's speed measurement) actually waits for.
  // So the video starts only once the page has finished loading and the
  // browser is idle, and not at all for a visitor who has asked for less
  // data or is on a very slow connection — they keep the poster.
  const [canLoad, setCanLoad] = useState(false);
  const [lowData, setLowData] = useState(false);

  const source = getSource(
    isMobile,
    desktopSource,
    mobileSource
  );

  /* ── Detect mobile / desktop ───────────────── */
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const handleChange = (event) => {
      setIsMobile(event.matches);
      setIsReady(false);
      setHasError(false);
    };

    setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener?.('change', handleChange);

    return () => {
      mediaQuery.removeEventListener?.('change', handleChange);
    };
  }, []);

  /* ── Defer the download until the page is idle ── */
  useEffect(() => {
    if (prefersReduced) return undefined;

    const connection = navigator.connection;
    if (
      connection &&
      (connection.saveData || /(^|-)2g$/.test(connection.effectiveType || ''))
    ) {
      setLowData(true);
      return undefined;
    }

    let cancelled = false;
    let idleHandle;
    let timeoutHandle;

    const start = () => {
      if (!cancelled) setCanLoad(true);
    };

    const whenIdle = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleHandle = window.requestIdleCallback(start, { timeout: 2500 });
      } else {
        timeoutHandle = window.setTimeout(start, 400);
      }
    };

    if (document.readyState === 'complete') {
      whenIdle();
    } else {
      window.addEventListener('load', whenIdle, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', whenIdle);
      if (idleHandle !== undefined) window.cancelIdleCallback?.(idleHandle);
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
    };
  }, [prefersReduced]);

  /* ── Load & autoplay video ─────────────────── */
  useEffect(() => {
    const video = videoRef.current;

    if (!video || prefersReduced || !canLoad) return undefined;

    setIsReady(false);
    setHasError(false);

    /*
     * Make sure mobile browsers receive the autoplay
     * permissions before loading the video.
     */
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    video.load();

    const handleLoaded = () => {
      setIsReady(true);

      const playPromise = video.play();

      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          /*
           * Autoplay can still be blocked by a browser.
           * The video itself remains available.
           */
        });
      }
    };

    const handleError = () => {
      setHasError(true);
      setIsReady(false);
    };

    video.addEventListener('loadeddata', handleLoaded);
    video.addEventListener('canplay', handleLoaded);
    video.addEventListener('error', handleError);

    /*
     * Some mobile browsers can already have enough
     * data available immediately after source changes.
     */
    if (video.readyState >= 2) {
      handleLoaded();
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoaded);
      video.removeEventListener('canplay', handleLoaded);
      video.removeEventListener('error', handleError);
    };
  }, [source, prefersReduced, canLoad]);

  const showPoster = prefersReduced || hasError || lowData;

  return (
    <div
      className={`${styles.root} ${
        showPoster ? styles.posterOnly : ''
      } ${className}`}
      style={{
        '--hero-video-poster': `url(${poster})`,
        ...style,
      }}
      aria-hidden="true"
    >
      {!prefersReduced && !lowData && (
        <video
          ref={videoRef}
          className={`${styles.video} ${
            isReady && !hasError ? styles.ready : ''
          }`}
          src={canLoad ? source : undefined}
          poster={poster}
          autoPlay
          muted
          defaultMuted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          webkit-playsinline="true"
          onLoadedData={() => setIsReady(true)}
          onCanPlay={() => setIsReady(true)}
          onError={() => {
            setHasError(true);
            setIsReady(false);
          }}
        />
      )}

      <div className={styles.poster} />

      <span className="sr-only">
        Cinematic textile film background
      </span>
    </div>
  );
}
