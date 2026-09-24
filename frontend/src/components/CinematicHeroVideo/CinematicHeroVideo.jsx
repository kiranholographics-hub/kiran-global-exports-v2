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

  /* ── Load & autoplay video ─────────────────── */
  useEffect(() => {
    const video = videoRef.current;

    if (!video || prefersReduced) return;

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
  }, [source, prefersReduced]);

  const showPoster = prefersReduced || hasError;

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
      {!prefersReduced && (
        <video
          ref={videoRef}
          className={`${styles.video} ${
            isReady && !hasError ? styles.ready : ''
          }`}
          src={source}
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
