"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import { THOUGHT_LEADERSHIP } from "@/components/thought-leadership-data";


export default function ThoughtLeadershipOverview() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const animFrame = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [heroParaExpanded, setHeroParaExpanded] = useState(false);

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
    const hoverEls = document.querySelectorAll("a, button, .nav-item, .back-to-top, .tl-card");
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

  /* ── Carousel scroll state ── */
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector(".tl-card")?.clientWidth || 400;
    el.scrollBy({ left: dir === "left" ? -cardWidth - 28 : cardWidth + 28, behavior: "smooth" });
  };

  const articles = THOUGHT_LEADERSHIP;

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
                <span className="hero-label-segment">Expert Perspectives&nbsp;&bull;</span>{" "}
                <span className="hero-label-segment">Practical Insights</span>
              </span>
            </span>
            <h1 className="hero-title">Thought Leadership</h1>
            <div className={`tl-hero-para-wrap${heroParaExpanded ? " expanded" : ""}`}>
              <p className="hero-sub cs-hero-sub tl-hero-para">
                At Rawlins, our thought leadership reflects deep experience advising organizations on complex challenges and change. We share practical insights and perspectives to support informed decision-making and progress. Additional insights will be shared over time.
              </p>
              <button
                type="button"
                className="tl-hero-para-toggle"
                aria-label={heroParaExpanded ? "Collapse" : "Expand"}
                aria-expanded={heroParaExpanded}
                onClick={() => setHeroParaExpanded((v) => !v)}
              >
                <svg width="14" height="8" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 1.5l7 7 7-7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider">
          <div className="gold-line" />
        </div>

        {/* ── Featured Article ── */}
        <section className="tl-featured-section reveal">
          <div className="tl-featured">
            <div className="tl-featured-media">
              <div className="tl-featured-badge">
                <span>Latest</span>
              </div>
              <Link
                href={`/insights/thought-leadership/${articles[0].slug}`}
                className="tl-featured-img-wrap"
                style={
                  articles[0].imageWidth && articles[0].imageHeight
                    ? {
                        aspectRatio: `${articles[0].imageWidth} / ${articles[0].imageHeight}`,
                      }
                    : undefined
                }
              >
                <Image
                  src={articles[0].image}
                  alt={articles[0].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="tl-featured-img"
                  style={{ objectFit: "contain" }}
                />
                <div className="tl-featured-img-overlay" />
              </Link>
            </div>
            <div className="tl-featured-text">
              <div className="tl-featured-meta">
                <span className="tl-tag">{articles[0].category}</span>
                <span className="tl-date">{articles[0].dateLabel}</span>
              </div>
              <h2 className="tl-featured-title">
                <Link href={`/insights/thought-leadership/${articles[0].slug}`}>
                  {articles[0].title}
                </Link>
              </h2>
              <div className="tl-featured-author-row">
                {articles[0].authorImage && (
                  <Image
                    src={articles[0].authorImage}
                    alt={articles[0].author}
                    width={44}
                    height={44}
                    className="tl-author-avatar"
                  />
                )}
                <div>
                  <span className="tl-author-name">{articles[0].author}</span>
                  <span className="tl-author-role">{articles[0].authorRole}</span>
                </div>
              </div>
              <Link href={`/insights/thought-leadership/${articles[0].slug}`} className="cs-cta-btn" style={{ marginTop: 28, width: 'fit-content' }}>
                <span>Read Article</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider">
          <div className="gold-line" />
        </div>

        {/* ── Article Grid / Carousel ── */}
        <section className="tl-carousel-section">
          <div className="tl-carousel-header reveal">
            <h2 className="tl-section-title">All Articles</h2>
            <div className="tl-carousel-arrows">
              <button
                className={`tl-arrow${!canScrollLeft ? " disabled" : ""}`}
                onClick={() => scroll("left")}
                aria-label="Scroll left"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className={`tl-arrow${!canScrollRight ? " disabled" : ""}`}
                onClick={() => scroll("right")}
                aria-label="Scroll right"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="tl-carousel-track" ref={scrollRef}>
            {articles.map((article, i) => (
              <Link
                key={article.slug}
                href={`/insights/thought-leadership/${article.slug}`}
                className={`tl-card reveal rd${(i % 4) + 1}`}
              >
                <div
                  className="tl-card-img-wrap"
                  style={
                    article.imageWidth && article.imageHeight
                      ? { aspectRatio: `${article.imageWidth} / ${article.imageHeight}` }
                      : undefined
                  }
                >
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 85vw, (max-width: 1100px) 45vw, 380px"
                    className="tl-card-img"
                    style={{ objectFit: "contain" }}
                  />
                  <div className="tl-card-img-overlay" />
                </div>
                <div className="tl-card-body">
                  <div className="tl-card-meta">
                    <span className="tl-tag">{article.category}</span>
                    <span className="tl-date">{article.dateLabel}</span>
                  </div>
                  <h3 className="tl-card-title">{article.title}</h3>
                  <div className="tl-card-footer">
                    <span className="tl-card-author">{article.author}</span>
                    <span className="tl-card-read-more">
                      Read More
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>

      <SiteFooter />
    </>
  );
}
