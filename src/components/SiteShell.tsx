 'use client';

import { useEffect, useState, type ReactNode } from 'react';

type SiteShellProps = {
  children: ReactNode;
  transparentOnTop?: boolean;
};

type NavEntry = {
  href: string;
  label: string;
};

const navigation: NavEntry[] = [
  { href: '/about', label: 'About' },
  { href: '/leadership', label: 'Leadership' },
  { href: '/brands', label: 'Brands' },
  { href: '/franchise', label: 'Franchise' },
  { href: '/faq', label: 'FAQs' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  {
    label: 'Instagram',
    viewBox: '0 0 24 24',
    path: 'M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-9.4a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z',
  },
  {
    label: 'YouTube',
    viewBox: '0 0 24 24',
    path: 'M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.8 31.8 0 000 12a31.8 31.8 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.8 31.8 0 0024 12a31.8 31.8 0 00-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z',
  },
  {
    label: 'LinkedIn',
    viewBox: '0 0 37 36',
    path: 'M12.8072 35.3548C12.7917 35.2159 12.7686 35.0769 12.7686 34.938C12.7686 27.2802 12.7686 19.6146 12.7686 11.9568C12.7686 11.8178 12.7686 11.6789 12.7686 11.5091C15.4241 11.5091 18.0487 11.5091 20.7043 11.5091C20.7043 12.5975 20.7043 13.6783 20.7043 14.7667C20.7352 14.7822 20.7583 14.7976 20.7892 14.813C20.9127 14.6664 21.0362 14.5197 21.1675 14.3807C22.6496 12.7287 24.3711 11.4087 26.602 11.0536C30.2688 10.4824 34.4374 11.895 36.1434 16.4882C36.5835 17.6847 36.8382 18.9199 36.9231 20.1936C36.9308 20.3171 36.9694 20.4406 37.0003 20.5641C37.0003 25.4969 37.0003 30.422 37.0003 35.3548C34.3525 35.3548 31.7124 35.3548 29.0646 35.3548C29.0646 35.185 29.0569 35.0229 29.0569 34.8531C29.0569 30.8543 29.0646 26.8479 29.0492 22.8491C29.0414 22.0617 28.972 21.2589 28.833 20.4792C28.3775 17.9858 26.4168 16.7352 23.9542 17.3296C22.225 17.7465 20.766 19.5297 20.7506 21.3438C20.7274 25.991 20.7352 30.6305 20.7352 35.2776C20.7352 35.3008 20.7429 35.3317 20.7506 35.3548C18.0951 35.3548 15.455 35.3548 12.8072 35.3548ZM0.478818 35.355C0.471098 35.2006 0.463379 35.0462 0.463379 34.8918C0.463379 27.2571 0.463379 19.6147 0.463379 11.9801C0.463379 11.8257 0.463379 11.679 0.463379 11.5015C3.1112 11.5015 5.72813 11.5015 8.41455 11.5015C8.41455 19.4526 8.41455 27.4038 8.41455 35.355C5.77445 35.355 3.12663 35.355 0.478818 35.355ZM4.59731e-05 4.12196C0.00776555 2.05311 1.40501 0.416562 3.45842 0.0923393C4.79391 -0.116089 6.08308 -0.00801527 7.21014 0.794821C8.62282 1.80609 9.13231 3.24965 8.83897 4.91708C8.54562 6.60767 7.44944 7.64981 5.80517 8.08211C4.70127 8.37545 3.59737 8.32913 2.52435 7.91228C0.957274 7.29471 -0.00767361 5.83571 4.59731e-05 4.12196Z',
  },
  {
    label: 'WhatsApp',
    viewBox: '0 0 24 24',
    path: 'M12 0C5.5 0 .2 5.3.2 11.9c0 2.1.5 4.1 1.6 6L.2 24l6.3-1.6a11.9 11.9 0 005.5 1.4h.1c6.5 0 11.8-5.3 11.8-11.9C23.9 5.3 18.6 0 12 0zm0 21.8h-.1a9.9 9.9 0 01-5-1.4l-.4-.2-3.7 1 1-3.6-.3-.4a9.9 9.9 0 01-1.5-5.3c0-5.4 4.4-9.9 9.9-9.9a9.8 9.8 0 019.9 9.9c0 5.4-4.4 9.9-9.8 9.9zm5.4-7.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2-.2-.3 0-.5.2-.6l.9-1c.2-.2.2-.4.1-.6-.1-.2-.7-1.8-1-2.4-.3-.6-.5-.5-.7-.6h-.6c-.2 0-.6.2-.9.5-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.4c.2.2 2.3 3.5 5.5 4.9 1.5.7 2.2.7 3 .6.5-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4 0-.2-.2-.2-.5-.4z',
  },
  {
    label: 'X',
    viewBox: '0 0 24 24',
    path: 'M18.9 1.2h3.7l-8.1 9.2L24 22.8h-7.5l-5.9-7.7-6.7 7.7H.2l8.6-9.9L0 1.2h7.7l5.3 7 5.9-7zm-1.3 19.4h2L6.6 3.3H4.4l13.2 17.3z',
  },
] as const;

export default function SiteShell({ children, transparentOnTop = false }: SiteShellProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const mobileQuery = window.matchMedia('(max-width: 860px)');
    const closeOnDesktop = () => {
      if (!mobileQuery.matches) setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflowY;
    document.body.style.overflowY = 'hidden';

    window.addEventListener('keydown', closeOnEscape);
    mobileQuery.addEventListener('change', closeOnDesktop);
    return () => {
      document.body.style.overflowY = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
      mobileQuery.removeEventListener('change', closeOnDesktop);
    };
  }, [menuOpen]);

  const headerClassName = [
    'site-top-header',
    transparentOnTop ? 'navbar-transparent' : '',
    hasScrolled ? 'navbar-scrolled' : '',
    menuOpen ? 'menu-open' : '',
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

          <nav className="main-nav" id="main-nav" aria-label="Main navigation">
            <button
              type="button"
              className={`nav-toggle${menuOpen ? ' open' : ''}`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-controls="nav-list"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="nav-toggle-bar" aria-hidden="true" />
              <span className="nav-toggle-bar" aria-hidden="true" />
              <span className="nav-toggle-bar" aria-hidden="true" />
            </button>
            <ul className={`nav-list${menuOpen ? ' nav-open' : ''}`} id="nav-list">
              {navigation.map((entry) => (
                <li className="nav-item" key={entry.href}>
                  <a href={entry.href} className="nav-link" onClick={() => setMenuOpen(false)}>{entry.label}</a>
                </li>
              ))}
              <li className="nav-cta-item">
                <a href="/franchise" className="nav-cta-link" onClick={() => setMenuOpen(false)}>Enquiry</a>
              </li>
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
            <a href="/" className="footer-logo" aria-label="Mahalaxmi Telecom home">
              <img src="/mahalaxmi-logo-bg.png" alt="" className="footer-logo-img" aria-hidden="true" />
              <span className="footer-logo-text">
                <span className="footer-logo-name">Mahalaxmi Telecom</span>
                <span className="footer-logo-sub">Private Limited</span>
              </span>
            </a>
            <p className="footer-brand-text">A trusted multi-brand mobile and accessory retail chain headquartered in Nandurbar, Maharashtra, backed by more than twenty years of telecom distribution experience.</p>
            <ul className="footer-brand-list" id="footer-brand-list">
              <li>Jagyasi Mobile</li><li>MM Mobile</li><li>Phone Café</li><li>Mobile Point</li>
            </ul>
          </div>

          <div className="footer-col footer-links-col" id="footer-company-links">
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-link-list">
              <li><a href="/about">About Us</a></li>
              <li><a href="/about#our-story">Our Story</a></li>
              <li><a href="/director-message">Director&apos;s Message</a></li>
              <li><a href="/leadership">Leadership</a></li>
              <li><a href="/about#vision-mission">Vision &amp; Mission</a></li>
            </ul>
          </div>

          <div className="footer-col footer-links-col" id="footer-franchise-links">
            <h4 className="footer-col-title">Franchise</h4>
            <ul className="footer-link-list">
              <li><a href="/why-partner">Why Partner With Us</a></li>
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
              {socialLinks.map(({ label, viewBox, path }) => (
                <li className="footer-social-item" key={label}>
                  <a href="#" aria-label={label}>
                    <svg viewBox={viewBox} className="social-icon" aria-hidden="true" fill="currentColor">
                      <path d={path} />
                    </svg>
                  </a>
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
