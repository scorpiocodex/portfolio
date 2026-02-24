import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0D1117",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 96px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(48,54,61,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(48,54,61,0.35) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Accent glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(88,166,255,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Purple glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, #58A6FF 0%, #7C3AED 60%, #00E5FF 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            position: "relative",
          }}
        >
          {/* Label */}
          <div
            style={{
              fontSize: 13,
              color: "#8B949E",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 24,
              fontFamily: "monospace",
            }}
          >
            Full-Stack Developer · IT Professional
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 86,
              fontWeight: 700,
              color: "#E6EDF3",
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              marginBottom: 28,
            }}
          >
            San Shibu
          </div>

          {/* Handle */}
          <div
            style={{
              fontSize: 26,
              color: "#58A6FF",
              fontFamily: "monospace",
              marginBottom: 28,
            }}
          >
            @scorpiocodex
          </div>

          {/* Stack chips */}
          <div style={{ display: "flex", gap: 12 }}>
            {["React", "Node.js", "Python", "PostgreSQL"].map((t) => (
              <div
                key={t}
                style={{
                  fontSize: 14,
                  color: "#58A6FF",
                  background: "rgba(88,166,255,0.08)",
                  border: "1px solid rgba(88,166,255,0.2)",
                  borderRadius: 6,
                  padding: "6px 14px",
                  fontFamily: "monospace",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom-right: GitHub */}
        <div
          style={{
            position: "absolute",
            bottom: 52,
            right: 96,
            fontSize: 15,
            color: "#30363D",
            fontFamily: "monospace",
            letterSpacing: "0.05em",
          }}
        >
          github.com/scorpiocodex
        </div>
      </div>
    ),
    { ...size }
  );
}
