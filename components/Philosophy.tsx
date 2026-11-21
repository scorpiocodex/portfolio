import { AnimatedSectionNumber } from "./AnimatedElements";
import { FadeIn, FadeInItem, FadeInStagger } from "./FadeIn";

const philosophies = [
  {
    number: "01",
    title: "UX matters across every interface.",
    body: "Whether it is a web application or a command-line tool, design discipline is non-negotiable. Structure, clarity, and responsiveness are not optional extras.",
    accent: "var(--accent)",
  },
  {
    number: "02",
    title: "Simplicity scales better than complexity.",
    body: "The best systems are minimal. Complexity creates surface area for failure. Clean, focused modules outperform monolithic, over-engineered solutions.",
    accent: "var(--glow)",
  },
  {
    number: "03",
    title: "Security is foundational.",
    body: "Security cannot be retrofitted. It must be embedded in architecture from the first decision. Every input boundary, every configuration path, every privilege surface matters.",
    accent: "var(--success)",
  },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24 lg:py-32">
      <div className="max-w-content mx-auto px-6">

        {/* Header */}
        <FadeIn className="mb-14">
          <AnimatedSectionNumber number="05" label="Philosophy" />
          <h2 className="font-space-grotesk text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
            Engineering Principles
          </h2>
          <p className="text-text-secondary text-base mt-3 max-w-md leading-relaxed">
            The thinking behind every system, every decision, every line.
          </p>
        </FadeIn>

        {/* Grid */}
        <FadeInStagger staggerDelay={0.09}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {philosophies.map((p) => (
              <PhilosophyCard key={p.number} {...p} />
            ))}
          </div>
        </FadeInStagger>
      </div>
    </section>
  );
}

function PhilosophyCard({
  number,
  title,
  body,
  accent,
}: {
  number: string;
  title: string;
  body: string;
  accent: string;
}) {
  return (
    <FadeInItem>
      <div
        className="group relative h-full p-6 rounded-card border border-border bg-surface/40 card-glow cursor-default overflow-hidden"
        style={{ "--card-accent": accent } as React.CSSProperties}
      >
        {/* Subtle top border in accent color */}
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: accent }}
        />

        {/* Number */}
        <div
          className="font-mono text-[11px] font-medium mb-4 tracking-widest"
          style={{ color: accent }}
        >
          {number}
        </div>

        {/* Title */}
        <h3 className="font-space-grotesk text-base font-semibold text-text-primary leading-snug mb-3 group-hover:text-white transition-colors duration-200">
          {title}
        </h3>

        {/* Body */}
        <p className="text-[12.5px] text-text-secondary leading-[1.7]">{body}</p>

        {/* Corner decoration */}
        <div
          className="absolute bottom-3 right-3 w-8 h-8 opacity-5 group-hover:opacity-10 transition-opacity"
          style={{
            borderRight: `1px solid ${accent}`,
            borderBottom: `1px solid ${accent}`,
          }}
        />
      </div>
    </FadeInItem>
  );
}
