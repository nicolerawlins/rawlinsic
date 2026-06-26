"use client";

import { useEffect, useRef, useState } from "react";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

interface FormState {
  name: string;
  email: string;
  location: string;
  message: string;
}

const ACCEPT_DOC = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const ALLOWED_DOC_EXT = /\.(pdf|doc|docx)$/i;

export default function ProposalWriterManagerPage() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const animFrame = useRef<number | null>(null);

  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    location: "",
    message: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [submitted]);

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

  /* Custom cursor */
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

  /* Micro particles */
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

  /* Nav scroll + back-to-top */
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

  /* Scroll reveal */
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
    return () => {
      cancelAnimationFrame(raf);
      if (observer) observer.disconnect();
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      alert("Please attach your resume.");
      return;
    }
    for (const f of [resumeFile, coverFile]) {
      if (f && !ALLOWED_DOC_EXT.test(f.name)) {
        alert(`"${f.name}" must be a PDF, DOC, or DOCX file.`);
        return;
      }
    }
    if (!consent) {
      alert("Please confirm consent to submit your application.");
      return;
    }
    setSubmitting(true);
    try {
      let recaptchaToken: string | undefined;
      if (RECAPTCHA_SITE_KEY && typeof window !== "undefined" && window.grecaptcha) {
        try {
          recaptchaToken = await new Promise<string>((resolve, reject) => {
            window.grecaptcha!.ready(async () => {
              try {
                const token = await window.grecaptcha!.execute(RECAPTCHA_SITE_KEY!, {
                  action: "careers",
                });
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

      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("location", formData.location);
      fd.append("message", formData.message);
      fd.append("role", "Proposal Writer/Manager");
      fd.append("consent", consent ? "true" : "false");
      fd.append("company-website", honeypot);
      if (recaptchaToken) fd.append("recaptchaToken", recaptchaToken);
      fd.append("resume", resumeFile);
      if (coverFile) fd.append("coverLetter", coverFile);

      const res = await fetch("/api/careers", { method: "POST", body: fd });
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
      console.error("Application submission error:", err);
      const detail = err instanceof Error ? err.message : "Unknown error";
      alert(
        `Something went wrong submitting your application.\n\n${detail}\n\nPlease try again, or email us directly at jobs@rawlinsic.com.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({ name: "", email: "", location: "", message: "" });
    setResumeFile(null);
    setCoverFile(null);
    setConsent(false);
  };

  /* Style helpers — match the visual rhythm of other content pages.
     Padding switches to a smaller value at <=768px via the
     `pwm-section` class (see <style jsx> below). */
  const sectionStyle: React.CSSProperties = {
    maxWidth: 1100,
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  };
  const sectionInner: React.CSSProperties = { padding: "60px 0" };
  const bodyText: React.CSSProperties = {
    color: "#fff",
    fontSize: 17,
    fontWeight: 400,
    lineHeight: 1.85,
  };
  const ulStyle: React.CSSProperties = {
    paddingLeft: 22,
    marginTop: 12,
    color: "#fff",
    fontSize: 17,
    lineHeight: 1.85,
    listStyle: "disc",
    listStylePosition: "outside",
    display: "block",
  };
  const liStyle: React.CSSProperties = {
    marginBottom: 10,
    color: "#fff",
  };
  const subHeadStyle: React.CSSProperties = {
    fontSize: 30,
    fontWeight: 600,
    color: "#fff",
    marginTop: 36,
    marginBottom: 12,
    fontFamily:
      "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
  };

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
      <div className="micro-particles" id="microParticles" />

      <a href="#top" className="back-to-top" id="backToTop" aria-label="Back to top">
        <svg viewBox="0 0 24 24">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </a>

      <SiteNav ctaHref="#apply" />

      <div className="content-wrapper">
        {/* ── Hero ── */}
        <section className="cs-hero" id="top">
          <div className="cs-hero-content">
            <span className="hero-label">
              <span className="gold-text">Open Opportunities</span>
            </span>
            <h1 className="hero-title">
              Proposal <em>Writer/Manager</em>
            </h1>
            <div className="pwm-pills">
              <span className="pwm-pill">Full-Time</span>
              <span className="pwm-pill">Remote</span>
              <span className="pwm-pill">US &amp; GCC preferred</span>
            </div>
            <p className="pwm-hero-tagline">
              Help Rawlins Infra Consult deliver impactful solutions through
              strategic proposal development.
            </p>
            <a
              href="#apply"
              className="auto-hero-btn"
              style={{
                opacity: 1,
                transform: "none",
                animation: "none",
                marginTop: "24px",
                marginBottom: "72px",
              }}
            >
              <span>Apply Now</span>
            </a>
          </div>
        </section>

        <div className="section-divider">
          <div className="gold-line" />
        </div>

        {/* ── About Rawlins Infra Consult ── */}
        <section className="pwm-section" style={sectionStyle}>
          <div style={sectionInner} className="reveal">
            <h2 className="section-title">
              About Rawlins <em>Infra Consult</em>
            </h2>
            <p style={{ ...bodyText, marginTop: 20 }}>
              Rawlins Infra Consult is a growing consulting firm with a global
              footprint specializing in providing strategic, operational, and
              technological solutions. We partner with public and private
              organizations to address complex challenges and drive impactful
              outcomes through tailored strategies rooted in innovation and
              collaboration. Our team brings an array of expertise, empowering
              clients to achieve their goals in an evolving landscape.
            </p>
          </div>
        </section>

        <div className="section-divider">
          <div className="gold-line" />
        </div>

        {/* ── Role Description ── */}
        <section className="pwm-section" style={sectionStyle}>
          <div style={sectionInner} className="reveal">
            <h2 className="section-title">
              Role <em>Description</em>
            </h2>
            <p style={{ ...bodyText, marginTop: 20 }}>
              We are seeking a strategic Proposal Writer to join our growing team
              at Rawlins Infra Consult. This role is critical to our business
              development efforts, responsible for crafting persuasive,
              high-quality proposals while coordinating with internal teams to
              ensure seamless proposal delivery. Candidates from US and GCC
              markets (particularly UAE, Saudi Arabia and Qatar) are preferred.
              This role supports both our core Rawlins business and our emerging
              RAID division, offering opportunities to grow with a dynamic,
              expanding organization.
            </p>
          </div>
        </section>

        <div className="section-divider">
          <div className="gold-line" />
        </div>

        {/* ── Key Responsibilities ── */}
        <section className="pwm-section" style={sectionStyle}>
          <div style={sectionInner} className="reveal">
            <h2 className="section-title">
              Key <em>Responsibilities</em>
            </h2>
            <ul style={{ ...ulStyle, marginTop: 20 }}>
              <li style={liStyle}>
                <strong style={{ color: "#fff" }}>Strategic Proposal Development:</strong>{" "}
                Create compelling, persuasive proposal documents that clearly
                articulate our value proposition and differentiate us from
                competitors.
              </li>
              <li style={liStyle}>
                <strong style={{ color: "#fff" }}>Stakeholder Coordination:</strong>{" "}
                Contact and coordinate with 5&ndash;10+ team members to gather
                relevant information, resumes, and subject matter expertise for
                proposal development.
              </li>
              <li style={liStyle}>
                <strong style={{ color: "#fff" }}>Quality Assurance:</strong>{" "}
                Ensure all contributed content aligns with original resumes and
                proposal requirements; obtain team confirmation and sign-off on
                all materials.
              </li>
              <li style={liStyle}>
                <strong style={{ color: "#fff" }}>Documentation &amp; Consolidation:</strong>{" "}
                Organize, condense, and synthesize multiple inputs into
                cohesive, professional proposal documents.
              </li>
              <li style={liStyle}>
                <strong style={{ color: "#fff" }}>Cross-functional Collaboration:</strong>{" "}
                Work closely with graphic design, marketing, and other
                departments to integrate visuals, branding, and marketing
                materials into proposals.
              </li>
              <li style={liStyle}>
                <strong style={{ color: "#fff" }}>Project Management:</strong>{" "}
                Track proposal timelines, deadlines, and deliverables; manage
                the &ldquo;wrangling&rdquo; of multiple contributors to keep
                projects on schedule.
              </li>
            </ul>
          </div>
        </section>

        <div className="section-divider">
          <div className="gold-line" />
        </div>

        {/* ── Required Skills & Qualifications ── */}
        <section className="pwm-section" style={sectionStyle}>
          <div style={sectionInner} className="reveal">
            <h2 className="section-title">
              Required Skills &amp; <em>Qualifications</em>
            </h2>
            <ul style={{ ...ulStyle, marginTop: 20 }}>
              <li style={liStyle}>
                Exceptional writing and communication skills with the ability to
                craft persuasive, clear narratives.
              </li>
              <li style={liStyle}>
                Strategic thinking and ability to understand client needs and
                position our solutions effectively.
              </li>
              <li style={liStyle}>Strong project coordination and organizational abilities.</li>
              <li style={liStyle}>
                Experience managing multiple stakeholders and cross-functional
                teams.
              </li>
              <li style={liStyle}>
                Attention to detail and ability to maintain consistency across
                complex documents.
              </li>
              <li style={liStyle}>
                Proficiency with proposal management tools and Microsoft Office
                Suite.
              </li>
            </ul>

            <h3 style={subHeadStyle}>Preferred Qualifications</h3>
            <ul style={ulStyle}>
              <li style={liStyle}>
                Experience in business development, consulting, or government
                contracting.
              </li>
              <li style={liStyle}>
                Familiarity with automation, integration, or technology services.
              </li>
              <li style={liStyle}>Experience with proposal graphics and design coordination.</li>
            </ul>

            <h3 style={subHeadStyle}>Salary</h3>
            <p style={bodyText}>Commensurate with experience and qualifications.</p>
          </div>
        </section>

        <div className="section-divider">
          <div className="gold-line" />
        </div>

        {/* ── Application Form ── */}
        <section className="pwm-section" style={sectionStyle} id="apply">
          <div style={sectionInner} className="reveal">
            <h2 className="section-title">
              Apply for <em>this Role</em>
            </h2>
            <p style={{ ...bodyText, marginTop: 20, marginBottom: 8 }}>
              Attach your resume, cover letter (optional), and a short note
              about why this role is a fit.
            </p>
          </div>

          <div className="contact-form-wrap pwm-form reveal rd2" style={{ marginBottom: 60 }}>
            {!submitted ? (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                {/* Honeypot */}
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

                <div className="form-group">
                  <label className="form-label" htmlFor="location">
                    Location
                  </label>
                  <input
                    className="form-input"
                    id="location"
                    name="location"
                    type="text"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="resume">
                    Resume <span className="form-required">*</span>
                  </label>
                  <input
                    className="form-input"
                    id="resume"
                    name="resume"
                    type="file"
                    accept={ACCEPT_DOC}
                    onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
                    required
                  />
                  <span style={{ color: "#fff", fontSize: 12, marginTop: 4 }}>
                    PDF, DOC, or DOCX &middot; Max 2 MB
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="coverLetter">
                    Cover Letter <span style={{ color: "#fff", fontWeight: 400 }}>(optional)</span>
                  </label>
                  <input
                    className="form-input"
                    id="coverLetter"
                    name="coverLetter"
                    type="file"
                    accept={ACCEPT_DOC}
                    onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
                  />
                  <span style={{ color: "#fff", fontSize: 12, marginTop: 4 }}>
                    PDF, DOC, or DOCX &middot; Max 2 MB
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">
                    Why this role is a fit <span className="form-required">*</span>
                  </label>
                  <textarea
                    className="form-input form-textarea"
                    id="message"
                    name="message"
                    placeholder="Share a short note about why you're a fit for this role..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                  />
                </div>

                <label
                  className="form-consent-row"
                  htmlFor="consent"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    color: "#fff",
                    fontSize: 14,
                    lineHeight: 1.6,
                    cursor: "pointer",
                  }}
                >
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    style={{
                      marginTop: 4,
                      width: 18,
                      height: 18,
                      accentColor: "#c9a84c",
                      flexShrink: 0,
                      cursor: "pointer",
                    }}
                  />
                  <span>
                    I consent to Rawlins Infra Consult storing and reviewing my
                    submitted information for recruitment purposes.{" "}
                    <span className="form-required">*</span>
                  </span>
                </label>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button type="submit" className="form-submit pwm-submit" disabled={submitting}>
                    {submitting ? (
                      <span className="form-submit-inner">
                        <span className="form-spinner" />
                        <span>Submitting&hellip;</span>
                      </span>
                    ) : (
                      <span className="form-submit-inner">
                        <span>Submit Application</span>
                        <svg
                          width="20"
                          height="20"
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
                </div>

                <p
                  style={{
                    color: "#fff",
                    fontSize: 13,
                    lineHeight: 1.7,
                    marginTop: 4,
                  }}
                >
                  By submitting this application, you agree that Rawlins Infra
                  Consult may collect and review the information provided for
                  hiring and recruitment purposes. See our{" "}
                  <a
                    href="/privacy-policy"
                    style={{ color: "#c9a84c", textDecoration: "underline" }}
                  >
                    Privacy Policy
                  </a>{" "}
                  for details.
                </p>

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
                <h3 className="form-success-title">Thank you for your application</h3>
                <p className="form-success-text">
                  We&rsquo;ve received your materials and a member of our team
                  will review them carefully. If your background aligns with
                  this opportunity, we&rsquo;ll be in touch with next steps.
                  We appreciate your interest in joining Rawlins Infra Consult.
                </p>
                <a href="/careers" className="form-success-reset">
                  View All Opportunities
                </a>
              </div>
            )}
          </div>
        </section>

        <div className="section-divider">
          <div className="gold-line" />
        </div>

        {/* ── Equal Opportunity & Disclaimer ── */}
        <section className="pwm-section" style={sectionStyle}>
          <div style={{ ...sectionInner, paddingBottom: 80 }} className="reveal">
            <p style={{ ...bodyText }}>
              Rawlins Infra Consult is an equal opportunity employer. We value
              diversity and are committed to creating an inclusive environment
              for all team members.
            </p>
            <p style={{ ...bodyText, marginTop: 20, fontSize: 14, fontStyle: "italic" }}>
              Employment type, compensation structure, and final
              responsibilities may vary based on candidate experience,
              location, and business needs.
            </p>
          </div>
        </section>
      </div>

      <style jsx global>{`
        .pwm-section { padding: 0 48px; }
        .pwm-section ul { padding-left: 22px; list-style: disc outside; }
        .pwm-section li { color: #fff; }
        .pwm-section p,
        .pwm-section li,
        .pwm-section h2,
        .pwm-section h3 { color: #fff; }
        .pwm-form .form-label,
        .pwm-form .form-label * { color: #1A3251 !important; }
        .pwm-form .form-required { color: #1A3251 !important; }
        .pwm-form .form-input { color: #000; }
        .pwm-form .form-input::placeholder { color: rgba(26, 50, 81, 0.55); }
        .pwm-form .form-recaptcha-notice,
        .pwm-form .form-recaptcha-notice a { color: #1A3251 !important; }

        /* Hero tagline */
        .pwm-hero-tagline {
          color: #fff;
          font-size: 17px;
          line-height: 1.7;
          font-weight: 400;
          max-width: 720px;
          margin: 28px auto 32px;
        }

        /* Hero pills */
        .pwm-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          max-width: 880px;
          margin: 8px auto 0;
        }
        .pwm-pill {
          display: inline-flex;
          align-items: center;
          padding: 10px 22px;
          border: 1px solid rgba(196, 216, 242, 0.6);
          border-radius: 999px;
          /* Light-blue palette pills (#C4D8F2) — punchy little chips
             against the brand-navy hero. Dark navy text for legibility. */
          background: #C4D8F2;
          color: #1A3251;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.3px;
          line-height: 1.4;
        }

        /* Centered, bigger submit button */
        .pwm-submit.form-submit {
          width: auto;
          min-width: 280px;
          padding: 18px 56px;
          font-size: 16px;
          letter-spacing: 2.5px;
        }
        .pwm-submit .form-submit-inner { gap: 14px; }

        @media (max-width: 768px) {
          .pwm-section { padding: 0 24px; }
          .pwm-section .section-title { font-size: clamp(2.2rem, 7.5vw, 3rem); }
          .pwm-section ul { padding-left: 18px; }
          .pwm-pill { font-size: 13px; padding: 9px 18px; }
          .pwm-hero-tagline { font-size: 15px; margin: 24px auto 28px; padding: 0 8px; }
          .pwm-submit.form-submit { min-width: 220px; padding: 16px 36px; font-size: 14px; }
        }
        @media (max-width: 480px) {
          .pwm-section { padding: 0 20px; }
          .pwm-pill { font-size: 12px; padding: 8px 14px; }
          .pwm-submit.form-submit { width: 100%; min-width: 0; }
        }
      `}</style>

      <SiteFooter />
    </>
  );
}
