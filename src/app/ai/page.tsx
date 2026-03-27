"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Header from "@/components/Header";
import {
  AgentCaptureCard,
  AgentCodingCard,
  AgentFraudRiskCard,
  AgentSupplierCard,
  AgentPOConnectCard,
  AgentCopilotCard,
  AgentStatementReconCard,
} from "@/components/CardComponents";

const RED  = "#da2028";
const DARK = "#2f4344";
const SAND = "#ab9c6d";
const MOSS = "#84985c";

const HERO_LABELS = ["Invoice Capture Agent", "Fraud & Risk Agent", "Supplier Inquiries Agent"];
const HOLD = [5000, 5000, 5000];

// ─── Agent data for body sections ─────────────────────────────────────────────

const AP_AGENTS = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7"/>
        <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7"/>
        <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M13 17h8M17 13v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
    label: "Invoice Capture Agent",
    headline: "100% touchless invoice capture",
    description:
      "Extracts vendor, amount, PO, and line items from any format — PDF, image, or eInvoice — trained on hundreds of millions of real invoices.",
    stat: "100M+ invoices in training data",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Invoice Coding Agent",
    headline: "96%+ touchless invoice processing",
    description:
      "Learns your GL coding rules after just two invoices. Applies account codes, cost centres, and routing automatically — no templates required.",
    stat: "Live after 2 invoices",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
        <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "PO Connect Agent",
    headline: "Automated 3-way PO matching",
    description:
      "Matches every invoice line against purchase orders and goods receipts automatically. Flags variances instantly and holds exceptions for review — without manual effort.",
    stat: "Variance detection at line level",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M17.5 5.5l1 1M18.5 5.5l-1 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
    label: "Approvals Agent",
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
    label: "Supplier Inquiries Agent",
    headline: "24/7 autonomous supplier responses",
    description:
      "Responds to supplier invoice and payment inquiries instantly, around the clock. Fully autonomous — no human handoff needed for standard queries.",
    stat: "100% auto-resolved",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
        <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
    label: "Statement Reconciliation Agent",
    headline: "Automated supplier statement matching",
    description:
      "Matches supplier statements against the AP ledger automatically — identifying matched items, variances, and missing invoices without manual effort.",
    stat: "Discrepancies surfaced instantly",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Fraud & Risk Detection Agent",
    headline: "Pre- and post-transaction fraud detection",
    description:
      "Monitors anomalies across the entire payment lifecycle — from invoice submission through to settlement — flagging risks before money moves.",
    stat: "Real-time alerts",
  },
];

const SM_AGENTS = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M2 10h20" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M6 15h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
    label: "Payment Optimization Agent",
    headline: "Straight-through payment processing",
    description:
      "Extends AP automation all the way to settlement. Auto-approves trusted vendor payments and initiates bank transfers — fully touchless.",
    stat: "From approval to bank, automatically",
  },
];

const BENEFITS = [
  { icon: "⚡", title: "Move faster and smarter",      body: "Algorithms apply coding and routing instantly, without fatigue or bottlenecks." },
  { icon: "🔍", title: "Superior control and visibility", body: "All financial data flows through a single, centralized AI-managed hub." },
  { icon: "🤝", title: "Stronger vendor relationships", body: "On-time payments and instant query resolution improve supplier trust at scale." },
  { icon: "💧", title: "Increase liquidity",            body: "Better cash flow forecasting and early payment discount capture improve working capital." },
  { icon: "🛡️", title: "Continuous fraud detection",   body: "Anomaly tracking across the full invoice-to-pay lifecycle — not just at point of payment." },
  { icon: "🌱", title: "Built to grow with you",       body: "Agents learn from every transaction, continuously improving accuracy and coverage." },
];

// ─── Shared agent card component ──────────────────────────────────────────────
function AgentCard({ icon, label, headline, description, stat }: {
  icon: React.ReactNode; label: string; headline: string; description: string; stat: string;
}) {
  return (
    <div style={{
      background: "#f8f9fa", border: "1px solid #e8ecec",
      borderRadius: "16px", padding: "30px 26px",
      display: "flex", flexDirection: "column", gap: "10px",
    }}>
      <div style={{
        width: "46px", height: "46px", borderRadius: "12px",
        background: "white", border: "1px solid #e0e8e8",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: DARK, marginBottom: "2px", flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ fontSize: "10px", fontWeight: 700, color: SAND, textTransform: "uppercase", letterSpacing: "1px" }}>
        {label}
      </div>
      <div style={{ fontSize: "16px", fontWeight: 700, color: DARK, lineHeight: 1.3 }}>
        {headline}
      </div>
      <p style={{ fontSize: "13px", lineHeight: 1.65, color: "#5a7070", flex: 1, margin: 0 }}>
        {description}
      </p>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        marginTop: "4px", padding: "4px 11px",
        background: "rgba(132,152,92,0.1)", borderRadius: "9999px",
        alignSelf: "flex-start",
      }}>
        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: MOSS, flexShrink: 0 }} />
        <span style={{ fontSize: "11px", fontWeight: 600, color: DARK }}>{stat}</span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AIPage() {
  const [activeCard, setActiveCard] = useState<number>(-1);
  const [exitCard,   setExitCard]   = useState<number>(-1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── AP agent carousel ──────────────────────────────────────────────────────
  const [apIdx,      setApIdx]      = useState(0);
  const [apVisible,  setApVisible]  = useState(true);
  const [hoveredPill, setHoveredPill] = useState<number | null>(null);
  const apTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function selectAgent(idx: number) {
    if (idx === apIdx) return;
    setApVisible(false);
    if (apTimerRef.current) clearTimeout(apTimerRef.current);
    apTimerRef.current = setTimeout(() => {
      setApIdx(idx);
      setApVisible(true);
    }, 220);
  }

  const AP_CARD_COMPONENTS = [
    AgentCaptureCard, AgentCodingCard, AgentPOConnectCard,
    AgentCopilotCard, AgentSupplierCard, AgentStatementReconCard, AgentFraudRiskCard,
  ];
  const AP_PILL_LABELS = [
    "Invoice Capture", "Invoice Coding", "PO Connect",
    "Approvals", "Supplier Inquiries", "Statement Reconciliation", "Fraud & Risk",
  ];
  const ActiveAPCard = AP_CARD_COMPONENTS[apIdx];

  const advance = useCallback((current: number) => {
    const next = (current + 1) % 3;
    setExitCard(current);
    setActiveCard(-1);
    timerRef.current = setTimeout(() => {
      setExitCard(-1);
      setActiveCard(next);
      timerRef.current = setTimeout(() => advance(next), HOLD[next]);
    }, 400);
  }, []);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setActiveCard(0);
      timerRef.current = setTimeout(() => advance(0), HOLD[0]);
    }, 900);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [advance]);

  return (
    <main style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
      <Header />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "640px",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: DARK,
        }}
      >
        {/* Right-side hero photo — masked on left edge for smooth blend */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/homepage-hero.jpg"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "-230px",
            top: 0,
            height: "100%",
            width: "62%",
            objectFit: "cover",
            objectPosition: "left top",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 18%, black 38%)",
            maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 18%, black 38%)",
          }}
        />

        {/* Subtle overall darkening so text stays legible over image midtones */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to right, ${DARK} 30%, rgba(47,67,68,0.6) 46%, rgba(47,67,68,0.1) 62%, transparent 78%)`,
          }}
        />

        {/* Content row — left edge aligns with Medius logo (32px padding, max-w-1400) */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 32px",
            display: "flex",
            alignItems: "center",
            gap: "60px",
          }}
        >
          {/* ── Left: headline + CTAs — flush with logo left edge ── */}
          <div style={{ flex: "0 0 500px", paddingLeft: 0 }}>
            {/* Eyebrow */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              marginBottom: "22px", padding: "5px 14px", borderRadius: "9999px",
              border: "1px solid rgba(171,156,109,0.45)",
              background: "rgba(171,156,109,0.10)",
            }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: SAND, flexShrink: 0 }} />
              <span style={{ fontSize: "10.5px", fontWeight: 600, letterSpacing: "1.1px", textTransform: "uppercase", color: SAND }}>
                Trusted AI
              </span>
            </div>

            <h1 style={{
              fontSize: "44px", fontWeight: 700, lineHeight: 1.12,
              letterSpacing: "-1.1px", color: "white",
              marginBottom: "22px",
            }}>
              Autonomous finance,<br />powered by Medius Agents
            </h1>

            <p style={{
              fontSize: "16px", lineHeight: 1.75,
              color: "rgba(255,255,255,0.65)",
              maxWidth: "420px", marginBottom: "36px",
            }}>
              From inform to decide to act, Medius Agents take on more of the work
              across the spend management lifecycle. Finance teams stay in control
              while the system executes within defined policies.
            </p>

            <div style={{ display: "flex", gap: "12px" }}>
              <button style={{
                background: RED, color: "white", border: `2px solid ${RED}`,
                padding: "13px 32px", borderRadius: "9999px",
                fontSize: "13px", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "1px",
                cursor: "pointer", fontFamily: "inherit",
              }}>
                Book a Demo
              </button>
              <button style={{
                background: "transparent", color: "white",
                border: "2px solid rgba(255,255,255,0.45)",
                padding: "13px 32px", borderRadius: "9999px",
                fontSize: "13px", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "1px",
                cursor: "pointer", fontFamily: "inherit",
              }}>
                Explore Platform
              </button>
            </div>
          </div>

          {/* ── Right: cycling agent cards ── */}
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "-280px", marginTop: "30px" }}>
            <div style={{ position: "relative", width: "360px" }}>

              {/* Active label */}
              <div style={{
                height: "26px", marginBottom: "14px",
                display: "flex", alignItems: "center", gap: "10px",
                color: "rgba(255,255,255,0.7)",
                fontSize: "10.5px", fontWeight: 500,
                letterSpacing: "1.2px", textTransform: "uppercase",
                opacity: activeCard >= 0 ? 1 : 0,
                transition: "opacity 0.5s",
              }}>
                <div style={{ width: "20px", height: "1px", background: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
                <span>{activeCard >= 0 ? HERO_LABELS[activeCard] : ""}</span>
              </div>

              {/* Ghost depth cards */}
              <div style={{ position: "relative", height: "280px" }}>
                <div style={{
                  position: "absolute", left: "50%",
                  width: "316px", height: "240px", borderRadius: "14px",
                  background: "white", pointerEvents: "none",
                  transform: "translateX(-50%) translateY(18px) scale(0.92)",
                  opacity: 0.15,
                }} />
                <div style={{
                  position: "absolute", left: "50%",
                  width: "340px", height: "260px", borderRadius: "14px",
                  background: "white", pointerEvents: "none",
                  transform: "translateX(-50%) translateY(9px) scale(0.96)",
                  opacity: 0.35,
                }} />

                <AgentCaptureCard  active={activeCard === 0} exit={exitCard === 0} />
                <AgentFraudRiskCard active={activeCard === 1} exit={exitCard === 1} />
                <AgentSupplierCard  active={activeCard === 2} exit={exitCard === 2} />
              </div>

              {/* Dot indicators */}
              <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginTop: "16px" }}>
                {HERO_LABELS.map((_, i) => (
                  <div key={i} style={{
                    width: activeCard === i ? "20px" : "6px",
                    height: "6px",
                    borderRadius: "3px",
                    background: activeCard === i ? SAND : "rgba(255,255,255,0.3)",
                    transition: "all 0.3s ease",
                  }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Wave out of hero */}
        <div style={{ position: "absolute", bottom: "-1px", left: 0, right: 0, zIndex: 20, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ width: "100%", height: "64px", display: "block" }}>
            <path d="M0,32 C360,64 900,0 1440,40 L1440,64 L0,64 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Recognition Banner ─────────────────────────────────────────────── */}
      <section style={{ background: "white", borderBottom: "1px solid #e8ecec", padding: "36px 32px" }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "flex", alignItems: "center", gap: "40px", flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", flexShrink: 0 }}>
            <div style={{
              width: "48px", height: "48px", borderRadius: "10px", background: DARK,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="white" strokeWidth="1.7" fill="white" fillOpacity="0.15" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: "10.5px", fontWeight: 600, color: SAND, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "2px" }}>
                Ardent Partners · 2026
              </div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: DARK }}>
                Elite Performer in AI &amp; Innovation
              </div>
            </div>
          </div>
          <div style={{ width: "1px", height: "36px", background: "#e0e8e8", flexShrink: 0 }} />
          <p style={{ fontSize: "14px", lineHeight: 1.65, color: "#5a7070", flex: 1, minWidth: "200px", margin: 0 }}>
            Recognised as a Leader and Elite Performer for AI and Innovation in the 2026 AP Automation and Payments Technology Advisor report.
          </p>
          <button style={{
            background: RED, color: "white", border: "none",
            padding: "11px 26px", borderRadius: "9999px",
            fontSize: "12px", fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "1px", cursor: "pointer", fontFamily: "inherit", flexShrink: 0,
          }}>
            Get the Report
          </button>
        </div>
      </section>

      {/* ── AI Native Since 2016 ───────────────────────────────────────────── */}
      <section style={{ background: "#f8f9fa", padding: "96px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 600, color: SAND, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "14px" }}>
                Platform Foundation
              </div>
              <h2 style={{
                fontSize: "clamp(30px, 3.5vw, 44px)", fontWeight: 700,
                lineHeight: 1.1, letterSpacing: "-0.7px", color: DARK, marginBottom: "20px",
              }}>
                AI-native since 2016.<br />
                <span style={{ color: SAND }}>A decade ahead.</span>
              </h2>
              <p style={{ fontSize: "15.5px", lineHeight: 1.75, color: "#5a7070", marginBottom: "16px" }}>
                While others are retrofitting AI onto legacy platforms, Medius has been applying
                machine learning to real financial workflows for nearly a decade.
              </p>
              <p style={{ fontSize: "15.5px", lineHeight: 1.75, color: "#5a7070" }}>
                Every invoice processed, every correction made, and every payment decision improves
                the system. That experience compounds across the platform, making Medius AI more
                accurate, more reliable, and more effective over time.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[
                { value: "10", unit: "years", label: "of AI-native architecture" },
                { value: "100M+", unit: "", label: "invoices in training data" },
                { value: "96%+", unit: "", label: "touchless invoice processing" },
                { value: "24/7", unit: "", label: "autonomous supplier responses" },
              ].map(({ value, unit, label }) => (
                <div key={label} style={{
                  background: "white", border: "1px solid #e0e8e8",
                  borderRadius: "14px", padding: "26px 22px",
                }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "3px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "34px", fontWeight: 800, color: DARK, letterSpacing: "-1px" }}>{value}</span>
                    {unit && <span style={{ fontSize: "15px", fontWeight: 600, color: SAND }}>{unit}</span>}
                  </div>
                  <div style={{ fontSize: "12px", color: "#7a9090", lineHeight: 1.4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Meet the Medius AP Agents ──────────────────────────────────────── */}
      <section style={{ background: "white", padding: "96px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: SAND, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "12px" }}>
              Accounts Payable
            </div>
            <h2 style={{
              fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700,
              lineHeight: 1.1, letterSpacing: "-0.7px", color: DARK, marginBottom: "14px",
            }}>
              Meet the Medius AP Agents
            </h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#5a7070", maxWidth: "540px", margin: "0 auto" }}>
              AP-focused agents that enable autonomous processing and autonomous governance — with finance teams always in control.
            </p>
          </div>

          {/* ── Agent selector pills ── */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "48px" }}>
            {AP_PILL_LABELS.map((pill, i) => {
              const isActive  = apIdx === i;
              const isHovered = hoveredPill === i && !isActive;
              return (
                <button
                  key={i}
                  onClick={() => selectAgent(i)}
                  onMouseEnter={() => setHoveredPill(i)}
                  onMouseLeave={() => setHoveredPill(null)}
                  style={{
                    padding: "9px 20px", borderRadius: "9999px",
                    background: isActive  ? RED
                              : isHovered ? "rgba(218,32,40,0.06)"
                              : "white",
                    color:  isActive  ? "white"
                          : isHovered ? RED
                          : "#5a7070",
                    border: `1px solid ${isActive  ? RED
                                       : isHovered ? "rgba(218,32,40,0.35)"
                                       : "#dde2e2"}`,
                    cursor: "pointer", fontSize: "12.5px", fontWeight: 600,
                    fontFamily: "inherit", transition: "all 0.18s",
                  }}
                >
                  {pill}
                </button>
              );
            })}
          </div>

          {/* ── Active card + description (two-column) ── */}
          <div style={{
            opacity: apVisible ? 1 : 0,
            transition: "opacity 0.22s ease",
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            gap: "64px",
            alignItems: "center",
            maxWidth: "960px",
            margin: "0 auto",
          }}>
            {/* Left: text */}
            <div>
              <div style={{ fontSize: "10px", fontWeight: 700, color: SAND, textTransform: "uppercase", letterSpacing: "1.1px", marginBottom: "10px" }}>
                {AP_AGENTS[apIdx].label}
              </div>
              <h3 style={{ fontSize: "28px", fontWeight: 700, color: DARK, lineHeight: 1.2, letterSpacing: "-0.5px", marginBottom: "16px" }}>
                {AP_AGENTS[apIdx].headline}
              </h3>
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#5a7070", marginBottom: "22px" }}>
                {AP_AGENTS[apIdx].description}
              </p>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                padding: "6px 16px", borderRadius: "9999px",
                background: "rgba(132,152,92,0.10)", border: "1px solid rgba(132,152,92,0.25)",
              }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: MOSS, flexShrink: 0 }} />
                <span style={{ fontSize: "12px", fontWeight: 600, color: DARK }}>{AP_AGENTS[apIdx].stat}</span>
              </div>
            </div>

            {/* Right: card in a positioned container */}
            <div style={{ position: "relative", height: "290px", width: "400px" }}>
              <ActiveAPCard active={apVisible} exit={false} />
            </div>
          </div>

          {/* ── Dot navigation ── */}
          <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginTop: "40px" }}>
            {AP_AGENTS.map((_, i) => (
              <button
                key={i}
                onClick={() => selectAgent(i)}
                style={{
                  width: apIdx === i ? "24px" : "8px", height: "8px",
                  borderRadius: "4px",
                  background: apIdx === i ? SAND : "#dde2e2",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Spend Management Agents ────────────────────────────────────────── */}
      <section style={{ background: "#f8f9fa", padding: "96px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: SAND, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "12px" }}>
              Spend Management
            </div>
            <h2 style={{
              fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700,
              lineHeight: 1.1, letterSpacing: "-0.7px", color: DARK, marginBottom: "14px",
            }}>
              Spend Management Agents
            </h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#5a7070", maxWidth: "540px", margin: "0 auto" }}>
              Extends intelligence beyond AP — automating how and when money moves from approval all the way to settlement.
            </p>
          </div>

          <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            {SM_AGENTS.map(({ icon, label, headline, description, stat }) => (
              <AgentCard key={label} icon={icon} label={label} headline={headline} description={description} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Agent Roadmap ──────────────────────────────────────────────────── */}
      <section style={{ background: DARK, padding: "96px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
            {/* Left: copy */}
            <div>
              <div style={{ fontSize: "11px", fontWeight: 600, color: SAND, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "14px" }}>
                Agent Roadmap
              </div>
              <h2 style={{
                fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700,
                lineHeight: 1.1, letterSpacing: "-0.7px", color: "white", marginBottom: "20px",
              }}>
                We&rsquo;re doubling down<br />
                <span style={{ color: SAND }}>on new agents.</span>
              </h2>
              <p style={{ fontSize: "15.5px", lineHeight: 1.75, color: "rgba(255,255,255,0.65)", marginBottom: "14px" }}>
                From procurement and supplier onboarding, to payments and expense management —
                new agents are being built across the full Medius suite.
              </p>
              <p style={{ fontSize: "15.5px", lineHeight: 1.75, color: "rgba(255,255,255,0.65)", marginBottom: "32px" }}>
                Every part of the spend management lifecycle is getting smarter. The more you use
                Medius, the more there is to hand off.
              </p>
              <button style={{
                background: "transparent", color: "white",
                border: "2px solid rgba(255,255,255,0.45)",
                padding: "12px 30px", borderRadius: "9999px",
                fontSize: "13px", fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "1px", cursor: "pointer", fontFamily: "inherit",
              }}>
                See the Roadmap
              </button>
            </div>

            {/* Right: upcoming agent tiles */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {[
                { label: "Procurement",          body: "Automate PO creation, approvals, and supplier selection." },
                { label: "Supplier Onboarding",   body: "Validate, onboard, and activate new suppliers without manual effort." },
                { label: "Expense Management",    body: "Review, code, and approve employee expenses automatically." },
                { label: "Travel Booking",         body: "Policy-compliant travel booking and reconciliation, end to end." },
                { label: "Contract Intelligence",  body: "Extract obligations, flag renewals, and surface risk automatically." },
                { label: "Cash Flow Forecasting",  body: "Predict payment timing and optimise working capital continuously." },
              ].map(({ label, body }) => (
                <div key={label} style={{
                  padding: "20px 18px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px dashed rgba(255,255,255,0.18)",
                  borderRadius: "14px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <span style={{
                      fontSize: "9px", fontWeight: 700, padding: "2px 8px", borderRadius: "9999px",
                      background: "rgba(171,156,109,0.18)", color: SAND,
                      textTransform: "uppercase", letterSpacing: "0.8px",
                    }}>Coming Soon</span>
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "white", marginBottom: "6px" }}>
                    {label} Agent
                  </div>
                  <p style={{ fontSize: "12px", lineHeight: 1.6, color: "rgba(255,255,255,0.45)", margin: 0 }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Autonomous AP callout + testimonial ───────────────────────────── */}
      <section style={{ background: DARK, padding: "96px 32px" }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center",
        }}>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 600, color: SAND, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "14px" }}>
              Beyond Automation
            </div>
            <h2 style={{
              fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700,
              lineHeight: 1.15, letterSpacing: "-0.6px", color: "white", marginBottom: "18px",
            }}>
              Automated AP is good.<br />
              <span style={{ color: SAND }}>Autonomous AP is everything.</span>
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.75, color: "rgba(255,255,255,0.65)", marginBottom: "14px" }}>
              Traditional automation removes tasks. Medius Agents remove people from processes
              entirely — freeing your team to focus on cash strategy, vendor relationships,
              and the decisions that matter.
            </p>
            <p style={{ fontSize: "15px", lineHeight: 1.75, color: "rgba(255,255,255,0.65)", marginBottom: "32px" }}>
              When every agent learns from every transaction, the system doesn't just maintain
              performance — it continuously improves it.
            </p>
            <button style={{
              background: RED, color: "white", border: `2px solid ${RED}`,
              padding: "13px 32px", borderRadius: "9999px",
              fontSize: "13px", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "1px", cursor: "pointer", fontFamily: "inherit",
            }}>
              Learn More
            </button>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "20px", padding: "38px 34px",
          }}>
            <div style={{ fontSize: "30px", color: SAND, lineHeight: 1, marginBottom: "14px" }}>&ldquo;</div>
            <p style={{ fontSize: "15.5px", lineHeight: 1.75, color: "rgba(255,255,255,0.85)", fontStyle: "italic", marginBottom: "26px" }}>
              Medius provides state-of-the-art AI and machine learning that is superior to the
              system we had in place. It <em>actually</em> grows smarter with every invoice.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "38px", height: "38px", borderRadius: "50%", background: SAND,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "12px", fontWeight: 700, color: "white", flexShrink: 0,
              }}>MW</div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "white" }}>Michael Weare</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Project Manager, Granngården</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ───────────────────────────────────────────────────────── */}
      <section style={{ background: "#f8f9fa", padding: "96px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: SAND, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "12px" }}>
              What you gain
            </div>
            <h2 style={{
              fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700,
              lineHeight: 1.1, letterSpacing: "-0.6px", color: DARK,
            }}>
              Built for finance teams that want more
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {BENEFITS.map(({ icon, title, body }) => (
              <div key={title} style={{
                padding: "28px 24px", background: "white",
                border: "1px solid #e8ecec", borderRadius: "14px",
              }}>
                <div style={{ fontSize: "24px", marginBottom: "12px" }}>{icon}</div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: DARK, marginBottom: "8px" }}>{title}</div>
                <p style={{ fontSize: "13px", lineHeight: 1.65, color: "#5a7070", margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section style={{ background: RED, padding: "80px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 700,
            lineHeight: 1.15, letterSpacing: "-0.5px", color: "white", marginBottom: "14px",
          }}>
            Ready to put Medius Agents to work?
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.82)", marginBottom: "34px" }}>
            See how our agents handle your invoice volume — from capture to payment — in a personalized demo.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{
              background: "white", color: RED, border: "2px solid white",
              padding: "14px 38px", borderRadius: "9999px",
              fontSize: "13px", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "1px", cursor: "pointer", fontFamily: "inherit",
            }}>
              Book a Demo
            </button>
            <button style={{
              background: "transparent", color: "white",
              border: "2px solid rgba(255,255,255,0.55)",
              padding: "14px 38px", borderRadius: "9999px",
              fontSize: "13px", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "1px", cursor: "pointer", fontFamily: "inherit",
            }}>
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
