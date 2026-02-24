"use client";

import { FadeIn, FadeInStagger, FadeInItem } from "./FadeIn";
import { GithubIcon, LinkedInIcon, LocationIcon, EmailIcon, ExternalLinkIcon, PhoneIcon, DownloadIcon } from "./icons";

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "sanshibu2@gmail.com",
    href: "mailto:sanshibu2@gmail.com",
    icon: <EmailIcon className="w-4 h-4" />,
    color: "#58A6FF",
    external: false,
  },
  {
    label: "GitHub",
    value: "scorpiocodex",
    href: "https://github.com/scorpiocodex",
    icon: <GithubIcon className="w-4 h-4" />,
    color: "#E6EDF3",
    external: true,
  },
  {
    label: "LinkedIn",
    value: "San Shibu",
    href: "https://www.linkedin.com/in/san-shibu-8250a9178/",
    icon: <LinkedInIcon className="w-4 h-4" />,
    color: "#0A66C2",
    external: true,
  },
  {
    label: "Phone",
    value: "+91 9605770221",
    href: "tel:+919605770221",
    icon: <PhoneIcon className="w-4 h-4" />,
    color: "#3FB950",
    external: false,
  },
  {
    label: "Location",
    value: "Ernakulam, Kerala, India",
    href: null,
    icon: <LocationIcon className="w-4 h-4" />,
    color: "#8B949E",
    external: false,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="max-w-content mx-auto px-6">

        {/* Header */}
        <FadeIn className="mb-16">
          <span className="font-mono text-[11px] text-text-secondary tracking-[0.18em] uppercase block mb-3">
            07 — Contact
          </span>
          <h2 className="font-space-grotesk text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
            Get in Touch
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">

          {/* Left: CTA + message */}
          <FadeIn delay={0.05}>
            <div className="max-w-lg">
              <p className="font-space-grotesk text-2xl lg:text-3xl font-semibold text-text-primary leading-[1.2] mb-5">
                Let&apos;s build something great together.
              </p>
              <p className="text-text-secondary text-base leading-[1.75] mb-8">
                Available for engineering roles, internships, and open source
                collaboration. If you&apos;re working on web applications, developer
                tooling, or interesting IT projects — let&apos;s connect.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:sanshibu2@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg text-sm font-semibold rounded-card hover:bg-glow transition-colors duration-200 font-inter"
                >
                  <EmailIcon className="w-4 h-4" />
                  Send a message
                </a>
                <a
                  href="/Resume.pdf"
                  download="San_Shibu_Resume.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text-primary text-sm font-medium rounded-card hover:border-accent hover:text-accent transition-all duration-200 font-inter"
                >
                  <DownloadIcon className="w-4 h-4" />
                  Resume
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Right: Contact links */}
          <FadeInStagger staggerDelay={0.08}>
            <div className="flex flex-col gap-3">
              {CONTACT_LINKS.map((link) => (
                <FadeInItem key={link.label}>
                  {link.href ? (
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 p-4 rounded-card border border-border bg-surface/40 card-glow transition-all duration-200"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${link.color}15`, color: link.color }}
                      >
                        {link.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-[10px] text-text-secondary uppercase tracking-widest mb-0.5">
                          {link.label}
                        </div>
                        <div
                          className="text-sm font-medium truncate"
                          style={{ color: link.color }}
                        >
                          {link.value}
                        </div>
                      </div>
                      {link.external && (
                        <ExternalLinkIcon className="w-3.5 h-3.5 text-text-secondary/40 group-hover:text-text-secondary transition-colors shrink-0" />
                      )}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-card border border-border bg-surface/40">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${link.color}15`, color: link.color }}
                      >
                        {link.icon}
                      </div>
                      <div>
                        <div className="font-mono text-[10px] text-text-secondary uppercase tracking-widest mb-0.5">
                          {link.label}
                        </div>
                        <div
                          className="text-sm font-medium"
                          style={{ color: link.color }}
                        >
                          {link.value}
                        </div>
                      </div>
                    </div>
                  )}
                </FadeInItem>
              ))}
            </div>
          </FadeInStagger>
        </div>
      </div>
    </section>
  );
}
