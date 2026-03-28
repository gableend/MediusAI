"use client";
import React, { useEffect, useState } from "react";
// Define Colors
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
// Adjusted Radii
const LABEL_R   = 165;
const ARROW_R   = 165;
const OUTER_R   = 280;
const RED_R     = 232;
const CENTRE_R  = 108;
// Adjusted text arc radius slightly inward to account for font height
const TEXT_ARC_R = 254;
export default function AgentEcosystemDiagram() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);
  // Use the specific shift values to "slide" the arrows clockwise/counter-clockwise.
  // This balances the gaps without changing the arrow lengths.
  const arrowShifts = [
    4,   // 0: Sourcing -> Contracts
    0,   // 1: Contracts -> Suppliers
    0,   // 2: Suppliers -> Procurement
   -4,   // 3: Procurement -> Invoicing
    4,   // 4: Invoicing -> AP
    0,   // 5: AP -> Payments
    0,   // 6: Payments -> Expenses
   -4    // 7: Expenses -> Sourcing
  ];
  // Arrow arcs between consecutive domains
  const arrowArcs = domains.map((d, i) => {
    const next = domains[(i + 1) % domains.length];
    const shift = arrowShifts[i];

    // start: d.angle + 14 + shift
    // end: next.angle - 14 + shift
    // This maintains a length of next.angle - d.angle - 28 = 45 - 28 = 17 degrees.
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
          {/* Centre radial gradient - keep as is */}
          <radialGradient id="centreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#0a0a0a" />
            <stop offset="55%"  stopColor="#1a0c0e" />
            <stop offset="78%"  stopColor="#8b1a1f" />
            <stop offset="92%"  stopColor={RED} />
            <stop offset="100%" stopColor={RED} />
          </radialGradient>
          {/* New linear red-to-charcoal gradient for AP circle */}
          <linearGradient id="apGrad" x1="0%" y1="50%" x2="100%" y2="50%">
             <stop offset="0%" stopColor={RED} />
             <stop offset="100%" stopColor="#222222" />
          </linearGradient>
          {/* Curved text path: arc across the TOP */}
          <path
            id="outerTextArc"
            d={`M ${CX - TEXT_ARC_R},${CY} A ${TEXT_ARC_R},${TEXT_ARC_R} 0 0,1 ${CX + TEXT_ARC_R},${CY}`}
            fill="none"
          />

          {/* Subtle pulse filter for Agents gradient circle */}
          <filter id="agentsSubtlePulseFilter">
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="pulseGlow" />
            </feMerge>
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
            <feFlood floodColor={RED} floodOpacity="0.3" result="flood" />
            <feComposite in="flood" in2="blur" operator="in" result="pulseGlow" />
             <feComponentTransfer in="pulseGlow">
                 <feFuncA type="linear" slope="0.6">
                      <animate attributeName="slope" values="0.6;0.1;0.6" dur="3s" repeatCount="indefinite" />
                 </feFuncA>
             </feComponentTransfer>
          </filter>

          {/* Specific glow filter for the AP circle */}
          <filter id="apGlowFilter">
              <feMerge>
                  <feMergeNode in="SourceGraphic" />
                  <feMergeNode in="blurGlow" />
              </feMerge>
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feComponentTransfer in="blur">
                   <feFuncA type="linear" slope="1">
                        <animate attributeName="slope" values="1;0;1" dur="2s" repeatCount="indefinite" />
                   </feFuncA>
              </feComponentTransfer>
          </filter>
        </defs>
        {/* ── Outer grey ring ──────────────────────────────────────────────── */}
        <circle cx={CX} cy={CY} r={OUTER_R} fill="#e2e4e4" />
        {/* ── Red border ring ──────────────────────────────────────────────── */}
        <circle cx={CX} cy={CY} r={RED_R} fill="none" stroke={RED} strokeWidth="3.5" />
        {/* ── Inner cream fill ─────────────────────────────────────────────── */}
        <circle cx={CX} cy={CY} r={RED_R - 2} fill="#f3ede1" />
        {/* ── Centre dark circle with subtle pulse ─────────────────────────── */}
        <circle cx={CX} cy={CY} r={CENTRE_R} fill="url(#centreGrad)" filter="url(#agentsSubtlePulseFilter)" />
        <circle cx={CX} cy={CY} r={CENTRE_R * 0.55} fill="#0c0c0c" />
        {/* ── Centre text ──────────────────────────────────────────────────── */}
        <text
          x={CX} y={CY - 6}
          textAnchor="middle"
          style={{ fontSize: "15px", fontWeight: 700, fill: "white", fontFamily: "Poppins, sans-serif" }}
        >
          Agents executing
        </text>
        <text
          x={CX} y={CY + 18}
          textAnchor="middle"
          style={{ fontSize: "15px", fontWeight: 700, fill: "white", fontFamily: "Poppins, sans-serif" }}
        >
          across the system
        </text>
        {/* ── Curved outer text ───────────────────────────────────────────── */}
        <text
          style={{
            fontSize: "16.5px",
            fontWeight: 700,
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
          const tx = CX + LABEL_R * Math.cos(toRad(angle));
          const ty = CY + LABEL_R * Math.sin(toRad(angle));

          if (isAP) {
               return (
                    <g key={label}>
                        {/* Pulsing gradient circle for AP with scale animation */}
                        <circle
                             cx={tx} cy={ty}
                             r="22"
                             fill="url(#apGrad)"
                             filter="url(#apGlowFilter)"
                        >
                             <animate attributeName="r" values="22;24;22" dur="2s" repeatCount="indefinite" />
                        </circle>
                         {/* AP text is bold and white to contrast the background */}
                        <text
                             x={tx} y={ty}
                             textAnchor="middle"
                             dominantBaseline="central"
                             style={{
                                 fontSize: "16px",
                                 fontWeight: 700,
                                 fill: "white",
                                 fontFamily: "Poppins, sans-serif",
                                 opacity: visible ? 1 : 0,
                                 transition: `opacity 0.4s ease ${0.2 + i * 0.08}s`,
                             }}
                        >
                             {label}
                        </text>
                    </g>
               );
          } else {
               return (
                    <text
                        key={label}
                        x={tx} y={ty}
                        textAnchor="middle"
                        dominantBaseline="central"
                        style={{
                            fontSize: "15px",
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
          }
        })}
      </svg>
    </div>
  );
}
