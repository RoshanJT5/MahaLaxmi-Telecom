import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import { CallToAction, PageHero } from '@/components/Editorial';

export const metadata: Metadata = { title: 'Franchise FAQs | Mahalaxmi Telecom', description: 'Answers to common questions about the Mahalaxmi Telecom franchise opportunity.' };

const questions = [
  ['How much investment do I need?', 'The indicative investment is approximately ₹15 lakh to ₹50 lakh, depending on the store format and size. Stores may range from 300 to 1,000 sq ft. Ask our team for a current, location-specific plan.'],
  ['How long could it take to recover the investment?', 'Previous guidance is 12 to 15 months, depending on location, footfall and sales volume. This is an estimate, not a guaranteed return. Discuss the assumptions and current figures with our team before making an investment decision.'],
  ['How many staff members does a store need?', 'A typical store operates with two to three employees, depending on format and footfall.'],
  ['Are there fixed sales targets?', 'Our franchise model does not impose fixed sales targets. It is designed to support sustainable growth at a pace appropriate to each market.'],
  ['What support do partners receive?', 'Support includes marketing activity, store launch guidance, bulk sourcing benefits, customer financing tie-ups and ongoing operational guidance.'],
  ['What kind of location works best?', 'A prime location with strong visibility and foot traffic gives a new store the best opportunity to grow. The right site depends on your market and chosen format.'],
];

export default function FaqPage() {
  return <SiteShell><main id="main-content">
    <PageHero title={<>Good questions.<br /><em>Clear answers.</em></>} intro="What prospective partners ask us most often before opening their first store." />
    <section className="section-pad"><div className="wrap faq-layout"><div><h2>What you need<br /><em>to know.</em></h2><p>Every location and format is different. Our team can walk you through the details for your market.</p></div><div className="faq-list">{questions.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{question}</span><span className="faq-list__plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>
    <CallToAction title={<>Still have<br /><em>a question?</em></>} body="Speak with our team about the plan, market and store format you have in mind." primary="Contact us" primaryHref="/contact" />
  </main></SiteShell>;
}
