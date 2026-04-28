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
type Locale = "en" | "es";

const copy = {
  en: {
    copyLink: "Copy link",
    copyPageLinkAria: (name: string) => `Copy page link to ${name}`,
    removeFavouriteAria: (name: string) => `Remove ${name} from favourites`,
    addFavouriteAria: (name: string) => `Add ${name} to favourites`,
    saved: "★ Saved",
    save: "☆ Save",
    filtersReset: "Filters reset.",
    linkCopied: (name: string) => `Link to ${name} copied.`,
    unableToCopyLink: "Unable to copy link.",
    noVisibleFlavoursToCopy: "No visible flavours to copy.",
    copiedVisibleFlavourNames: (count: number) =>
      `Copied ${count} visible flavour name${count === 1 ? "" : "s"}.`,
    unableToCopyList: "Unable to copy list.",
    backToTop: "Back to flavour list top.",
    noSavedFlavoursToCopy: "No saved flavours to copy.",
    noSavedFlavoursOnTabToCopy: "No saved flavours on this tab to copy.",
    copiedSavedFlavours: (count: number) =>
      `Copied ${count} saved flavour${count === 1 ? "" : "s"}.`,
    unableToCopySaved: "Unable to copy saved flavours.",
    noVisibleLinksToCopy: "No visible flavours to copy links for.",
    copiedVisibleLinks: (count: number) =>
      `Copied ${count} visible flavour link${count === 1 ? "" : "s"}.`,
    unableToCopyVisibleLinks: "Unable to copy visible links.",
    noVisibleFlavoursToSave: "No visible flavours to save.",
    allVisibleAlreadySaved: "All visible flavours are already saved.",
    savedVisibleFlavours: (count: number) =>
      `Saved ${count} visible flavour${count === 1 ? "" : "s"}.`,
    noVisibleFlavoursToRemoveSaved: "No visible flavours to remove from saved.",
    noVisibleSavedToRemove: "No visible saved flavours to remove.",
    removedVisibleSaved: (count: number) =>
      `Removed ${count} visible saved flavour${count === 1 ? "" : "s"}.`,
    randomSelected: (name: string) => `Selected: ${name}`,
    searchFlavours: "Search flavours",
    pressSlashToFocus: "(press / to focus)",
    searchPlaceholder: "Type to filter by name or description…",
    searchCleared: "Search cleared.",
    randomScoop: "Random scoop",
    dietaryFilter: "Dietary filter",
    all: "All",
    sort: "Sort",
    sortNameAsc: "Name A-Z",
    sortNameDesc: "Name Z-A",
    showingSavedOnly: "Showing saved only",
    savedOnly: (count: number) => `Saved only (${count})`,
    clearFilters: "Clear filters",
    copySavedList: "Copy saved list",
    saveVisible: "Save visible",
    removeVisibleSaved: "Remove visible saved",
    copyVisibleLinks: "Copy visible links",
    copyVisibleList: "Copy visible list",
    listTop: "List top",
    flavourListAria: "Flavour list",
    regularFlavours: "Regular flavours",
    specialFlavours: "Special flavours",
    regularIntro:
      "Names and blurbs match the public flavours listing (static snapshot in this repo).",
    specialIntroStart:
      "Small-batch scoop-shop lineup from the scoop store special flavours list - what's in the cabinet changes by store and season. For the core range, switch to",
    regularTabHiddenPrefix: "Regular flavours tab:",
    regularFlavoursInline: "regular flavours",
    specialVerifiedPrefix: "Static menu copy last verified",
    showingCount: (visible: number, total: number) => `Showing ${visible} of ${total} on this tab`,
    savedOnTab: (count: number) => `${count} saved on this tab`,
    matchesHighlighted: "Matches highlighted in cards",
    filtered: "Filtered",
    noFlavoursMatch: "No flavours match your search. Try different words or clear the search box.",
  },
  es: {
    copyLink: "Copiar enlace",
    copyPageLinkAria: (name: string) => `Copiar enlace de la pagina de ${name}`,
    removeFavouriteAria: (name: string) => `Quitar ${name} de guardados`,
    addFavouriteAria: (name: string) => `Guardar ${name}`,
    saved: "★ Guardado",
    save: "☆ Guardar",
    filtersReset: "Filtros restablecidos.",
    linkCopied: (name: string) => `Enlace de ${name} copiado.`,
    unableToCopyLink: "No se pudo copiar el enlace.",
    noVisibleFlavoursToCopy: "No hay sabores visibles para copiar.",
    copiedVisibleFlavourNames: (count: number) =>
      `Se copiaron ${count} nombre${count === 1 ? "" : "s"} de sabores visibles.`,
    unableToCopyList: "No se pudo copiar la lista.",
    backToTop: "Volver arriba de la lista de sabores.",
    noSavedFlavoursToCopy: "No hay sabores guardados para copiar.",
    noSavedFlavoursOnTabToCopy: "No hay sabores guardados en esta pestana para copiar.",
    copiedSavedFlavours: (count: number) =>
      `Se copiaron ${count} sabor${count === 1 ? "" : "es"} guardado${count === 1 ? "" : "s"}.`,
    unableToCopySaved: "No se pudieron copiar los sabores guardados.",
    noVisibleLinksToCopy: "No hay sabores visibles para copiar enlaces.",
    copiedVisibleLinks: (count: number) =>
      `Se copiaron ${count} enlace${count === 1 ? "" : "s"} de sabores visibles.`,
    unableToCopyVisibleLinks: "No se pudieron copiar los enlaces visibles.",
    noVisibleFlavoursToSave: "No hay sabores visibles para guardar.",
    allVisibleAlreadySaved: "Todos los sabores visibles ya estan guardados.",
    savedVisibleFlavours: (count: number) =>
      `Se guardaron ${count} sabor${count === 1 ? "" : "es"} visible${count === 1 ? "" : "s"}.`,
    noVisibleFlavoursToRemoveSaved: "No hay sabores visibles para quitar de guardados.",
    noVisibleSavedToRemove: "No hay sabores guardados visibles para quitar.",
    removedVisibleSaved: (count: number) =>
      `Se quitaron ${count} sabor${count === 1 ? "" : "es"} guardado${count === 1 ? "" : "s"} visible${count === 1 ? "" : "s"}.`,
    randomSelected: (name: string) => `Seleccionado: ${name}`,
    searchFlavours: "Buscar sabores",
    pressSlashToFocus: "(pulsa / para enfocar)",
    searchPlaceholder: "Escribe para filtrar por nombre o descripcion...",
    searchCleared: "Busqueda borrada.",
    randomScoop: "Sabor aleatorio",
    dietaryFilter: "Filtro alimentario",
    all: "Todos",
    sort: "Ordenar",
    sortNameAsc: "Nombre A-Z",
    sortNameDesc: "Nombre Z-A",
    showingSavedOnly: "Mostrando solo guardados",
    savedOnly: (count: number) => `Solo guardados (${count})`,
    clearFilters: "Limpiar filtros",
    copySavedList: "Copiar guardados",
    saveVisible: "Guardar visibles",
    removeVisibleSaved: "Quitar visibles guardados",
    copyVisibleLinks: "Copiar enlaces visibles",
    copyVisibleList: "Copiar lista visible",
    listTop: "Volver al inicio",
    flavourListAria: "Lista de sabores",
    regularFlavours: "Sabores regulares",
    specialFlavours: "Sabores especiales",
    regularIntro:
      "Los nombres y descripciones coinciden con la lista publica de sabores (captura estatica en este repositorio).",
    specialIntroStart:
      "Seleccion de lotes pequenos de la lista de sabores especiales de tienda: lo que hay cambia por tienda y temporada. Para la gama principal, cambia a",
    regularTabHiddenPrefix: "Pestana de sabores regulares:",
    regularFlavoursInline: "sabores regulares",
    specialVerifiedPrefix: "Copia estatica del menu verificada por ultima vez",
    showingCount: (visible: number, total: number) => `Mostrando ${visible} de ${total} en esta pestana`,
    savedOnTab: (count: number) => `${count} guardado${count === 1 ? "" : "s"} en esta pestana`,
    matchesHighlighted: "Coincidencias resaltadas en tarjetas",
    filtered: "Filtrado",
    noFlavoursMatch:
      "Ningun sabor coincide con tu busqueda. Prueba otras palabras o limpia la caja de busqueda.",
  },
} as const;

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
  t,
}: {
  items: OfficialFlavour[];
  tab: TabId;
  favourites: Set<string>;
  searchQuery: string;
  onToggleFavourite: (name: string) => void;
  onCopyFlavourLink: (f: OfficialFlavour) => void;
  t: (typeof copy)[Locale];
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
                  aria-label={t.copyPageLinkAria(f.name)}
                >
                  {t.copyLink}
                </button>
                <button
                  type="button"
                  className={styles.favouriteButton}
                  onClick={() => onToggleFavourite(f.name)}
                  aria-pressed={isFavourite}
                  aria-label={
                    isFavourite ? t.removeFavouriteAria(f.name) : t.addFavouriteAria(f.name)
                  }
                >
                  {isFavourite ? t.saved : t.save}
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
  locale = "en",
}: {
  regularFlavours: OfficialFlavour[];
  specialFlavours: OfficialFlavour[];
  specialSnapshotVerifiedLabel?: string;
  defaultTab?: TabId;
  locale?: Locale;
}) {
  const t = copy[locale];
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
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
    setLiveMsg(t.filtersReset);
    searchRef.current?.focus();
  }, [t]);

  const copyFlavourPageLink = useCallback(
    async (f: OfficialFlavour) => {
      const id = `flavour-${tab}-${slugify(f.name)}`;
      const qs = window.location.search ?? "";
      const url = `${window.location.origin}${pathname}${qs}#${id}`;
      try {
        await navigator.clipboard.writeText(url);
        setLiveMsg(t.linkCopied(f.name));
      } catch {
        setLiveMsg(t.unableToCopyLink);
      }
    },
    [pathname, tab, t],
  );

  const copyFilteredList = useCallback(async () => {
    if (filtered.length === 0) {
      setLiveMsg(t.noVisibleFlavoursToCopy);
      return;
    }
    const text = filtered.map((f) => f.name).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setLiveMsg(t.copiedVisibleFlavourNames(filtered.length));
    } catch {
      setLiveMsg(t.unableToCopyList);
    }
  }, [filtered, t]);

  const scrollToListTop = useCallback(() => {
    flavourListTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setLiveMsg(t.backToTop);
  }, [t]);

  const copySavedList = useCallback(async () => {
    if (favourites.length === 0) {
      setLiveMsg(t.noSavedFlavoursToCopy);
      return;
    }
    const savedNames = activeSource
      .map((flavour) => flavour.name)
      .filter((name) => favouritesSet.has(name));
    if (savedNames.length === 0) {
      setLiveMsg(t.noSavedFlavoursOnTabToCopy);
      return;
    }
    const payload = savedNames.join(", ");
    try {
      await navigator.clipboard.writeText(payload);
      setLiveMsg(t.copiedSavedFlavours(savedNames.length));
    } catch {
      setLiveMsg(t.unableToCopySaved);
    }
  }, [activeSource, favourites, favouritesSet, t]);

  const copyVisibleLinks = useCallback(async () => {
    if (filtered.length === 0) {
      setLiveMsg(t.noVisibleLinksToCopy);
      return;
    }
    const qs = window.location.search ?? "";
    const urls = filtered.map((f) => {
      const id = `flavour-${tab}-${slugify(f.name)}`;
      return `${window.location.origin}${pathname}${qs}#${id}`;
    });
    try {
      await navigator.clipboard.writeText(urls.join("\n"));
      setLiveMsg(t.copiedVisibleLinks(urls.length));
    } catch {
      setLiveMsg(t.unableToCopyVisibleLinks);
    }
  }, [filtered, pathname, tab, t]);

  const saveVisible = useCallback(() => {
    if (filtered.length === 0) {
      setLiveMsg(t.noVisibleFlavoursToSave);
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
      added === 0 ? t.allVisibleAlreadySaved : t.savedVisibleFlavours(added),
    );
  }, [filtered, t]);

  const unsaveVisible = useCallback(() => {
    if (filtered.length === 0) {
      setLiveMsg(t.noVisibleFlavoursToRemoveSaved);
      return;
    }
    const visibleNames = new Set(filtered.map((f) => f.name));
    let removed = 0;
    setFavourites((current) =>
      current.filter((name) => {
        if (!visibleNames.has(name)) {
          return true;
        }
        removed += 1;
        return false;
      }),
    );
    setLiveMsg(
      removed === 0 ? t.noVisibleSavedToRemove : t.removedVisibleSaved(removed),
    );
  }, [filtered, t]);

  const pickRandom = useCallback(() => {
    if (filtered.length === 0) {
      return;
    }
    const f = filtered[Math.floor(Math.random() * filtered.length)]!;
    const id = `flavour-${tab}-${slugify(f.name)}`;
    setLiveMsg(t.randomSelected(f.name));
    window.requestAnimationFrame(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus({ preventScroll: true });
    });
  }, [filtered, tab, t]);

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
      if (e.key.toLowerCase() === "r") {
        e.preventDefault();
        pickRandom();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pickRandom]);

  return (
    <>
      <div
        id="flavour-list-top"
        ref={flavourListTopRef}
        className={styles.flavourToolbar}
      >
        <div className={styles.searchWrap}>
          <label className={styles.searchLabel} htmlFor={searchId}>
            {t.searchFlavours}
            <span className={styles.searchHint} aria-hidden="true">
              {" "}
              {t.pressSlashToFocus}
            </span>
          </label>
          <input
            ref={searchRef}
            id={searchId}
            className={styles.searchInput}
            type="search"
            autoComplete="off"
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                setQuery("");
                setLiveMsg(t.searchCleared);
              }
            }}
          />
        </div>
        <div className={styles.randomScoopCluster}>
          <span className={styles.bounceScoop} aria-hidden="true">
            🍦
          </span>
          <button
            type="button"
            className={styles.randomScoop}
            onClick={pickRandom}
            disabled={filtered.length === 0}
          >
            {t.randomScoop}
          </button>
        </div>
      </div>
      <div className={styles.filterBar}>
        <label className={styles.filterLabel}>
          {t.dietaryFilter}
          <select
            className={styles.filterSelect}
            value={effectiveSelectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="all">{t.all}</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.filterLabel}>
          {t.sort}
          <select
            className={styles.filterSelect}
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
          >
            <option value="name-asc">{t.sortNameAsc}</option>
            <option value="name-desc">{t.sortNameDesc}</option>
          </select>
        </label>
        <button
          type="button"
          className={styles.filterButton}
          onClick={() => setShowFavouritesOnly((current) => !current)}
          aria-pressed={showFavouritesOnly}
          data-active={showFavouritesOnly ? "true" : "false"}
        >
          {showFavouritesOnly ? t.showingSavedOnly : t.savedOnly(favourites.length)}
        </button>
        <button type="button" className={styles.filterButton} onClick={clearFilters}>
          {t.clearFilters}
        </button>
        <button
          type="button"
          className={styles.filterButton}
          onClick={copySavedList}
          disabled={favourites.length === 0}
        >
          {t.copySavedList}
        </button>
        <button
          type="button"
          className={styles.filterButton}
          onClick={saveVisible}
          disabled={filtered.length === 0}
        >
          {t.saveVisible}
        </button>
        <button
          type="button"
          className={styles.filterButton}
          onClick={unsaveVisible}
          disabled={filtered.length === 0}
        >
          {t.removeVisibleSaved}
        </button>
        <button
          type="button"
          className={styles.filterButton}
          onClick={copyVisibleLinks}
          disabled={filtered.length === 0}
        >
          {t.copyVisibleLinks}
        </button>
        <button
          type="button"
          className={styles.filterButton}
          onClick={copyFilteredList}
          disabled={filtered.length === 0}
        >
          {t.copyVisibleList}
        </button>
        <button type="button" className={styles.filterButton} onClick={scrollToListTop}>
          {t.listTop}
        </button>
      </div>

      <p id={liveId} className={styles.visuallyHidden} aria-live="polite">
        {liveMsg}
      </p>

      <div className={styles.tabBar} role="tablist" aria-label={t.flavourListAria}>
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
          {t.regularFlavours} ({regularFlavours.length})
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
          {t.specialFlavours} ({specialFlavours.length})
        </button>
      </div>

      <p className={styles.sectionIntro}>
        {tab === "regular" ? (
          <>
            {t.regularIntro}
          </>
        ) : (
          <>
            {t.specialIntroStart}{" "}
            <span className={styles.visuallyHidden}>{t.regularTabHiddenPrefix} </span>
            <button
              type="button"
              className={styles.inlineTabLink}
              onClick={() => setTab("regular")}
            >
              {t.regularFlavoursInline}
            </button>
            .
            {specialSnapshotVerifiedLabel ? (
              <>
                {" "}
                {t.specialVerifiedPrefix} {specialSnapshotVerifiedLabel}.
              </>
            ) : null}
          </>
        )}
      </p>

      <p className={styles.flavourResultSummary}>
        {t.showingCount(filtered.length, activeSource.length)}
        {savedOnTab > 0 ? ` · ${t.savedOnTab(savedOnTab)}` : ""}
        {query.trim() !== "" ? ` · ${t.matchesHighlighted}` : ""}
        {filtersActive ? ` · ${t.filtered}` : ""}
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
              {t.noFlavoursMatch}
            </p>
          ) : (
            <FlavourGrid
              items={filtered}
              tab="regular"
              favourites={favouritesSet}
              searchQuery={query}
              onToggleFavourite={toggleFavourite}
              onCopyFlavourLink={copyFlavourPageLink}
              t={t}
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
              {t.noFlavoursMatch}
            </p>
          ) : (
            <FlavourGrid
              items={filtered}
              tab="special"
              favourites={favouritesSet}
              searchQuery={query}
              onToggleFavourite={toggleFavourite}
              onCopyFlavourLink={copyFlavourPageLink}
              t={t}
            />
          )
        ) : null}
      </div>
    </>
  );
}
