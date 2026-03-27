"use client";

import Header from "@/components/Header";

const RED  = "#da2028";
const DARK = "#2f4344";
const SAND = "#ab9c6d";
const MOSS = "#84985c";

// ─── Agent data ───────────────────────────────────────────────────────────────

const AGENTS = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7"/>
        <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7"/>
        <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M13 17h8M17 13v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
    label: "Capture Agent",
    headline: "100% touchless invoice capture",
    description:
      "Extracts vendor, amount, PO, and line items from any format — PDF, image, or eInvoice — trained on hundreds of millions of real invoices.",
    stat: "100M+ invoices processed",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Coding Agent",
    headline: "95% auto-coding precision",
    description:
      "Learns your GL coding rules after just two invoices. Applies account codes, cost centres, and routing automatically — no templates required.",
    stat: "Live after 2 invoices",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Fraud & Risk Agent",
    headline: "Pre- and post-transaction fraud detection",
    description:
      "Monitors anomalies across the entire payment lifecycle — from invoice submission through to settlement — flagging risks before money moves.",
    stat: "Real-time alerts",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M18 3l1.5 1.5M19.5 3L18 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="19" cy="4" r="3.5" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
    label: "Copilot Agent",
    headline: "Autonomous approval guidance",
    description:
      "Surfaces the right invoices to the right approvers at the right time. Answers free-text queries and guides reviewers through exceptions intelligently.",
    stat: "Zero chasing required",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Supplier Agent",
    headline: "24/7 autonomous supplier responses",
    description:
      "Responds to supplier invoice and payment inquiries instantly, around the clock. Fully autonomous — no human handoff needed for standard queries.",
    stat: "100% auto-resolved",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M2 10h20" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M6 15h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
    label: "Payments Agent",
    headline: "Straight-through payment processing",
    description:
      "Extends AP automation all the way to settlement. Auto-approves trusted vendor payments and initiates bank transfers — fully touchless.",
    stat: "From approval to bank, automatically",
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: "⚡",
    title: "Move faster and smarter",
    body: "Algorithms apply coding and routing instantly, without fatigue or bottlenecks.",
  },
  {
    icon: "🔍",
    title: "Superior control and visibility",
    body: "All financial data flows through a single, centralized AI-managed hub.",
  },
  {
    icon: "🤝",
    title: "Stronger vendor relationships",
    body: "On-time payments and instant query resolution improve supplier trust at scale.",
  },
  {
    icon: "💧",
    title: "Increase liquidity",
    body: "Better cash flow forecasting and early payment discount capture improve working capital.",
  },
  {
    icon: "🛡️",
    title: "Continuous fraud detection",
    body: "Anomaly tracking across the full invoice-to-pay lifecycle — not just at point of payment.",
  },
  {
    icon: "🌱",
    title: "Built to grow with you",
    body: "Agents learn from every transaction, continuously improving accuracy and coverage.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AIPage() {
  return (
    <main style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
      <Header />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "640px",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: DARK,
        }}
      >
        {/* Background image — full bleed, fades right */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/fade-hero-charcoal-innovation-ai.png"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            pointerEvents: "none",
          }}
        />

        {/* Subtle right-side gradient overlay so text is always legible */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to right, ${DARK} 38%, rgba(47,67,68,0.7) 65%, rgba(47,67,68,0.3) 100%)`,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "96px 32px",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "24px",
              padding: "6px 16px",
              borderRadius: "9999px",
              border: `1px solid rgba(171,156,109,0.5)`,
              background: "rgba(171,156,109,0.12)",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: SAND, flexShrink: 0 }} />
            <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1.2px", textTransform: "uppercase", color: SAND }}>
              AI Innovation
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(44px, 5.5vw, 68px)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-1.5px",
              color: "white",
              marginBottom: "24px",
              maxWidth: "600px",
            }}
          >
            Medius<br />
            <span style={{ color: SAND }}>Agents</span>
          </h1>

          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.66)",
              maxWidth: "440px",
              marginBottom: "40px",
            }}
          >
            Six purpose-built AI agents working together to automate
            the full invoice-to-pay lifecycle — from capture through to settlement.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              style={{
                background: RED,
                color: "white",
                border: `2px solid ${RED}`,
                padding: "14px 36px",
                borderRadius: "9999px",
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Book a Demo
            </button>
            <button
              style={{
                background: "transparent",
                color: "white",
                border: "2px solid rgba(255,255,255,0.5)",
                padding: "14px 36px",
                borderRadius: "9999px",
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Explore the Platform
            </button>
          </div>
        </div>
      </section>

      {/* ── Recognition Banner ─────────────────────────────────────────────── */}
      <section
        style={{
          background: "#f8f9fa",
          borderBottom: "1px solid #e8ecec",
          padding: "40px 32px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "48px",
            flexWrap: "wrap",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "12px",
                background: DARK,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="white" fillOpacity="0.15"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 600, color: SAND, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "3px" }}>
                Ardent Partners · 2026
              </div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: DARK }}>
                Elite Performer in AI &amp; Innovation
              </div>
            </div>
          </div>

          <div style={{ width: "1px", height: "40px", background: "#dde3e3", flexShrink: 0 }} />

          <p style={{ fontSize: "14px", lineHeight: 1.65, color: "#5a7070", flex: 1, minWidth: "200px" }}>
            Recognised as a Leader and Elite Performer for AI and Innovation in the 2026 AP Automation and Payments Technology Advisor report.
          </p>

          <button
            style={{
              background: RED,
              color: "white",
              border: "none",
              padding: "11px 28px",
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              cursor: "pointer",
              fontFamily: "inherit",
              flexShrink: 0,
            }}
          >
            Get the Report
          </button>
        </div>
      </section>

      {/* ── AI Native Since 2016 ───────────────────────────────────────────── */}
      <section style={{ background: "white", padding: "96px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "center",
            }}
          >
            {/* Left */}
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: SAND,
                  textTransform: "uppercase",
                  letterSpacing: "1.2px",
                  marginBottom: "16px",
                }}
              >
                Platform Foundation
              </div>
              <h2
                style={{
                  fontSize: "clamp(32px, 3.5vw, 46px)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: "-0.8px",
                  color: DARK,
                  marginBottom: "20px",
                }}
              >
                AI-native since 2016.<br />
                <span style={{ color: SAND }}>A decade ahead.</span>
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.75,
                  color: "#5a7070",
                  marginBottom: "32px",
                }}
              >
                While others have been retrofitting AI onto legacy platforms, Medius
                was built on an event-driven, agentic core from the start. That ten-year
                head start means our models are trained on real-world data no competitor
                can match.
              </p>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.75,
                  color: "#5a7070",
                }}
              >
                Every invoice processed, every human correction, every payment decision
                makes our agents smarter — for every customer on the platform.
              </p>
            </div>

            {/* Right — stat trio */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              {[
                { value: "10", unit: "years", label: "of AI-native architecture" },
                { value: "100M+", unit: "", label: "invoices in training data" },
                { value: "95%", unit: "", label: "auto-coding precision" },
                { value: "24/7", unit: "", label: "autonomous supplier responses" },
              ].map(({ value, unit, label }) => (
                <div
                  key={label}
                  style={{
                    background: "#f8f9fa",
                    border: "1px solid #e8ecec",
                    borderRadius: "14px",
                    padding: "28px 24px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "36px", fontWeight: 800, color: DARK, letterSpacing: "-1px" }}>
                      {value}
                    </span>
                    {unit && (
                      <span style={{ fontSize: "16px", fontWeight: 600, color: SAND }}>{unit}</span>
                    )}
                  </div>
                  <div style={{ fontSize: "12px", color: "#7a9090", lineHeight: 1.4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Meet the Agents ────────────────────────────────────────────────── */}
      <section style={{ background: "#f8f9fa", padding: "96px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: SAND,
                textTransform: "uppercase",
                letterSpacing: "1.2px",
                marginBottom: "12px",
              }}
            >
              Purpose-built AI
            </div>
            <h2
              style={{
                fontSize: "clamp(30px, 3.5vw, 44px)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.8px",
                color: DARK,
                marginBottom: "16px",
              }}
            >
              Meet the Medius Agents
            </h2>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#5a7070",
                maxWidth: "560px",
                margin: "0 auto",
              }}
            >
              Six specialized agents — each an expert in its domain — working in concert
              to deliver fully autonomous invoice-to-pay processing.
            </p>
          </div>

          {/* Agent grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {AGENTS.map(({ icon, label, headline, description, stat }) => (
              <div
                key={label}
                style={{
                  background: "white",
                  border: "1px solid #e0e8e8",
                  borderRadius: "16px",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  transition: "box-shadow 0.2s",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: `rgba(47,67,68,0.07)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: DARK,
                    marginBottom: "4px",
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>

                {/* Label */}
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: SAND,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {label}
                </div>

                {/* Headline */}
                <div
                  style={{
                    fontSize: "17px",
                    fontWeight: 700,
                    color: DARK,
                    lineHeight: 1.3,
                  }}
                >
                  {headline}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: "13.5px",
                    lineHeight: 1.65,
                    color: "#5a7070",
                    flex: 1,
                    margin: 0,
                  }}
                >
                  {description}
                </p>

                {/* Stat pill */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "4px",
                    padding: "5px 12px",
                    background: `rgba(47,67,68,0.06)`,
                    borderRadius: "9999px",
                    alignSelf: "flex-start",
                  }}
                >
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: MOSS, flexShrink: 0 }} />
                  <span style={{ fontSize: "11px", fontWeight: 600, color: DARK }}>{stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Autonomous AP callout ──────────────────────────────────────────── */}
      <section style={{ background: DARK, padding: "96px 32px" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: SAND,
                textTransform: "uppercase",
                letterSpacing: "1.2px",
                marginBottom: "16px",
              }}
            >
              Beyond Automation
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.6px",
                color: "white",
                marginBottom: "20px",
              }}
            >
              Automated AP is good.<br />
              <span style={{ color: SAND }}>Autonomous AP is everything.</span>
            </h2>
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.65)",
                marginBottom: "16px",
              }}
            >
              Traditional automation removes tasks. Medius Agents remove people
              from processes entirely — freeing your team to focus on cash strategy,
              vendor relationships, and the decisions that matter.
            </p>
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.65)",
                marginBottom: "36px",
              }}
            >
              When every agent learns from every transaction, the system doesn't
              just maintain performance — it continuously improves it.
            </p>
            <button
              style={{
                background: RED,
                color: "white",
                border: `2px solid ${RED}`,
                padding: "14px 36px",
                borderRadius: "9999px",
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Learn More
            </button>
          </div>

          {/* Right — quote */}
          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "20px",
              padding: "40px 36px",
            }}
          >
            <div style={{ fontSize: "32px", color: SAND, lineHeight: 1, marginBottom: "16px" }}>&ldquo;</div>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.85)",
                fontStyle: "italic",
                marginBottom: "28px",
              }}
            >
              Medius provides state-of-the-art AI and machine learning that is superior
              to the system we had in place. It <em>actually</em> grows smarter with every invoice.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: SAND,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "white",
                  flexShrink: 0,
                }}
              >
                MW
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "white" }}>Michael Weare</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Project Manager, Granngården</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ───────────────────────────────────────────────────────── */}
      <section style={{ background: "white", padding: "96px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: SAND,
                textTransform: "uppercase",
                letterSpacing: "1.2px",
                marginBottom: "12px",
              }}
            >
              What you gain
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.6px",
                color: DARK,
              }}
            >
              Built for finance teams that want more
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {BENEFITS.map(({ icon, title, body }) => (
              <div
                key={title}
                style={{
                  padding: "32px 28px",
                  border: "1px solid #e8ecec",
                  borderRadius: "14px",
                }}
              >
                <div style={{ fontSize: "26px", marginBottom: "14px" }}>{icon}</div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: DARK,
                    marginBottom: "8px",
                  }}
                >
                  {title}
                </div>
                <p style={{ fontSize: "13.5px", lineHeight: 1.65, color: "#5a7070", margin: 0 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: RED,
          padding: "80px 32px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 40px)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.5px",
              color: "white",
              marginBottom: "16px",
            }}
          >
            Ready to put Medius Agents to work?
          </h2>
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.8)",
              marginBottom: "36px",
            }}
          >
            See how our agents handle your invoice volume — from capture to payment — in a personalised demo.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              style={{
                background: "white",
                color: RED,
                border: "2px solid white",
                padding: "14px 40px",
                borderRadius: "9999px",
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Book a Demo
            </button>
            <button
              style={{
                background: "transparent",
                color: "white",
                border: "2px solid rgba(255,255,255,0.6)",
                padding: "14px 40px",
                borderRadius: "9999px",
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
