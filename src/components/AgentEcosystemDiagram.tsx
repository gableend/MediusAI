"use client";

import React, { useEffect, useState } from "react";

const RED  = "#da2028";
const DARK = "#2f4344";
const SAND = "#ab9c6d";

// ── Geometry helpers ────────────────────────────────────────────────────────
const CX = 300;
const CY = 300;
const SIZE = 600;

const toRad = (d: number) => (d * Math.PI) / 180;
const px = (r: number, deg: number) => CX + r * Math.cos(toRad(deg));
const py = (r: number, deg: number) => CY + r * Math.sin(toRad(deg));

// SVG arc helper (large-arc = 0 for arcs < 180 deg)
function arcPath(r: number, startDeg: number, endDeg: number) {
  const x1 = px(r, startDeg), y1 = py(r, startDeg);
  const x2 = px(r, endDeg),   y2 = py(r, endDeg);
  const sweep = endDeg - startDeg;
  const large = Math.abs(sweep) > 180 ? 1 : 0;
  const dir = sweep > 0 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} ${dir} ${x2} ${y2}`;
}

// ── Domain data ─────────────────────────────────────────────────────────────
// 7 domains placed clockwise starting from top-centre
// Angles measured from 12-o'clock position (SVG: -90 offset)
const domains = [
  { label: "Sourcing",      angle: -60  },
  { label: "Contracts",     angle: -8   },
  { label: "Suppliers",     angle:  42  },
  { label: "Procurement",   angle:  95  },
  { label: "Invoicing",     angle: 148  },
  { label: "Payments",      angle: 200  },
  { label: "Expenses",      angle: 252  },
];

const LABEL_R   = 182;  // radius for domain label placement
const ARROW_R   = 175;  // radius for arrow arcs
const OUTER_R   = 280;  // outer grey ring
const RED_R     = 232;  // red circle
const CENTRE_R  = 108;  // centre dark circle

/**
 * Concentric-circle diagram: Medius Agent Ecosystem
 *
 * Outer grey ring:  "Finance and Procurement define and control"
 * Red border:       separating governance from workflow
 * Cream middle:     7 spend domains with clockwise arrows
 * Dark centre:      "Agents executing across the system"
 * AP badge:         on the red ring at ~210 degrees
 */
export default function AgentEcosystemDiagram() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Arrow arcs: small curved arrows between consecutive domains
  const arrowArcs = domains.map((d, i) => {
    const next = domains[(i + 1) % domains.length];
    let startA = d.angle + 14;       // offset past the label
    let endA   = next.angle - 14;    // stop before next label
    // handle wrap from Expenses back to Sourcing
    if (endA < startA) endA += 360;
    return { startA, endA, idx: i };
  });

  // AP badge at ~210 degrees on the red ring
  const apAngle = 215;

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
          {/* Arrowhead marker */}
          <marker id="arrowHead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#8a9a9a" />
          </marker>

          {/* Centre radial gradient */}
          <radialGradient id="centreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#0a0a0a" />
            <stop offset="55%"  stopColor="#1a0c0e" />
            <stop offset="78%"  stopColor="#8b1a1f" />
            <stop offset="92%"  stopColor={RED} />
            <stop offset="100%" stopColor={RED} />
          </radialGradient>

          {/* Outer text arc: top half, clockwise */}
          <path
            id="outerTextArc"
            d={arcPath(OUTER_R - 22, -210, -330)}
            fill="none"
          />
        </defs>

        {/* ── Outer grey ring ──────────────────────────────────────────────── */}
        <circle cx={CX} cy={CY} r={OUTER_R} fill="#e2e4e4" />

        {/* ── Red border ring ──────────────────────────────────────────────── */}
        <circle cx={CX} cy={CY} r={RED_R} fill="none" stroke={RED} strokeWidth="3.5" />

        {/* ── Inner cream fill ─────────────────────────────────────────────── */}
        <circle cx={CX} cy={CY} r={RED_R - 2} fill="#f3ede1" />

        {/* ── Centre dark circle ───────────────────────────────────────────── */}
        <circle cx={CX} cy={CY} r={CENTRE_R} fill="url(#centreGrad)" />
        <circle cx={CX} cy={CY} r={CENTRE_R * 0.55} fill="#0c0c0c" />

        {/* ── Centre text ──────────────────────────────────────────────────── */}
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

        {/* ── Curved outer text ────────────────────────────────────────────── */}
        <text
          style={{
            fontSize: "16.5px",
            fontWeight: 600,
            fill: DARK,
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "1.5px",
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
            strokeWidth="1.2"
            markerEnd="url(#arrowHead)"
            style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 0.5s ease ${0.3 + idx * 0.08}s`,
            }}
          />
        ))}

        {/* ── Domain labels ────────────────────────────────────────────────── */}
        {domains.map(({ label, angle }, i) => (
          <text
            key={label}
            x={px(LABEL_R, angle)}
            y={py(LABEL_R, angle)}
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
        ))}

        {/* ── AP badge ─────────────────────────────────────────────────────── */}
        <g style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.8s" }}>
          <circle
            cx={px(RED_R, apAngle)}
            cy={py(RED_R, apAngle)}
            r="18"
            fill="#5a1012"
          />
          <circle
            cx={px(RED_R, apAngle)}
            cy={py(RED_R, apAngle)}
            r="14.5"
            fill={RED}
          />
          <text
            x={px(RED_R, apAngle)}
            y={py(RED_R, apAngle) + 1}
            textAnchor="middle"
            dominantBaseline="central"
            style={{
              fontSize: "11.5px",
              fontWeight: 800,
              fill: "white",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            AP
          </text>
        </g>
      </svg>
    </div>
  );
}
