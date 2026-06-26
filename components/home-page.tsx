"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";



const LOGO_URL =
  "/images/pages/hero-bg.webp";

const VIDEO_URL =
  "/images/pages/hero-video.mp4";

// Intro images
const DRONE2_URL =
  "/images/pages/home-about.webp";
const PEOPLECULTURE_URL =
  "/images/pages/operations-bg.webp";
const GLOBE_URL =
  "/images/pages/home-split-3.webp";
const GLOBALFOOTPRINT_URL =
  "/images/pages/home-team-bg.webp";

const BUILDINGSCONNECT_VIDEO_URL =
  "/images/pages/buildingsconnect-video.mp4";

const TRANSPORTATIONROADS_URL =
  "/images/pages/transportation-aerial.webp";



const pillars = [
  {
    num: "",
    name: "Strategy",
    tags: "Decision systems · Planning · Organizational Design",
    desc: "We help leaders see clearly, decide wisely, and act with confidence. From governance frameworks to strategic program planning, we translate organizational priorities into actionable plans that that drives long-term results.",
    href: "/capabilities#strategy",
    bg: "/images/pages/strategy-bg.webp",
  },
  {
    num: "",
    name: "Operations",
    tags: "people · process · culture · workforce",
    desc: "We create high-performance strategies that foster collaboration, accountability, and organizational health. Our proficiency programs empower teams to deliver their best work.",
    href: "/capabilities#operations",
    bg: "/images/pages/operations-bg.webp",
  },
  {
    num: "",
    name: "Technology",
    tags: "human-centric AI integration · data governance · analytics",
    desc: "From establishing a solid data foundation to deploying collaborative automation systems, we advance organizations' use of information, empowering people to work more efficiently and make better decisions.",
    href: "/capabilities#technology",
    bg: "/images/pages/technology-bg.webp",
  },
];

const journey = [
  {
    phase: "Foundation",
    title: "Deep Transportation Agency Expertise",
    text: "Having worked successfully within complex public agencies for many years, our team applies deep insights gained from overcoming project and program constraints, navigating decision-making dynamics, and fostering organizational cultures that support collaboration and accountability.",
    bg: "/images/pages/journey-foundation.webp",
  },
  {
    phase: "Evolution",
    title: "Advisory Capabilities",
    text: "We partner with enterprises to modernize processes, empower team members, and embrace new technologies—coordinating these actions to achieve meaningful results. We pride ourselves on establishing long-term relationships with our family of clients.",
    bg: "/images/pages/journey-evolution.webp",
  },
  {
    phase: "Innovation",
    title: "Advanced Air Mobility",
    text: "We guide the planning, implementation, and integration of advanced air mobility and uncrewed aircraft systems within existing transport networks, supporting the development of multimodal connected communities.",
    bg: "/images/pages/journey-frontier.webp",
  },
  {
    phase: "Frontier",
    title: "Data Governance, Automation, & AI",
    text: "We help agencies navigate governance structures, improve data practices, incorporate analytics, and use emerging tools such as AI. Our automation and integration specialists streamline workflows, enabling people to focus on the uniquely human work that matters most for organizational success.",
    bg: "/images/pages/journey-innovation.webp",
  },
];

const exploreBottomCards = [
  {
      title: "Insights",
    desc: "Access thought leadership, podcasts, and news from our team of advisors and specialists.",
    cta: "See how we transform →",
    href: "/insights",
    bg: "/images/pages/insights-card.webp",
  },
  {
      title: "Case Studies",
    desc: "Discover how our work has transformed organizations.",
    cta: "Explore our impact →",
    href: "/insights/case-studies",
    bg: "/images/pages/home-team-bg.webp",
  },
  ];

const exploreTopCards = [
  {
    title: "Capabilities",
    desc: "Explore our practice areas and how we tailor solutions to your unique organizational challenges.",
    cta: "Explore our services →",
    href: "/capabilities",
    bg: "/images/pages/home-tl-bg.webp",
  },
  {
      title: "Insights",
    desc: "Access thought leadership, podcasts, and news from our team of advisors and specialists.",
    cta: "Explore insights →",
    href: "/insights",
    bg: "/images/pages/insights-card.webp",
  },
  {
      title: "Case Studies",
    desc: "Discover how our work has transformed organizations.",
    cta: "discover our impact →",
    href: "/insights/case-studies",
    bg: "/images/pages/home-team-bg.webp",
  },
];


export default function HomePage() {
  const [introOpen, setIntroOpen] = useState(false);
  const [openJourneys, setOpenJourneys] = useState<number[]>([]);
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const [activeExplore, setActiveExplore] = useState<string | null>(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const [pillarsProgress, setPillarsProgress] = useState(0);

  const toggleJourney = (idx: number) => {
    setOpenJourneys((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  // Story horizontal scroll
  const storyTrackRef = useRef<HTMLDivElement>(null);
  const storyDragging = useRef(false);
  const storyDragStart = useRef(0);
  const storyScrollStart = useRef(0);

  const onStoryScroll = () => {
    const el = storyTrackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setStoryProgress(max > 0 ? el.scrollLeft / max : 0);
  };
  const onStoryMouseDown = (e: React.MouseEvent) => {
    storyDragging.current = true;
    storyDragStart.current = e.clientX;
    storyScrollStart.current = storyTrackRef.current?.scrollLeft ?? 0;
  };
  const onStoryMouseMove = (e: React.MouseEvent) => {
    if (!storyDragging.current || !storyTrackRef.current) return;
    e.preventDefault();
    const dx = e.clientX - storyDragStart.current;
    storyTrackRef.current.scrollLeft = storyScrollStart.current - dx;
  };
  const onStoryMouseUp = () => { storyDragging.current = false; };
  const storyScrollPrev = () => {
    const track = storyTrackRef.current; if (!track) return;
    const card = track.querySelector('.story-card') as HTMLElement;
    const w = card ? card.offsetWidth + 20 : 420;
    track.scrollBy({ left: -w, behavior: "smooth" });
  };
  const storyScrollNext = () => {
    const track = storyTrackRef.current; if (!track) return;
    const card = track.querySelector('.story-card') as HTMLElement;
    const w = card ? card.offsetWidth + 20 : 420;
    track.scrollBy({ left: w, behavior: "smooth" });
  };

  // Pillars horizontal scroll
  const pillarsTrackRef = useRef<HTMLDivElement>(null);
  const pillarsDragging = useRef(false);
  const pillarsDragStart = useRef(0);
  const pillarsScrollStart = useRef(0);
  const onPillarsScroll = () => {
    const el = pillarsTrackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setPillarsProgress(max > 0 ? el.scrollLeft / max : 0);
  };
  const onPillarsMouseDown = (e: React.MouseEvent) => {
    pillarsDragging.current = true;
    pillarsDragStart.current = e.clientX;
    pillarsScrollStart.current = pillarsTrackRef.current?.scrollLeft ?? 0;
  };
  const onPillarsMouseMove = (e: React.MouseEvent) => {
    if (!pillarsDragging.current || !pillarsTrackRef.current) return;
    e.preventDefault();
    const dx = e.clientX - pillarsDragStart.current;
    pillarsTrackRef.current.scrollLeft = pillarsScrollStart.current - dx;
  };
  const onPillarsMouseUp = () => { pillarsDragging.current = false; };
  const pillarsScrollPrev = () => pillarsTrackRef.current?.scrollBy({ left: -420, behavior: "smooth" });
  const pillarsScrollNext = () => pillarsTrackRef.current?.scrollBy({ left: 420, behavior: "smooth" });

  // Intro section parallax
  const introImgRef = useRef<HTMLVideoElement>(null);
  const introWrapRef = useRef<HTMLDivElement>(null);
  const handleIntroParallax = (e: React.MouseEvent<HTMLDivElement>) => {
    const wrap = introWrapRef.current;
    const img = introImgRef.current;
    if (!wrap || !img) return;
    const rect = wrap.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    img.style.transform = `translate(calc(-5% + ${cx * -10}px), calc(-5% + ${cy * -8}px))`;
  };
  const resetIntroParallax = () => {
    const img = introImgRef.current;
    if (img) img.style.transform = "translate(-5%, -5%)";
  };

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const animFrame = useRef<number | null>(null);

  // Custom cursor
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

    const hoverEls = document.querySelectorAll("a, button, .nav-item, .back-to-top, .pillar-card, .explore-card");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  // Micro particles
  useEffect(() => {
    const container = document.getElementById("microParticles");
    if (!container) return;
    for (let i = 0; i < 12; i++) {
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

  // Nav scroll + back-to-top
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

  // Scroll reveal — with fallback for elements already in view
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

  console.log("HomePage rendered");

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

      <SiteNav ctaHref="/contact" />

      {/* ── Hero ── */}
      <section className="hero" id="top">
        <div className="hero-video-wrap">
          <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="/images/pages/hero-poster.webp">
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
        </div>
        <div className="hero-bg-overlay" />
        <div className="hero-depth" />
        <div className="hero-grid" />
        <div className="hero-content">
          <span className="hero-label"><span className="gold-text"><span className="hero-label-segment">Trusted Advisor &bull;</span> <span className="hero-label-segment">Global Consultancy</span></span></span>
          <h1 className="hero-title">
            Solving complex challenges &amp; delivering digital solutions at the intersection of <em>strategy, operations</em> &amp; <em>technology</em>
          </h1>
          <p className="hero-sub">
            We partner to strengthen the capabilities essential for high-performing enterprises and modern transportation systems.
          </p>
          <a href="#pillars" className="auto-hero-btn"><span>Consider Our Approach</span></a>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>


      {/* Divider */}
      <div className="section-divider">
        <div className="gold-line" />
      </div>

      {/* Divider */}
      <div className="section-divider">
        <div className="gold-line" />
      </div>

      {/* ── Why Rawlins ── */}
      <section className="new-intro" id="intro">
        <div className="new-intro-wrap">
          {/* Images on LEFT — cinematic with parallax + metrics */}
          <div
            className="new-intro-images reveal"
          >
            <div className="intro-cinematic-wrap" ref={introWrapRef}>
              <img
                className="intro-cinematic-img"
                ref={introImgRef}
                src={TRANSPORTATIONROADS_URL}
                alt="Transportation infrastructure"
                loading="lazy"
              />
              <div className="intro-cinematic-overlay" />
              <div className="intro-metrics">
                <div className="intro-metric">
                  <span className="intro-metric-num">2017</span>
                  <span className="intro-metric-label">Established</span>
                </div>
                <div className="intro-metric-divider" />
                <div className="intro-metric">
                  <span className="intro-metric-num">US+</span>
                  <span className="intro-metric-label">Global Reach</span>
                </div>
                <div className="intro-metric-divider" />
                <div className="intro-metric">
                  <span className="intro-metric-num">30+</span>
                  <span className="intro-metric-label">Transportation Agencies Served</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text on RIGHT */}
          <div className="intro-text reveal rd1">
            <p className="section-label">
              <span className="gold-text">Why Rawlins</span>
            </p>
            <h2 className="section-title">
              Rawlins pairs <em>real operating experience</em> with <em>modern tools</em> &mdash; we don&rsquo;t just advise, we help you deliver
            </h2>
            <button
              className={`intro-expand-btn${introOpen ? " expanded" : ""}`}
              aria-label="Learn more about Rawlins"
              onClick={() => setIntroOpen((o) => !o)}
            >
              <span className="intro-expand-icon">
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 1.5l7 7 7-7" />
                </svg>
              </span>
            </button>
            <div className={`intro-expandable${introOpen ? " expanded" : ""}`}>
              <p className="section-text">
                Like many organizations today, you&rsquo;re facing complex, interconnected challenges &mdash; technology-driven transformation, resource constraints, and shifting regulatory demands. Others face the same pressures, but your priorities shape how you respond and the choices you make.
              </p>
              <p className="section-text" style={{ marginTop: "16px" }}>
                This is where we come in. We don&rsquo;t just advise &mdash; we deliver. From strategy and proven frameworks to the systems and products that put them to work, we help you turn decisions into action.
              </p>
              <p style={{ marginTop: "20px", fontWeight: 600, color: "#d0b86c" }}>
                We bring clarity to complexity, and stay through execution, to deliver measurable, long-term outcomes.
              </p>
              <a href="#story" className="about-us-link" style={{ marginTop: "28px", display: "inline-flex", alignItems: "center", gap: "12px", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase" as const, color: "#fff", transition: "all 0.3s" }}>
                <span style={{ textDecoration: "underline", textUnderlineOffset: "4px" }}>ABOUT US</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

              {/* Parallax Quote 1 */}
      <div className="parallax-panel">
        <p className="parallax-text reveal">
          We convert your organizational and strategic priorities into <em>high-impact actions</em> to succeed in a fast-changing world.
        </p>
      </div>


      {/* ── Pillars of Impact ── */}
      <section className="section-pillars" id="pillars">
        <div className="pillars-header">
          <div className="reveal">
            <p className="section-label">
              <span className="gold-text">areas of impact</span>
            </p>
            <h2 className="section-title">Where We <em>Deliver</em></h2>
          </div>
        </div>
        {/* Progress bar + arrow controls above the cards */}
        <div className="pillars-scroll-controls">
          <div className="pillars-scroll-progress-bar">
            <div
              className="pillars-scroll-progress-fill"
              style={{ width: `${pillarsProgress * 100}%` }}
            />
          </div>
          <div className="story-scroll-arrows">
            <button className="story-arrow-btn" onClick={pillarsScrollPrev} aria-label="Previous practice area">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="story-arrow-btn" onClick={pillarsScrollNext} aria-label="Next practice area">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
        <div
          className="pillars-track"
          ref={pillarsTrackRef}
          onScroll={onPillarsScroll}
          onMouseDown={onPillarsMouseDown}
          onMouseMove={onPillarsMouseMove}
          onMouseUp={onPillarsMouseUp}
          onMouseLeave={onPillarsMouseUp}
        >
          {pillars.map((p) => (
            <div
              className={`pillar-card${activePillar === p.name ? " active" : ""}`}
              key={p.name}
              onClick={() => setActivePillar((prev) => (prev === p.name ? null : p.name))}
            >
              <Image src={p.bg} alt={p.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="pillar-card-img" />
              <div className="pillar-card-overlay" />
              <div className="pillar-card-content">
                <span className="pillar-number">{p.num}</span>
                <h3 className="pillar-name">{p.name}</h3>
                <div className="pillar-tags">{p.tags}</div>
                <button
                  className="pillar-expand-btn"
                  aria-label="Expand description"
                  aria-expanded={activePillar === p.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePillar((prev) => (prev === p.name ? null : p.name));
                  }}
                >
                  <svg width="14" height="8" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 1.5l7 7 7-7" />
                  </svg>
                </button>
                <p className="pillar-desc">{p.desc}</p>
                <Link
                  href={p.href}
                  className="pillar-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Explore &#8594;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider">
        <div className="gold-line" />
      </div>


      {/* ── Our Journey ── */}
      <section className="section-story" id="story">
        <div className="story-header reveal">
          <p className="section-label">
            <span className="gold-text">from our story to yours</span>
          </p>
          <h2 className="section-title">
            <em>Evolving</em> Impact
          </h2>
          <p className="section-text" style={{ marginTop: "20px" }}>
            Anchored by a vision to serve as a trusted advisor to transportation agencies across the United States, our firm has continued to evolve since 2017 into a global consultancy.
          </p>
        </div>
            {/* Progress bar + arrow controls */}
          <div className="story-scroll-controls">
            <div className="story-scroll-progress-bar">
              <div
                className="story-scroll-progress-fill"
                style={{ width: `${storyProgress * 100}%` }}
              />
            </div>
            <div className="story-scroll-arrows">
              <button className="story-arrow-btn" onClick={storyScrollPrev} aria-label="Previous">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className="story-arrow-btn" onClick={storyScrollNext} aria-label="Next">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        <div className="story-scroll-outer">
          <div
            className="story-scroll-track"
            ref={storyTrackRef}
            onScroll={onStoryScroll}
            onMouseDown={onStoryMouseDown}
            onMouseMove={onStoryMouseMove}
            onMouseUp={onStoryMouseUp}
            onMouseLeave={onStoryMouseUp}
          >
            {journey.map((item, i) => (
              <div className={`story-card${activeStory === i ? " active" : ""}`} key={item.phase}>
                <Image src={item.bg} alt={item.phase} fill sizes="(max-width: 768px) 80vw, 400px" className="story-card-bg" />
                <div className="story-card-overlay" />
                <div className="story-card-header">
                  <span className="story-card-num">0{i + 1}</span>
                  <span className="timeline-phase">{item.phase}</span>
                </div>
                <div className="story-card-divider" />
                <h3 className="story-card-title">{item.title}</h3>
                <button className="card-expand-btn" aria-label="Expand description" aria-expanded={activeStory === i} onClick={(e) => { e.stopPropagation(); setActiveStory((prev) => (prev === i ? null : i)); }}>
                  <svg width="14" height="8" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5l7 7 7-7" /></svg>
                </button>
                <div className="story-card-body-wrap">
                  <p className="story-card-body">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
      
        </div>
      </section>

         {/* Divider */}
      <div className="section-divider">
        <div className="gold-line" />
      </div>

      {/* ── Go Deeper ── */}
      <section className="section-explore" id="explore">
        <div className="explore-wrapper">
          <div className="explore-header reveal">
            <p className="section-label">
          <span className="gold-text">ways we serve you</span>
            </p>
            <h2 className="section-title">Dive Deeper</h2>

          </div>
          <div className="explore-grid">
            {exploreTopCards.map((card, i) => (
              <Link
                href={card.href}
                className={`explore-card reveal${i > 0 ? ` rd${i}` : ""}${activeExplore === card.title ? " active" : ""}`}
                key={card.title}
                onClick={(e) => {
                  /* On mobile, the whole card should NOT navigate.
                     Tapping anywhere outside the gold CTA arrow
                     toggles the expanded description (same as
                     tapping the small chevron), so users can read
                     the full blurb, and only tapping the gold
                     "EXPLORE …" CTA triggers navigation. */
                  if (
                    typeof window !== "undefined" &&
                    window.matchMedia("(max-width: 768px)").matches
                  ) {
                    const target = e.target as HTMLElement | null;
                    if (!target?.closest(".explore-card-arrow")) {
                      e.preventDefault();
                      setActiveExplore((prev) =>
                        prev === card.title ? null : card.title
                      );
                    }
                  }
                }}
              >
                <Image src={card.bg} alt={card.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" className="explore-card-bg" />
                <div className="explore-card-overlay" />
                <div className="explore-card-inner">
                  <h3 className="explore-card-title">{card.title}</h3>
                  <button className="card-expand-btn" aria-label="Expand description" aria-expanded={activeExplore === card.title} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveExplore((prev) => (prev === card.title ? null : card.title)); }}>
                    <svg width="14" height="8" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5l7 7 7-7" /></svg>
                  </button>
                  <p className="explore-card-desc">{card.desc}</p>
                  <span className="explore-card-arrow">{card.cta}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="explore-bottom">
            {exploreBottomCards.map((card, i) => (
              <Link
                href={card.href}
                className={`explore-card reveal${i > 0 ? " rd1" : ""}${activeExplore === card.title ? " active" : ""}`}
                key={card.title}
                onClick={(e) => {
                  if (
                    typeof window !== "undefined" &&
                    window.matchMedia("(max-width: 768px)").matches
                  ) {
                    const target = e.target as HTMLElement | null;
                    if (!target?.closest(".explore-card-arrow")) {
                      e.preventDefault();
                    }
                  }
                }}
              >
                <Image src={card.bg} alt={card.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" className="explore-card-bg" />
                <div className="explore-card-overlay" />
                <div className="explore-card-inner">
                  <h3 className="explore-card-title">{card.title}</h3>
                  <button className="card-expand-btn" aria-label="Expand description" aria-expanded={activeExplore === card.title} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveExplore((prev) => (prev === card.title ? null : card.title)); }}>
                    <svg width="14" height="8" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5l7 7 7-7" /></svg>
                  </button>
                  <p className="explore-card-desc">{card.desc}</p>
                  <span className="explore-card-arrow">{card.cta}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider">
        <div className="gold-line" />
      </div>

      {/* ── Meet the Team ── */}
      <section className="section-team" id="team">
        <div className="team-content reveal">
          <p className="section-label">
            <span className="gold-text">Our People</span>
          </p>
          <h2 className="section-title">
            Meet the <em>team</em>
          </h2>
          <p className="team-desc">
            Our team brings decades of combined professional experience working within and alongside complex organizations. We pride ourselves on establishing long-term relationships with our family of clients.
          </p>
          <Link href="/about/our-people" className="auto-hero-btn" style={{ opacity: 1, transform: "none", animation: "none" }}><span>View Our Team</span></Link>
        </div>
      </section>


      {/* Divider */}
      <div className="section-divider">
        <div className="gold-line" />
      </div>

      <SiteFooter />
    </>
  );
}
