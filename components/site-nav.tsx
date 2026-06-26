"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import SiteSearch from "@/components/site-search";

const LOGO_URL =
  "/images/pages/hero-bg.webp";

interface SiteNavProps {
  /** href for the "Get In Touch" CTA button. Defaults to /contact */
  ctaHref?: string;
  /** Hide the top-left wordmark until the user scrolls. Used on
   *  the home page where the big logo lives inside the hero. */
  homeMode?: boolean;
}

export default function SiteNav({ ctaHref = "/contact", homeMode = false }: SiteNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (navRef.current) navRef.current.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Global keyboard shortcut: Cmd/Ctrl + K opens search */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "/" && !searchOpen) {
        const target = e.target as HTMLElement | null;
        const tag = target?.tagName;
        if (tag !== "INPUT" && tag !== "TEXTAREA" && !(target as HTMLElement)?.isContentEditable) {
          e.preventDefault();
          setSearchOpen(true);
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState<Set<string>>(new Set());
  const close = () => { setMobileMenuOpen(false); setMobileSubOpen(new Set()); };
  const toggleSub = (key: string) => setMobileSubOpen(prev => {
    const next = new Set(prev);
    if (next.has(key)) {
      next.delete(key);
      // close nested subs when closing parent
      if (key === "cap") next.delete("tech");
    } else {
      // close other top-level groups (but keep nested ones)
      if (key !== "tech") {
        next.clear();
      }
      next.add(key);
      // keep parent open when opening nested
      if (key === "tech") next.add("cap");
    }
    return next;
  });

  return (
    <>
      {/* Mobile Menu */}
      <div className={`mobile-menu${mobileMenuOpen ? " active" : ""}`}>
        <button className="mobile-menu-close" onClick={close} aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>

        <div className="mobile-menu-items">
          <button
            type="button"
            className="mobile-menu-search-trigger"
            onClick={() => { close(); setSearchOpen(true); }}
            aria-label="Open search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <span>Search the site</span>
          </button>
          <a href="/" onClick={close} className="mobile-menu-link">Home</a>

          {/* Capabilities */}
          <div className="mobile-menu-group">
            <button className="mobile-menu-parent" onClick={() => toggleSub("cap")}>
              Capabilities
              <svg className={`mobile-menu-chevron${mobileSubOpen.has("cap") ? " open" : ""}`} width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5l5 5 5-5"/></svg>
            </button>
            <div className={`mobile-menu-sub${mobileSubOpen.has("cap") ? " open" : ""}`}>
              <a href="/capabilities" onClick={close}>View All</a>
              <a href="/capabilities#strategy" onClick={close}>Strategy</a>
              <a href="/capabilities#operations" onClick={close}>Operations</a>
              <div className="mobile-menu-group mobile-menu-group-nested">
                <div className="mobile-menu-parent mobile-menu-parent-nested mobile-menu-split">
                  <a
                    href="/capabilities#technology"
                    onClick={close}
                    className="mobile-menu-split-link"
                  >
                    Technology
                  </a>
                  <button
                    type="button"
                    onClick={() => toggleSub("tech")}
                    className="mobile-menu-split-toggle"
                    aria-label={mobileSubOpen.has("tech") ? "Collapse Technology menu" : "Expand Technology menu"}
                    aria-expanded={mobileSubOpen.has("tech")}
                  >
                    <svg className={`mobile-menu-chevron${mobileSubOpen.has("tech") ? " open" : ""}`} width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5l5 5 5-5"/></svg>
                  </button>
                </div>
                <div className={`mobile-menu-sub mobile-menu-sub-nested${mobileSubOpen.has("tech") ? " open" : ""}`}>
                  <a href="/capabilities/technology/advanced-air-mobility" onClick={close}>Advanced Air Mobility &amp; UAS</a>
                  <a href="/capabilities/technology/automation-integration" onClick={close}>Data, Automation, &amp; AI</a>
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="mobile-menu-group">
            <button className="mobile-menu-parent" onClick={() => toggleSub("about")}>
              About
              <svg className={`mobile-menu-chevron${mobileSubOpen.has("about") ? " open" : ""}`} width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5l5 5 5-5"/></svg>
            </button>
            <div className={`mobile-menu-sub${mobileSubOpen.has("about") ? " open" : ""}`}>
              <a href="/#story" onClick={close}>Who We Are</a>
              <a href="/about/our-people" onClick={close}>Our People</a>
              <a href="/about/areas-we-serve" onClick={close}>Areas We Serve</a>
            </div>
          </div>

          {/* Insights */}
          <div className="mobile-menu-group">
            <button className="mobile-menu-parent" onClick={() => toggleSub("insights")}>
              Insights
              <svg className={`mobile-menu-chevron${mobileSubOpen.has("insights") ? " open" : ""}`} width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5l5 5 5-5"/></svg>
            </button>
            <div className={`mobile-menu-sub${mobileSubOpen.has("insights") ? " open" : ""}`}>
              <a href="/insights" onClick={close}>View All</a>
              <a href="/insights/thought-leadership" onClick={close}>Thought Leadership</a>
              <a href="/insights/case-studies" onClick={close}>Case Studies</a>
              <a href="/insights/podcast" onClick={close}>Podcast</a>
            </div>
          </div>

          <div className="mobile-menu-group" style={{ marginTop: 12 }}>
            <button className="mobile-menu-parent" onClick={() => toggleSub("careers")}>
              Careers
              <svg className={`mobile-menu-chevron${mobileSubOpen.has("careers") ? " open" : ""}`} width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5l5 5 5-5"/></svg>
            </button>
            <div className={`mobile-menu-sub${mobileSubOpen.has("careers") ? " open" : ""}`}>
              <a href="/careers" onClick={close}>View All</a>
              <a href="/careers/proposal-writer-manager" onClick={close}>Proposal Writer/Manager</a>
            </div>
          </div>
        </div>

        <Link href={ctaHref} onClick={close} className="mobile-menu-cta">Get In Touch</Link>

        {/* Social icons — same as footer */}
        <div className="mobile-menu-social">
          <a href="https://www.linkedin.com/company/107078508/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
            <span style={{ fontFamily: "Arial, sans-serif", fontSize: "20px", fontWeight: 700, color: "#060c16", lineHeight: 1, letterSpacing: "-0.5px" }}>in</span>
          </a>
          <a href="https://g.page/r/CSNh-GWp5ejQEAI/review" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Google">
            <span style={{ fontFamily: "Arial, sans-serif", fontSize: "22px", fontWeight: 700, color: "#060c16", lineHeight: 1 }}>G</span>
          </a>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`nav${homeMode ? " home-mode" : ""}`} id="mainNav" ref={navRef}>
        <a href="/" className="nav-logo" aria-label="Rawlins home">
          <Image src={LOGO_URL} alt="Rawlins" width={160} height={40} className="nav-logo-img" priority fetchPriority="high" />
        </a>

        <div className="nav-center">
          <div className="nav-item has-sub">
            <span className="nav-item-label">
              Capabilities
              <svg className="nav-chevron" width="8" height="5" viewBox="0 0 8 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 1l3 3 3-3"/>
              </svg>
            </span>
            <div className="nav-dropdown">
              <a href="/capabilities">View All</a>
              <a href="/capabilities#strategy">Strategy</a>
              <a href="/capabilities#operations">Operations</a>
              <div className="nav-dropdown-sub">
                <span className="nav-dropdown-sub-label" style={{ cursor: "pointer" }} onClick={() => { window.location.href = "/capabilities#technology"; }}>
                  Technology
                  <svg className="nav-sub-chevron" width="6" height="8" viewBox="0 0 6 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 1l4 3-4 3"/>
                  </svg>
                </span>
                <div className="nav-sub-dropdown">
                  <a href="/capabilities/technology/advanced-air-mobility">Advanced Air Mobility &amp; UAS</a>
                  <a href="/capabilities/technology/automation-integration">Data, Automation, &amp; AI</a>
                </div>
              </div>
            </div>
          </div>

          <div className="nav-item has-sub">
            <span className="nav-item-label">
              About
              <svg className="nav-chevron" width="8" height="5" viewBox="0 0 8 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 1l3 3 3-3"/>
              </svg>
            </span>
            <div className="nav-dropdown">
              <a href="/#story">Who We Are</a>
              <a href="/about/our-people">Our People</a>
              <a href="/about/areas-we-serve">Areas We Serve</a>
            </div>
          </div>

          <div className="nav-item has-sub">
            <span className="nav-item-label">
              Insights
              <svg className="nav-chevron" width="8" height="5" viewBox="0 0 8 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 1l3 3 3-3"/>
              </svg>
            </span>
            <div className="nav-dropdown">
              <a href="/insights">View All</a>
              <a href="/insights/thought-leadership">Thought Leadership</a>
              <a href="/insights/case-studies">Case Studies</a>
              <a href="/insights/podcast">Podcast</a>
            </div>
          </div>

          <div className="nav-item has-sub">
            <span className="nav-item-label">
              Careers
              <svg className="nav-chevron" width="8" height="5" viewBox="0 0 8 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 1l3 3 3-3"/>
              </svg>
            </span>
            <div className="nav-dropdown">
              <a href="/careers">View All</a>
              <a href="/careers/proposal-writer-manager">Proposal Writer/Manager</a>
            </div>
          </div>
        </div>

        <div className="nav-right">
          <button
            type="button"
            className="nav-search-btn"
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </button>
          <Link href={ctaHref} className="nav-cta">Get In Touch</Link>
        </div>

        <div
          className="menu-toggle"
          onClick={() => setMobileMenuOpen((v) => !v)}
          role="button"
          aria-label="Open menu"
          tabIndex={0}
        >
          <span />
          <span />
          <span />
        </div>
      </nav>

      <SiteSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
