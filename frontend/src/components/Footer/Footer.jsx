import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { siteConfig, waLink, mailtoLink, telLink, formatPhoneDisplay } from '@/data/config';
import { getStaticMarketLinks } from '@/data/marketContent';
import CertificationGallery from '@/components/CertificationGallery/CertificationGallery';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>

      {/* ── Certification Strip ─────────────────── */}
      <CertificationGallery />

      {/* ── Main Grid ──────────────────────────── */}
      <div className={`container ${styles.grid}`}>

        {/* ── Brand Column ───────────────────────── */}
        <div className={styles.brand}>
          <p className={styles.brandName}>{siteConfig.brandName}</p>
          <p className={styles.brandTagline}>{t('common.tagline')}</p>

          {/* Warm accent divider */}
          <div className={styles.brandDivider} aria-hidden="true" />

          <p className={styles.brandLine}>
            {t('footer.madeInIndia')}
          </p>

          <p className={styles.structureLine}>
            {t('footer.structureLine')}
          </p>

          {/* Social Row — add icons if you have them */}
          {siteConfig.socials?.length > 0 && (
            <div className={styles.socialRow}>
              {siteConfig.socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* ── Navigate Column ────────────────────── */}
        <div className={styles.col}>
          <p className={styles.colHeading}>{t('footer.navigate')}</p>
          <ul>
            {siteConfig.nav
              .filter((i) => i.href !== '/')
              .map((item) => (
                <li key={item.href}>
                  <Link to={item.href}>{t(item.labelKey)}</Link>
                </li>
              ))}
          </ul>
        </div>

        {/* ── Contact Column ─────────────────────── */}
        <div className={styles.col}>
          <p className={styles.colHeading}>{t('footer.contact')}</p>
          <ul>
            <li>
              <a href={mailtoLink()}>
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a href={telLink()}>
                {formatPhoneDisplay()}
              </a>
            </li>
            <li>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappLink}
              >
                {t('footer.whatsappLink')}
              </a>
            </li>
            <li>
              <address className={styles.address}>
                {siteConfig.contact.address}
              </address>
            </li>
          </ul>
        </div>

        {/* ── Export Markets Column ──────────────────
            These were the region names as plain text. They are the
            market pages now, because nothing on the site linked to any
            of them — they sat in the sitemap and nowhere else, which is
            how a page Google is allowed to index still goes unindexed.
            A footer is on every page, so this is the one place that
            fixes it for all eight at once. */}
        <div className={styles.col}>
          <p className={styles.colHeading}>{t('footer.exportRegions')}</p>
          <ul>
            {getStaticMarketLinks().map((market) => (
              <li key={market.href}>
                <Link to={market.href}>{market.label}</Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* ── Bottom Bar ─────────────────────────── */}
      <div className={`container ${styles.bottom}`}>
        <p>© {year} {siteConfig.brandName}. {t('footer.rightsReserved')}</p>

        <p className={styles.legalLinks}>
          <Link to="/privacy-policy">{t('footer.privacyPolicy')}</Link>
          <Link to="/terms-and-conditions">{t('footer.termsConditions')}</Link>
        </p>
      </div>

    </footer>
  );
}
