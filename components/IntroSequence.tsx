"use client";

import { useEffect, useState } from "react";

const TARGET = "SAN SHIBU";
const SCRAMBLE = "!<>-_\\/[]{}=+*^?#________0110";
const TOTAL_FRAMES = 30;
const HOLD_MS = 1600;
const FADE_MS = 500;

/**
 * Brief "decrypt" boot overlay — the first-3-seconds moment.
 *
 * Whether it plays is decided *before first paint* by the inline script in
 * app/layout.tsx, which sets `<html data-intro="playing">` (once per session, never
 * under prefers-reduced-motion). The overlay markup is always server-rendered and
 * shown/hidden purely by CSS, so there is no flash of page content before it, and the
 * decision never depends on effect timing (React StrictMode remounts are harmless).
 * Page content renders underneath, so SEO and first paint are unaffected.
 */
export default function IntroSequence() {
  const [text, setText] = useState("");
  const [leaving, setLeaving] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (root.getAttribute("data-intro") !== "playing") return;

    const timeouts: number[] = [];
    let dismissed = false;
    let frame = 0;

    const scramble = window.setInterval(() => {
      frame++;
      const revealed = Math.floor((frame / TOTAL_FRAMES) * TARGET.length);
      let out = "";
      for (let i = 0; i < TARGET.length; i++) {
        out +=
          TARGET[i] === " " || i < revealed
            ? TARGET[i]
            : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
      }
      setText(out);
      if (frame >= TOTAL_FRAMES) {
        setText(TARGET);
        window.clearInterval(scramble);
      }
    }, 40);

    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      setLeaving(true);
      timeouts.push(
        window.setTimeout(() => {
          root.removeAttribute("data-intro");
          try {
            sessionStorage.setItem("intro-seen", "1");
          } catch {
            /* storage unavailable — the intro may replay on reload, which is harmless */
          }
          setFinished(true);
        }, FADE_MS),
      );
    };

    timeouts.push(window.setTimeout(dismiss, HOLD_MS));

    // Any interaction skips the intro.
    const events = ["keydown", "wheel", "touchstart", "pointerdown"] as const;
    events.forEach((name) => window.addEventListener(name, dismiss, { passive: true }));

    return () => {
      timeouts.forEach((t) => window.clearTimeout(t));
      window.clearInterval(scramble);
      events.forEach((name) => window.removeEventListener(name, dismiss));
    };
  }, []);

  if (finished) return null;

  return (
    <div
      aria-hidden="true"
      className={`intro-overlay fixed inset-0 z-[200] flex-col items-center justify-center bg-bg scanlines transition-opacity duration-500 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] max-w-[90vw] rounded-full bg-accent/[0.05] blur-[120px] pointer-events-none" />

      <div className="relative flex flex-col items-center gap-6 px-6">
        <span className="font-mono text-[11px] tracking-[0.4em] uppercase text-accent/70">
          Decrypting session
        </span>
        <span className="font-space-grotesk text-4xl sm:text-6xl font-bold tracking-tight text-text-primary text-glow-accent tabular-nums">
          {text || " "}
        </span>
        <div className="mt-2 h-px w-56 max-w-[70vw] overflow-hidden bg-border/60">
          <div className="h-full w-full origin-left bg-gradient-to-r from-accent via-glow to-accent-purple intro-bar" />
        </div>
      </div>
    </div>
  );
}
