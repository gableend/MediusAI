"use client";
import React, { useEffect, useState } from "react";
const RED = "#da2028";
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
// Adjusted Radii
const LABEL_R   = 165;  // Text radius
const ARROW_R   = 165;  // Matched to LABEL_R so arrows intersect the text line
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
  // Shift values (in degrees) to "slide" specific arrows away from the longer text labels
  // Positive = slide clockwise, Negative = slide counter-clockwise
  const arrowShifts = [
    4,   // 0: Sourcing -> Contracts (slide right, away from Sourcing)
    0,   // 1: Contracts -> Suppliers
    0,   // 2: Suppliers -> Procurement
   -4,   // 3: Procurement -> Invoicing (slide left, away from Invoicing)
    4,   // 4: Invoicing -> AP (slide right, away from Invoicing)
    0,   // 5: AP -> Payments
    0,   // 6: Payments -> Expenses
   -4    // 7: Expenses -> Sourcing (slide left, away from Sourcing)
  ];
  // Arrow arcs between consecutive domains
  const arrowArcs = domains.map((d, i) => {
    const next = domains[(i + 1) % domains.length];
    const shift = arrowShifts[i];

    let startA = d.angle + 14 + shift;
    let endA   = next.angle - 14 + shift;

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
          {/* Centre linear gradient - Left to right (0 degrees) */}
          <linearGradient id="centreGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor={RED} />
            <stop offset="100%" stopColor="#222222" /> {/* Charcoal */}
          </linearGradient>
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
        {/* ── Rotating Gradient Background ────────────────────────────── */}
        <circle cx={CX} cy={CY} r={CENTRE_R} fill="url(#centreGrad)">
          {/* Sped up to 6s to better match the snappy feel of the video */}
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${CX} ${CY}`}
            to={`360 ${CX} ${CY}`}
            dur="6s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Inner static cap (Solid White) - Creates the border effect */}
        <circle cx={CX} cy={CY} r={CENTRE_R - 14} fill="#ffffff" />
        {/* ── Centre text ──────────────────────────────────────────────────── */}
        <text
          x={CX} y={CY - 12}
          textAnchor="middle"
          style={{ fontSize: "15px", fontWeight: 700, fill: DARK, fontFamily: "Poppins, sans-serif" }}
        >
          Agents executing
        </text>
        <text
          x={CX} y={CY + 10}
          textAnchor="middle"
          style={{ fontSize: "15px", fontWeight: 700, fill: DARK, fontFamily: "Poppins, sans-serif" }}
        >
          across the system
        </text>
        {/* ── Curved outer text ───────────────────────────────────────────── */}
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
        {/* ── Arrow arcs between domains ───────────────────────────────────── */}
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
        {/* ── 8 domain labels (equally spaced) ────────────────────────────── */}
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
