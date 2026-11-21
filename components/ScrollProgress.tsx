"use client";

import { motion, useScroll } from "framer-motion";

/** Reading-progress bar driven by a motion value — no React re-render per scroll event. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 w-full z-[70] h-[2px] bg-transparent pointer-events-none"
    >
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="h-full w-full origin-left bg-gradient-to-r from-accent via-glow to-accent-purple"
      />
    </div>
  );
}
