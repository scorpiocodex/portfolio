import CommandPalette from "@/components/CommandPalette";
import CursorSpotlight from "@/components/CursorSpotlight";
import EasterEgg from "@/components/EasterEgg";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const baseUrl = "https://san-shibu.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "San Shibu",
  url: baseUrl,
  jobTitle: "Full-Stack Developer",
  sameAs: [
    "https://github.com/scorpiocodex",
    "https://linkedin.com/in/sanshibu"
  ],
  knowsAbout: [
    "Software Engineering",
    "Full-Stack Web Development",
    "System Architecture",
    "React",
    "Next.js",
    "Python",
    "Node.js",
  ]
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "San Shibu — Full-Stack Developer | IT Professional",
  description:
    "San Shibu is an IT graduate from Victoria University building full-stack web applications, developer tooling, and automation systems using React, Node.js, and Python.",
  keywords: [
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
  ],
  authors: [{ name: "San Shibu", url: "https://github.com/scorpiocodex" }],
  creator: "San Shibu",
  openGraph: {
    title: "San Shibu — Full-Stack Developer | IT Professional",
    description:
      "San Shibu is an IT graduate from Victoria University building full-stack web applications, developer tooling, and automation systems using React, Node.js, and Python.",
    url: baseUrl,
    siteName: "San Shibu — Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "San Shibu — Full-Stack Developer | IT Professional",
    description:
      "San Shibu is an IT graduate from Victoria University building full-stack web applications, developer tooling, and automation systems using React, Node.js, and Python.",
    creator: "@sanshibu2",
    site: "@sanshibu2",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'deep-ocean') {
                  document.documentElement.setAttribute('data-theme', 'deep-ocean');
                }
              } catch (e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg text-text-primary font-inter antialiased overflow-x-hidden">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] bg-surface border border-border px-4 py-2 rounded-lg font-mono text-sm text-accent transition-all">
          Skip to content
        </a>
        <CursorSpotlight />
        {children}
        <CommandPalette />
        <EasterEgg />
      </body>
    </html>
  );
}
