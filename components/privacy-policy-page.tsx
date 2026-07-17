"use client";

import { useEffect, useRef } from "react";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

export default function PrivacyPolicyPage() {
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
    const onScroll = () => { if (nav) nav.classList.toggle("scrolled", window.scrollY > 60); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const h2Style = { fontSize: 28, fontWeight: 600, color: "#fff", marginBottom: 14, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" } as const;
  const h3Style = { fontSize: 20, fontWeight: 600, color: "#fff", marginBottom: 10, marginTop: 18 } as const;

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
      <div className="ambient-bg" />
      <SiteNav />

      <section style={{ padding: "180px 48px 100px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <span className="hero-label"><span className="gold-text">Legal</span></span>
        <h1 className="hero-title" style={{ marginBottom: 40 }}>Privacy Policy</h1>

        <div style={{ color: "#fff", fontSize: 15, fontWeight: 500, lineHeight: 1.9, display: "flex", flexDirection: "column", gap: 32 }}>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, fontWeight: 500 }}>Effective date: April 7, 2026</p>

          <div>
            <h2 style={h2Style}>1. Introduction</h2>
            <p>Rawlins Infra Consult, LLC (&ldquo;Rawlins,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, disclose, store, and protect information obtained through our website at rawlinsic.com (the &ldquo;Site&rdquo;) and in connection with our consulting services.</p>
            <p style={{ marginTop: 12 }}>By accessing or using our Site, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree, please discontinue use of the Site.</p>
          </div>

          <div>
            <h2 style={h2Style}>2. Information We Collect</h2>
            <h3 style={h3Style}>I. Information You Provide Directly</h3>
            <p>We collect information that you voluntarily provide when you:</p>
            <ul style={{ paddingLeft: 24, marginTop: 8 }}>
              <li>Complete our contact or inquiry forms</li>
              <li>Send us an email or correspond with us</li>
              <li>Subscribe to newsletters or updates</li>
              <li>Apply for employment or career opportunities</li>
              <li>Engage with us as a client or business partner</li>
            </ul>
            <p style={{ marginTop: 12 }}>This information may include your name, email address, phone number, job title, organization name, and any other details you choose to share in your message.</p>

            <h3 style={h3Style}>II. Information Collected Automatically</h3>
            <p>When you visit our Site, we may automatically collect certain technical information, including:</p>
            <ul style={{ paddingLeft: 24, marginTop: 8 }}>
              <li>IP address and approximate geographic location</li>
              <li>Browser type, version, and language preferences</li>
              <li>Operating system and device information</li>
              <li>Pages visited, time spent on pages, and navigation paths</li>
              <li>Referring and exit URLs</li>
              <li>Date and time of access</li>
            </ul>

            <h3 style={h3Style}>III. Cookies and Similar Technologies</h3>
            <p>We use cookies, web beacons, and similar technologies to enhance your experience, analyze site usage, and support our marketing efforts. Cookies are small data files stored on your device.</p>
            <p style={{ marginTop: 12 }}>When you first visit our Site, a cookie consent banner will ask for your permission before any non-essential cookies are set. You may accept or decline at any time. To change your preference later, clear your browser&rsquo;s local storage for this site and the banner will reappear on your next visit.</p>
            <p style={{ marginTop: 12 }}>We currently use the following analytics services:</p>
            <ul style={{ paddingLeft: 24, marginTop: 8 }}>
              <li><strong style={{ color: "#fff" }}>Vercel Web Analytics:</strong> A privacy-friendly, cookieless analytics service that collects aggregated page-view data without setting cookies or tracking individual users across sessions. We also use Vercel custom event tracking to understand how visitors interact with specific page elements, such as which content sections are opened, PDF downloads, and button clicks. These events are anonymous and aggregated.</li>
              <li><strong style={{ color: "#fff" }}>Microsoft Clarity:</strong> We use Clarity to understand how visitors interact with our Site through heat maps (showing where users click and how far they scroll) and session recordings (anonymized replays of user visits). Clarity may use cookies and captures interaction data such as mouse movements, clicks, and scrolling behavior. Clarity does not collect sensitive information and data is processed by Microsoft in accordance with its privacy policy. For more information, visit <a href="https://clarity.microsoft.com/terms" style={{ color: "#c9a227" }}>Microsoft Clarity&rsquo;s terms</a>.</li>
              <li><strong style={{ color: "#fff" }}>Google Analytics (GA4):</strong> When enabled, GA4 uses cookies to collect information about how visitors use our Site, including pages visited, session duration, and traffic sources. GA4 data is processed by Google in accordance with its privacy policy. This service is only loaded if you accept cookies via our consent banner.</li>
            </ul>
            <p style={{ marginTop: 12 }}>You may also manage or disable cookies through your browser settings; however, doing so may affect certain site functionality.</p>
          </div>

          <div>
            <h2 style={h2Style}>3. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul style={{ paddingLeft: 24, marginTop: 8 }}>
              <li>To respond to inquiries, requests, and communications</li>
              <li>To deliver, manage, and improve our consulting services</li>
              <li>To send relevant updates, newsletters, and service information (with your consent where required)</li>
              <li>To analyze website usage and improve the Site&rsquo;s performance, content, and user experience</li>
              <li>To comply with applicable laws, regulations, and legal processes</li>
              <li>To protect the rights, safety, and property of Rawlins, our clients, and others</li>
              <li>To evaluate employment applications and manage recruitment processes</li>
            </ul>
          </div>

          <div>
            <h2 style={h2Style}>4. Information Sharing and Disclosure</h2>
            <p>We do not sell, rent, or trade your personal information to third parties for marketing purposes. We may share your information in the following limited circumstances:</p>
            <ul style={{ paddingLeft: 24, marginTop: 8 }}>
              <li><strong style={{ color: "#fff" }}>Service providers:</strong> We may share information with trusted third-party vendors who perform services on our behalf (e.g., website hosting, analytics, email delivery), subject to confidentiality obligations.</li>
              <li><strong style={{ color: "#fff" }}>Legal requirements:</strong> We may disclose information when required by law, subpoena, court order, or governmental regulation, or when we believe disclosure is necessary to protect our rights, prevent fraud, or ensure the safety of our users.</li>
              <li><strong style={{ color: "#fff" }}>Business transfers:</strong> In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred as part of that transaction.</li>
              <li><strong style={{ color: "#fff" }}>With your consent:</strong> We may share information for other purposes when you have provided explicit consent.</li>
            </ul>
          </div>

          <div>
            <h2 style={h2Style}>5. Data Retention</h2>
            <p>We retain personal information for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. When personal information is no longer needed, we will securely delete or anonymize it.</p>
          </div>

          <div>
            <h2 style={h2Style}>6. Data Security</h2>
            <p>We implement reasonable administrative, technical, and physical safeguards designed to protect your personal information from unauthorized access, use, alteration, and disclosure. These measures include encryption, access controls, and secure hosting environments. However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.</p>
          </div>

          <div>
            <h2 style={h2Style}>7. Your Rights and Choices</h2>
            <p>Depending on your jurisdiction, you may have certain rights regarding your personal information, including:</p>
            <ul style={{ paddingLeft: 24, marginTop: 8 }}>
              <li><strong style={{ color: "#fff" }}>Access:</strong> Request a copy of the personal information we hold about you.</li>
              <li><strong style={{ color: "#fff" }}>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
              <li><strong style={{ color: "#fff" }}>Deletion:</strong> Request deletion of your personal information, subject to certain exceptions.</li>
              <li><strong style={{ color: "#fff" }}>Opt-out:</strong> Unsubscribe from marketing communications at any time by following the instructions in the communication or contacting us directly.</li>
              <li><strong style={{ color: "#fff" }}>Restriction:</strong> Request that we limit the processing of your personal information under certain circumstances.</li>
            </ul>
            <p style={{ marginTop: 12 }}>To exercise any of these rights, please contact us at <a href="mailto:info@rawlinsic.com" style={{ color: "#9aa6b4" }}>info@rawlinsic.com</a>. We will respond to your request within a reasonable timeframe and in accordance with applicable law.</p>
          </div>

          <div>
            <h2 style={h2Style}>8. Third-Party Links</h2>
            <p>Our Site may contain links to third-party websites, services, or platforms (e.g., LinkedIn, Google). We are not responsible for the privacy practices, content, or security of those third-party sites. We encourage you to review the privacy policies of any external sites you visit.</p>
          </div>

          <div>
            <h2 style={h2Style}>9. Children&rsquo;s Privacy</h2>
            <p>Our Site and services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected information from a child, we will take steps to delete it promptly.</p>
          </div>

          <div>
            <h2 style={h2Style}>10. International Users</h2>
            <p>Our Site is operated from the United States. If you are accessing our Site from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States, where data protection laws may differ from those in your jurisdiction.</p>
          </div>

          <div>
            <h2 style={h2Style}>11. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. The updated policy will be posted on this page with a revised effective date. We encourage you to review this policy periodically. Your continued use of the Site following any changes constitutes your acceptance of the updated policy.</p>
          </div>

          <div>
            <h2 style={h2Style}>12. Contact Us</h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:</p>
            <p style={{ marginTop: 12 }}>
              <strong style={{ color: "#fff" }}>Rawlins Infra Consult, LLC</strong><br />
              Email: <a href="mailto:info@rawlinsic.com" style={{ color: "#9aa6b4" }}>info@rawlinsic.com</a><br />
              Phone: <a href="tel:+17758433822" style={{ color: "#9aa6b4" }}>(775) 843-3822</a><br />
              Website: <span style={{ color: "#9aa6b4" }}>rawlinsic.com</span>
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>
      <SiteFooter />
    </>
  );
}
