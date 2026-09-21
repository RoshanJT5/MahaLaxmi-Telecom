'use client';

import { useState } from 'react';
import SiteShell from '@/components/SiteShell';
import styles from './contact.module.css';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', message: '' });
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const set = (key: keyof typeof form) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    setSubmitted(false);
    setErrorMessage('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!consent || submitting) return;

    setSubmitting(true);
    setErrorMessage('');

    const scriptUrl =
      process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
      'https://script.google.com/macros/s/AKfycbxf8X8r15VHtw46PONkqBRgATQ3im0ATCk6exkE6h3-ekZhbrfo-07-1m4kU7ocsfslpA/exec';

    try {
      // Google Apps Script requires text/plain or no-cors with fetch to avoid preflight CORS redirection blocks
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toISOString(),
        }),
      });

      setSubmitted(true);
      setForm({ name: '', phone: '', email: '', city: '', message: '' });
      setConsent(false);
    } catch {
      setErrorMessage('Unable to submit your enquiry at this moment. Please try again or reach out directly via phone or email.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SiteShell>
      <main id="main-content">
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>Contact</p>
            <h1 className={styles.heroTitle}>Let&apos;s talk about <span>your store.</span></h1>
            <p className={styles.heroDesc}>Tell us about your city, your space and your ambition — we&apos;ll take it from there.</p>
          </div>
        </section>

        <section className={styles.reachSection}>
          <div className={styles.container}>
            <div className={styles.reachLayout}>
              <div className={styles.areaTitle}>
                <p className={styles.eyebrow}>Reach us</p>
                <h2 className={styles.reachTitle}>Mahalaxmi Telecom Private Limited</h2>
              </div>

              <div className={`${styles.formHead} ${styles.areaFormHead}`}>
                <p className={styles.eyebrow}>Franchise Enquiry</p>
                <h3 className={styles.formTitle}>Send us your details</h3>
                <p className={styles.formDesc}>Fill in the form and our franchise team will get back to you.</p>
              </div>

              <div className={`${styles.grid} ${styles.areaGrid}`}>
                <div className={styles.cell}>
                  <p className={styles.cellLabel}>Phone</p>
                  <a className={styles.cellValue} href="tel:+919604836936">+91 96048 36936</a>
                </div>
                <div className={styles.cell}>
                  <p className={styles.cellLabel}>Email</p>
                  <a className={styles.cellValue} href="mailto:mahalaxmitelecom26@gmail.com">mahalaxmitelecom26@gmail.com</a>
                </div>
                <div className={styles.cell}>
                  <p className={styles.cellLabel}>Website</p>
                  <a className={styles.cellValue} href="https://www.mahalaxmitelecom.in">mahalaxmitelecom.in</a>
                </div>
                <div className={styles.cell}>
                  <p className={styles.cellLabel}>Office</p>
                  <p className={styles.cellValue}>Shop No. 420, Subhash Chowk, Mangal Gate Police Chowki, Nandurbar, Maharashtra 425412</p>
                </div>
              </div>

                <form className={`${styles.formCard} ${styles.areaForm}`} onSubmit={handleSubmit}>
                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel} htmlFor="enquiry-name">Full Name</label>
                      <input id="enquiry-name" type="text" required autoComplete="name" value={form.name} onChange={set('name')} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel} htmlFor="enquiry-phone">Phone</label>
                      <input id="enquiry-phone" type="tel" required autoComplete="tel" value={form.phone} onChange={set('phone')} />
                    </div>
                  </div>
                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel} htmlFor="enquiry-email">Email</label>
                      <input id="enquiry-email" type="email" required autoComplete="email" value={form.email} onChange={set('email')} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel} htmlFor="enquiry-city">City / Town</label>
                      <input id="enquiry-city" type="text" required autoComplete="address-level2" value={form.city} onChange={set('city')} />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="enquiry-message">Your Message</label>
                    <textarea id="enquiry-message" rows={5} placeholder="Store size, location, timeline..." value={form.message} onChange={set('message')} />
                  </div>

                  <label className={styles.consentBox}>
                    <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
                    <span>I agree to the <a href="#" onClick={(event) => event.preventDefault()}>Terms &amp; Conditions</a> and <a href="#" onClick={(event) => event.preventDefault()}>Privacy Policy</a>, and I consent to Mahalaxmi Telecom Private Limited processing my personal data under the Digital Personal Data Protection Act, 2023 to respond to this enquiry.</span>
                  </label>

                  <div className={styles.submitRow}>
                    <button type="submit" disabled={!consent || submitting} className={styles.submitBtn}>
                      {submitting ? 'Submitting...' : 'Submit Enquiry'} <span aria-hidden="true">→</span>
                    </button>
                    {!consent && !submitted && !submitting && (
                      <p className={styles.hint}>Please accept the Terms &amp; Privacy Policy to continue.</p>
                    )}
                    {submitted && (
                      <p className={styles.success} role="status">Thank you — your enquiry has been received. Our franchise team will get back to you shortly.</p>
                    )}
                    {errorMessage && (
                      <p className={styles.error} role="alert">{errorMessage}</p>
                    )}
                  </div>
                </form>
            </div>
          </div>
        </section>

        <section className={styles.mapSection} aria-label="Store location map">
          <div className={styles.container}>
            <p className={styles.eyebrow}>Find Us</p>
            <div className={styles.mapHead}>
              <h2 className={styles.mapTitle}>Visit our store</h2>
              <a
                className={styles.directionsLink}
                href="https://maps.app.goo.gl/9Vkjrp3gLZQ9iVSD7"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className={styles.mapFrame}>
              <iframe
                title="Jagyasi Mobiles store location, Subhash Chowk, Nandurbar"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1857.787331257527!2d74.2426414!3d21.367266!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdf09fbfe8da33d%3A0x61cca7027352fe55!2sJagyasi%20Mobiles%20%7C%20Nandurbar!5e0!3m2!1sen!2sin!4v1789464555986!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
