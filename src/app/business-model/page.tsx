import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import { CallToAction, PageHero, SectionHeading, TextLink } from '@/components/Editorial';

export const metadata: Metadata = { title: 'Business model | Mahalaxmi Telecom', description: 'How our multi-brand, multi-format retail network works.' };

const ecosystem = [
  { title: 'Devices', body: 'Smartphones and tablets from leading national and global brands.', image: '/page-section1/products.jpg' },
  { title: 'Connected essentials', body: 'Cases, chargers, audio, wearables and everyday accessories.', image: '/page-section1/store-detail.jpg' },
  { title: 'In-store service', body: 'Hands-on comparison, finance options and support after purchase.', image: '/page-section1/store-hero.jpg' },
];

export default function BusinessModelPage() {
  return <SiteShell><main id="main-content">
    <PageHero dark image="/page-section1/hero-store.jpg" title={<>A retail model<br /><em>built to connect.</em></>} intro="Mahalaxmi Telecom Private Limited brings multiple brands, store formats and operating models together under one consistent standard." />
    <section className="section-pad"><div className="wrap editorial-two-col"><SectionHeading title={<>One company.<br /><em>Many storefronts.</em></>} /><div className="editorial-two-col__body"><p className="large-copy">Mahalaxmi Telecom is the company behind a growing network of physical mobile and accessory retail stores.</p><p>Jagyasi Mobile, MM Mobile, Phone Café and Mobile Point are formats designed for different markets. Within them, customers discover leading device brands, practical advice and products they can experience first hand.</p><TextLink href="/brands">Explore the retail formats</TextLink></div></div></section>
    <section className="section-pad surface-warm"><div className="wrap"><SectionHeading title={<>Two pathways.<br /><em>One retail standard.</em></>} intro="Company and franchise stores share the same commitment to the customer experience." /><div className="model-pair"><article><span>COCO</span><h3>Company owned.<br />Company operated.</h3><p>Stores owned and managed directly by Mahalaxmi Telecom, establishing the operating standard for our network.</p><ul><li>Direct management oversight</li><li>Consistent store experience</li><li>Full operational control</li></ul></article><article><span>FOFO</span><h3>Franchise owned.<br />Franchise operated.</h3><p>Locally owned stores run by entrepreneurs, supported by our sourcing, systems and brand.</p><ul><li>Local ownership and investment</li><li>Entrepreneur-led growth</li><li>Central guidance and support</li></ul></article></div></div></section>
    <section className="section-pad"><div className="wrap"><SectionHeading title={<>The ecosystem<br /><em>behind every visit.</em></>} /><div className="ecosystem-grid">{ecosystem.map((item) => <article key={item.title}><img src={item.image} alt="" loading="lazy" /><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></div></section>
    <section className="section-pad model-close"><div className="wrap"><h2>Central experience.<br /><em>Local entrepreneurship.</em></h2><p>We bring together sourcing, operations, brand and marketing support so partners can focus on serving customers in their communities.</p></div></section>
    <CallToAction title={<>See where your<br /><em>business can grow.</em></>} body="Explore the franchise plan and speak to us about a store in your market." />
  </main></SiteShell>;
}
