"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  RED, DARK,
  AP_CAPABILITIES, AP_CAPABILITY_CARDS,
  SM_CAPABILITIES, SM_CAPABILITY_CARDS,
  TAB_CARDS,
} from "./CardComponents";

const HOLD = 4400; // ms each card is shown

// ─── Tab content ──────────────────────────────────────────────────────────────
const TABS = [
  {
    id: "ap-automation",
    label: "AP Automation",
    headline: "Streamline accounts payable and boost cash flow visibility.",
    description:
      "Streamline AP by eliminating paper and manual tasks like data entry, matching, and invoice processing. Gain full visibility into invoices, spend, and cash flow to close your books on time, every time.",
    stats: [
      { value: "96.3%",   label: "touchless processing rate for top performers" },
      { value: "1.4 days", label: "invoice cycle time vs 9.2 day industry average" },
      { value: "6.6×",    label: "faster than the industry average cycle time" },
    ],
  },
  {
    id: "spend-management",
    label: "Spend Management",
    headline: "Total visibility across every dollar spent",
    description:
      "From procurement through T&E, Medius gives finance leaders a single, unified view of company spend. Built-in policy controls prevent budget overruns before they happen — so you spend less time chasing receipts and more time steering the business.",
    stats: [
      { value: "100%",   label: "spend visibility across categories" },
      { value: "40%",    label: "reduction in maverick spend" },
      { value: "2 days", label: "to close vs. industry average of 10" },
    ],
  },
  {
    id: "expenses",
    label: "Expenses",
    headline: "Reimburse employees faster, with less friction.",
    description:
      "Medius automates expense capture, policy enforcement, and reimbursement — so employees get paid quickly and finance teams stay in control. From receipt snap to approval, every step is guided, compliant, and audit-ready.",
    stats: [
      { value: "80%",    label: "reduction in manual expense processing" },
      { value: "2 days", label: "average reimbursement time" },
      { value: "100%",   label: "policy compliance on submission" },
    ],
  },
];

// ─── Stat chip ────────────────────────────────────────────────────────────────
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      <span style={{ fontSize: "26px", fontWeight: 700, color: RED, lineHeight: 1, letterSpacing: "-0.5px" }}>
        {value}
      </span>
      <span style={{ fontSize: "12px", color: "#6b7280", lineHeight: 1.3 }}>
        {label}
      </span>
    </div>
  );
}

// ─── Card stage — mounts fresh on each tab switch via key prop ────────────────
function CardStage({ tabIndex }: { tabIndex: number }) {
  const [activeCard, setActiveCard] = useState<number>(-1);
  const [exitCard,   setExitCard]   = useState<number>(-1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const Cards = TAB_CARDS[tabIndex];
  const count = Cards.length;

  const advance = useCallback((current: number) => {
    const next = (current + 1) % count;
    setExitCard(current);
    setActiveCard(-1);
    timerRef.current = setTimeout(() => {
      setExitCard(-1);
      setActiveCard(next);
      timerRef.current = setTimeout(() => advance(next), HOLD);
    }, 380);
  }, [count]);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setActiveCard(0);
      timerRef.current = setTimeout(() => advance(0), HOLD);
    }, 400);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [advance]);

  const breadcrumb = activeCard !== -1 ? activeCard : exitCard;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
      <div className="tab-card-stage" style={{ position: "relative", width: "360px", height: "320px" }}>
        {Cards.map((CardComponent, i) => (
          <CardComponent
            key={i}
            active={activeCard === i}
            exit={exitCard === i}
            variant="full"
          />
        ))}
      </div>
      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        {Array.from({ length: count }, (_, i) => i).map((i) => (
          <div
            key={i}
            style={{
              height: "3px", borderRadius: "2px",
              width: breadcrumb === i ? "36px" : "20px",
              background: breadcrumb === i ? RED : "#dde0e3",
              transition: "width 0.3s ease, background 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ProductTabsSection() {
  const [active, setActive] = useState(0);
  const [activeCapability, setActiveCapability] = useState(0);
  const [activeSmCapability, setActiveSmCapability] = useState(0);
  const [flowVisible, setFlowVisible] = useState(false);
  const flowRef = useRef<HTMLDivElement>(null);
  const tab     = TABS[active];
  const cap     = AP_CAPABILITIES[activeCapability];
  const CapCard = AP_CAPABILITY_CARDS[activeCapability];

  useEffect(() => {
    const el = flowRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setFlowVisible(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ background: "#f8f9fa", padding: "72px 0 80px" }}>
      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 32px" }}>

        {/* ── Section header ── */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <h2 style={{
            fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, color: DARK,
            lineHeight: 1.15, margin: "0 auto", maxWidth: "820px",
          }}>
            Everything you need to control spend
          </h2>
        </div>

        {/* ── Tab bar ── */}
        <nav role="tablist" style={{
          display: "flex", justifyContent: "center", gap: "6px",
          background: "white", border: "1px solid #e5e7eb", borderRadius: "12px",
          padding: "6px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: "40px",
        }}>
          {TABS.map((t, i) => {
            const isActive = i === active;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{
                  flex: 1, padding: "13px 20px", border: "none", borderRadius: "8px",
                  cursor: "pointer", fontFamily: "var(--font-poppins), sans-serif",
                  fontSize: "14px", fontWeight: 600,
                  transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
                  background: isActive ? RED : "transparent",
                  color: isActive ? "white" : "#374151",
                  boxShadow: isActive ? "0 2px 8px rgba(218,32,40,0.30)" : "none",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </nav>

        {/* ── Tab panel ── */}
        <div
          key={tab.id}
          role="tabpanel"
          style={{
            background: "white", borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            display: "flex", overflow: "hidden",
            animation: "tabFadeIn 0.3s ease",
          }}
        >
          {active === 0 ? (
            /* ── AP Automation: two-row layout ── */
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>

              {/* Row 1 — headline + description, full width */}
              <div style={{ padding: "44px 48px 32px", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{
                  display: "block", marginBottom: "14px",
                  fontSize: "11px", fontWeight: 700, letterSpacing: "1.2px",
                  textTransform: "uppercase", color: RED,
                }}>
                  AP Automation
                </span>
                <h3 style={{
                  fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 700, color: DARK,
                  lineHeight: 1.2, margin: "0 0 12px",
                }}>
                  {tab.headline}
                </h3>
                <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.7, margin: "0 0 28px" }}>
                  {tab.description}
                </p>

                {/* AP flow bar + CTA */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4px" }}>
                  <div ref={flowRef} style={{ display: "flex", alignItems: "center" }}>
                    {[
                      { label: "Capture",   icon: <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M12 3l7 7M12 3v7h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/> },
                      { label: "Match",     icon: <><path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M8 4l-4 4 4 4M16 12l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></> },
                      { label: "Approve",   icon: <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/> },
                      { label: "Pay",       icon: <><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none"/><path d="M2 10h20" stroke="currentColor" strokeWidth="1.8"/></> },
                      { label: "Reconcile", icon: <><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/><path d="M3 3v5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></> },
                    ].map(({ label, icon }, i) => (
                      <div key={label} style={{ display: "flex", alignItems: "center" }}>
                        <div style={{
                          display: "flex", alignItems: "center", gap: "7px",
                          opacity: flowVisible ? 1 : 0,
                          transform: flowVisible ? "translateX(0)" : "translateX(-16px)",
                          transition: flowVisible
                            ? `opacity 0.4s ease ${i * 0.13}s, transform 0.4s ease ${i * 0.13}s`
                            : "none",
                        }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" style={{ color: DARK, flexShrink: 0 }}>
                            {icon}
                          </svg>
                          <span style={{ fontSize: "13px", fontWeight: 700, color: DARK, whiteSpace: "nowrap" }}>
                            {label}
                          </span>
                        </div>
                        {i < 4 && (
                          <div style={{
                            padding: "0 12px",
                            opacity: flowVisible ? 1 : 0,
                            transition: flowVisible ? `opacity 0.3s ease ${i * 0.13 + 0.1}s` : "none",
                          }}>
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                              <path d="M4 8h8M9 5l3 3-3 3" stroke={RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <a
                    href="https://www.medius.com/solutions/medius-accounts-payable-automation/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ap-cap-link"
                    style={{ flexShrink: 0, marginLeft: "20px" }}
                  >
                    Explore AP Automation
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke={RED} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Row 2 — capability nav (left) + detail card (right) */}
              <div style={{ display: "flex", flex: 1 }}>

                {/* Left — capability list */}
                <div style={{
                  flex: "0 0 38%",
                  padding: "24px 0 32px 48px",
                  borderRight: "1px solid #f0f0f0",
                  display: "flex", flexDirection: "column",
                }}>
                  {AP_CAPABILITIES.map((cap, i) => (
                    <div
                      key={cap.id}
                      onMouseEnter={() => setActiveCapability(i)}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "9px 14px 9px 12px",
                        cursor: "pointer",
                        borderLeft: activeCapability === i ? `3px solid ${RED}` : "3px solid transparent",
                        background: activeCapability === i ? "#fff5f5" : "transparent",
                        borderRadius: "0 8px 8px 0",
                        transition: "background 0.15s ease, border-color 0.15s ease",
                        marginRight: "16px",
                      }}
                    >
                      <span style={{
                        fontSize: "13px", fontWeight: 600,
                        color: activeCapability === i ? RED : "#374151",
                        transition: "color 0.15s ease",
                      }}>
                        {cap.label}
                      </span>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
                        style={{ opacity: activeCapability === i ? 1 : 0.3, transition: "opacity 0.15s ease", flexShrink: 0 }}>
                        <path d="M6 4l4 4-4 4" stroke={activeCapability === i ? RED : "#374151"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  ))}
                </div>

                {/* Right — detail panel */}
                <div style={{
                  flex: 1, padding: "32px 48px 40px",
                  display: "flex", flexDirection: "column",
                  justifyContent: "center", alignItems: "flex-start",
                }}>
                  <div
                    key={activeCapability}
                    style={{ width: "360px", display: "flex", flexDirection: "column", animation: "capFadeIn 0.2s ease" }}
                  >
                    <span style={{
                      fontSize: "11px", fontWeight: 700, letterSpacing: "1px",
                      textTransform: "uppercase", color: RED,
                      marginBottom: "8px", display: "block",
                    }}>
                      {cap.label}
                    </span>
                    <h4 style={{
                      fontSize: "clamp(18px, 1.8vw, 22px)", fontWeight: 700, color: DARK,
                      lineHeight: 1.2, margin: "0 0 10px",
                    }}>
                      {cap.title}
                    </h4>
                    <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: 1.7, margin: "0 0 20px" }}>
                      {cap.shortDescription}
                    </p>
                    <div className="ap-cap-detail" style={{ marginBottom: "16px" }}>
                      <CapCard active={true} exit={false} variant="full" />
                    </div>
                    <a href={cap.url} target="_blank" rel="noopener noreferrer" className="ap-cap-link">
                      Explore {cap.label}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke={RED} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ) : active === 1 ? (
            /* ── Spend Management: same two-row layout as AP Automation ── */
            (() => {
              const smCap  = SM_CAPABILITIES[activeSmCapability];
              const SmCard = SM_CAPABILITY_CARDS[activeSmCapability];
              return (
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>

                  {/* Row 1 — headline + description */}
                  <div style={{ padding: "44px 48px 32px", borderBottom: "1px solid #f0f0f0" }}>
                    <span style={{
                      display: "block", marginBottom: "14px",
                      fontSize: "11px", fontWeight: 700, letterSpacing: "1.2px",
                      textTransform: "uppercase", color: RED,
                    }}>
                      Spend Management
                    </span>
                    <h3 style={{
                      fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 700, color: DARK,
                      lineHeight: 1.2, margin: "0 0 12px",
                    }}>
                      {tab.headline}
                    </h3>
                    <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.7, margin: "0 0 28px" }}>
                      {tab.description}
                    </p>

                    {/* SM flow bar */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4px" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {[
                          { label: "Source",   icon: <path d="M11 3H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h6m4-8-4-4m4 4H9m4 0v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/> },
                          { label: "Contract", icon: <><rect x="3" y="2" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="none"/><path d="M6 6h4M6 9h4M6 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></> },
                          { label: "Onboard",  icon: <><circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.8" fill="none"/><path d="M3 14c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/></> },
                          { label: "Purchase", icon: <><path d="M2 3h2l2 8h7l1-5H5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/><circle cx="9" cy="14" r="1" fill="currentColor"/><circle cx="13" cy="14" r="1" fill="currentColor"/></> },
                        ].map(({ label, icon }, i) => (
                          <div key={label} style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                              <svg width="16" height="16" viewBox="0 0 16 16" style={{ color: DARK, flexShrink: 0 }}>{icon}</svg>
                              <span style={{ fontSize: "13px", fontWeight: 700, color: DARK, whiteSpace: "nowrap" }}>{label}</span>
                            </div>
                            {i < 3 && (
                              <div style={{ padding: "0 12px" }}>
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                  <path d="M4 8h8M9 5l3 3-3 3" stroke={RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <a
                        href="https://www.medius.com/solutions/spend-management/"
                        target="_blank" rel="noopener noreferrer"
                        className="ap-cap-link" style={{ flexShrink: 0, marginLeft: "20px" }}
                      >
                        Explore Spend Management
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke={RED} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Row 2 — capability nav (left) + detail card (right) */}
                  <div style={{ display: "flex", flex: 1 }}>

                    {/* Left — capability list */}
                    <div style={{
                      flex: "0 0 38%", padding: "24px 0 32px 48px",
                      borderRight: "1px solid #f0f0f0",
                      display: "flex", flexDirection: "column",
                    }}>
                      {SM_CAPABILITIES.map((c, i) => (
                        <div
                          key={c.id}
                          onMouseEnter={() => setActiveSmCapability(i)}
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "9px 14px 9px 12px", cursor: "pointer",
                            borderLeft: activeSmCapability === i ? `3px solid ${RED}` : "3px solid transparent",
                            background: activeSmCapability === i ? "#fff5f5" : "transparent",
                            borderRadius: "0 8px 8px 0",
                            transition: "background 0.15s ease, border-color 0.15s ease",
                            marginRight: "16px",
                          }}
                        >
                          <span style={{
                            fontSize: "13px", fontWeight: 600,
                            color: activeSmCapability === i ? RED : "#374151",
                            transition: "color 0.15s ease",
                          }}>
                            {c.label}
                          </span>
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
                            style={{ opacity: activeSmCapability === i ? 1 : 0.3, transition: "opacity 0.15s ease", flexShrink: 0 }}>
                            <path d="M6 4l4 4-4 4" stroke={activeSmCapability === i ? RED : "#374151"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      ))}
                    </div>

                    {/* Right — detail panel */}
                    <div style={{
                      flex: 1, padding: "32px 48px 40px",
                      display: "flex", flexDirection: "column",
                      justifyContent: "center", alignItems: "flex-start",
                    }}>
                      <div
                        key={activeSmCapability}
                        style={{ width: "360px", display: "flex", flexDirection: "column", animation: "capFadeIn 0.2s ease" }}
                      >
                        <span style={{
                          fontSize: "11px", fontWeight: 700, letterSpacing: "1px",
                          textTransform: "uppercase", color: RED,
                          marginBottom: "8px", display: "block",
                        }}>
                          {smCap.label}
                        </span>
                        <h4 style={{
                          fontSize: "clamp(18px, 1.8vw, 22px)", fontWeight: 700, color: DARK,
                          lineHeight: 1.2, margin: "0 0 10px",
                        }}>
                          {smCap.title}
                        </h4>
                        <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: 1.7, margin: "0 0 20px" }}>
                          {smCap.shortDescription}
                        </p>
                        <div className="ap-cap-detail" style={{ marginBottom: "16px" }}>
                          <SmCard active={true} exit={false} variant="full" />
                        </div>
                        <a href={smCap.url} target="_blank" rel="noopener noreferrer" className="ap-cap-link">
                          Explore {smCap.label}
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke={RED} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })()
          ) : (
            /* ── Expenses: headline + card stage ── */
            <>
              <div style={{
                flex: "0 0 55%", padding: "52px 52px 52px 56px",
                display: "flex", flexDirection: "column", justifyContent: "center", gap: "24px",
              }}>
                <h3 style={{
                  fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 700, color: DARK,
                  lineHeight: 1.2, margin: 0,
                }}>
                  {tab.headline}
                </h3>
                <p style={{ fontSize: "16px", color: "#4b5563", lineHeight: 1.7, margin: 0 }}>
                  {tab.description}
                </p>
                <div style={{ paddingTop: "4px" }}>
                  <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 600, color: RED, textDecoration: "none" }}>
                    Learn more
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke={RED} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div style={{
                flex: "0 0 45%", display: "flex", alignItems: "center",
                justifyContent: "center", padding: "40px 40px 32px 0",
              }}>
                <CardStage key={active} tabIndex={active - 1} />
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes tabFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes capFadeIn {
          from { opacity: 0; transform: translateX(8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes flowStepIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ap-cap-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600; color: #da2028; text-decoration: none;
          padding: 9px 14px 9px 12px;
          border-left: 3px solid transparent;
          border-radius: 0 8px 8px 0;
          transition: background 0.15s ease, border-color 0.15s ease;
        }
        .ap-cap-link:hover {
          background: #fff5f5;
          border-left-color: #da2028;
        }
        /* Horizontal slide + fixed equal height for the tab card stage */
        .tab-card-stage .ap-card {
          transform: translateX(calc(-50% + 56px));
          height: 320px;
          overflow: hidden;
        }
        .tab-card-stage .ap-card.ap-card--on {
          transform: translateX(-50%);
        }
        .tab-card-stage .ap-card.ap-card--exit {
          transform: translateX(calc(-50% - 56px));
        }
        /* Override absolute positioning when ap-card renders in the capability detail panel */
        .ap-cap-detail .ap-card {
          position: static;
          width: 360px;
          left: auto;
          transform: none;
          opacity: 1;
          pointer-events: auto;
          transition: none;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04);
          height: 320px;
          overflow: hidden;
        }
        .ap-cap-detail .ap-card.ap-card--on,
        .ap-cap-detail .ap-card.ap-card--exit {
          transform: none;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
