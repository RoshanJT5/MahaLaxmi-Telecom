'use client';

import { useEffect, useRef, useState } from 'react';
import SiteShell from '@/components/SiteShell';
import styles from './about.module.css';

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
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

/* ── Stat card ─────────────────────────────────────────────────────────────── */
function StatCard({
  target,
  suffix = '',
  label,
}: {
  target: number;
  suffix?: string;
  label: string;
}) {
  const { count, ref } = useCountUp(target, 1600);
  return (
    <div className={styles.statCard} ref={ref}>
      <span className={styles.statNumber}>
        {count}{suffix}
      </span>
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
          <div className={styles.categoriesContainer}>
            <p className={styles.categoriesEyebrow}>What We Retail</p>
            <h2 className={styles.categoriesTitle}>
              Categories in every store<br />format.
            </h2>

            <div className={styles.categoriesGrid}>
              <div className={styles.categoryCard}>
                <h3 className={styles.categoryName}>Smartphones</h3>
                <p className={styles.categoryDesc}>The latest devices from every major mobile brand, ready to test in-store.</p>
              </div>
              <div className={styles.categoryCard}>
                <h3 className={styles.categoryName}>Tablets</h3>
                <p className={styles.categoryDesc}>A curated range for work, study and entertainment.</p>
              </div>
              <div className={styles.categoryCard}>
                <h3 className={styles.categoryName}>Wearables</h3>
                <p className={styles.categoryDesc}>Smartwatches and fitness bands from trusted names.</p>
              </div>
              <div className={styles.categoryCard}>
                <h3 className={styles.categoryName}>Accessories</h3>
                <p className={styles.categoryDesc}>Cases, chargers, audio and everyday mobile essentials.</p>
              </div>
              <div className={styles.categoryCard}>
                <h3 className={styles.categoryName}>Electronics</h3>
                <p className={styles.categoryDesc}>Additional gadgets and lifestyle electronics by store format.</p>
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
