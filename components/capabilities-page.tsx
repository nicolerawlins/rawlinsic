"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

/* ─── Images ─── */
const STRATEGY_IMG =
  "/images/pages/strategy-bg.webp";
const OPERATIONS_IMG =
  "/images/pages/operations-bg.webp";
const TECHNOLOGY_IMG =
  "/images/pages/technology-bg.webp";

/* ─── Data ─── */
interface Service {
  title: string;
  desc: string;
}
interface CapabilitySection {
  id: string;
  name: string;
  tagline: string;
  focus: string;
  description: string;
  image: string;
  services: Service[];
}

const capabilitySections: CapabilitySection[] = [
  {
    id: "strategy",
    name: "Strategy",
    tagline: "Decision systems · Planning · Organizational Design",
    focus: "Direction-setting, planning, organizational design, and high-level decision-making",
    description:
      "We help leaders see clearly, decide wisely, and act with confidence. From governance frameworks to strategic program planning, we translate organizational priorities into actionable plans that drive long-term value.",
    image: STRATEGY_IMG,
    services: [
      { title: "Strategic Planning", desc: "Translate leadership vision into measurable goals, developing roadmaps that balance short-term priorities with long-term organizational ambitions." },
      { title: "Organizational IT Strategy", desc: "Define how technology investments, platforms, and capabilities will enable business goals—translating priorities into a pragmatic roadmap for modernization, security, and measurable outcomes." },
      { title: "Organizational Analysis", desc: "Assess structures, processes, and culture to identify inefficiencies and surface opportunities for meaningful, data-informed improvement." },
      { title: "Organizational Change Management", desc: "Guide organizations through transformation with frameworks that earn buy-in, reduce friction, and sustain momentum across every level." },
      { title: "Performance Management", desc: "Establish clear goals, measures, and feedback loops that tie individual and team performance to strategic outcomes—strengthening accountability, transparency, and continuous improvement." },
      { title: "Program Effectiveness", desc: "Evaluate whether programs are delivering intended outcomes, identify performance gaps, and optimize execution so resources translate into measurable impact." },
      { title: "Asset Management", desc: "Manage assets across their lifecycle to maximize value and performance while controlling cost and risk." },
    ],
  },
  {
    id: "operations",
    name: "Operations",
    tagline: "People · Process · Culture · Workforce",
    focus: "Execution, delivery, process improvement, and day-to-day program management",
    description:
      "We create sustainable high-performance strategies that foster collaboration, accountability, and organizational health. Our programs empower teams to deliver their best work—consistently and at scale.",
    image: OPERATIONS_IMG,
    services: [
      { title: "Process & Procedure Improvements", desc: "Analyze and streamline end-to-end processes and procedures to reduce waste and risk, improve consistency, and strengthen operational performance." },
      { title: "Program and Project Leadership", desc: "Guide senior leaders in leading complex, multistakeholder programs and projects on schedule, within scope, and aligned with organizational goals." },
      { title: "Project Delivery", desc: "Support project teams from kickoff to close-out to deliver on time and within budget, managing risk, coordinating stakeholders, and ensuring quality deliverables." },
      { title: "Maintenance & Operations Improvements", desc: "Optimize day-to-day operations and maintenance to reduce downtime, improve service reliability, and increase work execution efficiency." },
      { title: "Program Quality Assurance", desc: "Embed quality governance, reviews, and feedback loops to ensure program deliverables meet defined standards and stakeholder expectations." },
      { title: "Administration Program Services", desc: "Streamline administrative functions by improving processes, controls, and reporting to increase efficiency, compliance, and operational performance." },
      { title: "Owner's Representative", desc: "Serve as the owner's trusted on-site representative—protecting your interests, coordinating contractors, and ensuring scope, quality, schedule, and standards are met." },
      { title: "Finance, Budget & Procurement", desc: "Provide finance, budgeting, and procurement management to help organizations allocate resources effectively, maintain fiscal responsibility, and ensure compliance." },
    ],
  },
  {
    id: "technology",
    name: "Technology",
    tagline: "Human-centric AI · Digital Systems · Analytics · Data",
    focus: "Emerging tech, systems, and tech-enabled capabilities",
    description:
      "From establishing trustworthy data foundations to deploying intelligent automation, we help organizations harness the information layer. Our specialists streamline workflows so your people can focus on what machines can't do.",
    image: TECHNOLOGY_IMG,
    services: [
      { title: "Data Governance", desc: "Guide organizations in developing and implementing data governance policies, processes, and standards to ensure data is accurate, secure, consistent, and used responsibly across the enterprise." },
      { title: "Advanced Air Mobility & Uncrewed Aircraft Systems", desc: "Deliver UAS and AAM solutions grounded in practical experience." },
      { title: "Automation & Integration", desc: "Design systems where people, data, and AI work together with clarity, trust, and purpose." },
    ],
  },
];

/* ─── Component ─── */
export default function CapabilitiesPage() {
  const [activeTab, setActiveTab] = useState("strategy");
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [expandedDesc, setExpandedDesc] = useState<string | null>(null);
  const toggleSectionServices = (id: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const animFrame = useRef<number | null>(null);
  const serviceTrackRefs = useRef<Record<string, HTMLDivElement | null>>({});

  /* custom cursor */
  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    const move = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      dot.style.left = e.clientX - 4 + "px";
      dot.style.top = e.clientY - 4 + "px";
    };
    const loop = () => {
      ringX.current += (mouseX.current - ringX.current) * 0.12;
      ringY.current += (mouseY.current - ringY.current) * 0.12;
      ring.style.left = ringX.current - 20 + "px";
      ring.style.top = ringY.current - 20 + "px";
      animFrame.current = requestAnimationFrame(loop);
    };
    document.addEventListener("mousemove", move);
    animFrame.current = requestAnimationFrame(loop);
    return () => {
      document.removeEventListener("mousemove", move);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  /* particles */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const dots = Array.from({ length: 40 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      dots.forEach((d) => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = c.width; if (d.x > c.width) d.x = 0;
        if (d.y < 0) d.y = c.height; if (d.y > c.height) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(201,168,76,0.25)";
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);

  /* scroll reveal — double-rAF ensures browser has painted initial state before transitioning */
  useEffect(() => {
    let ob: IntersectionObserver;
    /* First rAF: browser commits the DOM. Second rAF: initial styles are painted. */
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const els = document.querySelectorAll(".reveal");
        /* Force reflow so the browser has computed opacity:0 before we add visible */
        ob = new IntersectionObserver(
          (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
          { threshold: 0.08 }
        );
        els.forEach((el) => ob.observe(el));
        /* fallback: force-check elements already in viewport */
        setTimeout(() => {
          els.forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("visible");
          });
        }, 100);

        /* Scroll to hash target if present, expanding section + service */
        const hash = window.location.hash?.slice(1);
        if (hash) {
          const target = document.getElementById(hash);
          if (target) {
            /* Find which section & service index this belongs to */
            for (const section of capabilitySections) {
              const svcIndex = section.services.findIndex(
                (svc) => svc.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === hash
              );
              if (svcIndex !== -1) {
                setExpandedSections(prev => new Set(prev).add(section.id));
                setExpandedService(`${section.id}-${svcIndex}`);
                setActiveTab(section.id);
                break;
              }
            }
            setTimeout(() => {
              const el = document.getElementById(hash);
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 130;
                window.scrollTo({ top, behavior: "smooth" });
              }
            }, 400);
          }
        }
      });
    });
    return () => { cancelAnimationFrame(raf); if (ob) ob.disconnect(); };
  }, []);

  /* orbs */
  const orbRef1 = useRef<HTMLDivElement>(null);
  const orbRef2 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let t = 0;
    const run = () => {
      t += 0.003;
      if (orbRef1.current) orbRef1.current.style.transform = `translate(${Math.sin(t) * 60}px, ${Math.cos(t * 0.7) * 40}px)`;
      if (orbRef2.current) orbRef2.current.style.transform = `translate(${Math.cos(t * 0.8) * 50}px, ${Math.sin(t * 1.1) * 35}px)`;
      requestAnimationFrame(run);
    };
    run();
  }, []);

  /* Nav scroll background + active tab tracks scroll position */
  useEffect(() => {
    const nav = document.getElementById("mainNav");
    const onScroll = () => {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 60);
      const backToTop = document.getElementById("backToTop");
      if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 500);
      // Walk all sections and keep the last one whose top has passed the threshold.
      // This ensures whichever section the viewport is inside stays highlighted.
      // Only clears if we are above every section entirely.
      const THRESHOLD = 220;
      let matched = "";
      for (const s of capabilitySections) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= THRESHOLD) {
            matched = s.id; // keep overwriting — last section that has passed wins
          }
        }
      }
      setActiveTab(matched);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `#${id}`);
    }
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const scrollTrack = (id: string, dir: number) => {
    const el = serviceTrackRefs.current[id];
    if (el) el.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <>
      <div className="cap-page-wrap">
      {/* Ambient Background — matches homepage */}
      <div className="ambient-bg" />
      <div className="ambient-orbs">
        <div className="orb orb-1" ref={orbRef1} />
        <div className="orb orb-2" ref={orbRef2} />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
      <canvas className="particle-canvas" ref={canvasRef} />
      <SiteNav />

      {/* ── Hero with fixed background image ── */}
      <section className="cap-hero">
        <div className="cap-hero-overlay" />
        <div className="cap-hero-content reveal">
          <span className="hero-label"><span className="gold-text">Integrated Advisory &amp; Solutions</span></span>
          <h1 className="cap-hero-title">
            Strategy, Operations<br />&amp; <em>Technology</em>
          </h1>
          <p className="hero-sub" style={{ opacity: 1, transform: 'none', animation: 'none' }}>
            Three areas of expertise, one mission—to navigate complexity and deliver measurable, lasting outcomes for the organizations we serve.
          </p>
        </div>
        <div className="hero-scroll"><span>Scroll</span><div className="scroll-line" /></div>
      </section>

      {/* ── Sticky Tab Bar ── */}
      <div className="cap-tab-bar">
        <div className="cap-tab-bar-inner">
          {capabilitySections.map((s, i) => (
            <button key={s.id} className={`cap-tab${activeTab === s.id ? " active" : ""}`} onClick={() => scrollToSection(s.id)}>
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── Capability Sections — alternating layout ── */}
      {capabilitySections.map((section, sIdx) => {
        const isReversed = sIdx % 2 === 1;
        return (
        <section key={section.id} id={section.id} className="cap-section">
          {/* Alternating two-column intro */}
          <div className={`cap-split reveal${isReversed ? " cap-split-reverse" : ""}`}>
            <div className={`cap-split-img-wrap${isReversed ? " cap-split-img-reversed" : ""}`}>
              <Image src={section.image} alt={section.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="cap-split-img" priority={sIdx === 0} />
              <div className="cap-split-img-frame" />
            </div>
            <div className="cap-split-content">
              <p className="section-label"><span className="gold-text">{section.focus}</span></p>
              <h2 className="cap-split-title">{section.name}</h2>
              <button className={`card-expand-btn cap-desc-expand-btn${expandedDesc === section.id ? " rotated" : ""}`} aria-label="Expand description" onClick={(e) => { e.stopPropagation(); setExpandedDesc((prev) => (prev === section.id ? null : section.id)); }}>
                <svg width="14" height="8" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5l7 7 7-7" /></svg>
              </button>
              <div className={`cap-split-body-wrap${expandedDesc === section.id ? " expanded" : ""}`}>
                <p className="cap-split-body">{section.description}</p>
              </div>
            </div>
          </div>

          {/* Accordion service list */}
          <div className="cap-services-wrap">
            <div className="cap-services-header">
              <div className="cap-svc-count-label">
                <span className="cap-svc-count-num">{section.services.length}</span>
                <span className="cap-svc-count-word">Services</span>
              </div>
              <button
                className="cap-svc-toggle-btn"
                onClick={() => toggleSectionServices(section.id)}
                aria-expanded={expandedSections.has(section.id)}
              >
                <span>{expandedSections.has(section.id) ? "Collapse Services" : "View All Services"}</span>
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: expandedSections.has(section.id) ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.35s ease" }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>
            <div className={`cap-svc-list-wrap${expandedSections.has(section.id) ? " open" : ""}`}>
              <div className="cap-svc-list">
                {section.services.map((svc, i) => {
                  const isOpen = expandedService === `${section.id}-${i}`;
                  return (
                    <div
                      key={svc.title}
                      id={svc.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}
                      className={`cap-svc-row${isOpen ? " expanded" : ""}`}
                      onClick={() => setExpandedService(isOpen ? null : `${section.id}-${i}`)}
                    >
                      <div className="cap-svc-row-header">
                        <span className="cap-svc-row-num">{String(i + 1).padStart(2, "0")}</span>
                        <h3 className="cap-svc-row-title">{svc.title}</h3>
                        <div className="cap-svc-row-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" className="cap-svc-vline" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </div>
                      </div>
                      <div className="cap-svc-row-body">
                        <p className="cap-svc-row-desc">{svc.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {sIdx < capabilitySections.length - 1 && (
            <div className="section-divider cap-section-divider">
              <div className="gold-line" />
            </div>
          )}
        </section>
        );
      })}

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── CTA ── */}
      <section className="cap-cta" style={{ position: "relative" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 10, textAlign: "center" }}>
          <p className="section-label"><span className="gold-text">Take the Next Step</span></p>
          <h2 className="section-title cap-cta-title" style={{ marginBottom: "20px", textAlign: "center" }}>
            Ready to <em style={{ fontStyle: "italic" }}>rethink</em> how your organization works?
          </h2>
          <p className="hero-sub" style={{ opacity: 1, transform: "none", animation: "none", textAlign: "center" }}>
            Let&rsquo;s discuss how our integrated capabilities can address your unique challenges.
          </p>
          <Link href="/contact" className="auto-hero-btn" style={{ opacity: 1, transform: "none", animation: "none" }}>
            <span>Get In Touch</span>
          </Link>
        </div>
      </section>

      <a href="#top" className="back-to-top" id="backToTop" aria-label="Back to top">
        <svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      </a>
      <SiteFooter />
      </div>
    </>
  );
}
