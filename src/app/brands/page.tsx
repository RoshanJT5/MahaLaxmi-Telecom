import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import BlurFade from "@/components/ui/BlurFade";
import {
  BrandGrid,
  CallToAction,
  PageHero,
  retailFormats,
  SectionHeading,
} from "@/components/Editorial";

export const metadata: Metadata = {
  title: "Our brands | Mahalaxmi Telecom",
  description:
    "Meet our four retail formats and the technology brands we bring together.",
};

const categories = [
  {
    title: "Smartphones",
    image: "/About-section/Smartphones.png",
    body: "The latest devices from leading mobile brands, ready to test in store.",
  },
  {
    title: "Tablets",
    image: "/About-section/Tablet.png",
    body: "A considered range for work, study and entertainment.",
  },
  {
    title: "Wearables",
    image: "/About-section/Watches.png",
    body: "Smartwatches and fitness bands from trusted names.",
  },
  {
    title: "Accessories",
    image: "/About-section/Accessories.png",
    body: "Cases, chargers, audio and the essentials around every device.",
  },
  {
    title: "Electronics",
    image: "/About-section/Electornics.png",
    body: "Additional gadgets and lifestyle electronics by store format.",
  },
];

export default function BrandsPage() {
  return (
    <SiteShell>
      <main id="main-content">
        <PageHero
          title={
            <>
              Four formats.
              <br />
              <em>One standard of trust.</em>
            </>
          }
          intro="Every store serves a different market and size, supported by the same sourcing strength and service culture."
        />
        <section className="section-pad formats-page" id="store-formats">
          <div className="wrap">
            <SectionHeading
              title={
                <>
                  A format for
                  <br />
                  <em>every market.</em>
                </>
              }
              intro="Our retail family takes the same commitment to customers into different communities."
            />
            <div className="format-rows">
              {retailFormats.map((format, index) => (
                <BlurFade className="format-row" key={format.name}>
                  <div className="format-row__media">
                    <img
                      src={format.image}
                      alt={`${format.name} retail format`}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                  <div className="format-row__content">
                    <span>
                      {String(index + 1).padStart(2, "0")} · {format.type}
                    </span>
                    <h3>{format.name}</h3>
                    <p>{format.description}</p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
        <section className="section-pad surface-warm" id="brand-partners">
          <div className="wrap">
            <SectionHeading
              title={
                <>
                  Leading names.
                  <br />
                  <em>Closer to home.</em>
                </>
              }
              intro="We proudly retail devices and accessories from recognized national and global brands."
            />
            <BrandGrid />
          </div>
        </section>
        <section className="section-pad">
          <div className="wrap">
            <SectionHeading
              title={
                <>
                  What you&apos;ll find
                  <br />
                  <em>in our stores.</em>
                </>
              }
              intro="A curated world of mobile technology and everyday connected essentials."
            />
            <div className="brand-categories">
              {categories.map((category) => (
                <article key={category.title}>
                  <img
                    src={category.image}
                    alt={category.title}
                    loading="lazy"
                  />
                  <div>
                    <h3>{category.title}</h3>
                    <p>{category.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <CallToAction
          title={
            <>
              Open a store under
              <br />
              <em>a trusted format.</em>
            </>
          }
          body="Explore the business model and find the right format for your market."
        />
      </main>
    </SiteShell>
  );
}
