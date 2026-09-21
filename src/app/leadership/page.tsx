'use client';

import { useState } from 'react';
import SiteShell from '@/components/SiteShell';
import { TeamDrawer, type TeamMember } from '@/components/ui/information-drawer';
import styles from './leadership.module.css';

const portrait = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&q=80&auto=format&fit=crop`;

const DIRECTORS = [
  {
    id: 'PJ', slug: 'pradip-jagyasi', name: 'Pradip Jagyasi', role: 'CEO & Co-Founder', bio: 'Sets the company’s overall vision and strategy, and leads growth, brand partnerships and franchise expansion across Maharashtra and beyond.', photo: portrait('1560250097-0b93528c311a'), active: true,
    content: '<p>Pradip sets the company’s overall vision and strategy, leading growth, brand partnerships and franchise expansion across Maharashtra and beyond. Every store format — from flagship to neighbourhood retail point — carries his standard of honest advice and hands-on customer experience.</p><p>He comes from more than two decades on the distribution side of telecom, where long-standing relationships with national and global mobile brands were built shelf by shelf. That sourcing strength is what lets every outlet retail with confidence on price, warranty and range.</p>'
  },
  {
    id: 'GJ', slug: 'gautam-jagyasi', name: 'Gautam Jagyasi', role: 'Managing Director', bio: '', photo: portrait('1519085360753-af0119f7cbe7'), active: false,
    content: '<p>Gautam runs day-to-day operations across the retail network — store rollouts, staffing, inventory flow and the operating rhythm that keeps every outlet consistent.</p><p>His focus is execution at scale: opening new stores without diluting service quality, and making sure each format runs on the same Mahalaxmi Telecom playbook.</p>'
  },
  {
    id: 'NW', slug: 'nilesh-wadhvani', name: 'Nilesh Wadhvani', role: 'Whole-Time Director', bio: '', photo: portrait('1472099645785-5658abf4ff4e'), active: false,
    content: '<p>Nilesh oversees finance, commercial discipline and the sourcing engine behind the shelves — the bulk purchasing power and brand relationships built over twenty years of distribution.</p><p>His mandate is simple: better prices for partners, healthy margins for stores, and a supply chain that never leaves a fast-moving product out of stock.</p>'
  },
  {
    id: 'KJ', slug: 'kapil-jagyasi', name: 'Kapil Jagyasi', role: 'Whole-Time Director', bio: '', photo: portrait('1507003211169-0a1dd7228f2d'), active: false,
    content: '<p>Kapil leads brand partnerships and marketing — from national-device launches to the store-level campaigns and launch support every new franchise receives.</p><p>He owns the look, voice and visibility of the network, so a customer walking into any of the four formats instantly recognises the same trusted standard.</p>'
  },
  {
    id: 'VJ', slug: 'vijay-jagyasi', name: 'Vijay Jagyasi', role: 'Whole-Time Director', bio: '', photo: portrait('1500648767791-00dcc994a43e'), active: false,
    content: '<p>Vijay champions franchise partner success — onboarding, training, finance options and the ongoing support that turns a new store into a thriving local business.</p><p>From site selection to grand opening and beyond, his team stands behind every partner with hands-on guidance, not just a brand board.</p>'
  },
];

const TEAM: TeamMember[] = DIRECTORS.map(d => ({
  id: d.id,
  slug: d.slug,
  title: d.name,
  content: d.content,
  featuredImage: d.photo,
  teams: { designation: d.role },
}));

export default function LeadershipPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState<TeamMember | null>(null);

  const openProfile = (id: string) => {
    const member = TEAM.find(t => t.id === id);
    if (!member) return;
    setSelected(member);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelected(null);
  };

  return (
    <SiteShell>
      <main id="main-content">
        <section className={styles.topSection}>
          <div className={styles.topContainer}>
            <p className={styles.eyebrow}>Leadership</p>
            <h1 className={styles.topTitle}>The people behind <span className={styles.topTitleGold}>every store</span>.</h1>
            <p className={styles.topIntro}>A leadership team drawn from two decades of telecom distribution, now focused on building a premium retail chain. Select any profile to read more.</p>
          </div>
        </section>

        <section className={styles.boardSection}>
          <div className={styles.boardContainer}>
            <p className={styles.eyebrow}>Board & Leadership</p>
            <h2 className={styles.boardTitle}>Five directors, one shared standard of retail.</h2>

            <div className={styles.stripScroll}>
              <div className={styles.strip}>
                <div className={styles.headRow}>
                  {DIRECTORS.map(d => (
                    <div key={d.id} className={styles.headCell}>
                      <h3 className={styles.cardName}>{d.name}</h3>
                      <p className={styles.cardRole}>{d.role}</p>
                    </div>
                  ))}
                </div>
                <div className={styles.photoRow}>
                  {DIRECTORS.map(d => (
                    <div
                      key={d.id}
                      className={styles.photoCell}
                      role="button"
                      tabIndex={0}
                      aria-label={`Open ${d.name} profile`}
                      onClick={() => openProfile(d.id)}
                      onKeyDown={(event) => {
                        if (event.key !== 'Enter' && event.key !== ' ') return;
                        event.preventDefault();
                        openProfile(d.id);
                      }}
                    >
                      <img src={d.photo} alt={`${d.name}, ${d.role}`} loading="lazy" />
                    </div>
                  ))}
                </div>
                <div className={styles.footRow}>
                  {DIRECTORS.map(d => (
                    <div key={d.id} className={styles.footCell}>
                      <a
                        href="#"
                        onClick={(event) => { event.preventDefault(); openProfile(d.id); }}
                        className={styles.cardLink}
                      >— Profile</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.messageSection} aria-label="Message from the CEO">
          <div className={styles.messageContainer}>
            <div className={styles.messageCopy}>
              <p className={styles.eyebrow}>Director&apos;s Message</p>
              <h2 className={styles.messageName}>Pradip Jagyasi</h2>
              <p className={styles.messageRole}>CEO &amp; Co-Founder <span aria-hidden="true">✦</span></p>
              <blockquote className={styles.messageQuote}>
                True innovation <em>doesn&apos;t</em> come from following the <em>market trends</em>; it comes from anticipating the needs your customers <em>don&apos;t even know they</em> have yet. Build for tomorrow, today.
              </blockquote>
              <p className={styles.messageSign}>Mahalaxmi Telecom Private Limited</p>
            </div>
            <div className={styles.messageMedia}>
              <span className={styles.messageInitial} aria-hidden="true">P</span>
              <img src={DIRECTORS[0].photo} alt="Pradip Jagyasi, CEO & Co-Founder" loading="lazy" />
            </div>
          </div>
        </section>
      </main>
      <TeamDrawer
        open={drawerOpen}
        member={selected}
        teams={TEAM}
        onClose={closeDrawer}
        backgroundColor="#fffdfa"
        textColor="#14100a"
        overlayOpacity={0.35}
      />
    </SiteShell>
  );
}
