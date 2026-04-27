import Link from "next/link";
import styles from "./page.module.css";

export default function EventsPage() {
  return (
    <main className={styles.page}>
      <Link className={styles.backLink} href="/">
        Back to home
      </Link>

      <h1 className={styles.title}>Dog Smelling Competition</h1>
      <p className={styles.lead}>
        A dedicated event page for the Duck Island dog smelling competition where humans compete
        to identify mystery dogs by scent.
      </p>

      <section className={styles.panel} aria-labelledby="event-dates-heading">
        <h2 id="event-dates-heading" className={styles.heading}>
          Event dates
        </h2>
        <ul className={styles.list}>
          <li>Friday 16 May 2026, 6:00 PM to 8:00 PM</li>
          <li>Saturday 17 May 2026, 12:00 PM to 3:00 PM</li>
          <li>Sunday 18 May 2026, 1:00 PM to 4:00 PM</li>
        </ul>
      </section>

      <section className={styles.panel} aria-labelledby="event-rules-heading">
        <h2 id="event-rules-heading" className={styles.heading}>
          Rules
        </h2>
        <ul className={styles.list}>
          <li>Teams of one to three humans are allowed per round.</li>
          <li>No touching dogs; scent samples are presented by marshals only.</li>
          <li>Each team has 90 seconds to submit each guess.</li>
          <li>Top score wins a year of monthly Duck Island scoop vouchers.</li>
        </ul>
      </section>

      <section className={styles.panel} aria-labelledby="event-location-heading">
        <h2 id="event-location-heading" className={styles.heading}>
          Location
        </h2>
        <p className={styles.text}>
          Duck Island Pop-up Pavilion, Shed 3, Wellington Waterfront, Wellington, New Zealand.
        </p>
      </section>
    </main>
  );
}
