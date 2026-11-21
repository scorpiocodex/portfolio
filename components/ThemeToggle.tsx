"use client";

import { applyTheme, useTheme } from "@/lib/theme";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const theme = useTheme();
  const isMidnight = theme === "midnight";
  const nextLabel = isMidnight ? "Deep Ocean" : "Midnight";

  return (
    <button
      onClick={() => applyTheme(isMidnight ? "deep-ocean" : "midnight")}
      className="group relative flex items-center justify-center w-8 h-8 rounded-lg border border-border bg-surface hover:border-accent hover:bg-surface/80 transition-all duration-200"
      aria-label={`Switch to ${nextLabel} theme`}
      title={`Switch to ${nextLabel} theme`}
    >
      {/* Moon icon (midnight) */}
      <motion.svg
        aria-hidden="true"
        className="w-4 h-4 absolute"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          opacity: isMidnight ? 1 : 0,
          scale: isMidnight ? 1 : 0.5,
          rotate: isMidnight ? 0 : -90,
        }}
        transition={{ duration: 0.2 }}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </motion.svg>

      {/* Wave/Ocean icon (deep-ocean) */}
      <motion.svg
        aria-hidden="true"
        className="w-4 h-4 absolute"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          opacity: isMidnight ? 0 : 1,
          scale: isMidnight ? 0.5 : 1,
          rotate: isMidnight ? 90 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <path d="M2 12c2-2.67 5.33-2.67 8 0s5.33 2.67 8 0" />
        <path d="M2 17c2-2.67 5.33-2.67 8 0s5.33 2.67 8 0" />
        <path d="M2 7c2-2.67 5.33-2.67 8 0s5.33 2.67 8 0" />
      </motion.svg>
    </button>
  );
}
