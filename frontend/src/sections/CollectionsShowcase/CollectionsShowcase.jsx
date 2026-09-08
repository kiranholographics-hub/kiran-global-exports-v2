import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SectionHeading from '@/components/SectionHeading/SectionHeading';
import ImageReveal from '@/components/ImageReveal/ImageReveal';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './CollectionsShowcase.module.css';

/* ── Collections Data (image/href are structural, not translated) ── */
const WORLD_SLUGS = [
  { slug: 'hotel', href: '/collections#hotel', image: '/images/towels/hotel/hotel-border-towel.jpg' },
  { slug: 'spa', href: '/collections#spa', image: '/images/towels/bath-mats/cotton-bath-mat.jpg' },
  { slug: 'home', href: '/collections#home', image: '/images/towels/bath/bath-towel.jpg' },
  { slug: 'hospitality', href: '/collections#hospitality', image: '/images/towels/jacquard/jacquard-towel.jpg' },
  { slug: 'retail', href: '/collections#retail', image: '/images/towels/waffle/waffle-weave-towel.jpg' },
  { slug: 'custom', href: '/custom', image: '/images/custom/private-label.jpg' },
];

/* ═══════════════════════════════════════════════ */
export default function CollectionsShowcase() {
  const { t } = useTranslation();

  return (
    <section className={`section section--spacious ${styles.section}`}>
      <div className="container">

        {/* ── Section Heading ──────────────────── */}
        <SectionHeading
          eyebrow={t('home.collectionsShowcase.eyebrow')}
          title={t('home.collectionsShowcase.title')}
        />

        {/* ── Tile Grid ────────────────────────── */}
        <div
          className={styles.grid}
          role="list"
          aria-label="Product collections"
        >
          {WORLD_SLUGS.map((w, i) => {
            const name = t(`home.collectionsShowcase.worlds.${w.slug}.name`);
            const tag = t(`home.collectionsShowcase.worlds.${w.slug}.tag`);
            return (
              <ScrollReveal
                key={w.slug}
                delay={i * 0.06}
              >
                <Link
                  to={w.href}
                  className={styles.tile}
                  role="listitem"
                  aria-label={`Explore ${name} collection`}
                >
                  {/* Media */}
                  <ImageReveal
                    src={w.image}
                    alt={`${name} collection`}
                    label={name}
                    className={styles.media}
                  />

                  {/* Corner index */}
                  <span
                    className={styles.cornerIndex}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Collection name label */}
                  <span className={styles.label}>
                    {name}
                  </span>

                  {/* Explore CTA — visible on hover */}
                  <span
                    className={styles.exploreCta}
                    aria-hidden="true"
                  >
                    {tag}
                  </span>

                </Link>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
