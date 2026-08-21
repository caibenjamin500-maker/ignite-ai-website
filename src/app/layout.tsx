import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { site } from "@/lib/site";

/**
 * Inter, served from this origin.
 *
 * The font file lives in the repo rather than being fetched from Google Fonts,
 * so page load makes no third-party request, the build does not depend on an
 * external service, and no visitor IP is handed to anyone by loading the page.
 * One variable file covers every weight the site uses.
 */
const inter = localFont({
  src: "./fonts/inter-latin-variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ignite AI — managed AI front office for service businesses",
    template: "%s — Ignite AI",
  },
  description:
    "Ignite AI builds and runs AI reception, lead qualification, and booking for service businesses in Greenville, South Carolina, so every call, chat, and after-hours inquiry gets answered.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ignite AI — managed AI front office for service businesses",
    description:
      "Answering, qualifying, and booking your inbound leads around the clock. Built and managed in Greenville, South Carolina.",
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Ignite AI — managed AI front office",
    description:
      "AI reception, lead qualification, and booking, built and managed for growing service businesses.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
