'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', message: '' });
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Franchise enquiry from ${form.name} — ${form.city}`);
    const body = encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nCity / town: ${form.city}\n\nMessage:\n${form.message || 'Please contact me about the franchise opportunity.'}`);
    window.location.href = `mailto:mahalaxmitelecom26@gmail.com?subject=${subject}&body=${body}`;
  };
  return <form className="contact-form" onSubmit={onSubmit}>
    <div className="contact-form__row"><label>Full name<input required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label><label>Phone number<input required type="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label></div>
    <div className="contact-form__row"><label>Email address<input required type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label><label>City or town<input required autoComplete="address-level2" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></label></div>
    <label>Your plans <span>(optional)</span><textarea rows={5} placeholder="Store size, location, timeline…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></label>
    <div className="contact-form__bottom"><button className="action-link" type="submit">Prepare enquiry email <ArrowUpRight size={17} /></button><p>This opens your email app with your details. Send the message there to complete your enquiry.</p></div>
  </form>;
}
