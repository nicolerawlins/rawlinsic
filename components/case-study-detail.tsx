"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import { CASE_STUDIES, type CaseStudy } from "@/components/case-studies-data";

interface Props {
  study: CaseStudy;
}

export default function CaseStudyDetail({ study }: Props) {
  const idx = CASE_STUDIES.findIndex((s) => s.slug === study.slug);
  const prev = idx > 0 ? CASE_STUDIES[idx - 1] : null;
  const next = idx < CASE_STUDIES.length - 1 ? CASE_STUDIES[idx + 1] : null;

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const animFrame = useRef<number | null>(null);
  const [expandedTiles, setExpandedTiles] = useState<Set<number>>(new Set());
  const toggleTile = (idx: number) => setExpandedTiles(prev => {
    const next = new Set(prev);
    next.has(idx) ? next.delete(idx) : next.add(idx);
    return next;
  });

  /* ── Custom cursor ── */
  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      dot.style.left = e.clientX - 4 + "px";
      dot.style.top = e.clientY - 4 + "px";
    };
    const animateRing = () => {
      ringX.current += (mouseX.current - ringX.current) * 0.12;
      ringY.current += (mouseY.current - ringY.current) * 0.12;
      ring.style.left = ringX.current - 20 + "px";
      ring.style.top = ringY.current - 20 + "px";
      animFrame.current = requestAnimationFrame(animateRing);
    };
    document.addEventListener("mousemove", onMouseMove);
    animFrame.current = requestAnimationFrame(animateRing);
    const hoverEls = document.querySelectorAll("a, button, .nav-item, .back-to-top");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  /* ── Micro particles ── */
  useEffect(() => {
    const container = document.getElementById("microParticles");
    if (!container) return;
    for (let i = 0; i < 10; i++) {
      const p = document.createElement("div");
      p.className = "micro-particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = 8 + Math.random() * 14 + "s";
      p.style.animationDelay = Math.random() * 12 + "s";
      const size = 1.5 + Math.random() * 2.5 + "px";
      p.style.width = size;
      p.style.height = size;
      p.style.opacity = String(0.15 + Math.random() * 0.25);
      container.appendChild(p);
    }
    return () => { container.innerHTML = ""; };
  }, []);

  /* ── Nav scroll + back-to-top ── */
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

  /* ── Scroll reveal ── */
  useEffect(() => {
    let observer: IntersectionObserver;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const reveals = document.querySelectorAll(".reveal");
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) entry.target.classList.add("visible");
            });
          },
          { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
        );
        reveals.forEach((el) => observer.observe(el));
        setTimeout(() => {
          reveals.forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("visible");
          });
        }, 100);
      });
    });
    return () => { cancelAnimationFrame(raf); if (observer) observer.disconnect(); };
  }, []);

  return (
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

      {/* Custom Cursor */}
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* Back to Top */}
      <a href="#top" className="back-to-top" id="backToTop" aria-label="Back to top">
        <svg viewBox="0 0 24 24">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </a>

      <SiteNav />

      <div className="content-wrapper">
        {/* ── Hero with image ── */}
        <section className="csd-hero csd-hero-case-study" id="top" data-slug={study.slug}>
          <Image
            src={study.heroImage}
            alt={study.title}
            fill
            priority
            sizes="100vw"
            className="csd-hero-img"
          />
          <div className="csd-hero-overlay" />
          <div className="csd-hero-content">
            <Link href="/insights/case-studies" className="csd-back-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              All Case Studies
            </Link>
            <span className="hero-label">{study.subtitle || "Case Study"}</span>
            <h1 className="hero-title">{study.title}</h1>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider">
          <div className="gold-line" />
        </div>

        {/* ── Content ── */}
        <section className="csd-content">
          <div className="csd-content-inner">
            {/* Description */}
            <p className="csd-description reveal">{study.description}</p>

            {/* Client info (Delaware-style) */}
            {study.clientInfo && (
              <div className="csd-client-info reveal">
                {study.clientInfo.client && (
                  <div className="csd-info-item">
                    <span className="csd-info-label">Client</span>
                    <span className="csd-info-value">{study.clientInfo.client}</span>
                  </div>
                )}
                {study.clientInfo.location && (
                  <div className="csd-info-item">
                    <span className="csd-info-label">Location</span>
                    <span className="csd-info-value">{study.clientInfo.location}</span>
                  </div>
                )}
                {study.clientInfo.year && (
                  <div className="csd-info-item">
                    <span className="csd-info-label">Year</span>
                    <span className="csd-info-value">{study.clientInfo.year}</span>
                  </div>
                )}
                {study.clientInfo.services && (
                  <div className="csd-info-item">
                    <span className="csd-info-label">Services</span>
                    <span className="csd-info-value">{study.clientInfo.services}</span>
                  </div>
                )}
              </div>
            )}

            {/* Divider before projects — matches tile grid width */}
            <div className="csd-wide-section">
              <div className="section-divider" style={{ padding: 0, marginBottom: 48 }}>
                <div className="gold-line" />
              </div>

              {/* Section heading */}
              {study.sectionHeading && (
                <h2 className="csd-section-heading reveal">
                  {study.sectionHeading}
                </h2>
              )}
            </div>

            {/* Projects — tile grid (Insights-style) */}
            <div className="csd-projects-grid">
              {study.projects.map((project, pi) => (
                <div
                  key={pi}
                  className={`csd-project-tile reveal visible rd${(pi % 4) + 1}`}
                >
                  <span className="csd-tile-subtitle">
                    {String(pi + 1).padStart(2, "0")}
                  </span>
                  <h3 className="csd-tile-title">{project.title}</h3>
                  {project.budget && (
                    <span className="csd-tile-budget">{project.budget}</span>
                  )}
                  <button
                    className="csd-tile-expand-hint"
                    onClick={(e) => { e.stopPropagation(); toggleTile(pi); }}
                    aria-label={expandedTiles.has(pi) ? "Collapse" : "Expand"}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  {project.bullets && project.bullets.length > 0 && (
                    <ul className="csd-tile-bullets">
                      {project.bullets.map((b, bi) => (
                        <li key={bi}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Impact note */}
            {study.impactNote && (
              <div className="csd-impact reveal">
                <p>{study.impactNote}</p>
              </div>
            )}
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider" style={{ maxWidth: 1000, margin: "0 auto", padding: "0 40px" }}>
          <div className="gold-line" />
        </div>

        {/* ── Navigation between case studies ── */}
        <section className="csd-nav-section">
          <div className="csd-nav-inner">
            {prev ? (
              <Link
                href={`/insights/case-studies/${prev.slug}`}
                className="csd-nav-link csd-nav-prev"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <div>
                  <span className="csd-nav-label">Previous</span>
                  <span className="csd-nav-name">{prev.title}</span>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/insights/case-studies/${next.slug}`}
                className="csd-nav-link csd-nav-next"
              >
                <div>
                  <span className="csd-nav-label">Next</span>
                  <span className="csd-nav-name">{next.title}</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider">
          <div className="gold-line" />
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
