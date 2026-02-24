"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon } from "./icons";

const navLinks = [
  { label: "About",        href: "#about",        id: "about" },
  { label: "Philosophy",   href: "#philosophy",   id: "philosophy" },
  { label: "Projects",     href: "#projects",     id: "projects" },
  { label: "Architecture", href: "#architecture", id: "architecture" },
  { label: "Skills",       href: "#skills",       id: "skills" },
  { label: "GitHub",       href: "#github",       id: "github" },
  { label: "Contact",      href: "#contact",      id: "contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      let current = "";
      for (const link of navLinks) {
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
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      {/* Static accent base line */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] accent-line" />

      <header
        className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
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
                  className={`nav-link text-[11px] transition-colors duration-200 tracking-wider uppercase font-mono ${
                    isActive
                      ? "text-accent"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* GitHub CTA */}
          <a
            href="https://github.com/scorpiocodex"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-[11px] font-mono font-medium text-accent border border-border px-3 py-1.5 rounded-lg hover:border-accent hover:bg-accent/5 transition-all duration-200"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            scorpiocodex
          </a>

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

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden bg-surface border-b border-border"
            >
              <nav className="px-6 py-5 flex flex-col gap-4" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-sm transition-colors font-mono ${
                      activeSection === link.id
                        ? "text-accent"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="https://github.com/scorpiocodex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-accent mt-1 font-mono"
                >
                  <GithubIcon className="w-4 h-4" />
                  scorpiocodex
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
