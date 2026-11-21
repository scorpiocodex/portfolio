"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpIcon } from "./icons";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 p-2.5 rounded-lg border border-border bg-surface/90 backdrop-blur-sm text-text-secondary hover:text-accent hover:border-accent transition-colors duration-200 shadow-lg"
          aria-label="Scroll back to top"
        >
          <ArrowUpIcon className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
