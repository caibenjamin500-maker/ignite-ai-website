/**
 * Content Security Policy.
 *
 * `'unsafe-inline'` is present for scripts and styles because the Next.js App
 * Router ships an inline bootstrap script and inline style tags on every page.
 * Removing it means moving to a nonce-based CSP via middleware — worth doing if
 * this site ever handles anything sensitive, but overkill for a marketing page
 * with a single contact form.
 *
 * Everything else is locked to this origin. If you later enable Vercel Web
 * Analytics, it will be blocked until you add `https://va.vercel-scripts.com`
 * to script-src and `https://vitals.vercel-insights.com` to connect-src.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Only ever reach this site over HTTPS.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
