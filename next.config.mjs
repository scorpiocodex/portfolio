/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content-Security-Policy.
 * 'unsafe-inline' for scripts covers Next.js's hydration bootstrap and the two
 * inline <script> blocks in app/layout.tsx (theme + JSON-LD); for styles it
 * covers Framer Motion's inline style attributes. In dev we additionally allow
 * 'unsafe-eval' + ws: so React Fast Refresh / HMR keep working.
 */
const csp = [
  "default-src 'self'",
  // Dev additionally allows Vercel Analytics' debug script host; in production
  // (deployed on Vercel) analytics is served same-origin under /_vercel/.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://avatars.githubusercontent.com",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  // three.js / R3F may spin up web workers from blob URLs.
  "worker-src 'self' blob:",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Modern guidance: disable the legacy XSS auditor rather than enabling it.
  { key: "X-XSS-Protection", value: "0" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]),
];

const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
