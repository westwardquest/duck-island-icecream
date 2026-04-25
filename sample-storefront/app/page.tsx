"use client";

import { useState } from "react";
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

type Locale = "en" | "es";

const copy = {
  en: {
    skipToMain: "Skip to main content",
    tagline: "Sample storefront (EDF workspace demo)",
    badge: "EDF ticketing demo",
    languageToggle: "Español",
    heroTitle: "Small batch ice cream, big flavour",
    heroLead:
      "This page is a lightweight stand-in for a future Duck Island site: the regular tab mirrors the public flavours listing, and the specials tab mirrors scoop store special flavours (static copy, not live-scraped). Use search and random scoop, toggle dark mode, and explore the FAQ — all client-side; no backend.",
    flavoursHeading: "Flavours",
    visitHeading: "Visit us",
    visitLine1:
      "We scoop at shops across New Zealand. For this demo, store hours and locations are not linked to a live public site.",
    visitLine2Prefix: "More info:",
    visitLine2:
      "see your project knowledge base and ticket notes for the production launch URL when available.",
    faqHeading: "FAQ (demo)",
    faqQ1: "Is this the real Duck Island website?",
    faqA1:
      "No — it is a local demo storefront for the WarpDesk workspace. It is not the production site.",
    faqQ2: "Do the flavours update automatically from the web?",
    faqA2:
      "No. Names and descriptions are a static snapshot in code. Refresh the copy when the source menu snapshot in the repo is refreshed.",
    faqQ3: "Does the newsletter form send my email anywhere?",
    faqA3:
      "No. It only validates format and shows a thank-you message in the browser.",
    faqQ4: 'What does "Random scoop" do?',
    faqA4:
      "It picks a random flavour from your current tab and filtered list, scrolls to the card, and announces the choice for screen readers.",
    newsletterHeading: "Stay in the loop",
    footerTextPrefix: "Flavour copy is a static snapshot in this repository.",
    backToTop: "Back to top",
  },
  es: {
    skipToMain: "Saltar al contenido principal",
    tagline: "Tienda de muestra (demo de espacio EDF)",
    badge: "Demo de tickets EDF",
    languageToggle: "English",
    heroTitle: "Helado artesanal, gran sabor",
    heroLead:
      "Esta pagina es una maqueta ligera del futuro sitio de Duck Island: la pestana regular refleja la lista publica de sabores y la pestana de especiales refleja los sabores especiales de tienda (copia estatica, no extraida en vivo). Usa la busqueda y la opcion de sabor aleatorio, cambia el modo oscuro y revisa las preguntas frecuentes; todo en cliente, sin backend.",
    flavoursHeading: "Sabores",
    visitHeading: "Visitanos",
    visitLine1:
      "Servimos en tiendas de Nueva Zelanda. En esta demo, los horarios y ubicaciones no estan vinculados a un sitio publico en vivo.",
    visitLine2Prefix: "Mas info:",
    visitLine2:
      "consulta la base de conocimiento del proyecto y las notas del ticket para la URL de lanzamiento cuando este disponible.",
    faqHeading: "Preguntas frecuentes (demo)",
    faqQ1: "Es este el sitio real de Duck Island?",
    faqA1:
      "No, es una tienda de demostracion local para el espacio de trabajo de WarpDesk. No es el sitio de produccion.",
    faqQ2: "Los sabores se actualizan automaticamente desde la web?",
    faqA2:
      "No. Los nombres y descripciones son una captura estatica en codigo. Actualiza la copia cuando se actualice la captura del menu fuente en el repositorio.",
    faqQ3: "El formulario de newsletter envia mi correo a algun lugar?",
    faqA3:
      "No. Solo valida el formato y muestra un mensaje de agradecimiento en el navegador.",
    faqQ4: 'Que hace "Sabor aleatorio"?',
    faqA4:
      "Elige un sabor aleatorio de la pestana actual y la lista filtrada, desplaza hasta la tarjeta y anuncia la eleccion para lectores de pantalla.",
    newsletterHeading: "Mantente al tanto",
    footerTextPrefix:
      "La copia de sabores es una captura estatica en este repositorio.",
    backToTop: "Volver arriba",
  },
} as const;

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const t = copy[locale];

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main-content">
        {t.skipToMain}
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <DuckIslandLogo homeUrl="/" />
            <div className={styles.brandText}>
              <p className={styles.tagline}>{t.tagline}</p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.languageToggle}
              onClick={() => setLocale((current) => (current === "en" ? "es" : "en"))}
            >
              {t.languageToggle}
            </button>
            <ThemeToggle />
            <p className={styles.badge}>{t.badge}</p>
            <PenguinMascot />
          </div>
        </div>
      </header>

      <main id="main-content" className={styles.main} tabIndex={-1}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>{t.heroTitle}</h1>
          <p className={styles.lead}>{t.heroLead}</p>
        </section>

        <section className={styles.section} aria-labelledby="flavours-heading">
          <h2 id="flavours-heading" className={styles.h2}>
            {t.flavoursHeading}
          </h2>
          <FlavourListTabs
            regularFlavours={officialFlavours}
            specialFlavours={specialFlavours}
            specialSnapshotVerifiedLabel={specialFlavoursSnapshotVerifiedLabel}
          />
        </section>

        <section className={styles.section} aria-labelledby="visit-heading">
          <h2 id="visit-heading" className={styles.h2}>
            {t.visitHeading}
          </h2>
          <div className={styles.panel}>
            <p>{t.visitLine1}</p>
            <p>
              <strong>{t.visitLine2Prefix}</strong> {t.visitLine2}
            </p>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.faqSection}`}
          aria-labelledby="faq-heading"
        >
          <h2 id="faq-heading" className={styles.h2}>
            {t.faqHeading}
          </h2>
          <div className={styles.faqList}>
            <details className={styles.faqItem}>
              <summary className={styles.faqSummary}>{t.faqQ1}</summary>
              <p className={styles.faqBody}>{t.faqA1}</p>
            </details>
            <details className={styles.faqItem}>
              <summary className={styles.faqSummary}>{t.faqQ2}</summary>
              <p className={styles.faqBody}>{t.faqA2}</p>
            </details>
            <details className={styles.faqItem}>
              <summary className={styles.faqSummary}>{t.faqQ3}</summary>
              <p className={styles.faqBody}>{t.faqA3}</p>
            </details>
            <details className={styles.faqItem}>
              <summary className={styles.faqSummary}>{t.faqQ4}</summary>
              <p className={styles.faqBody}>{t.faqA4}</p>
            </details>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="newsletter-heading">
          <h2 id="newsletter-heading" className={styles.h2}>
            {t.newsletterHeading}
          </h2>
          <NewsletterMock locale={locale} />
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          {t.footerTextPrefix} <code>sample-storefront</code> — <code>npm run dev</code>
        </p>
      </footer>

      <BackToTop label={t.backToTop} />
    </div>
  );
}
