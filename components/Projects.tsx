"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { MouseEvent, useRef } from "react";
import { FadeIn, FadeInItem, FadeInStagger } from "./FadeIn";
import { GithubIcon } from "./icons";

interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  github: string;
  accentColor: string;
  number: string;
}

const PROJECTS: Project[] = [
  {
    slug: "watchflow",
    name: "Watchflow",
    number: "01",
    tagline: "Pipeline Automation CLI",
    description:
      "Next-generation pipeline automation CLI. Define NLP intents in YAML to instantly trigger topological shell workflows on file changes. Includes built-in daemon orchestration, dry-run simulation, and cross-session analytics.",
    features: [
      "YAML-defined NLP intent triggers",
      "Topological shell workflow execution",
      "Built-in daemon orchestration",
      "Dry-run simulation mode",
      "Cross-session analytics",
    ],
    tech: ["Python", "YAML", "Shell", "Watchdog"],
    github: "https://github.com/scorpiocodex/Watchflow",
    accentColor: "#58A6FF",
  },
  {
    slug: "termbackup",
    name: "Termbackup",
    number: "02",
    tagline: "Zero-Knowledge Backup System",
    description:
      "Advanced zero-knowledge backup architecture interfacing directly with the GitHub API. Engineered with mathematically enforced security, automated snapshot logic, and next-generation terminal UI paradigms.",
    features: [
      "Zero-knowledge backup architecture",
      "Direct GitHub API integration",
      "Mathematically enforced security",
      "Automated directory snapshots",
      "File validation and restore",
    ],
    tech: ["Python", "GitHub API", "Cryptography", "CLI"],
    github: "https://github.com/scorpiocodex/Termbackup",
    accentColor: "#7C3AED",
  },
  {
    slug: "fluxion",
    name: "Fluxion",
    number: "03",
    tagline: "Intelligent Network Command Engine",
    description:
      "Next-gen CLI download accelerator with adaptive parallel transport, real-time network telemetry, and TLS deep inspection. Multi-protocol support across HTTP/2, HTTP/3 QUIC, FTP, SFTP, and SCP. Built for speed and precision.",
    features: [
      "Adaptive parallel transport engine",
      "Real-time network telemetry",
      "TLS deep inspection",
      "HTTP/2 · HTTP/3 QUIC · FTP · SFTP · SCP",
      "Browser-grade stealth mode",
    ],
    tech: ["Python", "HTTP/2", "HTTP/3 QUIC", "Networking"],
    github: "https://github.com/scorpiocodex/Fluxion",
    accentColor: "#00E5FF",
  },
  {
    slug: "nyxora",
    name: "Nyxora",
    number: "04",
    tagline: "Cryptographic Cipher Vault",
    description:
      "Terminal-native, zero-knowledge, quantum-resilient password vault. Military-grade encryption (Argon2id + XChaCha20-Poly1305) with offline-first architecture, Shamir's Secret Sharing recovery, and a cyberpunk CLI interface.",
    features: [
      "Argon2id + XChaCha20-Poly1305 encryption",
      "Zero-knowledge offline-first architecture",
      "Shamir's Secret Sharing recovery",
      "Intel engine with breach detection (HIBP)",
      "Memory-guarded key handling (mlock/VirtualLock)",
    ],
    tech: ["Python", "Cryptography", "SQLite", "CLI"],
    github: "https://github.com/scorpiocodex/Nyxora",
    accentColor: "#3FB950",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 lg:py-32">
      <div className="max-w-content mx-auto px-6">

        {/* Header */}
        <FadeIn className="mb-16">
          <span className="font-mono text-[11px] text-text-secondary tracking-[0.18em] uppercase block mb-3">
            04 — Projects
          </span>
          <h2 className="font-space-grotesk text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
            Systems Built
          </h2>
          <p className="text-text-secondary text-base mt-3 max-w-md leading-relaxed">
            Production-grade Python CLI tools engineered with precision. Each built from first principles.
          </p>
        </FadeIn>

        {/* Project cards */}
        <FadeInStagger staggerDelay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </FadeInStagger>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    mouseX.set(localX);
    mouseY.set(localY);

    const xPct = localX / width - 0.5;
    const yPct = localY / height - 0.5;

    // Subtle 3D tilt
    rotateX.set(-yPct * 8);
    rotateY.set(xPct * 8);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <FadeInItem className="h-full perspective-1000">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          borderColor: `${project.accentColor}66`,
          boxShadow: `0 0 0 1px ${project.accentColor}22, 0 8px 48px ${project.accentColor}18`,
          y: -4,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="group relative h-full flex flex-col p-6 rounded-card border border-border bg-surface/50 cursor-default overflow-hidden will-change-transform"
      >
        {/* Top accent line on hover */}
        <div
          className="absolute top-0 left-6 right-6 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: project.accentColor }}
        />

        {/* Dynamic spotlight on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-card"
          style={{
            background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${project.accentColor}18, transparent 80%)`,
          }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-5 relative z-10">
          <div>
            <div
              className="font-mono text-[10px] tracking-widest mb-2 uppercase"
              style={{ color: project.accentColor }}
            >
              {project.number}
            </div>
            <h3 className="font-space-grotesk text-xl font-bold text-text-primary group-hover:text-white transition-colors duration-200">
              {project.name}
            </h3>
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.name} on GitHub`}
            className="p-2 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border/80 transition-all duration-200 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Tagline */}
        <p
          className="font-mono text-[11px] uppercase tracking-wider mb-4 relative z-10"
          style={{ color: project.accentColor }}
        >
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-[13px] text-text-secondary leading-[1.7] mb-5 relative z-10">
          {project.description}
        </p>

        {/* Features */}
        <ul className="flex flex-col gap-2 mb-6 relative z-10 flex-1">
          {project.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span
                className="mt-[5px] w-1 h-1 rounded-full shrink-0"
                style={{ backgroundColor: project.accentColor }}
              />
              <span className="text-[12.5px] text-text-secondary">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2 relative z-10 pt-4 border-t border-border/40">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] px-2.5 py-1 rounded-md"
              style={{
                background: `${project.accentColor}0d`,
                border: `1px solid ${project.accentColor}25`,
                color: project.accentColor,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </FadeInItem>
  );
}
