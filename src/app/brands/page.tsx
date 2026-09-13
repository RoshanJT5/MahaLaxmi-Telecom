'use client';
import SiteShell from '@/components/SiteShell';
import styles from './brands.module.css';
import { CircularTestimonials } from '@/components/ui/circular-testimonials';
import { ContainerAnimated, ContainerScroll, ContainerStagger, ContainerSticky, GalleryCol, GalleryContainer } from '@/components/blocks/animated-gallery';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const STORE_TESTIMONIALS = [
  { name: 'Jagyasi Mobile', role: 'Flagship Format — JM', message: 'Our flagship, company-operated format focused on full-range mobile retail and premium in-store experience.', image: '/jm-showroom-hero.png', backgroundImage: '/page-section1/store-detail.jpg' },
  { name: 'MM Mobile', role: 'Standard Format — MM', message: 'A standard-format store built for consistent, everyday mobile and accessory retail.', image: '/page-section1/store-detail.jpg', backgroundImage: '/page-section1/hero-store.jpg' },
  { name: 'Phone Café', role: 'Compact Format — PC', message: 'A compact, neighbourhood-friendly format for accessible mobile shopping.', image: '/page-section1/hero-store.jpg', backgroundImage: '/store_img.png' },
  { name: 'Mobile Point', role: 'Emerging-Market Format — MP', message: 'A focused retail point for devices and accessories in emerging markets.', image: '/store_img.png', backgroundImage: '/jm-showroom-hero.png' },
];

const BRAND_CARDS_1 = ["/brands/Brands-Card/apple-card.svg", "/brands/Brands-Card/samsung-card.svg", "/brands/Brands-Card/xiaomi-card.svg"];
const BRAND_CARDS_2 = ["/brands/Brands-Card/oppo-card.svg", "/brands/Brands-Card/motorola-card.svg", "/brands/Brands-Card/vivo-card.svg"];
const BRAND_CARDS_3 = ["/brands/Brands-Card/noise-card.svg", "/brands/Brands-Card/realme-card.svg", "/brands/Brands-Card/nothing-card.svg"];

const CATEGORIES_GALLERY = [
  { id: 'smartphones', name: 'Smartphones', desc: 'The latest devices from every major mobile brand, ready to test in-store.', image: '/About-section/Smartphones.png', bg: '#faf9f6' },
  { id: 'tablets', name: 'Tablets', desc: 'A curated range for work, study and entertainment.', image: '/About-section/Tablet.png', bg: '#f5f1eb' },
  { id: 'wearables', name: 'Wearables', desc: 'Smartwatches and fitness bands from trusted names.', image: '/About-section/Watches.png', bg: '#faf9f6' },
  { id: 'accessories', name: 'Accessories', desc: 'Cases, chargers, audio and everyday mobile essentials.', image: '/About-section/Accessories.png', bg: '#f5f1eb' },
  { id: 'electronics', name: 'Electronics', desc: 'Additional gadgets and lifestyle electronics by store format.', image: '/About-section/Electornics.png', bg: '#faf9f6' },
];

function CircularGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const count = CATEGORIES_GALLERY.length;
  const RADIUS = 420;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });
  const rotateY = useTransform(smoothProgress, [0, 1], [0, -360]);
  return (
    <div ref={sectionRef} className={styles.cgOuter}>
      <div className={styles.cgSticky}>
        <motion.div className={styles.cgHeader} style={{ opacity: useTransform(smoothProgress, [0, 0.12], [1, 0]) }}>
          <p className={styles.categoriesEyebrow}>What We Retail</p>
          <h2 className={styles.categoriesTitle}>Categories in every store<br />format.</h2>
          <p className={styles.cgHint}>Scroll to explore ↓</p>
        </motion.div>
        <div className={styles.cgScene}>
          <motion.div className={styles.cgRing} style={{ rotateY }}>
            {CATEGORIES_GALLERY.map((cat, i) => {
              const angle = (360 / count) * i;
              return (
                <div key={cat.id} className={styles.cgFace} style={{ transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`, background: cat.bg }}>
                  <div className={styles.cgImageWrap}><img src={cat.image} alt={cat.name} className={styles.cgImage} /></div>
                  <div className={styles.cgBody}><h3 className={styles.cgName}>{cat.name}</h3><p className={styles.cgDesc}>{cat.desc}</p></div>
                </div>
              );
            })}
          </motion.div>
        </div>
        <div className={styles.cgDots} aria-hidden="true">
          {CATEGORIES_GALLERY.map((cat, i) => (
            <motion.span key={cat.id} className={styles.cgDot} style={{ opacity: useTransform(smoothProgress, [(i / count) - 0.04, i / count, (i / count) + 0.04], [0.3, 1, 0.3]), scale: useTransform(smoothProgress, [(i / count) - 0.04, i / count, (i / count) + 0.04], [1, 1.6, 1]) }} />
          ))}
        </div>
      </div>
    </div>
  );
}

const CATEGORIES = [
  { name: 'Smartphones', desc: 'The latest devices from every major mobile brand, ready to test in-store.' },
  { name: 'Tablets', desc: 'A curated range for work, study and entertainment.' },
  { name: 'Wearables', desc: 'Smartwatches and fitness bands from trusted names.' },
  { name: 'Accessories', desc: 'Cases, chargers, audio and everyday mobile essentials.' },
  { name: 'Electronics', desc: 'Additional gadgets and lifestyle electronics by store format.' },
];

export default function BrandsPage() {
  return (
    <SiteShell>
      <main id="main-content">
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <p className={styles.heroEyebrow}>Our Brands</p>
            <h1 className={styles.heroTitle}>Four retail formats, <span className={styles.heroTitleGold}>one standard</span> of trust.</h1>
            <p className={styles.heroIntro}>Each brand is built for a different market and store size, and every one of them carries the same sourcing strength, service quality and brand credibility.</p>
          </div>
        </section>

        <CircularTestimonials testimonials={STORE_TESTIMONIALS} autoplay={true} />

        <section className={`relative ${styles.partnersSection}`} aria-label="Authorized partners" style={{background:'#e5e0d8',paddingBottom:0,borderBottom:'1px solid #ece7dd', display:'grid', justifyContent:'center', alignItems:'center'}}>
          <ContainerStagger className={`${styles.partnersContainer} relative z-[9999] place-self-center text-center`} style={{paddingBottom: 28, paddingTop: 48, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <ContainerAnimated>
              <p className={styles.partnersEyebrow}>Our Authorized Partners</p>
            </ContainerAnimated>
            <ContainerAnimated>
              <h2 className="font-serif text-4xl font-extralight md:text-5xl mt-2 text-[#2d2d2d]" style={{ lineHeight: 1.2, fontSize: '3rem' }}>
                We proudly retail devices from the <br/>
                <span className="font-serif font-extralight text-indigo-600">
                  industry&apos;s most recognized names.
                </span>
              </h2>
            </ContainerAnimated>
            <ContainerAnimated className="my-4">
              <p className="leading-normal tracking-tight text-muted-foreground mt-4" style={{ color: '#666', fontSize: '1.125rem', width: '100vh', margin: '0 auto' }}>
                Every brand is built for a different market and store size, and every one of them carries the same sourcing strength, service quality and brand credibility.
              </p>
            </ContainerAnimated>
          </ContainerStagger>

          <ContainerScroll className="relative h-[350vh]">
            <ContainerSticky className="h-svh">
              <GalleryContainer className="grid-cols-3 max-w-[1100px] w-full px-6" >
                <GalleryCol yRange={["-5%", "5%"]} style={{ gap: '10px' }}>
                  {BRAND_CARDS_1.map((s,i)=><img key={i} src={s} alt="brand card" className="w-full h-auto rounded-xl object-contain bg-[#e5e0d8] border border-[#d8d2c8] shadow-sm" style={{aspectRatio:'400/260'}} />)}
                </GalleryCol>
                <GalleryCol yRange={["0%", "0%"]} style={{ gap: '10px' }}>
                  {BRAND_CARDS_2.map((s,i)=><img key={i} src={s} alt="brand card" className="w-full h-auto rounded-xl object-contain bg-[#e5e0d8] border border-[#d8d2c8] shadow-sm" style={{aspectRatio:'400/310'}} />)}
                </GalleryCol>
                <GalleryCol yRange={["5%", "-5%"]} style={{ gap: '10px' }}>
                  {BRAND_CARDS_3.map((s,i)=><img key={i} src={s} alt="brand card" className="w-full h-auto rounded-xl object-contain bg-[#e5e0d8] border border-[#d8d2c8] shadow-sm" style={{aspectRatio:'400/265'}} />)}
                </GalleryCol>
              </GalleryContainer>
            </ContainerSticky>
          </ContainerScroll>
        </section>

        <section className={styles.categoriesSection}>
          <CircularGallery />
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.ctaContainer}>
            <p className={styles.ctaEyebrow}>Next Step</p>
            <h2 className={styles.ctaTitle}>Open a store under one of our trusted formats.</h2>
            <p className={styles.ctaIntro}>Choose the format that fits your market, from a compact Phone Café to a flagship Jagyasi Mobile store.</p>
            <div className={styles.ctaActions}>
              <a href="/franchise" className={styles.ctaPrimary}>Explore Franchise <span aria-hidden="true">→</span></a>
              <a href="/contact" className={styles.ctaSecondary}>Contact Us <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
