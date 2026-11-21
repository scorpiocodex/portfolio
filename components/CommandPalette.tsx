"use client";

import { NAV_LINKS, RESUME, SOCIAL } from "@/lib/constants";
import { applyTheme } from "@/lib/theme";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { DownloadIcon, EmailIcon, GithubIcon } from "./icons";

interface CommandItem {
  id: string;
  name: string;
  category: string;
  icon?: React.ReactNode;
  action: () => void;
}

function navTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const COMMANDS: CommandItem[] = [
  ...NAV_LINKS.map((link) => ({
    id: `nav-${link.id}`,
    name: `Go to ${link.label}`,
    category: "Navigation",
    action: () => navTo(link.id),
  })),
  {
    id: "action-resume",
    name: "Download Resume",
    category: "Actions",
    icon: <DownloadIcon className="w-3.5 h-3.5" />,
    action: () => {
      const a = document.createElement("a");
      a.href = RESUME.href;
      a.download = RESUME.downloadName;
      a.click();
    },
  },
  {
    id: "action-email",
    name: "Send Email",
    category: "Actions",
    icon: <EmailIcon className="w-3.5 h-3.5" />,
    action: () => {
      window.location.assign(`mailto:${SOCIAL.email}`);
    },
  },
  {
    id: "action-github",
    name: "Open GitHub Profile",
    category: "Actions",
    icon: <GithubIcon className="w-3.5 h-3.5" />,
    action: () => {
      window.open(SOCIAL.github.url, "_blank", "noopener,noreferrer");
    },
  },
  {
    id: "theme-midnight",
    name: "Switch to Midnight Theme",
    category: "Theme",
    action: () => applyTheme("midnight"),
  },
  {
    id: "theme-ocean",
    name: "Switch to Deep Ocean Theme",
    category: "Theme",
    action: () => applyTheme("deep-ocean"),
  },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const listId = useId();

  const filteredCommands = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q
      ? COMMANDS.filter(
          (cmd) => cmd.name.toLowerCase().includes(q) || cmd.category.toLowerCase().includes(q),
        )
      : COMMANDS;
  }, [search]);

  const openPalette = useCallback(() => {
    setSelectedIndex(0);
    setOpen(true);
  }, []);

  const closePalette = useCallback(() => {
    setOpen(false);
    setSearch("");
  }, []);

  const runCommand = useCallback(
    (cmd: CommandItem) => {
      cmd.action();
      closePalette();
    },
    [closePalette],
  );

  // Allow other components (e.g. the nav ⌘K chip) to open the palette.
  useEffect(() => {
    window.addEventListener("open-command-palette", openPalette);
    return () => window.removeEventListener("open-command-palette", openPalette);
  }, [openPalette]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (open) closePalette();
        else openPalette();
        return;
      }
      if (!open) return;

      if (e.key === "Escape") {
        closePalette();
      } else if (e.key === "ArrowDown" && filteredCommands.length > 0) {
        e.preventDefault();
        setSelectedIndex((s) => (s + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp" && filteredCommands.length > 0) {
        e.preventDefault();
        setSelectedIndex((s) => (s - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter" && filteredCommands.length > 0) {
        e.preventDefault();
        runCommand(filteredCommands[Math.min(selectedIndex, filteredCommands.length - 1)]);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, filteredCommands, selectedIndex, openPalette, closePalette, runCommand]);

  // Focus management: focus the input on open, restore focus (without scrolling) on close.
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      window.clearTimeout(timer);
      previouslyFocused.current?.focus?.({ preventScroll: true });
    };
  }, [open]);

  useFocusTrap(dialogRef, open);

  const groups = filteredCommands.reduce(
    (acc, cmd) => {
      (acc[cmd.category] ??= []).push(cmd);
      return acc;
    },
    {} as Record<string, CommandItem[]>,
  );

  const activeId = filteredCommands[selectedIndex]
    ? `${listId}-${filteredCommands[selectedIndex].id}`
    : undefined;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePalette}
            aria-hidden="true"
            className="fixed inset-0 bg-bg/60 backdrop-blur-sm z-50"
          />
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: -20, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, y: -20, x: "-50%" }}
            transition={{ duration: 0.15 }}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-lg bg-surface border border-border rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[60vh] outline-none"
          >
            <div className="flex items-center px-4 py-3 border-b border-border/50">
              <span
                aria-hidden="true"
                className="text-text-secondary mr-3 w-4 h-4 flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                role="combobox"
                aria-label="Search commands"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={activeId}
                aria-autocomplete="list"
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-secondary"
              />
              <span
                aria-hidden="true"
                className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-border text-text-secondary"
              >
                ESC
              </span>
            </div>

            <div
              id={listId}
              role="listbox"
              aria-label="Commands"
              className="flex-1 overflow-y-auto p-2 font-mono scrollbar-hide"
            >
              {Object.keys(groups).length === 0 ? (
                <div role="status" className="text-sm text-text-secondary text-center py-6">
                  No results found.
                </div>
              ) : (
                Object.entries(groups).map(([category, cmds]) => (
                  <div
                    key={category}
                    role="group"
                    aria-label={category}
                    className="mb-4 last:mb-0"
                  >
                    <div
                      aria-hidden="true"
                      className="text-[10px] uppercase tracking-widest text-text-secondary px-3 py-1.5 mb-1"
                    >
                      {category}
                    </div>
                    {cmds.map((cmd) => {
                      const absoluteIndex = filteredCommands.findIndex((c) => c.id === cmd.id);
                      const isSelected = absoluteIndex === selectedIndex;

                      return (
                        <button
                          key={cmd.id}
                          id={`${listId}-${cmd.id}`}
                          role="option"
                          aria-selected={isSelected}
                          tabIndex={-1}
                          onClick={() => runCommand(cmd)}
                          onMouseEnter={() => setSelectedIndex(absoluteIndex)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-sm rounded-lg transition-colors ${
                            isSelected
                              ? "bg-bg text-text-primary"
                              : "text-text-secondary hover:text-text-primary hover:bg-bg/50"
                          }`}
                        >
                          {cmd.icon ? (
                            cmd.icon
                          ) : (
                            <span
                              aria-hidden="true"
                              className="w-3.5 h-3.5 flex items-center justify-center text-text-secondary/40"
                            >
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

            <div
              aria-hidden="true"
              className="bg-bg border-t border-border/50 p-3 text-center flex items-center justify-center gap-4"
            >
              <div className="flex items-center gap-1.5 text-[10px] text-text-secondary">
                <span className="border border-border rounded px-1 min-w-[16px] flex items-center justify-center bg-surface">
                  ↓
                </span>
                <span className="border border-border rounded px-1 min-w-[16px] flex items-center justify-center bg-surface">
                  ↑
                </span>
                <span>to navigate</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-text-secondary">
                <span className="border border-border rounded px-1 min-w-[16px] flex items-center justify-center bg-surface">
                  ↵
                </span>
                <span>to select</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
