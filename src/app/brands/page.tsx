'use client';
import SiteShell from '@/components/SiteShell';
import styles from './brands.module.css';
import { CircularTestimonials } from '@/components/ui/circular-testimonials';
import { CoverflowCarousel, type CoverflowSlide } from '@/components/ui/CoverflowCarousel';
import Image from 'next/image';
import { useState } from 'react';

const STORE_TESTIMONIALS = [
  { name: 'Jagyasi Mobile', role: 'Flagship Format — JM', message: 'Our flagship, company-operated format focused on full-range mobile retail and premium in-store experience.', image: '/4-stores/Jagyasi%20mobiles.png' },
  { name: 'MM Mobile', role: 'Standard Format — MM', message: 'A standard-format store built for consistent, everyday mobile and accessory retail.', image: '/4-stores/MM%20mobiles.jpeg' },
  { name: 'Phone Café', role: 'Compact Format — PC', message: 'A compact, neighbourhood-friendly format for accessible mobile shopping.', image: '/4-stores/PhoneCafe.png' },
  { name: 'Mobile Point', role: 'Emerging-Market Format — MP', message: 'A focused retail point for devices and accessories in emerging markets.', image: '/4-stores/Mobile%20Point.jpeg' },
];

const PARTNER_BRANDS: CoverflowSlide[] = [
  { name: 'Apple', logo: '/brands/Brands-Card/apple.svg', color: '#111111', kind: 'svg', symbol: true },
  { name: 'Samsung', logo: '/brands/Brands-Card/samsung.svg', color: '#1428a0', kind: 'svg' },
  { name: 'Xiaomi', logo: '/brands/Brands-Card/xiaomi.svg', color: '#ff6900', kind: 'svg', symbol: true },
  { name: 'OPPO', logo: '/brands/Brands-Card/oppo.svg', color: '#006b3f', kind: 'svg' },
  { name: 'Motorola', logo: '/brands/Brands-Card/motorola.svg', color: '#111111', kind: 'svg', symbol: true },
  { name: 'vivo', logo: '/brands/Brands-Card/vivo.svg', color: '#415fff', kind: 'svg' },
  { name: 'Noise', logo: '/new-cards/Noise.jpg.webp', kind: 'image', treatment: 'invert-blend' },
  { name: 'realme', logo: '/new-cards/Realme-1.jpg.webp', kind: 'image', treatment: 'banner' },
  { name: 'Nothing', logo: '/new-cards/Nothing-1.jpg.webp', kind: 'image', treatment: 'blend' },
];

const CATEGORIES = [
  { id: 'smartphones', name: 'Smartphones', desc: 'The latest devices, ready to experience in person.', image: '/About-section/Smartphones.png' },
  { id: 'tablets', name: 'Tablets', desc: 'For work, learning and everything between.', image: '/About-section/Tablet.png' },
  { id: 'wearables', name: 'Wearables', desc: 'Connected technology that moves with you.', image: '/About-section/Watches.png' },
  { id: 'accessories', name: 'Accessories', desc: 'The essentials that complete every device.', image: '/About-section/Accessories.png' },
  { id: 'electronics', name: 'Electronics', desc: 'Smart devices and lifestyle technology for every space.', image: '/About-section/Electornics.png' },
];

export default function BrandsPage() {
  const [showAllCategories, setShowAllCategories] = useState(false);
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

        <div id="store-formats">
          <CircularTestimonials testimonials={STORE_TESTIMONIALS} autoplay={true} />
        </div>

        <section id="brand-partners" className={styles.partnersSection} aria-labelledby="partners-title">
          <div className={styles.partnersContainer}>
            <p className={styles.partnersEyebrow}>Our Authorized Partners</p>
            <h2 className={styles.partnersTitle} id="partners-title">Trusted names, <span>closer to home.</span></h2>
            <p className={styles.partnersIntro}>Explore the mobile and technology brands available across our retail network.</p>
          </div>
          <CoverflowCarousel slides={PARTNER_BRANDS} />
        </section>

        <section id="retail-categories" className={styles.categoriesSection} aria-labelledby="categories-title">
          <div className={styles.categoriesContainer}>
            <div className={styles.categoriesHeader}>
              <div>
                <h2 id="categories-title" className={styles.categoriesTitle}>Technology for<br /><em>everyday life.</em></h2>
                <p className={styles.categoriesIntro}>Discover devices and connected essentials across our retail formats.</p>
              </div>
              <button
                type="button"
                className={styles.categoriesToggle}
                aria-expanded={showAllCategories}
                aria-controls="category-grid"
                onClick={() => setShowAllCategories((value) => !value)}
              >
                {showAllCategories ? 'Show fewer categories' : 'View every category'}
                <span aria-hidden="true">{showAllCategories ? '↖' : '↗'}</span>
              </button>
            </div>
            <div id="category-grid" className={styles.categoriesGrid}>
              {CATEGORIES.slice(0, showAllCategories ? CATEGORIES.length : 4).map((category, index) => (
                <article key={category.id} className={`${styles.categoryCard}${index === 4 ? ` ${styles.categoryCardExtra}` : ''}`}>
                  <div className={styles.categoryImageWrap}>
                    <Image src={category.image} alt="" fill sizes={index === 4 ? '(max-width: 700px) 100vw, 50vw' : '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw'} className={styles.categoryImage} />
                  </div>
                  <div className={styles.categoryBody}>
                    <h3>{category.name}</h3>
                    <p>{category.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
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
