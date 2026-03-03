"use client";

import { SITE, SOCIAL } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpIcon, GithubIcon } from "./icons";

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

        <div className="max-w-content mx-auto px-6 py-12">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12 border-b border-border/50 pb-12">

            {/* Brand / Bio */}
            <div className="md:col-span-2">
              <h3 className="font-space-grotesk text-xl font-bold text-text-primary mb-4">{SITE.name}</h3>
              <p className="text-text-secondary text-sm leading-relaxed max-w-sm mb-6">
                Full-stack developer engineering thoughtful, high-performance digital experiences.
              </p>
              <div className="font-mono text-[10px] text-text-secondary/40 tracking-widest">
                NEXT.JS · TYPESCRIPT · TAILWINDCSS · FRAMER MOTION
              </div>
            </div>

            {/* Sitemap Navigation */}
            <div>
              <h4 className="font-mono text-[11px] font-semibold text-text-primary tracking-widest uppercase mb-5">Navigation</h4>
              <ul className="space-y-3 text-sm text-text-secondary">
                <li><a href="#about" className="hover:text-accent transition-colors duration-200">About</a></li>
                <li><a href="#experience" className="hover:text-accent transition-colors duration-200">Experience</a></li>
                <li><a href="#projects" className="hover:text-accent transition-colors duration-200">Projects</a></li>
                <li><a href="#skills" className="hover:text-accent transition-colors duration-200">Skills</a></li>
                <li><a href="#github" className="hover:text-accent transition-colors duration-200">GitHub Stats</a></li>
              </ul>
            </div>

            {/* Social / Connect */}
            <div>
              <h4 className="font-mono text-[11px] font-semibold text-text-primary tracking-widest uppercase mb-5">Connect</h4>
              <ul className="space-y-3 text-sm text-text-secondary">
                <li>
                  <a href={SOCIAL.github.url} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="flex items-center gap-2 hover:text-accent transition-colors duration-200 group">
                    <GithubIcon className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                    <span>GitHub</span>
                  </a>
                </li>
                <li>
                  <a href={SOCIAL.linkedin.url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="flex items-center gap-2 hover:text-accent transition-colors duration-200 group">
                    <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SOCIAL.email}`} aria-label="Send email" className="flex items-center gap-2 hover:text-accent transition-colors duration-200 group">
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Email</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-text-secondary">
                © {year} {SITE.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-text-secondary/40 tracking-widest text-center sm:text-right">
                DESIGNED & ENGINEERED WITH PRECISION
              </span>
            </div>
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
            className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 p-2.5 rounded-lg border border-border bg-surface/90 backdrop-blur-sm text-text-secondary hover:text-accent hover:border-accent transition-colors duration-200 shadow-lg"
            aria-label="Scroll back to top"
          >
            <ArrowUpIcon className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
