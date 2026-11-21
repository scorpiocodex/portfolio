import type { Config } from "tailwindcss";

/**
 * Colours are CSS-variable channels (see app/globals.css) so every utility —
 * including opacity modifiers like `bg-bg/80` — follows the active theme.
 */
const channel = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: channel("bg"),
        surface: channel("surface"),
        "surface-2": channel("surface-2"),
        border: channel("border"),
        accent: channel("accent"),
        "accent-purple": channel("accent-purple"),
        glow: channel("glow"),
        "text-primary": channel("text-primary"),
        "text-secondary": channel("text-secondary"),
        success: channel("success"),
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
    },
  },
  plugins: [],
};

export default config;
