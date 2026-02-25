"use client";

import { motion } from "framer-motion";
import { FadeIn } from "./FadeIn";

const TESTIMONIALS = [
    {
        name: "Alex Rivera",
        role: "Senior Engineer @ TechFlow",
        content: "San consistently delivers high-quality, maintainable code. His understanding of full-stack architecture is impressive for his level.",
        avatar: "AR",
    },
    {
        name: "Priya Sharma",
        role: "Product Manager",
        content: "Working with San is a breeze. He communicates complex technical constraints clearly and always finds elegant solutions to product requirements.",
        avatar: "PS",
    },
    {
        name: "James Chen",
        role: "Open Source Maintainer",
        content: "His contributions to our CLI tooling were invaluable. The code was well-tested, documented, and integrated perfectly with our existing systems.",
        avatar: "JC",
    },
    {
        name: "Sarah Jenkins",
        role: "Lead Designer",
        content: "San has an incredibly rare eye for design for a developer. He perfectly translated our Figma prototypes into pixel-perfect, accessible components.",
        avatar: "SJ",
    },
    {
        name: "David Kim",
        role: "CTO @ DataSync",
        content: "Highly reliable and self-directed. San built out our initial analytics dashboard in record time without compromising on code quality.",
        avatar: "DK",
    }
];

// Duplicate the array to create a seamless infinite loop
const DUPED_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS];

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-24 lg:py-32 overflow-hidden bg-bg">
            <div className="max-w-content mx-auto px-6 mb-16">
                <FadeIn>
                    <span className="font-mono text-[11px] text-text-secondary tracking-[0.18em] uppercase block mb-3">
                        03 — Testimonials
                    </span>
                    <h2 className="font-space-grotesk text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
                        Endorsements
                    </h2>
                </FadeIn>
            </div>

            <div className="relative w-full flex items-center">
                {/* Fading edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

                {/* Scrolling track */}
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 45, ease: "linear", repeat: Infinity }}
                    className="flex gap-6 md:gap-8 px-6 w-max items-stretch"
                >
                    {DUPED_TESTIMONIALS.map((testimonial, i) => (
                        <div
                            key={i}
                            className="w-[320px] md:w-[400px] p-8 rounded-card border border-border bg-surface/30 shrink-0 flex flex-col justify-between hover:bg-surface/50 transition-colors duration-300"
                        >
                            <p className="text-text-secondary leading-[1.7] mb-8 relative">
                                <span className="absolute -left-3 -top-3 text-4xl text-border font-serif">"</span>
                                {testimonial.content}
                                <span className="absolute -right-3 -bottom-5 text-4xl text-border font-serif">"</span>
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center font-mono text-[11px] text-text-primary tracking-wider shadow-inner">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-text-primary">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-[11px] font-mono text-accent mt-0.5 tracking-wide opacity-80">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
