"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon, ArrowUpIcon } from "./icons";

export default function Footer() {
  const year = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer className="relative border-t border-border/50 bg-bg">
        {/* Top accent line */}
        <div className="h-[1px] accent-line" />

        <div className="max-w-content mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Left: Name + copyright */}
            <div className="flex items-center gap-3">
              <span className="font-space-grotesk text-sm font-semibold text-text-primary">
                San Shibu
              </span>
              <span className="text-border">·</span>
              <span className="font-mono text-[11px] text-text-secondary">
                © {year}
              </span>
            </div>

            {/* Center: Tagline */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-text-secondary/50 tracking-widest">
                Built with precision.
              </span>
            </div>

            {/* Right: GitHub link */}
            <a
              href="https://github.com/scorpiocodex"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[11px] text-text-secondary hover:text-accent transition-colors duration-200 group"
            >
              <GithubIcon className="w-3.5 h-3.5 fill-current" />
              <span className="group-hover:underline">scorpiocodex</span>
            </a>
          </div>

          {/* Stack note */}
          <div className="mt-6 pt-5 border-t border-border/30 flex justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-mono text-[10px] text-text-secondary/30 tracking-widest text-center"
            >
              NEXT.JS · TYPESCRIPT · TAILWINDCSS · FRAMER MOTION
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 p-2.5 rounded-lg border border-border bg-surface text-text-secondary hover:text-accent hover:border-accent transition-colors duration-200"
            aria-label="Scroll back to top"
          >
            <ArrowUpIcon className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
