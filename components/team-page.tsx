"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import { TEAM_MEMBERS, type TeamMember } from "@/lib/team-data";

type FilterCategory = "all" | "strategy" | "operations" | "technology" | "communication-brand-design" | "administration";

const FILTERS: { label: string; value: FilterCategory }[] = [
  { label: "All", value: "all" },
  { label: "Strategy", value: "strategy" },
  { label: "Operations", value: "operations" },
  { label: "Technology", value: "technology" },
  { label: "Communication, Brand & Design", value: "communication-brand-design" },
  { label: "Administration", value: "administration" },
];

// Render bio text: handles **bold**, - bullets, paragraph breaks
function BioText({ text }: { text: string }) {
  if (!text || text.trim() === "Coming soon!") {
    return <p className="team-bio-text">Coming soon.</p>;
  }
  const paragraphs = text.split(/\n\n+/);
  return (
    <>
      {paragraphs.map((para, pi) => {
        const lines = para.split("\n");
        const isBulletBlock = lines.some((l) => l.trim().startsWith("- "));
        if (isBulletBlock) {
          const items: string[] = [];
          let currentText = "";
          lines.forEach((line) => {
            if (line.trim().startsWith("- ")) {
              if (currentText) items.push(currentText.trim());
              currentText = line.trim().slice(2);
            } else {
              currentText += " " + line;
            }
          });
          if (currentText) items.push(currentText.trim());
          return (
            <ul key={pi} className="team-bio-list">
              {items.map((item, ii) => (
                <li key={ii}>
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={pi} className="team-bio-text">
            <RichText text={para} />
          </p>
        );
      })}
    </>
  );
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

const SCOTT = TEAM_MEMBERS.find((m) => m.name.includes("Scott Rawlins"))!;

/** Convert a team member name into a stable URL-friendly slug so other
 *  pages (e.g. thought-leadership articles) can deep-link to a specific
 *  profile via `/about/our-people#{slug}`. */
export function memberSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[.,]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function TeamPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedMembers, setDisplayedMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [gridOpacity, setGridOpacity] = useState(1);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [heroParaExpanded, setHeroParaExpanded] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Custom cursor
  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    let rafId: number;
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX - 4 + "px";
      dot.style.top = mouseY - 4 + "px";
    };
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX - 20 + "px";
      ring.style.top = ringY - 20 + "px";
      rafId = requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Micro particles
  useEffect(() => {
    const container = document.getElementById("microParticles");
    if (!container) return;
    const count = 60;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.top = Math.random() * 100 + "%";
      p.style.animationDelay = Math.random() * 8 + "s";
      p.style.animationDuration = 6 + Math.random() * 8 + "s";
      container.appendChild(p);
    }
    return () => { container.innerHTML = ""; };
  }, []);

  // Nav scroll background
  useEffect(() => {
    const nav = document.getElementById("mainNav");
    const backToTop = document.getElementById("backToTop");
    const onScroll = () => {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 60);
      if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape key closes popup
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedMember(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Deep-link: open a member's popup when the URL hash matches their
  // slug (e.g. /about/our-people#april-blackburn-pmp). Runs on mount
  // and again whenever the hash changes.
  useEffect(() => {
    const openFromHash = () => {
      const raw = window.location.hash.replace(/^#/, "").trim();
      if (!raw) return;
      const target = TEAM_MEMBERS.find((m) => memberSlug(m.name) === raw);
      if (target) setSelectedMember(target);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  // Lock body scroll when popup open
  useEffect(() => {
    if (selectedMember) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
        document.documentElement.style.overflow = "";
      };
    }
  }, [selectedMember]);

  // Scroll reveal
  useEffect(() => {
    let ob: IntersectionObserver;
    const timer = setTimeout(() => {
      const els = document.querySelectorAll(".reveal");
      if (els.length === 0) return;
      ob = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
        { threshold: 0.08 }
      );
      els.forEach((el) => ob.observe(el));
    }, 300);
    return () => { clearTimeout(timer); if (ob) ob.disconnect(); };
  }, []);

  const getFilteredMembers = useCallback((cat: FilterCategory, query: string) => {
    let members = cat === "all" ? TEAM_MEMBERS : TEAM_MEMBERS.filter((m) => m.categories.includes(cat));
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      members = members.filter((m) =>
        m.name.toLowerCase().includes(q) ||
        (m.title && m.title.toLowerCase().includes(q)) ||
        m.role.toLowerCase().includes(q)
      );
    }
    return members;
  }, []);

  const handleFilterChange = useCallback((cat: FilterCategory) => {
    if (cat === activeFilter) return;
    setGridOpacity(0);
    setTimeout(() => {
      setActiveFilter(cat);
      setDisplayedMembers(getFilteredMembers(cat, searchQuery));
      setGridOpacity(1);
    }, 220);
  }, [activeFilter, searchQuery, getFilteredMembers]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setDisplayedMembers(getFilteredMembers(activeFilter, query));
  }, [activeFilter, getFilteredMembers]);

  const navigateMember = useCallback((dir: "prev" | "next") => {
    if (!selectedMember) return;
    const list = activeFilter === "all"
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((m) => m.categories.includes(activeFilter));
    const idx = list.findIndex((m) => m.id === selectedMember.id);
    if (dir === "prev") {
      setSelectedMember(list[(idx - 1 + list.length) % list.length]);
    } else {
      setSelectedMember(list[(idx + 1) % list.length]);
    }
  }, [selectedMember, activeFilter]);

  // Keyboard arrow navigation
  useEffect(() => {
    if (!selectedMember) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigateMember("prev");
      else if (e.key === "ArrowRight") navigateMember("next");
      else if (e.key === "Escape") setSelectedMember(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedMember, navigateMember]);

  // Touch swipe navigation on popup
  const touchStartX = useRef(0);
  useEffect(() => {
    if (!selectedMember) return;
    const popup = document.querySelector(".team-popup-overlay");
    if (!popup) return;
    const onTouchStart = (e: Event) => { touchStartX.current = (e as TouchEvent).touches[0].clientX; };
    const onTouchEnd = (e: Event) => {
      const dx = (e as TouchEvent).changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) > 60) {
        if (dx > 0) navigateMember("prev");
        else navigateMember("next");
      }
    };
    popup.addEventListener("touchstart", onTouchStart, { passive: true });
    popup.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      popup.removeEventListener("touchstart", onTouchStart);
      popup.removeEventListener("touchend", onTouchEnd);
    };
  }, [selectedMember, navigateMember]);

  return (
    <>
      {/* Custom Cursor */}
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    <>
      {/* Ambient Background */}
      <div className="ambient-bg" />
      <div className="ambient-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>
      <div className="micro-particles" id="microParticles" />

      {/* Back to Top */}
      <a href="#top" className="back-to-top" id="backToTop" aria-label="Back to top">
        <svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      </a>

      <SiteNav />

      <div className="content-wrapper">

        {/* Hero */}
        <section className="team-hero" id="top">
          <div className="team-hero-content">
            <span className="hero-label"><span className="gold-text">Our People</span></span>
            <h1 className="hero-title">
              Meet the <span className="gold-text"><em>Experts</em></span>
            </h1>
            <div className={`team-hero-para-wrap${heroParaExpanded ? " expanded" : ""}`}>
              <p className="hero-sub team-hero-para">
                Our team brings together expertise in strategy, operations, and technology to deliver practical, forward-thinking solutions to complex challenges. While rooted in transportation, we continue to expand our experience across sectors. Collaboration is central to how we work. Team members have core areas of focus and work seamlessly across disciplines to support each engagement.
              </p>
              <button
                className="team-hero-para-toggle"
                aria-label={heroParaExpanded ? "Collapse" : "Expand"}
                aria-expanded={heroParaExpanded}
                onClick={() => setHeroParaExpanded(v => !v)}
              >
                <svg width="14" height="8" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5l7 7 7-7" /></svg>
              </button>
            </div>
            <div className="hero-scroll team-hero-scroll" style={{ position: "relative", bottom: "auto", marginTop: "32px" }}>
              <span>Keep scrolling to view team</span>
              <div className="scroll-line" />
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider"><div className="gold-line" /></div>

        {/* Scott Rawlins Featured */}
        <section className="scott-featured-section reveal">
          <div className="scott-featured-grid">
            <div className="scott-featured-card-col">
              <button
                className="team-card scott-featured-card"
                onClick={() => setSelectedMember(SCOTT)}
                aria-label="View profile of Scott Rawlins, P.E."
              >
                <div className="team-card-photo-wrap">
                  <Image
                    src="/images/team/scott.webp"
                    alt="Scott Rawlins, P.E."
                    width={400}
                    height={500}
                    className="team-card-photo"
                    sizes="(max-width: 768px) 50vw, 320px"
                  />
                  <div className="team-card-overlay">
                    <span className="team-card-view">View Profile</span>
                  </div>
                </div>
                <div className="team-card-info">
                  <span className="team-card-name">Scott Rawlins, P.E.</span>
                  <span className="team-card-title-label" style={{ background: "linear-gradient(135deg, #c9a84c, #e8d5a0, #d4b878)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Founder</span>
                </div>
              </button>
            </div>
            <div className="scott-featured-quote-col">
              <div className="scott-featured-quote-card">
                <svg className="scott-quote-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" fill="currentColor"/>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" fill="currentColor"/>
                </svg>
                <p className="scott-featured-quote-text">
                  We&rsquo;ve built this firm on trust&mdash;working in close partnership with our clients to understand their reality and bring the right mix of perspectives, delivering outcomes that truly fit their needs.&rdquo;
                </p>
                <div className="scott-featured-quote-attribution">
                  <span className="scott-featured-quote-dash">&mdash;</span>
                  <strong><span className="gold-text">Founder</span>, Scott Rawlins, P.E.</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider"><div className="gold-line" /></div>

        {/* Search + Filter Tabs */}
        <section className="team-filter-section reveal">
          <div className="team-search-wrap">
            <svg className="team-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              className="team-search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              autoComplete="off"
            />
            {searchQuery && (
              <button
                className="team-search-clear"
                onClick={() => handleSearch("")}
                aria-label="Clear search"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <div className="team-filter-tabs">
            {FILTERS.map((f, i) => (
              <React.Fragment key={f.value}>
                <button
                  className={`team-filter-tab${activeFilter === f.value ? " active" : ""}`}
                  onClick={() => handleFilterChange(f.value)}
                >
                  {f.label}
                  <span className="team-filter-count">
                    {f.value === "all"
                      ? TEAM_MEMBERS.length
                      : TEAM_MEMBERS.filter((m) => m.categories.includes(f.value)).length}
                  </span>
                </button>
                {(i === 1 || i === 3 || i === 4) && <div className="team-filter-break" />}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Team Grid */}
        <section className="team-grid-section">
          <div
            className="team-grid"
            style={{ opacity: gridOpacity, transition: "opacity 0.22s ease" }}
          >
            {displayedMembers.length === 0 && (
              <div className="team-no-results">
                <p>No team members found{searchQuery ? ` for "${searchQuery}"` : ""}.</p>
              </div>
            )}
            {displayedMembers.map((member) => (
              <button
                key={member.id}
                className="team-card"
                onClick={() => setSelectedMember(member)}
                aria-label={`View profile of ${member.name}`}
              >
                <div className="team-card-photo-wrap">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={400}
                    height={500}
                    className="team-card-photo"
                    sizes="(max-width: 768px) 50vw, (max-width: 1100px) 33vw, 25vw"
                  />
                  <div className="team-card-overlay">
                    <span className="team-card-view">View Profile</span>
                  </div>
                </div>
                <div className="team-card-info">
                  <span className="team-card-name">{member.name}</span>
                  {member.title && <span className="team-card-title-label">{member.title}</span>}
                  <span className="team-card-role">{member.role}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider"><div className="gold-line" /></div>
      </div>

      <SiteFooter />

      {/* Popup Modal */}
      {selectedMember && (
        <div
          className="team-popup-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedMember(null); }}
          role="dialog"
          aria-modal="true"
          aria-label={`Profile: ${selectedMember.name}`}
        >
          {/* Prev arrow */}
          <button
            className="team-popup-arrow team-popup-arrow-prev"
            onClick={() => navigateMember("prev")}
            aria-label="Previous member"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="team-popup">
            {/* Close button */}
            <button
              className="team-popup-close"
              onClick={() => setSelectedMember(null)}
              aria-label="Close profile"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Left Panel */}
            <div className="team-popup-left">
              <div className="team-popup-photo-ring">
                <Image
                  src={selectedMember.photo}
                  alt={selectedMember.name}
                  width={300}
                  height={375}
                  className="team-popup-photo"
                  sizes="300px"
                />
              </div>
              {selectedMember.title && (
                <span className="team-popup-title-badge">{selectedMember.title}</span>
              )}
              <h2 className="team-popup-name">{selectedMember.name}</h2>
              <p className="team-popup-role"><em>{selectedMember.role}</em></p>
              <p className="team-popup-location">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Located in {selectedMember.location}
              </p>
              <div className="team-popup-divider" />
              {selectedMember.phone && (
                <a href={`tel:${selectedMember.phone.replace(/[^+\d]/g, "")}`} className="team-popup-contact-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.94 6.94l1.52-1.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  <span>{selectedMember.phone}</span>
                </a>
              )}
              {selectedMember.phone2 && (
                <a href={`tel:${selectedMember.phone2.replace(/[^+\d]/g, "")}`} className="team-popup-contact-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.94 6.94l1.52-1.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  <span>{selectedMember.phone2}</span>
                </a>
              )}
              {selectedMember.email && (
                <a href={`mailto:${selectedMember.email}`} className="team-popup-contact-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>{selectedMember.email}</span>
                </a>
              )}
              {selectedMember.linkedin && (
              <div className="team-popup-social">
                <a
                  href={selectedMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-popup-social-btn"
                  aria-label="LinkedIn"
                >
                  <span style={{ fontFamily: "Arial, sans-serif", fontSize: "22px", fontWeight: 700, color: "#0e1e3a", lineHeight: 1, letterSpacing: "-0.5px" }}>in</span>
                </a>
              </div>
              )}
            </div>

            {/* Right Panel */}
            <div className="team-popup-right">
              {selectedMember.background && (
                <div className="team-popup-section">
                  <h3 className="team-popup-section-title">Background</h3>
                  <BioText text={selectedMember.background} />
                </div>
              )}
              {selectedMember.achievements && (
                <>
                  <div className="team-popup-section-divider" />
                  <div className="team-popup-section">
                    <h3 className="team-popup-section-title">Achievements</h3>
                    <BioText text={selectedMember.achievements} />
                  </div>
                </>
              )}
              {!selectedMember.background && !selectedMember.achievements && (
                <div className="team-popup-section">
                  <p className="team-bio-text" style={{ color: "#888" }}>
                    Profile coming soon.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Next arrow */}
          <button
            className="team-popup-arrow team-popup-arrow-next"
            onClick={() => navigateMember("next")}
            aria-label="Next member"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </>
    </>
  );
}
