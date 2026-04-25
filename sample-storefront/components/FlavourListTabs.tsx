"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type { OfficialFlavour } from "@/data/officialFlavours";
import styles from "@/app/page.module.css";

type TabId = "regular" | "special";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function matchesQuery(f: OfficialFlavour, q: string) {
  const t = q.trim().toLowerCase();
  if (!t) {
    return true;
  }
  const blob = `${f.name} ${f.description}`.toLowerCase();
  return blob.includes(t);
}

function FlavourGrid({
  items,
  tab,
}: {
  items: OfficialFlavour[];
  tab: TabId;
}) {
  return (
    <ul className={styles.grid}>
      {items.map((f) => {
        const id = `flavour-${tab}-${slugify(f.name)}`;
        return (
          <li
            key={`${tab}-${slugify(f.name)}`}
            id={id}
            tabIndex={-1}
            className={styles.card}
          >
            {f.tags && f.tags.length > 0 ? (
              <p className={styles.flavourTags}>{f.tags.join(" · ")}</p>
            ) : null}
            <p className={styles.flavourName}>{f.name}</p>
            <p className={styles.flavourNote}>{f.description}</p>
          </li>
        );
      })}
    </ul>
  );
}

export function FlavourListTabs({
  regularFlavours,
  specialFlavours,
  /** Shown on the special tab to document when the static list was last verified. */
  specialSnapshotVerifiedLabel,
  /** Scoop store specials are the most visible “homepage” subset for the demo. */
  defaultTab = "special",
}: {
  regularFlavours: OfficialFlavour[];
  specialFlavours: OfficialFlavour[];
  specialSnapshotVerifiedLabel?: string;
  defaultTab?: TabId;
}) {
  const baseId = useId();
  const liveId = `${baseId}-live`;
  const searchId = `${baseId}-search`;
  const searchRef = useRef<HTMLInputElement | null>(null);

  const [tab, setTab] = useState<TabId>(defaultTab);
  const [query, setQuery] = useState("");
  const [liveMsg, setLiveMsg] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }
      const t = e.target;
      if (!(t instanceof HTMLElement)) {
        return;
      }
      if (t.isContentEditable) {
        return;
      }
      if (t.closest("input, textarea, select, [data-flavour-skip-focus-slash]")) {
        return;
      }
      e.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const regularTabId = `${baseId}-tab-regular`;
  const specialTabId = `${baseId}-tab-special`;
  const regularPanelId = `${baseId}-panel-regular`;
  const specialPanelId = `${baseId}-panel-special`;

  const activeSource = tab === "regular" ? regularFlavours : specialFlavours;

  const filtered = useMemo(
    () => activeSource.filter((f) => matchesQuery(f, query)),
    [activeSource, query],
  );

  const pickRandom = useCallback(() => {
    if (filtered.length === 0) {
      return;
    }
    const f = filtered[Math.floor(Math.random() * filtered.length)]!;
    const id = `flavour-${tab}-${slugify(f.name)}`;
    setLiveMsg(`Selected: ${f.name}`);
    window.requestAnimationFrame(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus({ preventScroll: true });
    });
  }, [filtered, tab]);

  return (
    <>
      <div className={styles.flavourToolbar}>
        <div className={styles.searchWrap}>
          <label className={styles.searchLabel} htmlFor={searchId}>
            Search flavours
            <span className={styles.searchHint} aria-hidden="true">
              {" "}
              (press / to focus)
            </span>
          </label>
          <input
            ref={searchRef}
            id={searchId}
            className={styles.searchInput}
            type="search"
            autoComplete="off"
            placeholder="Type to filter by name or description…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          type="button"
          className={styles.randomScoop}
          onClick={pickRandom}
          disabled={filtered.length === 0}
        >
          Random scoop
        </button>
      </div>

      <p id={liveId} className={styles.visuallyHidden} aria-live="polite">
        {liveMsg}
      </p>

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
          Regular flavours ({regularFlavours.length})
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
          Special flavours ({specialFlavours.length})
        </button>
      </div>

      <p className={styles.sectionIntro}>
        {tab === "regular" ? (
          <>
            Names and blurbs match the public flavours listing (static snapshot in this
            repo).
          </>
        ) : (
          <>
            Small-batch scoop-shop lineup from the scoop store special flavours list — what
            &apos;s in the cabinet changes by store and season. For the core
            range, switch to{" "}
            <span className={styles.visuallyHidden}>Regular flavours tab: </span>
            <button
              type="button"
              className={styles.inlineTabLink}
              onClick={() => setTab("regular")}
            >
              regular flavours
            </button>
            .
            {specialSnapshotVerifiedLabel ? (
              <>
                {" "}
                Static menu copy last verified {specialSnapshotVerifiedLabel}.
              </>
            ) : null}
          </>
        )}
      </p>

      <div
        id={regularPanelId}
        role="tabpanel"
        aria-labelledby={regularTabId}
        hidden={tab !== "regular"}
      >
        {tab === "regular" ? (
          filtered.length === 0 ? (
            <p className={styles.emptyFlavours} role="status">
              No flavours match your search. Try different words or clear the search box.
            </p>
          ) : (
            <FlavourGrid items={filtered} tab="regular" />
          )
        ) : null}
      </div>

      <div
        id={specialPanelId}
        role="tabpanel"
        aria-labelledby={specialTabId}
        hidden={tab !== "special"}
      >
        {tab === "special" ? (
          filtered.length === 0 ? (
            <p className={styles.emptyFlavours} role="status">
              No flavours match your search. Try different words or clear the search box.
            </p>
          ) : (
            <FlavourGrid items={filtered} tab="special" />
          )
        ) : null}
      </div>
    </>
  );
}
