"use client";

import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { OfficialFlavour } from "@/data/officialFlavours";
import styles from "@/app/page.module.css";

type TabId = "regular" | "special";
type SortMode = "name-asc" | "name-desc";

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

function compareFlavours(a: OfficialFlavour, b: OfficialFlavour, sortMode: SortMode) {
  const direction = sortMode === "name-desc" ? -1 : 1;
  return a.name.localeCompare(b.name) * direction;
}

function highlightMatch(text: string, q: string, keyPrefix: string): ReactNode {
  const needle = q.trim();
  if (!needle) {
    return text;
  }
  const lower = text.toLowerCase();
  const n = needle.toLowerCase();
  const nodes: ReactNode[] = [];
  let from = 0;
  let k = 0;
  for (;;) {
    const i = lower.indexOf(n, from);
    if (i < 0) {
      if (from < text.length) {
        nodes.push(text.slice(from));
      }
      break;
    }
    if (i > from) {
      nodes.push(text.slice(from, i));
    }
    const slice = text.slice(i, i + needle.length);
    nodes.push(
      <mark key={`${keyPrefix}-mk-${k++}`} className={styles.searchHighlight}>
        {slice}
      </mark>,
    );
    from = i + needle.length;
  }
  return nodes.length > 0 ? nodes : text;
}

function FlavourGrid({
  items,
  tab,
  favourites,
  searchQuery,
  onToggleFavourite,
  onCopyFlavourLink,
}: {
  items: OfficialFlavour[];
  tab: TabId;
  favourites: Set<string>;
  searchQuery: string;
  onToggleFavourite: (name: string) => void;
  onCopyFlavourLink: (f: OfficialFlavour) => void;
}) {
  return (
    <ul className={styles.grid}>
      {items.map((f) => {
        const id = `flavour-${tab}-${slugify(f.name)}`;
        const isFavourite = favourites.has(f.name);
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
            <div className={styles.cardTitleRow}>
              <p className={styles.flavourName}>
                {highlightMatch(f.name, searchQuery, `${id}-name`)}
              </p>
              <div className={styles.cardActions}>
                <button
                  type="button"
                  className={styles.flavourLinkButton}
                  onClick={() => onCopyFlavourLink(f)}
                  aria-label={`Copy page link to ${f.name}`}
                >
                  Copy link
                </button>
                <button
                  type="button"
                  className={styles.favouriteButton}
                  onClick={() => onToggleFavourite(f.name)}
                  aria-pressed={isFavourite}
                  aria-label={isFavourite ? `Remove ${f.name} from favourites` : `Add ${f.name} to favourites`}
                >
                  {isFavourite ? "★ Saved" : "☆ Save"}
                </button>
              </div>
            </div>
            <p className={styles.flavourNote}>
              {highlightMatch(f.description, searchQuery, `${id}-desc`)}
            </p>
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
  const pathname = usePathname() ?? "/";
  const baseId = useId();
  const liveId = `${baseId}-live`;
  const searchId = `${baseId}-search`;
  const searchRef = useRef<HTMLInputElement | null>(null);
  const flavourListTopRef = useRef<HTMLDivElement | null>(null);
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);

  const [tab, setTab] = useState<TabId>(defaultTab);
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortMode, setSortMode] = useState<SortMode>("name-asc");
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);
  const [favourites, setFavourites] = useState<string[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }
    const raw = window.localStorage.getItem("duck-island-favourites");
    if (!raw) {
      return [];
    }
    try {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
        return parsed;
      }
    } catch {
      // Ignore malformed localStorage payload.
    }
    return [];
  });
  const [liveMsg, setLiveMsg] = useState("");

  useEffect(() => {
    window.localStorage.setItem("duck-island-favourites", JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    const syncFromHash = () => {
      const raw = window.location.hash.replace(/^#/, "");
      if (!raw.startsWith("flavour-")) {
        return;
      }
      const m = /^flavour-(regular|special)-(.+)$/.exec(raw);
      if (!m) {
        return;
      }
      const tabId = m[1] as TabId;
      const nameSlug = m[2]!;
      const list = tabId === "regular" ? regularFlavours : specialFlavours;
      if (!list.some((fl) => slugify(fl.name) === nameSlug)) {
        return;
      }
      setQuery("");
      setSelectedTag("all");
      setSortMode("name-asc");
      setShowFavouritesOnly(false);
      setTab(tabId);
      setPendingScrollId(raw);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [regularFlavours, specialFlavours]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) {
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
      if (e.key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
        return;
      }
      if (e.key.toLowerCase() === "r") {
        e.preventDefault();
        pickRandom();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pickRandom]);

  const regularTabId = `${baseId}-tab-regular`;
  const specialTabId = `${baseId}-tab-special`;
  const regularPanelId = `${baseId}-panel-regular`;
  const specialPanelId = `${baseId}-panel-special`;

  const activeSource = tab === "regular" ? regularFlavours : specialFlavours;
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    for (const flavour of activeSource) {
      for (const tag of flavour.tags ?? []) {
        tags.add(tag);
      }
    }
    return [...tags].sort();
  }, [activeSource]);
  const effectiveSelectedTag =
    selectedTag === "all" || availableTags.includes(selectedTag) ? selectedTag : "all";
  const favouritesSet = useMemo(() => new Set(favourites), [favourites]);

  const filtered = useMemo(
    () =>
      activeSource
        .filter((f) => matchesQuery(f, query))
        .filter((f) => effectiveSelectedTag === "all" || (f.tags ?? []).includes(effectiveSelectedTag))
        .filter((f) => !showFavouritesOnly || favouritesSet.has(f.name))
        .sort((a, b) => compareFlavours(a, b, sortMode)),
    [activeSource, query, effectiveSelectedTag, sortMode, showFavouritesOnly, favouritesSet],
  );

  const filtersActive = useMemo(
    () =>
      query.trim() !== "" ||
      effectiveSelectedTag !== "all" ||
      showFavouritesOnly ||
      sortMode !== "name-asc",
    [query, effectiveSelectedTag, showFavouritesOnly, sortMode],
  );

  const savedOnTab = useMemo(
    () => activeSource.filter((f) => favouritesSet.has(f.name)).length,
    [activeSource, favouritesSet],
  );

  useEffect(() => {
    if (!pendingScrollId) {
      return;
    }
    const t = window.setTimeout(() => {
      const el = document.getElementById(pendingScrollId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setPendingScrollId(null);
    }, 0);
    return () => window.clearTimeout(t);
  }, [pendingScrollId, tab, filtered.length]);

  const toggleFavourite = useCallback((name: string) => {
    setFavourites((current) => {
      if (current.includes(name)) {
        return current.filter((item) => item !== name);
      }
      return [...current, name];
    });
  }, []);

  const clearFilters = useCallback(() => {
    setQuery("");
    setSelectedTag("all");
    setSortMode("name-asc");
    setShowFavouritesOnly(false);
    setLiveMsg("Filters reset.");
    searchRef.current?.focus();
  }, []);

  const copyFlavourPageLink = useCallback(
    async (f: OfficialFlavour) => {
      const id = `flavour-${tab}-${slugify(f.name)}`;
      const qs = window.location.search ?? "";
      const url = `${window.location.origin}${pathname}${qs}#${id}`;
      try {
        await navigator.clipboard.writeText(url);
        setLiveMsg(`Link to ${f.name} copied.`);
      } catch {
        setLiveMsg("Unable to copy link.");
      }
    },
    [pathname, tab],
  );

  const copyFilteredList = useCallback(async () => {
    if (filtered.length === 0) {
      setLiveMsg("No visible flavours to copy.");
      return;
    }
    const text = filtered.map((f) => f.name).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setLiveMsg(
        `Copied ${filtered.length} visible flavour name${filtered.length === 1 ? "" : "s"}.`,
      );
    } catch {
      setLiveMsg("Unable to copy list.");
    }
  }, [filtered]);

  const scrollToListTop = useCallback(() => {
    flavourListTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setLiveMsg("Back to flavour list top.");
  }, []);

  const copySavedList = useCallback(async () => {
    if (favourites.length === 0) {
      setLiveMsg("No saved flavours to copy.");
      return;
    }
    const savedNames = activeSource
      .map((flavour) => flavour.name)
      .filter((name) => favouritesSet.has(name));
    if (savedNames.length === 0) {
      setLiveMsg("No saved flavours on this tab to copy.");
      return;
    }
    const payload = savedNames.join(", ");
    try {
      await navigator.clipboard.writeText(payload);
      setLiveMsg(`Copied ${savedNames.length} saved flavour${savedNames.length === 1 ? "" : "s"}.`);
    } catch {
      setLiveMsg("Unable to copy saved flavours.");
    }
  }, [activeSource, favourites, favouritesSet]);

  const copyVisibleLinks = useCallback(async () => {
    if (filtered.length === 0) {
      setLiveMsg("No visible flavours to copy links for.");
      return;
    }
    const qs = window.location.search ?? "";
    const urls = filtered.map((f) => {
      const id = `flavour-${tab}-${slugify(f.name)}`;
      return `${window.location.origin}${pathname}${qs}#${id}`;
    });
    try {
      await navigator.clipboard.writeText(urls.join("\n"));
      setLiveMsg(`Copied ${urls.length} visible flavour link${urls.length === 1 ? "" : "s"}.`);
    } catch {
      setLiveMsg("Unable to copy visible links.");
    }
  }, [filtered, pathname, tab]);

  const saveVisible = useCallback(() => {
    if (filtered.length === 0) {
      setLiveMsg("No visible flavours to save.");
      return;
    }
    const visibleNames = new Set(filtered.map((f) => f.name));
    let added = 0;
    setFavourites((current) => {
      const next = [...current];
      for (const name of visibleNames) {
        if (!next.includes(name)) {
          next.push(name);
          added += 1;
        }
      }
      return next;
    });
    setLiveMsg(
      added === 0
        ? "All visible flavours are already saved."
        : `Saved ${added} visible flavour${added === 1 ? "" : "s"}.`,
    );
  }, [filtered]);

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
      <div
        id="flavour-list-top"
        ref={flavourListTopRef}
        className={styles.flavourToolbar}
      >
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
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                setQuery("");
                setLiveMsg("Search cleared.");
              }
            }}
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
      <div className={styles.filterBar}>
        <label className={styles.filterLabel}>
          Dietary filter
          <select
            className={styles.filterSelect}
            value={effectiveSelectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="all">All</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.filterLabel}>
          Sort
          <select
            className={styles.filterSelect}
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
          </select>
        </label>
        <button
          type="button"
          className={styles.filterButton}
          onClick={() => setShowFavouritesOnly((current) => !current)}
          aria-pressed={showFavouritesOnly}
          data-active={showFavouritesOnly ? "true" : "false"}
        >
          {showFavouritesOnly ? "Showing saved only" : `Saved only (${favourites.length})`}
        </button>
        <button type="button" className={styles.filterButton} onClick={clearFilters}>
          Clear filters
        </button>
        <button
          type="button"
          className={styles.filterButton}
          onClick={copySavedList}
          disabled={favourites.length === 0}
        >
          Copy saved list
        </button>
        <button
          type="button"
          className={styles.filterButton}
          onClick={saveVisible}
          disabled={filtered.length === 0}
        >
          Save visible
        </button>
        <button
          type="button"
          className={styles.filterButton}
          onClick={copyVisibleLinks}
          disabled={filtered.length === 0}
        >
          Copy visible links
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

      <p className={styles.flavourResultSummary}>
        Showing {filtered.length} of {activeSource.length} on this tab
        {savedOnTab > 0 ? ` · ${savedOnTab} saved on this tab` : ""}
        {query.trim() !== "" ? " · Matches highlighted in cards" : ""}
        {filtersActive ? " · Filtered" : ""}
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
            <FlavourGrid
              items={filtered}
              tab="regular"
              favourites={favouritesSet}
              searchQuery={query}
              onToggleFavourite={toggleFavourite}
              onCopyFlavourLink={copyFlavourPageLink}
            />
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
            <FlavourGrid
              items={filtered}
              tab="special"
              favourites={favouritesSet}
              searchQuery={query}
              onToggleFavourite={toggleFavourite}
              onCopyFlavourLink={copyFlavourPageLink}
            />
          )
        ) : null}
      </div>
    </>
  );
}
