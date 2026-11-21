"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Client-side frame for the timeline: draws the vertical rail and fills it as the
 * section scrolls into view. Everything inside stays a server component.
 */
export default function TimelineFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  return (
    <div ref={ref} className="relative max-w-4xl mx-auto">
      <div className="absolute left-[27px] md:left-1/2 top-4 bottom-4 w-px bg-border/50" />
      <motion.div
        aria-hidden="true"
        style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
        className="absolute left-[27px] md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-[0.5px] bg-gradient-to-b from-accent via-accent-purple to-accent origin-top hidden md:block"
      />
      {children}
    </div>
  );
}
