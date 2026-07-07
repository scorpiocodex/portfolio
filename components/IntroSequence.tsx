"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const TARGET = "SAN SHIBU";
const SCRAMBLE = "!<>-_\\/[]{}=+*^?#________0110";

/* Layout effect on the client so the overlay paints in the same frame the hero
   hides its content (no blank first frame); plain effect during SSR to avoid
   the useLayoutEffect server warning. */
const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Brief "decrypt" boot overlay — the first-3-seconds moment. Shown at most once
 * per session and fully skipped under prefers-reduced-motion. Content renders in
 * the DOM underneath (this is purely a visual overlay), so SEO/first paint are
 * unaffected. Dismissible via any interaction.
 */
export default function IntroSequence() {
    const [visible, setVisible] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const [text, setText] = useState("");
    const timers = useRef<number[]>([]);

    const dismiss = useCallback(() => {
        setLeaving(true);
        timers.current.push(window.setTimeout(() => setVisible(false), 500));
    }, []);

    useIsomorphicLayoutEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let seen = false;
        try {
            seen = sessionStorage.getItem("intro-seen") === "1";
        } catch {
            /* private mode — treat as unseen */
        }
        if (prefersReduced || seen) return;

        setVisible(true);
        try {
            sessionStorage.setItem("intro-seen", "1");
        } catch {
            /* ignore */
        }

        const total = 30;
        let frame = 0;
        const scramble = window.setInterval(() => {
            frame++;
            const revealed = Math.floor((frame / total) * TARGET.length);
            let out = "";
            for (let i = 0; i < TARGET.length; i++) {
                if (TARGET[i] === " ") {
                    out += " ";
                } else {
                    out += i < revealed ? TARGET[i] : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
                }
            }
            setText(out);
            if (frame >= total) {
                setText(TARGET);
                window.clearInterval(scramble);
            }
        }, 40);
        timers.current.push(scramble);
        timers.current.push(window.setTimeout(dismiss, 1600));

        const onInteract = () => dismiss();
        window.addEventListener("keydown", onInteract);
        window.addEventListener("wheel", onInteract, { passive: true });
        window.addEventListener("touchstart", onInteract, { passive: true });
        window.addEventListener("pointerdown", onInteract);

        const cleanupTimers = timers.current;
        return () => {
            cleanupTimers.forEach((t) => window.clearTimeout(t));
            window.clearInterval(scramble);
            window.removeEventListener("keydown", onInteract);
            window.removeEventListener("wheel", onInteract);
            window.removeEventListener("touchstart", onInteract);
            window.removeEventListener("pointerdown", onInteract);
        };
    }, [dismiss]);

    if (!visible) return null;

    return (
        <div
            aria-hidden="true"
            className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg scanlines transition-opacity duration-500 ${leaving ? "opacity-0" : "opacity-100"
                }`}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] max-w-[90vw] rounded-full bg-accent/[0.05] blur-[120px] pointer-events-none" />

            <div className="relative flex flex-col items-center gap-6 px-6">
                <span className="font-mono text-[11px] tracking-[0.4em] uppercase text-accent/70">
                    Decrypting session
                </span>
                <span className="font-space-grotesk text-4xl sm:text-6xl font-bold tracking-tight text-text-primary text-glow-accent tabular-nums">
                    {text || " "}
                </span>
                <div className="mt-2 h-px w-56 max-w-[70vw] overflow-hidden bg-border/60">
                    <div className="h-full w-full origin-left bg-gradient-to-r from-accent via-glow to-accent-purple intro-bar" />
                </div>
            </div>
        </div>
    );
}
