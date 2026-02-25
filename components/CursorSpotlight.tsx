"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CursorSpotlight() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    // Use springs for smooth following
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorX = useSpring(0, springConfig);
    const cursorY = useSpring(0, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [cursorX, cursorY, isVisible]);

    // Don't render on mobile to save performance since there's no mouse
    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        setIsDesktop(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    }, []);

    if (!isDesktop) return null;

    return (
        <>
            {/* Soft spotlight following cursor exactly */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-[-1] opacity-60 mix-blend-screen"
                animate={{ opacity: isVisible ? 0.6 : 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        x: cursorX,
                        y: cursorY,
                        width: "50vw",
                        height: "50vw",
                        maxWidth: "600px",
                        maxHeight: "600px",
                        translateX: "-50%",
                        translateY: "-50%",
                        background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 8%, transparent) 0%, transparent 50%)",
                    }}
                />
            </motion.div>

            {/* Tiny highly responsive dot cursor replacement (optional, maybe too intrusive) */}
            {/* We will just keep the subtle background glow for a premium feel without replacing the native cursor */}
        </>
    );
}
