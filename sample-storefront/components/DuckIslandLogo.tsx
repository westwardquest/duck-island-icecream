import { duckIslandLogoMarkup } from "./duck-island-logo-markup";
import styles from "./DuckIslandLogo.module.css";

type Props = {
  homeUrl: string;
};

const isHttpUrl = (s: string) => /^https?:\/\//i.test(s);

/**
 * Official header wordmark SVGs (static markup in this repo, aligned with the brand bar layout).
 */
export function DuckIslandLogo({ homeUrl }: Props) {
  const openInNewTab = isHttpUrl(homeUrl);
  return (
    <a
      href={homeUrl}
      className={styles.wrap}
      {...(openInNewTab
        ? { target: "_blank" as const, rel: "noopener noreferrer" as const }
        : {})}
      aria-label="Duck Island Ice Cream"
    >
      <span
        className={styles.markup}
        dangerouslySetInnerHTML={{ __html: duckIslandLogoMarkup }}
      />
    </a>
  );
}
