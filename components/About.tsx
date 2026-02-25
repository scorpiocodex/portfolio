"use client";

import { FadeIn, FadeInItem, FadeInStagger } from "./FadeIn";

const focusAreas = [
  {
    label: "Full-Stack Web Development",
    description: "Building end-to-end web applications with React on the frontend and Node.js on the backend.",
    icon: "◈",
  },
  {
    label: "Python & Developer Tooling",
    description: "Automating workflows and building CLI utilities — from file watchers to system automation scripts.",
    icon: "◈",
  },
  {
    label: "Database Engineering",
    description: "Designing and querying relational data with SQL and PostgreSQL for production web applications.",
    icon: "◈",
  },
  {
    label: "Linux Systems & Automation",
    description: "Native Linux development, command-line tooling, and hands-on system administration.",
    icon: "◈",
  },
  {
    label: "REST API Design",
    description: "Architecting clean, predictable REST APIs that connect frontend and backend systems reliably.",
    icon: "◈",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 relative z-10 bg-bg">
      <div className="max-w-content mx-auto px-6">

        {/* Section header */}
        <FadeIn className="mb-16">
          <span className="font-mono text-[11px] text-text-secondary tracking-[0.18em] uppercase block mb-3">
            01 — About
          </span>
          <h2 className="font-space-grotesk text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
            The Developer
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-start">

          {/* Left: Bio text */}
          <FadeIn delay={0.05}>
            <p className="text-text-secondary text-[1.05rem] leading-[1.85] mb-6 max-w-[540px]">
              San Shibu is an IT professional and aspiring full-stack developer with a{" "}
              <span className="text-text-primary">Bachelor of Information Technology</span> from{" "}
              <span className="text-text-primary">Victoria University, Melbourne</span>. Currently
              completing an advanced{" "}
              <span className="text-text-primary">Full-Stack Web Development</span> certification
              at Scaler Academy (Feb 2026).
            </p>
            <p className="text-text-secondary text-[1.05rem] leading-[1.85] max-w-[540px]">
              His work spans full-stack web applications, Python automation tools, and hands-on
              Linux system engineering. He applies strong analytical thinking and clean architecture
              principles to build solutions that are reliable, maintainable, and user-focused.
            </p>

            {/* Credential row */}
            <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-border/50">
              {[
                { value: "B.I.T", label: "Victoria University, AU" },
                { value: "React + Python", label: "Core stack" },
                { value: "Kerala", label: "India" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-space-grotesk text-xl font-bold text-accent mb-1">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[11px] text-text-secondary tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Right: Focus areas */}
          <FadeInStagger staggerDelay={0.07}>
            <div className="flex flex-col gap-3">
              {focusAreas.map((area) => (
                <FadeInItem key={area.label}>
                  <div className="group flex items-start gap-3.5 p-4 rounded-card border border-border bg-surface/50 card-glow cursor-default">
                    <span className="text-accent/60 text-xs mt-0.5 font-mono group-hover:text-accent transition-colors">
                      {area.icon}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-text-primary mb-0.5 group-hover:text-accent transition-colors duration-200">
                        {area.label}
                      </div>
                      <div className="text-[12px] text-text-secondary leading-relaxed">
                        {area.description}
                      </div>
                    </div>
                  </div>
                </FadeInItem>
              ))}
            </div>
          </FadeInStagger>
        </div>
      </div>
    </section>
  );
}
