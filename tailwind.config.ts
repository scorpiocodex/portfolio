import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0D1117",
        surface: "#161B22",
        "surface-2": "#21262D",
        border: "#30363D",
        accent: "#58A6FF",
        "accent-purple": "#7C3AED",
        glow: "#00E5FF",
        "text-primary": "#E6EDF3",
        "text-secondary": "#8B949E",
        success: "#3FB950",
        danger: "#F85149",
      },
      fontFamily: {
        "space-grotesk": ["var(--font-space-grotesk)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      maxWidth: {
        content: "1100px",
      },
      borderRadius: {
        card: "12px",
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        scan: "scan 8s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scan: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 100%" },
        },
      },
      boxShadow: {
        "glow-sm": "0 0 20px rgba(88, 166, 255, 0.15)",
        "glow-md": "0 0 40px rgba(88, 166, 255, 0.2)",
        "glow-lg": "0 0 60px rgba(88, 166, 255, 0.25)",
        "glow-cyan": "0 0 40px rgba(0, 229, 255, 0.2)",
        "glow-purple": "0 0 40px rgba(124, 58, 237, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
