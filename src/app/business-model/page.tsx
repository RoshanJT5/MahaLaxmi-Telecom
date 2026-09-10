import SiteShell from '@/components/SiteShell';

export default function BusinessModelPage() {
  return <SiteShell><main id="main-content"><section id="business-model" className="model-section"><div className="container model-container">
    <div className="section-heading" id="model-heading"><p className="section-eyebrow">FOFO &amp; COCO</p><h2 className="section-title">Our Business Model</h2></div>
    <div className="model-grid" id="model-grid"><article className="model-card model-card-fofo" id="model-fofo"><h3 className="model-card-title">FOFO</h3><p className="model-card-subtitle">Franchise Owned, Franchise Operated</p><p className="model-card-text">Local entrepreneurs own and run the store under the Mahalaxmi Telecom Private Limited brand, backed by our systems, sourcing and support network.</p><ul className="model-list"><li>Local ownership and investment</li><li>Faster multi-city expansion</li><li>Entrepreneur-driven growth</li></ul></article><article className="model-card model-card-coco" id="model-coco"><h3 className="model-card-title">COCO</h3><p className="model-card-subtitle">Company Owned, Company Operated</p><p className="model-card-text">Stores are directly owned and managed by Mahalaxmi Telecom Private Limited, ensuring full control over quality, service and customer experience, currently operating under the Jagyasi Mobile brand.</p><ul className="model-list"><li>Full quality control</li><li>Consistent brand experience</li><li>Direct management oversight</li></ul></article></div>
    <p className="model-summary-banner" id="model-summary-banner">Mahalaxmi Telecom follows both FOFO and COCO models, powering all four brands: Jagyasi Mobile, MM Mobile, Phone Cafe and Mobile Point.</p>
  </div></section></main></SiteShell>;
}
