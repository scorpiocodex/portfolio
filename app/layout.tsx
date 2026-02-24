import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const baseUrl = "https://san-shibu.vercel.app";

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
    >
      <body className="bg-bg text-text-primary font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
