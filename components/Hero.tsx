"use client";

import { RESUME, SOCIAL } from "@/lib/constants";
import { whenIntroDone } from "@/lib/intro";
import Image from "next/image";
import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";
import { DownloadIcon, GithubIcon } from "./icons";

interface TerminalLine {
  text: string;
  type: "command" | "success" | "info";
}

const TERMINAL_LINES: TerminalLine[] = [
  { text: "$ san --whoami", type: "command" },
  { text: "✓ Python Full-Stack Developer  |  BIT · Scaler", type: "success" },
  { text: "✓ Python · FastAPI · PostgreSQL · React · LLM", type: "success" },
  { text: "$ san --shipped", type: "command" },
  { text: "✓ BakeriQ — WhatsApp ordering platform, 371 tests", type: "success" },
  { text: "✓ ScorpioWatch + Nyxora published on PyPI", type: "success" },
  { text: "∎ Open to Python backend & full-stack roles", type: "info" },
];

const lineColorClass: Record<TerminalLine["type"], string> = {
  command: "text-text-primary",
  success: "text-success",
  info: "text-accent",
};

function msDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Hero() {
  const [charCounts, setCharCounts] = useState<number[]>(() =>
    new Array(TERMINAL_LINES.length).fill(0),
  );
  const [activeLineIdx, setActiveLineIdx] = useState(-1);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    // The terminal typewriter is a one-time, non-spatial character reveal (no
    // parallax/zoom/drift), so it plays regardless of prefers-reduced-motion.
    // The genuinely spatial/looping animations (constellation/WebGL drift,
    // looping gradients) still respect reduced motion.
    let cancelled = false;

    const run = async () => {
      // Don't type underneath the intro overlay — start once it has gone.
      await whenIntroDone();
      if (cancelled) return;
      await msDelay(500);

      for (let i = 0; i < TERMINAL_LINES.length; i++) {
        if (cancelled) return;
        const line = TERMINAL_LINES[i];
        setActiveLineIdx(i);

        for (let c = 1; c <= line.text.length; c++) {
          if (cancelled) return;
          const speed = line.type === "command" ? 38 + Math.random() * 28 : 11 + Math.random() * 7;
          await msDelay(speed);
          setCharCounts((prev) => {
            const next = [...prev];
            next[i] = c;
            return next;
          });
        }

        const pause = line.type === "command" ? 480 : 90;
        await msDelay(pause);
      }

      if (!cancelled) {
        setActiveLineIdx(-1);
        setTypingDone(true);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Depth comes from the site-wide BackgroundField (mounted in the page). */}

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-[20%] right-[25%] w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[100px]" />
        <div className="absolute bottom-[25%] left-[10%] w-[400px] h-[400px] rounded-full bg-accent-purple/[0.04] blur-[90px]" />
      </div>

      <div className="relative max-w-content mx-auto px-6 w-full py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-14 lg:gap-12 items-center">
          {/* ── Left: Text ──────────────────────────────────────── */}
          <div className="hero-rise" style={{ "--rise-delay": "0.15s" } as React.CSSProperties}>
            {/* Avatar & Status chip */}
            <div className="flex items-center gap-4 mb-7">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full border border-border/80 overflow-hidden bg-surface p-0.5 card-glow">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-bg">
                  <Image
                    src="/avatar.png"
                    alt="San Shibu — Python Full-Stack Developer avatar"
                    fill
                    sizes="(min-width: 640px) 80px, 64px"
                    className="object-cover scale-110"
                    priority
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-full pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                  </span>
                  <span className="font-mono text-[11px] text-text-secondary tracking-[0.18em] uppercase">
                    Python Full-Stack Developer
                  </span>
                </div>
                <div className="font-mono text-[11px] text-text-secondary tracking-[0.18em] uppercase ml-[18px]">
                  Open to Work
                </div>
              </div>
            </div>

            {/* Headline */}
            <h1 className="font-space-grotesk text-[2rem] sm:text-[2.6rem] md:text-[3.2rem] lg:text-[3.6rem] xl:text-[4rem] font-bold text-text-primary leading-[1.08] tracking-tight mb-7">
              Building{" "}
              <span className="gradient-text-animated pb-1 whitespace-nowrap">Full-Stack</span>
              <br className="hidden sm:block" /> Apps & Dev Tools.
            </h1>

            {/* Subheading */}
            <p className="text-text-secondary text-[1.05rem] leading-[1.75] mb-10 max-w-[400px] font-inter">
              FastAPI & React applications.
              <br />
              LLM-powered automation.
              <br />
              Open-source Python on PyPI.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Magnetic strength={25}>
                <a
                  href="#projects"
                  className="block px-5 py-2.5 bg-accent text-bg text-sm font-semibold rounded-card hover:bg-glow transition-colors duration-200 font-inter"
                >
                  View Projects
                </a>
              </Magnetic>
              <Magnetic strength={20}>
                <a
                  href={SOCIAL.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View GitHub profile"
                  className="flex items-center gap-2 px-5 py-2.5 border border-border text-text-primary text-sm font-medium rounded-card hover:border-accent hover:text-accent transition-all duration-200 font-inter"
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub
                </a>
              </Magnetic>
              <Magnetic strength={20}>
                <a
                  href="#contact"
                  className="block px-5 py-2.5 border border-border text-text-secondary text-sm font-medium rounded-card hover:text-text-primary hover:border-accent/40 transition-all duration-200 font-inter"
                >
                  Contact
                </a>
              </Magnetic>
              <Magnetic strength={20}>
                <a
                  href={RESUME.href}
                  download={RESUME.downloadName}
                  aria-label="Download resume"
                  className="flex items-center gap-2 px-5 py-2.5 border border-border text-text-secondary text-sm font-medium rounded-card hover:text-text-primary hover:border-accent/40 transition-all duration-200 font-inter"
                >
                  <DownloadIcon className="w-4 h-4" />
                  Resume
                </a>
              </Magnetic>
            </div>
          </div>

          {/* ── Right: Terminal ──────────────────────────────────── */}
          <div className="hero-rise" style={{ "--rise-delay": "0.3s" } as React.CSSProperties}>
            <div className="relative">
              {/* Glow halo */}
              <div className="absolute -inset-[2px] rounded-[14px] bg-gradient-to-br from-accent/20 via-transparent to-accent-purple/15 blur-xl opacity-70" />

              {/* Terminal window */}
              <div className="relative rounded-card border border-border bg-bg/80 backdrop-blur-sm overflow-hidden terminal-scanlines">
                {/* Window chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-surface-2 bg-surface">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                  <div className="flex-1 flex items-center justify-center">
                    <span className="font-mono text-[11px] text-text-secondary">
                      scorpiocodex — zsh — 80×24
                    </span>
                  </div>
                </div>

                {/* Terminal body */}
                <div className="px-3 sm:px-5 pt-5 pb-6 font-mono text-[11px] sm:text-[13px] leading-[1.85] min-h-[200px] sm:min-h-[240px] overflow-x-auto">
                  {/* Path prompt */}
                  <div className="text-text-secondary text-[11px] mb-3 select-none">
                    san@scorpiocodex:~/projects
                  </div>

                  {TERMINAL_LINES.map((line, i) => {
                    const chars = charCounts[i];
                    if (chars === 0) return null;
                    const isCurrentLine = activeLineIdx === i;
                    return (
                      <div key={i} className={lineColorClass[line.type]}>
                        {line.text.slice(0, chars)}
                        {isCurrentLine && (
                          <span className="inline-block w-[8px] h-[13px] bg-current cursor-blink ml-[1px] rounded-[1px] opacity-75 align-middle" />
                        )}
                      </div>
                    );
                  })}

                  {/* Idle cursor after completion */}
                  {typingDone && (
                    <span className="inline-block w-[9px] h-[16px] bg-accent cursor-blink rounded-[1px]" />
                  )}
                </div>
              </div>
            </div>

            {/* Footnote */}
            <div className="mt-4 flex items-center gap-2 px-1">
              <div className="h-px flex-1 bg-border/40" />
              <span className="font-mono text-[10px] text-text-secondary tracking-widest">
                SIMULATED SESSION
              </span>
              <div className="h-px flex-1 bg-border/40" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#projects"
        aria-label="Scroll to projects"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-text-secondary hover:text-accent transition-colors duration-200 z-10"
      >
        <span className="font-mono text-[10px] tracking-[0.35em] uppercase">Scroll</span>
        <svg
          className="w-3.5 h-3.5 animate-bounce"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 12.5a.75.75 0 01-.53-.22l-4.25-4.25a.75.75 0 111.06-1.06L8 10.69l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-.53.22z" />
        </svg>
      </a>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
    </section>
  );
}
