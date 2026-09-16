import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import ContactForm from '@/components/ContactForm';
import { PageHero, SectionHeading } from '@/components/Editorial';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = { title: 'Contact | Mahalaxmi Telecom', description: 'Contact Mahalaxmi Telecom in Nandurbar or enquire about a retail franchise.' };

export default function ContactPage() {
  return <SiteShell><main id="main-content">
    <PageHero title={<>Let&apos;s talk about<br /><em>your next step.</em></>} intro="Whether you are exploring a store franchise or want to reach our team, we would be glad to hear from you." />
    <section className="section-pad contact-section"><div className="wrap contact-layout"><div className="contact-details"><SectionHeading title={<>Start a<br /><em>conversation.</em></>} /><p>Tell us about your city, your space and your ambition. Our team can help you find the next step.</p><div className="contact-method"><span>Call us</span><a href="tel:+919604836936">+91 96048 36936</a></div><div className="contact-method"><span>Email us</span><a href="mailto:mahalaxmitelecom26@gmail.com">mahalaxmitelecom26@gmail.com</a></div><div className="contact-method"><span>Visit us</span><address>Shop No. 420, Subhash Chowk,<br />Mangal Gate Police Chowki,<br />Nandurbar, Maharashtra 425412</address><a className="directions-link" href="https://maps.app.goo.gl/9Vkjrp3gLZQ9iVSD7" target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight size={16} /></a></div></div><div className="contact-form-panel"><h2>Franchise enquiry</h2><p>Share a few details and we&apos;ll prepare an email for our team.</p><ContactForm /></div></div></section>
    <section className="contact-map"><iframe title="Jagyasi Mobiles location in Nandurbar" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1857.787331257527!2d74.2426414!3d21.367266!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdf09fbfe8da33d%3A0x61cca7027352fe55!2sJagyasi%20Mobiles%20%7C%20Nandurbar!5e0!3m2!1sen!2sin!4v1789464555986!5m2!1sen!2sin" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></section>
  </main></SiteShell>;
}
