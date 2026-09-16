import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import BlurFade from '@/components/ui/BlurFade';
import { CallToAction, PageHero, SectionHeading, TextLink } from '@/components/Editorial';

export const metadata: Metadata = { title: 'About us | Mahalaxmi Telecom', description: 'Discover the experience and retail philosophy behind Mahalaxmi Telecom.' };

const principles = [
  ['Experience before purchase', 'Customers can hold, compare and test devices in store before making a decision.'],
  ['Guidance that earns trust', 'Our teams help people find what fits their needs, with honest advice and personal service.'],
  ['Strength behind the shelves', 'More than two decades of telecom distribution relationships support our sourcing.'],
];

export default function AboutPage() {
  return <SiteShell><main id="main-content">
    <PageHero dark title={<>A trusted name in<br /><em>mobile retail.</em></>} intro="Mahalaxmi Telecom Private Limited is a multi-brand retail group headquartered in Nandurbar, Maharashtra. Our stores bring customers closer to technology and create opportunities for local entrepreneurs." image="/page-section1/store-hero.jpg"><TextLink href="/our-story" light>Read our story</TextLink></PageHero>
    <section className="section-pad"><div className="wrap image-copy image-copy--wide"><BlurFade className="image-copy__media"><img src="/page-section1/hero-store.jpg" alt="Customers exploring devices inside a mobile retail store" loading="lazy" /></BlurFade><div className="image-copy__text"><SectionHeading title={<>Retail you can<br /><em>walk into and trust.</em></>} /><p>Our journey from distribution partner to retail chain began with a simple observation: people value the confidence that comes from seeing and trying a product for themselves. We bring that confidence to every store format.</p><p>Jagyasi Mobile, MM Mobile, Phone Café and Mobile Point each serve a different market while sharing the same commitment to sourcing and service.</p><TextLink href="/brands">Meet our retail formats</TextLink></div></div></section>
    <section className="number-band"><div className="wrap number-band__grid"><div><strong>20+</strong><span>years of telecom distribution experience</span></div><div><strong>4</strong><span>retail store formats</span></div><div><strong>10+</strong><span>national and global brand relationships</span></div><div><strong>200+</strong><span>stores in our Maharashtra vision</span></div></div></section>
    <section className="section-pad surface-warm"><div className="wrap"><SectionHeading title={<>One standard, at<br /><em>every touchpoint.</em></>} intro="The principles that connect our business to the people who walk into our stores." /><div className="principle-grid">{principles.map(([title, body]) => <div key={title}><h3>{title}</h3><p>{body}</p></div>)}</div></div></section>
    <CallToAction title={<>Grow with a name<br /><em>built on trust.</em></>} body="Explore our retail franchise model and speak with the team about your market." />
  </main></SiteShell>;
}
