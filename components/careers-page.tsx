"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";


export default function CareersPage() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const animFrame = useRef<number | null>(null);

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
      {/* Custom Cursor */}
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />

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
          <svg viewBox="0 0 24 24">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </a>

        <SiteNav />

        <div className="content-wrapper">
          {/* ── Hero ── */}
          <section className="cs-hero" id="top">
            <div className="cs-hero-content">
              <span className="hero-label">
                <span className="gold-text">
                  <span className="hero-label-segment">Careers at</span>{" "}
                  <span className="hero-label-segment">Rawlins Infra Consult</span>
                </span>
              </span>
              <h1 className="hero-title">
                Work with <em>Us</em>
              </h1>
              <p className="hero-sub cs-hero-sub">
                We&rsquo;re always interested in connecting with thoughtful, driven professionals who are passionate about solving complex challenges and creating meaningful impact. If our approach aligns with your interests, we invite you to connect and discuss opportunities.
              </p>
              <p className="hero-sub cs-hero-sub" style={{ marginTop: "12px" }}>
                Email us at <a href="mailto:jobs@rawlinsic.com" className="gold-text careers-email-link">jobs@rawlinsic.com</a>
              </p>
              <p
                style={{
                  marginTop: "48px",
                  marginBottom: "16px",
                  color: "#fff",
                  fontSize: "20px",
                  fontWeight: 700,
                  letterSpacing: "normal",
                  textTransform: "none",
                }}
              >
                Open Opportunities:
              </p>
              <Link href="/careers/proposal-writer-manager" className="auto-hero-btn" style={{ opacity: 1, transform: "none", animation: "none", marginBottom: "72px" }}><span>Proposal Writer/Manager</span></Link>
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
