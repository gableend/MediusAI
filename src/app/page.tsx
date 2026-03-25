"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Header from "@/components/Header";
import CustomerLogoBar from "@/components/CustomerLogoBar";
import ProductTabsSection from "@/components/ProductTabsSection";
import AISection from "@/components/AISection";
import VideoSection from "@/components/VideoSection";

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

// ─── Card 1: AP Automation ───────────────────────────────────────────
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

      <div className="flex justify-between items-baseline mb-[14px]">
        <div>
          <div className="text-[14px] font-bold" style={{ color: "#111" }}>Acme Corp</div>
          <div className="text-[11px]" style={{ color: "#aaa" }}>INV-2891 · PDF received</div>
        </div>
        <div className="text-[18px] font-bold" style={{ color: "#111" }}>$12,450</div>
      </div>

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

      <div className="rounded-[8px] px-[12px] py-[9px] mb-[13px]"
        style={{ background: "#fff5f5", border: "1px solid #fecaca" }}>
        <div className="flex items-center gap-[7px] mb-[3px]">
          <span style={{ color: "#da2028", fontSize: "13px" }}>⚠</span>
          <span className="text-[12px] font-semibold" style={{ color: "#da2028" }}>Banking Information Risk</span>
        </div>
        <div className="text-[11px]" style={{ color: "#e57373" }}>
          Invoice/Master Data bank mismatch
        </div>
      </div>

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

      <div className="flex flex-col gap-[9px] mb-[14px]">
        <div className="flex items-end gap-[7px]">
          <div className="w-[22px] h-[22px] rounded-full flex-shrink-0 flex items-center justify-center text-[8px] font-bold text-white"
            style={{ background: "#ab9c6d" }}>AC</div>
          <div className="text-[11px] leading-[1.55] px-[11px] py-[8px] rounded-[10px] rounded-bl-[3px] max-w-[82%]"
            style={{ background: "#f4f4f2", color: "#444" }}>
            When will INV-2891 be paid? We submitted it 3 weeks ago.
          </div>
        </div>

        <div className="flex items-end gap-[7px] flex-row-reverse">
          <div className="w-[22px] h-[22px] rounded-full flex-shrink-0 flex items-center justify-center text-[8px] font-bold text-white"
            style={{ background: "#2f4344" }}>AI</div>
          <div className="text-[11px] leading-[1.55] px-[11px] py-[8px] rounded-[10px] rounded-br-[3px] max-w-[82%]"
            style={{ background: "#2f4344", color: "white" }}>
            Hi! INV-2891 is approved and scheduled for payment on Mar 28.
          </div>
        </div>

        <div className="flex justify-center">
          <span className="text-[10px] font-semibold px-[10px] py-[3px] rounded-full"
            style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>
            ✓ Resolved automatically
          </span>
        </div>
      </div>

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

// ─── Main Page ──────────────────────────────────────────────────────
export default function HeroConcept2Page() {
  const [activeCard, setActiveCard] = useState<number>(-1);
  const [exitCard,   setExitCard]   = useState<number>(-1);
  const [barGo,      setBarGo]      = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (video && video.currentTime >= 16) {
      video.currentTime = 0;
      video.play();
    }
  }, []);

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

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setActiveCard(0);
      timerRef.current = setTimeout(() => advance(0), HOLD[0]);
    }, 900);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [advance]);

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

      {/* ─── Hero (locked — shared with hero-concept-1) ─── */}
      <section
        className="relative w-full h-[640px] flex items-center overflow-hidden bg-[#2f4344]"
      >
        {/* Background video */}
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

        {/* Wave/lasso image */}
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

        {/* Content */}
        <div className="w-full px-6 lg:px-8 py-16 relative z-10">
        <div className="max-w-[1400px] mx-auto flex items-center gap-[60px]">

          {/* Left: headline + CTAs */}
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

          {/* Right: cycling AP workflow cards */}
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

                {/* Ghost depth cards */}
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

                <Card2 active={activeCard === 0} exit={exitCard === 0} barGo={barGo} />
                <Card3 active={activeCard === 1} exit={exitCard === 1} />
                <Card4 active={activeCard === 2} exit={exitCard === 2} />
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Wave transition out of hero */}
        <div className="absolute bottom-[-1px] left-0 right-0 z-20 leading-none">
          <svg viewBox="0 0 1440 72" preserveAspectRatio="none" style={{ width: "100%", height: "72px", display: "block" }}>
            <path d="M0,36 C320,72 820,4 1440,44 L1440,72 L0,72 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ─── Social proof logo bar ─── */}
      <CustomerLogoBar />

      {/* ─── Product tabs ─── */}
      <ProductTabsSection />

      {/* ─── AI Section ─── */}
      <AISection />

      {/* ─── Video Section ─── */}
      <VideoSection />

    </main>
  );
}
