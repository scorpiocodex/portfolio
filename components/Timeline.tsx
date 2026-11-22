import { AnimatedSectionNumber } from "./AnimatedElements";
import { FadeIn, FadeInItem, FadeInStagger } from "./FadeIn";
import { ExternalLinkIcon } from "./icons";
import TimelineFrame from "./TimelineFrame";

type EntryKind = "Work" | "Education" | "Certification";

interface TimelineEntry {
  period: string;
  kind: EntryKind;
  title: string;
  org: string;
  location?: string;
  description?: string;
  highlights: string[];
  link?: { label: string; href: string };
}

/* Newest first, mirroring the resume. */
const TIMELINE_DATA: TimelineEntry[] = [
  {
    period: "Nov 2026",
    kind: "Certification",
    title: "Software & AI Engineering Program",
    org: "Scaler Academy",
    description: "Certificate of Excellence, issued with NSDC.",
    highlights: [
      "DSA, system design (LLD/HLD) and system architecture",
      "5 weeks of project building",
    ],
  },
  {
    period: "May 2026 – Jul 2026",
    kind: "Work",
    title: "Full-Stack Developer Intern",
    org: "Digital Mesh Softech India Pvt. Ltd.",
    location: "Kochi, Kerala (on-site)",
    description: "Project: BakeriQ, a WhatsApp-first bakery order management platform.",
    highlights: [
      "Built BakeriQ end to end: a FastAPI and PostgreSQL backend with Celery and Redis for background jobs, plus two React/Vite front ends (owner dashboard and customer ordering app), all run in Docker Compose.",
      "Integrated a local Llama 3.2 model (Ollama) to turn free-text WhatsApp orders in English and Manglish into carts, validated by exact, alias and fuzzy catalogue matching, at zero API cost.",
      "Ran LLM parsing as async Celery tasks so the WhatsApp webhook never blocks on the model, and built 9 interactive Twilio message templates for menus, cart links, order confirmations, invoices and registration.",
      "Implemented JWT authentication, owner approval for new customers, per-day invoicing delivered over WhatsApp, and inventory tracking with daily prep lists and low-stock alerts.",
      "Wrote 371 automated tests (pytest) and 26 architecture decision records; delivered a live end-to-end demo, and the bakery owner plans to adopt the system.",
    ],
    link: { label: "BakeriQ on GitHub", href: "https://github.com/scorpiocodex/bakeriq" },
  },
  {
    period: "Feb 2019 – Jun 2022",
    kind: "Education",
    title: "Bachelor of Information Technology",
    org: "Victoria University",
    location: "Melbourne, Australia",
    description: "Major in Networking, minor in Programming.",
    highlights: ["Project: AI-powered plant leaf disease detection web app"],
  },
];

export default function Timeline() {
  return (
    <section id="experience" className="py-24 lg:py-32">
      <div className="max-w-content mx-auto px-6">
        <FadeIn className="mb-20">
          <AnimatedSectionNumber number="04" label="Experience" />
          <h2 className="font-space-grotesk text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
            Experience & Education
          </h2>
        </FadeIn>

        <TimelineFrame>
          <FadeInStagger staggerDelay={0.2} className="flex flex-col gap-12 lg:gap-20">
            {TIMELINE_DATA.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <FadeInItem
                  key={`${item.org}-${item.period}`}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    aria-hidden="true"
                    className="absolute left-[19.5px] md:left-[calc(50%-7px)] top-6 w-[14px] h-[14px] rounded-full bg-bg border-2 border-accent z-10 shadow-[0_0_12px_rgb(var(--c-accent)/0.4)]"
                  />

                  {/* Content card */}
                  <article
                    className={`relative w-full md:w-[calc(50%-3rem)] p-6 pl-16 md:pl-6 rounded-card border border-border bg-surface/40 hover:bg-surface/60 transition-colors duration-300 card-glow text-left`}
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 text-accent font-mono text-[10px] uppercase tracking-wider rounded-full">
                        {item.period}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-text-secondary">
                        {item.kind}
                      </span>
                    </div>
                    <h3 className="font-space-grotesk text-xl font-bold text-text-primary mb-1">
                      {item.title}
                    </h3>
                    <div className="text-sm font-semibold text-text-secondary">{item.org}</div>
                    {item.location && (
                      <div className="font-mono text-[11px] text-text-secondary mb-3">
                        {item.location}
                      </div>
                    )}
                    {item.description && (
                      <p className="text-sm text-text-secondary leading-[1.7] mt-3">
                        {item.description}
                      </p>
                    )}
                    <ul className="mt-3 flex flex-col gap-2">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2">
                          <span
                            aria-hidden="true"
                            className="mt-[7px] w-1 h-1 rounded-full bg-accent shrink-0"
                          />
                          <span className="text-[13px] text-text-secondary leading-[1.65]">
                            {h}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {item.link && (
                      <a
                        href={item.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-4 font-mono text-[11px] text-accent hover:text-glow transition-colors"
                      >
                        {item.link.label}
                        <ExternalLinkIcon className="w-3 h-3" />
                      </a>
                    )}
                  </article>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </TimelineFrame>
      </div>
    </section>
  );
}
