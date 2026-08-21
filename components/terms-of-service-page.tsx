"use client";

import { useEffect, useRef } from "react";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

export default function TermsOfServicePage() {
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

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
      <div className="ambient-bg" />
      <SiteNav />

      <section style={{ padding: "180px 48px 100px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <span className="hero-label"><span className="gold-text">Legal</span></span>
        <h1 className="hero-title" style={{ marginBottom: 40 }}>Terms of Service</h1>

        <div style={{ color: "#fff", fontSize: 15, fontWeight: 500, lineHeight: 1.9, display: "flex", flexDirection: "column", gap: 32 }}>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, fontWeight: 500 }}>Effective date: April 7, 2026</p>

          <div>
            <h2 style={h2Style}>1. Acceptance of Terms</h2>
            <p>By accessing, browsing, or using the Rawlins Infra Consult, LLC (&ldquo;Rawlins,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) website located at rawlinsic.com (the &ldquo;Site&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, you must discontinue use of the Site immediately.</p>
          </div>

          <div>
            <h2 style={h2Style}>2. Description of Services</h2>
            <p>Rawlins Infra Consult is a management consulting firm providing advisory services in strategy, operations, and technology for transportation agencies and enterprises. This Site provides general information about our firm, services, thought leadership, and career opportunities. The content on this Site is for informational purposes only and does not constitute professional advice, a solicitation, or an offer to provide services.</p>
          </div>

          <div>
            <h2 style={h2Style}>3. Use of the Site</h2>
            <p>You agree to use the Site only for lawful purposes and in a manner consistent with these Terms. You shall not:</p>
            <ul style={{ paddingLeft: 24, marginTop: 8 }}>
              <li>Use the Site in any way that violates applicable federal, state, local, or international law or regulation</li>
              <li>Attempt to gain unauthorized access to any portion of the Site, its servers, or any connected systems</li>
              <li>Introduce viruses, malware, or other harmful code</li>
              <li>Interfere with or disrupt the integrity or performance of the Site</li>
              <li>Use automated systems (e.g., bots, scrapers) to access the Site without our prior written consent</li>
              <li>Reproduce, distribute, modify, or create derivative works of any Site content without authorization</li>
            </ul>
          </div>

          <div>
            <h2 style={h2Style}>4. Intellectual Property</h2>
            <p>All content on the Site, including but not limited to text, graphics, logos, images, photographs, illustrations, data compilations, software, and the overall design and arrangement thereof, is the property of Rawlins Infra Consult, LLC or its licensors and is protected by United States and international copyright, trademark, and other intellectual property laws.</p>
            <p style={{ marginTop: 12 }}>The Rawlins name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Rawlins Infra Consult, LLC. You may not use such marks without our prior written permission.</p>
          </div>

          <div>
            <h2 style={h2Style}>5. User Submissions</h2>
            <p>Any information or materials you submit to us through the Site (e.g., via contact forms or email) are provided on a non-confidential basis unless otherwise agreed in a separate written agreement. By submitting information, you grant Rawlins a non-exclusive, royalty-free right to use such information for the purpose of responding to your inquiry and providing our services.</p>
          </div>

          <div>
            <h2 style={h2Style}>6. No Professional Advice</h2>
            <p>The information provided on this Site, including articles, case studies, thought leadership content, and other materials, is intended for general informational purposes only. It does not constitute professional, legal, financial, or technical advice and should not be relied upon as such. Any engagement for consulting services will be governed by a separate written agreement between you and Rawlins Infra Consult.</p>
          </div>

          <div>
            <h2 style={h2Style}>7. Third-Party Links</h2>
            <p>The Site may contain links to third-party websites, platforms, or resources (e.g., LinkedIn, Google). These links are provided for your convenience only. We do not endorse, control, or assume responsibility for the content, privacy policies, or practices of any third-party sites. You access third-party sites at your own risk.</p>
          </div>

          <div>
            <h2 style={h2Style}>8. Disclaimer of Warranties</h2>
            <p>THE SITE AND ALL CONTENT, MATERIALS, AND SERVICES PROVIDED THEREIN ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.</p>
            <p style={{ marginTop: 12 }}>Rawlins does not warrant that the Site will be uninterrupted, secure, error-free, or free of viruses or other harmful components, or that any defects will be corrected. We do not guarantee the accuracy, completeness, or timeliness of any content on the Site.</p>
          </div>

          <div>
            <h2 style={h2Style}>9. Limitation of Liability</h2>
            <p>TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, RAWLINS INFRA CONSULT, LLC, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SITE, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, REGARDLESS OF WHETHER SUCH DAMAGES ARE BASED ON WARRANTY, CONTRACT, TORT, STATUTE, OR ANY OTHER LEGAL THEORY.</p>
          </div>

          <div>
            <h2 style={h2Style}>10. Indemnification</h2>
            <p>You agree to indemnify, defend, and hold harmless Rawlins Infra Consult, LLC, its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys&rsquo; fees) arising out of or in connection with your use of the Site, your violation of these Terms, or your violation of any rights of another party.</p>
          </div>

          <div>
            <h2 style={h2Style}>11. Privacy</h2>
            <p>Your use of the Site is also governed by our <a href="/privacy-policy" style={{ color: "#c9b78c" }}>Privacy Policy</a>, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices regarding the collection and use of your personal information.</p>
          </div>

          <div>
            <h2 style={h2Style}>12. Modifications to Terms</h2>
            <p>We reserve the right to modify, update, or revise these Terms at any time at our sole discretion. Changes will be effective immediately upon posting to this page with a revised effective date. Your continued use of the Site following the posting of any changes constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically.</p>
          </div>

          <div>
            <h2 style={h2Style}>13. Termination</h2>
            <p>We reserve the right to suspend or terminate your access to the Site at any time, without notice, for any reason, including but not limited to a breach of these Terms. Upon termination, all provisions of these Terms that by their nature should survive will remain in effect.</p>
          </div>

          <div>
            <h2 style={h2Style}>14. Governing Law and Jurisdiction</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the State of Nevada, United States, without regard to its conflict of law provisions. Any dispute arising out of or relating to these Terms or the Site shall be subject to the exclusive jurisdiction of the state and federal courts located in Nevada.</p>
          </div>

          <div>
            <h2 style={h2Style}>15. Severability</h2>
            <p>If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be modified to the minimum extent necessary to make it valid, and the remaining provisions shall continue in full force and effect.</p>
          </div>

          <div>
            <h2 style={h2Style}>16. Entire Agreement</h2>
            <p>These Terms, together with our Privacy Policy, constitute the entire agreement between you and Rawlins Infra Consult, LLC regarding your use of the Site and supersede all prior agreements and understandings, whether written or oral.</p>
          </div>

          <div>
            <h2 style={h2Style}>17. Contact Us</h2>
            <p>If you have any questions about these Terms of Service, please contact us at:</p>
            <p style={{ marginTop: 12 }}>
              <strong style={{ color: "#fff" }}>Rawlins Infra Consult, LLC</strong><br />
              Email: <a href="mailto:info@rawlinsic.com" style={{ color: "#c9b78c" }}>info@rawlinsic.com</a><br />
              Phone: <a href="tel:+17758433822" style={{ color: "#c9b78c" }}>(775) 843-3822</a><br />
              Website: <span style={{ color: "#c9b78c" }}>rawlinsic.com</span>
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="gold-line" /></div>
      <SiteFooter />
    </>
  );
}
