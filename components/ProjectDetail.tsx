"use client";

import { SOCIAL } from "@/lib/constants";
import type { ProjectData } from "@/lib/projects";
import { motion } from "framer-motion";
import Link from "next/link";
import TerminalDemo from "./TerminalDemo";
import { ExternalLinkIcon, GithubIcon } from "./icons";

export default function ProjectDetail({ project }: { project: ProjectData }) {
    return (
        <article className="min-h-screen bg-bg text-text-primary">
            {/* Navigation bar */}
            <nav className="fixed top-0 left-0 right-0 z-40 border-b border-border/50 bg-bg/80 backdrop-blur-md">
                <div className="max-w-content mx-auto px-6 h-14 flex items-center justify-between">
                    <Link
                        href="/#projects"
                        className="flex items-center gap-2 font-mono text-[12px] text-text-secondary hover:text-accent transition-colors"
                    >
                        <span className="text-accent">←</span> Back to Portfolio
                    </Link>
                    <div className="flex items-center gap-3">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 font-mono text-[11px] text-text-secondary border border-border px-3 py-1.5 rounded-lg hover:border-accent hover:text-accent transition-all"
                            aria-label={`View ${project.name} on GitHub`}
                        >
                            <GithubIcon className="w-3.5 h-3.5" />
                            Source
                        </a>
                    </div>
                </div>
            </nav>

            <div className="pt-14">
                {/* Hero */}
                <header className="py-16 sm:py-24 lg:py-32">
                    <div className="max-w-content mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span
                                    className="font-mono text-[12px] px-2.5 py-1 rounded-md border"
                                    style={{
                                        color: project.accentColor,
                                        borderColor: `${project.accentColor}30`,
                                        backgroundColor: `${project.accentColor}08`,
                                    }}
                                >
                                    Project {project.number}
                                </span>
                                <span className="font-mono text-[11px] text-text-secondary tracking-widest uppercase">
                                    {project.tagline}
                                </span>
                            </div>

                            <h1
                                className="font-space-grotesk text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
                                style={{ color: project.accentColor }}
                            >
                                {project.name}
                            </h1>

                            <p className="text-text-secondary text-lg sm:text-xl leading-relaxed max-w-2xl mb-8">
                                {project.description}
                            </p>

                            {/* Tech badges */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="font-mono text-[12px] px-3 py-1.5 rounded-md border"
                                        style={{
                                            color: project.accentColor,
                                            borderColor: `${project.accentColor}25`,
                                            backgroundColor: `${project.accentColor}08`,
                                        }}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-card transition-all duration-200"
                                    style={{
                                        backgroundColor: project.accentColor,
                                        color: "#0D1117",
                                    }}
                                >
                                    <GithubIcon className="w-4 h-4" />
                                    View on GitHub
                                </a>
                                <a
                                    href={`${SOCIAL.github.url}/${project.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-border rounded-card text-text-primary hover:border-accent hover:text-accent transition-all duration-200"
                                >
                                    <ExternalLinkIcon className="w-4 h-4" />
                                    README
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </header>

                {/* Accent divider */}
                <div
                    className="h-[1px]"
                    style={{
                        background: `linear-gradient(90deg, transparent 0%, ${project.accentColor}40 50%, transparent 100%)`,
                    }}
                />

                {/* Overview */}
                <section className="py-16 sm:py-20">
                    <div className="max-w-content mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="font-mono text-[11px] text-text-secondary tracking-[0.18em] uppercase mb-3">
                                Overview
                            </h2>
                            <p className="text-text-secondary text-[1.05rem] leading-[1.85] max-w-3xl">
                                {project.overview}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Terminal demo */}
                <section className="py-16 sm:py-20 bg-surface/20">
                    <div className="max-w-content mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="font-mono text-[11px] text-text-secondary tracking-[0.18em] uppercase mb-6">
                                Live Demo
                            </h2>
                            <div className="max-w-3xl">
                                <TerminalDemo
                                    steps={project.terminalDemo}
                                    accentColor={project.accentColor}
                                    title={`${project.name.toLowerCase()} demo`}
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Architecture */}
                <section className="py-16 sm:py-20">
                    <div className="max-w-content mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="font-mono text-[11px] text-text-secondary tracking-[0.18em] uppercase mb-8">
                                Architecture
                            </h2>
                            <div className="grid gap-4 max-w-3xl">
                                {project.architecture.map((item, idx) => {
                                    const [title, ...rest] = item.split(" — ");
                                    const desc = rest.join(" — ");
                                    return (
                                        <motion.div
                                            key={idx}
                                            className="p-5 rounded-card border border-border bg-surface/40 group"
                                            initial={{ opacity: 0, x: -12 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.08, duration: 0.4 }}
                                        >
                                            <div className="flex items-start gap-3">
                                                <span
                                                    className="font-mono text-[10px] mt-1 font-bold shrink-0"
                                                    style={{ color: project.accentColor }}
                                                >
                                                    {String(idx + 1).padStart(2, "0")}
                                                </span>
                                                <div>
                                                    <div className="font-space-grotesk text-sm font-semibold text-text-primary mb-1 group-hover:text-accent transition-colors">
                                                        {title}
                                                    </div>
                                                    {desc && (
                                                        <div className="text-[12px] text-text-secondary leading-relaxed">
                                                            {desc}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Design decisions */}
                <section className="py-16 sm:py-20 bg-surface/20">
                    <div className="max-w-content mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="font-mono text-[11px] text-text-secondary tracking-[0.18em] uppercase mb-8">
                                Design Decisions
                            </h2>
                            <div className="grid gap-6 max-w-3xl">
                                {project.designDecisions.map((decision, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="relative pl-6 border-l-2"
                                        style={{ borderColor: `${project.accentColor}40` }}
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1, duration: 0.4 }}
                                    >
                                        <h3 className="font-space-grotesk text-base font-semibold text-text-primary mb-2">
                                            {decision.title}
                                        </h3>
                                        <p className="text-[13px] text-text-secondary leading-relaxed">
                                            {decision.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Key features */}
                <section className="py-16 sm:py-20">
                    <div className="max-w-content mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="font-mono text-[11px] text-text-secondary tracking-[0.18em] uppercase mb-8">
                                Key Features
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
                                {project.features.map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="flex items-center gap-3 p-4 rounded-card border border-border bg-surface/40"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.06, duration: 0.3 }}
                                    >
                                        <span
                                            className="text-[10px] shrink-0"
                                            style={{ color: project.accentColor }}
                                        >
                                            ◈
                                        </span>
                                        <span className="text-[13px] text-text-secondary">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="py-16 sm:py-20 border-t border-border/50">
                    <div className="max-w-content mx-auto px-6 text-center">
                        <p className="text-text-secondary text-sm mb-6">
                            Explore the full source code and documentation on GitHub
                        </p>
                        <div className="flex justify-center gap-3 flex-wrap">
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-card transition-all duration-200"
                                style={{
                                    backgroundColor: project.accentColor,
                                    color: "#0D1117",
                                }}
                            >
                                <GithubIcon className="w-4 h-4" />
                                View Source
                            </a>
                            <Link
                                href="/#projects"
                                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border border-border rounded-card text-text-secondary hover:text-accent hover:border-accent transition-all duration-200"
                            >
                                ← Back to All Projects
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </article>
    );
}
