"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";

const RED  = "#da2028";
const DARK = "#2f4344";
const SAND = "#ab9c6d";
const MOSS = "#84985c";

// ─── Data ─────────────────────────────────────────────────────────────────────

const DIMENSIONS = [
  {
    id: "visibility",
    label: "Visibility & Control",
    shortLabel: "Visibility",
    description: "How much real-time insight do you have into payment status, cash position, and who approved what?",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
    questions: [
      {
        q: "How do you track your live cash and payment position?",
        options: [
          { level: 1, text: "We check multiple bank portals manually — no single view exists" },
          { level: 2, text: "We have centralized reporting, but data can lag by a day or more" },
          { level: 3, text: "Real-time dashboard shows all payment and cash positions in one place" },
        ],
      },
      {
        q: "How are payment approvals managed?",
        options: [
          { level: 1, text: "Informally — approvals often happen after payments are already initiated" },
          { level: 2, text: "Approval hierarchies exist, but are enforced manually via email" },
          { level: 3, text: "System-enforced with role-based controls and a full, instant audit trail" },
        ],
      },
      {
        q: "How quickly can you produce a payment audit trail?",
        options: [
          { level: 1, text: "It takes significant effort, pulling data from multiple disconnected systems" },
          { level: 2, text: "We can produce one, but it takes time and may have gaps" },
          { level: 3, text: "Audit trails are always available instantly — continuously and automatically maintained" },
        ],
      },
    ],
  },
  {
    id: "efficiency",
    label: "Efficiency & Eliminating Manual Work",
    shortLabel: "Efficiency",
    description: "How automated is your end-to-end payment process, from payment run creation through to reconciliation?",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    questions: [
      {
        q: "How are payment files created and submitted to your bank?",
        options: [
          { level: 1, text: "Built manually from spreadsheets and uploaded to bank portals by hand" },
          { level: 2, text: "Generated from our ERP, but manual upload steps remain" },
          { level: 3, text: "Automatically created and sent directly to banks — no manual steps" },
        ],
      },
      {
        q: "How do you handle payment reconciliation?",
        options: [
          { level: 1, text: "Manually matched on spreadsheets — slow, error-prone, and resource-intensive" },
          { level: 2, text: "Periodic reconciliation with structured review, but largely still manual" },
          { level: 3, text: "System-matched automatically — only genuine exceptions need human attention" },
        ],
      },
      {
        q: "How well do you capture early payment discounts?",
        options: [
          { level: 1, text: "We miss most discounts because our process is too slow to act in time" },
          { level: 2, text: "We capture some discounts but inconsistently" },
          { level: 3, text: "We systematically optimize payment timing to capture discounts and improve DPO" },
        ],
      },
    ],
  },
  {
    id: "risk",
    label: "Risk & Fraud",
    shortLabel: "Risk & Fraud",
    description: "How protected is your organization against payment fraud, and how proactively do you manage payment risk?",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l7 4v6c0 4.5-3 8.7-7 10-4-1.3-7-5.5-7-10V6l7-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    questions: [
      {
        q: "How do you verify supplier bank account changes?",
        options: [
          { level: 1, text: "Email confirmation only — no automated verification or system control" },
          { level: 2, text: "Manual approval process, but no automated system validation" },
          { level: 3, text: "Bank changes trigger automated verification workflows with multi-party sign-off" },
        ],
      },
      {
        q: "How do you detect duplicate or fraudulent payments?",
        options: [
          { level: 1, text: "We rely on staff vigilance — no automated controls in place" },
          { level: 2, text: "Some duplicate checks exist in our ERP, but blind spots remain" },
          { level: 3, text: "AI-powered detection flags anomalies in real time, before payments execute" },
        ],
      },
      {
        q: "How are unusual or suspicious transactions handled?",
        options: [
          { level: 1, text: "Typically discovered after the fact — during reconciliation or audit" },
          { level: 2, text: "Review checkpoints exist, but detection is reactive rather than preventive" },
          { level: 3, text: "Unusual transactions are automatically blocked and investigated before payment" },
        ],
      },
    ],
  },
];

const PROFILES: { min: number; max: number; label: string; tagline: string; description: string; actions: string[] }[] = [
  {
    min: 1.0, max: 1.6,
    label: "Fragmented",
    tagline: "Manual execution, limited visibility, high exposure.",
    description: "Payment execution is largely manual and decentralized. Bank portals are accessed directly, approvals are informal, and fraud detection is reactive. This creates high operational risk and leaves significant efficiency gains on the table.",
    actions: [
      "Centralize payment execution into a single platform",
      "Introduce system-enforced approval workflows",
      "Implement basic duplicate and fraud detection controls",
    ],
  },
  {
    min: 1.7, max: 2.3,
    label: "Developing",
    tagline: "Processes are defined but inconsistently enforced.",
    description: "You have structured processes and ERP integration, but manual touchpoints, delayed data, and reactive risk controls still create exposure. The foundations are there — now it's about automating execution and closing the control gaps.",
    actions: [
      "Automate bank submission and reconciliation end-to-end",
      "Move from manual to real-time cash visibility",
      "Upgrade from reactive to automated fraud detection",
    ],
  },
  {
    min: 2.4, max: 3.0,
    label: "Optimized",
    tagline: "Centralized, automated, and in continuous control.",
    description: "Your payment operations are highly automated, with real-time visibility and proactive controls. Fraud is stopped before it executes, reconciliation happens automatically, and cash decisions are driven by live intelligence.",
    actions: [
      "Continuously refine anomaly detection with AI insights",
      "Explore dynamic discounting and supply chain finance",
      "Use payment intelligence to drive strategic working capital decisions",
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getProfile(score: number) {
  return PROFILES.find((p) => score >= p.min && score <= p.max) ?? PROFILES[0];
}

function scoreColor(score: number) {
  if (score >= 2.4) return MOSS;
  if (score >= 1.7) return SAND;
  return RED;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function DimIcon({ icon, color }: { icon: React.ReactNode; color: string }) {
  return (
    <div style={{
      width: "44px", height: "44px", borderRadius: "12px", flexShrink: 0,
      background: `${color}15`, color,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {icon}
    </div>
  );
}

function ScoreBar({ score, answered }: { score: number; answered: number }) {
  const pct = answered === 0 ? 0 : ((score - 1) / 2) * 100;
  const color = answered === 0 ? "#e5e7eb" : scoreColor(score);
  return (
    <div style={{ height: "6px", background: "#f0f0f0", borderRadius: "3px", overflow: "hidden" }}>
      <div style={{
        height: "100%", borderRadius: "3px", background: color,
        width: `${pct}%`,
        transition: "width 0.5s ease, background 0.3s ease",
      }} />
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PaymentMaturityPage() {
  // answers[dimIndex][qIndex] = level (1|2|3) or 0 = unanswered
  const [answers, setAnswers] = useState<number[][]>(
    DIMENSIONS.map((d) => d.questions.map(() => 0))
  );
  const resultsRef = useRef<HTMLDivElement>(null);

  const setAnswer = (dimIdx: number, qIdx: number, level: number) => {
    setAnswers((prev) => {
      const next = prev.map((d) => [...d]);
      next[dimIdx][qIdx] = level;
      return next;
    });
  };

  // Per-dimension score (avg of answered, or 0 if none)
  const dimScores = answers.map((qs) => {
    const answered = qs.filter((v) => v > 0);
    return answered.length === 0 ? 0 : answered.reduce((a, b) => a + b, 0) / answered.length;
  });

  // Answered count per dimension
  const dimAnswered = answers.map((qs) => qs.filter((v) => v > 0).length);

  // Overall score (only dimensions with at least one answer)
  const answeredDims = dimScores.filter((_, i) => dimAnswered[i] > 0);
  const overallScore = answeredDims.length === 0 ? 0 : answeredDims.reduce((a, b) => a + b, 0) / answeredDims.length;

  const totalAnswered = dimAnswered.reduce((a, b) => a + b, 0);
  const totalQuestions = DIMENSIONS.reduce((a, d) => a + d.questions.length, 0);
  const allDone = totalAnswered === totalQuestions;

  // Scroll to results when complete
  useEffect(() => {
    if (allDone && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [allDone]);

  const profile = allDone ? getProfile(overallScore) : null;

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", fontFamily: "var(--font-poppins), sans-serif" }}>
      <Header />

      {/* ── Hero ── */}
      <div style={{
        backgroundImage: "url(/images/medius-light-sand-background-6.jpg)",
        backgroundSize: "cover", backgroundPosition: "center",
        padding: "80px 32px 120px",
      }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{
            display: "inline-block", fontSize: "11px", fontWeight: 700,
            letterSpacing: "1.2px", textTransform: "uppercase",
            color: SAND, marginBottom: "18px",
          }}>
            Payment Execution · Maturity Assessment
          </div>
          <h1 style={{
            fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: DARK,
            lineHeight: 1.1, letterSpacing: "-0.5px", margin: "0 0 18px",
          }}>
            Where does your payment<br />control really stand?
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(47,67,68,0.72)", lineHeight: 1.7, margin: "0 0 32px", maxWidth: "580px" }}>
            Answer 9 questions across three dimensions to benchmark your payment maturity and see where to focus next.
          </p>

          {/* Progress bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", maxWidth: "480px" }}>
            <div style={{ flex: 1, height: "6px", background: "rgba(47,67,68,0.15)", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{
                height: "100%", background: RED, borderRadius: "3px",
                width: `${(totalAnswered / totalQuestions) * 100}%`,
                transition: "width 0.4s ease",
              }} />
            </div>
            <span style={{ fontSize: "13px", color: "rgba(47,67,68,0.55)", whiteSpace: "nowrap" }}>
              {totalAnswered} / {totalQuestions} answered
            </span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ position: "relative" }}>
        {/* Wave blend from hero */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, width: "100%", overflow: "hidden", lineHeight: 0, transform: "translateY(-99%) scaleX(-1)", pointerEvents: "none" }}>
          <svg style={{ display: "block", width: "100%", height: "64px" }} viewBox="0 0 1512 160" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-0.00012207 160V26.2023C118.348 14.5718 260.76 8.19165 429.194 2.59521C823.48 -10.5054 1218.72 25.6423 1512 118.946L1512 160L-0.00012207 160Z" fill="#f8f9fa"/>
          </svg>
        </div>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 32px 80px", display: "flex", gap: "40px", alignItems: "flex-start" }}>

        {/* ── Left: questions ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "32px" }}>
          {DIMENSIONS.map((dim, dIdx) => (
            <div key={dim.id} style={{
              background: "white", borderRadius: "16px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
              overflow: "hidden",
            }}>
              {/* Dimension header */}
              <div style={{ padding: "24px 28px 20px", borderBottom: "1px solid #f0f0f0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "8px" }}>
                  <DimIcon icon={dim.icon} color={RED} />
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: RED, marginBottom: "3px" }}>
                      Dimension {dIdx + 1} of 3
                    </div>
                    <h2 style={{ fontSize: "18px", fontWeight: 700, color: DARK, margin: 0, lineHeight: 1.2 }}>
                      {dim.label}
                    </h2>
                  </div>
                </div>
                <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6, margin: "0 0 0 58px" }}>
                  {dim.description}
                </p>
              </div>

              {/* Questions */}
              <div style={{ padding: "20px 28px 24px", display: "flex", flexDirection: "column", gap: "24px" }}>
                {dim.questions.map((q, qIdx) => {
                  const selected = answers[dIdx][qIdx];
                  return (
                    <div key={qIdx}>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: DARK, marginBottom: "10px", lineHeight: 1.4 }}>
                        {qIdx + 1}. {q.q}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                        {q.options.map((opt) => {
                          const isSelected = selected === opt.level;
                          return (
                            <button
                              key={opt.level}
                              onClick={() => setAnswer(dIdx, qIdx, opt.level)}
                              style={{
                                display: "flex", alignItems: "flex-start", gap: "12px",
                                padding: "12px 14px",
                                border: isSelected ? `2px solid ${RED}` : "2px solid #e5e7eb",
                                borderRadius: "10px",
                                background: isSelected ? "#fff5f5" : "white",
                                cursor: "pointer", textAlign: "left",
                                transition: "border-color 0.15s, background 0.15s",
                                width: "100%",
                              }}
                            >
                              {/* Radio circle */}
                              <div style={{
                                width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0, marginTop: "1px",
                                border: isSelected ? `5px solid ${RED}` : "2px solid #d1d5db",
                                background: "white",
                                transition: "border 0.15s",
                              }} />
                              <div style={{ flex: 1 }}>
                                <span style={{
                                  display: "inline-block", fontSize: "10px", fontWeight: 700,
                                  color: isSelected ? RED : "#9ca3af",
                                  textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "2px",
                                }}>
                                  Level {opt.level}
                                </span>
                                <div style={{ fontSize: "13px", color: isSelected ? "#111" : "#4b5563", lineHeight: 1.5 }}>
                                  {opt.text}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Right: sticky scorecard ── */}
        <div style={{ width: "280px", flexShrink: 0, position: "sticky", top: "32px" }}>
          <div style={{
            background: "white", borderRadius: "16px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
            overflow: "hidden",
          }}>
            <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #f0f0f0" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: RED, marginBottom: "6px" }}>
                Your Score
              </div>

              {/* Overall score */}
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "4px" }}>
                <span style={{
                  fontSize: "48px", fontWeight: 800, lineHeight: 1,
                  color: overallScore === 0 ? "#e5e7eb" : scoreColor(overallScore),
                  transition: "color 0.4s ease",
                }}>
                  {overallScore === 0 ? "–" : overallScore.toFixed(1)}
                </span>
                <span style={{ fontSize: "16px", color: "#9ca3af" }}>/3</span>
              </div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: DARK, marginBottom: "2px" }}>
                {overallScore === 0 ? "Complete the assessment" :
                  overallScore >= 2.4 ? "Optimized" :
                  overallScore >= 1.7 ? "Developing" : "Fragmented"}
              </div>
              <div style={{ fontSize: "11px", color: "#9ca3af" }}>
                {totalAnswered} of {totalQuestions} questions answered
              </div>
            </div>

            {/* Per-dimension breakdown */}
            <div style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: "14px" }}>
              {DIMENSIONS.map((dim, dIdx) => (
                <div key={dim.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: DARK }}>{dim.shortLabel}</span>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: dimAnswered[dIdx] === 0 ? "#d1d5db" : scoreColor(dimScores[dIdx]) }}>
                      {dimAnswered[dIdx] === 0 ? "–" : dimScores[dIdx].toFixed(1)}
                    </span>
                  </div>
                  <ScoreBar score={dimScores[dIdx]} answered={dimAnswered[dIdx]} />
                  <div style={{ fontSize: "10px", color: "#9ca3af", marginTop: "3px" }}>
                    {dimAnswered[dIdx]}/{dim.questions.length} answered
                  </div>
                </div>
              ))}
            </div>

            {/* Level legend */}
            <div style={{ padding: "14px 20px", borderTop: "1px solid #f0f0f0", display: "flex", flexDirection: "column", gap: "6px" }}>
              {[
                { label: "Fragmented", range: "1.0 – 1.6", color: RED  },
                { label: "Developing",  range: "1.7 – 2.3", color: SAND },
                { label: "Optimized",   range: "2.4 – 3.0", color: MOSS },
              ].map(({ label, range, color }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color }} />
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "#374151" }}>{label}</span>
                  </div>
                  <span style={{ fontSize: "10px", color: "#9ca3af" }}>{range}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>{/* end position:relative body wrapper */}

      {/* ── Results panel ── */}
      {allDone && profile && (
        <div ref={resultsRef} style={{ background: "#f0f3f2", padding: "64px 32px 72px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

            {/* Overall result */}
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                background: "rgba(47,67,68,0.08)", borderRadius: "100px",
                padding: "6px 18px 6px 10px", marginBottom: "20px",
              }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: scoreColor(overallScore), display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "white" }}>{overallScore.toFixed(1)}</span>
                </div>
                <span style={{ fontSize: "13px", fontWeight: 600, color: DARK }}>
                  Overall maturity score
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: DARK, lineHeight: 1.1, margin: "0 0 14px", letterSpacing: "-0.5px" }}>
                Your payment execution is{" "}
                <span style={{ color: scoreColor(overallScore) }}>{profile.label}</span>
              </h2>
              <p style={{ fontSize: "16px", color: "#5a6e6f", lineHeight: 1.7, maxWidth: "620px", margin: "0 auto" }}>
                {profile.description}
              </p>
            </div>

            {/* Dimension results grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "48px" }}>
              {DIMENSIONS.map((dim, dIdx) => {
                const score = dimScores[dIdx];
                const dimProfile = getProfile(score);
                const color = scoreColor(score);
                return (
                  <div key={dim.id} style={{
                    background: "white", borderRadius: "14px",
                    padding: "24px", border: "1px solid #dde3e3",
                    boxShadow: "0 2px 8px rgba(47,67,68,0.06)",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                      <div style={{ color: "#9aacad" }}>{dim.icon}</div>
                      <div style={{ fontSize: "22px", fontWeight: 800, color, lineHeight: 1 }}>
                        {score.toFixed(1)}
                      </div>
                    </div>
                    <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "#8a9ea0", marginBottom: "4px" }}>
                      {dim.label}
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: 700, color, marginBottom: "8px" }}>
                      {dimProfile.label}
                    </div>
                    <div style={{ height: "4px", background: "#e4eaea", borderRadius: "2px", overflow: "hidden", marginBottom: "12px" }}>
                      <div style={{ height: "100%", background: color, width: `${((score - 1) / 2) * 100}%`, borderRadius: "2px", transition: "width 0.6s ease" }} />
                    </div>
                    <p style={{ fontSize: "12px", color: "#6b7e80", lineHeight: 1.5, margin: 0 }}>
                      {dimProfile.tagline}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Recommended actions */}
            <div style={{
              background: "white", borderRadius: "16px",
              padding: "32px 36px", border: "1px solid #dde3e3",
              boxShadow: "0 2px 8px rgba(47,67,68,0.06)",
              display: "flex", gap: "40px", alignItems: "flex-start",
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", color: SAND, marginBottom: "12px" }}>
                  Recommended next steps
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {profile.actions.map((action, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <div style={{
                        width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
                        background: RED, display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1px",
                      }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "white" }}>{i + 1}</span>
                      </div>
                      <span style={{ fontSize: "14px", color: DARK, lineHeight: 1.5 }}>{action}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
                <a
                  href="https://www.medius.com/contact/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    background: RED, color: "white",
                    padding: "13px 24px", borderRadius: "8px",
                    fontSize: "14px", fontWeight: 700,
                    textDecoration: "none",
                    boxShadow: "0 4px 16px rgba(218,32,40,0.25)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Talk to Medius
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <button
                  onClick={() => {
                    setAnswers(DIMENSIONS.map((d) => d.questions.map(() => 0)));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    background: "transparent", color: "#6b7e80",
                    padding: "13px 24px", borderRadius: "8px",
                    fontSize: "13px", fontWeight: 600,
                    border: "1px solid #dde3e3",
                    cursor: "pointer", whiteSpace: "nowrap",
                  }}
                >
                  Start over
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Report CTA ── */}
      <div style={{ background: SAND, padding: "72px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "64px", alignItems: "center" }}>
          {/* Stat */}
          <div style={{ flexShrink: 0, textAlign: "center", minWidth: "200px" }}>
            <div style={{ fontSize: "clamp(52px, 6vw, 80px)", fontWeight: 800, color: DARK, lineHeight: 1, letterSpacing: "-2px" }}>34%</div>
            <div style={{ fontSize: "14px", color: "rgba(47,67,68,0.7)", lineHeight: 1.5, marginTop: "10px", maxWidth: "180px" }}>
              of AP departments reported a B2B payment fraud attack last year
            </div>
          </div>
          {/* Divider */}
          <div style={{ width: "1px", alignSelf: "stretch", background: "rgba(47,67,68,0.2)", flexShrink: 0 }} />
          {/* Copy + CTA */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "rgba(47,67,68,0.6)", marginBottom: "14px" }}>
              Ardent Partners · Industry Report
            </div>
            <h2 style={{ fontSize: "clamp(20px, 2.5vw, 30px)", fontWeight: 800, color: DARK, lineHeight: 1.2, margin: "0 0 14px", letterSpacing: "-0.3px" }}>
              Are inefficient vendor payments costing you more than money?
            </h2>
            <p style={{ fontSize: "15px", color: "rgba(47,67,68,0.72)", lineHeight: 1.7, margin: "0 0 28px", maxWidth: "520px" }}>
              The Ardent Partners <em>Pulse of B2B Payments</em> report reveals the state of enterprise payment operations — and how to turn efficiency into real bottom-line impact.
            </p>
            <a
              href="https://www.medius.com/resources/guides-reports/ardent-partners-pulse-on-b2b-payments-in-2024/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: DARK, color: "white",
                padding: "13px 24px", borderRadius: "8px",
                fontSize: "14px", fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Get the report
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        button { font-family: var(--font-poppins), sans-serif; }
      `}</style>
    </div>
  );
}
