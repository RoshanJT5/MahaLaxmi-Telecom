import SiteShell from '@/components/SiteShell';
import styles from './our-story.module.css';

const TIMELINE = [
  {
    eyebrow: 'Past',
    title: 'Two Decades of Trust',
    body: 'For more than twenty years, we have been a trusted name in the telecom industry, working as a distribution partner to several recognized mobile brands. Along the way, we built strong, lasting relationships with thousands of retail partners across the market.',
  },
  {
    eyebrow: 'Experience',
    title: 'Relationships That Lasted',
    body: 'Staying connected to that retail network taught us exactly what helps a retail business grow and hold its ground, season after season.',
  },
  {
    eyebrow: 'Insight',
    title: 'Understanding Our Retailers',
    body: 'Two decades on the distribution side gave us a close view of what retailers actually deal with day to day, their needs, their ambitions and their everyday challenges.',
  },
  {
    eyebrow: 'Solution',
    title: 'Building The Next Chapter',
    body: 'That experience lets us offer more than products. We bring real business opportunity, dependable support and long-term value to every retail partner, because our growth and theirs are tied together. It is why we launched our Retail Store Chain Franchise Model, so you can build your future with our franchise.',
  },
  {
    eyebrow: 'Future',
    title: 'Our Aim',
    body: 'To establish a network of 200+ premium retail stores across Maharashtra, building a unified ecosystem that gives every franchise partner a trusted brand, a proven business model and a real path to long-term growth.',
  },
];

export default function OurStoryPage() {
  return (
    <SiteShell>
      <main id="main-content">
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>
              Twenty years of trust, written <span>one relationship</span> at a time.
            </h1>
            <p className={styles.heroDesc}>
              Our journey moves from distribution partner to retail chain, and from insight to a
              franchise model built for the people who sell every day.
            </p>
          </div>
        </section>

        <section className={styles.storySection} aria-label="Our journey">
          <div className={styles.container}>
            <div className={styles.storyLayout}>
              <div className={styles.storyMedia}>
                <img
                  src="/page-section1/store-hero.jpg"
                  alt="Inside a Mahalaxmi Telecom retail store"
                  loading="lazy"
                />
              </div>
              <div className={styles.timeline}>
                {TIMELINE.map((item) => (
                  <article className={styles.tItem} key={item.title}>
                    <p className={styles.tEyebrow}>{item.eyebrow}</p>
                    <h2 className={styles.tTitle}>{item.title}</h2>
                    <p className={styles.tBody}>{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection} aria-label="Next step">
          <div className={styles.container}>
            <p className={styles.ctaEyebrow}>Next Step</p>
            <h2 className={styles.ctaTitle}>Your chapter starts with a store</h2>
            <p className={styles.ctaDesc}>
              Join a network built by people who spent two decades understanding what retailers actually need.
            </p>
            <div className={styles.ctaActions}>
              <a href="/franchise" className={`${styles.ctaBtn} ${styles.ctaBtnPrimary}`}>
                Explore Franchise <span aria-hidden="true">→</span>
              </a>
              <a href="/contact" className={`${styles.ctaBtn} ${styles.ctaBtnGhost}`}>
                Contact Us <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
