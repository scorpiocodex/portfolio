import CommandPalette from "@/components/CommandPalette";
import CursorSpotlight from "@/components/CursorSpotlight";
import EasterEgg from "@/components/EasterEgg";
import { KEYWORDS, SITE, SOCIAL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  jobTitle: "Full-Stack Developer",
  sameAs: [SOCIAL.github.url, SOCIAL.linkedin.url],
  knowsAbout: [
    "Software Engineering",
    "Full-Stack Web Development",
    "System Architecture",
    "React",
    "Next.js",
    "Python",
    "Node.js",
  ],
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
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  keywords: [...KEYWORDS],
  authors: [{ name: SITE.name, url: SOCIAL.github.url }],
  creator: SITE.name,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: `${SITE.name} — Portfolio`,
    type: "website",
    locale: SITE.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    creator: SOCIAL.twitter,
    site: SOCIAL.twitter,
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
        {/* Preconnect to external origins */}
        <link rel="preconnect" href="https://api.github.com" />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <link rel="dns-prefetch" href="https://avatars.githubusercontent.com" />

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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] bg-surface border border-border px-4 py-2 rounded-lg font-mono text-sm text-accent transition-all"
        >
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
