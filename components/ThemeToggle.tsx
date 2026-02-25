"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"midnight" | "deep-ocean">("midnight");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "deep-ocean") {
            setTheme("deep-ocean");
        }

        // Listen for theme changes from CommandPalette
        const onThemeChanged = () => {
            const t = localStorage.getItem("theme");
            setTheme(t === "deep-ocean" ? "deep-ocean" : "midnight");
        };
        window.addEventListener("theme-changed", onThemeChanged);
        return () => window.removeEventListener("theme-changed", onThemeChanged);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "midnight" ? "deep-ocean" : "midnight";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        if (newTheme === "deep-ocean") {
            document.documentElement.setAttribute("data-theme", "deep-ocean");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
        window.dispatchEvent(new Event("theme-changed"));
    };

    // Prevent hydration mismatch
    if (!mounted) {
        return <div className="h-8 w-8 rounded-lg border border-border" />;
    }

    const isMidnight = theme === "midnight";

    return (
        <button
            onClick={toggleTheme}
            className="group relative flex items-center justify-center w-8 h-8 rounded-lg border border-border bg-surface hover:border-accent hover:bg-surface/80 transition-all duration-200"
            aria-label={`Switch to ${isMidnight ? "Deep Ocean" : "Midnight"} theme`}
            title={`Switch to ${isMidnight ? "Deep Ocean" : "Midnight"} theme`}
        >
            {/* Moon icon (midnight) */}
            <motion.svg
                className="w-4 h-4 absolute"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ opacity: isMidnight ? 1 : 0, scale: isMidnight ? 1 : 0.5, rotate: isMidnight ? 0 : -90 }}
                transition={{ duration: 0.2 }}
            >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </motion.svg>

            {/* Wave/Ocean icon (deep-ocean) */}
            <motion.svg
                className="w-4 h-4 absolute"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ opacity: isMidnight ? 0 : 1, scale: isMidnight ? 0.5 : 1, rotate: isMidnight ? 90 : 0 }}
                transition={{ duration: 0.2 }}
            >
                <path d="M2 12c2-2.67 5.33-2.67 8 0s5.33 2.67 8 0" />
                <path d="M2 17c2-2.67 5.33-2.67 8 0s5.33 2.67 8 0" />
                <path d="M2 7c2-2.67 5.33-2.67 8 0s5.33 2.67 8 0" />
            </motion.svg>
        </button>
    );
}
