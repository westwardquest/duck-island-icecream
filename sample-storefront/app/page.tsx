import { DuckIslandLogo } from "@/components/DuckIslandLogo";
import { officialFlavours } from "@/data/officialFlavours";
import styles from "./page.module.css";

const FLAVOURS_PAGE = "https://www.duckislandicecream.co.nz/flavours";
const MAIN_SITE = "https://www.duckislandicecream.co.nz/";
const SCOOP_STORES = "https://www.duckislandicecream.co.nz/scoop-stores";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <DuckIslandLogo homeUrl={MAIN_SITE} />
          <div className={styles.brandText}>
            <p className={styles.tagline}>Sample storefront (EDF workspace demo)</p>
          </div>
        </div>
        <p className={styles.badge}>EDF ticketing demo</p>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Small batch ice cream, big flavour
          </h1>
          <p className={styles.lead}>
            This page is a lightweight stand-in for the real Duck Island site: flavour
            names and descriptions below match the public{" "}
            <a href={FLAVOURS_PAGE}>flavours listing</a>. Run it locally while you file
            tickets in the workspace; it does not connect to a backend.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="flavours-heading">
          <h2 id="flavours-heading" className={styles.h2}>
            Flavours
          </h2>
          <p className={styles.sectionIntro}>
            A sample of our range — see the{" "}
            <a href={FLAVOURS_PAGE}>full list on duckislandicecream.co.nz</a>.
          </p>
          <ul className={styles.grid}>
            {officialFlavours.map((f) => (
              <li key={f.name} className={styles.card}>
                {f.tags && f.tags.length > 0 ? (
                  <p className={styles.flavourTags}>
                    {f.tags.join(" · ")}
                  </p>
                ) : null}
                <p className={styles.flavourName}>{f.name}</p>
                <p className={styles.flavourNote}>{f.description}</p>
              </li>
            ))}
          </ul>
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
      </main>

      <footer className={styles.footer}>
        <p>
          Flavours on{" "}
          <a href={FLAVOURS_PAGE}>duckislandicecream.co.nz/flavours</a>
          {" · "}
          <code>sample-storefront</code> — <code>npm run dev</code>
        </p>
      </footer>
    </div>
  );
}
