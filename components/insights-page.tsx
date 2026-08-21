"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";


const HERO_IMG = "/images/pages/insights-hero.webp";

const channels = [
  {
    id: "thought-leadership",
    href: "/insights/thought-leadership",
    title: "Thought Leadership",
    subtitle: "Expert perspectives",
    desc: "Insights and perspectives from our advisory team.",
    image: "/images/pages/insights-card-2.webp",
    cta: "Read Articles",
    accent: "#c9b78c",
  },
  {
    id: "podcast",
    href: "/insights/podcast",
    title: "The Rawlins Way",
    subtitle: "Podcast",
    desc: "Candid conversations about the real challenges facing transportation agencies and complex organizations. Our team and guests break down what it actually takes to lead change.",
    image: "/images/pages/insights-card-3.webp",
    cta: "Listen Now",
    accent: "#d9cca9",
  },
  {
    id: "case-studies",
    href: "/insights/case-studies",
    title: "Case Studies",
    subtitle: "Impact in action",
    desc: "Detailed accounts of how we've helped agencies and enterprises overcome operational hurdles, modernize systems, and deliver measurable results across complex programs.",
    image: "/images/pages/auto-optimize.webp",
    cta: "Explore Cases",
    accent: "#e5dcc0",
  },
];

export default function InsightsPage() {
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
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

  /* ── Scroll handler: sticky nav background ── */
  useEffect(() => {
    const nav = document.getElementById("mainNav");
    const onScroll = () => {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 60);
      const backToTop = document.getElementById("backToTop");
      if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let ob: IntersectionObserver;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const els = document.querySelectorAll(".reveal");
        ob = new IntersectionObserver(
          (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
          { threshold: 0.08 }
        );
        els.forEach((el) => ob.observe(el));
        setTimeout(() => {
          els.forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("visible");
          });
        }, 100);
      });
    });
    return () => { cancelAnimationFrame(raf); if (ob) ob.disconnect(); };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
      <div className="ambient-bg" />
      <div className="ambient-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>

      <SiteNav />

      {/* ── Hero ── */}
      <section className="aam-hero aam-parallax-fixed" id="top" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <Image src={HERO_IMG} alt="" fill priority sizes="100vw" className="aam-hero-img" />
        <div className="aam-hero-overlay" style={{ background: "linear-gradient(180deg, rgba(29, 55, 89, 0.45) 0%, rgba(19, 36, 58, 0.65) 60%, rgba(19, 36, 58, 0.80) 100%)" }} />
        <div className="aam-hero-content">
          <span className="hero-label"><span className="gold-text">Knowledge &amp; Perspective</span></span>
          <h1 className="hero-title">Insights that <em>Inform</em> Action</h1>
          <p className="hero-sub">
            Ideas, experiences, and stories shaping better decisions.
          </p>
          <a href="#channels" className="auto-hero-btn">
            <span>Explore Our Insights</span>
          </a>
        </div>
        <div className="hero-scroll"><span style={{ color: "#fff", fontSize: "0.6rem", letterSpacing: "3px", textTransform: "uppercase" as const }}>Scroll</span><div className="scroll-line" /></div>
      </section>

      {/* ── Channel Cards ── */}
      <section className="ins-channels" id="channels">
        <div className="ins-channels-inner">
          {channels.map((ch, i) => (
            <div key={ch.id} className={`ins-channel-card${activeChannel === ch.id ? " active" : ""}`}>
              <div className="ins-channel-img-wrap">
                <Image src={ch.image} alt={ch.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="ins-channel-img" />
                <div className="ins-channel-img-overlay" />
              </div>
              <div className="ins-channel-body">
                <span className="ins-channel-subtitle">{ch.subtitle}</span>
                <h2 className="ins-channel-title">{ch.title}</h2>
                <button
                  type="button"
                  className="ins-channel-expand-hint"
                  aria-label="Expand description"
                  aria-expanded={activeChannel === ch.id}
                  onClick={() => setActiveChannel(prev => (prev === ch.id ? null : ch.id))}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line className="expand-vertical" x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <p className="ins-channel-desc">{ch.desc}</p>
                <Link href={ch.href} className="ins-channel-cta">
                  {ch.cta}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
              </div>
              <div className="ins-channel-accent" style={{ background: `linear-gradient(180deg, ${ch.accent}, transparent)` }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Quote Panel ── */}
      <div className="parallax-panel">
        <p className="parallax-text reveal">
          Organizations that <em>thrive</em> are the ones that never stop <em>learning</em>.
        </p>
      </div>

      {/* ── CTA ── */}
      <section style={{ padding: "100px 48px 120px", textAlign: "center", position: "relative" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 10 }}>
          <p className="section-label"><span className="gold-text">Start a Conversation</span></p>
          <h2 className="section-title" style={{ marginBottom: "20px", textAlign: "center" }}>
            Have a topic you&rsquo;d like to <em>discuss</em>?
          </h2>
          <p className="hero-sub" style={{ opacity: 1, transform: "none", animation: "none", textAlign: "center" }}>
            We&rsquo;re always exploring new questions and emerging needs shaping how organizations plan, deliver, and evolve.
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
    </>
  );
}
