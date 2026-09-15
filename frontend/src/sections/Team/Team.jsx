import { useState, useEffect } from 'react';
import SectionHeading from '@/components/SectionHeading/SectionHeading';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { fetchTeam } from '@/lib/team';
import styles from './Team.module.css';

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/* ═══════════════════════════════════════════════ */
export default function Team() {
  const [members, setMembers] = useState(null);

  useEffect(() => {
    fetchTeam().then(setMembers).catch(() => setMembers([]));
  }, []);

  // Renders nothing until we know there's a team to show — no empty
  // section, no loading flash, on a marketing page.
  if (!members || members.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="Who you'll work with" title="Our team" align="center" />

        <div className={styles.grid}>
          {members.map((m, i) => (
            <ScrollReveal key={m.id} delay={i * 0.06}>
              <div className={styles.card}>
                {m.photo ? (
                  <img src={m.photo} alt={m.name} className={styles.photo} loading="lazy" />
                ) : (
                  <div className={styles.avatar} aria-hidden="true">
                    {initials(m.name)}
                  </div>
                )}
                <p className={styles.name}>{m.name}</p>
                {m.role && <p className={styles.role}>{m.role}</p>}
                {m.bio && <p className={styles.bio}>{m.bio}</p>}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
