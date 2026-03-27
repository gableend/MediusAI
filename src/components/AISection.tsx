"use client";

import { useEffect, useRef, useState } from "react";

const RED  = "#da2028";
const DARK = "#2f4344";
const BG   = "#192828";

const CARDS = [
  { title: "Invoice Capture Agent",           detail: "PDF, EDI, XML & paper captured touchlessly",      accent: "#6b8c8c", icon: "⬇" },
  { title: "Invoice Coding Agent",            detail: "GL coded · cost centre assigned · routed",        accent: "#4a7c7c", icon: "⇄" },
  { title: "Approvals Agent",                 detail: "INV-5512 · $4,200 · approved in 4 mins",          accent: "#16a34a", icon: "✓" },
  { title: "Fraud & Risk Detection Agent",    detail: "Bank account mismatch — INV-7743 held",           accent: RED,       icon: "⚠" },
  { title: "Statement Reconciliation Agent",  detail: "14 supplier statements matched automatically",    accent: "#ab9c6d", icon: "◎" },
  { title: "Supplier Inquiries Agent",        detail: "Auto-response sent · INV-4821 status confirmed",  accent: DARK,      icon: "↩" },
];

// ─── Main component ────────────────────────────────────────────────────────────
export default function AISection() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = zoneRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ background: BG, overflow: "hidden" }}>

      {/* ── Text block ── */}
      <div style={{
        textAlign: "center",
        padding: "80px 32px 48px",
        maxWidth: "920px",
        margin: "0 auto",
      }}>
        <h2 style={{
          fontSize: "clamp(32px, 4.5vw, 52px)",
          fontWeight: 800,
          color: "white",
          lineHeight: 1.1,
          letterSpacing: "-1px",
          margin: "0 0 20px",
        }}>
          AI you can trust.
        </h2>
        <p style={{
          fontSize: "17px",
          color: "rgba(255,255,255,0.60)",
          lineHeight: 1.7,
          margin: "0 0 32px",
        }}>
          Medius delivers AI you can trust to act. Since 2016, we have been guiding teams through the financial moments that matter because when money moves, reliability is everything.
        </p>
        <a
          href="/ai"
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: RED, color: "white",
            padding: "13px 28px", borderRadius: "8px",
            fontSize: "14px", fontWeight: 700,
            textDecoration: "none",
            boxShadow: "0 4px 16px rgba(218,32,40,0.35)",
          }}
        >
          See how it works
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* ── Visual zone ── */}
      <div
        ref={zoneRef}
        style={{
          position: "relative",
          height: "520px",
          maxWidth: "1120px",
          margin: "0 auto 80px",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        {/* Background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/AdobeStock_317313963 RED.jpg"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />

        {/* Gradient to help card legibility on the right */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to left, rgba(25,40,40,0.5) 0%, rgba(25,40,40,0.15) 50%, transparent 70%)",
          zIndex: 1,
          pointerEvents: "none",
        }} />

        {/* Cards — stacked column, top-right, scroll-triggered */}
        <div style={{
          position: "absolute",
          top: "32px",
          right: "32px",
          zIndex: 2,
          width: "256px",
          paddingLeft: "22px",
        }}>
          {/* Vertical connecting line */}
          <div style={{
            position: "absolute",
            left: "7px",
            top: "18px",
            bottom: "18px",
            width: "2px",
            background: "rgba(255,255,255,0.25)",
            transformOrigin: "top",
            transform: visible ? "scaleY(1)" : "scaleY(0)",
            transition: visible ? "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.1s" : "none",
          }} />

          {/* Card rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {CARDS.map(({ title, detail, accent, icon }, i) => (
              <div
                key={title}
                style={{
                  position: "relative",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(-20px)",
                  transition: visible
                    ? `opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.18}s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.18}s`
                    : "none",
                }}
              >
                {/* Dot on the line */}
                <div style={{
                  position: "absolute",
                  left: "-18px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: accent,
                  boxShadow: "0 0 0 2px rgba(255,255,255,0.15)",
                  opacity: visible ? 1 : 0,
                  transition: visible ? `opacity 0.4s ease ${i * 0.18 + 0.1}s` : "none",
                }} />
                {/* Card */}
                <div style={{
                  background: "rgba(255,255,255,0.96)",
                  borderRadius: "12px",
                  padding: "9px 14px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.10)",
                  backdropFilter: "blur(8px)",
                  borderLeft: `3px solid ${accent}`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                    <span style={{ fontSize: "13px", color: accent, lineHeight: 1 }}>{icon}</span>
                    <span style={{ fontSize: "10.5px", fontWeight: 700, color: "#111" }}>{title}</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#666", lineHeight: 1.4 }}>{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
