"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * App-wide client providers. `reducedMotion="user"` makes every framer-motion
 * transform/layout animation respect the visitor's prefers-reduced-motion setting.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
