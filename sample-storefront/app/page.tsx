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

export default function Home() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main-content">
        Skip to main content
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <DuckIslandLogo homeUrl="/" />
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
            This page is a lightweight stand-in for a future Duck Island site: the
            regular tab mirrors the public flavours listing, and the specials tab mirrors
            scoop store special flavours (static copy, not live-scraped). Use search and
            random scoop, toggle dark mode, and explore the FAQ — all client-side; no
            backend.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="flavours-heading">
          <h2 id="flavours-heading" className={styles.h2}>
            Flavours
          </h2>
          <FlavourListTabs
            regularFlavours={officialFlavours}
            specialFlavours={specialFlavours}
            specialSnapshotVerifiedLabel={specialFlavoursSnapshotVerifiedLabel}
          />
        </section>

        <section className={styles.section} aria-labelledby="visit-heading">
          <h2 id="visit-heading" className={styles.h2}>
            Visit us
          </h2>
          <div className={styles.panel}>
            <p>
              We scoop at shops across New Zealand. For this demo, store hours and
              locations are not linked to a live public site.
            </p>
            <p>
              <strong>More info:</strong> see your project knowledge base and ticket notes
              for the production launch URL when available.
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
                No — it is a local demo storefront for the WarpDesk workspace. It is not
                the production site.
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary className={styles.faqSummary}>
                Do the flavours update automatically from the web?
              </summary>
              <p className={styles.faqBody}>
                No. Names and descriptions are a static snapshot in code. Refresh the copy
                when the source menu snapshot in the repo is refreshed.
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
          Flavour copy is a static snapshot in this repository. <code>sample-storefront</code>{" "}
          — <code>npm run dev</code>
        </p>
      </footer>

      <BackToTop />
    </div>
  );
}
