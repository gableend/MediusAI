"use client";

import { useEffect, useState } from "react";
import AgentEcosystemDiagram from "@/components/AgentEcosystemDiagram";
import { VideoCamera, FileText } from "@phosphor-icons/react";

const DARK = "#2f4344";
const RED  = "#da2028";
const SAND = "#ab9c6d";

const AP_CASE_STUDIES = [
  { name: "Briggs Equipment", href: "https://www.medius.com/resources/case-studies/briggs-equipment-ap-automation/", type: "video" as const },
  { name: "WD-40", href: "https://www.medius.com/resources/case-studies/wd-40-video/", type: "video" as const },
  { name: "Chadwell Supply", href: "https://www.medius.com/resources/case-studies/chadwell-supply-video/", type: "video" as const },
];

const SPEND_CASE_STUDIES = [
  { name: "WWF", href: "https://www.medius.com/resources/case-studies/wwf-automates-procurement-processes-and-enhances-reporting/", type: "video" as const },
  { name: "Procure4", href: "https://www.medius.com/lps/procure4-on-making-cost-reductions-driving-efficiencies-and-getting-better-control1/", type: "video" as const },
  { name: "Nissan", href: "https://www.medius.com/resources/case-studies/nissan-source-to-pay/", type: "article" as const },
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

export default function ScratchPage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <main style={{ fontFamily: "Poppins, sans-serif", background: "white", minHeight: "100vh" }}>
      {/* Simple header */}
      <div style={{ padding: "20px 32px", borderBottom: "1px solid #eee" }}>
        <span style={{ fontSize: "12px", fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "1px" }}>
          Scratch / Diagram WIP
        </span>
      </div>

      {/* Diagram section */}
      <section style={{ padding: "80px 32px", overflow: "visible" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: SAND, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "12px" }}>
              The Medius Agent Ecosystem
            </div>
            <h2 style={{
              fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800,
              lineHeight: 1.15, letterSpacing: "-0.5px", color: DARK, marginBottom: "14px",
            }}>
              With Medius{" "}
              <span style={{ color: RED }}>spend runs as a system</span>
            </h2>
            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#6b7280", maxWidth: "560px", margin: "0 auto" }}>
              Autonomous by design. Finance teams stay in control.
            </p>
          </div>

          {/* Diagram with flanking stat cards */}
          <div style={{ position: "relative", maxWidth: "700px", margin: "0 auto" }}>

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
                Achieve AP excellence
              </div>
              <div style={{ fontSize: "11px", color: "#8a9a9a", marginBottom: "14px", lineHeight: 1.4 }}>
                See how teams transform AP
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                {AP_CASE_STUDIES.map((cs) => (
                  <a key={cs.name} href={cs.href} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    <VideoCamera size={16} weight="fill" color={RED} style={{ flexShrink: 0 }} />
                    {cs.name}
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
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                {SPEND_CASE_STUDIES.map((cs) => (
                  <a key={cs.name} href={cs.href} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    {cs.type === "video" ? (
                      <VideoCamera size={16} weight="fill" color={RED} style={{ flexShrink: 0 }} />
                    ) : (
                      <FileText size={16} weight="fill" color={RED} style={{ flexShrink: 0 }} />
                    )}
                    {cs.name}
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
    </main>
  );
}
