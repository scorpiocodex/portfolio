"use client";

import type { TerminalStep } from "@/lib/projects";
import { motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
    steps: TerminalStep[];
    accentColor: string;
    title?: string;
}

export default function TerminalDemo({ steps, accentColor, title = "Demo" }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const outputRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const [displayedSteps, setDisplayedSteps] = useState<
        { command?: string; output: string; typing: boolean }[]
    >([]);
    const [currentStep, setCurrentStep] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);
    const [typedCommand, setTypedCommand] = useState("");

    // Auto-scroll to bottom
    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [displayedSteps, typedCommand]);

    const playDemo = useCallback(async () => {
        if (isPlaying) return;
        setIsPlaying(true);
        setHasPlayed(true);
        setDisplayedSteps([]);

        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];
            setCurrentStep(i);

            // Type the command letter by letter
            if (step.command) {
                setTypedCommand("");
                for (let j = 0; j <= step.command.length; j++) {
                    setTypedCommand(step.command.slice(0, j));
                    await sleep(30 + Math.random() * 40);
                }
                await sleep(300);
            }

            // Show output
            setDisplayedSteps((prev) => [
                ...prev,
                {
                    command: step.command,
                    output: step.output,
                    typing: false,
                },
            ]);
            setTypedCommand("");

            // Wait before next step
            await sleep(step.delay || 800);
        }

        setCurrentStep(-1);
        setIsPlaying(false);
    }, [steps, isPlaying]);

    // Auto-play on scroll into view
    useEffect(() => {
        if (isInView && !hasPlayed) {
            const timer = setTimeout(() => playDemo(), 600);
            return () => clearTimeout(timer);
        }
    }, [isInView, hasPlayed, playDemo]);

    return (
        <div ref={containerRef}>
            <motion.div
                className="rounded-xl border border-border overflow-hidden bg-[#0D1117] shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#161B22] border-b border-border/50">
                    <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                        <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                        <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                    </div>
                    <span className="flex-1 text-center font-mono text-[11px] text-text-secondary/50">
                        {title} — zsh
                    </span>
                    {/* Replay button */}
                    {hasPlayed && !isPlaying && (
                        <button
                            onClick={playDemo}
                            className="font-mono text-[10px] px-2 py-0.5 rounded border border-border text-text-secondary hover:text-accent hover:border-accent transition-colors"
                            aria-label="Replay terminal demo"
                        >
                            ▶ Replay
                        </button>
                    )}
                    {isPlaying && (
                        <span className="font-mono text-[10px] px-2 py-0.5 text-accent/70">
                            ● Recording
                        </span>
                    )}
                </div>

                {/* Terminal output */}
                <div
                    ref={outputRef}
                    className="p-4 sm:p-5 font-mono text-[12px] sm:text-[13px] leading-[1.7] overflow-y-auto max-h-[460px] min-h-[200px] scrollbar-hide"
                >
                    {/* Welcome line */}
                    {!hasPlayed && !isPlaying && (
                        <div className="flex flex-col items-center justify-center h-[180px] gap-4">
                            <div className="text-text-secondary/40 text-center text-sm">
                                Interactive terminal demo
                            </div>
                            <button
                                onClick={playDemo}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-surface/50 text-sm font-mono hover:border-accent hover:text-accent transition-all duration-200"
                                style={{ color: accentColor }}
                            >
                                <span className="text-lg">▶</span> Play Demo
                            </button>
                        </div>
                    )}

                    {/* Rendered steps */}
                    {displayedSteps.map((step, idx) => (
                        <div key={idx} className="mb-3">
                            {step.command && (
                                <div className="flex items-center gap-2">
                                    <span style={{ color: accentColor }}>$</span>
                                    <span className="text-[#E6EDF3]">{step.command}</span>
                                </div>
                            )}
                            <pre className="text-[#8B949E] whitespace-pre-wrap mt-1 ml-0">{step.output}</pre>
                        </div>
                    ))}

                    {/* Currently typing command */}
                    {isPlaying && currentStep >= 0 && typedCommand !== "" && (
                        <div className="flex items-center gap-2">
                            <span style={{ color: accentColor }}>$</span>
                            <span className="text-[#E6EDF3]">{typedCommand}</span>
                            <span
                                className="inline-block w-[7px] h-[15px] animate-pulse"
                                style={{ backgroundColor: accentColor }}
                            />
                        </div>
                    )}

                    {/* Cursor when idle and playing */}
                    {isPlaying && currentStep >= 0 && typedCommand === "" && displayedSteps.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                            <span style={{ color: accentColor }}>$</span>
                            <span
                                className="inline-block w-[7px] h-[15px] animate-pulse"
                                style={{ backgroundColor: accentColor }}
                            />
                        </div>
                    )}
                </div>

                {/* Progress bar */}
                {isPlaying && (
                    <div className="h-[2px] bg-[#161B22]">
                        <motion.div
                            className="h-full"
                            style={{ backgroundColor: accentColor }}
                            initial={{ width: "0%" }}
                            animate={{
                                width: `${((currentStep + 1) / steps.length) * 100}%`,
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                )}
            </motion.div>
        </div>
    );
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
