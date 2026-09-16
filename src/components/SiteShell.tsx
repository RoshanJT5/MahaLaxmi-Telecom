'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/brands', label: 'Our brands' },
  { href: '/business-model', label: 'Business model' },
  { href: '/franchise', label: 'Franchise' },
  { href: '/contact', label: 'Contact' },
];

const companyLinks = [
  { href: '/our-story', label: 'Our story' },
  { href: '/leadership', label: 'Leadership' },
  { href: '/director-message', label: "Director's message" },
  { href: '/vision-mission', label: 'Vision & mission' },
];

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigateToTop = () => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', open);
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('menu-is-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="site-header__inner wrap">
        <Link href="/" scroll={false} onNavigate={navigateToTop} className="brand" aria-label="Mahalaxmi Telecom, home">
          <img src="/mahalaxmi-logo-bg.png" alt="" width="54" height="54" />
          <span className="brand__wordmark"><strong>MAHALAXMI</strong><small>TELECOM PRIVATE LIMITED</small></span>
        </Link>
        <nav className={`site-nav${open ? ' is-open' : ''}`} id="site-navigation" aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} href={link.href} scroll={false} onNavigate={navigateToTop} className={pathname === link.href ? 'is-active' : ''} aria-current={pathname === link.href ? 'page' : undefined}>{link.label}</Link>)}
          <Link className="site-nav__mobile-cta" href="/contact" scroll={false} onNavigate={navigateToTop}>Enquire <ArrowUpRight size={16} /></Link>
        </nav>
        <Link className="header-cta" href="/contact" scroll={false} onNavigate={navigateToTop}>Enquire <ArrowUpRight size={15} strokeWidth={1.7} /></Link>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="site-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X size={25} strokeWidth={1.5} /> : <Menu size={25} strokeWidth={1.5} />}</button>
      </div>
    </header>
    {children}
    <footer className="site-footer">
      <div className="wrap footer-main">
        <div className="footer-intro">
          <span className="footer-small">Mahalaxmi Telecom Private Limited</span>
          <h2>Better retail begins<br />with <em>trust.</em></h2>
          <p>Multi-brand mobile and accessory retail, built on more than twenty years of telecom distribution experience in Maharashtra.</p>
          <Link href="/contact" scroll={false} onNavigate={navigateToTop} className="text-link text-link--light">Start a conversation <ArrowUpRight size={18} /></Link>
        </div>
        <div className="footer-links">
          <div><h3>Explore</h3>{links.slice(1).map((link) => <Link key={link.href} href={link.href} scroll={false} onNavigate={navigateToTop}>{link.label}</Link>)}<Link href="/faq" scroll={false} onNavigate={navigateToTop}>Franchise FAQs</Link></div>
          <div><h3>Company</h3>{companyLinks.map((link) => <Link key={link.href} href={link.href} scroll={false} onNavigate={navigateToTop}>{link.label}</Link>)}</div>
          <div><h3>Visit & contact</h3><address>Shop No. 420, Subhash Chowk,<br />Mangal Gate Police Chowki,<br />Nandurbar, Maharashtra 425412</address><a href="tel:+919604836936">+91 96048 36936</a><a href="mailto:mahalaxmitelecom26@gmail.com">mahalaxmitelecom26@gmail.com</a><a href="https://maps.app.goo.gl/9Vkjrp3gLZQ9iVSD7" target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight size={14} /></a></div>
        </div>
      </div>
      <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Mahalaxmi Telecom Private Limited</span><span>Nandurbar · Maharashtra · India</span></div>
    </footer>
  </>;
}
