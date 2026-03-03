"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Animated counter that counts up from 0 to `value` when visible.
 * Use for stats and metrics.
 */
export function AnimatedCounter({
    value,
    suffix = "",
    prefix = "",
    className,
    duration = 1.5,
}: {
    value: number;
    suffix?: string;
    prefix?: string;
    className?: string;
    duration?: number;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const springValue = useSpring(0, {
        duration: duration * 1000,
        bounce: 0,
    });

    const displayValue = useTransform(springValue, (v) => Math.round(v));

    useEffect(() => {
        if (isInView) {
            springValue.set(value);
        }
    }, [isInView, value, springValue]);

    useEffect(() => {
        const unsubscribe = displayValue.on("change", (v) => {
            if (ref.current) {
                ref.current.textContent = `${prefix}${v}${suffix}`;
            }
        });
        return unsubscribe;
    }, [displayValue, prefix, suffix]);

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
        >
            {prefix}0{suffix}
        </motion.span>
    );
}

/**
 * Section number like "01" that types out when visible.
 */
export function AnimatedSectionNumber({
    number,
    label,
}: {
    number: string;
    label: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.span
            ref={ref}
            className="font-mono text-[11px] text-text-secondary tracking-[0.18em] uppercase block mb-3"
            initial={{ opacity: 0, x: -8 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
            <motion.span
                className="inline-block text-accent/60"
                initial={{ opacity: 0, width: 0 }}
                animate={isInView ? { opacity: 1, width: "auto" } : {}}
                transition={{ duration: 0.3, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
                {number}
            </motion.span>
            <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.2, delay: 0.25 }}
            >
                {" "}— {label}
            </motion.span>
        </motion.span>
    );
}
