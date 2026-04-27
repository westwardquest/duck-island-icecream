import styles from "./PenguinMascot.module.css";

const FEATHER = "var(--accent-strong)";

/**
 * Generic penguin mascot (inline SVG) for header branding — ticket #10.
 */
export function PenguinMascot() {
  return (
    <span
      className={styles.wrap}
      role="img"
      aria-label="Penguin mascot"
    >
      <svg
        className={styles.svg}
        viewBox="0 0 56 72"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <ellipse cx="28" cy="38" rx="22" ry="26" fill={FEATHER} />
        <ellipse
          cx="28"
          cy="42"
          rx="12"
          ry="16"
          fill="var(--card)"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <circle cx="28" cy="18" r="16" fill={FEATHER} />
        <ellipse cx="28" cy="20" rx="10" ry="11" fill="var(--card)" />
        <circle cx="23" cy="18" r="2.5" fill="var(--ink)" />
        <circle cx="33" cy="18" r="2.5" fill="var(--ink)" />
        <circle cx="23.5" cy="17.5" r="0.8" fill="var(--card)" />
        <circle cx="33.5" cy="17.5" r="0.8" fill="var(--card)" />
        <path d="M28 22 L24 26 L28 28 L32 26 Z" fill="var(--accent)" />
        <ellipse cx="20" cy="64" rx="6" ry="3" fill="var(--accent)" />
        <ellipse cx="36" cy="64" rx="6" ry="3" fill="var(--accent)" />
        <ellipse
          cx="10"
          cy="40"
          rx="5"
          ry="12"
          fill={FEATHER}
          transform="rotate(-25 10 40)"
        />
        <ellipse
          cx="46"
          cy="40"
          rx="5"
          ry="12"
          fill={FEATHER}
          transform="rotate(25 46 40)"
        />
      </svg>
    </span>
  );
}
