import Image from "next/image";
import Link from "next/link";

const LOGO_URL =
  "/images/pages/hero-bg.webp";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Image src={LOGO_URL} alt="Rawlins" width={160} height={40} className="footer-logo-img" />
          <p className="footer-brand-desc">
            A global professional services firm that pairs consulting
            services with digital solutions to help organizations solve
            complex challenges at the intersection of strategy,
            operations, and technology.
          </p>
        </div>
        <div>
          <h3 className="footer-heading">Capabilities</h3>
          <ul className="footer-links">
            <li><Link href="/capabilities">View All</Link></li>
            <li><Link href="/capabilities#strategy">Strategy</Link></li>
            <li><Link href="/capabilities#operations">Operations</Link></li>
            <li><Link href="/capabilities#technology">Technology</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="footer-heading">Company</h3>
          <ul className="footer-links">
            <li><Link href="/#story">About</Link></li>
            <li><Link href="/about/our-people">Our People</Link></li>
            <li><Link href="/about/areas-we-serve">Areas We Serve</Link></li>
            <li><Link href="/careers">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="footer-heading">Insights</h3>
          <ul className="footer-links">
            <li><Link href="/insights">View All</Link></li>
            <li><Link href="/insights/thought-leadership">Thought Leadership</Link></li>
            <li><Link href="/insights/case-studies">Case Studies</Link></li>
            <li><Link href="/insights/podcast">Podcast</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="footer-heading">Connect</h3>
          <ul className="footer-links">
            <li><Link href="/contact">Contact Us</Link></li>
            <li>
              <a href="mailto:info@rawlinsic.com">info@rawlinsic.com</a>
            </li>
            <li>
              <a href="tel:+17758433822">(775) 843-3822</a>
            </li>
            <li>
              <address style={{ fontStyle: "normal", lineHeight: 1.5 }}>
                <a
                  href="https://maps.app.goo.gl/uArEsHPDmyhLG9rp7"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Rawlins Infra Consult office location in Google Maps"
                >
                  500 Damonte Ranch Parkway #980<br />
                  Reno, NV 89521
                </a>
              </address>
            </li>
          </ul>
          <div className="footer-social">
            <a href="https://www.linkedin.com/company/107078508/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
              <span style={{ fontFamily: "Arial, sans-serif", fontSize: "20px", fontWeight: 700, color: "#060c16", lineHeight: 1, letterSpacing: "-0.5px" }}>in</span>
            </a>
            <a href="https://g.page/r/CSNh-GWp5ejQEAI/review" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Google">
              <span style={{ fontFamily: "Arial, sans-serif", fontSize: "22px", fontWeight: 700, color: "#060c16", lineHeight: 1 }}>G</span>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Rawlins. All rights reserved.</span>
        <span><a href="/privacy-policy" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</a> &middot; <a href="/terms-of-service" style={{ color: "inherit", textDecoration: "none" }}>Terms of Service</a> &middot; <a href="/accessibility" style={{ color: "inherit", textDecoration: "none" }}>Accessibility</a></span>
      </div>
    </footer>
  );
}
