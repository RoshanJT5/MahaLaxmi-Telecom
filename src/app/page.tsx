import SiteShell from "@/components/SiteShell";
import SpriteExperience from "@/components/SpriteExperience";
import HeroCarousel from "@/components/HeroCarousel";
import BrandMarquee from "@/components/BrandMarquee";
import BlurFade from "@/components/ui/BlurFade";
import {
  ActionLink,
  CallToAction,
  retailFormats,
  SectionHeading,
  TextLink,
} from "@/components/Editorial";

const categories = [
  {
    name: "Smartphones",
    image: "/About-section/Smartphones.png",
    description: "The latest devices, ready to experience in person.",
  },
  {
    name: "Tablets",
    image: "/About-section/Tablet.png",
    description: "For work, learning and everything between.",
  },
  {
    name: "Wearables",
    image: "/About-section/Watches.png",
    description: "Connected technology that moves with you.",
  },
  {
    name: "Accessories",
    image: "/About-section/Accessories.png",
    description: "The essentials that complete every device.",
  },
];

const benefits = [
  {
    title: "A wider product range",
    description:
      "Smartphones, tablets, wearables and accessories from leading brands.",
  },
  {
    title: "Higher margins, no targets",
    description:
      "A model designed for sustainable growth without imposed sales targets.",
  },
  {
    title: "Finance options",
    description: "Multiple financing partners and schemes for customers.",
  },
  {
    title: "Support from day one",
    description:
      "Store launch, marketing and operations guidance from an experienced team.",
  },
];

export default function Home() {
  return (
    <SiteShell>
      <main id="main-content">
        <section className="home-hero">
          <HeroCarousel />
          <div className="wrap home-hero__inner">
            <div className="home-hero__copy">
              <p className="home-hero__prelude">
                Mahalaxmi Telecom · Maharashtra
              </p>
              <h1>
                Where technology
                <br />
                meets <em>trust.</em>
              </h1>
              <p>
                Four retail formats. Leading mobile brands. More than twenty
                years of telecom distribution experience behind every store.
              </p>
              <div className="button-row">
                <ActionLink href="/brands" light>
                  Explore our brands
                </ActionLink>
                <TextLink href="/franchise" light>
                  Partner with us
                </TextLink>
              </div>
            </div>
          </div>
          <div className="home-hero__edge">
            <span>PHYSICAL RETAIL. PERSONAL CONNECTION.</span>
            <span>NANDURBAR · MAHARASHTRA</span>
          </div>
        </section>

        <section className="intro-statement section-pad">
          <div className="wrap intro-statement__grid">
            <div className="intro-statement__mark">
              <img src="/store_img.png" alt="" />
            </div>
            <BlurFade>
              <h2>
                Built on relationships.
                <br />
                <em>Made for what&apos;s next.</em>
              </h2>
              <p>
                From telecom distribution to a growing multi-brand retail
                network, we bring customers the confidence of trying before they
                buy and give entrepreneurs a business supported by a trusted
                name.
              </p>
              <TextLink href="/about">Discover our company</TextLink>
            </BlurFade>
          </div>
        </section>

        <section className="categories section-pad">
          <div className="wrap">
            <div className="section-top">
              <SectionHeading
                title={
                  <>
                    Technology for
                    <br />
                    <em>everyday life.</em>
                  </>
                }
                intro="Discover devices and connected essentials across our retail formats."
              />
              <TextLink href="/brands">View every category</TextLink>
            </div>
            <div className="category-grid">
              {categories.map((item, index) => (
                <BlurFade
                  key={item.name}
                  delay={index * 0.07}
                  className="category-tile"
                >
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        <section className="partner-strip section-pad">
          <div className="wrap">
            <div className="section-top">
              <SectionHeading
                title={
                  <>
                    Names you know.
                    <br />
                    <em>A standard you can trust.</em>
                  </>
                }
                intro="We proudly retail devices and accessories from recognized national and global brands."
              />
              <TextLink href="/brands#brand-partners">
                Our brand partners
              </TextLink>
            </div>
          </div>
          <BrandMarquee />
        </section>

        <SpriteExperience />

        <section className="formats section-pad">
          <div className="wrap">
            <div className="section-top">
              <SectionHeading
                title={
                  <>
                    One company.
                    <br />
                    <em>Four ways to serve.</em>
                  </>
                }
                intro="Each store format answers a different market, with the same focus on sourcing, service and support."
              />
              <TextLink href="/brands">Explore store formats</TextLink>
            </div>
            <div className="format-grid">
              {retailFormats.map((format, index) => (
                <BlurFade
                  className="format-card"
                  key={format.name}
                  delay={index * 0.06}
                >
                  <div className="format-card__image">
                    <img src={format.image} alt={format.name} loading="lazy" />
                  </div>
                  <div className="format-card__text">
                    <span>{format.type}</span>
                    <h3>{format.name}</h3>
                    <p>{format.description}</p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        <section className="franchise-preview section-pad">
          <div className="wrap franchise-preview__grid">
            <div>
              <SectionHeading
                title={
                  <>
                    Your ambition.
                    <br />
                    <em>Our experience.</em>
                  </>
                }
                intro="A franchise model shaped by the realities of retail, with practical support at every stage."
              />
              <ActionLink href="/franchise">Explore the opportunity</ActionLink>
            </div>
            <div className="benefit-list">
              {benefits.map((item) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <CallToAction
          title={
            <>
              The next chapter
              <br />
              <em>could be yours.</em>
            </>
          }
          body="Let us talk about the market, format and store that suit your ambition."
        />
      </main>
    </SiteShell>
  );
}
