'use client';

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import SiteShell from '@/components/SiteShell';
import styles from './about.module.css';

/* ── Category data ─────────────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: 'smartphones',
    name: 'Smartphones',
    desc: 'The latest devices from every major mobile brand, ready to test in-store.',
    image: '/About-section/Smartphones.png',
    bg: '#faf9f6',
  },
  {
    id: 'tablets',
    name: 'Tablets',
    desc: 'A curated range for work, study and entertainment.',
    image: '/About-section/Tablet.png',
    bg: '#f5f1eb',
  },
  {
    id: 'wearables',
    name: 'Wearables',
    desc: 'Smartwatches and fitness bands from trusted names.',
    image: '/About-section/Watches.png',
    bg: '#faf9f6',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    desc: 'Cases, chargers, audio and everyday mobile essentials.',
    image: '/About-section/Accessories.png',
    bg: '#f5f1eb',
  },
  {
    id: 'electronics',
    name: 'Electronics',
    desc: 'Additional gadgets and lifestyle electronics by store format.',
    image: '/About-section/Electornics.png',
    bg: '#faf9f6',
  },
];

/* ── Circular scroll gallery ────────────────────────────────────────────────── */
function CircularGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const count = CATEGORIES.length;
  // radius of the circle in px — cards sit on this ring
  const RADIUS = 420;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Smooth spring on the scroll value so rotation feels physical
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Map 0→1 scroll progress to a full rotation (360°) so all 5 cards pass centre
  const rotateY = useTransform(smoothProgress, [0, 1], [0, -360]);

  return (
    /* Tall outer section — gives scroll room */
    <div ref={sectionRef} className={styles.cgOuter}>

      {/* Sticky viewport — stays fixed while user scrolls */}
      <div className={styles.cgSticky}>

        {/* Header — fades out as scroll starts */}
        <motion.div
          className={styles.cgHeader}
          style={{ opacity: useTransform(smoothProgress, [0, 0.12], [1, 0]) }}
        >
          <p className={styles.categoriesEyebrow}>What We Retail</p>
          <h2 className={styles.categoriesTitle}>
            Categories in every store<br />format.
          </h2>
          <p className={styles.cgHint}>Scroll to explore ↓</p>
        </motion.div>

        {/* 3-D scene */}
        <div className={styles.cgScene}>
          <motion.div
            className={styles.cgRing}
            style={{ rotateY }}
          >
            {CATEGORIES.map((cat, i) => {
              const angle = (360 / count) * i;
              return (
                <div
                  key={cat.id}
                  className={styles.cgFace}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                    background: cat.bg,
                  }}
                >
                  <div className={styles.cgImageWrap}>
                    <img src={cat.image} alt={cat.name} className={styles.cgImage} />
                  </div>
                  <div className={styles.cgBody}>
                    <h3 className={styles.cgName}>{cat.name}</h3>
                    <p className={styles.cgDesc}>{cat.desc}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll progress dots */}
        <div className={styles.cgDots} aria-hidden="true">
          {CATEGORIES.map((cat, i) => (
            <motion.span
              key={cat.id}
              className={styles.cgDot}
              style={{
                opacity: useTransform(
                  smoothProgress,
                  [(i / count) - 0.04, i / count, (i / count) + 0.04],
                  [0.3, 1, 0.3]
                ),
                scale: useTransform(
                  smoothProgress,
                  [(i / count) - 0.04, i / count, (i / count) + 0.04],
                  [1, 1.6, 1]
                ),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

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
            <img
              src="/page-section1/store-detail.jpg"
              alt="Inside a Mahalaxmi Telecom retail outlet"
              className={styles.storyImage}
            />

            <div className={styles.storyCopy}>
              <p className={styles.storyEyebrow}>Our Retail Philosophy</p>
              <h2 className={styles.storyTitle}>
                Retail you can walk<br />into, touch and trust.
              </h2>
              <p className={styles.storyBody}>
                Our stores give customers something an online listing never can — the chance
                to hold every device, test every camera and compare every display before
                spending a rupee. That physical confidence is what keeps customers choosing
                our stores and our partner franchisees thriving.
              </p>

              <ul className={styles.storyHighlights}>
                <li className={styles.storyHighlightItem}>
                  <span className={styles.storyHighlightTitle}>Physical-first retail</span>
                  <span className={styles.storyHighlightDesc}>Hands-on testing of every device, every visit, before you buy.</span>
                </li>
                <li className={styles.storyHighlightItem}>
                  <span className={styles.storyHighlightTitle}>Multi-city presence</span>
                  <span className={styles.storyHighlightDesc}>Stores across Metro, Mini Metro and Tier 1 to Tier 3 towns.</span>
                </li>
                <li className={styles.storyHighlightItem}>
                  <span className={styles.storyHighlightTitle}>Distribution-grade sourcing</span>
                  <span className={styles.storyHighlightDesc}>Two decades of brand relationships behind every shelf.</span>
                </li>
                <li className={styles.storyHighlightItem}>
                  <span className={styles.storyHighlightTitle}>Four brands, one standard</span>
                  <span className={styles.storyHighlightDesc}>Consistent quality and service across every store format.</span>
                </li>
              </ul>
            </div>
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

        {/* ── 4. Categories ─────────────────────────────────────────────── */}
        <section className={styles.categoriesSection}>
          <CircularGallery />
        </section>

        {/* ── 5. Values / CTA ───────────────────────────────────────────── */}
        <section className={styles.valuesSection}>
          <div className={styles.valuesContainer}>
            <div className={styles.valuesCopy}>
              <p className={styles.valuesEyebrow}>Why We Exist</p>
              <h2 className={styles.valuesTitle}>
                Mahalaxmi Telecom —<br />
                built for trust<br />
                <span className={styles.valuesTitleAccent}>and long-term value.</span>
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
