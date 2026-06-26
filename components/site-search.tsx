"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SEARCH_INDEX, type SearchEntry } from "@/components/site-search-index";

type ScoredEntry = SearchEntry & { score: number };

function score(entry: SearchEntry, q: string): number {
  if (!q) return 0;
  const needles = q
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 0);
  if (needles.length === 0) return 0;

  const title = entry.title.toLowerCase();
  const keywords = entry.keywords.toLowerCase();
  const desc = entry.description.toLowerCase();
  const category = entry.category.toLowerCase();

  let total = 0;
  for (const needle of needles) {
    let termScore = 0;
    if (title.startsWith(needle)) termScore += 60;
    else if (title.includes(needle)) termScore += 40;
    if (category.includes(needle)) termScore += 20;
    if (keywords.includes(needle)) termScore += 15;
    if (desc.includes(needle)) termScore += 8;
    if (termScore === 0) return 0; // every word must match something
    total += termScore;
  }
  return total;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SiteSearch({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  /* Single navigation path used by both Enter and click, so the two
     behave identically (per the "Enter select" hint in the footer).
     Subtlety: results that link to a team-member popup use hash deep
     links (e.g. /about/our-people#satheesh-vivekanandan) that the
     team page opens via a `hashchange` listener. Next.js router.push
     for a same-path hash change doesn't reliably fire `hashchange`,
     so for that case we set window.location.hash directly. For
     cross-page navigation router.push gives smooth client-side
     transitions and the team page's mount effect picks up the hash. */
  const goTo = useCallback((href: string) => {
    onClose();
    try {
      const url = new URL(href, window.location.origin);
      const samePath = url.pathname === window.location.pathname;
      if (samePath && url.hash) {
        /* If the same hash is already set, the browser won't fire
           hashchange — clear it first so the next set always fires. */
        if (window.location.hash === url.hash) {
          history.replaceState(null, "", url.pathname + url.search);
        }
        window.location.hash = url.hash;
        return;
      }
    } catch {
      /* fall through to router.push on URL parse failure */
    }
    router.push(href);
  }, [onClose, router]);

  const results: ScoredEntry[] = useMemo(() => {
    const q = query.trim();
    if (!q) {
      return SEARCH_INDEX.filter((e) => e.category === "Main").map((e) => ({
        ...e,
        score: 0,
      }));
    }
    return SEARCH_INDEX
      .map((e) => ({ ...e, score: score(e, q) }))
      .filter((e) => e.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  }, [query]);

  /* Reset + focus when opened */
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIdx(0);
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [open]);

  /* Clamp active index to current results */
  useEffect(() => {
    if (activeIdx >= results.length) setActiveIdx(0);
  }, [results, activeIdx]);

  /* Keyboard: Escape closes, arrows navigate, Enter follows */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (!results.length) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => (i + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => (i - 1 + results.length) % results.length);
      } else if (e.key === "Enter") {
        const target = results[activeIdx];
        if (target) {
          e.preventDefault();
          goTo(target.href);
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, results, activeIdx, onClose]);

  /* Lock body scroll while open — use position:fixed so mobile Safari
     can't swipe the page left/right behind the overlay */
  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const scrollY = window.scrollY;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      overflowX: body.style.overflowX,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.style.overflowX = "hidden";
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      body.style.overflowX = prev.overflowX;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  /* Keep active item in view */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const item = list.children[activeIdx] as HTMLElement | undefined;
    if (item) item.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  if (!open) return null;

  return (
    <div className="site-search-overlay" onClick={onClose} role="dialog" aria-label="Site search">
      <div className="site-search-panel" onClick={(e) => e.stopPropagation()}>
        <div className="site-search-input-wrap">
          <svg
            className="site-search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            className="site-search-input"
            placeholder="Search capabilities, insights, team…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIdx(0);
            }}
            aria-label="Search"
            aria-autocomplete="list"
            autoComplete="off"
          />
          <button type="button" className="site-search-close" onClick={onClose} aria-label="Close search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {query.trim() === "" ? (
          <p className="site-search-hint">Popular pages</p>
        ) : results.length === 0 ? (
          <p className="site-search-empty">
            No results for &ldquo;{query.trim()}&rdquo;. Try a different term.
          </p>
        ) : (
          <p className="site-search-hint">
            {results.length} {results.length === 1 ? "result" : "results"}
          </p>
        )}

        {results.length > 0 && (
          <ul className="site-search-results" ref={listRef} role="listbox">
            {results.map((r, i) => (
              <li key={`${r.href}-${i}`} className={activeIdx === i ? "active" : ""} role="option" aria-selected={activeIdx === i}>
                <a
                  href={r.href}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(r.href);
                  }}
                  onMouseEnter={() => setActiveIdx(i)}
                  className="site-search-result"
                >
                  <div className="site-search-result-main">
                    <span className="site-search-result-cat">{r.category}</span>
                    <span className="site-search-result-title">{r.title}</span>
                  </div>
                  <p className="site-search-result-desc">{r.description}</p>
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="site-search-footer">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>Enter</kbd> select
          </span>
          <span>
            <kbd>Esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
}
