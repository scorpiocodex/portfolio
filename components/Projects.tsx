import { PROJECTS } from "@/lib/projects";
import { AnimatedSectionNumber } from "./AnimatedElements";
import { FadeIn, FadeInItem, FadeInStagger } from "./FadeIn";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="py-24 lg:py-32">
      <div className="max-w-content mx-auto px-6">
        {/* Header */}
        <FadeIn className="mb-16">
          <AnimatedSectionNumber number="01" label="Projects" />
          <h2 className="font-space-grotesk text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
            Featured Work
          </h2>
          <p className="text-text-secondary text-base mt-3 max-w-lg leading-relaxed">
            Two open-source Python tools, both published on PyPI — built with typed code, automated
            tests, and CI-driven releases.
          </p>
        </FadeIn>

        {/* Project cards */}
        <FadeInStagger staggerDelay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {PROJECTS.map((project) => (
              <FadeInItem key={project.slug} className="h-full perspective-1000">
                <ProjectCard project={project} />
              </FadeInItem>
            ))}
          </div>
        </FadeInStagger>
      </div>
    </section>
  );
}
