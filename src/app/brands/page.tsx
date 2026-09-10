import SiteShell from '@/components/SiteShell';

export default function BrandsPage() {
  const brands = [['jagyasi','JM','Jagyasi Mobile','Our flagship, company-operated format focused on full-range mobile retail and premium in-store experience.'],['mmmobile','MM','MM Mobile','A standard-format store built for consistent, everyday mobile and accessory retail.'],['phonecafe','PC','Phone Cafe','A compact, neighbourhood-friendly format for accessible mobile shopping.'],['mobilepoint','MP','Mobile Point','A focused retail point for devices and accessories in emerging markets.']];
  const partners = ['apple','samsung','xiaomi','vivo','oppo','motorola','realme','nothing','noise'];
  return <SiteShell><main id="main-content"><section id="brands" className="brands-section"><div className="container brands-container">
    <div className="section-heading" id="brands-heading"><p className="section-eyebrow">Our Store Outlet Brands</p><h2 className="section-title">One Company, Four Retail Formats</h2><p className="section-intro">A network of physical stores specializing in smartphones, tablets, wearables and accessories. Each brand carries its own identity in the market while running on the same Mahalaxmi Telecom standards of sourcing, service and support.</p></div>
    <div className="brand-grid" id="brand-grid">{brands.map(([id, initials, name, description]) => <article className="brand-card" id={`brand-${id}`} key={id}><span className="brand-initials">{initials}</span><h3 className="brand-name-title">{name}</h3><p className="brand-desc">{description}</p></article>)}</div>
    <div className="authorized-partners" id="authorized-partners"><h3 className="subsection-title">Our Authorized Partners</h3><p className="subsection-intro">We proudly retail devices from the industry&apos;s most recognized names.</p><ul className="partner-logo-list" id="partner-logo-list">{partners.map((partner) => <li className="partner-logo-item" key={partner}><img src={`/brands/${partner}.svg`} alt={partner} className="partner-logo" /></li>)}<li className="partner-logo-item partner-logo-more"><span>&amp; Many More</span></li></ul></div>
  </div></section></main></SiteShell>;
}
