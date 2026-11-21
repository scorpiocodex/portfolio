import { AnimatedCounter, AnimatedSectionNumber } from "./AnimatedElements";
import { FadeIn, FadeInItem, FadeInStagger } from "./FadeIn";

const focusAreas = [
  {
    label: "Python Backend Development",
    description:
      "FastAPI and PostgreSQL services with Celery and Redis for background jobs, JWT authentication and Alembic migrations.",
  },
  {
    label: "Full-Stack Applications",
    description:
      "React and Vite front ends — an owner dashboard and a customer ordering app — running alongside the backend in Docker Compose.",
  },
  {
    label: "LLM Integration",
    description:
      "A local Llama 3.2 model via Ollama turns free-text orders in English and Manglish into validated carts, at zero API cost.",
  },
  {
    label: "Open-Source Python Tooling",
    description:
      "ScorpioWatch and Nyxora, published on PyPI with CI, secret scanning and release automation through GitHub Actions.",
  },
  {
    label: "Testing & Quality",
    description:
      "pytest suites (371 tests on BakeriQ), mypy, and 26 architecture decision records to keep the design honest.",
  },
];

const credentials = [
  { value: "B.I.T", label: "Victoria University, AU" },
  { value: "Python + FastAPI", label: "Core stack" },
  { value: "Kerala", label: "India" },
];

const stats = [
  { value: 371, suffix: "", label: "Automated tests (BakeriQ)" },
  { value: 2, suffix: "", label: "Packages on PyPI" },
  { value: 100, suffix: "%", label: "Test coverage (ScorpioWatch)" },
];

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 relative z-10">
      <div className="max-w-content mx-auto px-6">
        {/* Section header */}
        <FadeIn className="mb-16">
          <AnimatedSectionNumber number="02" label="About" />
          <h2 className="font-space-grotesk text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
            Who I Am
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-start">
          {/* Left: Bio text */}
          <FadeIn delay={0.05}>
            <p className="text-text-secondary text-[1.05rem] leading-[1.85] mb-6 max-w-[540px]">
              San Shibu is a Python full-stack developer with a{" "}
              <span className="text-text-primary">Bachelor of Information Technology</span> from{" "}
              <span className="text-text-primary">Victoria University, Melbourne</span> and a{" "}
              <span className="text-text-primary">Software & AI Engineering Program</span>{" "}
              certificate from Scaler Academy (Nov 2026). During a full-stack internship at Digital
              Mesh, San built BakeriQ — a WhatsApp-first bakery order platform — end to end.
            </p>
            <p className="text-text-secondary text-[1.05rem] leading-[1.85] max-w-[540px]">
              The work spans FastAPI and PostgreSQL backends, React front ends, local-LLM
              integration, and open-source Python tools published on PyPI. BakeriQ has 371 automated
              tests, and both PyPI tools ship through CI, because reliable software is the point.
            </p>

            {/* Credential row */}
            <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-border/50">
              {credentials.map((item) => (
                <div key={item.label}>
                  <div className="font-space-grotesk text-xl font-bold text-accent mb-1">
                    {item.value}
                  </div>
                  <div className="font-mono text-[11px] text-text-secondary tracking-wide">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Animated stats */}
            <div className="flex flex-wrap gap-10 mt-8 pt-8 border-t border-border/50">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="font-space-grotesk text-2xl font-bold text-text-primary"
                    duration={1.8}
                  />
                  <div className="font-mono text-[10px] text-text-secondary tracking-wider mt-1 uppercase">
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
                    <span
                      aria-hidden="true"
                      className="text-accent/60 text-xs mt-0.5 font-mono group-hover:text-accent transition-colors"
                    >
                      ◈
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
