import Link from "next/link";
import Image from "next/image";

const DARK = "#2f4344";
const SAND = "#ab9c6d";

const COLS = [
  {
    heading: "Solutions",
    href: "https://www.medius.com/solutions/",
    links: [
      { label: "AP Automation",          href: "https://www.medius.com/solutions/medius-accounts-payable-automation/" },
      { label: "Payments",               href: "https://www.medius.com/solutions/medius-payments/" },
      { label: "Fraud & Risk Detection", href: "https://www.medius.com/solutions/fraud-risk-detection/" },
      { label: "Medius Copilot",         href: "https://www.medius.com/solutions/medius-copilot/" },
      { label: "Supplier Conversations", href: "https://www.medius.com/solutions/supplier-conversations/" },
      { label: "Procurement",            href: "https://www.medius.com/solutions/medius-procurement-solutions/" },
      { label: "Expense",                href: "https://www.medius.com/solutions/expense/" },
      { label: "Contract Management",    href: "https://www.medius.com/solutions/medius-contract-management/" },
      { label: "Analytics",              href: "https://www.medius.com/solutions/medius-analytics/" },
    ],
  },
  {
    heading: "Industries",
    href: "https://www.medius.com/customers/",
    links: [
      { label: "Manufacturing",              href: "https://www.medius.com/customers/manufacturing/" },
      { label: "Transport & Logistics",      href: "https://www.medius.com/customers/transport-and-logistics/" },
      { label: "Retail",                     href: "https://www.medius.com/customers/retail/" },
      { label: "Construction",               href: "https://www.medius.com/customers/construction/" },
      { label: "Food & Beverage",            href: "https://www.medius.com/customers/food-and-beverage/" },
      { label: "Healthcare",                 href: "https://www.medius.com/customers/healthcare/" },
      { label: "Consumer Packaged Goods",    href: "https://www.medius.com/customers/consumer-packaged-goods-cpg/" },
    ],
  },
  {
    heading: "Resources",
    href: "https://www.medius.com/resources/",
    links: [
      { label: "Benchmarks Report",     href: "https://www.medius.com/customers/ap-benchmark-report/" },
      { label: "Financial Census",      href: "https://www.medius.com/financial-census/" },
      { label: "Savings Calculator",    href: "https://www.medius.com/savings-calculator/" },
      { label: "Blog",                  href: "https://www.medius.com/blog/" },
      { label: "Guides & Reports",      href: "https://www.medius.com/resources/guides-reports/" },
      { label: "Events & Webinars",     href: "https://www.medius.com/resources/events-and-webinars/" },
      { label: "Case Studies",          href: "https://www.medius.com/resources/case-studies/" },
      { label: "Product Tours",         href: "https://www.medius.com/resources/product-tours/" },
    ],
  },
  {
    heading: "Why Medius",
    href: "https://www.medius.com/about/why-medius/",
    links: [
      { label: "Medius Impact",          href: "https://www.medius.com/about/why-medius/" },
      { label: "Customer Stories",       href: "https://www.medius.com/about/why-medius/customer-stories/" },
      { label: "Innovation and AI",      href: "https://www.medius.com/ai-innovation/" },
      { label: "Partners",               href: "https://www.medius.com/partners/" },
      { label: "Pricing",                href: "https://www.medius.com/pricing/" },
    ],
  },
  {
    heading: "Company",
    href: "https://www.medius.com/about/",
    links: [
      { label: "Contact Us",            href: "https://www.medius.com/contact-us/" },
      { label: "About Medius",          href: "https://www.medius.com/about/" },
      { label: "Careers",               href: "https://career.medius.com/" },
      { label: "News",                  href: "https://www.medius.com/news/" },
      { label: "Leadership",            href: "https://www.medius.com/about/management/" },
      { label: "Trust Center",          href: "https://www.medius.com/trust-center/" },
      { label: "Book a Demo",           href: "https://www.medius.com/book-a-demo/" },
    ],
  },
];

const LEGAL = [
  { label: "Privacy",               href: "https://www.medius.com/legal/privacy/" },
  { label: "Cookies",               href: "https://www.medius.com/legal/cookies/" },
  { label: "Anti-Slavery Statement",href: "https://www.medius.com/legal/modern-slavery-and-human-trafficking-policy/" },
  { label: "Whistleblower Policy",  href: "https://www.medius.com/legal/whistleblower-policy/" },
];

export default function Footer() {
  const linkStyle: React.CSSProperties = {
    fontSize: "13px",
    color: "rgba(255,255,255,0.55)",
    textDecoration: "none",
    lineHeight: 1.6,
    display: "block",
    paddingBottom: "4px",
    transition: "color 0.15s ease",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "13px",
    fontWeight: 700,
    color: "white",
    textDecoration: "none",
    marginBottom: "14px",
    display: "block",
    letterSpacing: "0.1px",
  };

  return (
    <footer style={{ background: DARK, fontFamily: "var(--font-poppins), sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 32px 0" }}>

        {/* Logo */}
        <div style={{ marginBottom: "48px" }}>
          <a href="https://www.medius.com" target="_blank" rel="noopener noreferrer">
            <Image
              src="https://www.medius.com/media/lx0f3wqn/medius-logo-white.png"
              alt="Medius"
              width={120}
              height={32}
              style={{ height: "28px", width: "auto" }}
              unoptimized
            />
          </a>
        </div>

        {/* Columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "32px",
          paddingBottom: "48px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}>
          {COLS.map((col) => (
            <div key={col.heading}>
              <a href={col.href} target="_blank" rel="noopener noreferrer" style={headingStyle}>
                {col.heading}
              </a>
              <div>
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0 24px",
          gap: "16px",
          flexWrap: "wrap",
        }}>
          {/* Legal links */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>© 2026 Medius</span>
            {LEGAL.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "12px" }}>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/medius/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              aria-label="Medius on LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <rect x="36" y="36" width="184" height="184" rx="8" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="120" y1="112" x2="120" y2="176" stroke="currentColor" strokeWidth="16" strokeLinecap="round"/>
                <line x1="88" y1="112" x2="88" y2="176" stroke="currentColor" strokeWidth="16" strokeLinecap="round"/>
                <path d="M120,140a28,28,0,0,1,56,0v36" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="88" cy="80" r="12" fill="currentColor"/>
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="https://www.youtube.com/user/MediusFlow"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              aria-label="Medius on YouTube"
            >
              <svg width="18" height="18" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="160 128 112 96 112 160 160 128" fill="currentColor"/>
                <path d="M24,128c0,29.8,3.1,47.2,5.4,56.2A16.1,16.1,0,0,0,39,195.1c33.5,12.8,89,12.5,89,12.5s55.5.3,89-12.5a16.1,16.1,0,0,0,9.6-10.9c2.3-9,5.4-26.4,5.4-56.2s-3.1-47.2-5.4-56.2A16.1,16.1,0,0,0,217,60.9c-33.5-12.8-89-12.5-89-12.5s-55.5-.3-89,12.5a16.1,16.1,0,0,0-9.6,10.9C27.1,80.8,24,98.2,24,128Z" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
