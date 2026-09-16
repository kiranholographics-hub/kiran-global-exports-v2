import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import styles from './CinematicHeroVideo.module.css';

const DEFAULT_DESKTOP_SOURCE = '/videos/kiran-hero-desktop.mp4';
const DEFAULT_MOBILE_SOURCE = '/videos/kiran-hero-mobile.mp4';
const DEFAULT_DESKTOP_POSTER = '/images/hero/hero-poster-desktop.webp';
const DEFAULT_MOBILE_POSTER = '/images/hero/hero-poster-mobile.webp';
const MOBILE_BREAKPOINT = '767px';

/**
 * Renders one <video> with two <source media="..."> children so the
 * browser itself — not JS — decides which file to request; a phone never
 * even opens a connection for the desktop file (and vice versa). The
 * poster can't use the same trick (a <video> has only one poster
 * attribute), so both posters are set as CSS custom properties and the
 * .module.css picks between them with a matching media query.
 */
export default function CinematicHeroVideo({
  className = '',
  style,
  desktopSource = DEFAULT_DESKTOP_SOURCE,
  mobileSource = DEFAULT_MOBILE_SOURCE,
  desktopPoster = DEFAULT_DESKTOP_POSTER,
  mobilePoster = DEFAULT_MOBILE_POSTER,
}) {
  const videoRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  // <source media="..."> is only evaluated once, when the browser picks a
  // source — autoplay itself still needs an explicit play() + a caught
  // promise, since a blocked-autoplay rejection isn't a media "error"
  // event and would otherwise leave the video silently paused on the
  // first frame with no visible fallback.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReduced) return;
    const playPromise = video.play();
    if (playPromise?.catch) playPromise.catch(() => setHasError(true));
  }, [prefersReduced]);

  const showPoster = prefersReduced || hasError;

  return (
    <div
      className={`${styles.root} ${showPoster ? styles.posterOnly : ''} ${className}`}
      style={{
        ...style,
        '--hero-poster-mobile': `url(${mobilePoster})`,
        '--hero-poster-desktop': `url(${desktopPoster})`,
      }}
      aria-hidden="true"
    >
      {!prefersReduced && (
        <video
          ref={videoRef}
          className={`${styles.video} ${isReady && !hasError ? styles.ready : ''}`}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          onLoadedData={() => setIsReady(true)}
          onCanPlay={() => setIsReady(true)}
          onError={() => { setHasError(true); setIsReady(false); }}
        >
          <source src={desktopSource} media={`(min-width: ${MOBILE_BREAKPOINT})`} type="video/mp4" />
          <source src={mobileSource} media={`(max-width: ${MOBILE_BREAKPOINT})`} type="video/mp4" />
        </video>
      )}
      <div className={styles.poster} />
      <span className="sr-only">Cinematic textile film background</span>
    </div>
  );
}
