import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import { CallToAction, PageHero, SectionHeading } from '@/components/Editorial';

export const metadata: Metadata = { title: 'Our story | Mahalaxmi Telecom', description: 'From telecom distribution to a growing retail network in Maharashtra.' };

const chapters = [
  { title: 'The foundation', body: 'For more than twenty years we have worked as a distribution partner to recognized mobile brands, building lasting relationships with retailers across the market.' },
  { title: 'The insight', body: 'Working closely with retail partners showed us what helps a store grow: dependable products, good margins, practical support and the trust of customers who return.' },
  { title: 'The retail chapter', body: 'We turned that experience into four physical store formats, each designed for a different market and backed by the same sourcing standards and service culture.' },
  { title: 'The path ahead', body: 'Our Retail Store Chain Franchise Model invites entrepreneurs to build with us. Our ambition is a network of more than 200 premium stores across Maharashtra.' },
];

export default function OurStoryPage() {
  return <SiteShell><main id="main-content">
    <PageHero title={<>Two decades of trust.<br /><em>One growing story.</em></>} intro="Our journey moves from telecom distribution to a retail chain, and from experience to an opportunity shared with entrepreneurs." />
    <section className="story-photo"><img src="/page-section1/store-hero.jpg" alt="Customers browsing in a mobile retail store" /></section>
    <section className="section-pad"><div className="wrap story-layout"><div className="story-layout__heading"><SectionHeading title={<>A story written<br /><em>one relationship at a time.</em></>} /></div><div className="story-timeline">{chapters.map((chapter, index) => <article key={chapter.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{chapter.title}</h3><p>{chapter.body}</p></div></article>)}</div></div></section>
    <CallToAction title={<>Your chapter starts<br /><em>with a store.</em></>} body="Join a network built by people who understand what retailers need." />
  </main></SiteShell>;
}
