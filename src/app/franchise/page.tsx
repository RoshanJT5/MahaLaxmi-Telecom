import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import { ActionLink, CallToAction, PageHero, SectionHeading, TextLink } from '@/components/Editorial';

export const metadata: Metadata = { title: 'Franchise opportunity | Mahalaxmi Telecom', description: 'Explore a Mahalaxmi Telecom retail franchise, store formats, support and indicative investment.' };

const benefits = [
  ['Wider product range', 'Access smartphones, tablets, wearables and accessories across leading brands.'],
  ['Higher margins, no targets', 'Focus on steady, sustainable growth without imposed sales targets.'],
  ['Multiple finance options', 'Offer customers financing through multiple partners and schemes.'],
  ['Marketing and launch support', 'Get practical support with the store launch process and local marketing.'],
  ['Bulk purchasing power', 'Benefit from our established sourcing and distribution relationships.'],
  ['Built-in brand trust', 'Build under a name backed by years of telecom experience.'],
];
const steps = [
  ['Choose a location', 'Identify a prime site with strong visibility and foot traffic.'],
  ['Select a format', 'Match a store concept and space to the needs of your market.'],
  ['Set up the store', 'Plan the fit-out, stock and opening with our team.'],
  ['Launch and grow', 'Open with marketing support and ongoing operational guidance.'],
];

export default function FranchisePage() {
  return <SiteShell><main id="main-content">
    <PageHero dark image="/jm-showroom-hero.png" title={<>Build your future<br /><em>with our franchise.</em></>} intro="A physical retail opportunity for entrepreneurs, shaped by more than twenty years in telecom distribution."><div className="button-row"><ActionLink href="/contact" light>Enquire now</ActionLink><TextLink href="/faq" light>Read FAQs</TextLink></div></PageHero>
    <section className="section-pad"><div className="wrap franchise-intro"><div><SectionHeading title={<>Your store.<br /><em>A stronger foundation.</em></>} /></div><p>Our Retail Store Chain Franchise Model combines local ownership with a trusted retail identity, product access and practical support. We work with partners who want to create a store their community can rely on.</p></div></section>
    <section className="section-pad surface-warm"><div className="wrap"><SectionHeading title={<>What we bring<br /><em>to the partnership.</em></>} /><div className="benefit-list benefit-list--grid">{benefits.map(([title, body]) => <div key={title}><h3>{title}</h3><p>{body}</p></div>)}</div></div></section>
    <section className="section-pad"><div className="wrap investment-layout"><div><SectionHeading title={<>The shape of<br /><em>your investment.</em></>} /><p>Store size, format and location determine the right plan. Our team can discuss specifics with you directly.</p><TextLink href="/contact">Discuss a location</TextLink></div><div className="investment-facts"><div><strong>300–1,000</strong><span>sq ft indicative store size</span></div><div><strong>₹15–50 lakh</strong><span>indicative investment by format</span></div><div><strong>2–3</strong><span>employees per typical store</span></div><p>Previously stated payback guidance is 12–15 months, depending on sales volume and location. This is indicative, not a guaranteed return; request the current plan and assumptions from our team.</p></div></div></section>
    <section className="section-pad franchise-process"><div className="wrap"><SectionHeading title={<>From first conversation<br /><em>to opening day.</em></>} /><div className="process-grid">{steps.map(([title, body], index) => <div key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{body}</p></div>)}</div><div className="process-photo"><img src="/page-section1/store-hero.jpg" alt="Customers exploring devices in store" loading="lazy" /></div></div></section>
    <CallToAction title={<>Let&apos;s talk about<br /><em>your store.</em></>} body="Tell us your city, preferred format and location. We will help you explore the next step." primary="Start an enquiry" primaryHref="/contact" />
  </main></SiteShell>;
}
