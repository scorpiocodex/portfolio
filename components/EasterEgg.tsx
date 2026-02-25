"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const KONAMI_CODE = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "b", "a"
];

export default function EasterEgg() {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState<string[]>([
        "System accessed. Welcome to the hidden terminal.",
        "Type 'help' for available commands."
    ]);
    const [input, setInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Konami Code listener
    useEffect(() => {
        let index = 0;
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if terminal is already open
            if (isOpen && e.key !== "Escape") return;

            if (e.key === "Escape") {
                setIsOpen(false);
                return;
            }

            if (e.key === KONAMI_CODE[index]) {
                index++;
                if (index === KONAMI_CODE.length) {
                    setIsOpen(true);
                    index = 0;
                }
            } else {
                index = 0;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const cmd = input.trim().toLowerCase();
        const newHistory = [...history, `> ${input}`];

        switch (cmd) {
            case "help":
                newHistory.push("Available commands: help, echo, whoami, clear, exit, sudo, ping");
                break;
            case "whoami":
                newHistory.push("guest_user_992");
                break;
            case "clear":
                setHistory([]);
                setInput("");
                return;
            case "exit":
                setIsOpen(false);
                break;
            case "sudo":
                newHistory.push("nice try. this incident will be reported.");
                break;
            case "ping":
                newHistory.push("pong");
                break;
            case "eval":
                newHistory.push("Access denied.");
                break;
            default:
                if (cmd.startsWith("echo ")) {
                    newHistory.push(input.substring(5));
                } else {
                    newHistory.push(`Command not found: ${cmd}`);
                }
        }
        setHistory(newHistory);
        setInput("");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-[100]"
                        onClick={() => setIsOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl bg-surface border border-border shadow-2xl rounded-lg overflow-hidden z-[101] font-jetbrains-mono flex flex-col h-[50vh]"
                    >
                        {/* Terminal Header */}
                        <div className="flex items-center px-4 py-2 bg-border/30 border-b border-border">
                            <div className="flex gap-2 mr-4">
                                <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <div className="flex-1 text-center text-[11px] text-text-secondary font-mono tracking-widest uppercase">
                                san@portfolio ~ zsh
                            </div>
                        </div>

                        {/* Terminal Body */}
                        <div
                            ref={scrollRef}
                            className="flex-1 p-4 overflow-y-auto text-sm text-text-primary"
                        >
                            <div className="mb-4">
                                <span className="text-accent">Welcome to v2.0.0. Type 'help' to get started.</span>
                            </div>

                            {history.map((line, i) => (
                                <div key={i} className={`mb-1 ${line.startsWith('>') ? 'text-text-secondary' : 'text-text-primary'}`}>
                                    {line}
                                </div>
                            ))}

                            <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2">
                                <span className="text-success">➜</span>
                                <span className="text-accent">~</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none text-text-primary"
                                    autoComplete="off"
                                    spellCheck="false"
                                />
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
