import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import { CallToAction, PageHero, SectionHeading } from '@/components/Editorial';

export const metadata: Metadata = { title: 'Vision & mission | Mahalaxmi Telecom', description: 'Our vision for trusted, accessible mobile and accessory retail.' };

const pillars = [
  { title: 'Seamless connectivity', body: 'Reliable access to the digital world for every customer.' },
  { title: 'Expert guidance', body: 'Honest, knowledgeable advice at every store visit.' },
  { title: 'Accessible value', body: 'Smart technology, service and support at fair prices.' },
];

export default function VisionMissionPage() {
  return <SiteShell><main id="main-content">
    <PageHero dark image="/jm-showroom-hero.png" title={<>One team.<br /><em>One network.</em></>} intro="Our vision is to become the most trusted multi-brand mobile and accessory retail chain in India." />
    <section className="section-pad"><div className="wrap editorial-two-col"><SectionHeading title={<>The vision<br /><em>guiding us.</em></>} /><div className="editorial-two-col__body"><p className="large-copy">To make innovative products and seamless shopping experiences available through stores people know and trust.</p><p>We are building lasting customer relationships across every store we open and every partner we work with.</p></div></div></section>
    <section className="section-pad surface-warm"><div className="wrap editorial-two-col"><SectionHeading title={<>The mission<br /><em>behind it.</em></>} /><div className="editorial-two-col__body"><p className="large-copy">To empower individuals and communities by making connectivity, smart technology and expert guidance accessible to all.</p><p>Our promise is excellent service, honest advice and long-term support at affordable prices.</p><div className="pillar-list">{pillars.map((pillar) => <div key={pillar.title}><h3>{pillar.title}</h3><p>{pillar.body}</p></div>)}</div></div></div></section>
    <CallToAction title={<>Build the future<br /><em>with us.</em></>} body="See how our retail model brings our vision to more communities." primary="Our business model" primaryHref="/business-model" />
  </main></SiteShell>;
}
