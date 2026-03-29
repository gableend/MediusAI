"use client";

import { useEffect, useState } from "react";
import AgentEcosystemDiagram from "@/components/AgentEcosystemDiagram";
import { VideoCamera } from "@phosphor-icons/react";

const DARK = "#2f4344";
const RED  = "#da2028";
const SAND = "#ab9c6d";

const AP_CASE_STUDIES = [
  { name: "Briggs Equipment", href: "https://www.medius.com/resources/case-studies/briggs-equipment-ap-automation/" },
  { name: "WD-40", href: "https://www.medius.com/resources/case-studies/wd-40-video/" },
  { name: "Chadwell Supply", href: "https://www.medius.com/resources/case-studies/chadwell-supply-video/" },
];

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
      <section style={{ padding: "80px 32px" }}>
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

          {/* Diagram with overlay stat cards */}
          <div style={{ position: "relative", maxWidth: "700px", margin: "0 auto" }}>

            {/* Left card - top left corner */}
            <div
              style={{
                position: "absolute",
                top: "28px",
                left: "-10px",
                background: "white",
                borderRadius: "14px",
                padding: "20px 24px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
                zIndex: 2,
                minWidth: "150px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <div style={{ fontSize: "16px", fontWeight: 700, color: DARK, lineHeight: 1.2, marginBottom: "4px" }}>
                Achieve AP excellence
              </div>
              <div style={{ fontSize: "11px", color: "#8a9a9a", marginBottom: "14px", lineHeight: 1.4 }}>
                See how teams transform AP
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {AP_CASE_STUDIES.map((cs) => (
                  <a
                    key={cs.name}
                    href={cs.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: DARK,
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <VideoCamera size={16} weight="fill" color={RED} />
                    {cs.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Right card - top right corner */}
            <div
              style={{
                position: "absolute",
                top: "28px",
                right: "-10px",
                background: "white",
                borderRadius: "14px",
                padding: "20px 24px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
                zIndex: 2,
                minWidth: "150px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(20px)",
                transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
              }}
            >
              <div style={{ fontSize: "32px", fontWeight: 800, color: DARK, lineHeight: 1, letterSpacing: "-1px" }}>
                {STAT_CARDS[1].stat}
              </div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: DARK, marginTop: "6px", lineHeight: 1.3 }}>
                {STAT_CARDS[1].label}
              </div>
              <div style={{ fontSize: "12px", color: "#8a9a9a", marginTop: "2px" }}>
                {STAT_CARDS[1].sublabel}
              </div>
            </div>

            <AgentEcosystemDiagram />
          </div>
        </div>
      </section>
    </main>
  );
}
