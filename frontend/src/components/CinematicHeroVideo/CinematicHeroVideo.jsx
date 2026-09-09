import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import styles from './CinematicHeroVideo.module.css';

const DEFAULT_DESKTOP_SOURCE = '/videos/kiran-hero-desktop.mp4';
const DEFAULT_MOBILE_SOURCE = '/videos/kiran-hero-mobile.mp4';
const DEFAULT_POSTER = '/images/hero/kiran-hero-poster.webp';

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
  const [source, setSource] = useState(() => getSource(typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches, desktopSource, mobileSource));
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleChange = (event) => {
      setSource(getSource(event.matches, desktopSource, mobileSource));
      setIsReady(false);
      setHasError(false);
    };
    mediaQuery.addEventListener?.('change', handleChange);
    return () => mediaQuery.removeEventListener?.('change', handleChange);
  }, [desktopSource, mobileSource]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReduced) return undefined;
    setIsReady(false);
    setHasError(false);
    video.load();
    const attemptPlay = () => {
      const playPromise = video.play();
      if (playPromise?.catch) playPromise.catch(() => setHasError(true));
    };
    if (video.readyState >= 2) attemptPlay();
    else video.addEventListener('loadeddata', attemptPlay, { once: true });
    return () => video.removeEventListener('loadeddata', attemptPlay);
  }, [source, prefersReduced]);

  const showPoster = prefersReduced || hasError;

  return (
    <div
      className={`${styles.root} ${showPoster ? styles.posterOnly : ''} ${className}`}
    
      aria-hidden="true"
    >
      {!prefersReduced && (
        <video
          ref={videoRef}
          className={`${styles.video} ${isReady && !hasError ? styles.ready : ''}`}
          src={source}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          onLoadedData={() => setIsReady(true)}
          onCanPlay={() => setIsReady(true)}
          onError={() => { setHasError(true); setIsReady(false); }}
        />
      )}
      <div className={styles.poster} />
      <span className="sr-only">Cinematic textile film background</span>
    </div>
  );
}
