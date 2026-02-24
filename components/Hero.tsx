"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GithubIcon, DownloadIcon } from "./icons";

interface TerminalLine {
  text: string;
  type: "command" | "success" | "info" | "dim";
}

const TERMINAL_LINES: TerminalLine[] = [
  { text: "$ san --whoami", type: "command" },
  { text: "✓ Full-Stack & Systems Dev  |  BIT · Scaler", type: "success" },
  { text: "✓ Python · JavaScript · React · Node.js · PostgreSQL", type: "success" },
  { text: "$ watchflow start --intent=dev.yaml --watch=./src", type: "command" },
  { text: "✓ YAML intents loaded — 3 workflows active", type: "success" },
  { text: "✓ Daemon armed — topology resolved", type: "success" },
  { text: "∎ Pipeline ready — awaiting file events", type: "info" },
];

const lineColorClass: Record<TerminalLine["type"], string> = {
  command: "text-text-primary",
  success: "text-success",
  info:    "text-accent",
  dim:     "text-text-secondary",
};

function msDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Hero() {
  const [charCounts, setCharCounts] = useState<number[]>(
    () => new Array(TERMINAL_LINES.length).fill(0)
  );
  const [activeLineIdx, setActiveLineIdx] = useState(-1);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      await msDelay(700);

      for (let i = 0; i < TERMINAL_LINES.length; i++) {
        if (cancelled) return;
        const line = TERMINAL_LINES[i];
        setActiveLineIdx(i);

        for (let c = 1; c <= line.text.length; c++) {
          if (cancelled) return;
          const speed =
            line.type === "command"
              ? 38 + Math.random() * 28
              : 11 + Math.random() * 7;
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
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-[20%] right-[25%] w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[100px]" />
        <div className="absolute bottom-[25%] left-[10%] w-[400px] h-[400px] rounded-full bg-accent-purple/[0.04] blur-[90px]" />
      </div>

      <div className="relative max-w-content mx-auto px-6 w-full py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-14 lg:gap-12 items-center">

          {/* ── Left: Text ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Status chip */}
            <div className="flex items-center gap-2.5 mb-7">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              <span className="font-mono text-[11px] text-text-secondary tracking-[0.18em] uppercase">
                Full-Stack Developer · Open to Work
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-space-grotesk text-[2.6rem] sm:text-[3.2rem] lg:text-[3.6rem] xl:text-[4rem] font-bold text-text-primary leading-[1.04] tracking-tight mb-7">
              Building{" "}
              <span className="text-accent">Full-Stack</span>
              <br className="hidden sm:block" />
              {" "}Apps & Dev Tools.
            </h1>

            {/* Subheading */}
            <p className="text-text-secondary text-[1.05rem] leading-[1.75] mb-10 max-w-[400px] font-inter">
              React & Node.js web applications.
              <br />
              Python automation tooling.
              <br />
              Linux-native development.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="px-5 py-2.5 bg-accent text-bg text-sm font-semibold rounded-card hover:bg-glow transition-colors duration-200 font-inter"
              >
                View Projects
              </a>
              <a
                href="https://github.com/scorpiocodex"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 border border-border text-text-primary text-sm font-medium rounded-card hover:border-accent hover:text-accent transition-all duration-200 font-inter"
              >
                <GithubIcon className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 border border-border text-text-secondary text-sm font-medium rounded-card hover:text-text-primary hover:border-accent/40 transition-all duration-200 font-inter"
              >
                Contact
              </a>
              <a
                href="/Resume.pdf"
                download="San_Shibu_Resume.pdf"
                className="flex items-center gap-2 px-5 py-2.5 border border-border text-text-secondary text-sm font-medium rounded-card hover:text-text-primary hover:border-accent/40 transition-all duration-200 font-inter"
              >
                <DownloadIcon className="w-4 h-4" />
                Resume
              </a>
            </div>
          </motion.div>

          {/* ── Right: Terminal ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Glow halo */}
              <div className="absolute -inset-[2px] rounded-[14px] bg-gradient-to-br from-accent/20 via-transparent to-accent-purple/15 blur-xl opacity-70" />

              {/* Terminal window */}
              <div className="relative rounded-card border border-border bg-bg overflow-hidden terminal-scanlines">

                {/* Window chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-surface-2 bg-surface">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                  <div className="flex-1 flex items-center justify-center">
                    <span className="font-mono text-[11px] text-text-secondary/60">
                      scorpiocodex — zsh — 80×24
                    </span>
                  </div>
                </div>

                {/* Terminal body */}
                <div className="px-5 pt-5 pb-6 font-mono text-[13px] leading-[1.85] min-h-[240px]">
                  {/* Path prompt */}
                  <div className="text-text-secondary/40 text-[11px] mb-3 select-none">
                    san@scorpiocodex:~/projects/watchflow
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
              <span className="font-mono text-[10px] text-text-secondary/40 tracking-widest">
                LIVE ENVIRONMENT
              </span>
              <div className="h-px flex-1 bg-border/40" />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
    </section>
  );
}
