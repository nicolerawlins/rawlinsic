"use client";

import { useEffect, useRef } from "react";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

export default function AccessibilityPage() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);

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
    const nav = document.getElementById("mainNav");
    const onScroll = () => {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 60);
      const backToTop = document.getElementById("backToTop");
      if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const h2Style = { fontSize: 28, fontWeight: 600, color: "#fff", marginBottom: 14, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" } as const;

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
      <div className="ambient-bg" />
      <SiteNav />

      <section style={{ padding: "180px 48px 100px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <span className="hero-label"><span className="gold-text">Commitment</span></span>
        <h1 className="hero-title" style={{ marginBottom: 40 }}>Accessibility Statement</h1>

        <div style={{ color: "#fff", fontSize: 15, fontWeight: 500, lineHeight: 1.9, display: "flex", flexDirection: "column", gap: 32 }}>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, fontWeight: 500 }}>Last updated: April 9, 2026</p>

          <div>
            <h2 style={h2Style}>Our Commitment</h2>
            <p>Rawlins Infra Consult, LLC is committed to ensuring that our website is accessible to all users, including individuals with disabilities. We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, as recommended by the World Wide Web Consortium (W3C).</p>
          </div>

          <div>
            <h2 style={h2Style}>Accessibility Features</h2>
            <p>We have implemented the following measures to support accessibility on our website:</p>
            <ul style={{ paddingLeft: 24, marginTop: 8 }}>
              <li>Semantic HTML structure for screen reader compatibility</li>
              <li>Keyboard-navigable interactive elements</li>
              <li>Focus indicators for keyboard navigation</li>
              <li>Alt text descriptions for meaningful images</li>
              <li>Sufficient color contrast ratios for text content</li>
              <li>Responsive design that adapts to different screen sizes and zoom levels</li>
              <li>Support for reduced motion preferences</li>
              <li>ARIA attributes on interactive components</li>
              <li>Skip-to-content navigation for keyboard users</li>
            </ul>
          </div>

          <div>
            <h2 style={h2Style}>Conformance Status</h2>
            <p>We aim to conform to WCAG 2.1 Level AA. We regularly review and test our website to identify and address accessibility barriers. While we strive for full conformance, some content may not yet fully meet all standards. We are actively working to improve accessibility across our entire site.</p>
          </div>

          <div>
            <h2 style={h2Style}>Assistive Technology Compatibility</h2>
            <p>Our website is designed to be compatible with the following assistive technologies:</p>
            <ul style={{ paddingLeft: 24, marginTop: 8 }}>
              <li>Screen readers (including JAWS, NVDA, and VoiceOver)</li>
              <li>Screen magnification software</li>
              <li>Speech recognition software</li>
              <li>Keyboard-only navigation</li>
            </ul>
          </div>

          <div>
            <h2 style={h2Style}>Known Limitations</h2>
            <p>Despite our best efforts, some areas of our website may have accessibility limitations. These include:</p>
            <ul style={{ paddingLeft: 24, marginTop: 8 }}>
              <li>Some third-party content or embedded media may not fully conform to accessibility standards</li>
              <li>Certain interactive visualizations may have limited screen reader support</li>
              <li>Older PDF documents may not be fully accessible</li>
            </ul>
            <p style={{ marginTop: 12 }}>We are working to address these limitations and improve the overall accessibility of our content.</p>
          </div>

          <div>
            <h2 style={h2Style}>Feedback and Contact</h2>
            <p>We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers or have suggestions for improvement, please contact us:</p>
            <p style={{ marginTop: 12 }}>
              <strong style={{ color: "#fff" }}>Rawlins Infra Consult, LLC</strong><br />
              Email: <a href="mailto:info@rawlinsic.com" style={{ color: "#fff" }}>info@rawlinsic.com</a><br />
              Phone: <a href="tel:+17758433822" style={{ color: "#fff" }}>(775) 843-3822</a><br />
              Website: <span style={{ color: "#fff" }}>rawlinsic.com</span>
            </p>
            <p style={{ marginTop: 12 }}>We will make reasonable efforts to respond to your feedback within 5 business days and to address any accessibility concerns.</p>
          </div>

          <div>
            <h2 style={h2Style}>Enforcement Procedures</h2>
            <p>If you are not satisfied with our response to your accessibility concern, you may file a complaint with the U.S. Department of Justice, Civil Rights Division, or your local disability rights organization.</p>
          </div>
        </div>
      </section>

      <a href="#top" className="back-to-top" id="backToTop" aria-label="Back to top">
        <svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      </a>
      <div className="section-divider"><div className="gold-line" /></div>
      <SiteFooter />
    </>
  );
}
