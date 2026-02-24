"use client";

import { FadeIn, FadeInStagger, FadeInItem } from "./FadeIn";

interface SkillGroup {
  category: string;
  number: string;
  color: string;
  skills: { name: string; level?: "core" | "proficient" | "familiar" }[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Frontend",
    number: "01",
    color: "#58A6FF",
    skills: [
      { name: "HTML5", level: "core" },
      { name: "CSS3", level: "core" },
      { name: "JavaScript", level: "core" },
      { name: "React", level: "proficient" },
      { name: "Responsive Design", level: "proficient" },
    ],
  },
  {
    category: "Backend & Data",
    number: "02",
    color: "#7C3AED",
    skills: [
      { name: "Node.js", level: "proficient" },
      { name: "Python", level: "proficient" },
      { name: "REST APIs", level: "proficient" },
      { name: "SQL", level: "proficient" },
      { name: "PostgreSQL", level: "proficient" },
      { name: "Docker", level: "familiar" },
    ],
  },
  {
    category: "Dev Environment",
    number: "03",
    color: "#3FB950",
    skills: [
      { name: "Git / GitHub", level: "core" },
      { name: "VS Code", level: "core" },
      { name: "Linux", level: "proficient" },
      { name: "Windows 10/11", level: "core" },
      { name: "Postman", level: "proficient" },
      { name: "Command-line", level: "proficient" },
    ],
  },
];

const LEVEL_STYLE: Record<string, string> = {
  core:      "bg-accent/10 border-accent/25 text-accent",
  proficient: "bg-surface border-border text-text-primary",
  familiar:  "bg-surface/50 border-border/50 text-text-secondary",
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 lg:py-32">
      <div className="max-w-content mx-auto px-6">

        {/* Header */}
        <FadeIn className="mb-16">
          <span className="font-mono text-[11px] text-text-secondary tracking-[0.18em] uppercase block mb-3">
            05 — Skills
          </span>
          <h2 className="font-space-grotesk text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
            Technical Stack
          </h2>
          <p className="text-text-secondary text-base mt-3 max-w-md leading-relaxed">
            Tools, languages, and environments in active use.
          </p>
        </FadeIn>

        {/* Groups */}
        <FadeInStagger staggerDelay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SKILL_GROUPS.map((group) => (
              <FadeInItem key={group.category}>
                <div
                  className="h-full p-6 rounded-card border border-border bg-surface/40 relative overflow-hidden group hover:border-[var(--g-color)]/30 transition-all duration-300 card-glow"
                  style={{ "--g-color": group.color } as React.CSSProperties}
                >
                  {/* Top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[1.5px]"
                    style={{ background: group.color }}
                  />

                  {/* Category header */}
                  <div className="mb-5">
                    <div
                      className="font-mono text-[10px] tracking-widest uppercase mb-2"
                      style={{ color: group.color }}
                    >
                      {group.number}
                    </div>
                    <h3 className="font-space-grotesk text-base font-semibold text-text-primary">
                      {group.category}
                    </h3>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => {
                      const levelClass = LEVEL_STYLE[skill.level ?? "proficient"];
                      return (
                        <span
                          key={skill.name}
                          className={`font-mono text-[11px] px-2.5 py-1 rounded-md border ${levelClass} leading-none`}
                        >
                          {skill.name}
                        </span>
                      );
                    })}
                  </div>

                  {/* Skill count */}
                  <div className="mt-5 pt-4 border-t border-border/40 flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: group.color }}
                    />
                    <span className="font-mono text-[10px] text-text-secondary">
                      {group.skills.length} items
                    </span>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </div>
        </FadeInStagger>

        {/* Level legend */}
        <FadeIn delay={0.15} className="mt-8">
          <div className="flex flex-wrap gap-4 justify-end">
            {[
              { level: "core",       label: "Core — daily use" },
              { level: "proficient", label: "Proficient — regular use" },
              { level: "familiar",   label: "Familiar — working knowledge" },
            ].map(({ level, label }) => (
              <div key={level} className="flex items-center gap-2">
                <span
                  className={`font-mono text-[10px] px-2 py-0.5 rounded border ${LEVEL_STYLE[level]}`}
                >
                  {level}
                </span>
                <span className="font-mono text-[10px] text-text-secondary/60">{label}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
