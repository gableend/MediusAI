"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const RED  = "#da2028";
const DARK = "#2f4344";

const LINKS = [
  { href: "/",                  label: "Homepage Concept"          },
  { href: "/all-cards",         label: "UI Cards Concept"          },
  { href: "/roi",               label: "ROI Calculator Concept"    },
  { href: "/payment-maturity",  label: "Payment Maturity Concept"  },
  { href: "/ai",               label: "Medius Agents Concept"     },
];

export default function SideNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Slide-in panel */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: "220px", zIndex: 1000,
        transform: open ? "translateX(0)" : "translateX(220px)",
        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        background: "white",
        boxShadow: open ? "-4px 0 32px rgba(0,0,0,0.12)" : "none",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "40px 0",
      }}>
        <div style={{ padding: "0 28px 20px", borderBottom: "1px solid #f0f0f0", marginBottom: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: RED }} />
            <span style={{ fontSize: "10px", fontWeight: 700, color: DARK, letterSpacing: "0.8px", textTransform: "uppercase" }}>
              Medius Vision
            </span>
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "2px", padding: "0 16px" }}>
          {LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 12px", borderRadius: "8px", textDecoration: "none",
                  background: isActive ? "#fff5f5" : "transparent",
                  borderLeft: isActive ? `3px solid ${RED}` : "3px solid transparent",
                  transition: "background 0.15s ease",
                }}
              >
                <span style={{
                  fontSize: "13px", fontWeight: 600,
                  color: isActive ? RED : "#374151",
                  lineHeight: 1.3,
                }}>
                  {label}
                </span>
                {isActive && (
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ marginLeft: "auto", flexShrink: 0 }}>
                    <path d="M6 4l4 4-4 4" stroke={RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Tab handle — always visible on the right edge */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close navigation" : "Open navigation"}
        style={{
          position: "fixed",
          top: "50%",
          right: open ? "220px" : "0",
          transform: "translateY(-50%)",
          zIndex: 1001,
          transition: "right 0.3s cubic-bezier(0.4,0,0.2,1)",
          background: DARK,
          border: "none",
          cursor: "pointer",
          borderRadius: "8px 0 0 8px",
          padding: "12px 8px",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5px",
          boxShadow: "-2px 2px 12px rgba(0,0,0,0.18)",
        }}
      >
        {open ? (
          /* × close icon */
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          /* ≡ menu icon */
          <>
            <span style={{ display: "block", width: "14px", height: "2px", borderRadius: "1px", background: "white" }} />
            <span style={{ display: "block", width: "10px", height: "2px", borderRadius: "1px", background: "rgba(255,255,255,0.6)" }} />
            <span style={{ display: "block", width: "14px", height: "2px", borderRadius: "1px", background: "white" }} />
          </>
        )}
      </button>

      {/* Backdrop — closes panel when clicking outside */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 999,
            background: "rgba(0,0,0,0.08)",
          }}
        />
      )}
    </>
  );
}
