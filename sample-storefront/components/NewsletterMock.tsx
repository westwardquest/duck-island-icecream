"use client";

import { useState, type FormEvent } from "react";
import styles from "@/app/page.module.css";

function looksLikeEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

type Locale = "en" | "es";

const copy = {
  en: {
    title: "Duck News (demo)",
    lead: "This form does not send data anywhere — it is a UI demo only.",
    success: "Thanks — you are on the list (not really; this is static).",
    label: "Email",
    placeholder: "you@example.com",
    cta: "Sign up",
    invalidEmail: "Please enter a valid email address.",
  },
  es: {
    title: "Noticias de Duck (demo)",
    lead: "Este formulario no envia datos a ningun lugar; es solo una demo de interfaz.",
    success: "Gracias. Ya estas en la lista (no de verdad; esto es estatico).",
    label: "Correo",
    placeholder: "tu@ejemplo.com",
    cta: "Registrarse",
    invalidEmail: "Ingresa un correo valido.",
  },
} as const;

export function NewsletterMock({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!looksLikeEmail(email)) {
      setError(t.invalidEmail);
      setSubmitted(false);
      return;
    }
    setError(null);
    setSubmitted(true);
  }

  return (
    <div className={styles.newsletter}>
      <h3 className={styles.newsletterTitle}>{t.title}</h3>
      <p className={styles.newsletterLead}>{t.lead}</p>
      {submitted ? (
        <p className={styles.newsletterSuccess} role="status">
          {t.success}
        </p>
      ) : (
        <form className={styles.newsletterForm} onSubmit={handleSubmit} noValidate>
          <label className={styles.newsletterLabel} htmlFor="newsletter-email">
            {t.label}
          </label>
          <div className={styles.newsletterRow}>
            <input
              id="newsletter-email"
              className={styles.newsletterInput}
              type="email"
              name="email"
              autoComplete="email"
              placeholder={t.placeholder}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "newsletter-error" : undefined}
            />
            <button type="submit" className={styles.newsletterButton}>
              {t.cta}
            </button>
          </div>
          {error ? (
            <p id="newsletter-error" className={styles.newsletterError} role="alert">
              {error}
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
