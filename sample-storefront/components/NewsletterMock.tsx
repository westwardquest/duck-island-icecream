"use client";

import { useState, type FormEvent } from "react";
import styles from "@/app/page.module.css";

function looksLikeEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

export function NewsletterMock() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!looksLikeEmail(email)) {
      setError("Please enter a valid email address.");
      setSubmitted(false);
      return;
    }
    setError(null);
    setSubmitted(true);
  }

  return (
    <div className={styles.newsletter}>
      <h3 className={styles.newsletterTitle}>Duck News (demo)</h3>
      <p className={styles.newsletterLead}>
        This form does not send data anywhere — it&apos;s a UI demo only.
      </p>
      {submitted ? (
        <p className={styles.newsletterSuccess} role="status">
          Thanks — you&apos;re on the list (not really; this is static).
        </p>
      ) : (
        <form className={styles.newsletterForm} onSubmit={handleSubmit} noValidate>
          <label className={styles.newsletterLabel} htmlFor="newsletter-email">
            Email
          </label>
          <div className={styles.newsletterRow}>
            <input
              id="newsletter-email"
              className={styles.newsletterInput}
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "newsletter-error" : undefined}
            />
            <button type="submit" className={styles.newsletterButton}>
              Sign up
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
