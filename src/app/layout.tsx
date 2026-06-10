import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ignite AI — Managed AI Front Office for Service Businesses",
  description:
    "Ignite AI builds and manages AI reception, lead qualification, and booking systems for growing service businesses — so every call, chat, and after-hours inquiry gets answered. Based in Greenville, SC.",
  keywords:
    "AI receptionist, missed call text back, lead qualification, appointment booking automation, AI front office, Greenville SC",
  openGraph: {
    title: "Ignite AI — Managed AI Front Office for Service Businesses",
    description:
      "Every missed call is revenue you already earned. Ignite AI answers, qualifies, and books your leads 24/7 — built and managed in Greenville, SC.",
    type: "website",
    siteName: "Ignite AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ignite AI — Managed AI Front Office",
    description:
      "AI reception, lead qualification, and booking — built and managed for growing service businesses.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
