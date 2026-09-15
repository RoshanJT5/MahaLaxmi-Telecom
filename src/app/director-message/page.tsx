import SiteShell from '@/components/SiteShell';
import styles from './director-message.module.css';

const PHOTO =
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&q=80&auto=format&fit=crop';

export default function DirectorMessagePage() {
  return (
    <SiteShell>
      <main id="main-content">
        <section className={styles.posterSection} aria-label="Message from the director">
          <div className={styles.container}>
            <article className={styles.poster}>
              <img
                src={PHOTO}
                alt="Pradip Jagyasi, CEO and Co-Founder, Mahalaxmi Telecom Private Limited"
                className={styles.posterPhoto}
              />
              <div className={styles.posterShade} aria-hidden="true" />
              <span className={styles.posterMark} aria-hidden="true">M</span>
              <div className={styles.posterBody}>
                <p className={styles.posterKicker}>
                  <span className={styles.posterQuote} aria-hidden="true">&ldquo;</span>
                  <span className={styles.posterTag}>Director&apos;s Desk</span>
                </p>
                <h1 className={styles.posterTitle}>
                  Relationships are the real foundation.
                </h1>
                <p className={styles.posterSub}>
                  Pradip Jagyasi, CEO &amp; Co-Founder, on twenty years of trust — and why the
                  retail partners who stayed with us are the foundation of Mahalaxmi Telecom.
                </p>
                <a href="#message" className={styles.posterBtn}>
                  <span aria-hidden="true">↗</span> Read the message
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.messageSection} id="message" aria-label="Full message">
          <div className={styles.messageContainer}>
            <p className={styles.eyebrow}>A Word From Our CEO</p>
            <h2 className={styles.messageTitle}>Message From The Director&apos;s Desk</h2>
            <blockquote className={styles.quote}>
              <p>
                When I look back at the last twenty years, what stays with me is not a single
                milestone, it is the hundreds of retail partners who trusted us early, stayed with
                us through slow seasons and grew alongside us. That relationship is the real
                foundation of Mahalaxmi Telecom.
              </p>
            </blockquote>
            <p className={styles.para}>
              We did not start as a retail chain. We started as a distribution partner, learning
              the telecom business from the supply side, understanding what a retailer needs before
              they even ask for it. That grounding is why Jagyasi Mobile, MM Mobile, Phone Cafe and
              Mobile Point are built the way they are: physical stores where a customer can fulfill
              their desires and where a franchise partner gets a business model that has already
              been tested in the market.
            </p>
            <p className={styles.para}>
              Our decision to open a Retail Store Chain Franchise Model was not about growth for its
              own sake. It came from watching capable, hard-working retail partners look for a
              proper opportunity, one with a trusted brand behind it, fair margins, no unrealistic
              sales targets and honest, ongoing support. We built our franchise to be exactly that.
            </p>
            <p className={styles.para}>
              Our goal over the coming years is straightforward: 200 or more premium stores across
              Maharashtra, run by partners who see this as their own business, not just another
              outlet. If you are looking for a retail opportunity built on two decades of telecom
              experience, I would be glad to have you build your future with us.
            </p>
            <p className={styles.signoff}>
              <span className={styles.signoffName}>Pradip Jagyasi</span>
              <br />
              <span className={styles.signoffRole}>CEO &amp; Co-Founder, Mahalaxmi Telecom Private Limited</span>
            </p>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
