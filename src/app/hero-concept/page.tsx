"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Header from "@/components/Header";

// ─── Card metadata ─────────────────────────────────────────────────
const LABELS = ["AP Automation", "Fraud & Risk Detection", "Supplier Conversations"];
const HOLD   = [5300, 5300, 5300]; // ms each card stays visible (~16s total)

// ─── Shared card chrome (header row) ───────────────────────────────
function CardHeader({
  title, step, active,
}: { title: string; step: string; active: boolean }) {
  return (
    <div className="flex items-center gap-[10px] mb-[18px]">
      <div className="target-icon-wrap">
        <div className={`target-icon-orb ${active ? "visible" : ""}`} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/target.svg"
          alt=""
          aria-hidden="true"
          key={active ? "on" : "off"}
          className={`target-icon-svg ${active ? "animate-in" : ""}`}
        />
      </div>
      <span className="text-[12px] font-semibold flex-1 tracking-[0.1px]" style={{ color: "#2f4344" }}>
        {title}
      </span>
      <span className="text-[10px] font-medium" style={{ color: "#c0c0c0" }}>
        {step}
      </span>
    </div>
  );
}

// ─── Card 1: Invoice Received ───────────────────────────────────────
function Card1({ active, exit }: { active: boolean; exit: boolean }) {
  return (
    <div className={`ap-card ${active ? "ap-card--on" : ""} ${exit ? "ap-card--exit" : ""}`}>
      <CardHeader icon="📄" iconBg="rgba(218,32,40,0.10)" title="New Invoice" step="1 of 4" />
      <div className="flex justify-between items-baseline mb-[5px]">
        <span className="text-[15px] font-bold" style={{ color: "#111" }}>Acme Corp</span>
        <span className="text-[18px] font-bold" style={{ color: "#111" }}>$12,450</span>
      </div>
      <div className="text-[11px] mb-[16px]" style={{ color: "#aaa" }}>
        Invoice #INV-2891 &nbsp;·&nbsp; Received just now
      </div>
      <span className="inline-flex items-center gap-[5px] px-[11px] py-[4px] rounded-full text-[11px] font-semibold"
        style={{ background: "#eff6ff", color: "#1d4ed8" }}>
        <span className="w-[5px] h-[5px] rounded-full" style={{ background: "currentColor" }} />
        AI processing
      </span>
    </div>
  );
}

// ─── Card 1: Invoice Processing ─────────────────────────────────────
const STEPS = [
  { label: "Capture",   detail: "Vendor, amount, PO extracted" },
  { label: "Match",     detail: "PO-8821 · 3-way match ✓" },
  { label: "Auto-code", detail: "GL 6200-AP assigned" },
  { label: "Approve",   detail: "Routed to AP Manager" },
];

function Card2({ active, exit, barGo }: { active: boolean; exit: boolean; barGo: boolean }) {
  return (
    <div className={`ap-card ${active ? "ap-card--on" : ""} ${exit ? "ap-card--exit" : ""}`}>
      <CardHeader title="AP Automation" step="" active={active} />

      {/* Invoice summary */}
      <div className="flex justify-between items-baseline mb-[14px]">
        <div>
          <div className="text-[14px] font-bold" style={{ color: "#111" }}>Acme Corp</div>
          <div className="text-[11px]" style={{ color: "#aaa" }}>INV-2891 · PDF received</div>
        </div>
        <div className="text-[18px] font-bold" style={{ color: "#111" }}>$12,450</div>
      </div>

      {/* Processing steps — animate in sequentially */}
      <div className="flex flex-col gap-[8px]">
        {STEPS.map(({ label, detail }, i) => (
          <div key={label} className="flex items-center gap-[9px]">
            <div
              className="w-[18px] h-[18px] rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-bold"
              style={{
                background: barGo ? "#16a34a" : "#f0f0f0",
                color: barGo ? "white" : "#ccc",
                transition: `background 0.25s ease ${i * 0.35}s, color 0.25s ease ${i * 0.35}s`,
              }}
            >✓</div>
            <div>
              <span className="text-[12px] font-semibold" style={{ color: "#111" }}>{label}</span>
              <span className="text-[11px] ml-[6px]" style={{ color: "#aaa" }}>{detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Card 2: Fraud & Risk Detection ─────────────────────────────────
function Card3({ active, exit }: { active: boolean; exit: boolean }) {
  return (
    <div className={`ap-card ${active ? "ap-card--on" : ""} ${exit ? "ap-card--exit" : ""}`}>
      <CardHeader title="Fraud & Risk Detection" step="" active={active} />

      {/* Risk alert banner */}
      <div className="rounded-[8px] px-[12px] py-[9px] mb-[13px]"
        style={{ background: "#fff5f5", border: "1px solid #fecaca" }}>
        <div className="flex items-center gap-[7px] mb-[3px]">
          <span style={{ color: "#da2028", fontSize: "13px" }}>⚠</span>
          <span className="text-[12px] font-semibold" style={{ color: "#da2028" }}>Banking Information Risk</span>
        </div>
        <div className="text-[11px]" style={{ color: "#e57373" }}>
          Bank account on invoice doesn't match Master Data
        </div>
      </div>

      {/* Actions taken */}
      <div className="flex flex-col gap-[8px] mb-[13px]">
        {[
          { label: "Bank account verified with supplier", status: "Confirmed", color: "#16a34a" },
          { label: "Four Eyes Principle",               status: "Initiated",  color: "#2f4344" },
          { label: "Stopped in Post Control",           status: "Applied",    color: "#2f4344" },
        ].map(({ label, status, color }) => (
          <div key={label} className="flex justify-between items-center">
            <span className="text-[12px]" style={{ color: "#888" }}>{label}</span>
            <span className="text-[11px] font-semibold" style={{ color }}>✓ {status}</span>
          </div>
        ))}
      </div>

      {/* Resolution */}
      <div className="rounded-[7px] px-[12px] py-[8px] flex items-center gap-[8px]"
        style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
        <span style={{ color: "#16a34a", fontSize: "14px" }}>✓</span>
        <span className="text-[11px] font-semibold" style={{ color: "#16a34a" }}>
          Risk flagged, mitigated and logged
        </span>
      </div>
    </div>
  );
}

// ─── Card 3: Supplier Conversations ─────────────────────────────────
function Card4({ active, exit }: { active: boolean; exit: boolean }) {
  return (
    <div className={`ap-card ${active ? "ap-card--on" : ""} ${exit ? "ap-card--exit" : ""}`}>
      <CardHeader title="Supplier Conversations" step="" active={active} />

      {/* Chat thread */}
      <div className="flex flex-col gap-[9px] mb-[14px]">
        {/* Supplier message */}
        <div className="flex items-end gap-[7px]">
          <div className="w-[22px] h-[22px] rounded-full flex-shrink-0 flex items-center justify-center text-[8px] font-bold text-white"
            style={{ background: "#ab9c6d" }}>AC</div>
          <div className="text-[11px] leading-[1.55] px-[11px] py-[8px] rounded-[10px] rounded-bl-[3px] max-w-[82%]"
            style={{ background: "#f4f4f2", color: "#444" }}>
            When will INV-2891 be paid? We submitted it 3 weeks ago.
          </div>
        </div>

        {/* AI response */}
        <div className="flex items-end gap-[7px] flex-row-reverse">
          <div className="w-[22px] h-[22px] rounded-full flex-shrink-0 flex items-center justify-center text-[8px] font-bold text-white"
            style={{ background: "#2f4344" }}>AI</div>
          <div className="text-[11px] leading-[1.55] px-[11px] py-[8px] rounded-[10px] rounded-br-[3px] max-w-[82%]"
            style={{ background: "#2f4344", color: "white" }}>
            Hi! INV-2891 is approved and scheduled for payment on Mar 28.
          </div>
        </div>

        {/* Resolved badge */}
        <div className="flex justify-center">
          <span className="text-[10px] font-semibold px-[10px] py-[3px] rounded-full"
            style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>
            ✓ Resolved automatically
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-[0] pt-[10px]" style={{ borderTop: "1px solid #f0f0f0" }}>
        {[
          { value: "43",   label: "Queries / mo" },
          { value: "100%", label: "Auto-resolved" },
          { value: "2.1s", label: "Avg response" },
        ].map(({ value, label }) => (
          <div key={label} className="flex-1 text-center">
            <div className="text-[14px] font-bold" style={{ color: "#2f4344" }}>{value}</div>
            <div className="text-[9px] uppercase tracking-[0.5px] mt-[2px]" style={{ color: "#c0c0c0" }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Brand color: lighter charcoal tint for large dark sections ─────
// Full charcoal #2f4343 is too heavy at 100% for large backgrounds.
// Brand guide says to use tints for larger areas — this is ~30% lighter.
const DARK_SECTION = "#3e5a5a";

// ─── Section Connector (WalkMe-style animated line + dot) ───────────
function SectionConnector({
  above = "white",
  below = "white",
}: {
  above?: string;
  below?: string;
}) {
  const connRef = useRef<HTMLDivElement>(null);
  const [connVisible, setConnVisible] = useState(false);

  useEffect(() => {
    const el = connRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setConnVisible(true); },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={connRef} style={{ position: "relative", height: "72px", zIndex: 10 }}>
      {/* Top-half background matches the section above */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", background: above }} />
      {/* Bottom-half background matches the section below */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: below }} />

      {/* Vertical line — draws down on scroll */}
      <div style={{
        position: "absolute", left: "50%", top: 0,
        width: "1.5px", height: "72px",
        transform: "translateX(-50%)",
        overflow: "hidden",
      }}>
        <div style={{
          height: connVisible ? "100%" : 0,
          background: "linear-gradient(180deg, rgba(218,32,40,0.2) 0%, rgba(218,32,40,0.55) 100%)",
          transition: "height 0.8s ease",
        }} />
      </div>

      {/* Moving dot — travels down the line */}
      {connVisible && (
        <div style={{
          position: "absolute",
          left: "50%",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "#da2028",
          transform: "translateX(-50%)",
          boxShadow: "0 0 8px 2px rgba(218,32,40,0.4)",
          animation: "sectionDot 1.6s ease-in-out infinite",
        }} />
      )}
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────
export default function HeroConceptPage() {
  const [activeCard, setActiveCard] = useState<number>(-1);
  const [exitCard,   setExitCard]   = useState<number>(-1);
  const [barGo,      setBarGo]      = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reset to 0 at 8 seconds
  const handleVideoTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (video && video.currentTime >= 16) {
      video.currentTime = 0;
      video.play();
    }
  }, []);

  // If video ends naturally before 8s, restart it
  const handleVideoEnded = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play();
    }
  }, []);

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

  // Kick off sequence
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setActiveCard(0);
      timerRef.current = setTimeout(() => advance(0), HOLD[0]);
    }, 900);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [advance]);

  // Trigger progress bar on card 2 (now index 0)
  useEffect(() => {
    if (activeCard === 0) {
      setBarGo(false);
      const t = setTimeout(() => setBarGo(true), 120);
      return () => clearTimeout(t);
    }
  }, [activeCard]);

  return (
    <main>
      <Header />

      {/* ─── Hero ─── */}
      <section
        className="relative w-full h-[640px] flex items-center overflow-hidden bg-[#2f4344]"
      >
        {/* Background video — confined to right 55% of hero */}
        <video
          ref={videoRef}
          className="absolute right-0 top-0 h-full object-cover"
          style={{ width: "55%", objectPosition: "30% center" }}
          autoPlay
          muted
          playsInline
          onTimeUpdate={handleVideoTimeUpdate}
          onEnded={handleVideoEnded}
        >
          <source src="/videos/AdobeStock_455008259_Video_4K_Preview.mp4" type="video/mp4" />
        </video>

        {/* Wave/lasso image — covers left ~55%, CSS mask fades it into the video on the right */}
        <img
          src="/images/fade-hero-charcoal-innovation-ai.png"
          alt=""
          aria-hidden="true"
          className="absolute left-0 top-0 h-full pointer-events-none"
          style={{
            width: "90%",
            objectFit: "cover",
            objectPosition: "left center",
            WebkitMaskImage: "linear-gradient(to right, black 50%, transparent 75%)",
            maskImage: "linear-gradient(to right, black 50%, transparent 75%)",
          }}
        />

        {/* Content — outer px matches header nav, inner max-width matches header inner div */}
        <div className="w-full px-6 lg:px-8 py-16 relative z-10">
        <div className="max-w-[1400px] mx-auto flex items-center gap-[60px]">
          {/* ── Left: headline + CTAs ── */}
          <div style={{ flex: "0 0 450px" }}>
            <h1
              style={{
                fontSize: "54px", fontWeight: 700, lineHeight: 1.08,
                color: "white", marginBottom: "18px", letterSpacing: "-1.2px",
              }}
            >
              Autonomous AP,<br />powered by<br />
              <span style={{ color: "#ab9c6d" }}>agentic AI</span>
            </h1>

            <p
              style={{
                fontSize: "16px", lineHeight: 1.68,
                color: "rgba(255,255,255,0.64)",
                maxWidth: "400px", marginBottom: "36px",
              }}
            >
              Medius understands, learns, and acts across invoice-to-pay so your
              team spends less time processing and more time controlling spend.
            </p>

            <div className="flex gap-[12px] items-center">
              <button
                style={{
                  background: "#da2028", color: "white", border: "2px solid #da2028",
                  padding: "13px 32px", borderRadius: "9999px",
                  fontSize: "13px", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "1px", cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Book a Demo
              </button>
              <button
                style={{
                  background: "transparent", color: "white",
                  border: "2px solid white",
                  padding: "13px 32px", borderRadius: "9999px",
                  fontSize: "13px", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "1px", cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Watch a Demo
              </button>
            </div>
          </div>

          {/* ── Right: cycling AP workflow cards ── */}
          <div className="flex-1 flex justify-center items-center" style={{ marginLeft: "-260px" }}>
            <div style={{ position: "relative", width: "360px" }}>

              {/* Step label */}
              <div
                style={{
                  height: "28px", marginBottom: "14px",
                  display: "flex", alignItems: "center", gap: "10px",
                  color: "rgba(255,255,255,0.68)",
                  fontSize: "10.5px", fontWeight: 500,
                  letterSpacing: "1.2px", textTransform: "uppercase",
                  opacity: activeCard >= 0 ? 1 : 0,
                  transition: "opacity 0.5s",
                }}
              >
                <div style={{ width: "22px", height: "1px", background: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
                <span>{activeCard >= 0 ? LABELS[activeCard] : ""}</span>
              </div>

              {/* Card stack */}
              <div style={{ position: "relative", height: "240px" }}>

                {/* Ghost depth cards (decorative) */}
                <div style={{
                  position: "absolute", left: "50%",
                  width: "316px", height: "200px", borderRadius: "14px",
                  background: "white", pointerEvents: "none",
                  transform: "translateX(-50%) translateY(18px) scale(0.92)",
                  opacity: 0.18,
                }} />
                <div style={{
                  position: "absolute", left: "50%",
                  width: "340px", height: "220px", borderRadius: "14px",
                  background: "white", pointerEvents: "none",
                  transform: "translateX(-50%) translateY(9px) scale(0.96)",
                  opacity: 0.38,
                }} />

                {/* AP Workflow Cards */}
                <Card2 active={activeCard === 0} exit={exitCard === 0} barGo={barGo} />
                <Card3 active={activeCard === 1} exit={exitCard === 1} />
                <Card4 active={activeCard === 2} exit={exitCard === 2} />
              </div>


            </div>
          </div>
        </div>
        </div>

        {/* Wave transition to next section */}
        <div className="absolute bottom-[-1px] left-0 right-0 z-20 leading-none">
          <svg viewBox="0 0 1440 72" preserveAspectRatio="none" style={{ width: "100%", height: "72px", display: "block" }}>
            <path d="M0,36 C320,72 820,4 1440,44 L1440,72 L0,72 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ─── AP Automation ─── */}
      <section style={{ background: "white", padding: "110px 0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", gap: "80px" }}>

          {/* Left: text */}
          <div style={{ flex: "0 0 460px" }}>
            <div style={{ display: "inline-block", fontSize: "11px", fontWeight: 600, letterSpacing: "1.2px", textTransform: "uppercase", color: "#da2028", marginBottom: "18px" }}>
              AP Automation
            </div>
            <h2 style={{ fontSize: "44px", fontWeight: 700, lineHeight: 1.1, color: "#2f4344", letterSpacing: "-0.8px", marginBottom: "20px" }}>
              Automate the entire invoice lifecycle
            </h2>
            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#6b7280", marginBottom: "36px" }}>
              From the moment an invoice arrives to the moment it&apos;s paid, Medius handles every step — capture, match, code, approve, and pay — without manual intervention.
            </p>
            <div style={{ display: "flex", gap: "40px", marginBottom: "40px" }}>
              {[
                { value: "80%", label: "Reduction in processing time" },
                { value: "100%", label: "Touchless processing" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div style={{ fontSize: "32px", fontWeight: 700, color: "#da2028" }}>{value}</div>
                  <div style={{ fontSize: "12px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginTop: "4px" }}>{label}</div>
                </div>
              ))}
            </div>
            <button style={{ background: "#2f4344", color: "white", border: "none", padding: "14px 30px", borderRadius: "9999px", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", cursor: "pointer", fontFamily: "inherit" }}>
              Learn More
            </button>
          </div>

          {/* Right: workflow diagram */}
          <div style={{ flex: 1 }}>
            <div style={{ background: "#f8f9fa", borderRadius: "20px", padding: "40px 32px" }}>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", color: "#9ca3af", marginBottom: "28px" }}>Invoice workflow</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { step: "Receive",  detail: "Invoice arrives via email or e-invoicing network",  done: true  },
                  { step: "Capture",  detail: "AI extracts supplier, amounts, and line items",       done: true  },
                  { step: "Match",    detail: "3-way match against PO and goods receipt",            done: true  },
                  { step: "Code",     detail: "GL codes auto-assigned based on learned rules",       done: true  },
                  { step: "Approve",  detail: "Routed to approvers via SmartFlow",                   done: true  },
                  { step: "Pay",      detail: "Payment executed automatically on due date",          done: false },
                ].map(({ step, detail, done }, i) => (
                  <div key={step} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: done ? "#2f4344" : "#da2028", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700 }}>
                        {done ? "✓" : i + 1}
                      </div>
                      {i < 5 && <div style={{ width: "2px", height: "24px", background: "#e5e7eb", marginTop: "4px" }} />}
                    </div>
                    <div style={{ paddingTop: "4px" }}>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#2f4344" }}>{step}</div>
                      <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>{detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AP Automation → AI Features connector ─── */}
      <SectionConnector above="white" below={DARK_SECTION} />

      {/* ─── AI Features ─── */}
      <section style={{ background: DARK_SECTION, padding: "110px 0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 32px" }}>

          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ display: "inline-block", fontSize: "11px", fontWeight: 600, letterSpacing: "1.2px", textTransform: "uppercase", color: "#ab9c6d", marginBottom: "16px" }}>
              Agentic AI
            </div>
            <h2 style={{ fontSize: "44px", fontWeight: 700, lineHeight: 1.1, color: "white", letterSpacing: "-0.8px", marginBottom: "18px" }}>
              AI that doesn&apos;t just assist — it acts
            </h2>
            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: "560px", margin: "0 auto" }}>
              Medius AI agents work autonomously across your AP processes — making decisions, resolving exceptions, and communicating with suppliers without human intervention.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
            {[
              {
                title: "Statement Reconciliation",
                desc: "Automatically matches supplier statements against your ledger, flagging discrepancies and resolving them without manual effort.",
                icon: "⚖",
                stat: "100% automated",
              },
              {
                title: "Fraud & Risk Detection",
                desc: "Monitors every invoice for banking anomalies, duplicate submissions, and unusual payment values — stopping fraud before payment.",
                icon: "🛡",
                stat: "Real-time detection",
              },
              {
                title: "Medius Copilot",
                desc: "Your AI assistant for AP queries, coding suggestions, workflow insights, and instant answers — embedded directly in your workflow.",
                icon: "✦",
                stat: "Always available",
              },
              {
                title: "Supplier Conversations",
                desc: "Handles supplier payment status queries automatically via email — identifying the invoice, checking status, and responding in seconds.",
                icon: "💬",
                stat: "2.1s avg response",
              },
            ].map(({ title, desc, icon, stat }) => (
              <div key={title} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "36px", transition: "background 0.2s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(218,32,40,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                    {icon}
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#ab9c6d", textTransform: "uppercase", letterSpacing: "0.8px" }}>{stat}</span>
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "white", marginBottom: "10px" }}>{title}</h3>
                <p style={{ fontSize: "14px", lineHeight: 1.65, color: "rgba(255,255,255,0.55)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI Features → Straight Through connector ─── */}
      <SectionConnector above={DARK_SECTION} below="white" />

      {/* ─── Straight Through Payments ─── */}
      <section style={{ background: "white", padding: "110px 0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", gap: "80px" }}>

          {/* Left: visual */}
          <div style={{ flex: 1 }}>
            <div style={{ background: "#f8f9fa", borderRadius: "20px", padding: "40px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", color: "#9ca3af" }}>Payment run — today</div>
              {[
                { supplier: "Acme Corp",      amount: "$12,450",  status: "Paid",    color: "#16a34a" },
                { supplier: "Blue Steel Inc.", amount: "$8,200",   status: "Paid",    color: "#16a34a" },
                { supplier: "Puma AG",         amount: "$31,750",  status: "Paid",    color: "#16a34a" },
                { supplier: "WD-40 Co.",       amount: "$4,890",   status: "Pending", color: "#f59e0b" },
              ].map(({ supplier, amount, status, color }) => (
                <div key={supplier} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "white", borderRadius: "10px", padding: "14px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#2f4344" }}>{supplier}</div>
                    <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>Auto-scheduled</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#111" }}>{amount}</div>
                    <div style={{ fontSize: "11px", fontWeight: 600, color, marginTop: "2px" }}>● {status}</div>
                  </div>
                </div>
              ))}
              <div style={{ background: "#2f4344", borderRadius: "10px", padding: "14px 18px", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "white" }}>Total processed today</span>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#ab9c6d" }}>$57,290</span>
              </div>
            </div>
          </div>

          {/* Right: text */}
          <div style={{ flex: "0 0 460px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1.2px", textTransform: "uppercase", color: "#da2028", marginBottom: "18px" }}>
              Straight Through Payments
            </div>
            <h2 style={{ fontSize: "44px", fontWeight: 700, lineHeight: 1.1, color: "#2f4344", letterSpacing: "-0.8px", marginBottom: "20px" }}>
              Pay on time, every time
            </h2>
            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#6b7280", marginBottom: "36px" }}>
              Medius Payments executes approved invoices automatically on their due date — with built-in fraud controls, full audit trail, and zero manual touchpoints.
            </p>
            <div style={{ display: "flex", gap: "40px", marginBottom: "40px" }}>
              {[
                { value: "0",    label: "Manual touchpoints" },
                { value: "98%",  label: "On-time payment rate" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div style={{ fontSize: "32px", fontWeight: 700, color: "#da2028" }}>{value}</div>
                  <div style={{ fontSize: "12px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.6px", marginTop: "4px" }}>{label}</div>
                </div>
              ))}
            </div>
            <button style={{ background: "#2f4344", color: "white", border: "none", padding: "14px 30px", borderRadius: "9999px", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", cursor: "pointer", fontFamily: "inherit" }}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ─── e-Invoicing ─── */}
      <section style={{ background: "#f8f9fa", padding: "110px 0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", gap: "80px" }}>

          {/* Left: text */}
          <div style={{ flex: "0 0 460px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1.2px", textTransform: "uppercase", color: "#da2028", marginBottom: "18px" }}>
              e-Invoicing
            </div>
            <h2 style={{ fontSize: "44px", fontWeight: 700, lineHeight: 1.1, color: "#2f4344", letterSpacing: "-0.8px", marginBottom: "20px" }}>
              Connected to any supplier, anywhere
            </h2>
            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#6b7280", marginBottom: "36px" }}>
              Medius supports all major e-invoice formats and connects to global networks, making it easy to receive structured invoice data from any supplier worldwide — with automatic validation built in.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}>
              {[
                "PEPPOL global network",
                "Pagero network",
                "UBL, EDIFACT, and all major formats",
                "Automatic schema validation",
                "Full ERP integration",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#2f4344", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", flexShrink: 0 }}>✓</div>
                  <span style={{ fontSize: "14px", color: "#4b5563" }}>{item}</span>
                </div>
              ))}
            </div>
            <button style={{ background: "#2f4344", color: "white", border: "none", padding: "14px 30px", borderRadius: "9999px", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", cursor: "pointer", fontFamily: "inherit" }}>
              Learn More
            </button>
          </div>

          {/* Right: network visual */}
          <div style={{ flex: 1 }}>
            <div style={{ background: "white", borderRadius: "20px", padding: "40px" }}>
              <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", color: "#9ca3af", marginBottom: "28px" }}>Supported formats &amp; networks</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px" }}>
                {[
                  { name: "PEPPOL",    desc: "Global e-delivery network" },
                  { name: "Pagero",    desc: "Global business network" },
                  { name: "UBL 2.1",   desc: "Universal Business Language" },
                  { name: "EDIFACT",   desc: "UN/EDIFACT standard" },
                  { name: "PDF + OCR", desc: "AI-powered extraction" },
                  { name: "XML",       desc: "Custom XML formats" },
                ].map(({ name, desc }) => (
                  <div key={name} style={{ border: "1px solid #e5e7eb", borderRadius: "10px", padding: "16px 18px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#2f4344" }}>{name}</div>
                    <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "3px" }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── e-Invoicing → Spend Management connector ─── */}
      <SectionConnector above="#f8f9fa" below={DARK_SECTION} />

      {/* ─── Spend Management Applications ─── */}
      <section style={{ background: DARK_SECTION, padding: "110px 0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 32px" }}>

          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ display: "inline-block", fontSize: "11px", fontWeight: 600, letterSpacing: "1.2px", textTransform: "uppercase", color: "#ab9c6d", marginBottom: "16px" }}>
              Spend Management
            </div>
            <h2 style={{ fontSize: "44px", fontWeight: 700, lineHeight: 1.1, color: "white", letterSpacing: "-0.8px", marginBottom: "18px" }}>
              Complete source-to-pay, one platform
            </h2>
            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: "560px", margin: "0 auto" }}>
              Beyond AP, Medius covers the full spend management lifecycle — giving you visibility and control across every dollar your business spends.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {[
              { title: "Sourcing",            desc: "Streamline RFx processes, evaluate suppliers, and award contracts — all in one place.", icon: "◎" },
              { title: "Procurement",         desc: "Automate purchase requisitions and orders with built-in policy compliance and approvals.", icon: "⬡" },
              { title: "AP Automation",       desc: "End-to-end invoice processing from capture to payment with full touchless automation.", icon: "⚡" },
              { title: "Analytics",           desc: "Real-time spend visibility, AP insights, and process metrics across your entire operation.", icon: "▦" },
              { title: "Supplier Portal",     desc: "Give suppliers a self-service portal to submit invoices, check status, and manage details.", icon: "⊞" },
              { title: "Supplier Onboarding", desc: "Automate supplier registration, validation, and onboarding with configurable workflows.", icon: "＋" },
            ].map(({ title, desc, icon }) => (
              <div key={title} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "32px" }}>
                <div style={{ fontSize: "22px", marginBottom: "14px", color: "#ab9c6d" }}>{icon}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "white", marginBottom: "8px" }}>{title}</h3>
                <p style={{ fontSize: "13px", lineHeight: 1.65, color: "rgba(255,255,255,0.5)" }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{ textAlign: "center", marginTop: "64px" }}>
            <button style={{ background: "#da2028", color: "white", border: "2px solid #da2028", padding: "16px 40px", borderRadius: "9999px", fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", cursor: "pointer", fontFamily: "inherit" }}>
              Book a Demo
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
