import { SKILL_GROUPS, type SkillGroup } from "@/lib/skills";
import type { CSSProperties } from "react";
import { AnimatedSectionNumber } from "./AnimatedElements";
import { FadeIn, FadeInItem, FadeInStagger } from "./FadeIn";
import { SKILL_ICONS } from "./skill-icons";

function SkillRow({ name, color }: { name: string; color: string }) {
  const Icon = SKILL_ICONS[name];

  return (
    <li className="group/skill flex items-center gap-3 py-2 px-3 -mx-3 rounded-lg hover:bg-white/[0.03] transition-colors duration-200 cursor-default">
      <div
        aria-hidden="true"
        className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-transform duration-200 group-hover/skill:scale-110"
        style={{
          backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
          color: `color-mix(in srgb, ${color} 80%, transparent)`,
        }}
      >
        {Icon ? (
          <Icon className="w-3.5 h-3.5" />
        ) : (
          <span className="text-[10px] font-mono font-bold">{name.slice(0, 2)}</span>
        )}
      </div>
      <span className="flex-1 font-mono text-[12px] leading-snug text-text-secondary group-hover/skill:text-text-primary transition-colors duration-200 tracking-wide">
        {name}
      </span>
    </li>
  );
}

function SkillCard({ group }: { group: SkillGroup }) {
  return (
    <div
      className="h-full p-6 rounded-card border border-border bg-surface/40 relative overflow-hidden card-glow"
      style={{ "--hover-color": group.color } as CSSProperties}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px]" style={{ background: group.color }} />

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

      <ul className="flex flex-col">
        {group.skills.map((skill) => (
          <SkillRow key={skill} name={skill} color={group.color} />
        ))}
      </ul>

      <div className="mt-6 pt-4 border-t border-border/40 flex items-center gap-2">
        <div
          aria-hidden="true"
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: group.color }}
        />
        <span className="font-mono text-[10px] text-text-secondary">
          {group.skills.length} items
        </span>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 lg:py-32">
      <div className="max-w-content mx-auto px-6">
        {/* Header */}
        <FadeIn className="mb-16">
          <AnimatedSectionNumber number="03" label="Skills" />
          <h2 className="font-space-grotesk text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
            Technical Stack
          </h2>
          <p className="text-text-secondary text-base mt-3 max-w-md leading-relaxed">
            Languages, frameworks, and tools used in shipped projects.
          </p>
        </FadeIn>

        <FadeInStagger staggerDelay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILL_GROUPS.map((group) => (
              <FadeInItem key={group.category}>
                <SkillCard group={group} />
              </FadeInItem>
            ))}
          </div>
        </FadeInStagger>
      </div>
    </section>
  );
}
