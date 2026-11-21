import { NAV_LINKS, SITE, SOCIAL } from "@/lib/constants";
import BackToTop from "./BackToTop";
import { EmailIcon, GithubIcon, LinkedInIcon } from "./icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="relative border-t border-border/50 bg-bg">
        {/* Top accent line */}
        <div className="h-[1px] accent-line" />

        <div className="max-w-content mx-auto px-6 py-12">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12 border-b border-border/50 pb-12">
            {/* Brand / Bio */}
            <div className="md:col-span-2">
              <h2 className="font-space-grotesk text-xl font-bold text-text-primary mb-4">
                {SITE.name}
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed max-w-sm mb-6">
                Python full-stack developer building reliable backends, thoughtful front ends, and
                open-source tools.
              </p>
              <div className="font-mono text-[10px] text-text-secondary tracking-widest">
                NEXT.JS · TYPESCRIPT · TAILWINDCSS · FRAMER MOTION · THREE.JS
              </div>
            </div>

            {/* Sitemap Navigation */}
            <nav aria-label="Footer navigation">
              <h3 className="font-mono text-[11px] font-medium text-text-primary tracking-widest uppercase mb-5">
                Navigation
              </h3>
              <ul className="space-y-3 text-sm text-text-secondary">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="hover:text-accent transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social / Connect */}
            <div>
              <h3 className="font-mono text-[11px] font-medium text-text-primary tracking-widest uppercase mb-5">
                Connect
              </h3>
              <ul className="space-y-3 text-sm text-text-secondary">
                <li>
                  <a
                    href={SOCIAL.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="flex items-center gap-2 hover:text-accent transition-colors duration-200 group"
                  >
                    <GithubIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>GitHub</span>
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="flex items-center gap-2 hover:text-accent transition-colors duration-200 group"
                  >
                    <LinkedInIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SOCIAL.email}`}
                    aria-label="Send email"
                    className="flex items-center gap-2 hover:text-accent transition-colors duration-200 group"
                  >
                    <EmailIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Email</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-mono text-[11px] text-text-secondary">
              © {year} {SITE.name}
            </span>
            <span className="font-mono text-[11px] text-text-secondary tracking-widest text-center sm:text-right">
              DESIGNED & ENGINEERED WITH PRECISION
            </span>
          </div>
        </div>
      </footer>

      <BackToTop />
    </>
  );
}
