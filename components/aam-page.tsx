'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';
import { usePinnedScroll } from "@/components/use-pinned-scroll";

const DRONE_IMG = "/images/pages/aam-hero.webp";
const CITY_AERIAL_IMG = "/images/pages/aam-city-aerial.webp";
const INFRASTRUCTURE_IMG = "/images/pages/aam-infrastructure.webp";
const TECH_NETWORK_IMG = "/images/pages/aam-tech-network.webp";
const LOGISTICS_IMG = "/images/pages/aam-logistics.webp";
const PLANNING_IMG = "/images/pages/aam-planning.webp";
const SKYLINE_IMG = "/images/pages/aam-skyline.webp";
const AERIAL_VIEW_IMG = "/images/pages/aam-aerial-view.webp";
const HELICOPTER_IMG = "/images/pages/aam-helicopter.webp";
const CONTROL_ROOM_IMG = "/images/pages/aam-control-room.webp";
const DEFINE_NEW_IMG = "/images/pages/aam-define.webp";
const ENABLE_NEW_IMG = "/images/pages/engineersoperatingdrones.webp";
const DELIVER_NEW_IMG = "/images/pages/aam-deliver.webp";
const PHASE3_IMG = "/images/pages/aam-phase3.webp";
const PHASE4_IMG = "/images/pages/aam-phase4.webp";
const DRONE_FLIGHT_IMG = "/images/pages/skylimit.webp";
const BLUEPRINT_IMG = "/images/pages/aam-policy-planning.webp";
const DATA_CENTER_IMG = "/images/pages/aam-data-center.webp";
const HIGHWAY_AERIAL_IMG = "/images/pages/aam-highway-aerial.webp";
const TEAM_MEETING_IMG = "/images/pages/aam-team-meeting.webp";
const DEFINE_IMG = "/images/pages/connectingdots.webp";
const PLANNING2_IMG = "/images/pages/aam-enable.webp";
const DRONEMOUNTAINS_IMG = "/images/pages/aam-services-portfolio.webp";
const IMPL_SCALING_IMG = "/images/pages/aam-lifecycle-drone.webp";
const REG_NAV_IMG = "/images/pages/aam-reg-navigation.webp";
const COMMUNITY_IMG = "/images/pages/aam-community-engagement.webp";


/* ──── Data ──── */

const pillarCards = [
  {
    title: "Advanced Air Mobility",
    desc: "",
    bullets: ["Urban Air Mobility (UAM)", "Regional Air Mobility (RAM)", "Multi-modal Facilities", "Cargo Transport", "Emergency Medical Transport", "Business Travel", "Tourism & Sightseeing"],
    img: CITY_AERIAL_IMG,
    imgPos: "center 25%",
  },
  {
    title: "Drone Package Delivery",
    desc: "",
    bullets: ["Last-Mile", "Medical", "Rural & Remote", "Inter-Community", "Retail & E-Commerce Support", "Multi-modal Facilities"],
    img: LOGISTICS_IMG,
    imgPos: "center 30%",
  },
  {
    title: "UAS Operational Support",
    desc: "",
    bullets: ["Infrastructure Inspection", "Construction Inspection & Monitoring", "Environmental Monitoring", "Aerial Surveying & Mapping", "Disaster Response", "Incident Scene Management", "Drone as a First Responder (DFR)"],
    img: DRONE_FLIGHT_IMG,
    imgPos: "",
  },
];

const phaseData = [
  { num: "01", label: "Policy & System Planning", body: "Develop policy, system plans, and standardized guidance for local implementation.", img: BLUEPRINT_IMG },
  { num: "02", label: "Regulatory Navigation", body: "Provide regulatory understanding for compliance and guide regulatory coordination.", img: REG_NAV_IMG },
  { num: "03", label: "Infrastructure Planning", body: "Plan for infrastructure, including vertiports, technical research, and validation.", img: PHASE3_IMG },
  { num: "04", label: "Functional Frameworks", body: "Establish functional frameworks that support scalable program delivery and operational readiness.", img: PHASE4_IMG },
  { num: "05", label: "Data & Safety Integration", body: "Integrate data and safety policies into transportation systems.", img: DATA_CENTER_IMG },
  { num: "06", label: "Implementation & Scaling", body: "Support implementation, deployment, and the scaling of AAM and UAS services.", img: IMPL_SCALING_IMG },
  { num: "07", label: "Community Engagement", body: "Facilitate ongoing community engagement and public trust-building.", img: COMMUNITY_IMG },
];

const frameworkCards = [
  {
    title: "Define the Program",
    tagline: "Vision & Planning",
    accent: "linear-gradient(90deg, #c9a84c, #e8d5a0)",
    bullets: ["Community needs assessment", "Vision & mission definition", "Use case & infrastructure evaluation", "Program goals & timeline", "Stakeholder identification", "Grant opportunities", "Legislative support"],
    img: DEFINE_NEW_IMG,
  },
  {
    title: "Enable the System",
    tagline: "Policy & Program Support",
    accent: "linear-gradient(90deg, #d4b878, #c9a84c)",
    bullets: ["Policy development", "Program framework", "Stakeholder engagement", "Infrastructure planning", "Regulatory compliance"],
    img: ENABLE_NEW_IMG,
    imgPos: "center 60%",
  },
  {
    title: "Deliver Operations",
    tagline: "Operations & Scale",
    accent: "linear-gradient(90deg, #e8d5a0, #c9a84c)",
    bullets: ["Operational deployment", "Safety & compliance monitoring", "Performance optimization", "Continuous improvement"],
    img: DELIVER_NEW_IMG,
  },
];

const aamServices = [
  "Feasibility studies", "Vertiport planning", "Air traffic management",
  "Policy framework development", "Community outreach", "Pilot program design",
  "Economic impact analysis", "Safety case development", "Multimodal integration", "Regulatory compliance",
];

const uasServices = [
  "Operational design domain development", "Drone delivery corridor planning", "Data governance frameworks",
  "BVLOS operations support", "Safety management systems", "Ground transportation integration",
  "Workforce training programs", "Airspace deconfliction", "Environmental impact assessments", "Procurement support",
];

/* ──── Landscape Visualization Data ──── */
const lsIcons: Record<string, string> = {
  helicopter: '<g transform="scale(0.9) translate(2,2)"><path d="M4 12h3l2-4h6l2 4h3" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.8"/><line x1="3" y1="8" x2="21" y2="8" stroke="currentColor" stroke-width="1" opacity="0.6"/><line x1="12" y1="8" x2="12" y2="9.5" stroke="currentColor" stroke-width="1"/><line x1="10" y1="14.5" x2="8" y2="18" stroke="currentColor" stroke-width="1"/><line x1="14" y1="14.5" x2="16" y2="18" stroke="currentColor" stroke-width="1"/></g>',
  package: '<g><rect x="5" y="8" width="14" height="12" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="5" y1="13" x2="19" y2="13" stroke="currentColor" stroke-width="1" opacity="0.5"/><line x1="12" y1="8" x2="12" y2="20" stroke="currentColor" stroke-width="1" opacity="0.5"/><path d="M8 4L12 2L16 4" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="12" y1="2" x2="12" y2="8" stroke="currentColor" stroke-width="1"/></g>',
  residential: '<g><path d="M3 12L12 4l9 8" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="6" y="12" width="12" height="8" stroke="currentColor" stroke-width="1.2" fill="none"/><rect x="10" y="15" width="4" height="5" stroke="currentColor" stroke-width="1" fill="none"/></g>',
  medical: '<g><rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" stroke-width="2.5"/><line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="2.5"/></g>',
  rural: '<g><path d="M2 20L12 6l10 14" stroke="currentColor" stroke-width="1.2" fill="none"/><line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" stroke-width="1.2"/><line x1="16" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="1"/><circle cx="8" cy="16" r="1" fill="currentColor" opacity="0.5"/></g>',
  city: '<g><rect x="2" y="10" width="5" height="11" stroke="currentColor" stroke-width="1" fill="none"/><rect x="8" y="4" width="5" height="17" stroke="currentColor" stroke-width="1" fill="none"/><rect x="14" y="7" width="5" height="14" stroke="currentColor" stroke-width="1" fill="none"/><rect x="20" y="12" width="3" height="9" stroke="currentColor" stroke-width="0.8" fill="none"/></g>',
};

// Node positions: direct SVG pixel coords from Illustrator (viewBox 0 0 1000 660)
// x/y are stored as raw pixels, used directly (no multiplier)
const landscapeNodes = [
  { id: 'urban-air-taxi', label: 'Air Taxi', x: 174.83, y: 121.83, icon: 'helicopter', desc: 'Electric vertical takeoff and landing (eVTOL) aircraft providing on-demand urban and regional passenger transport.' },
  { id: 'package-delivery', label: 'Package Delivery', x: 192.74, y: 418.69, icon: 'package', desc: 'Automated drone logistics for last-mile and middle-mile package delivery across urban and suburban areas.' },
  { id: 'residential', label: 'Residential Areas', x: 491.83, y: 146.83, icon: 'residential', desc: 'Suburban and residential communities served by drone delivery, air taxi connections, and emergency response UAS.' },
  { id: 'medical', label: 'Medical Supplies', x: 487.76, y: 362.72, icon: 'medical', desc: 'Time-critical medical supply delivery including lab samples, medications, vaccines, and emergency equipment.' },
  { id: 'rural', label: 'Rural & Agriculture', x: 773.2, y: 132.58, icon: 'rural', desc: 'Agricultural monitoring, crop spraying, rural delivery services, and environmental data collection for remote areas.' },
  { id: 'city-center', label: 'City Center', x: 702, y: 377.09, icon: 'city', desc: 'Dense urban cores integrating vertiport networks, drone corridors, and multimodal transit connections.' },
];

const landscapePaths = [
  // Yellow — Urban Air Taxi routes (big sweeping arcs)
  { from: 'urban-air-taxi', to: 'residential', color: '#c9a84c', type: 'air-taxi' },
  { from: 'urban-air-taxi', to: 'rural', color: '#c9a84c', type: 'air-taxi' },
  { from: 'residential', to: 'rural', color: '#c9a84c', type: 'air-taxi' },
  { from: 'residential', to: 'city-center', color: '#c9a84c', type: 'air-taxi' },
  { from: 'urban-air-taxi', to: 'city-center', color: '#c9a84c', type: 'air-taxi' },
  // Brown — Package Delivery routes
  { from: 'package-delivery', to: 'residential', color: '#8b6f47', type: 'delivery' },
  { from: 'package-delivery', to: 'medical', color: '#8b6f47', type: 'delivery' },
  { from: 'package-delivery', to: 'city-center', color: '#8b6f47', type: 'delivery' },
  { from: 'package-delivery', to: 'rural', color: '#8b6f47', type: 'delivery' },
  // Red — Medical Supply routes
  { from: 'medical', to: 'residential', color: '#d4443b', type: 'medical' },
  { from: 'medical', to: 'city-center', color: '#d4443b', type: 'medical' },
  { from: 'medical', to: 'rural', color: '#d4443b', type: 'medical' },
];

/* ──── Stakeholder Ecosystem Data ──── */
const ecoIcons: Record<string, string> = {
  aviation: 'M12 2L4 14h4v6h8v-6h4L12 2z',
  government: 'M3 21h18v-2H3v2zm0-4h18v-2H3v2zm2-6v4h3v-4H5zm5 0v4h4v-4h-4zm6 0v4h3v-4h-3zM4 9l8-6 8 6H4z',
  standards: 'M9 3v2H5v14h14V5h-4V3H9zm0 2h6v2H9V5zM7 9h10v2H7V9zm0 4h10v2H7v-2z',
  academic: 'M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 12.18L4 11.1V16l8 4 8-4v-4.9l-8 4.08z',
  ansp: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a2 2 0 110 4 2 2 0 010-4zm-1 6h2v2l3 5h-2.2l-1.8-3.5L10.2 19H8l3-5v-2z',
  operators: 'M12 2L8 8h3v4H7l-2 4h3v4h8v-4h3l-2-4h-4V8h3L12 2z',
  industry: 'M22 9l-4-4-4 4h2v4h-4V9l-4-4-4 4h2v4H2v8h20v-8h-2V9h2zm-6 10h-3v-4h3v4zm-5 0H8v-4h3v4z',
  cities: 'M3 21h18v-2H3v2zM5 13v6h4v-6H5zm6-4v10h4V9h-4zm6 2v8h4v-8h-4z',
};

const ecosystemNodes = [
  { id: 'aviation', label: 'Aviation\nAuthorities', short: 'FAA · ICAO · NASAO', desc: 'Interpreting U.S. federal and international aviation regulatory bodies shaping airspace policy and certification standards.', angle: 0 },
  { id: 'government', label: 'Government\nAgencies', short: 'US DOTs · Security · Emergency', desc: 'Aligning State, Federal, and International transportation agencies, security forces, and emergency management services.', angle: 45 },
  { id: 'standards', label: 'Standards\nOrganizations', short: 'ACRA · AASHTO · NCHRP', desc: 'Developing industry standards for technical requirements, performance benchmarks, and implementation frameworks.', angle: 90 },
  { id: 'academic', label: 'Academic\nInstitutions', short: 'Research · Universities · Labs', desc: 'Steering research centers and universities advancing AAM technology, safety analysis, and workforce development.', angle: 135 },
  { id: 'ansp', label: 'Air Navigation\nProviders', short: 'UTM · ATM · Traffic Management', desc: 'Integrating UAS traffic management operators and air traffic management providers to enable safe airspaces.', angle: 180 },
  { id: 'operators', label: 'Operators &\nServices', short: 'Drone Operations · Delivery · Providers', desc: 'Informing commercial drone operators, delivery service providers, and aerial operations companies on industry best practices.', angle: 225 },
  { id: 'industry', label: 'Industry', short: 'OEMs · Tech · Integrators', desc: 'Guiding aircraft manufacturers, technology providers and systems integrators building the vehicles for tomorrow\'s airspace.', angle: 270 },
  { id: 'cities', label: 'Cities &\nMPOs', short: 'Municipal · Planning · Transit', desc: 'Integrating AAM solutions across rural and urban communities.', angle: 315 },
];


/* ──── Component ──── */

const AAMPage = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const animFrame = useRef<number | null>(null);

  const [openPillars, setOpenPillars] = useState<Set<number>>(new Set());
  const [openFrameworks, setOpenFrameworks] = useState<Set<number>>(new Set());
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [introOpen, setIntroOpen] = useState(false);
  const [valueOpen, setValueOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [openServices, setOpenServices] = useState<Set<number>>(new Set());
  const [hoveredLs, setHoveredLs] = useState<string | null>(null);
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Phases horizontal scroll
  const [phasesProgress, setPhasesProgress] = useState(0);
  const phasesPinRef = useRef<HTMLDivElement>(null);
  const phasesViewportRef = useRef<HTMLDivElement>(null);
  const phasesTrackRef = useRef<HTMLDivElement>(null);
  usePinnedScroll(phasesPinRef, phasesViewportRef, phasesTrackRef, setPhasesProgress);

  const phasesScrollPrev = () => {
    const pin = phasesPinRef.current; if (!pin) return;
    const step = (pin.offsetHeight - window.innerHeight) / Math.max(1, phaseData.length - 1);
    window.scrollBy({ top: -step, behavior: "smooth" });
  };
  const phasesScrollNext = () => {
    const pin = phasesPinRef.current; if (!pin) return;
    const step = (pin.offsetHeight - window.innerHeight) / Math.max(1, phaseData.length - 1);
    window.scrollBy({ top: step, behavior: "smooth" });
  };

  const toggleSet = (setter: React.Dispatch<React.SetStateAction<Set<number>>>, idx: number) => {
    setter(prev => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

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
    const hoverEls = document.querySelectorAll("a, button, .nav-item, .back-to-top, .aam-pillar-card, .aam-framework-card, .explore-card, .eco-svg g[style]");
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

  // Nav + back-to-top
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

  // Scroll reveal
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

  const chevronSvg = (rotated: boolean) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.3s", transform: rotated ? "rotate(180deg)" : "rotate(0)" }}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

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
        <svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      </a>

      <SiteNav ctaHref="/contact" />

      {/* ── Hero ── */}
      <section className="aam-hero aam-parallax-fixed" id="top" style={{ backgroundImage: `url(${DRONE_IMG})` }}>
        <Image src={DRONE_IMG} alt="" fill priority sizes="100vw" className="aam-hero-img" />
        <div className="aam-hero-overlay" />
        <div className="aam-hero-content">
          <span className="hero-label"><span className="gold-text"><span className="hero-label-segment">Aerial Innovation &bull;</span> <span className="hero-label-segment">Future Mobility</span></span></span>
          <h1 className="hero-title"><span className="aam-title-segment"><em>Advanced Air Mobility</em> &amp;</span> <span className="aam-title-segment">Uncrewed Aircraft Systems</span></h1>
          <p className="hero-sub">Your trusted partner in shaping tomorrow&rsquo;s skies—delivering UAS and AAM solutions grounded in practical experience.</p>
          <a href="#intro" className="auto-hero-btn"><span>Explore Our Approach</span></a>
        </div>
        <div className="hero-scroll"><span>Scroll</span><div className="scroll-line" /></div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Intro: Why AAM & UAS ── */}
      <section className="aam-section aam-overview-section" id="intro">
        <div className="aam-container">
          <div className="aam-overview-grid">
            <div className="aam-overview-left reveal">
              <p className="section-label"><span className="gold-text">are you ready?</span></p>
              <h2 className="section-title"><em>Integrate</em> the <em>next layer</em> of your transportation system</h2>
              <button
                className={`intro-expand-btn${introOpen ? " expanded" : ""}`}
                aria-label="Learn more"
                onClick={() => setIntroOpen(o => !o)}
              >
                <span className="intro-expand-icon">
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 1.5l7 7 7-7" />
                  </svg>
                </span>
              </button>
              <div className={`intro-expandable${introOpen ? " expanded" : ""}`}>
                <p className="aam-section-lead">
                  Advanced air mobility (AAM) and uncrewed aircraft systems (UAS) are increasingly part of modern mobility ecosystems. Together, these systems and associated technologies are expected to transform transportation by enhancing connectivity, improving cargo logistics, expediting emergency response, and assisting infrastructure inspection.
                </p>
                <p className="aam-section-lead">
                  Next-generation aerial capabilities, integrated into existing mobility systems, complement ground, rail, and maritime transport networks. They strengthen multimodal transportation and enable urban, rural, and regional areas to benefit from a more connected, resilient, and adaptable mobility ecosystem.
                </p>
              </div>
            </div>
            <div className="aam-overview-right reveal rd1">
              <div className="ls-vis-wrapper">
                <svg viewBox="0 0 1000 660" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '110%', height: 'auto', marginLeft: '-5%' }}>
                  <defs>
                    <linearGradient id="lsGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#c9a84c" />
                      <stop offset="50%" stopColor="#e8d5a0" />
                      <stop offset="100%" stopColor="#c9a84c" />
                    </linearGradient>
                    <radialGradient id="lsNodeGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
                    </radialGradient>
                    <filter id="lsGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
                      <feFlood floodColor="#c9a84c" floodOpacity="0.5" result="color" />
                      <feComposite in="color" in2="blur" operator="in" result="shadow" />
                      <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="lsGlowMed" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
                      <feFlood floodColor="#d4443b" floodOpacity="0.5" result="color" />
                      <feComposite in="color" in2="blur" operator="in" result="shadow" />
                      <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <style>{`
                      .ls-flight-path { stroke-dasharray: 8 12; animation: lsDash 4s linear infinite; }
                      .ls-flight-path-med { stroke-dasharray: 6 10; animation: lsDash 3s linear infinite; }
                      .ls-flight-path-reverse { stroke-dasharray: 8 12; animation: lsDashReverse 4s linear infinite; }
                      .ls-particle { animation: lsParticle 3s linear infinite; opacity: 0; }
                      .ls-node-pulse { animation: lsNodePulse 4s ease-in-out infinite; }
                      @keyframes lsDash { to { stroke-dashoffset: -60; } }
                      @keyframes lsDashReverse { to { stroke-dashoffset: 60; } }
                      @keyframes lsParticle { 0% { opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { opacity: 0; } }
                      @keyframes lsNodePulse { 0%,100% { r: 32; opacity: 0.12; } 50% { r: 40; opacity: 0.25; } }
                    `}</style>
                  </defs>

                  {/* Grid */}
                  <g opacity="0.04">
                    {Array.from({ length: 21 }, (_, i) => (
                      <React.Fragment key={`lsg-${i}`}>
                        <line x1={i * 50} y1="0" x2={i * 50} y2="600" stroke="#c9a84c" strokeWidth="0.5" />
                        <line x1="0" y1={i * 30} x2="1000" y2={i * 30} stroke="#c9a84c" strokeWidth="0.5" />
                      </React.Fragment>
                    ))}
                  </g>


                  {/* ── SCENE: Building silhouettes — exact Illustrator coords ── */}
                  {/* Airport/Urban Air Taxi */}
                  <g opacity={hoveredLs === 'urban-air-taxi' ? 1 : 0.85} style={{ transition: 'opacity 0.3s' }}>
                    <g transform="translate(93.49,225.83)">
                      <ellipse cx="0" cy="0" rx="18" ry="12" fill="#c0bcb6" />
                      <line x1="-18" y1="-5" x2="-34" y2="-13" stroke="#c0bcb6" strokeWidth="2.5" />
                      <line x1="18" y1="-5" x2="34" y2="-13" stroke="#c0bcb6" strokeWidth="2.5" />
                      <ellipse cx="-34" cy="-15" rx="14" ry="4" fill="none" stroke="#aaa6a0" strokeWidth="1.2" />
                      <ellipse cx="34" cy="-15" rx="14" ry="4" fill="none" stroke="#aaa6a0" strokeWidth="1.2" />
                      <line x1="-12" y1="11" x2="-16" y2="17" stroke="#aaa6a0" strokeWidth="1.5" />
                      <line x1="12" y1="11" x2="16" y2="17" stroke="#aaa6a0" strokeWidth="1.5" />
                      <line x1="-20" y1="17" x2="20" y2="17" stroke="#9e9a94" strokeWidth="1.5" />
                      <circle cx="0" cy="-7" r="4" fill="#c9a84c" />
                      <path d="M-6 9 L-4 0 L4 0 L6 9Z" fill="rgba(201,168,76,0.8)" />
                    </g>
                    <path d="M79.04 309.94 Q79.04 270 169.04 258 Q259.04 270 259.04 309.94 L259.04 339.94 L79.04 339.94Z" fill="#b8b4ae" stroke="#ccc8c2" strokeWidth="1" />
                    <rect x="97.04" y="287.94" width="140" height="52" fill="#9e9a94" stroke="#b8b4ae" strokeWidth="0.5" />
                    <rect x="114.04" y="297.94" width="28" height="14" fill="#87837d" />
                    <rect x="154.04" y="297.94" width="28" height="14" fill="#87837d" />
                    <rect x="194.04" y="297.94" width="28" height="14" fill="#87837d" />
                    <rect x="131.04" y="319.94" width="14" height="20" fill="#7a766f" />
                    <rect x="151.04" y="319.94" width="14" height="20" fill="#7a766f" />
                    <rect x="171.04" y="319.94" width="14" height="20" fill="#7a766f" />
                    <rect x="281.04" y="254.94" width="16" height="85" fill="#c0bcb6" />
                    <rect x="273.04" y="239.94" width="32" height="20" rx="3" fill="#ccc8c2" stroke="#d8d4ce" strokeWidth="0.8" />
                    <rect x="277.04" y="244.94" width="6" height="10" fill="#7eb8d0" />
                    <rect x="285.04" y="244.94" width="6" height="10" fill="#7eb8d0" />
                    <rect x="293.04" y="244.94" width="6" height="10" fill="#7eb8d0" />
                    <rect x="267.04" y="309.94" width="50" height="30" fill="#a8a49e" />
                    <g transform="translate(165,230) rotate(-10)">
                      <ellipse cx="30" cy="8" rx="32" ry="6" fill="#ccc8c2" />
                      <path d="M18 8 L28 -14 L36 -12 L26 8Z" fill="#b8b4ae" />
                      <path d="M18 8 L28 30 L36 28 L26 8Z" fill="#b8b4ae" />
                      <path d="M-2 8 L2 -5 L9 -3 L5 8Z" fill="#aaa6a0" />
                      <ellipse cx="58" cy="8" rx="6" ry="4" fill="#7eb8d0" />
                    </g>
                  </g>

                  {/* Package Delivery */}
                  <g opacity={hoveredLs === 'package-delivery' ? 1 : 0.85} style={{ transition: 'opacity 0.3s' }}>
                    <rect x="114.5" y="509.11" width="170" height="85" fill="#b0aca6" />
                    <rect x="114.5" y="494.11" width="170" height="20" fill="#a8a49e" />
                    <rect x="144.5" y="549.11" width="28" height="45" fill="#87837d" />
                    <rect x="182.5" y="549.11" width="28" height="45" fill="#87837d" />
                    <rect x="220.5" y="549.11" width="28" height="45" fill="#87837d" />
                    <g transform="translate(121.49,402.03)">
                      <ellipse cx="0" cy="0" rx="16" ry="7" fill="#ccc8c2" />
                      <line x1="-16" y1="0" x2="-30" y2="-7" stroke="#c0bcb6" strokeWidth="2.5" />
                      <line x1="16" y1="0" x2="30" y2="-7" stroke="#c0bcb6" strokeWidth="2.5" />
                      <ellipse cx="-30" cy="-9" rx="12" ry="3.5" fill="none" stroke="#aaa6a0" strokeWidth="1.2" />
                      <ellipse cx="30" cy="-9" rx="12" ry="3.5" fill="none" stroke="#aaa6a0" strokeWidth="1.2" />
                      <line x1="-9" y1="7" x2="-14" y2="16" stroke="#aaa6a0" strokeWidth="1.5" />
                      <line x1="9" y1="7" x2="14" y2="16" stroke="#aaa6a0" strokeWidth="1.5" />
                      <line x1="0" y1="7" x2="0" y2="18" stroke="#c9a84c" strokeWidth="1" />
                      <rect x="-9" y="18" width="18" height="16" rx="2" fill="#c9a84c" stroke="#dab84c" strokeWidth="1" />
                      <line x1="0" y1="18" x2="0" y2="34" stroke="rgba(201,168,76,0.5)" strokeWidth="0.8" />
                      <line x1="-9" y1="26" x2="9" y2="26" stroke="rgba(201,168,76,0.5)" strokeWidth="0.8" />
                    </g>
                  </g>

                  {/* Residential */}
                  <g opacity={hoveredLs === 'residential' ? 1 : 0.85} style={{ transition: 'opacity 0.3s' }}>
                    <rect x="411.83" y="221.83" width="38" height="28" fill="#b8b4ae" />
                    <path d="M405.83 221.83 L430.83 198.83 L455.83 221.83Z" fill="#ada9a3" />
                    <rect x="422.83" y="232.83" width="10" height="17" fill="#8a8680" />
                    <rect x="461.83" y="208.83" width="50" height="41" fill="#c0bcb6" />
                    <path d="M455.83 208.83 L486.83 181.83 L517.83 208.83Z" fill="#b0aca6" />
                    <rect x="479.83" y="232.83" width="13" height="17" fill="#8a8680" />
                    <rect x="466.83" y="216.83" width="9" height="9" fill="#7eb8d0" />
                    <rect x="521.83" y="204.83" width="55" height="45" fill="#bcb8b2" />
                    <path d="M515.83 204.83 L548.83 176.83 L582.83 204.83Z" fill="#ada9a3" />
                    <rect x="527.83" y="212.83" width="9" height="9" fill="#7eb8d0" />
                    <rect x="541.83" y="212.83" width="9" height="9" fill="#7eb8d0" />
                    <rect x="557.83" y="212.83" width="9" height="9" fill="#7eb8d0" />
                    <rect x="543.83" y="232.83" width="12" height="17" fill="#8a8680" />
                    <circle cx="454.83" cy="234.83" r="10" fill="#5a945a" />
                    <circle cx="516.83" cy="236.83" r="8" fill="#4f8a4f" />
                    <circle cx="586.83" cy="234.83" r="11" fill="#558e55" />
                    <line x1="401.83" y1="249.83" x2="601.83" y2="249.83" stroke="rgba(232,230,225,0.4)" strokeWidth="1" />
                  </g>

                  {/* City Center */}
                  <g opacity={hoveredLs === 'city-center' ? 1 : 0.85} style={{ transition: 'opacity 0.3s' }}>
                    <rect x="712.49" y="420.09" width="32" height="120" fill="#b8b4ae" />
                    <rect x="749.49" y="398.09" width="28" height="142" fill="#b0aca6" />
                    <rect x="782.49" y="440.09" width="22" height="100" fill="#a8a49e" />
                    <rect x="809.49" y="380.09" width="38" height="160" fill="#c0bcb6" />
                    <rect x="852.49" y="420.09" width="24" height="120" fill="#aca8a2" />
                    <rect x="881.49" y="450.09" width="20" height="90" fill="#9e9a94" />
                    <rect x="717.49" y="430.09" width="6" height="6" fill="#c9a84c" />
                    <rect x="725.49" y="430.09" width="6" height="6" fill="#c9a84c" />
                    <rect x="717.49" y="442.09" width="6" height="6" fill="#c9a84c" />
                    <rect x="814.49" y="390.09" width="7" height="7" fill="rgba(201,168,76,0.6)" />
                    <rect x="825.49" y="390.09" width="7" height="7" fill="rgba(201,168,76,0.6)" />
                    <rect x="814.49" y="406.09" width="7" height="7" fill="rgba(201,168,76,0.6)" />
                    <rect x="825.49" y="406.09" width="7" height="7" fill="rgba(201,168,76,0.6)" />
                    <rect x="814.49" y="422.09" width="7" height="7" fill="rgba(201,168,76,0.6)" />
                    <rect x="906.49" y="420.09" width="48" height="120" fill="#c2872e" rx="2" />
                    <rect x="912.49" y="430.09" width="9" height="9" fill="rgba(0,0,0,0.4)" />
                    <rect x="927.49" y="430.09" width="9" height="9" fill="rgba(0,0,0,0.4)" />
                    <rect x="912.49" y="446.09" width="9" height="9" fill="rgba(0,0,0,0.4)" />
                    <rect x="927.49" y="446.09" width="9" height="9" fill="rgba(0,0,0,0.4)" />
                    <rect x="912.49" y="462.09" width="9" height="9" fill="rgba(0,0,0,0.4)" />
                    <rect x="927.49" y="462.09" width="9" height="9" fill="rgba(0,0,0,0.4)" />
                  </g>

                  {/* Medical */}
                  <g opacity={hoveredLs === 'medical' ? 1 : 0.85} style={{ transition: 'opacity 0.3s' }}>
                    <rect x="489.68" y="475.05" width="112.25" height="99.78" fill="#b8b4ae" />
                    <rect x="489.68" y="462.58" width="112.25" height="17.46" fill="#c0bcb6" />
                    <rect x="527.1" y="440.13" width="37.42" height="27.44" rx="3.74" fill="#d4443b" />
                    <rect x="540.82" y="445.12" width="9.98" height="17.46" fill="#fff" />
                    <rect x="532.09" y="451.36" width="27.44" height="4.99" fill="#fff" />
                    <rect x="499.66" y="485.03" width="12.47" height="12.47" fill="#7eb8d0" />
                    <rect x="519.62" y="485.03" width="12.47" height="12.47" fill="#7eb8d0" />
                    <rect x="539.57" y="485.03" width="12.47" height="12.47" fill="#7eb8d0" />
                    <rect x="559.53" y="485.03" width="12.47" height="12.47" fill="#7eb8d0" />
                    <rect x="579.48" y="485.03" width="12.47" height="12.47" fill="#7eb8d0" />
                    <rect x="499.66" y="512.47" width="12.47" height="12.47" fill="#7eb8d0" />
                    <rect x="519.62" y="512.47" width="12.47" height="12.47" fill="#7eb8d0" />
                    <rect x="539.57" y="512.47" width="12.47" height="12.47" fill="#7eb8d0" />
                    <rect x="559.53" y="512.47" width="12.47" height="12.47" fill="#7eb8d0" />
                    <rect x="579.48" y="512.47" width="12.47" height="12.47" fill="#7eb8d0" />
                    <rect x="529.59" y="537.42" width="32.43" height="37.42" fill="#8a8680" />
                    <g transform="translate(446.46,459.18)">
                      <ellipse cx="0" cy="0" rx="20" ry="8.73" fill="#ccc8c2" />
                      <line x1="-20" y1="0" x2="-37.5" y2="-8.73" stroke="#c0bcb6" strokeWidth="2.5" />
                      <line x1="20" y1="0" x2="37.5" y2="-8.73" stroke="#c0bcb6" strokeWidth="2.5" />
                      <ellipse cx="-37.5" cy="-11.23" rx="15" ry="4.37" fill="none" stroke="#aaa6a0" strokeWidth="1.2" />
                      <ellipse cx="37.5" cy="-11.23" rx="15" ry="4.37" fill="none" stroke="#aaa6a0" strokeWidth="1.2" />
                      <line x1="-11.23" y1="8.73" x2="-17.46" y2="19.96" stroke="#aaa6a0" strokeWidth="1.5" />
                      <line x1="11.23" y1="8.73" x2="17.46" y2="19.96" stroke="#aaa6a0" strokeWidth="1.5" />
                      <g transform="translate(0,35)">
                        <path d="M0 4 C0 -8.73 -12.47 -11.23 -12.47 -2.49 C-12.47 3.75 0 14.97 0 14.97 C0 14.97 12.47 3.75 12.47 -2.49 C12.47 -11.23 0 -8.73 0 4Z" fill="#d4443b" stroke="#e04e47" strokeWidth="1.25" />
                        <path d="M-7.49 5.35 L-3.74 5.35 L0 -0.87 L3.74 6.24 L6.24 -0.87 L8.73 5.35" fill="none" stroke="#fff" strokeWidth="1.2" />
                      </g>
                    </g>
                  </g>

                  {/* Rural */}
                  <g opacity={hoveredLs === 'rural' ? 1 : 0.85} style={{ transition: 'opacity 0.3s' }}>
                    <rect x="723.49" y="188.08" width="55" height="45" fill="#bcb8b2" />
                    <path d="M717.49 188.08 L750.49 161.08 L784.49 188.08Z" fill="#b09870" />
                    <rect x="741.49" y="209.08" width="16" height="24" fill="#8a8680" />
                    <rect x="788.49" y="171.08" width="20" height="62" rx="5" fill="#b8b4ae" />
                    <ellipse cx="798.49" cy="171.08" rx="10" ry="6" fill="#ada9a3" />
                    <line x1="828.49" y1="165.08" x2="828.49" y2="233.08" stroke="#c0bcb6" strokeWidth="2.5" />
                    <g transform="translate(828.49,165.08)">
                      <line x1="0" y1="0" x2="-16" y2="-20" stroke="#b8b4ae" strokeWidth="2" />
                      <line x1="0" y1="0" x2="20" y2="-12" stroke="#b8b4ae" strokeWidth="2" />
                      <line x1="0" y1="0" x2="10" y2="20" stroke="#b8b4ae" strokeWidth="2" />
                      <line x1="0" y1="0" x2="-20" y2="10" stroke="#b8b4ae" strokeWidth="2" />
                    </g>
                    <path d="M703.49 213.08 L713.49 178.08 L723.49 213.08Z" fill="#5a945a" />
                    <path d="M691.49 218.08 L698.49 191.08 L705.49 218.08Z" fill="#4f8a4f" />
                    <circle cx="853.49" cy="215.08" r="10" fill="#558e55" />
                    <circle cx="871.49" cy="219.08" r="7" fill="#4f8a4f" />
                    <line x1="688.49" y1="233.08" x2="883.49" y2="233.08" stroke="rgba(232,230,225,0.35)" strokeWidth="1" />
                  </g>


                  {/* ── FLIGHT PATHS ── */}
                  {landscapePaths.map((fp, i) => {
                    const from = landscapeNodes.find(n => n.id === fp.from)!;
                    const to = landscapeNodes.find(n => n.id === fp.to)!;
                    const x1 = from.x, y1 = from.y;
                    const x2 = to.x, y2 = to.y;
                    let d: string;
                    const mx = (x1 + x2) / 2;
                    // Sweeping arcs matching AI file routing
                    if (fp.from === 'urban-air-taxi' && fp.to === 'rural') {
                      d = `M${x1},${y1} Q${mx},-50 ${x2},${y2}`;
                    } else if (fp.from === 'urban-air-taxi' && fp.to === 'residential') {
                      d = `M${x1},${y1} Q${mx},-20 ${x2},${y2}`;
                    } else if (fp.from === 'urban-air-taxi' && fp.to === 'city-center') {
                      const my = (y1 + y2) / 2;
                      d = `M${x1},${y1} Q${mx - 40},${my - 60} ${x2},${y2}`;
                    } else if (fp.from === 'residential' && fp.to === 'rural') {
                      d = `M${x1},${y1} Q${mx},-30 ${x2},${y2}`;
                    } else if (fp.from === 'residential' && fp.to === 'city-center') {
                      const my = (y1 + y2) / 2;
                      d = `M${x1},${y1} Q${mx + 20},${my - 30} ${x2},${y2}`;
                    } else if (fp.from === 'package-delivery' && fp.to === 'residential') {
                      d = `M${x1},${y1} Q${mx - 60},${(y1 + y2) / 2 - 40} ${x2},${y2}`;
                    } else if (fp.from === 'package-delivery' && fp.to === 'rural') {
                      d = `M${x1},${y1} Q${mx},${(y1 + y2) / 2 - 80} ${x2},${y2}`;
                    } else if (fp.from === 'package-delivery' && fp.to === 'city-center') {
                      d = `M${x1},${y1} Q${mx - 20},${(y1 + y2) / 2 + 30} ${x2},${y2}`;
                    } else if (fp.from === 'medical' && fp.to === 'residential') {
                      d = `M${x1},${y1} Q${mx - 30},${(y1 + y2) / 2 - 40} ${x2},${y2}`;
                    } else if (fp.from === 'medical' && fp.to === 'rural') {
                      d = `M${x1},${y1} Q${mx + 20},${(y1 + y2) / 2 - 50} ${x2},${y2}`;
                    } else {
                      const dx = x2 - x1, dy = y2 - y1;
                      const my = (y1 + y2) / 2 + dx * 0.12;
                      d = `M${x1},${y1} Q${mx - dy * 0.12},${my} ${x2},${y2}`;
                    }
                    // Highlight: source node lights up all its paths; destination nodes light up all paths connected to them
                    const hoveredNode = hoveredLs;
                    const sourceNodes: Record<string, string> = { 'air-taxi': 'urban-air-taxi', 'delivery': 'package-delivery', 'medical': 'medical' };
                    const isSourceHighlighted = hoveredNode === sourceNodes[fp.type];
                    const isConnected = hoveredNode === fp.from || hoveredNode === fp.to;
                    const hl = isSourceHighlighted || isConnected;
                    const cls = fp.type === 'medical' ? 'ls-flight-path-med' : (i % 2 === 0 ? 'ls-flight-path' : 'ls-flight-path-reverse');
                    const hlColor = hl ? (fp.type === 'air-taxi' ? '#e8d5a0' : fp.type === 'medical' ? '#e8585a' : '#b8976a') : fp.color;
                    return (
                      <React.Fragment key={`lsp-${i}`}>
                        <path d={d} fill="none" stroke={hlColor} strokeWidth={hl ? 2.5 : 1.2} opacity={hl ? 0.85 : 0.35} className={cls} />
                        <path id={`lspath-${i}`} d={d} fill="none" stroke="none" />
                        <circle r={hl ? 4 : 3} fill={hlColor} className="ls-particle" style={{ animationDelay: `${i * 0.4}s`, animationDuration: `${2.5 + (i % 3) * 0.5}s` }}>
                          <animateMotion dur={`${3 + (i % 4) * 0.8}s`} repeatCount="indefinite">
                            <mpath href={`#lspath-${i}`} />
                          </animateMotion>
                        </circle>
                      </React.Fragment>
                    );
                  })}

                  {/* ── Animated drones on some paths ── */}
                  {[0, 1, 5, 7, 10].map(idx => {
                    const fp = landscapePaths[idx];
                    if (!fp) return null;
                    const c = fp.type === 'medical' ? '#d4443b' : fp.type === 'delivery' ? '#8b6f47' : '#c9a84c';
                    return (
                      <g key={`drone-${idx}`} opacity="0.8">
                        <g>
                          <animateMotion dur={`${5 + idx * 0.5}s`} repeatCount="indefinite">
                            <mpath href={`#lspath-${idx}`} />
                          </animateMotion>
                          <circle r="5" fill={c} opacity="0.25" />
                          <line x1="-8" y1="0" x2="8" y2="0" stroke={c} strokeWidth="1.2" opacity="0.8" />
                          <line x1="0" y1="-5" x2="0" y2="5" stroke={c} strokeWidth="1.2" opacity="0.8" />
                          <circle r="2" fill={c} opacity="0.9" />
                        </g>
                      </g>
                    );
                  })}

                  {/* ── INTERACTIVE NODES ── */}
                  {landscapeNodes.map((node, ni) => {
                    const nx = node.x;
                    const ny = node.y;
                    const hl = hoveredLs === node.id;
                    const isMed = node.id === 'medical';
                    const sc = isMed && hl ? '#d4443b' : hl ? '#e8d5a0' : 'rgba(201,168,76,0.4)';
                    const flt = hl ? (isMed ? 'url(#lsGlowMed)' : 'url(#lsGlow)') : 'none';
                    return (
                      <g
                        key={node.id}
                        style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                        onMouseEnter={() => setHoveredLs(node.id)}
                        onMouseLeave={() => setHoveredLs(null)}
                      >
                        {/* Pulse ring */}
                        <circle cx={nx} cy={ny} r={32} fill="none" stroke={isMed ? '#d4443b' : '#c9a84c'} strokeWidth="0.8" className="ls-node-pulse" style={{ animationDelay: `${ni * 0.5}s` }} />
                        {/* Glow */}
                        <circle cx={nx} cy={ny} r={hl ? 48 : 36} fill="url(#lsNodeGlow)" opacity={hl ? 1 : 0.6} />
                        {/* Circle bg */}
                        <circle cx={nx} cy={ny} r={26} fill="rgba(19, 36, 58, 0.92)" stroke={sc} strokeWidth={hl ? 2 : 1} />
                        {/* Icon */}
                        <g
                          transform={`translate(${nx - 13},${ny - 13})`}
                          style={{ filter: flt }}
                        >
                          <svg width="26" height="26" viewBox="0 0 24 24">
                            <g dangerouslySetInnerHTML={{ __html: lsIcons[node.icon].replace(/currentColor/g, isMed ? '#d4443b' : 'url(#lsGoldGrad)') }} />
                          </svg>
                        </g>
                        {/* Hit area */}
                        <circle cx={nx} cy={ny} r={45} fill="transparent" />
                      </g>
                    );
                  })}

                  {/* ── LABELS (rendered last = on top of everything) ── */}
                  {landscapeNodes.map((node) => {
                    const nx = node.x;
                    const ny = node.y;
                    const hl = hoveredLs === node.id;
                    let lx = nx, ly = ny + 50, anchor: string = 'middle';
                    if (node.id === 'urban-air-taxi') { ly = 178; }
                    if (node.id === 'package-delivery') { lx = nx + 20; ly = 480; }
                    if (node.id === 'residential') { ly = 285; }
                    if (node.id === 'medical') { ly = 422; }
                    if (node.id === 'rural') { ly = 266; }
                    if (node.id === 'city-center') { lx = 830; ly = 366; }
                    return (
                      <text
                        key={`label-${node.id}`}
                        x={lx} y={ly}
                        textAnchor={anchor}
                        fill="#ffffff"
                        fontFamily="'DM Sans', sans-serif"
                        fontSize="17"
                        fontWeight="600"
                        letterSpacing="1.5"
                        style={{ textTransform: 'uppercase', pointerEvents: 'none' } as React.CSSProperties}
                      >
                        {node.label}
                      </text>
                    );
                  })}
                </svg>
              </div>
              <p className="aam-section-lead aam-overview-caption" style={{ fontStyle: 'italic', marginTop: 16, opacity: 0.6, textAlign: 'left' }}>
                Click on icons to explore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Quote with Image */}
      <div
        className="parallax-panel aam-parallax-fixed"
        style={{ backgroundImage: `url(${HIGHWAY_AERIAL_IMG})` }}
      >
        <div className="aam-parallax-overlay" style={{ background: "rgba(19, 36, 58, 0.8)" }} />
        <p className="parallax-text1 reveal" style={{ position: 'relative', zIndex: 2 }}>
          Led by a team that helped shape early AAM guidance—<br className="parallax-break" />& <em>continues to support its evolution</em>
        </p>
      </div>

      {/* ── Value Delivery: Pillar Cards ── */}
      <section className="aam-section" id="value">
        <div className="aam-container">
          <div className="aam-section-header reveal">
            <p className="section-label"><span className="gold-text">Value Delivery</span></p>
            <h2 className="section-title">Where we lead <em>implementation</em> in AAM and UAS</h2>
            <button
              className={`intro-expand-btn${valueOpen ? " expanded" : ""}`}
              aria-label="Learn more"
              onClick={() => setValueOpen(o => !o)}
            >
              <span className="intro-expand-icon">
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 1.5l7 7 7-7" />
                </svg>
              </span>
            </button>
            <div className={`intro-expandable${valueOpen ? " expanded" : ""}`}>
              <p className="aam-section-lead">
                Our team helped shape early AAM and UAS guidance and continues to support its evolution—working directly with transportation agencies and airports to turn strategy into deployable programs.
              </p>
            </div>
          </div>
          <div className="aam-pillars-grid">
            {pillarCards.map((card, i) => (
              <div className={`aam-pillar-card${openPillars.has(i) ? " open" : ""}`} key={card.title}>
                <div className="aam-pillar-img-wrap">
                  <Image src={card.img} alt={card.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="aam-pillar-img" style={card.imgPos ? { objectPosition: card.imgPos } : undefined} />
                  <div className="aam-pillar-img-overlay" />
                </div>
                <div className="aam-pillar-bar" />
                <div className="aam-pillar-inner">
                  <div className="aam-pillar-title-row">
                    <h3 className="aam-pillar-title">{card.title}</h3>
                    <button className="aam-expand-btn" onClick={() => toggleSet(setOpenPillars, i)}>
                      {chevronSvg(openPillars.has(i))}
                    </button>
                  </div>
                  {card.desc && <p className="aam-pillar-desc">{card.desc}</p>}
                  <div className={`aam-pillar-expand${openPillars.has(i) ? " open" : ""}`}>
                    <ul className="aam-bullet-list">
                      {card.bullets.map((b) => <li key={b}>{b}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Interactive Stakeholder Ecosystem ── */}
      <section className="aam-section aam-ecosystem-section" id="stakeholders">
        <div className="aam-container">
          <div className="eco-layout">
            {/* Left: text */}
            <div className="eco-layout-text">
              <div className="aam-section-header reveal">
                <p className="section-label"><span className="gold-text">Bridging Silos</span></p>
                <h2 className="section-title">Connecting partners across the transportation <em>ecosystem</em></h2>
                <p className="aam-section-lead" style={{ marginTop: '20px' }}>
                  We reside at the center of the transportation ecosystem, connecting public and private partners across both surface and air transportation to turn strategy into efficient, operational, and coordinated action.
                </p>
                <p className="aam-section-lead eco-click-hint-mobile" style={{ fontStyle: 'italic' }}>
                  Click any stakeholder to learn more.
                </p>
              </div>
            </div>

            {/* Right: interactive visualization */}
            <div className="eco-layout-vis">
              <p className="aam-section-lead eco-click-hint-desktop" style={{ fontStyle: 'italic', textAlign: 'center', marginBottom: '16px' }}>
                Click any stakeholder to learn more.
              </p>
              <div className="eco-vis-wrapper">
                <svg className="eco-svg" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
                      <feFlood floodColor="#c9a84c" floodOpacity="0.4" result="color" />
                      <feComposite in="color" in2="blur" operator="in" result="shadow" />
                      <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="goldGlowStrong" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="12" result="blur" />
                      <feFlood floodColor="#c9a84c" floodOpacity="0.6" result="color" />
                      <feComposite in="color" in2="blur" operator="in" result="shadow" />
                      <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.1" />
                      <stop offset="50%" stopColor="#c9a84c" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.1" />
                    </linearGradient>
                    <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.25" />
                      <stop offset="60%" stopColor="#c9a84c" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="titleGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#c9a84c" />
                      <stop offset="50%" stopColor="#e8d5a0" />
                      <stop offset="100%" stopColor="#c9a84c" />
                    </linearGradient>
                    <style>{`
                      .eco-connection { stroke-dasharray: 6 8; animation: ecoDash 25s linear infinite; }
                      .eco-connection-active { stroke-dasharray: 4 4; animation: ecoDash 8s linear infinite; stroke-width: 2; }
                      @keyframes ecoDash { to { stroke-dashoffset: -200; } }
                      .eco-orbit-ring { animation: ecoOrbitPulse 6s ease-in-out infinite; }
                      .eco-orbit-ring-2 { animation: ecoOrbitPulse 6s ease-in-out infinite 2s; }
                      .eco-orbit-ring-3 { animation: ecoOrbitPulse 6s ease-in-out infinite 4s; }
                      @keyframes ecoOrbitPulse { 0%,100% { opacity: 0.15; } 50% { opacity: 0.35; } }
                      .eco-center-pulse { animation: ecoCenterPulse 3s ease-in-out infinite; }
                      @keyframes ecoCenterPulse { 0%,100% { r: 52; opacity: 0.2; } 50% { r: 58; opacity: 0.35; } }
                      .eco-node-glow { animation: ecoNodeGlow 4s ease-in-out infinite; }
                      @keyframes ecoNodeGlow { 0%,100% { opacity: 0.3; } 50% { opacity: 0.6; } }
                      .eco-data-particle { animation: ecoParticle 4s linear infinite; opacity: 0; }
                      @keyframes ecoParticle { 0% { opacity: 0; } 10% { opacity: 0.8; } 90% { opacity: 0.8; } 100% { opacity: 0; } }
                    `}</style>
                  </defs>

                  {/* Background grid */}
                  <g opacity="0.04">
                    {Array.from({ length: 17 }, (_, i) => (
                      <React.Fragment key={`grid-${i}`}>
                        <line x1={i * 50} y1="0" x2={i * 50} y2="800" stroke="#c9a84c" strokeWidth="0.5" />
                        <line x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="#c9a84c" strokeWidth="0.5" />
                      </React.Fragment>
                    ))}
                  </g>

                  {/* Orbital rings */}
                  <circle cx="400" cy="400" r="200" fill="none" stroke="#c9a84c" strokeWidth="0.5" className="eco-orbit-ring" />
                  <circle cx="400" cy="400" r="270" fill="none" stroke="#c9a84c" strokeWidth="0.5" className="eco-orbit-ring-2" />
                  <circle cx="400" cy="400" r="340" fill="none" stroke="#c9a84c" strokeWidth="0.3" className="eco-orbit-ring-3" />

                  {/* Connection lines */}
                  {ecosystemNodes.map((node) => {
                    const rad = (node.angle * Math.PI) / 180;
                    const nx = 400 + Math.cos(rad) * 280;
                    const ny = 400 + Math.sin(rad) * 280;
                    const isActive = activeNode === node.id || hoveredNode === node.id;
                    return (
                      <line key={`line-${node.id}`} x1="400" y1="400" x2={nx} y2={ny} stroke="#c9a84c" strokeWidth={isActive ? 2 : 1} className={isActive ? "eco-connection-active" : "eco-connection"} opacity={isActive ? 0.8 : 0.2} />
                    );
                  })}

                  {/* Cross-connections */}
                  {ecosystemNodes.map((node, i) => {
                    const next = ecosystemNodes[(i + 1) % ecosystemNodes.length];
                    const rad1 = (node.angle * Math.PI) / 180;
                    const rad2 = (next.angle * Math.PI) / 180;
                    return (
                      <line key={`cross-${i}`} x1={400 + Math.cos(rad1) * 280} y1={400 + Math.sin(rad1) * 280} x2={400 + Math.cos(rad2) * 280} y2={400 + Math.sin(rad2) * 280} stroke="#c9a84c" strokeWidth="0.5" className="eco-connection" opacity="0.08" />
                    );
                  })}

                  {/* Center glow */}
                  <circle cx="400" cy="400" r="100" fill="url(#centerGrad)" />
                  <circle cx="400" cy="400" r="68" fill="none" stroke="#c9a84c" strokeWidth="0.8" className="eco-center-pulse" opacity="0.2" />

                  {/* Center hub — white with dark navy stroke + black text. */}
                  <circle cx="400" cy="400" r="80" fill="#fff" stroke="#1A3251" strokeWidth="1.5" />
                  <text x="400" y="390" textAnchor="middle" fill="#000" fontFamily="'DM Sans', sans-serif" fontSize="16" fontWeight="800" letterSpacing="4" style={{ textTransform: 'uppercase' }}>RAWLINS</text>
                  <text x="400" y="412" textAnchor="middle" fill="#000" fontFamily="'DM Sans', sans-serif" fontSize="14" fontWeight="700" letterSpacing="3" style={{ textTransform: 'uppercase' }}>AERO TEAM</text>

                  {/* Stakeholder nodes */}
                  {ecosystemNodes.map((node) => {
                    const rad = (node.angle * Math.PI) / 180;
                    const nx = 400 + Math.cos(rad) * 280;
                    const ny = 400 + Math.sin(rad) * 280;
                    const isActive = activeNode === node.id;
                    const isHovered = hoveredNode === node.id;
                    const highlighted = isActive || isHovered;
                    const iconPath = ecoIcons[node.id] || '';
                    const iconSize = isMobile ? (highlighted ? 80 : 72) : (highlighted ? 56 : 48);

                    return (
                      <g key={node.id} style={{ cursor: 'none' }} onClick={() => setActiveNode(activeNode === node.id ? null : node.id)} onMouseEnter={() => setHoveredNode(node.id)} onMouseLeave={() => setHoveredNode(null)}>
                        <circle cx={nx} cy={ny} r="65" fill="transparent" />
                        <g transform={`translate(${nx - iconSize / 2}, ${ny - iconSize / 2})`} style={{ transition: 'all 0.3s' }}>
                          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24">
                            <path d={iconPath} fill="url(#titleGoldGrad)" opacity={1} style={{ filter: highlighted ? 'drop-shadow(0 0 10px rgba(201,168,76,0.6))' : 'none' }} />
                          </svg>
                        </g>
                        {node.label.split('\n').map((line, li) => (
                          <text key={li} x={nx} y={ny + (isMobile ? (highlighted ? 70 : 64) : (highlighted ? 42 : 36)) + li * (isMobile ? 28 : 20)} textAnchor="middle" fill="#fff" fontFamily="'DM Sans', sans-serif" fontSize={isMobile ? "22" : "16"} fontWeight={highlighted ? "600" : "500"} letterSpacing="1.5" style={{ textTransform: 'uppercase', transition: 'all 0.3s' }}>
                            {line}
                          </text>
                        ))}
                      </g>
                    );
                  })}

                  {/* Particles — outbound */}
                  {ecosystemNodes.map((node, i) => (
                    <circle key={`particle-out-${i}`} r="2" fill="#c9a84c" className="eco-data-particle" style={{ animationDelay: `${i * 0.5}s` }}>
                      <animateMotion dur={`${3 + i * 0.3}s`} repeatCount="indefinite"><mpath href={`#path-out-${i}`} /></animateMotion>
                    </circle>
                  ))}
                  {/* Particles — inbound */}
                  {ecosystemNodes.map((node, i) => (
                    <circle key={`particle-in-${i}`} r="2" fill="#c9a84c" className="eco-data-particle" style={{ animationDelay: `${i * 0.5 + 1.5}s` }}>
                      <animateMotion dur={`${3 + i * 0.3}s`} repeatCount="indefinite"><mpath href={`#path-in-${i}`} /></animateMotion>
                    </circle>
                  ))}
                  {/* Paths — outbound */}
                  {ecosystemNodes.map((node, i) => {
                    const rad = (node.angle * Math.PI) / 180;
                    const sx = 400 + Math.cos(rad) * 85;
                    const sy = 400 + Math.sin(rad) * 85;
                    const nx = 400 + Math.cos(rad) * 250;
                    const ny = 400 + Math.sin(rad) * 250;
                    return <path key={`path-out-${i}`} id={`path-out-${i}`} d={`M${sx},${sy} L${nx},${ny}`} fill="none" stroke="none" />;
                  })}
                  {/* Paths — inbound */}
                  {ecosystemNodes.map((node, i) => {
                    const rad = (node.angle * Math.PI) / 180;
                    const sx = 400 + Math.cos(rad) * 85;
                    const sy = 400 + Math.sin(rad) * 85;
                    const nx = 400 + Math.cos(rad) * 250;
                    const ny = 400 + Math.sin(rad) * 250;
                    return <path key={`path-in-${i}`} id={`path-in-${i}`} d={`M${nx},${ny} L${sx},${sy}`} fill="none" stroke="none" />;
                  })}
                </svg>

                {/* Detail panel — click-only (hover proved unreliable
                    across SVG quirks; tapping is the canonical
                    interaction). */}
                {activeNode && (() => {
                  const node = ecosystemNodes.find(n => n.id === activeNode);
                  if (!node) return null;
                  const rad = (node.angle * Math.PI) / 180;
                  const cosA = Math.cos(rad);
                  const sinA = Math.sin(rad);
                  const rawX = 50 + cosA * 30;
                  const rawY = 50 + sinA * 30;
                  const clampX = Math.max(5, Math.min(95, rawX));
                  const clampY = Math.max(5, Math.min(70, rawY));
                  return (
                    <div className="eco-detail-panel" style={{ left: `${clampX}%`, top: `${clampY}%`, transform: 'translate(-50%, -50%)' }}>
                      <div className="eco-detail-header">
                        <div>
                          <h4 className="eco-detail-title">{node.label.replace('\n', ' ')}</h4>
                          <p className="eco-detail-short">{node.short}</p>
                        </div>
                        <button className="eco-detail-close" onClick={() => setActiveNode(null)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>
                      </div>
                      <p className="eco-detail-desc">{node.desc}</p>
                    </div>
                  );
                })()}

                {/* Click-outside overlay */}
                {activeNode && (
                  <div className="eco-click-outside" onClick={() => setActiveNode(null)} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* Parallax Quote 2 */}
      <div
        className="parallax-panel aam-parallax-fixed"
        style={{ backgroundImage: `url(${SKYLINE_IMG})` }}
      >
        <div className="aam-parallax-overlay" style={{ background: "rgba(19, 36, 58, 0.8)" }} />
        <p className="parallax-text1 reveal" style={{ position: 'relative', zIndex: 2 }}>
          <em>Leading</em> the integration of multimodal solutions into<br className="parallax-break" /> <em>next-generation</em> transportation networks
        </p>
      </div>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Strategic Methodology: Define / Enable / Deliver ── */}
      <section className="aam-section" id="methodology">
        <div className="aam-container">
          <div className="aam-section-header reveal">
            <h2 className="section-title">Our <em>approach</em></h2>
            <p className="section-text" style={{ marginTop: "20px", maxWidth: "750px" }}>
              From early guidance to operational deployment, we help agencies define, enable, and deliver AAM and UAS programs.
            </p>
          </div>
          <div className="aam-framework-grid">
            {frameworkCards.map((card, i) => (
              <div className={`aam-framework-card${openFrameworks.has(i) ? " open" : ""}`} key={card.title}>
                <div className="aam-framework-img-wrap">
                  <Image src={card.img} alt={card.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="aam-framework-img" style={card.imgPos ? { objectPosition: card.imgPos } : undefined} />
                  <div className="aam-framework-img-overlay" />
                </div>
                <div className="aam-framework-accent" style={{ background: card.accent }} />
                <div className="aam-framework-inner">
                  <div className="aam-pillar-title-row">
                    <h3 className="aam-framework-phase">{card.title}</h3>
                    <button className="aam-expand-btn" onClick={() => toggleSet(setOpenFrameworks, i)}>
                      {chevronSvg(openFrameworks.has(i))}
                    </button>
                  </div>
                  <p className="aam-framework-tagline">{card.tagline}</p>
                  <div className={`aam-framework-expand${openFrameworks.has(i) ? " open" : ""}`}>
                    <ul className="aam-bullet-list">
                      {card.bullets.map((b) => <li key={b}>{b}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── How we serve: pinned horizontal scroll ── */}
      <section className="aam-section aam-phases-alt-section" id="phases-alt">
        <div className="ei-pin" ref={phasesPinRef}>
          <div className="ei-sticky">
            <div className="aam-container">
              <div className="aam-section-header reveal">
                <p className="section-label"><span className="gold-text">how we serve our clients</span></p>
                <h2 className="section-title">We support the full program <em>lifecycle</em></h2>
                <p className="section-text" style={{ marginTop: "20px" }}>
                  Our team brings together regulatory guidance, operational expertise, and program strategy to deliver real-world results. We support AAM and UAS initiatives throughout the program lifecycle.
                </p>
              </div>
            </div>
            <div className="story-scroll-controls">
              <div className="story-scroll-progress-bar">
                <div className="story-scroll-progress-fill" style={{ width: `${phasesProgress * 100}%` }} />
              </div>
              <div className="story-scroll-arrows">
                <button className="story-arrow-btn" onClick={phasesScrollPrev} aria-label="Previous phase">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button className="story-arrow-btn" onClick={phasesScrollNext} aria-label="Next phase">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </div>
            </div>
            <div className="aam-alt-scroll-outer ei-viewport" ref={phasesViewportRef}>
              <div className="aam-alt-scroll-track" ref={phasesTrackRef}>
                {phaseData.map((phase, i) => (
              <div className={`aam-alt-card${activePhase === i ? " active" : ""}`} key={phase.num} onClick={() => setActivePhase(prev => (prev === i ? null : i))}>
                <Image src={phase.img} alt={phase.label} fill sizes="(max-width: 768px) 80vw, 400px" className="aam-alt-card-bg" />
                <div className="aam-alt-card-overlay" />
                <h4 className="aam-alt-card-title">{phase.label}</h4>
                <button className="card-expand-btn aam-phase-expand-btn" aria-label="Expand description" aria-expanded={activePhase === i} onClick={(e) => { e.stopPropagation(); setActivePhase(prev => (prev === i ? null : i)); }}>
                  <svg width="14" height="8" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5l7 7 7-7" /></svg>
                </button>
                <p className="aam-alt-card-body">{phase.body}</p>
              </div>
            ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── Service Portfolio ── */}
      <section className="aam-section aam-portfolio-section" id="portfolio">
        <div className="aam-container">
          <div className="aam-section-header reveal">
            <p className="section-label"><span className="gold-text">Program Development</span></p>
            <h2 className="section-title">Our service <em>portfolio</em></h2>
            <button
              className={`intro-expand-btn${portfolioOpen ? " expanded" : ""}`}
              aria-label="Learn more"
              onClick={() => setPortfolioOpen(o => !o)}
            >
              <span className="intro-expand-icon">
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 1.5l7 7 7-7" />
                </svg>
              </span>
            </button>
            <div className={`intro-expandable${portfolioOpen ? " expanded" : ""}`}>
              <p className="aam-section-lead">
                Our team serves as a trusted partner and extension of your team, collaborating to support the planning, integration, and execution of UAS and AAM programs. We work alongside your organization, bringing practical experience across policy, operations, and implementation, to help move from concept to scalable, defensible programs. Our role is to align technology, stakeholders, and infrastructure with regulations so you can deliver safe and reliable aviation outcomes.
              </p>
            </div>
          </div>
          <div className="aam-pillars-grid aam-portfolio-tiles">
            {[
              { title: "AAM Services", img: DRONEMOUNTAINS_IMG, items: aamServices, idx: 0, imgPos: "center 35%" },
              { title: "UAS Services", img: PLANNING2_IMG, items: uasServices, idx: 1, imgPos: "center 20%" },
            ].map((svc) => (
              <div className={`aam-pillar-card${openServices.has(svc.idx) ? " open" : ""}`} key={svc.title}>
                <div className="aam-pillar-img-wrap">
                  <Image src={svc.img} alt={svc.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="aam-pillar-img" style={{ objectPosition: svc.imgPos }} />
                  <div className="aam-pillar-img-overlay" />
                </div>
                <div className="aam-pillar-bar" />
                <div className="aam-pillar-inner">
                  <div className="aam-pillar-title-row">
                    <h3 className="aam-pillar-title">{svc.title}</h3>
                    <button className="aam-expand-btn" onClick={() => toggleSet(setOpenServices, svc.idx)}>
                      {chevronSvg(openServices.has(svc.idx))}
                    </button>
                  </div>
                  <div className={`aam-pillar-expand${openServices.has(svc.idx) ? " open" : ""}`}>
                    <ul className="aam-bullet-list">
                      {svc.items.map((s) => <li key={s}>{s}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      {/* ── CTA ── */}
      <section
        className="aam-section aam-cta-section aam-parallax-fixed"
        style={{ backgroundImage: `url(${HELICOPTER_IMG})` }}
      >
        <Image src={HELICOPTER_IMG} alt="" fill priority sizes="100vw" className="aam-cta-bg-img" />
        <div className="aam-cta-overlay" style={{ background: "rgba(19, 36, 58, 0.8)" }} />
        <div className="aam-container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="aam-cta-wrap reveal" style={{ textAlign: "center", margin: "0 auto" }}>
            <p className="section-label"><span className="gold-text">Get Started</span></p>
            <h2 className="section-title">Ready to <em>take off?</em></h2>
            <p className="aam-cta-body">
              Whether you are just beginning or well along on your journey, we can provide guidance and support. To learn more about our service portfolio and how we can help you deliver successful AAM and UAS outcomes for your program, reach out.
            </p>
            <Link href="/contact" className="auto-hero-btn" style={{ marginTop: "20px", opacity: 1, transform: "none", animation: "none" }}>
              <span>Start a Conversation</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>

      <SiteFooter />
    </>
  );
};

export default AAMPage;
