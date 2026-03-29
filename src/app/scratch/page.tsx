"use client";

import { useEffect, useState } from "react";
import AgentEcosystemDiagram from "@/components/AgentEcosystemDiagram";

const DARK = "#2f4344";
const RED  = "#da2028";
const SAND = "#ab9c6d";

const STAT_CARDS = [
  { stat: "97%", label: "Auto-match rate", sublabel: "on invoice lines" },
  { stat: "4x", label: "Faster approvals", sublabel: "vs manual routing" },
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
              <div style={{ fontSize: "32px", fontWeight: 800, color: DARK, lineHeight: 1, letterSpacing: "-1px" }}>
                {STAT_CARDS[0].stat}
              </div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: DARK, marginTop: "6px", lineHeight: 1.3 }}>
                {STAT_CARDS[0].label}
              </div>
              <div style={{ fontSize: "12px", color: "#8a9a9a", marginTop: "2px" }}>
                {STAT_CARDS[0].sublabel}
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
