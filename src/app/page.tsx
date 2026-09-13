'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SiteShell from '@/components/SiteShell';
import { InfiniteSlider } from '@/components/InfiniteSlider';
import ScrollFlythrough from '@/components/ScrollFlythrough';
import styles from './page.module.css';

const heroImages = [
  '/page-section1/hero-store.jpg',
  '/page-section1/products.jpg',
  '/page-section1/accessories.jpg',
  '/page-section1/store-detail.jpg',
  '/page-section1/store-hero.jpg',
];

export default function Home() {
  return <SiteShell transparentOnTop>
    <main id="main-content">
      <section id="hero" className={styles.heroSection}>
        <HeroBackground />
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Trusted Multi-Brand Mobile &amp; Accessory Retail Chain</p>
            <h1 className={styles.heroTitle}>Two Decades of Telecom Trust.<br /> <span className={styles.heroTitleAccent}>One Growing Retail Family.</span></h1>
            <p className={styles.heroSubtitle}>Mahalaxmi Telecom Private Limited is a Nandurbar-headquartered retail group built on more than twenty years of telecom distribution experience. Through four retail formats, Jagyasi Mobile, MM Mobile, Phone Cafe and Mobile Point, we bring the latest smartphones, tablets, wearables and accessories to customers across Maharashtra, while opening the same trusted brand to entrepreneurs through our Retail Store Chain Franchise Model.</p>
            <div className={styles.heroActions}>
              <a href="/franchise" className={`${styles.heroButton} ${styles.heroButtonPrimary}`}>Explore Franchise Opportunity</a>
              <a href="/brands" className={`${styles.heroButton} ${styles.heroButtonSecondary}`}>Explore Our Brands</a>
            </div>
            <p className={styles.heroTagline} id="hero-tagline">Build your future with our franchise</p>
          </div>
        </div>
        <div className={styles.heroStats} id="hero-stats"><div className={`container ${styles.heroStatsInner}`}>
          <div className={styles.statItem} id="stat-years"><span className={styles.statNumber}>20+</span><span className={styles.statLabel}>Years as a Trusted Distribution Partner</span></div>
          <div className={styles.statItem} id="stat-brands"><span className={styles.statNumber}>4</span><span className={styles.statLabel}>Retail Store Brands Under One Roof</span></div>
          <div className={styles.statItem} id="stat-partners"><span className={styles.statNumber}>10+</span><span className={styles.statLabel}>Authorized National &amp; Global Mobile Brands</span></div>
          <div className={styles.statItem} id="stat-target"><span className={styles.statNumber}>200+</span><span className={styles.statLabel}>Franchise Stores Planned Across Maharashtra</span></div>
        </div></div>
      </section>
      <section id="retail-categories" className={styles.categoriesSection}>
        <div className={styles.categoriesContainer}>
          <div className={styles.categoriesCopy}>
            <p className={styles.categoriesEyebrow}>What We Retail</p>
            <h2 className={styles.categoriesTitle}>Every category,<br />every leading brand.</h2>

            <div className={styles.categoryList}>
              <CategoryRow title="Smartphones">The latest devices from every major mobile brand, ready to test in-store.</CategoryRow>
              <CategoryRow title="Tablets">A curated range for work, study and entertainment.</CategoryRow>
              <CategoryRow title="Wearables">Smartwatches and fitness bands from trusted names.</CategoryRow>
              <CategoryRow title="Accessories">Cases, chargers, audio and everyday mobile essentials.</CategoryRow>
              <CategoryRow title="Electronics">Additional gadgets and lifestyle electronics by store format.</CategoryRow>
            </div>
          </div>

          <div className={styles.categoriesMedia}>
            {/* Col 1 — down (speed A) */}
            <InfiniteSlider direction="vertical" gap={8} duration={30}>
              {[
                { src: '/page-section1/products.jpg',     alt: 'Smartphones on display' },
                { src: '/page-section1/store-detail.jpg', alt: 'Store detail view' },
                { src: '/footer-store.jpg',               alt: 'Store exterior' },
                { src: '/page-section1/accessories.jpg',     alt: 'Smartphones on display' },
                { src: '/page-section1/store-hero.jpg', alt: 'Store detail view' },
                { src: '/storefront-reference.jpg',               alt: 'Store exterior' },
              ].map(({ src, alt }) => (
                <img key={src} src={src} alt={alt} className={styles.sliderImg} />
              ))}
            </InfiniteSlider>
            {/* Col 2 — up (speed B) */}
            <InfiniteSlider direction="vertical" reverse gap={8} duration={24}>
              {[
                { src: '/page-section1/accessories.jpg',  alt: 'Mobile accessories' },
                { src: '/page-section1/hero-store.jpg',   alt: 'Store interior' },
                { src: '/storefront-reference.jpg',       alt: 'Storefront' },
                { src: '/page-section1/products.jpg',   alt: 'Store interior' },
                { src: '/footer-store.jpg',       alt: 'Storefront' },
              ].map(({ src, alt }) => (
                <img key={src} src={src} alt={alt} className={styles.sliderImg} />
              ))}
            </InfiniteSlider>
            {/* Col 3 — down (speed A, same as col 1) */}
            <InfiniteSlider direction="vertical" gap={8} duration={30}>
              {[
                { src: '/page-section1/store-hero.jpg',   alt: 'Store hero shot' },
                { src: '/store_img.png',                  alt: 'Mahalaxmi storefront' },
                { src: '/jm-showroom-hero.png',           alt: 'JM showroom' },
                { src: '/page-section1/accessories.jpg',  alt: 'Mobile accessories' },
                { src: '/page-section1/hero-store.jpg',   alt: 'Store interior' },
              ].map(({ src, alt }) => (
                <img key={src} src={src} alt={alt} className={styles.sliderImg} />
              ))}
            </InfiniteSlider>
            {/* Col 4 — up (speed B, same as col 2) */}
            <InfiniteSlider direction="vertical" reverse gap={8} duration={24}>
              {[
                { src: '/page-section1/products.jpg',     alt: 'Products display' },
                { src: '/page-section1/store-detail.jpg', alt: 'Store detail' },
                { src: '/page-section1/accessories.jpg',  alt: 'Accessories' },
                { src: '/store_img.png',                  alt: 'Mahalaxmi storefront' },
                { src: '/jm-showroom-hero.png',           alt: 'JM showroom' },
              ].map(({ src, alt }) => (
                <img key={src} src={src} alt={alt} className={styles.sliderImg} />
              ))}
            </InfiniteSlider>
          </div>
        </div>
      </section>

      <section id="authorized-partners" className={styles.partnersSection}>
        <div className={styles.partnersIntro}>
          <p className={styles.partnersEyebrow}>Our Authorized Partners</p>
          <p className={styles.partnersDescription}>We proudly retail devices from the industry&apos;s most recognized names.</p>
        </div>

        <div className={styles.marqueeViewport} aria-label="Authorized mobile brand partners">
          <div className={styles.marqueeTrack}>
            <BrandGroup />
            <BrandGroup ariaHidden />
          </div>
        </div>
      </section>

      <section id="who-we-are" className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutMedia} id="about-zero-frame">
            {/* Zeroth frame — ScrollFlythrough takeover starts from this same asset, then grows to fullscreen over frames 1-5 */}
            <img src="/store_img.png" alt="Jagyasi Mobiles storefront powered by Mahalaxmi Telecom" />
          </div>

          <div className={styles.aboutCopy}>
            <p className={styles.aboutEyebrow}>Who We Are</p>
            <h2 className={styles.aboutTitle}>A physical-first retail chain for a digital lifestyle.</h2>
            <p className={styles.aboutIntro}>Customers test every device in person before they buy, guided by teams trained to give honest advice. Behind each shelf sits two decades of brand relationships built on the distribution side of the telecom industry.</p>

            <div className={styles.aboutHighlights}>
              <div className={styles.aboutHighlight}><h3>Physical-first retail</h3><p>Hands-on testing of every device, every visit, before you buy.</p></div>
              <div className={styles.aboutHighlight}><h3>Multi-city presence</h3><p>Stores across Metro, Mini Metro and Tier 1 to Tier 3 towns.</p></div>
              <div className={styles.aboutHighlight}><h3>Distribution-grade sourcing</h3><p>Two decades of brand relationships behind every shelf.</p></div>
              <div className={styles.aboutHighlight}><h3>Four brands, one standard</h3><p>Consistent quality and service across every store format.</p></div>
            </div>
          </div>
        </div>
        <ScrollFlythrough takeover />
      </section>
    </main>
    <StoreOutletBrandsSection />
    <WhyPartnerSection />
    <VisionAndOpportunitySection />
  </SiteShell>;
}

const partnerBrands = [
  ['nothing', 'Nothing'],
  ['noise', 'Noise'],
  ['apple', 'Apple'],
  ['samsung', 'Samsung'],
  ['xiaomi', 'Xiaomi'],
  ['vivo', 'Vivo'],
  ['oppo', 'Oppo'],
  ['motorola', 'Motorola'],
  ['realme', 'Realme'],
];

const partnerBenefits = [
  ['Wider Product Range', 'Access an extensive range of smartphones, tablets, wearables and accessories across every leading brand.'],
  ['Higher Margins, No Targets', 'Earn stronger margins with no sales targets, so you can focus on steady, sustainable growth.'],
  ['Multiple Finance Options', 'Offer customers easy, on-the-spot financing through multiple partners and schemes.'],
  ['Marketing & Store Launch Support', 'Get hands-on support with tangible marketing activity and a complete store launch process.'],
  ['Bulk Purchasing Power', 'Benefit from our bulk purchasing power, which brings you products at more affordable prices.'],
  ['Built-In Brand Trust', 'Launch under a brand customers already know, backed by years of retail credibility.'],
];

const outletBrands = [
  {
    id: 'jm',
    initials: 'JM',
    name: 'Jagyasi Mobile',
    description: 'Our flagship, company-operated format focused on full-range mobile retail and premium in-store experience.',
    image: '/page-section1/hero-store.jpg',
  },
  {
    id: 'mm',
    initials: 'MM',
    name: 'MM Mobile',
    description: 'A standard-format store built for consistent, everyday mobile and accessory retail.',
    image: '/page-section1/store-detail.jpg',
  },
  {
    id: 'pc',
    initials: 'PC',
    name: 'Phone Cafe',
    description: 'A compact, neighbourhood-friendly format for accessible mobile shopping.',
    image: '/page-section1/store-hero.jpg',
  },
  {
    id: 'mp',
    initials: 'MP',
    name: 'Mobile Point',
    description: 'A focused retail point for devices and accessories in emerging markets.',
    image: '/page-section1/products.jpg',
  },
];

const OUTLET_AUTO_PLAY = 3200;
const OUTLET_ITEM_HEIGHT = 68;

function wrapIndex(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

function StoreOutletBrandsSection() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const count = outletBrands.length;
  const currentIndex = ((step % count) + count) % count;

  const nextStep = useCallback(() => setStep((s) => s + 1), []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(nextStep, OUTLET_AUTO_PLAY);
    return () => clearInterval(id);
  }, [nextStep, isPaused]);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + count) % count;
    if (diff > 0) setStep((s) => s + diff);
  };

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    let d = diff;
    if (diff > count / 2) d -= count;
    if (diff < -count / 2) d += count;
    if (d === 0) return 'active';
    if (d === -1) return 'prev';
    if (d === 1) return 'next';
    return 'hidden';
  };

  return (
    <section id="store-outlet-brands" className={styles.outletBrandsSection}>
      <div className={styles.outletBrandsContainer}>

        {/* Intro header */}
        <div className={styles.outletBrandsIntro}>
          <p className={styles.outletBrandsEyebrow}>Our Store Outlet Brands</p>
          <h2 className={styles.outletBrandsTitle}>One Company, Four Retail Formats</h2>
          <p className={styles.outletBrandsDescription}>
            A network of physical stores specializing in smartphones, tablets, wearables and accessories.
            Each brand carries its own identity in the market while running on the same Mahalaxmi Telecom
            standards of sourcing, service and support.
          </p>
        </div>

        {/* Carousel */}
        <div className={styles.outletCarousel}>

          {/* Left — scrolling chip selector */}
          <div className={styles.outletCarouselLeft}>
            <div className={styles.outletChipFadeTop} aria-hidden="true" />
            <div className={styles.outletChipFadeBottom} aria-hidden="true" />
            <div className={styles.outletChipTrack}>
              {outletBrands.map((brand, index) => {
                const isActive = index === currentIndex;
                const distance = index - currentIndex;
                const wrapped = wrapIndex(-(count / 2), count / 2, distance);

                return (
                  <motion.div
                    key={brand.id}
                    style={{ height: OUTLET_ITEM_HEIGHT, position: 'absolute', width: '100%' }}
                    animate={{
                      y: wrapped * OUTLET_ITEM_HEIGHT,
                      opacity: 1 - Math.abs(wrapped) * 0.28,
                    }}
                    transition={{ type: 'spring', stiffness: 90, damping: 22, mass: 1 }}
                    className={styles.outletChipRow}
                  >
                    <button
                      onClick={() => handleChipClick(index)}
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`${styles.outletChip} ${isActive ? styles.outletChipActive : styles.outletChipIdle}`}
                    >
                      {/* Initials badge */}
                      <span className={`${styles.outletChipBadge} ${isActive ? styles.outletChipBadgeActive : styles.outletChipBadgeIdle}`}>
                        {brand.initials}
                      </span>
                      <span className={styles.outletChipLabel}>{brand.name}</span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right — animated image cards */}
          <div className={styles.outletCarouselRight}>
            <div className={styles.outletCardStage}>
              {outletBrands.map((brand, index) => {
                const status = getCardStatus(index);
                const isActive = status === 'active';
                const isPrev  = status === 'prev';
                const isNext  = status === 'next';

                return (
                  <motion.div
                    key={brand.id}
                    initial={false}
                    animate={{
                      x:           isActive ? 0 : isPrev ? -110 : isNext ? 110 : 0,
                      scale:       isActive ? 1 : (isPrev || isNext) ? 0.84 : 0.7,
                      opacity:     isActive ? 1 : (isPrev || isNext) ? 0.38 : 0,
                      rotate:      isPrev ? -3 : isNext ? 3 : 0,
                      zIndex:      isActive ? 20 : (isPrev || isNext) ? 10 : 0,
                    }}
                    style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                    transition={{ type: 'spring', stiffness: 260, damping: 25, mass: 0.8 }}
                    className={styles.outletCard}
                  >
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className={`${styles.outletCardImg} ${isActive ? styles.outletCardImgActive : styles.outletCardImgDim}`}
                    />

                    {/* Active overlay */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className={styles.outletCardOverlay}
                        >
                          <span className={styles.outletCardTag}>
                            {index + 1} · {brand.name}
                          </span>
                          <p className={styles.outletCardDesc}>{brand.description}</p>
                          <a href="/brands" className={styles.outletCardLink}>
                            View Brand <span aria-hidden="true">→</span>
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Live dot */}
                    <div className={`${styles.outletCardLive} ${isActive ? styles.outletCardLiveVisible : styles.outletCardLiveHidden}`}>
                      <span className={styles.outletCardLiveDot} />
                      <span className={styles.outletCardLiveLabel}>Our Brand</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function WhyPartnerSection() {
  const [visibleBenefits, setVisibleBenefits] = useState<number[]>([]);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('[data-partner-benefit]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number((entry.target as HTMLElement).dataset.partnerBenefit);
          setVisibleBenefits((current) => current.includes(index) ? current : [...current, index]);
        }
      });
    }, { threshold: 0.2 });

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-partner-home" className={styles.whyPartnerSection}>
      <div className={styles.whyPartnerContainer}>
        <div className={styles.whyPartnerIntro}>
          <div className={styles.whyPartnerSticky}>
            <p className={styles.whyPartnerEyebrow}>Why Partner With Us</p>
            <h2 className={styles.whyPartnerTitle}>What We Offer Our Franchise Partners</h2>
            <a href="/why-partner" className={styles.whyPartnerLink}>Why Partner With Us <span aria-hidden="true">-&gt;</span></a>
          </div>
        </div>

        <div className={styles.whyPartnerList}>
          {partnerBenefits.map(([title, description], index) => (
            <article
              className={`${styles.whyPartnerItem} ${visibleBenefits.includes(index) ? styles.whyPartnerItemVisible : ''}`}
              data-partner-benefit={index}
              key={title}
            >
              <span className={styles.whyPartnerNumber}>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisionAndOpportunitySection() {
  return (
    <>
      <section id="vision-home" className={styles.visionHomeSection}>
        <div className={styles.visionHomeContainer}>
          <p className={styles.visionHomeEyebrow}>Vision</p>
          <h2 className={styles.visionHomeTitle}>To become the most trusted multi-brand mobile and accessory retail chain in <em>India.</em></h2>
          <p className={styles.visionHomeDescription}>Offering innovative products, seamless shopping experiences and lasting customer relationships, across every store we open and every partner we work with.</p>
          <a href="/vision-mission" className={styles.visionHomeLink}>Vision &amp; Mission <span aria-hidden="true">-&gt;</span></a>
        </div>
      </section>
    </>
  );
}

function BrandGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className={styles.brandGroup} aria-hidden={ariaHidden}>
      {partnerBrands.map(([brand, label]) => (
        <div className={styles.brandItem} key={`${brand}-${ariaHidden ? 'copy' : 'original'}`}>
          <span className={styles.brandName}>{label}</span>
        </div>
      ))}
      <span className={styles.brandMore}>&amp; Many More</span>
    </div>
  );
}

function CategoryRow({ title, children }: { title: string; children: string }) {
  return (
    <div className={styles.categoryRow}>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

function HeroBackground() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % heroImages.length);
    }, 8_000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.heroBg} id="hero-bg" aria-hidden="true">
      {heroImages.map((image, imageIndex) => (
        <img
          key={image}
          src={image}
          alt=""
          className={imageIndex === activeIndex ? styles.heroImageActive : styles.heroImage}
        />
      ))}
    </div>
  );
}
