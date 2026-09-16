import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function PageHero({
  title,
  intro,
  image,
  dark = false,
  children,
}: {
  title: ReactNode;
  intro: string;
  image?: string;
  dark?: boolean;
  children?: ReactNode;
}) {
  return (
    <section
      className={`page-hero${dark ? " page-hero--dark" : ""}${image ? " page-hero--image" : ""}`}
    >
      {image && <img className="page-hero__image" src={image} alt="" />}
      <div className="wrap page-hero__inner">
        <div className="page-hero__content">
          <h1>{title}</h1>
          <p>{intro}</p>
          {children}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  title,
  intro,
  light = false,
}: {
  title: ReactNode;
  intro?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-heading${light ? " section-heading--light" : ""}`}>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}

export function TextLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`text-link${light ? " text-link--light" : ""}`}
    >
      {children}
      <ArrowUpRight size={18} strokeWidth={1.6} />
    </Link>
  );
}

export function ActionLink({
  href,
  children,
  outline = false,
  light = false,
}: {
  href: string;
  children: ReactNode;
  outline?: boolean;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`action-link${outline ? " action-link--outline" : ""}${light ? " action-link--light" : ""}`}
    >
      {children}
      <ArrowUpRight size={17} strokeWidth={1.6} />
    </Link>
  );
}

export function CallToAction({
  title,
  body,
  primary = "Explore franchise",
  primaryHref = "/franchise",
}: {
  title: ReactNode;
  body: string;
  primary?: string;
  primaryHref?: string;
}) {
  return (
    <section className="cta-panel">
      <div className="wrap cta-panel__inner">
        <div>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
        <div className="cta-panel__actions">
          <ActionLink href={primaryHref} light>
            {primary}
          </ActionLink>
          <TextLink href="/contact" light>
            Talk to our team
          </TextLink>
        </div>
      </div>
    </section>
  );
}

export const retailFormats = [
  {
    name: "Jagyasi Mobile",
    type: "Flagship format",
    description: "Full-range mobile retail and a premium in-store experience.",
    image: "/jm-showroom-hero.png",
  },
  {
    name: "MM Mobile",
    type: "Standard format",
    description: "Consistent everyday mobile and accessory retail.",
    image: "/page-section1/hero-store.jpg",
  },
  {
    name: "Phone Café",
    type: "Compact format",
    description: "Neighbourhood-friendly, accessible mobile shopping.",
    image: "/page-section1/store-detail.jpg",
  },
  {
    name: "Mobile Point",
    type: "Emerging-market format",
    description:
      "A focused point for devices and accessories in growing markets.",
    image: "/page-section1/store-hero.jpg",
  },
];

export const partnerBrands = [
  { name: "Apple", logo: "/new-cards/Apple-1.jpg.webp" },
  {
    name: "Motorola",
    logo: "/brands/Brands-Card/motorola.svg",
    color: "motorola",
  },
  { name: "Xiaomi", logo: "/new-cards/Mi_1.jpeg.webp" },
  { name: "vivo", logo: "/brands/Brands-Card/vivo.svg", color: "vivo" },
  { name: "Nothing", logo: "/new-cards/Nothing-1.jpg.webp" },
  {
    name: "Samsung",
    logo: "/brands/Brands-Card/samsung.svg",
    color: "samsung",
  },
  
  { name: "realme", logo: "/new-cards/Realme-1.jpg.webp" },
  { name: "Noise", logo: "/new-cards/Noise.jpg.webp" },
  { name: "OPPO", logo: "/brands/Brands-Card/oppo.svg", color: "oppo" },
];

export function BrandLogo({
  brand,
  decorative = false,
}: {
  brand: (typeof partnerBrands)[number];
  decorative?: boolean;
}) {
  return (
    <span
      className={`brand-logo-art${"color" in brand ? ` brand-logo-art--${brand.color}` : ""}`}
    >
      <img src={brand.logo} alt={decorative ? "" : brand.name} loading="lazy" />
    </span>
  );
}

export function BrandGrid() {
  return (
    <div className="brand-grid">
      {partnerBrands.map((brand) => (
        <div className="brand-grid__item" key={brand.name}>
          <BrandLogo brand={brand} />
        </div>
      ))}
    </div>
  );
}
