"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

interface FormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  interest: string;
  message: string;
}

/* Public site key for Google reCAPTCHA v3. Set NEXT_PUBLIC_RECAPTCHA_SITE_KEY
   in the environment to enable; falls back to honeypot-only protection if unset. */
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    organization: "",
    interest: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  /* When the form transitions to the success state, scroll the success
     panel into view. On mobile the success state is shorter than the
     form so the page collapses upward and the message can end up out
     of view. */
  useEffect(() => {
    if (submitted && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [submitted]);

  /* Load reCAPTCHA v3 script if a site key is configured */
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;
    if (document.querySelector("script[data-recaptcha]")) return;
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    s.async = true;
    s.defer = true;
    s.setAttribute("data-recaptcha", "1");
    document.head.appendChild(s);
  }, []);
  // Cursor refs
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

    const hoverEls = document.querySelectorAll(
      "a, button, .nav-item, .back-to-top, .contact-detail-item"
    );
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

    return () => {
      container.innerHTML = "";
    };
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

  // Scroll reveal
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let recaptchaToken: string | undefined;
      if (RECAPTCHA_SITE_KEY && typeof window !== "undefined" && window.grecaptcha) {
        try {
          recaptchaToken = await new Promise<string>((resolve, reject) => {
            window.grecaptcha!.ready(async () => {
              try {
                const token = await window.grecaptcha!.execute(RECAPTCHA_SITE_KEY!, { action: "contact" });
                resolve(token);
              } catch (err) {
                reject(err);
              }
            });
          });
        } catch (err) {
          console.error("reCAPTCHA execution error:", err);
        }
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, honeypot, recaptchaToken }),
      });
      if (!res.ok) {
        let serverMessage = `HTTP ${res.status}`;
        try {
          const data = await res.json();
          if (data && data.error) serverMessage = data.error;
        } catch {}
        throw new Error(serverMessage);
      }
      setSubmitted(true);
    } catch (err) {
      console.error("Form submission error:", err);
      const detail = err instanceof Error ? err.message : "Unknown error";
      alert(
        `Something went wrong sending your message.\n\n${detail}\n\nPlease try again, or email us directly at info@rawlinsic.com.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({ name: "", email: "", phone: "", organization: "", interest: "", message: "" });
  };

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

      <SiteNav ctaHref="#contact-form" />

      <div className="content-wrapper">

        {/* ── Contact Hero ── */}
        <section className="cs-hero" id="top">
          <div className="cs-hero-content">
            <span className="hero-label"><span className="gold-text">Contact Rawlins</span></span>
            <h1 className="hero-title">
              Ready to <em>partner</em> with <em>purpose?</em>
            </h1>
            <p className="hero-sub cs-hero-sub">
              Whether you&rsquo;re ready to engage or simply exploring what&rsquo;s
              possible, we&rsquo;d love to hear from you.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider">
          <div className="gold-line" />
        </div>

        {/* ── Contact Section ── */}
        <section className="section-contact" id="contact-form">
          <div className="contact-wrapper">
            {/* Left: Contact Information */}
            <div className="contact-info reveal">
              <p className="section-label">
                <span className="gold-text">Get In Touch</span>
              </p>
              <h2 className="section-title">
                Send us a <em>message</em>
              </h2>
              <p className="section-text" style={{ marginTop: "20px", marginBottom: "48px" }}>
                Our team is here to listen, advise, and partner with you. Share a
                bit about your organization and what you&rsquo;re working through
                &mdash; we&rsquo;ll take it from there.
              </p>

              <div className="contact-details">
                <div className="contact-detail-item reveal rd1">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <div className="contact-detail-label">Email Us</div>
                    <a
                      href="mailto:info@rawlinsic.com"
                      className="contact-detail-value"
                    >
                      info@rawlinsic.com
                    </a>
                  </div>
                </div>

                <div className="contact-detail-item reveal rd2">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div className="contact-detail-label">Call Us</div>
                    <a
                      href="tel:+17758433822"
                      className="contact-detail-value"
                    >
                      (775) 843-3822
                    </a>
                  </div>
                </div>

                <div className="contact-detail-item reveal rd3">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                  <div>
                    <div className="contact-detail-label">Connect</div>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-detail-value"
                    >
                      LinkedIn &rarr;
                    </a>
                  </div>
                </div>

                <div className="contact-detail-item reveal rd3">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                  </div>
                  <div>
                    <div className="contact-detail-label">Location</div>
                    <address style={{ fontStyle: "normal" }}>
                      <a
                        href="https://maps.app.goo.gl/uArEsHPDmyhLG9rp7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-detail-value"
                        aria-label="Open Rawlins Infra Consult office location in Google Maps"
                      >
                        500 Damonte Ranch Parkway #980<br />
                        Reno, NV 89521, USA
                      </a>
                      <div style={{ opacity: 0.75, marginTop: 4 }}>Serving Clients Worldwide</div>
                    </address>
                  </div>
                </div>
              </div>

              <div className="contact-divider" />

        
            </div>

            {/* Right: Contact Form */}
            <div className="contact-form-wrap reveal rd2">
              {!submitted ? (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  {/* Honeypot: hidden from real users, bots fill it in */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      width: "1px",
                      height: "1px",
                      overflow: "hidden",
                    }}
                  >
                    <label htmlFor="company-website">Company Website</label>
                    <input
                      id="company-website"
                      name="company-website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">
                        Full Name <span className="form-required">*</span>
                      </label>
                      <input
                        className="form-input"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">
                        Email Address <span className="form-required">*</span>
                      </label>
                      <input
                        className="form-input"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="organization">
                        Organization/Agency <span className="form-required">*</span>
                      </label>
                      <input
                        className="form-input"
                        id="organization"
                        name="organization"
                        type="text"
                        placeholder="Your organization or agency"
                        value={formData.organization}
                        onChange={handleChange}
                        required
                        autoComplete="organization"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">
                        Phone <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: "normal" }}>(optional)</span>
                      </label>
                      <input
                        className="form-input"
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(000) 000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="interest">
                      Area of Interest <span className="form-required">*</span>
                    </label>
                    <input
                      className="form-input"
                      id="interest"
                      name="interest"
                      type="text"
                      placeholder="e.g., Strategy, Operations, Technology, General Inquiry"
                      value={formData.interest}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">
                      Message <span className="form-required">*</span>
                    </label>
                    <textarea
                      className="form-input form-textarea"
                      id="message"
                      name="message"
                      placeholder="Tell us about your organization and what you're working through..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                    />
                  </div>

                  <button
                    type="submit"
                    className="form-submit"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span className="form-submit-inner">
                        <span className="form-spinner" />
                        <span>Sending&hellip;</span>
                      </span>
                    ) : (
                      <span className="form-submit-inner">
                        <span>Send Message</span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    )}
                  </button>

                  {RECAPTCHA_SITE_KEY && (
                    <p className="form-recaptcha-notice">
                      This site is protected by reCAPTCHA and the Google{" "}
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
                        Terms of Service
                      </a>{" "}
                      apply.
                    </p>
                  )}
                </form>
              ) : (
                <div className="form-success" ref={successRef}>
                  <div className="form-success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="form-success-title">Message Received</h3>
                  <p className="form-success-text">
                    Thank you for reaching out. A member of our team will be in
                    touch as soon as possible.
                  </p>
                  <button className="form-success-reset" onClick={resetForm}>
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider">
          <div className="gold-line" />
        </div>
      </div>

 

      {/* Divider */}
      <div className="section-divider">
        <div className="gold-line" />
      </div>

      <SiteFooter />
    </>
  );
}
