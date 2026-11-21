"use client";

import { motion, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const subscribeFinePointer = (onChange: () => void) => {
  const list = window.matchMedia(FINE_POINTER);
  list.addEventListener("change", onChange);
  return () => list.removeEventListener("change", onChange);
};
const getFinePointer = () => window.matchMedia(FINE_POINTER).matches;

/** Soft glow that follows the cursor. Desktop pointers only; off under reduced motion. */
export default function CursorSpotlight() {
  const reduceMotion = useReducedMotion();
  const isDesktop = useSyncExternalStore(subscribeFinePointer, getFinePointer, () => false);
  const [isVisible, setIsVisible] = useState(false);

  // Use springs for smooth following
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const enabled = isDesktop && !reduceMotion;

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [enabled, cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[-1] mix-blend-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 0.6 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          width: "50vw",
          height: "50vw",
          maxWidth: "600px",
          maxHeight: "600px",
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 8%, transparent) 0%, transparent 50%)",
        }}
      />
    </motion.div>
  );
}
