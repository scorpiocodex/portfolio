"use client";

import { FadeIn } from "./FadeIn";
import { motion } from "framer-motion";

function ArchNode({
  label,
  sublabel,
  color,
  isMain = true,
  delay = 0,
}: {
  label: string;
  sublabel: string;
  color: string;
  isMain?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col justify-center px-4 py-3 rounded-lg border cursor-default transition-all duration-300"
      style={{
        borderColor: `${color}40`,
        background: `${color}08`,
        minWidth: isMain ? "200px" : "170px",
        maxWidth: isMain ? "220px" : "180px",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[1px] rounded-t-lg opacity-60"
        style={{ background: color }}
      />
      <div
        className="font-mono text-[12.5px] font-medium"
        style={{ color }}
      >
        {label}
      </div>
      <div className="font-mono text-[10px] text-text-secondary/70 mt-0.5 leading-snug">
        {sublabel}
      </div>
    </motion.div>
  );
}

function VerticalConnector({ color = "#30363D", delay = 0 }: { color?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className="w-px h-8 origin-top"
      style={{ background: color }}
    />
  );
}

function HorizontalConnector({ direction, color = "#30363D" }: { direction: "left" | "right"; color?: string }) {
  return (
    <div className="flex items-center">
      {direction === "left" && (
        <div className="w-8 h-px" style={{ background: color }} />
      )}
      <div
        className="w-2 h-2 rounded-full border"
        style={{ borderColor: color, background: "#0D1117" }}
      />
      {direction === "right" && (
        <div className="w-8 h-px" style={{ background: color }} />
      )}
    </div>
  );
}

export default function Architecture() {
  return (
    <section id="architecture" className="py-24 lg:py-32">
      <div className="max-w-content mx-auto px-6">

        {/* Header */}
        <FadeIn className="mb-16">
          <span className="font-mono text-[11px] text-text-secondary tracking-[0.18em] uppercase block mb-3">
            04 — Architecture
          </span>
          <h2 className="font-space-grotesk text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
            Watchflow — System Architecture
          </h2>
          <p className="text-text-secondary text-base mt-3 max-w-md leading-relaxed">
            How Watchflow processes YAML intents from file event detection to shell workflow execution.
          </p>
        </FadeIn>

        {/* Diagram */}
        <FadeIn delay={0.1}>
          <div className="relative bg-surface/30 rounded-[16px] border border-border p-8 lg:p-12 overflow-x-auto">

            {/* Grid background pattern */}
            <div
              className="absolute inset-0 rounded-[16px] opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(48, 54, 61, 0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(48, 54, 61, 0.5) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative flex flex-col items-center gap-0 min-w-[360px]">

              {/* YAML Intent Parser */}
              <ArchNode label="YAML Intent Parser" sublabel="NLP intent definition & loading" color="#58A6FF" delay={0.1} />
              <VerticalConnector color="#58A6FF40" delay={0.2} />

              {/* File System Watcher row */}
              <div className="flex items-center gap-0">
                <ArchNode label="File System Watcher" sublabel="inotify / directory monitoring" color="#58A6FF" delay={0.25} />
                <HorizontalConnector direction="right" color="#8B949E40" />
                <ArchNode label="Config Manager" sublabel="YAML rules & env resolution" color="#8B949E" isMain={false} delay={0.3} />
              </div>
              <VerticalConnector color="#7C3AED40" delay={0.35} />

              {/* Topological Resolver */}
              <ArchNode label="Topological Resolver" sublabel="Workflow dependency ordering" color="#7C3AED" delay={0.4} />
              <VerticalConnector color="#58A6FF40" delay={0.45} />

              {/* Workflow Executor row */}
              <div className="flex items-center gap-0">
                <ArchNode label="Workflow Executor" sublabel="Shell command scheduling" color="#58A6FF" delay={0.5} />
                <HorizontalConnector direction="right" color="#F8514940" />
                <ArchNode label="Daemon Controller" sublabel="Process lifecycle & sessions" color="#F85149" isMain={false} delay={0.55} />
              </div>
              <VerticalConnector color="#3FB95040" delay={0.6} />

              {/* Analytics Pipeline */}
              <ArchNode label="Analytics Pipeline" sublabel="Cross-session event tracking" color="#3FB950" delay={0.65} />
              <VerticalConnector color="#3FB95040" delay={0.7} />

              {/* Terminal Output */}
              <ArchNode label="Terminal Output" sublabel="Rich CLI feedback & dry-run" color="#3FB950" delay={0.75} />
            </div>

            {/* Legend */}
            <div className="relative mt-10 pt-6 border-t border-border/50 flex flex-wrap gap-5 justify-center">
              {[
                { color: "#58A6FF", label: "Core layer" },
                { color: "#7C3AED", label: "Filter layer" },
                { color: "#3FB950", label: "I/O layer" },
                { color: "#8B949E", label: "Config layer" },
                { color: "#F85149", label: "Fault layer" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-mono text-[10px] text-text-secondary">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
