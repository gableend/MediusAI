"use client";

import AgentEcosystemDiagram from "@/components/AgentEcosystemDiagram";

const DARK = "#2f4344";
const SAND = "#ab9c6d";

export default function ScratchPage() {
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
              fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700,
              lineHeight: 1.1, letterSpacing: "-0.7px", color: DARK, marginBottom: "14px",
            }}>
              Agents across every spend process
            </h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#5a7070", maxWidth: "540px", margin: "0 auto" }}>
              AI agents work across sourcing, procurement, invoicing, payments and expenses, while finance and procurement teams stay in full control.
            </p>
          </div>
          <AgentEcosystemDiagram />
        </div>
      </section>
    </main>
  );
}
