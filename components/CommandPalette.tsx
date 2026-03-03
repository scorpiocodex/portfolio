"use client";

import { RESUME, SOCIAL } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DownloadIcon, EmailIcon, GithubIcon } from "./icons";

interface CommandItem {
    id: string;
    name: string;
    category: string;
    icon?: React.ReactNode;
    action: () => void;
}

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    // Toggle dark/ocean theme programmatically
    const triggerTheme = (t: "midnight" | "deep-ocean") => {
        localStorage.setItem("theme", t);
        if (t === "deep-ocean") {
            document.documentElement.setAttribute("data-theme", "deep-ocean");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
        // Dispatch a custom event to notify ThemeToggle component
        window.dispatchEvent(new Event("theme-changed"));
    };

    const navTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    const commands: CommandItem[] = [
        { id: "nav-about", name: "Go to About", category: "Navigation", action: () => navTo("about") },
        { id: "nav-experience", name: "Go to Experience", category: "Navigation", action: () => navTo("experience") },
        { id: "nav-projects", name: "Go to Projects", category: "Navigation", action: () => navTo("projects") },
        { id: "nav-skills", name: "Go to Skills", category: "Navigation", action: () => navTo("skills") },
        { id: "nav-github", name: "Go to GitHub", category: "Navigation", action: () => navTo("github") },
        { id: "nav-contact", name: "Go to Contact", category: "Navigation", action: () => navTo("contact") },

        {
            id: "action-resume", name: "Download Resume", category: "Actions", icon: <DownloadIcon className="w-3.5 h-3.5" />, action: () => {
                const a = document.createElement("a");
                a.href = RESUME.href;
                a.download = RESUME.downloadName;
                a.click();
            }
        },
        {
            id: "action-email", name: "Send Email", category: "Actions", icon: <EmailIcon className="w-3.5 h-3.5" />, action: () => {
                window.location.href = `mailto:${SOCIAL.email}`;
            }
        },
        {
            id: "action-github", name: "Open GitHub Profile", category: "Actions", icon: <GithubIcon className="w-3.5 h-3.5" />, action: () => {
                window.open(SOCIAL.github.url, "_blank");
            }
        },

        { id: "theme-midnight", name: "Switch to Midnight Theme", category: "Theme", action: () => triggerTheme("midnight") },
        { id: "theme-ocean", name: "Switch to Deep Ocean Theme", category: "Theme", action: () => triggerTheme("deep-ocean") },
    ];

    const filteredCommands = search
        ? commands.filter(cmd => cmd.name.toLowerCase().includes(search.toLowerCase()) || cmd.category.toLowerCase().includes(search.toLowerCase()))
        : commands;

    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
            if (e.key === "Escape") {
                setOpen(false);
            }
            if (open) {
                if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSelectedIndex((s) => (s + 1) % filteredCommands.length);
                }
                if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setSelectedIndex((s) => (s - 1 + filteredCommands.length) % filteredCommands.length);
                }
                if (e.key === "Enter" && filteredCommands.length > 0) {
                    e.preventDefault();
                    filteredCommands[selectedIndex].action();
                    setOpen(false);
                }
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [open, filteredCommands, selectedIndex]);

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            setSearch("");
        }
    }, [open]);

    // Group commands for rendering
    const groups = filteredCommands.reduce((acc, cmd) => {
        if (!acc[cmd.category]) acc[cmd.category] = [];
        acc[cmd.category].push(cmd);
        return acc;
    }, {} as Record<string, CommandItem[]>);

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-bg/60 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20, x: "-50%" }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, scale: 0.95, y: -20, x: "-50%" }}
                        transition={{ duration: 0.15 }}
                        className="fixed top-[15%] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-lg bg-surface border border-border rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[60vh]"
                    >
                        <div className="flex items-center px-4 py-3 border-b border-border/50">
                            <span className="text-text-secondary mr-3 w-4 h-4 flex items-center justify-center">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input
                                ref={inputRef}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Type a command or search..."
                                className="flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-secondary"
                            />
                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-border text-text-secondary">ESC</span>
                        </div>

                        <div className="flex-1 overflow-y-auto p-2 font-mono scrollbar-hide">
                            {Object.keys(groups).length === 0 ? (
                                <div className="text-sm text-text-secondary text-center py-6">No results found.</div>
                            ) : (
                                Object.entries(groups).map(([category, cmds]) => (
                                    <div key={category} className="mb-4 last:mb-0">
                                        <div className="text-[10px] uppercase tracking-widest text-text-secondary/60 px-3 py-1.5 mb-1">
                                            {category}
                                        </div>
                                        {cmds.map((cmd) => {
                                            const absoluteIndex = filteredCommands.findIndex(c => c.id === cmd.id);
                                            const isSelected = absoluteIndex === selectedIndex;

                                            return (
                                                <button
                                                    key={cmd.id}
                                                    onClick={() => {
                                                        cmd.action();
                                                        setOpen(false);
                                                    }}
                                                    onMouseEnter={() => setSelectedIndex(absoluteIndex)}
                                                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-sm rounded-lg transition-colors ${isSelected ? "bg-bg text-text-primary" : "text-text-secondary hover:text-text-primary hover:bg-bg/50"
                                                        }`}
                                                >
                                                    {cmd.icon ? cmd.icon : (
                                                        <span className="w-3.5 h-3.5 flex items-center justify-center text-text-secondary/40">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                                        </span>
                                                    )}
                                                    {cmd.name}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="bg-bg border-t border-border/50 p-3 text-center flex items-center justify-center gap-4">
                            <div className="flex items-center gap-1.5 text-[10px] text-text-secondary">
                                <span className="border border-border rounded px-1 min-w-[16px] flex items-center justify-center bg-surface">↓</span>
                                <span className="border border-border rounded px-1 min-w-[16px] flex items-center justify-center bg-surface">↑</span>
                                <span>to navigate</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-text-secondary">
                                <span className="border border-border rounded px-1 min-w-[16px] flex items-center justify-center bg-surface">↵</span>
                                <span>to select</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
