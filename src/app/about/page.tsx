'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
} from 'framer-motion';
import SiteShell from '@/components/SiteShell';
import VisionMissionSections from '@/components/VisionMissionSections';
import styles from './about.module.css';

const timeline = [
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

/* ── Count-up hook ─────────────────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

function StatCard({ target, suffix = '', label }: { target: number; suffix?: string; label: string }) {
  const { count, ref } = useCountUp(target, 1600);
  return (
    <div className={styles.statCard} ref={ref}>
      <span className={styles.statNumber}>{count}{suffix}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <SiteShell>
      <main id="main-content">

        {/* ── 1. Hero ───────────────────────────────────────────────────── */}
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <p className={styles.heroEyebrow}>Who We Are</p>
            <h1 className={styles.heroTitle}>
              A trusted name in mobile retail across
              <span className={styles.heroTitleAccent}> Maharashtra.</span>
            </h1>
            <p className={styles.heroBody}>
              Mahalaxmi Telecom Private Limited has built a multi-brand mobile retail
              network from the ground up — one store at a time. Every outlet, from flagship
              to neighbourhood format, runs on the same sourcing standards, service culture
              and customer-first promise we&apos;ve kept for over two decades.
            </p>
          </div>
        </section>

        {/* ── 2. Story ──────────────────────────────────────────────────── */}
        <section className={styles.storySection}>
          <div className={styles.storyContainer}>
            <motion.img
              src="/page-section1/store-detail.jpg"
              alt="Inside a Mahalaxmi Telecom retail outlet"
              className={styles.storyImage}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.div
              className={styles.storyCopy}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            >
              <p className={styles.storyEyebrow}>Our Retail Philosophy</p>
              <h2 className={styles.storyTitle}>
                Retail you can walk<br className={styles.desktopOnly} />into, touch and trust.
              </h2>
              <p className={styles.storyBody}>
                Our stores give customers something an online listing never can — the chance
                to hold every device, test every camera and compare every display before
                spending a rupee. That physical confidence is what keeps customers choosing
                our stores and our partner franchisees thriving.
              </p>

              <motion.ul
                className={styles.storyHighlights}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
                }}
              >
                {[
                  ['Physical-first retail', 'Hands-on testing of every device, every visit, before you buy.'],
                  ['Multi-city presence', 'Stores across Metro, Mini Metro and Tier 1 to Tier 3 towns.'],
                  ['Distribution-grade sourcing', 'Two decades of brand relationships behind every shelf.'],
                  ['Four brands, one standard', 'Consistent quality and service across every store format.'],
                ].map(([title, desc]) => (
                  <motion.li
                    key={title}
                    className={styles.storyHighlightItem}
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    <span className={styles.storyHighlightTitle}>{title}</span>
                    <span className={styles.storyHighlightDesc}>{desc}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </section>

        {/* ── 3. Stats ──────────────────────────────────────────────────── */}
        <section className={styles.statsSection} aria-label="Company milestones">
          <div className={styles.statsContainer}>

            {/* Left — hero stat + label */}
            <div className={styles.statsHero}>
              <div className={styles.statsHeroEyebrow}>
                <span className={styles.statsHeroRule} aria-hidden="true" />
                <span>Twenty Years On</span>
              </div>
              <p className={styles.statsHeroNumber}>20+ Years</p>
              <p className={styles.statsHeroSub}>of experience</p>
            </div>

            {/* Right — 2×2 grid */}
            <div className={styles.statsGrid}>
              <StatCard target={20}  suffix="+" label="Years as a Trusted Distribution Partner" />
              <StatCard target={4}         label="Retail Store Brands Under One Roof" />
              <StatCard target={10}  suffix="+" label="Authorized National & Global Mobile Brands" />
              <StatCard target={200} suffix="+" label="Franchise Stores Planned Across Maharashtra" />
            </div>

          </div>
        </section>
        <VisionMissionSections />
        {/* ── 5. Our Story ───────────────────────────────────────────── */}
        <section className={styles.journeySection} id="our-story" aria-labelledby="journey-title">
          <div className={styles.journeyContainer}>
            <div className={styles.journeyIntro}>
              <p className={styles.journeyEyebrow}>Our Story</p>
              <h2 className={styles.journeyHeading} id="journey-title">
                Twenty years of trust, written <span>one relationship</span> at a time.
              </h2>
              <p className={styles.journeyLead}>
                Our journey moves from distribution partner to retail chain, and from insight to a
                franchise model built for the people who sell every day.
              </p>
            </div>
            <div className={styles.journeyLayout}>
              <div className={styles.journeyMedia}>
                <img src="/page-section1/store-hero.jpg" alt="Inside a Mahalaxmi Telecom retail store" loading="lazy" />
              </div>
              <div className={styles.journeyTimeline}>
                {timeline.map((item) => (
                  <article className={styles.journeyItem} key={item.title}>
                    <p className={styles.journeyStep}>{item.eyebrow}</p>
                    <h3 className={styles.journeyTitle}>{item.title}</h3>
                    <p className={styles.journeyBody}>{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* ── 5. Values / CTA ───────────────────────────────────────────── */}

        <section className={styles.valuesSection}>
          <div className={styles.valuesContainer}>
            <div className={styles.valuesCopy}>
              <p className={styles.valuesEyebrow}>Why We Exist</p>
              <h2 className={styles.valuesTitle}>
                Mahalaxmi Telecom built for trust
                <span className={styles.valuesTitleAccent}> and long-term value.</span>
              </h2>

              <ul className={styles.valuesList}>
                <li className={styles.valuesItem}>
                  <span className={styles.valuesItemTitle}>Seamless Connectivity</span>
                  <p className={styles.valuesItemDesc}>An ecosystem that links every device, every accessory and every service under one roof.</p>
                </li>
                <li className={styles.valuesItem}>
                  <span className={styles.valuesItemTitle}>Expert Guidance</span>
                  <p className={styles.valuesItemDesc}>Trained staff who give honest advice rather than push the highest margin product.</p>
                </li>
                <li className={styles.valuesItem}>
                  <span className={styles.valuesItemTitle}>Accessible for All</span>
                  <p className={styles.valuesItemDesc}>Formats designed for every town size, from flagship metros to emerging Tier 3 markets.</p>
                </li>
              </ul>
            </div>

            <img
              src="/page-section1/hero-store.jpg"
              alt="Mahalaxmi Telecom retail store ambience"
              className={styles.valuesImage}
            />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
