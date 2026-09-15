import SiteShell from '@/components/SiteShell';
import styles from './vision-mission.module.css';

const PILLARS = [
  { title: 'Seamless Connectivity', desc: 'Reliable access to the digital world for every customer.' },
  { title: 'Expert Guidance', desc: 'Honest, knowledgeable advice at every store visit.' },
  { title: 'Affordable For All', desc: 'Long-term value and support at fair, transparent prices.' },
];

export default function VisionMissionPage() {
  return (
    <SiteShell transparentOnTop>
      <main id="main-content">
        <section className={styles.heroSection} aria-label="Our vision">
          <div className={styles.heroBg} aria-hidden="true" />
          <div className={styles.heroContainer}>
            <p className={styles.heroEyebrow}>Vision</p>
            <h1 className={styles.heroTitle}>
              To become the most trusted multi-brand mobile and accessory retail chain in <em>India.</em>
            </h1>
            <p className={styles.heroTag}>One Team, One Network</p>
            <p className={styles.heroSupport}>
              Offering innovative products, seamless shopping experiences and lasting customer
              relationships, across every store we open and every partner we work with.
            </p>
          </div>
        </section>

        <section className={styles.missionSection} aria-label="Our mission">
          <div className={styles.missionContainer}>
            <div className={styles.missionIntro}>
              <div className={styles.missionSticky}>
                <p className={styles.eyebrow}>Why We Exist</p>
                <h2 className={styles.missionTitle}>Our Mission</h2>
              </div>
            </div>
            <div className={styles.missionBody}>
              <p className={styles.missionLead}>
                To empower every individual and community by making seamless connectivity, smart
                technology and expert guidance accessible to all, bridging the gap between people
                and the digital world.
              </p>
              <p className={styles.missionSupport}>
                Committed to delivering excellent service, honest guidance and long-term support,
                all at affordable prices.
              </p>
              <div className={styles.pillars}>
                {PILLARS.map((pillar) => (
                  <div className={styles.pillar} key={pillar.title}>
                    <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                    <p className={styles.pillarDesc}>{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
