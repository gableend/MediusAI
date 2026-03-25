"use client";

// ─── Logo data ────────────────────────────────────────────────────────────────
const LOGOS = [
  { name: "Karl Lagerfeld",    src: "https://www.medius.com/media/co5l5p4c/karl-lagerfeld.png?rmode=max&width=150&height=0" },
  { name: "Puma",              src: "https://www.medius.com/media/3syn2tfd/puma.png?rmode=max&width=150&height=0" },
  { name: "Nissan",            src: "https://www.medius.com/media/qzahgduq/nissan.png?rmode=max&width=150&height=0" },
  { name: "Tony's Chocolonely",src: "https://www.medius.com/media/cibcw24x/tonys-chocolonely-16x9-padded.png?rmode=max&width=150&height=0" },
  { name: "Lush",              src: "https://www.medius.com/media/qx1hivgw/lush.png?rmode=max&width=150&height=0" },
  { name: "U-Haul",            src: "https://www.medius.com/media/cg2jzrk3/uhaul.png?rmode=max&width=150&height=0" },
  { name: "Viking Line",       src: "https://www.medius.com/media/brxj5sdh/viking-line-16x9.png?rmode=max&width=150&height=0" },
  { name: "Cineplex",          src: "https://www.medius.com/media/3pals1xy/cineplex-16x9.png?rmode=max&width=150&height=0" },
  { name: "R.M. Williams",     src: "https://www.medius.com/media/sfadrnhi/rm-williams-16x9.png?rmode=max&width=150&height=0" },
  { name: "Iconix",            src: "https://www.medius.com/media/1unm3r2c/iconix.png?rmode=max&width=150&height=0" },
  { name: "Furst McNess",      src: "https://www.medius.com/media/pj2dipn5/furst-mcness-16x9.png?rmode=max&width=150&height=0" },
  { name: "LifeHealthcare",    src: "https://www.medius.com/media/pw2hpqqz/lifehealthcare-16x9.png?rmode=max&width=150&height=0" },
  { name: "JJ Taylor",         src: "https://www.medius.com/media/rltfwhbh/jj-taylor.png?rmode=max&width=150&height=0" },
];

// Duplicate for seamless infinite loop — first set scrolls off, second set
// is already in position. CSS animation loops at exactly -50% translateX.
const TRACK = [...LOGOS, ...LOGOS];

export default function CustomerLogoBar() {
  return (
    <section
      style={{
        background: "white",
        borderBottom: "1px solid #f0f0f0",
        padding: "28px 0 24px",
        overflow: "hidden",
      }}
    >
      {/* Label */}
      <p
        style={{
          textAlign: "center",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "1.2px",
          textTransform: "uppercase",
          color: "#c0c0c0",
          marginBottom: "22px",
        }}
      >
        Trusted by 3,000+ companies worldwide
      </p>

      {/* Marquee wrapper — fade edges with a mask */}
      <div
        style={{
          position: "relative",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        {/* Scrolling track */}
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "logoMarquee 52s linear infinite",
          }}
        >
          {TRACK.map(({ name, src }, i) => (
            <div
              key={`${name}-${i}`}
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 72px",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={name}
                style={{
                  height: "81px",
                  width: "auto",
                  maxWidth: "240px",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
