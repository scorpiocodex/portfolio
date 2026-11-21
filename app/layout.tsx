import CommandPalette from "@/components/CommandPalette";
import CursorSpotlight from "@/components/CursorSpotlight";
import EasterEgg from "@/components/EasterEgg";
import Providers from "@/components/Providers";
import { KEYWORDS, SITE, SOCIAL } from "@/lib/constants";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  jobTitle: SITE.jobTitle,
  sameAs: [SOCIAL.github.url, SOCIAL.linkedin.url],
  alumniOf: { "@type": "CollegeOrUniversity", name: "Victoria University" },
  knowsAbout: [
    "Python",
    "FastAPI",
    "PostgreSQL",
    "React",
    "LLM Integration",
    "Celery",
    "Docker",
    "Full-Stack Web Development",
  ],
};

const PRE_PAINT_SCRIPT = `(function(){var d=document.documentElement;
try{if(localStorage.getItem('theme')==='deep-ocean')d.setAttribute('data-theme','deep-ocean')}catch(e){}
try{if(!sessionStorage.getItem('intro-seen')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
d.setAttribute('data-intro','playing');setTimeout(function(){d.removeAttribute('data-intro')},4000)}}catch(e){}
})();`;

const NOSCRIPT_CSS =
  '[style*="opacity:0;"],[style$="opacity:0"]{opacity:1!important;transform:none!important}';

/** JSON.stringify output is safe inside a script tag except for "<" (e.g. "</script>"). */
function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

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
  alternates: {
    canonical: "/",
  },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint: applies the saved theme and decides whether the intro
            overlay should play (once per session, never under reduced motion). The timeout is a
            failsafe so a failed script bundle can never leave the intro covering the page. */}
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT_SCRIPT }} />
        <noscript>
          {/* Scroll-reveal sections are server-rendered hidden; without JS nothing would reveal them. */}
          <style>{NOSCRIPT_CSS}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      </head>
      <body className="bg-bg text-text-primary font-inter antialiased overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] bg-surface border border-border px-4 py-2 rounded-lg font-mono text-sm text-accent transition-all"
        >
          Skip to content
        </a>
        <Providers>
          <CursorSpotlight />
          {children}
          <CommandPalette />
          <EasterEgg />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
