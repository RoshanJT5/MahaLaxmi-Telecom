import SiteShell from '@/components/SiteShell';
import styles from './business-model.module.css';

const FORMATS = ['Jagyasi Mobile', 'MM Mobile', 'Phone Cafe', 'Mobile Point'];
const RETAIL_BRANDS = ['Apple', 'Samsung', 'vivo', 'OPPO', 'Xiaomi'];

const OPERATE = [
  {
    tag: 'COCO',
    title: 'Company Owned & Company Operated',
    quote: 'Stores owned, managed and operated directly by Mahalaxmi Telecom.',
    points: ['Full operational control', 'Consistent customer experience', 'Direct management oversight'],
    dark: true,
  },
  {
    tag: 'FOFO',
    title: 'Franchise Owned & Franchise Operated',
    quote: 'Entrepreneur-led stores operated under the Mahalaxmi Telecom ecosystem.',
    points: ['Local ownership & investment', 'Faster market expansion', 'Entrepreneur-led growth'],
    dark: false,
  },
];

const ECOSYSTEM = [
  {
    title: 'Mobiles',
    sub: 'Smartphones & Devices',
    brands: 'Apple • Samsung • vivo • OPPO • Xiaomi & more',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=70&auto=format&fit=crop',
    alt: 'Smartphones on display',
  },
  {
    title: 'Accessories',
    sub: 'Connected Essentials',
    brands: 'Cases • Chargers • Audio • Wearables',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=70&auto=format&fit=crop',
    alt: 'Audio accessories',
  },
  {
    title: 'Electronics',
    sub: 'Beyond Smartphones',
    brands: 'TVs • Laptops • Tablets • Consumer Electronics',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=70&auto=format&fit=crop',
    alt: 'Consumer electronics',
  },
];

const CUSTOMER_STEPS = [
  { title: 'Choice', desc: 'Leading brands and full ranges to compare in person.' },
  { title: 'Value', desc: 'Fair prices, finance options and honest advice.' },
  { title: 'Trust', desc: 'Two decades of relationships behind every shelf.' },
];

export default function BusinessModelPage() {
  return (
    <SiteShell>
      <main id="main-content">
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>Our Business Model</p>
            <h1 className={styles.heroTitle}>
              A multi-brand, <span>multi-chain</span> retail company.
            </h1>
            <p className={styles.heroDesc}>
              Mahalaxmi Telecom Pvt. Ltd. is a multi-brand consumer electronics retail company
              operating through a growing network of company-owned and franchise-operated stores.
            </p>
            <p className={styles.heroTags}>COCO • FOFO • Multi-Brand • Multi-Format</p>
          </div>
        </section>

        <section className={styles.block} aria-label="What we are">
          <div className={styles.container}>
            <p className={styles.secLabel}>01 — What we are</p>
            <div className={styles.pillars}>
              <article className={styles.pillar}>
                <h2 className={styles.pillarTitle}>Multi-Brand Retail</h2>
                <p className={styles.pillarDesc}>Leading national and global brands under one roof.</p>
                <div className={styles.chips}>
                  {RETAIL_BRANDS.map((brand) => (
                    <span className={styles.chip} key={brand}>{brand}</span>
                  ))}
                </div>
              </article>
              <article className={styles.pillar}>
                <h2 className={styles.pillarTitle}>Multi-Chain Network</h2>
                <p className={styles.pillarDesc}>One company. Multiple retail formats. One consistent standard.</p>
                <div className={styles.chips}>
                  {FORMATS.map((format) => (
                    <span className={styles.chip} key={format}>{format}</span>
                  ))}
                </div>
              </article>
            </div>
            <div className={styles.hierarchy} aria-label="Brand hierarchy">
              <div className={styles.hStep}>
                <p className={`${styles.hName} ${styles.hNameSerif}`}>Mahalaxmi Telecom Pvt. Ltd.</p>
                <p className={styles.hRole}>The Company</p>
              </div>
              <span className={styles.hArrow} aria-hidden="true">→</span>
              <div className={styles.hStep}>
                <p className={styles.hName}>Jagyasi Mobiles</p>
                <p className={styles.hRole}>Retail &amp; Franchise Brand</p>
              </div>
              <span className={styles.hArrow} aria-hidden="true">→</span>
              <div className={styles.hStep}>
                <p className={styles.hName}>COCO / FOFO Stores</p>
                <p className={styles.hRole}>The Store Network</p>
              </div>
              <span className={styles.hArrow} aria-hidden="true">→</span>
              <div className={styles.hStep}>
                <p className={styles.hName}>Apple • Samsung • vivo • OPPO</p>
                <p className={styles.hRole}>Brands You Retail</p>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.block} ${styles.blockTint}`} aria-label="How we operate">
          <div className={styles.container}>
            <p className={styles.secLabel}>02 — How we operate</p>
            <h2 className={styles.secTitle}>Two pathways. One retail standard.</h2>
            <div className={styles.operateGrid}>
              {OPERATE.map((card) => (
                <article
                  className={`${styles.operateCard} ${card.dark ? styles.operateDark : ''}`}
                  key={card.tag}
                >
                  <p className={styles.operateTag}>{card.tag}</p>
                  <h3 className={styles.operateTitle}>{card.title}</h3>
                  <p className={styles.operateQuote}>{card.quote}</p>
                  <ul className={styles.ticks}>
                    {card.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className={styles.standardBand}>
              <p className={styles.standardEyebrow}>One Brand Standard</p>
              <p className={styles.standardLine}>
                Ownership may differ. <em>The customer experience does not.</em>
              </p>
            </div>
          </div>
        </section>

        <section className={styles.block} aria-label="What we offer">
          <div className={styles.container}>
            <p className={styles.secLabel}>03 — What we offer</p>
            <h2 className={styles.secTitle}>Our retail ecosystem.</h2>
            <div className={styles.ecoGrid}>
              {ECOSYSTEM.map((card) => (
                <article className={styles.ecoCard} key={card.title}>
                  <div className={styles.ecoMedia}>
                    <img src={card.image} alt={card.alt} loading="lazy" />
                  </div>
                  <div className={styles.ecoBody}>
                    <h3 className={styles.ecoTitle}>{card.title}</h3>
                    <p className={styles.ecoSub}>{card.sub}</p>
                    <p className={styles.ecoBrands}>{card.brands}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.block} ${styles.blockDark}`} aria-label="How we scale">
          <div className={styles.container}>
            <p className={styles.secLabel}>04 — How we scale</p>
            <h2 className={styles.secTitleLight}>Central expertise, local entrepreneurship.</h2>
            <div className={styles.scaleGrid}>
              <article className={styles.scaleCard}>
                <h3>Company-Owned Stores</h3>
                <p>Flagships run directly by Mahalaxmi Telecom — the standard-setters.</p>
              </article>
              <article className={styles.scaleCard}>
                <h3>Franchise-Owned Stores</h3>
                <p>Entrepreneur-run stores carrying the standard into every market.</p>
              </article>
            </div>
            <p className={styles.sharedLabel}>Shared Systems</p>
            <div className={styles.chipsCenter}>
              {['Sourcing', 'Operations', 'Brand & Marketing'].map((item) => (
                <span className={styles.chipDark} key={item}>{item}</span>
              ))}
            </div>
            <p className={styles.scaleClose}>
              We combine central expertise with local entrepreneurship to build a scalable retail network.
            </p>
          </div>
        </section>

        <section className={styles.block} aria-label="Built around the customer">
          <div className={styles.container}>
            <p className={styles.secLabel}>05 — What connects it all</p>
            <h2 className={styles.secTitle}>Built around the customer.</h2>
            <p className={styles.customerCopy}>
              From choosing the right device to financing, accessories and after-sales support, our
              retail network is designed around a seamless customer experience.
            </p>
            <div className={styles.customerSteps}>
              {CUSTOMER_STEPS.map((step, index) => (
                <div className={styles.customerStep} key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  {index < CUSTOMER_STEPS.length - 1 && (
                    <span className={styles.stepArrow} aria-hidden="true">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection} aria-label="Franchise call to action">
          <div className={styles.ctaBox}>
            <p className={styles.secLabel}>06 — Your move</p>
            <h2 className={styles.ctaTitle}>Build your future with our franchise.</h2>
            <div className={styles.ctaActions}>
              <a href="/franchise" className={`${styles.btn} ${styles.btnPrimary}`}>
                Explore Franchise <span aria-hidden="true">→</span>
              </a>
              <a href="/brands" className={`${styles.btn} ${styles.btnGhost}`}>
                Our Brands <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
