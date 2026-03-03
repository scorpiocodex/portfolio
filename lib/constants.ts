/* ─── Site-wide constants ─────────────────────────────────────────────── */

export const SITE = {
    name: "San Shibu",
    title: "San Shibu — Full-Stack Developer | IT Professional",
    description:
        "San Shibu is an IT graduate from Victoria University building full-stack web applications, developer tooling, and automation systems using React, Node.js, and Python.",
    url: "https://san-shibu.vercel.app",
    locale: "en_US",
} as const;

export const SOCIAL = {
    github: {
        username: "scorpiocodex",
        url: "https://github.com/scorpiocodex",
        avatarUrl: "https://avatars.githubusercontent.com/u/212041449?v=4",
    },
    linkedin: {
        name: "San Shibu",
        url: "https://www.linkedin.com/in/san-shibu-8250a9178/",
    },
    email: "sanshibu2@gmail.com",
    phone: "+91 9605770221",
    phoneHref: "tel:+919605770221",
    twitter: "@sanshibu2",
    location: "Ernakulam, Kerala, India",
} as const;

export const RESUME = {
    href: "/Resume.pdf",
    downloadName: "San_Shibu_Resume.pdf",
} as const;

export const NAV_LINKS = [
    { label: "About", href: "#about", id: "about" },
    { label: "Philosophy", href: "#philosophy", id: "philosophy" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "GitHub", href: "#github", id: "github" },
    { label: "Contact", href: "#contact", id: "contact" },
] as const;

export const KEYWORDS = [
    "Full-stack developer",
    "React developer",
    "Node.js",
    "Python developer",
    "IT professional",
    "web developer",
    "Watchflow",
    "scorpiocodex",
    "Scaler Academy",
    "San Shibu",
    "Kerala developer",
] as const;
