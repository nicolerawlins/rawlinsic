"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import AutomationIntegrationInteractive from "@/components/automation-integration-interactive";
import AutomationEcosystemBars from "@/components/automation-ecosystem-bars";
import WhatWeDeliverPyramid from "@/components/what-we-deliver-pyramid";

const DATA_IMG = "/images/pages/auto-data.webp";
const WORKFLOW_IMG = "/images/pages/auto-workflow.webp";
const AI_IMG = "/images/pages/auto-ai.webp";
const TEAM_IMG = "/images/pages/auto-team.webp";
const CONNECT_IMG = "/images/pages/auto-connect.webp";
const DASHBOARD_IMG = "/images/pages/auto-dashboard.webp";
const NETWORK_IMG = "/images/pages/auto-network.webp";
const CAPABILITY_IMG = "/images/pages/auto-capability.webp";

/* ── Editable Data ── */

const benefits = [
  {
    title: "Decision Making",
    tagline: "",
    desc: "Make better decisions with up-to-date information in one place.",
    img: DATA_IMG,
    accent: "linear-gradient(90deg, #9aa6b4, #e7ecf1)",
  },
  {
    title: "Efficiency",
    tagline: "",
    desc: "Achieve goals in less time.",
    img: WORKFLOW_IMG,
    accent: "linear-gradient(90deg, #c3cdd8, #9aa6b4)",
  },
  {
    title: "Prioritization",
    tagline: "",
    desc: "Prioritize problem-solving, decision-making, and creativity rather than repetitive work.",
    img: AI_IMG,
    accent: "linear-gradient(90deg, #e7ecf1, #9aa6b4)",
  },
  {
    title: "Innovation",
    tagline: "",
    desc: "Accelerate the pace of innovation.",
    img: CAPABILITY_IMG,
    accent: "linear-gradient(90deg, #9aa6b4, #c3cdd8)",
  },
];

const orgValues = [
  { num: "01", label: "Optimize Resources", body: "Optimize the use of diverse resources across your organization.", img: "/images/pages/auto-optimize.webp" },
  { num: "02", label: "Boost Efficiency", body: "Routine processes that take hours or days can be done in seconds, reducing errors.", img: "/images/pages/auto-data.webp" },
  { num: "03", label: "Scale Team Impact", body: "Scale the impact of teams beyond what manual processes allow.", img: "/images/pages/auto-team.webp" },
  { num: "04", label: "Enhance Responsiveness", body: "React faster to changing conditions and stakeholder needs.", img: "/images/pages/auto-workflow.webp" },
  { num: "05", label: "Support Resilience", body: "Standardized tasks support continuity of operations and enable faster response when needs evolve.", img: "/images/pages/auto-capability.webp" },
  { num: "06", label: "Foster Human Talent", body: "Free people to focus on high-value work that requires human judgment.", img: "/images/pages/auto-human.webp" },
];

const challenges = [
  { title: "Disconnected Tools", solution: "We enable your systems to work together efficiently.", img: CONNECT_IMG, videoUrl: "/videos/disconnected-tools-video.mp4" },
  { title: "Duplicated Work", solution: "We design and implement platforms that streamline processes, eliminate manual mistakes in routine workflows, and move data where people need it.", img: DASHBOARD_IMG, videoUrl: "/videos/duplicated-work-video.mp4" },
  { title: "Fragmented Information Landscape", solution: "We integrate systems via a central hub to provide timely information in a unified view.", img: NETWORK_IMG, videoUrl: "/videos/fragmented-information-landscape-video.mp4" },
  { title: "Capability Gap", solution: "We equip teams in automation and help organizations apply AI effectively and responsibly. We guide leaders and organizations through the challenges of automation and AI, helping teams adapt to embrace new technologies and work practices.", img: TEAM_IMG, videoUrl: "" },
];

export default function AutomationPage() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const valuesTrackRef = useRef<HTMLDivElement>(null);
  const [valuesProgress, setValuesProgress] = useState(0);
  const [activeValue, setActiveValue] = useState<number | null>(null);
  const [openBenefits, setOpenBenefits] = useState<Set<number>>(new Set());
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [openChallenge, setOpenChallenge] = useState<number | null>(null);

  const chevronSvg = (isOpen: boolean) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.3s", transform: isOpen ? "rotate(180deg)" : "none" }}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    const move = (e: MouseEvent) => {
      mouseX.current = e.clientX; mouseY.current = e.clientY;
      dot.style.left = e.clientX - 4 + "px"; dot.style.top = e.clientY - 4 + "px";
    };
    const loop = () => {
      ringX.current += (mouseX.current - ringX.current) * 0.12;
      ringY.current += (mouseY.current - ringY.current) * 0.12;
      ring.style.left = ringX.current - 20 + "px"; ring.style.top = ringY.current - 20 + "px";
      requestAnimationFrame(loop);
    };
    document.addEventListener("mousemove", move);
    requestAnimationFrame(loop);
    return () => document.removeEventListener("mousemove", move);
  }, []);

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

  useEffect(() => {
    const onScroll = () => {
      const nav = document.getElementById("mainNav");
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 60);
      const backToTop = document.getElementById("backToTop");
      if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onValuesScroll = () => {
    const el = valuesTrackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setValuesProgress(max > 0 ? el.scrollLeft / max : 0);
  };
  const valuesScrollPrev = () => {
    const track = valuesTrackRef.current; if (!track) return;
    if (track.scrollLeft <= 0) return;
    const card = track.querySelector(".aam-alt-card") as HTMLElement;
    const w = card ? card.offsetWidth + 24 : 420;
    track.scrollBy({ left: -w, behavior: "smooth" });
  };
  const valuesScrollNext = () => {
    const track = valuesTrackRef.current; if (!track) return;
    if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 1) return;
    const card = track.querySelector(".aam-alt-card") as HTMLElement;
    const w = card ? card.offsetWidth + 24 : 420;
    track.scrollBy({ left: w, behavior: "smooth" });
  };

  const toggleBenefit = (idx: number) => {
    setOpenBenefits((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    <>
      <div className="ambient-bg" />
      <div className="ambient-orbs">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" /><div className="orb orb-4" />
      </div>

      <SiteNav />

      {/* ── DRAFT: interactive hub, now the top of the page ── */}
      {/* clears the fixed nav, which used to overlay the hero */}
      <style>{`.auto-hub-draft{padding-top:80px}
        @media (max-width:1003px){.auto-hub-draft{padding-top:64px}}`}</style>
      <section className="auto-hub-draft">
        <AutomationIntegrationInteractive
          embedded
          eyebrow="Smarter systems, proven in practice"
          title={<>Data Governance, <em>Automation</em> &amp; AI</>}
          intro={<>
            <p className="section-text">Many challenges start the same way: disconnected tools, duplicated work, and information scattered across systems. We connect the tools you already use, automate the busywork, and implement AI &mdash; so your people can make better decisions, work more efficiently, and achieve better outcomes.</p>
            <p className="section-text" style={{ marginTop: "16px" }}>The graphic below showcases Rawlins&rsquo; applied solutions in practice. Tap an icon to see the challenge, what we built, and the result.</p>
          </>}
        />
      </section>

      {/* ── 2. Parallax Quote ── */}
      <div className="parallax-panel aam-parallax-fixed" style={{ backgroundImage: "url(/images/pages/auto-parallax.webp" }}>
        <div className="aam-parallax-overlay" style={{ background: "rgba(19, 36, 58, 0.8)" }} />
        <p className="parallax-text1 reveal" style={{ position: "relative", zIndex: 2 }}>
          The <em>future</em> of work requires designing systems where people, data, and AI work <em>together</em> with clarity, trust, and purpose.
        </p>
      </div>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── 1. The Ecosystem ── */}
      <AutomationEcosystemBars />

      {/* ── 3. Human-Centered Automation ── */}
      <section className="aam-section">
        <div className="aam-container">
          <div className="aam-section-header reveal">
            <p className="section-label"><span className="gold-text">Human-Centered Automation</span></p>
            <h2 className="section-title">How can automation help people <em>thrive</em> in a data-driven workplace?</h2>
          </div>
          <div className="aam-framework-grid auto-benefits-grid" style={{ marginTop: "60px" }}>
            {benefits.map((card, i) => (
              <div className={`aam-framework-card${openBenefits.has(i) ? " open" : ""}`} key={card.title}>
                <div className="aam-framework-img-wrap">
                  <Image src={card.img} alt={card.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="aam-framework-img" />
                  <div className="aam-framework-img-overlay" />
                </div>
                <div className="aam-framework-accent" style={{ background: card.accent }} />
                <div className="aam-framework-inner">
                  <div className="aam-pillar-title-row">
                    <h3 className="aam-framework-phase" style={{ fontSize: "2rem" }}>{card.title}</h3>
                    <button className="aam-expand-btn" onClick={() => toggleBenefit(i)}>
                      {chevronSvg(openBenefits.has(i))}
                    </button>
                  </div>
                  <div className={`aam-framework-expand${openBenefits.has(i) ? " open" : ""}`}>
                    <p style={{ fontSize: "16px", color: "#000", fontWeight: 600, lineHeight: 1.8 }}>{card.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── 4. Organizational Value ── */}
      <section className="aam-section aam-phases-alt-section" style={{ padding: "100px 0" }}>
        <div className="aam-container" style={{ padding: "0 48px" }}>
          <div className="aam-section-header reveal">
            <p className="section-label"><span className="gold-text">Organizational Impact</span></p>
            <h2 className="section-title">How <em>automation</em> delivers organizational <em>value</em></h2>
          </div>
        </div>

        {/* Progress bar + arrow controls */}
        <div className="story-scroll-controls" style={{ padding: "0 48px", marginTop: "40px" }}>
          <div className="story-scroll-progress-bar">
            <div className="story-scroll-progress-fill" style={{ width: `${valuesProgress * 100}%` }} />
          </div>
          <div className="story-scroll-arrows">
            <button className="story-arrow-btn" onClick={valuesScrollPrev} aria-label="Previous">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button className="story-arrow-btn" onClick={valuesScrollNext} aria-label="Next">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>

        {/* Scroll cards */}
        <div className="aam-alt-scroll-outer" ref={valuesTrackRef} onScroll={onValuesScroll}>
          <div className="aam-alt-scroll-track">
            {orgValues.map((v, i) => (
              <div className={`aam-alt-card${activeValue === i ? " active" : ""}`} key={v.num} onClick={() => setActiveValue(prev => (prev === i ? null : i))}>
                <Image src={v.img} alt={v.label} fill sizes="(max-width: 768px) 80vw, 400px" className="aam-alt-card-bg" />
                <div className="aam-alt-card-overlay" />
                <div className="aam-alt-card-header">
                  <span className="aam-alt-card-num">{v.num}</span>
                </div>
                <div className="aam-alt-card-divider" />
                <h4 className="aam-alt-card-title">{v.label}</h4>
                <button className="card-expand-btn aam-phase-expand-btn" aria-label="Expand description" aria-expanded={activeValue === i} onClick={(e) => { e.stopPropagation(); setActiveValue(prev => (prev === i ? null : i)); }}>
                  <svg width="14" height="8" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5l7 7 7-7" /></svg>
                </button>
                <p className="aam-alt-card-body">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Quote 2 */}
      <div className="parallax-panel aam-parallax-fixed" style={{ backgroundImage: `url(${WORKFLOW_IMG})` }}>
        <div className="aam-parallax-overlay" style={{ background: "rgba(19, 36, 58, 0.8)" }} />
        <p className="parallax-text1 reveal" style={{ position: "relative", zIndex: 2 }}>
          Explore the <em>possibilities</em>
        </p>
      </div>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── 5. What We Deliver — expanding pyramid ── */}
      <WhatWeDeliverPyramid />

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Addressing Key Challenges / Videos ── */}
      <section className="aam-section">
        <div className="aam-container">
          <div className="aam-section-header reveal">
            <p className="section-label"><span className="gold-text">Addressing Key Challenges</span></p>
            <h2 className="section-title">Elevate human <em>potential</em> throughout your organization</h2>
          </div>
          <div className="auto-challenges-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", marginTop: "60px", alignItems: "start" }}>
            {challenges.map((c, i) => {
              const isOpen = openChallenge === i;
              const isPlaying = activeVideo === i;
              const hasVideo = !!c.videoUrl;
              return (
              <div key={i} className="reveal" style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(201,168,76,0.1)", transition: "all 0.3s" }}>
                {/* Image/Video — always visible */}
                {hasVideo && isPlaying ? (
                  <div style={{ position: "relative", paddingTop: "56.25%", background: "#000" }}>
                    <video
                      autoPlay
                      controls
                      playsInline
                      preload="none"
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    >
                      <source src={c.videoUrl} type="video/mp4" />
                    </video>
                    <button onClick={() => setActiveVideo(null)} style={{ position: "absolute", top: "12px", right: "12px", width: "36px", height: "36px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.5)", background: "rgba(19, 36, 58, 0.8)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 3 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                  </div>
                ) : (
                  <div style={{ position: "relative", height: "240px", cursor: hasVideo ? "pointer" : "default" }} onClick={() => hasVideo && setActiveVideo(i)}>
                    <Image src={c.img} alt={c.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(19, 36, 58, 0.75)" }} />
                    {hasVideo && (
                      <>
                        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "64px", height: "64px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.6)", background: "rgba(19, 36, 58, 0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" stroke="none"><polygon points="8,5 20,12 8,19" /></svg>
                        </div>
                        <span style={{ position: "absolute", top: "16px", left: "16px", zIndex: 2, fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#fff" }}>Watch Video</span>
                      </>
                    )}
                  </div>
                )}

                {/* Title + expand — always visible. White panel so it
                    matches the rest of the "feature tile" bottoms
                    across the site. */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 28px", background: "#fff", cursor: "pointer" }} onClick={() => setOpenChallenge(isOpen ? null : i)}>
                  <div>
                    <span style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: "#000" }}>Challenge</span>
                    <h3 style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif", fontSize: "28px", fontWeight: 600, color: "#000", marginTop: "4px" }}>{c.title}</h3>
                  </div>
                  <span style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%", background: "#1A3251", transition: "transform 0.3s", transform: isOpen ? "rotate(45deg)" : "none" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </div>

                {/* Expandable description — white panel below the gold
                    title strip so the gold reads as a single clean band
                    instead of stacking two gold gradients that drift. */}
                <div style={{ maxHeight: isOpen ? "300px" : "0", overflow: "hidden", transition: "max-height 0.5s ease" }}>
                  <div style={{ padding: "20px 28px 24px", background: "#fff" }}>
                    <p style={{ fontSize: "16px", color: "#000", fontWeight: 600, lineHeight: 1.8 }}>{c.solution}</p>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── CTA ── */}
      <section className="aam-section aam-cta-section aam-parallax-fixed">
        <Image src={TEAM_IMG} alt="" fill priority sizes="100vw" className="aam-cta-bg-img" />
        <div className="aam-parallax-overlay" style={{ background: "rgba(26, 50, 81, 0.95)" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 32px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", maxWidth: "800px", margin: "0 auto" }}>
          <p className="section-label"><span className="gold-text">Let&rsquo;s Connect</span></p>
          <h2 className="section-title auto-cta-title" style={{ color: "#fff", marginBottom: "20px", textAlign: "center" }}>Ready to <em>reshape</em> how your organization works?</h2>
          <p className="hero-sub" style={{ opacity: 1, transform: "none", animation: "none", textAlign: "center", marginBottom: "40px" }}>
            Let&rsquo;s discuss how automation and AI can elevate your team&rsquo;s capabilities.
          </p>
          <Link href="/contact" className="auto-hero-btn" style={{ animation: "none", opacity: 1, transform: "none" }}><span>Connect With Us</span></Link>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>
      <a href="#top" className="back-to-top" id="backToTop" aria-label="Back to top">
        <svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      </a>
      <SiteFooter />
    </>
    </>
  );
}
