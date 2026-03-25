"use client";

import { useRef, useEffect, useState } from "react";

const DARK = "#2f4344";
const RED  = "#da2028";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#f8f9fa",
        padding: "88px 32px 80px",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>

        {/* ── Text block ── */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "52px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: visible ? "opacity 0.6s ease, transform 0.6s ease" : "none",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 800,
              color: DARK,
              lineHeight: 1.15,
              letterSpacing: "-0.5px",
              margin: "0 auto 16px",
              maxWidth: "960px",
            }}
          >
            With Medius{" "}
            <span style={{ color: RED }}>spend runs as a system</span>
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "#6b7280",
              lineHeight: 1.7,
              margin: "0 auto",
              maxWidth: "560px",
            }}
          >
            Autonomous by design. Finance teams stay in control.
          </p>
        </div>

        {/* ── Video ── */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: visible ? "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s" : "none",
          }}
        >
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          >
            <source src="/video/Product_Vision  -  VIDEO.mp4" type="video/mp4" />
          </video>
        </div>

      </div>
    </section>
  );
}
