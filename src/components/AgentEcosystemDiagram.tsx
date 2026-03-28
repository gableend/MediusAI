"use client";
import React, { useEffect, useState } from "react";
const RED  = "#da2028";
const DARK = "#2f4344";
// ── Geometry helpers ────────────────────────────────────────────────────────
const CX = 300;
const CY = 300;
const SIZE = 600;
const toRad = (d: number) => (d * Math.PI) / 180;
const ptx = (r: number, deg: number) => CX + r * Math.cos(toRad(deg));
const pty = (r: number, deg: number) => CY + r * Math.sin(toRad(deg));
function arcPath(r: number, startDeg: number, endDeg: number) {
  const x1 = ptx(r, startDeg), y1 = pty(r, startDeg);
  const x2 = ptx(r, endDeg),   y2 = pty(r, endDeg);
  const sweep = endDeg - startDeg;
  const large = Math.abs(sweep) > 180 ? 1 : 0;
  const dir = sweep > 0 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} ${dir} ${x2} ${y2}`;
}
// ── 8 domains equally spaced (45 deg apart), starting from top ──────────
// -90 deg = 12 o'clock in SVG coordinates
const DOMAIN_LABELS = [
  "Sourcing",
  "Contracts",
  "Suppliers",
  "Procurement",
  "Invoicing",
  "AP",
  "Payments",
  "Expenses",
];
const domains = DOMAIN_LABELS.map((label, i) => ({
  label,
  angle: -90 + i * 45,
}));
// Adjusted Radii to prevent overlap
const LABEL_R   = 165;  // Moved text slightly inward
const ARROW_R   = 205;  // Moved arrows further outward to orbit the text cleanly
const OUTER_R   = 280;  // Outer grey ring
const RED_R     = 232;  // Red circle border
const CENTRE_R  = 108;  // Centre dark circle
// Adjusted text arc radius slightly inward to account for font height
const TEXT_ARC_R = 254;
export default function AgentEcosystemDiagram() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);
  // New constants for the orbiting "Agent Nodes" (literal agents)
  // We place the orbit just outside the solid central cap.
  const NODE_ORBIT_R = CENTRE_R * 0.6; // Approx 65px radius
  const NODE_SIZE    = 3.5;           // "tiny" nodes
  // Shift values (in degrees) to "slide" specific arrows away from the longer text labels
  const arrowShifts = [
    4,   // 0: Sourcing -> Contracts
    0,   // 1: Contracts -> Suppliers
    0,   // 2: Suppliers -> Procurement
   -4,   // 3: Procurement -> Invoicing
    2,   // 4: Invoicing -> AP
    0,   // 5: AP -> Payments
    0,   // 6: Payments -> Expenses
   -4    // 7: Expenses -> Sourcing
  ];
  // Arrow arcs between consecutive domains (widened the gap to 16 degrees)
  const arrowArcs = domains.map((d, i) => {
    const next = domains[(i + 1) % domains.length];
    const shift = arrowShifts[i];
    let startA = d.angle + 16 + shift;
    let endA   = next.angle - 16 + shift;
    if (endA < startA) endA += 360;
    return { startA, endA, idx: i };
  });
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "560px",
        margin: "0 auto",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ width: "100%", height: "auto", display: "block" }}>
        <defs>
          {/* Smaller arrowhead marker */}
          <marker id="arrowHead" markerWidth="6" markerHeight="5" refX="5.5" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5" fill="#8a9a9a" />
          </marker>
          {/* Centre radial gradient (STATIC - will not shift) */}
          <radialGradient id="centreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#0a0a0a" />
            <stop offset="55%"  stopColor="#1a0c0e" />
            <stop offset="78%"  stopColor="#8b1a1f" />
            <stop offset="92%"  stopColor={RED} />
            <stop offset="100%" stopColor={RED} />
          </radialGradient>
          {/* Curved text path: arc across the TOP */}
          <path
            id="outerTextArc"
            d={`M ${CX - TEXT_ARC_R},${CY} A ${TEXT_ARC_R},${TEXT_ARC_R} 0 0,1 ${CX + TEXT_ARC_R},${CY}`}
            fill="none"
          />
        </defs>
        {/* ── Outer grey ring ──────────────────────────────────────────────── */}
        <circle cx={CX} cy={CY} r={OUTER_R} fill="#e2e4e4" />
        {/* ── Red border ring ──────────────────────────────────────────────── */}
        <circle cx={CX} cy={CY} r={RED_R} fill="none" stroke={RED} strokeWidth="3.5" />
        {/* ── Inner cream fill ─────────────────────────────────────────────── */}
        <circle cx={CX} cy={CY} r={RED_R - 2} fill="#f3ede1" />
        {/* ── Centre dark circle (Static Background) ───────────────────────── */}
        <circle cx={CX} cy={CY} r={CENTRE_R} fill="url(#centreGrad)" />
        <circle cx={CX} cy={CY} r={CENTRE_R * 0.55} fill="#0c0c0c" />
        {/* -- NEW: Orbiting Agent Nodes (Literal Agents) -- */}
        {/* Layered above the background circles, but below the center text.
            We use <g> with simple fade-in transition identical to diagram elements. */}
        <g style={{ opacity: visible ? 1 : 0, transition: `opacity 0.6s ease 0.4s` }}>
          {/* Agent 1 - Pure White, faster relentless turn */}
          <circle cx={CX + NODE_ORBIT_R} cy={CY} r={NODE_SIZE} fill="white" opacity="0.7">
            <animateTransform attributeName="transform" type="rotate" from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur="22s" repeatCount="indefinite" />
          </circle>
          {/* Agent 2 - Lighter "energy red" (soft pink), slower Relativistic churn, offset starting position */}
          <circle cx={CX + NODE_ORBIT_R} cy={CY} r={NODE_SIZE} fill="#ffcccc" opacity="0.6" transform={`rotate(120 ${CX} ${CY})`}>
            <animateTransform attributeName="transform" type="rotate" from={`120 ${CX} ${CY}`} to={`480 ${CX} ${CY}`} dur="28s" repeatCount="indefinite" />
          </circle>
          {/* Agent 3 - Pure White, different relentless speed, offset 2 */}
          <circle cx={CX + NODE_ORBIT_R} cy={CY} r={NODE_SIZE} fill="white" opacity="0.7" transform={`rotate(240 ${CX} ${CY})`}>
            <animateTransform attributeName="transform" type="rotate" from={`240 ${CX} ${CY}`} to={`600 ${CX} ${CY}`} dur="25s" repeatCount="indefinite" />
          </circle>
        </g>
        {/* ── Centre text (Layered ABOVE the orbiting nodes for legibility) ── */}
        <text
          x={CX} y={CY - 12}
          textAnchor="middle"
          style={{ fontSize: "15px", fontWeight: 700, fill: "white", fontFamily: "Poppins, sans-serif" }}
        >
          Agents executing
        </text>
        <text
          x={CX} y={CY + 10}
          textAnchor="middle"
          style={{ fontSize: "15px", fontWeight: 700, fill: "white", fontFamily: "Poppins, sans-serif" }}
        >
          across the system
        </text>
        {/* ── Curved outer text (STATIC) ──────────────────────────────────── */}
        <text
          style={{
            fontSize: "16.5px",
            fontWeight: 600,
            fill: DARK,
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "1.5px",
            dominantBaseline: "central",
          }}
        >
          <textPath href="#outerTextArc" startOffset="50%" textAnchor="middle">
            Finance and Procurement define and control
          </textPath>
        </text>
        {/* ── Arrow arcs between domains (STATIC) ──────────────────────────── */}
        {arrowArcs.map(({ startA, endA, idx }) => (
          <path
            key={`arc-${idx}`}
            d={arcPath(ARROW_R, startA, endA)}
            fill="none"
            stroke="#8a9a9a"
            strokeWidth="1"
            markerEnd="url(#arrowHead)"
            style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 0.5s ease ${0.3 + idx * 0.08}s`,
            }}
          />
        ))}
        {/* ── 8 domain labels (equally spaced - STATIC) ───────────────────── */}
        {domains.map(({ label, angle }, i) => {
          const isAP = label === "AP";
          return (
            <text
              key={label}
              x={ptx(LABEL_R, angle)}
              y={pty(LABEL_R, angle)}
              textAnchor="middle"
              dominantBaseline="central"
              style={{
                fontSize: isAP ? "16px" : "15px",
                fontWeight: 700,
                fill: DARK,
                fontFamily: "Poppins, sans-serif",
                opacity: visible ? 1 : 0,
                transition: `opacity 0.4s ease ${0.2 + i * 0.08}s`,
              }}
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
