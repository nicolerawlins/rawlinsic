"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
/* ── Cursor component ── */
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    dot.style.opacity = "0";
    ring.style.opacity = "0";
    let started = false;
    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      dot.style.left = e.clientX - 4 + "px";
      dot.style.top = e.clientY - 4 + "px";
      if (!started) {
        started = true;
        ringX.current = e.clientX;
        ringY.current = e.clientY;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
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

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}

export default function PodcastPage() {

  const podPlayerRef = useRef<HTMLDivElement>(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  /* ── MyPodOps player script ── */
  useEffect(() => {
    const container = podPlayerRef.current;
    if (!container) return;
    // Avoid double-loading
    if (container.querySelector("script")) return;

    // Inject style override for player header
    const style = document.createElement("style");
    style.textContent = `.mypodops-player-header { background: linear-gradient(135deg, #2d3340 0%, #3a3f4a 100%) !important; }`;
    document.head.appendChild(style);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.src = "https://www.mypodops.com/hosting/player/embed.js?id=3542&type=full&primary=c9a84c&secondary=4a4f57&width=100%25&height=450&artwork=1&desc=1&waveform=0&theme=minimal";
    container.appendChild(script);
    return () => { style.remove(); };
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
      <CustomCursor />

      {/* Back to Top */}
      <a href="#top" className="back-to-top" id="backToTop" aria-label="Back to top">
        <svg viewBox="0 0 24 24">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </a>

      <SiteNav />

      <div className="content-wrapper">
        {/* ── Hero Section ── */}
        <section className="pod-hero" id="top">
          <div className="pod-hero-content">
            <div className="pod-hero-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                <defs>
                  <linearGradient id="iconGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c9b78c" />
                    <stop offset="50%" stopColor="#eae2cc" />
                    <stop offset="100%" stopColor="#d9cca9" />
                  </linearGradient>
                  <linearGradient id="iconGoldFill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(201, 183, 140,0.25)" />
                    <stop offset="100%" stopColor="rgba(234, 226, 204,0.15)" />
                  </linearGradient>
                </defs>
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="url(#iconGoldFill)" stroke="url(#iconGoldGrad)" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="url(#iconGoldGrad)" />
                <line x1="12" y1="19" x2="12" y2="23" stroke="url(#iconGoldGrad)" />
                <line x1="8" y1="23" x2="16" y2="23" stroke="url(#iconGoldGrad)" />
              </svg>
            </div>
            <span className="hero-label">
              <span className="gold-text">
                <span className="hero-label-segment">Listen In&nbsp;&bull;&nbsp;Learn More&nbsp;&bull;</span>{" "}
                <span className="hero-label-segment">Lead Better</span>
              </span>
            </span>
            <h1 className="hero-title">The <em>Rawlins</em> Way</h1>
            {/* EQ bars under title in hero */}
            <div className="pod-hero-eq">
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  className="pod-eq-bar"
                  style={{
                    animationDelay: `${i * 0.06}s`,
                    animationDuration: `${0.8 + Math.random() * 0.8}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider">
          <div className="gold-line" />
        </div>

        {/* ── About + Player Two-Column ── */}
        <section className="pod-main reveal">
          <div className="pod-main-grid">
            {/* Left: About */}
            <div className="pod-about">
              <p className="section-label"><span className="gold-text">about the podcast</span></p>
              <h2 className="section-title" style={{ color: "#fff", marginBottom: 24 }}>
                Providing <em>value</em><br />Consulting with <em>purpose</em>
              </h2>
              <button
                type="button"
                className={`intro-expand-btn pod-about-expand${aboutOpen ? " expanded" : ""}`}
                aria-label={aboutOpen ? "Collapse description" : "Expand description"}
                aria-expanded={aboutOpen}
                onClick={() => setAboutOpen((o) => !o)}
              >
                <span className="intro-expand-icon">
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 1.5l7 7 7-7" />
                  </svg>
                </span>
              </button>
              <div className={`intro-expandable pod-about-expandable${aboutOpen ? " expanded" : ""}`}>
                <p className="pod-about-text">
                  The Rawlins Way podcast offers an inside look at how Rawlins Infra
                  Consult delivers value-driven infrastructure consulting. Through
                  project deep dives, team insights, and industry discussions, discover
                  our unique approach to creating exceptional client outcomes while
                  fostering team success.
                </p>
              </div>
              <p className="pod-about-text pod-about-text-desktop">
                The Rawlins Way podcast offers an inside look at how Rawlins Infra
                Consult delivers value-driven infrastructure consulting. Through
                project deep dives, team insights, and industry discussions, discover
                our unique approach to creating exceptional client outcomes while
                fostering team success.
              </p>
            </div>

            {/* Right: Embedded Player */}
            <div className="pod-player-wrap">
              <div className="pod-player-label">
                <div className="pod-pulse" />
                <span>Now Streaming</span>
              </div>
              <div className="pod-player-embed" ref={podPlayerRef}>
                <div id="mypodops-player-3542" />
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider">
          <div className="gold-line" />
        </div>

        {/* ── CTA Section ── */}
        <section className="section-team pod-cta">
          <div className="pod-cta-waveform" aria-hidden="true">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="pod-wave-bar"
                style={{
                  animationDelay: `${i * 0.08}s`,
                  height: `${20 + Math.sin(i * 0.5) * 30 + (i * 7 % 20)}%`,
                }}
              />
            ))}
          </div>
          <div className="team-content reveal">
            <p className="section-label">
              <span className="gold-text">Tune In</span>
            </p>
            <h2 className="section-title">
              Let&apos;s build something <em>together</em>
            </h2>
            <p className="team-desc">
              Join the conversation, share your story, and explore how the Rawlins team
              partners with agencies and enterprises to deliver lasting impact.
            </p>
            <Link href="/contact" className="auto-hero-btn" style={{ opacity: 1, transform: "none", animation: "none" }}>
              <span>Connect With Us</span>
            </Link>
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
