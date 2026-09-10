import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { siteConfig, waLink, mailtoLink, telLink, formatPhoneDisplay } from '@/data/config';
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

        {/* ── Export Regions Column ──────────────── */}
        <div className={styles.col}>
          <p className={styles.colHeading}>{t('footer.exportRegions')}</p>
          <ul>
            {siteConfig.exportRegions.map((r) => (
              <li key={r.value} className={styles.regionTag}>
                {t(r.labelKey)}
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
