import { DuckIslandLogo } from "@/components/DuckIslandLogo";
import { FlavourListTabs } from "@/components/FlavourListTabs";
import { BackToTop } from "@/components/BackToTop";
import { NewsletterMock } from "@/components/NewsletterMock";
import { PenguinMascot } from "@/components/PenguinMascot";
import { ThemeToggle } from "@/components/ThemeToggle";
import { officialFlavours } from "@/data/officialFlavours";
import {
  specialFlavours,
  specialFlavoursSnapshotVerifiedLabel,
} from "@/data/specialFlavours";
import styles from "./page.module.css";

const FLAVOURS_PAGE = "https://www.duckislandicecream.co.nz/flavours";
const SCOOP_SPECIAL_FLAVOURS_PAGE =
  "https://www.duckislandicecream.co.nz/scoop-store-special-flavours";
const MAIN_SITE = "https://www.duckislandicecream.co.nz/";
const SCOOP_STORES = "https://www.duckislandicecream.co.nz/scoop-stores";

export default function Home() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main-content">
        Skip to main content
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <DuckIslandLogo homeUrl={MAIN_SITE} />
            <div className={styles.brandText}>
              <p className={styles.tagline}>Sample storefront (EDF workspace demo)</p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <ThemeToggle />
            <p className={styles.badge}>EDF ticketing demo</p>
            <PenguinMascot />
          </div>
        </div>
      </header>

      <main id="main-content" className={styles.main} tabIndex={-1}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Small batch ice cream, big flavour
          </h1>
          <p className={styles.lead}>
            This page is a lightweight stand-in for the real Duck Island site: the
            regular tab mirrors the public{" "}
            <a href={FLAVOURS_PAGE}>flavours listing</a>, and the specials tab mirrors{" "}
            <a href={SCOOP_SPECIAL_FLAVOURS_PAGE}>scoop store special flavours</a> (static
            copy, not live-scraped). Use search and random scoop, toggle dark mode, and
            explore the FAQ — all client-side; no backend.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="flavours-heading">
          <h2 id="flavours-heading" className={styles.h2}>
            Flavours
          </h2>
          <FlavourListTabs
            regularFlavours={officialFlavours}
            specialFlavours={specialFlavours}
            flavoursPageUrl={FLAVOURS_PAGE}
            scoopSpecialFlavoursPageUrl={SCOOP_SPECIAL_FLAVOURS_PAGE}
            specialSnapshotVerifiedLabel={specialFlavoursSnapshotVerifiedLabel}
          />
        </section>

        <section className={styles.section} aria-labelledby="visit-heading">
          <h2 id="visit-heading" className={styles.h2}>
            Visit us
          </h2>
          <div className={styles.panel}>
            <p>
              We scoop at shops across New Zealand — hours and addresses are on our{" "}
              <a href={SCOOP_STORES}>scoop stores</a> page.
            </p>
            <p>
              <strong>More info:</strong>{" "}
              <a href={MAIN_SITE}>duckislandicecream.co.nz</a>
            </p>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.faqSection}`}
          aria-labelledby="faq-heading"
        >
          <h2 id="faq-heading" className={styles.h2}>
            FAQ (demo)
          </h2>
          <div className={styles.faqList}>
            <details className={styles.faqItem}>
              <summary className={styles.faqSummary}>
                Is this the real Duck Island website?
              </summary>
              <p className={styles.faqBody}>
                No — it is a local demo storefront for the WarpDesk workspace. Links to
                duckislandicecream.co.nz open the real site.
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary className={styles.faqSummary}>
                Do the flavours update automatically from the web?
              </summary>
              <p className={styles.faqBody}>
                No. Names and descriptions are a static snapshot in code. Refresh the copy
                when the public pages change.
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary className={styles.faqSummary}>
                Does the newsletter form send my email anywhere?
              </summary>
              <p className={styles.faqBody}>
                No. It only validates format and shows a thank-you message in the browser.
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary className={styles.faqSummary}>
                What does &quot;Random scoop&quot; do?
              </summary>
              <p className={styles.faqBody}>
                It picks a random flavour from your current tab and filtered list, scrolls
                to the card, and announces the choice for screen readers.
              </p>
            </details>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="newsletter-heading">
          <h2 id="newsletter-heading" className={styles.h2}>
            Stay in the loop
          </h2>
          <NewsletterMock />
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          Flavours on{" "}
          <a href={FLAVOURS_PAGE}>duckislandicecream.co.nz/flavours</a>
          {" · "}
          Specials on{" "}
          <a href={SCOOP_SPECIAL_FLAVOURS_PAGE}>scoop store special flavours</a>
          {" · "}
          <code>sample-storefront</code> — <code>npm run dev</code>
        </p>
      </footer>

      <BackToTop />
    </div>
  );
}
