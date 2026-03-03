"use client";

import { NAV_LINKS, SOCIAL } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GithubIcon } from "./icons";
import ThemeToggle from "./ThemeToggle";

const navLinks = NAV_LINKS;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      let current = "";
      for (const link of [...navLinks]) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= 100) {
          current = link.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);

    // Prevent background scrolling when menu is open
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Static accent base line */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] accent-line" />

      <header
        className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-content mx-auto px-6 py-3.5 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-space-grotesk text-sm font-semibold text-text-primary tracking-tight hover:text-accent transition-colors duration-200"
          >
            San Shibu
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`nav-link text-[11px] transition-colors duration-200 tracking-wider uppercase font-mono ${isActive
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary"
                    }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Theme Toggle & GitHub CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <a
              href={SOCIAL.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="flex items-center gap-1.5 text-[11px] font-mono font-medium text-accent border border-border px-3 py-1.5 rounded-lg hover:border-accent hover:bg-accent/5 transition-all duration-200"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              {SOCIAL.github.username}
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-1 text-text-secondary hover:text-text-primary transition-colors"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-current"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-px bg-current"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-current"
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-bg/60 backdrop-blur-sm z-30 md:hidden"
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-[240px] bg-surface/95 backdrop-blur-xl border-l border-border z-40 md:hidden flex flex-col pt-24 shadow-2xl"
            >
              <nav className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6" aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                    className={`text-base tracking-wide transition-colors font-mono ${activeSection === link.id
                      ? "text-accent"
                      : "text-text-secondary hover:text-text-primary"
                      }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + navLinks.length * 0.05, duration: 0.3 }}
                  className="mt-4 pt-6 flex flex-col gap-6 border-t border-border/50"
                >
                  <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <span className="font-mono text-[11px] text-text-secondary">Theme</span>
                  </div>
                  <a
                    href={SOCIAL.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-accent font-mono w-max hover:text-accent-hover transition-colors"
                  >
                    <GithubIcon className="w-5 h-5" />
                    {SOCIAL.github.username}
                  </a>
                  <div className="flex items-center gap-2 mt-2 opacity-50">
                    <kbd className="font-mono text-[10px] border border-border rounded px-1.5 py-0.5 bg-surface text-text-secondary">⌘K</kbd>
                    <span className="font-mono text-[10px] text-text-secondary">Quick search</span>
                  </div>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
