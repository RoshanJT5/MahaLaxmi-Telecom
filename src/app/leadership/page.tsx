import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import { CallToAction, PageHero, SectionHeading, TextLink } from '@/components/Editorial';

export const metadata: Metadata = { title: 'Leadership | Mahalaxmi Telecom', description: 'Meet the directors behind Mahalaxmi Telecom and its retail network.' };

const directors = [
  { name: 'Pradip Jagyasi', role: 'CEO & Co-Founder', bio: 'Leads the company vision, strategy, brand partnerships and franchise expansion. His telecom distribution experience informs the sourcing and service standards behind every store.' },
  { name: 'Gautam Jagyasi', role: 'Managing Director', bio: 'Leads day-to-day operations across the network, from store rollout and staffing to the operating rhythm that keeps each format consistent.' },
  { name: 'Nilesh Wadhvani', role: 'Whole-Time Director', bio: 'Oversees finance, commercial discipline and sourcing relationships that support the product range across the network.' },
  { name: 'Kapil Jagyasi', role: 'Whole-Time Director', bio: 'Leads brand partnerships and marketing, including product launches and visibility for the growing retail network.' },
  { name: 'Vijay Jagyasi', role: 'Whole-Time Director', bio: 'Focuses on franchise partner success, onboarding and practical support from site selection through opening and beyond.' },
];

export default function LeadershipPage() {
  return <SiteShell><main id="main-content">
    <PageHero title={<>The people behind<br /><em>every store.</em></>} intro="A team shaped by two decades of telecom distribution and focused on building a trusted retail network." />
    <section className="section-pad"><div className="wrap"><SectionHeading title={<>Shared experience.<br /><em>Shared ambition.</em></>} intro="Meet the directors guiding Mahalaxmi Telecom's next chapter." /><div className="leadership-list">{directors.map((director, index) => <details key={director.name}><summary><span className="leadership-list__number">{String(index + 1).padStart(2, '0')}</span><span className="leadership-list__name">{director.name}</span><span className="leadership-list__role">{director.role}</span><span className="leadership-list__plus" aria-hidden="true">+</span></summary><p>{director.bio}</p></details>)}</div></div></section>
    <section className="section-pad leadership-message"><div className="wrap editorial-two-col"><SectionHeading title={<>From the<br /><em>director&apos;s desk.</em></>} /><div className="editorial-two-col__body"><p className="large-copy">“Relationships are the real foundation of Mahalaxmi Telecom.”</p><p>Pradip Jagyasi reflects on the retail partners who shaped the company and the opportunity ahead.</p><TextLink href="/director-message">Read the message</TextLink></div></div></section>
    <CallToAction title={<>Grow with<br /><em>our network.</em></>} body="Explore a retail opportunity supported by experienced people and a trusted name." />
  </main></SiteShell>;
}
