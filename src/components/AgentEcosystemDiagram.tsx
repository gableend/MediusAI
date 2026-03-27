"use client";

import React from "react";

const RED  = "#da2028";
const DARK = "#2f4344";

/**
 * Concentric-circle diagram showing the Medius agent ecosystem.
 *
 * Outer ring:  "Finance and Procurement define and control"
 * Middle ring: 7 spend-management domains with directional arrows
 * Centre:      "Agents executing across the system"
 * AP badge:    positioned on the red border ring
 *
 * Pure HTML / CSS / inline SVG, no canvas, no external images.
 */
export default function AgentEcosystemDiagram() {
  /* ------------------------------------------------------------------ */
  /*  Layout constants (px, relative to the 600px wrapper)               */
  /* ------------------------------------------------------------------ */
  const SIZE       = 600;   // overall viewbox
  const OUTER_R    = 290;   // outer grey ring outer radius
  const RED_R      = 240;   // red circle radius
  const INNER_R    = 120;   // dark centre outer radius
  const CX         = SIZE / 2;
  const CY         = SIZE / 2;

  /* Domain labels placed on the mid-ring (between red circle and centre) */
  const MID_R = (RED_R + INNER_R) / 2 + 8; // radial position of labels
  const domains = [
    { label: "Sourcing",      angle: -72  },
    { label: "Contracts",     angle: -20  },
    { label: "Suppliers",     angle:  35  },
    { label: "Procurement",   angle:  80  },
    { label: "Invoicing",     angle: 135  },
    { label: "Payments",      angle: 190  },
    { label: "Expenses",      angle: 245  },
  ];

  /* Arrow angles: each sits between two consecutive domain labels */
  const arrows = domains.map((_, i) => {
    const a1 = domains[i].angle;
    const a2 = domains[(i + 1) % domains.length].angle;
    let mid = (a1 + a2) / 2;
    // handle wrap-around
    if (a2 < a1) mid = ((a1 + a2 + 360) / 2) % 360;
    return { angle: mid, direction: (a1 + a2) / 2 };
  });

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  /* Helper: polar to cartesian */
  const polar = (r: number, angleDeg: number) => ({
    x: CX + r * Math.cos(toRad(angleDeg)),
    y: CY + r * Math.sin(toRad(angleDeg)),
  });

  /* AP badge position -- lower-left on the red ring */
  const apPos = polar(RED_R, 210);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: `${SIZE}px`,
        margin: "0 auto",
        aspectRatio: "1 / 1",
        position: "relative",
      }}
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width="100%"
        height="100%"
        style={{ display: "block" }}
      >
        {/* ── Outer grey ring ─────────────────────────────────── */}
        <circle cx={CX} cy={CY} r={OUTER_R} fill="#e4e6e6" />

        {/* ── Red border circle ───────────────────────────────── */}
        <circle cx={CX} cy={CY} r={RED_R} fill="none" stroke={RED} strokeWidth="4" />

        {/* ── Inner cream area (between red circle and centre) ─ */}
        <circle cx={CX} cy={CY} r={RED_R - 2} fill="#f5f0e8" />

        {/* ── Centre dark circle with red-ring gradient ────────  */}
        <defs>
          <radialGradient id="centreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="#1a1a1a" />
            <stop offset="60%" stopColor="#2a1215" />
            <stop offset="85%" stopColor={RED} />
            <stop offset="100%" stopColor={RED} />
          </radialGradient>
        </defs>
        <circle cx={CX} cy={CY} r={INNER_R} fill="url(#centreGrad)" />
        {/* Inner dark core */}
        <circle cx={CX} cy={CY} r={INNER_R * 0.6} fill="#0f0f0f" />

        {/* ── Centre text ─────────────────────────────────────── */}
        <text
          x={CX}
          y={CY - 14}
          textAnchor="middle"
          style={{ fontSize: "16px", fontWeight: 800, fill: "white", fontFamily: "Poppins, sans-serif" }}
        >
          Agents executing
        </text>
        <text
          x={CX}
          y={CY + 8}
          textAnchor="middle"
          style={{ fontSize: "16px", fontWeight: 800, fill: "white", fontFamily: "Poppins, sans-serif" }}
        >
          across the system
        </text>

        {/* ── Curved text on outer ring ───────────────────────── */}
        <defs>
          <path
            id="outerTextPath"
            d={`M ${CX - OUTER_R + 24},${CY} A ${OUTER_R - 24},${OUTER_R - 24} 0 1,1 ${CX + OUTER_R - 24},${CY}`}
            fill="none"
          />
        </defs>
        <text style={{ fontSize: "18px", fontWeight: 600, fill: DARK, fontFamily: "Poppins, sans-serif", letterSpacing: "2px" }}>
          <textPath href="#outerTextPath" startOffset="50%" textAnchor="middle">
            Finance and Procurement define and control
          </textPath>
        </text>

        {/* ── Domain labels ───────────────────────────────────── */}
        {domains.map(({ label, angle }) => {
          const pos = polar(MID_R, angle);
          return (
            <text
              key={label}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="central"
              style={{
                fontSize: "15px",
                fontWeight: 700,
                fill: DARK,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {label}
            </text>
          );
        })}

        {/* ── Arrows between domains ──────────────────────────── */}
        {arrows.map(({ angle }, i) => {
          const ARROW_R = MID_R + 2;
          const pos = polar(ARROW_R, angle);
          const dir = toRad(angle + 90); // tangent direction (clockwise)
          const arrowSize = 5;
          // arrowhead pointing clockwise along the circle
          const tip = { x: pos.x + arrowSize * Math.cos(dir), y: pos.y + arrowSize * Math.sin(dir) };
          const left = {
            x: pos.x - arrowSize * Math.cos(dir) + arrowSize * 0.6 * Math.cos(dir + Math.PI / 2),
            y: pos.y - arrowSize * Math.sin(dir) + arrowSize * 0.6 * Math.sin(dir + Math.PI / 2),
          };
          const right = {
            x: pos.x - arrowSize * Math.cos(dir) - arrowSize * 0.6 * Math.cos(dir + Math.PI / 2),
            y: pos.y - arrowSize * Math.sin(dir) - arrowSize * 0.6 * Math.sin(dir + Math.PI / 2),
          };
          return (
            <polygon
              key={`arrow-${i}`}
              points={`${tip.x},${tip.y} ${left.x},${left.y} ${right.x},${right.y}`}
              fill="#7a8a8a"
            />
          );
        })}

        {/* ── AP badge ────────────────────────────────────────── */}
        <circle cx={apPos.x} cy={apPos.y} r="20" fill="#6b1015" />
        <circle cx={apPos.x} cy={apPos.y} r="16" fill={RED} />
        <text
          x={apPos.x}
          y={apPos.y + 1}
          textAnchor="middle"
          dominantBaseline="central"
          style={{ fontSize: "13px", fontWeight: 800, fill: "white", fontFamily: "Poppins, sans-serif" }}
        >
          AP
        </text>
      </svg>
    </div>
  );
}
