import styles from './CatalogueSkeleton.module.css';

/**
 * Generic loading placeholder shown while catalogue data (products,
 * categories) is being fetched — used as the <Suspense fallback> for every
 * catalogue-browsing route, rather than a bespoke skeleton per page.
 */
export default function CatalogueSkeleton() {
  return (
    <div className={styles.wrap} aria-busy="true" aria-label="Loading products">
      <div className={`${styles.intro} ${styles.shimmer}`} />
      <div className={styles.grid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div className={styles.card} key={i}>
            <div className={`${styles.cardImage} ${styles.shimmer}`} />
            <div className={`${styles.cardLine} ${styles.shimmer}`} />
            <div className={`${styles.cardLineShort} ${styles.shimmer}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
