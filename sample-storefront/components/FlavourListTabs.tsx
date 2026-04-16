"use client";

import { useId, useState } from "react";
import type { OfficialFlavour } from "@/data/officialFlavours";
import styles from "@/app/page.module.css";

type TabId = "regular" | "special";

function FlavourGrid({ items }: { items: OfficialFlavour[] }) {
  return (
    <ul className={styles.grid}>
      {items.map((f) => (
        <li key={f.name} className={styles.card}>
          {f.tags && f.tags.length > 0 ? (
            <p className={styles.flavourTags}>{f.tags.join(" · ")}</p>
          ) : null}
          <p className={styles.flavourName}>{f.name}</p>
          <p className={styles.flavourNote}>{f.description}</p>
        </li>
      ))}
    </ul>
  );
}

export function FlavourListTabs({
  regularFlavours,
  specialFlavours,
  flavoursPageUrl,
}: {
  regularFlavours: OfficialFlavour[];
  specialFlavours: OfficialFlavour[];
  flavoursPageUrl: string;
}) {
  const baseId = useId();
  const [tab, setTab] = useState<TabId>("regular");

  const regularTabId = `${baseId}-tab-regular`;
  const specialTabId = `${baseId}-tab-special`;
  const regularPanelId = `${baseId}-panel-regular`;
  const specialPanelId = `${baseId}-panel-special`;

  return (
    <>
      <div className={styles.tabBar} role="tablist" aria-label="Flavour list">
        <button
          type="button"
          role="tab"
          id={regularTabId}
          aria-selected={tab === "regular"}
          aria-controls={regularPanelId}
          tabIndex={tab === "regular" ? 0 : -1}
          className={styles.tab}
          data-active={tab === "regular" ? "true" : "false"}
          onClick={() => setTab("regular")}
        >
          Regular flavours
        </button>
        <button
          type="button"
          role="tab"
          id={specialTabId}
          aria-selected={tab === "special"}
          aria-controls={specialPanelId}
          tabIndex={tab === "special" ? 0 : -1}
          className={styles.tab}
          data-active={tab === "special" ? "true" : "false"}
          onClick={() => setTab("special")}
        >
          Special flavours
        </button>
      </div>

      <p className={styles.sectionIntro}>
        {tab === "regular" ? (
          <>
            A sample of our range — see the{" "}
            <a href={flavoursPageUrl}>full list on duckislandicecream.co.nz</a>.
          </>
        ) : (
          <>
            Limited scoops and batch runs — availability changes by shop and season.
            For our core range, switch to{" "}
            <span className={styles.visuallyHidden}>Regular flavours tab: </span>
            <button
              type="button"
              className={styles.inlineTabLink}
              onClick={() => setTab("regular")}
            >
              regular flavours
            </button>
            .
          </>
        )}
      </p>

      <div
        id={regularPanelId}
        role="tabpanel"
        aria-labelledby={regularTabId}
        hidden={tab !== "regular"}
      >
        {tab === "regular" ? <FlavourGrid items={regularFlavours} /> : null}
      </div>

      <div
        id={specialPanelId}
        role="tabpanel"
        aria-labelledby={specialTabId}
        hidden={tab !== "special"}
      >
        {tab === "special" ? <FlavourGrid items={specialFlavours} /> : null}
      </div>
    </>
  );
}
