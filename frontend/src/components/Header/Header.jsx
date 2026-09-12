import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { siteConfig } from '@/data/config';
import MobileNav from '@/components/MobileNav/MobileNav';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';
import styles from './Header.module.css';

export default function Header() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHeroPage = pathname === '/' || pathname === '/collections' || pathname === '/towels' || pathname === '/linen';
  const [previousPathname, setPreviousPathname] = useState(pathname);

  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    if (menuOpen) setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`${styles.header} ${!isHeroPage ? styles.light : ''} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`${styles.inner} container`}>
          <Link to="/" className={styles.logo} aria-label={t('header.logoAria')}>
            <span className={styles.logoMark}>KGE</span>
            <span className={styles.logoWord}>Kiran Global <em>Exports</em></span>
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            <ul>
              {siteConfig.nav.filter((item) => !item.hideFromHeader).map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={styles.navLink}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {t(item.labelKey)}
                    <span className={styles.navUnderline} data-active={pathname === item.href} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <LanguageSwitcher />

            <Link to={siteConfig.headerCta.href} className={styles.cta}>
              {t(siteConfig.headerCta.labelKey)}
            </Link>

            <button
              type="button"
              className={styles.hamburger}
              aria-label={menuOpen ? t('header.menuClose') : t('header.menuOpen')}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((value) => !value)}
            >
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} />
            </button>
          </div>
        </div>
      </header>
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
