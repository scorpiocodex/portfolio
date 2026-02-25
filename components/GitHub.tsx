import { ContributionWeek, GitHubData } from "@/lib/github";
import { FadeIn, FadeInItem, FadeInStagger } from "./FadeIn";
import { ExternalLinkIcon, GithubIcon, StarIcon } from "./icons";

export default function GitHub({ data }: { data: GitHubData }) {
  const { user, repos, contributions } = data;

  return (
    <section id="github" className="py-24 lg:py-32">
      <div className="max-w-content mx-auto px-6">

        {/* Header */}
        <FadeIn className="mb-16">
          <span className="font-mono text-[11px] text-text-secondary tracking-[0.18em] uppercase block mb-3">
            06 — Open Source
          </span>
          <h2 className="font-space-grotesk text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
            On GitHub
          </h2>
        </FadeIn>

        {/* Profile row */}
        <FadeIn delay={0.05} className="mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 rounded-card border border-border bg-surface/40 max-w-md">
            <div className="w-12 h-12 rounded-full bg-surface-2 border border-border flex items-center justify-center shrink-0 overflow-hidden">
              {user.avatarUrl ? (
                // Using standard img tag instead of next/image here since GitHub hosts the images
                <img src={user.avatarUrl} alt={user.login} className="w-full h-full object-cover" />
              ) : (
                <GithubIcon className="w-6 h-6 text-text-secondary" />
              )}
            </div>
            <div>
              <div className="font-space-grotesk text-base font-semibold text-text-primary">
                {user.name}
              </div>
              <a
                href={user.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] text-accent hover:text-glow transition-colors flex items-center gap-1 mt-0.5"
              >
                @{user.login}
                <ExternalLinkIcon className="w-3 h-3" />
              </a>
            </div>
            <a
              href={user.url}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:ml-auto flex items-center gap-2 text-[11px] font-mono text-text-secondary border border-border px-3 py-1.5 rounded-lg hover:border-accent hover:text-accent transition-all duration-200 shrink-0 w-full sm:w-auto justify-center sm:justify-start"
            >
              View Profile
              <ExternalLinkIcon className="w-3 h-3" />
            </a>
          </div>
        </FadeIn>

        {/* Pinned repos label */}
        <FadeIn delay={0.08} className="mb-4">
          <span className="font-mono text-[11px] text-text-secondary tracking-widest uppercase">
            Pinned Repositories
          </span>
        </FadeIn>

        {/* Repo cards */}
        <FadeInStagger staggerDelay={0.08}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {repos.map((repo) => (
              <FadeInItem key={repo.name}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col p-5 h-full rounded-card border border-border bg-surface/40 card-glow hover:border-[var(--r-accent)]/40 transition-all duration-300"
                  style={{ "--r-accent": repo.accent } as React.CSSProperties}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <GithubIcon className="w-4 h-4 text-text-secondary" />
                      <span
                        className="font-mono text-sm font-medium group-hover:underline"
                        style={{ color: repo.accent }}
                      >
                        {repo.name}
                      </span>
                    </div>
                    <ExternalLinkIcon className="w-3.5 h-3.5 text-text-secondary/40 group-hover:text-text-secondary transition-colors" />
                  </div>

                  <p className="text-[12px] text-text-secondary leading-[1.6] flex-1 mb-4">
                    {repo.description}
                  </p>

                  <div className="flex items-center gap-3 mt-auto">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: repo.langColor }}
                      />
                      <span className="font-mono text-[11px] text-text-secondary">
                        {repo.language}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-text-secondary/60">
                      <StarIcon className="w-3 h-3" />
                      <span className="font-mono text-[10px]">{repo.stars}</span>
                    </div>
                  </div>
                </a>
              </FadeInItem>
            ))}
          </div>
        </FadeInStagger>

        {/* Contribution graph */}
        <FadeIn delay={0.1} className="mt-8">
          <div className="p-5 rounded-card border border-border bg-surface/30">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] text-text-secondary tracking-widest uppercase">
                Contribution Activity (Half Year)
              </span>
              <a
                href={user.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-accent hover:text-glow transition-colors"
              >
                View full graph
              </a>
            </div>

            <div className="overflow-x-auto pb-1">
              <ContributionGrid weeks={contributions} />
            </div>

            <div className="flex items-center gap-2 mt-4 justify-end">
              <span className="font-mono text-[10px] text-text-secondary/50">Less</span>
              {["#161B22", "#0E4429", "#006D32", "#26A641", "#39D353"].map((c) => (
                <div key={c} className="w-3 h-3 rounded-sm" style={{ backgroundColor: c }} />
              ))}
              <span className="font-mono text-[10px] text-text-secondary/50">More</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ContributionGrid({ weeks }: { weeks: ContributionWeek[] }) {
  return (
    <div className="flex gap-[3px]">
      {weeks.map((week, weekIdx) => (
        <div key={weekIdx} className="flex flex-col gap-[3px]">
          {week.contributionDays.map((day, dayIdx) => {
            // Use GitHub's standard colors or the fallback colors from the payload
            const bgColor = day.color === "#ebedf0" ? "#161b22" : day.color;
            return (
              <div
                key={dayIdx}
                className="w-[10px] h-[10px] rounded-[2px]"
                style={{ backgroundColor: bgColor }}
                title={`${day.contributionCount} contributions on ${day.date || "unknown date"}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
