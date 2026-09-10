import { NavLink } from 'react-router-dom';
import { useAuth } from '@/components/Auth/AuthProvider';
import styles from './HqShell.module.css';

// More sections (Products, Leads, SEO...) land here in later phases, once
// they're real working pages — not stubbed out ahead of time.
const NAV = [
  { to: '/hq', label: 'Global Markets', icon: '◎' },
];

/**
 * Shared sidebar + top bar shell for every /hq screen (except the login
 * page, which stands alone). Keeps this internal tool visually distinct
 * from the public marketing site rather than reusing its editorial layout.
 */
export default function HqShell({ title, children }) {
  const { user, logout } = useAuth();

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>KGE</span>
          <span className={styles.brandName}>Global Market HQ</span>
        </div>

        <nav className={styles.nav} aria-label="HQ navigation">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/hq'}
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
            >
              <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a className={styles.viewSite} href="/" target="_blank" rel="noopener noreferrer">
          ↗ View live site
        </a>
      </aside>

      <div className={styles.main}>
        <header className={styles.topbar}>
          <h1 className={styles.pageTitle}>{title}</h1>
          <div className={styles.topbarRight}>
            <div className={styles.userBadge}>
              <span className={styles.userAvatar} aria-hidden="true">
                {user?.email?.[0]?.toUpperCase() || '?'}
              </span>
              <span className={styles.userInfo}>
                <span className={styles.userEmail}>{user?.email}</span>
                <span className={styles.userRole}>{user?.role}</span>
              </span>
            </div>
            <button type="button" className={styles.logout} onClick={logout}>
              Sign out
            </button>
          </div>
        </header>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
