import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import { CallToAction, PageHero } from '@/components/Editorial';

export const metadata: Metadata = { title: "Director's message | Mahalaxmi Telecom", description: 'A message from Pradip Jagyasi on relationships, retail and the next chapter.' };

export default function DirectorMessagePage() {
  return <SiteShell><main id="main-content">
    <PageHero title={<>Relationships are<br /><em>the foundation.</em></>} intro="A message from Pradip Jagyasi, CEO and Co-Founder, on the relationships that shaped Mahalaxmi Telecom." />
    <section className="section-pad director-layout"><div className="wrap"><div className="director-quote"><span aria-hidden="true">“</span><blockquote>When I look back at the last twenty years, what stays with me is the hundreds of retail partners who trusted us early, stayed with us through slow seasons and grew alongside us.</blockquote></div><div className="director-copy"><p>That relationship is the real foundation of Mahalaxmi Telecom. We did not start as a retail chain. We started as a distribution partner, learning the telecom business from the supply side and understanding what a retailer needs before they even ask for it.</p><p>That grounding is why Jagyasi Mobile, MM Mobile, Phone Café and Mobile Point are built the way they are: physical stores where a customer can make a confident choice, and where a franchise partner can work with a model tested in the market.</p><p>Our decision to open a Retail Store Chain Franchise Model came from watching capable, hardworking retail partners look for an opportunity with a trusted brand, fair margins, no unrealistic sales targets and honest, ongoing support.</p><p>Our goal over the coming years is more than 200 premium stores across Maharashtra, run by partners who see this as their own business. If you are looking for a retail opportunity built on two decades of telecom experience, I would be glad to have you build your future with us.</p><div className="director-signature"><strong>Pradip Jagyasi</strong><span>CEO & Co-Founder, Mahalaxmi Telecom Private Limited</span></div></div></div></section>
    <CallToAction title={<>Let&apos;s build the<br /><em>next chapter.</em></>} body="Learn more about the opportunity and share your plans with our team." />
  </main></SiteShell>;
}
