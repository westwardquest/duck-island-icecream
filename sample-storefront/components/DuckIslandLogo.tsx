import { duckIslandLogoMarkup } from "./duck-island-logo-markup";
import styles from "./DuckIslandLogo.module.css";

type Props = {
  homeUrl: string;
};

/**
 * Official header wordmark SVGs from https://www.duckislandicecream.co.nz/ (extracted from live HTML).
 */
export function DuckIslandLogo({ homeUrl }: Props) {
  return (
    <a
      href={homeUrl}
      className={styles.wrap}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Duck Island Ice Cream"
    >
      <span
        className={styles.markup}
        dangerouslySetInnerHTML={{ __html: duckIslandLogoMarkup }}
      />
    </a>
  );
}
