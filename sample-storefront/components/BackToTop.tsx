"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "@/app/page.module.css";

const SHOW_AFTER_PX = 400;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const main = document.getElementById("main-content");
    main?.focus({ preventScroll: true });
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      className={styles.backToTop}
      onClick={goTop}
      aria-label="Back to top"
    >
      ↑ Top
    </button>
  );
}
