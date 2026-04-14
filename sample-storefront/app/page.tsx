import styles from "./page.module.css";

const flavours = [
  { name: "Vanilla bean", note: "Classic — ticket fodder: “more vanilla flecks”" },
  { name: "Salted caramel", note: "Sticky — good for “too sweet” / “more salt” tickets" },
  { name: "Blackberry sorbet", note: "Dairy-free — test dietary / allergen requests" },
  { name: "Mint choc chip", note: "Polarising — perfect for faux duplicate tickets" },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.logo} aria-hidden>
            🍦
          </span>
          <div>
            <p className={styles.name}>Duck Island Icecream</p>
            <p className={styles.tagline}>Sample client storefront</p>
          </div>
        </div>
        <p className={styles.badge}>EDF ticketing demo</p>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            A tiny site you can point a faux client at
          </h1>
          <p className={styles.lead}>
            This is intentionally simple: run it locally, then open tickets in the
            workspace about flavours, copy, bugs, or “we need online ordering.”
            Nothing here talks to Supabase — it is only a visual stand-in for the
            product under support.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="flavours-heading">
          <h2 id="flavours-heading" className={styles.h2}>
            Today&apos;s board (static)
          </h2>
          <ul className={styles.grid}>
            {flavours.map((f) => (
              <li key={f.name} className={styles.card}>
                <p className={styles.flavourName}>{f.name}</p>
                <p className={styles.flavourNote}>{f.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="visit-heading">
          <h2 id="visit-heading" className={styles.h2}>
            Visit (fake)
          </h2>
          <div className={styles.panel}>
            <p>
              <strong>Hours:</strong> Tue–Sun, 11am–9pm
            </p>
            <p>
              <strong>Address:</strong> 123 Wharf Street, Sample Bay
            </p>
            <p className={styles.hint}>
              Use tickets to request changes to hours, address, or seasonal copy —
              that is what this workspace is for.
            </p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          <code>sample-storefront</code> — run with{" "}
          <code>npm run dev</code> (see README in this folder).
        </p>
      </footer>
    </div>
  );
}
