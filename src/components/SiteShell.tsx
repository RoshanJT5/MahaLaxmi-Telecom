 'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type SiteShellProps = {
  children: ReactNode;
  transparentOnTop?: boolean;
};

type NavChild = {
  href: string;
  label: string;
};

type NavEntry = {
  href: string;
  label: string;
  children?: NavChild[];
};

const navigation: NavEntry[] = [
  {
    href: '/about',
    label: 'Company',
    children: [
      { href: '/about', label: 'About us' },
      { href: '/our-story', label: 'Our story' },
      { href: '/director-message', label: "Director's message" },
      { href: '/leadership', label: 'Leadership' },
      { href: '/vision-mission', label: 'Vision & mission' },
    ],
  },
  {
    href: '/brands',
    label: 'Brands',
    children: [
      { href: '/brands', label: 'Our brands' },
      { href: '/brands#brand-partners', label: 'Authorized partners' },
    ],
  },
  {
    href: '/franchise',
    label: 'Franchise',
    children: [
      { href: '/franchise', label: 'Franchise opportunity' },
      { href: '/#why-partner-home', label: 'Why partner with us' },
      { href: '/business-model', label: 'Business model' },
      { href: '/franchise', label: 'Store franchise plan' },
      { href: '/faq', label: 'Franchise FAQs' },
    ],
  },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  ['instagram.png', 'Instagram'],
  ['youtube.png', 'YouTube'],
  ['linkedin.png', 'LinkedIn'],
  ['whatsapp.png', 'WhatsApp'],
  ['twitter.png', 'Twitter'],
] as const;

export default function SiteShell({ children, transparentOnTop = false }: SiteShellProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!transparentOnTop) {
      return;
    }

    const updateScrollState = () => setHasScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });

    return () => window.removeEventListener('scroll', updateScrollState);
  }, [transparentOnTop]);

  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMenu(null);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openMenu]);

  const headerClassName = [
    'site-top-header',
    transparentOnTop ? 'navbar-transparent' : '',
    hasScrolled ? 'navbar-scrolled' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <a id="page-top" />

      <header id="site-top-header" className={headerClassName}>
        <div className="navbar-inner">
          <a href="/" className="brand-logo" id="brand-logo" aria-label="Mahalaxmi Telecom home">
            <span className="brand-name">
              <img src="/mahalaxmi-logo-bg.png" alt="" className="brand-logo-mark" />
              <span className="brand-name-main">Mahalaxmi Telecom</span>
              <span className="brand-name-sub">Private Limited</span>
            </span>
          </a>

          <nav className="main-nav" id="main-nav" aria-label="Main navigation" ref={navRef}>
            <button className="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} type="button" onClick={() => setMenuOpen((open) => !open)}>
              <span className="nav-toggle-bar" />
              <span className="nav-toggle-bar" />
              <span className="nav-toggle-bar" />
            </button>
            <ul className={`nav-list${menuOpen ? ' nav-open' : ''}`} id="nav-list">
              {navigation.map((entry) => (
                <li
                  className={`nav-item${entry.children ? ' has-children' : ''}${openMenu === entry.label ? ' menu-open' : ''}`}
                  key={entry.label}
                >
                  {entry.children ? (
                    <button
                      type="button"
                      className="nav-link nav-parent"
                      aria-haspopup="true"
                      aria-expanded={openMenu === entry.label}
                      onClick={() => {
                        setOpenMenu((current) => (current === entry.label ? null : entry.label));
                        setMenuOpen(true);
                      }}
                    >
                      {entry.label}
                    </button>
                  ) : (
                    <a href={entry.href} className="nav-link" onClick={() => { setMenuOpen(false); setOpenMenu(null); }}>
                      {entry.label}
                    </a>
                  )}
                  {entry.children && (
                    <ul className="submenu" aria-label={`${entry.label} submenu`}>
                      {entry.children.map((child) => (
                        <li className="submenu-item" key={child.label}>
                          <a
                            href={child.href}
                            className="submenu-link"
                            onClick={() => { setMenuOpen(false); setOpenMenu(null); }}
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <a href="/franchise" className="nav-cta-btn" aria-label="Enquiry">
            <img src="/icons/call.svg" alt="" className="nav-cta-icon" aria-hidden="true" />
            <span>Enquiry</span>
          </a>
        </div>
      </header>

      {children}

      <section className="franchise-opportunity-banner" aria-labelledby="franchise-opportunity-title">
        <div className="franchise-opportunity-content">
          <h2 id="franchise-opportunity-title">Build your future with our franchise</h2>
          <div className="franchise-opportunity-actions">
            <a href="/franchise" className="franchise-opportunity-primary">Explore Franchise Opportunity <span aria-hidden="true"></span></a>
            <a href="/contact" className="franchise-opportunity-secondary">Contact Us <span aria-hidden="true"></span></a>
          </div>
        </div>
      </section>

      <footer id="site-footer" className="site-footer">
        <div className="container footer-container">
          <div className="footer-col footer-brand-col" id="footer-brand-col">
            <a href="/" className="footer-logo"><img src="/logo-light.png" alt="Mahalaxmi Telecom Private Limited" className="footer-logo-img" /></a>
            <p className="footer-brand-text">A trusted multi-brand mobile and accessory retail chain headquartered in Nandurbar, Maharashtra, backed by more than twenty years of telecom distribution experience.</p>
            <ul className="footer-brand-list" id="footer-brand-list">
              <li>Jagyasi Mobile</li><li>MM Mobile</li><li>Phone Café</li><li>Mobile Point</li>
            </ul>
          </div>

          <div className="footer-col footer-links-col" id="footer-company-links">
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-link-list">
              <li><a href="/about">About Us</a></li>
              <li><a href="/our-story">Our Story</a></li>
              <li><a href="/director-message">Director&apos;s Message</a></li>
              <li><a href="/leadership">Leadership</a></li>
              <li><a href="/vision-mission">Vision &amp; Mission</a></li>
            </ul>
          </div>

          <div className="footer-col footer-links-col" id="footer-franchise-links">
            <h4 className="footer-col-title">Franchise</h4>
            <ul className="footer-link-list">
              <li><a href="/why-partner">Why Partner With Us</a></li>
              <li><a href="/business-model">Business Model</a></li>
              <li><a href="/franchise">Store Franchise Plan</a></li>
              <li><a href="/faq">Franchise FAQs</a></li>
            </ul>
          </div>

          <div className="footer-col footer-contact-col" id="footer-contact-col">
            <h4 className="footer-col-title">Contact</h4>
            <ul className="footer-contact-list">
              <li>Shop No. 420, Subhash Chowk, Mangal Gate Police Chowki, Nandurbar, Maharashtra 425412</li>
              <li><a href="tel:+919604836936">+91 96048 36936</a></li>
              <li><a href="mailto:mahalaxmitelecom26@gmail.com">mahalaxmitelecom26@gmail.com</a></li>
            </ul>
            <ul className="footer-social-list" id="footer-social-list">
              {socialLinks.map(([file, label]) => (
                <li className="footer-social-item" key={label}>
                  <a href="#" aria-label={label}><img src={`/${file}`} alt={label} className="social-icon" /></a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-newsletter-col" id="footer-newsletter-col">
            <h4 className="footer-col-title">Stay Updated</h4>
            <p className="footer-newsletter-text">Get franchise openings and store news in your inbox.</p>
            <form className="footer-newsletter-form" id="footer-newsletter-form" action="#" method="post">
              <input className="newsletter-input" type="email" name="newsletter-email" placeholder="Your email address" required />
              <button className="newsletter-submit-btn" type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom" id="footer-bottom">
          <div className="container footer-bottom-inner">
            <p className="footer-copyright">&copy; <span id="footer-year">2026</span> Mahalaxmi Telecom Private Limited. All Rights Reserved.</p>
            <ul className="footer-legal-list"><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms &amp; Conditions</a></li></ul>
          </div>
        </div>
      </footer>
    </>
  );
}
