"use client";

import { NAV_LINKS, SOCIAL } from "@/lib/constants";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { GithubIcon } from "./icons";
import ThemeToggle from "./ThemeToggle";

const noopSubscribe = () => () => {};
const getIsApplePlatform = () =>
  /Mac|iP(hone|ad|od)/.test(navigator.userAgent || navigator.platform || "");

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Static for the page's lifetime: subscribe is a no-op, the server snapshot is "not Apple".
  const isMac = useSyncExternalStore(noopSubscribe, getIsApplePlatform, () => false);

  // Scroll-spy: one rAF-throttled listener that only touches state when a value changes.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);

      let current = "";
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= 100) current = link.id;
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Mobile drawer: Escape closes, background scroll locks, focus moves in and returns.
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    const button = menuButtonRef.current;
    const focusTimer = window.setTimeout(() => {
      drawerRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    }, 50);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.clearTimeout(focusTimer);
      button?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  useFocusTrap(drawerRef, menuOpen);

  return (
    <>
      {/* Static accent base line */}
      <div aria-hidden="true" className="fixed top-0 left-0 right-0 z-[60] h-[2px] accent-line" />

      <header
        className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-bg/90 backdrop-blur-md border-b border-border/60" : "bg-transparent"
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
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`nav-link text-[11px] transition-colors duration-200 tracking-wider uppercase font-mono ${
                    isActive ? "text-accent" : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Theme Toggle & GitHub CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
              aria-label="Open command palette"
              title="Command palette"
              className="flex items-center gap-1 h-8 px-2.5 rounded-lg border border-border font-mono text-[10px] text-text-secondary hover:text-accent hover:border-accent transition-all duration-200"
            >
              <kbd className="font-mono">{isMac ? "⌘" : "Ctrl"}</kbd>
              <kbd className="font-mono">K</kbd>
            </button>
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
            ref={menuButtonRef}
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
              ref={drawerRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              tabIndex={-1}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-[240px] bg-surface/95 backdrop-blur-xl border-l border-border z-40 md:hidden flex flex-col pt-24 shadow-2xl outline-none"
            >
              <nav
                className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6"
                aria-label="Mobile navigation"
              >
                {/* Keyboard users can't reach the hamburger while focus is trapped here. */}
                <button
                  onClick={() => setMenuOpen(false)}
                  className="sr-only focus:not-sr-only font-mono text-sm text-accent text-left"
                >
                  Close menu
                </button>
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={activeSection === link.id ? "location" : undefined}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                    className={`text-base tracking-wide transition-colors font-mono ${
                      activeSection === link.id
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
                  transition={{ delay: 0.1 + NAV_LINKS.length * 0.05, duration: 0.3 }}
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
                    className="flex items-center gap-3 text-sm text-accent font-mono w-max hover:text-glow transition-colors"
                  >
                    <GithubIcon className="w-5 h-5" />
                    {SOCIAL.github.username}
                  </a>
                  {/* The keyboard shortcut only makes sense where there is a keyboard-capable pointer. */}
                  <div className="hidden [@media(hover:hover)]:flex items-center gap-2 mt-2 text-text-secondary">
                    <kbd className="font-mono text-[10px] border border-border rounded px-1.5 py-0.5 bg-surface">
                      {isMac ? "⌘K" : "Ctrl K"}
                    </kbd>
                    <span className="font-mono text-[10px]">Quick search</span>
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
