"use client";

import { useRef, useEffect, useState } from "react";
import AgentEcosystemDiagram from "@/components/AgentEcosystemDiagram";
import { VideoCamera, FileText } from "@phosphor-icons/react";

const DARK = "#2f4344";
const RED  = "#da2028";

const AP_CASE_STUDIES = [
  { name: "Puma", href: "https://www.medius.com/resources/case-studies/puma-video/", type: "video" as const, domain: "puma.com" },
  { name: "Mowi", href: "https://www.medius.com/resources/case-studies/mowi-ap-automation/", type: "video" as const, domain: "mowi.com" },
  { name: "Lush", href: "https://www.medius.com/resources/case-studies/lush-ap-automation/", type: "video" as const, domain: "lush.com" },
];

const SPEND_CASE_STUDIES = [
  { name: "WWF", href: "https://www.medius.com/resources/case-studies/wwf-automates-procurement-processes-and-enhances-reporting/", type: "video" as const, domain: "wwf.org" },
  { name: "Procure4", href: "https://www.medius.com/lps/procure4-on-making-cost-reductions-driving-efficiencies-and-getting-better-control1/", type: "video" as const, domain: "procure4.com" },
  { name: "Nissan", href: "https://www.medius.com/resources/case-studies/nissan-source-to-pay/", type: "article" as const, domain: "nissan.com" },
];

const CARD_WIDTH = 185;

const cardBase: React.CSSProperties = {
  position: "absolute",
  background: "white",
  borderRadius: "14px",
  padding: "20px 22px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
  zIndex: 2,
  width: `${CARD_WIDTH}px`,
};

const linkStyle: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 600,
  color: DARK,
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);


  return (
    <section
      ref={sectionRef}
      style={{
        background: "#f8f9fa",
        padding: "88px 32px 80px",
        overflow: "visible",
      }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>

        {/* ── Text block ── */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "39px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: visible ? "opacity 0.6s ease, transform 0.6s ease" : "none",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 800,
              color: DARK,
              lineHeight: 1.15,
              letterSpacing: "-0.5px",
              margin: "0 auto 16px",
              maxWidth: "960px",
            }}
          >
            With Medius{" "}
            <span style={{ color: RED }}>spend runs as a system</span>
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "#6b7280",
              lineHeight: 1.7,
              margin: "0 auto",
              maxWidth: "560px",
            }}
          >
            Autonomous by design. Finance teams stay in control.
          </p>
        </div>

        {/* ── Diagram with flanking case study cards ── */}
        <div
          style={{
            position: "relative",
            maxWidth: "700px",
            margin: "0 auto",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: visible ? "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s" : "none",
          }}
        >

          {/* Left card */}
          <div
            style={{
              ...cardBase,
              top: "40px",
              left: `-${CARD_WIDTH + 30}px`,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-24px)",
              transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
            }}
          >
            <div style={{ fontSize: "15px", fontWeight: 700, color: DARK, lineHeight: 1.2, marginBottom: "4px" }}>
              AP Excellence
            </div>
            <div style={{ fontSize: "11px", color: "#8a9a9a", marginBottom: "14px", lineHeight: 1.4 }}>
              See how teams transform AP
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
              {AP_CASE_STUDIES.map((cs) => (
                <a key={cs.name} href={cs.href} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${cs.domain}&sz=32`}
                    alt=""
                    width={18}
                    height={18}
                    style={{ borderRadius: "4px", flexShrink: 0 }}
                  />
                  <span style={{ flex: 1 }}>{cs.name}</span>
                  <VideoCamera size={14} weight="fill" color={RED} style={{ flexShrink: 0, opacity: 0.7 }} />
                </a>
              ))}
            </div>
            <div style={{ borderTop: "1px solid #eee", paddingTop: "12px" }}>
              <div style={{ fontSize: "24px", fontWeight: 800, color: RED, lineHeight: 1, letterSpacing: "-0.5px" }}>
                97%
              </div>
              <div style={{ fontSize: "11px", color: "#8a9a9a", marginTop: "3px", lineHeight: 1.3 }}>
                Auto-match rate on invoice lines
              </div>
            </div>
          </div>

          {/* Right card */}
          <div
            style={{
              ...cardBase,
              top: "40px",
              right: `-${CARD_WIDTH + 30}px`,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-24px)",
              transition: "opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s",
            }}
          >
            <div style={{ fontSize: "15px", fontWeight: 700, color: DARK, lineHeight: 1.2, marginBottom: "4px" }}>
              Optimize spend
            </div>
            <div style={{ fontSize: "11px", color: "#8a9a9a", marginBottom: "14px", lineHeight: 1.4 }}>
              From Sourcing to Expenses
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
              {SPEND_CASE_STUDIES.map((cs) => (
                <a key={cs.name} href={cs.href} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${cs.domain}&sz=32`}
                    alt=""
                    width={18}
                    height={18}
                    style={{ borderRadius: "4px", flexShrink: 0 }}
                  />
                  <span style={{ flex: 1 }}>{cs.name}</span>
                  {cs.type === "video" ? (
                    <VideoCamera size={14} weight="fill" color={RED} style={{ flexShrink: 0, opacity: 0.7 }} />
                  ) : (
                    <FileText size={14} weight="fill" color={RED} style={{ flexShrink: 0, opacity: 0.7 }} />
                  )}
                </a>
              ))}
            </div>
            <div style={{ borderTop: "1px solid #eee", paddingTop: "12px" }}>
              <div style={{ fontSize: "24px", fontWeight: 800, color: RED, lineHeight: 1, letterSpacing: "-0.5px" }}>
                4x
              </div>
              <div style={{ fontSize: "11px", color: "#8a9a9a", marginTop: "3px", lineHeight: 1.3 }}>
                Faster approvals vs manual routing
              </div>
            </div>
          </div>

          <AgentEcosystemDiagram />
        </div>

      </div>
    </section>
  );
}
