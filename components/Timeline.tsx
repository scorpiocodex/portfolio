"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FadeIn, FadeInItem, FadeInStagger } from "./FadeIn";

const TIMELINE_DATA = [
    {
        year: "Feb 2026 (Expected)",
        title: "Full-Stack Web Development",
        institution: "Scaler Academy",
        description:
            "Advanced certification covering data structures, system design, and full-stack development. Building scalable, production-ready applications with modern tech stacks.",
    },
    {
        year: "Dec 2023",
        title: "Bachelor of Information Technology",
        institution: "Victoria University, Melbourne",
        description:
            "Graduated with distinction. Focus on software engineering methodologies, web development, and network systems. Completed capstone projects involving full-stack web solutions.",
    },
];

export default function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section id="experience" className="py-24 lg:py-32">
            <div className="max-w-content mx-auto px-6" ref={containerRef}>
                <FadeIn className="mb-20">
                    <span className="font-mono text-[11px] text-text-secondary tracking-[0.18em] uppercase block mb-3">
                        03 — Experience
                    </span>
                    <h2 className="font-space-grotesk text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
                        Education & Journey
                    </h2>
                </FadeIn>

                <div className="relative max-w-4xl mx-auto">
                    {/* Animated vertical line (desktop only) */}
                    <div className="absolute left-[27px] md:left-1/2 top-4 bottom-4 w-px bg-border/50" />
                    <motion.div
                        style={{ scaleY: pathLength }}
                        className="absolute left-[27px] md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-[0.5px] bg-gradient-to-b from-accent via-accent-purple to-accent origin-top hidden md:block"
                    />

                    <FadeInStagger staggerDelay={0.2} className="flex flex-col gap-12 lg:gap-20">
                        {TIMELINE_DATA.map((item, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <FadeInItem
                                    key={item.institution}
                                    className={`relative flex flex-col md:flex-row items-start ${isEven ? "md:justify-start" : "md:justify-end"
                                        }`}
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-[19.5px] md:left-[calc(50%-7px)] top-6 md:top-6 w-[14px] h-[14px] rounded-full bg-bg border-2 border-accent z-10 shadow-[0_0_12px_rgba(88,166,255,0.4)]" />

                                    {/* Content Card */}
                                    <div
                                        className={`relative w-full md:w-[calc(50%-3rem)] pl-16 md:pl-0 p-6 rounded-card border border-border bg-surface/40 hover:bg-surface/60 transition-colors duration-300 card-glow ${isEven ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12 text-left"
                                            }`}
                                    >
                                        <span className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 text-accent font-mono text-[10px] uppercase tracking-wider rounded-full mb-4">
                                            {item.year}
                                        </span>
                                        <h3 className="font-space-grotesk text-xl font-bold text-text-primary mb-1">
                                            {item.title}
                                        </h3>
                                        <div className="text-sm font-semibold text-text-secondary mb-3">
                                            {item.institution}
                                        </div>
                                        <p className="text-sm text-text-secondary leading-[1.7]">
                                            {item.description}
                                        </p>
                                    </div>
                                </FadeInItem>
                            );
                        })}
                    </FadeInStagger>
                </div>
            </div>
        </section>
    );
}
