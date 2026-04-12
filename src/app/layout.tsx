import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ignite AI — Custom AI Automation for Your Business",
  description:
    "Ignite AI builds custom AI automation solutions that eliminate repetitive tasks, streamline your operations, and free your team to do what matters most. Every solution is uniquely tailored to your business.",
  keywords: "AI automation, business automation, workflow automation, custom AI, AI agents, process automation",
  openGraph: {
    title: "Ignite AI — Custom AI Automation for Your Business",
    description:
      "We build the AI that works for you. Custom-tailored automation solutions that eliminate repetitive tasks and ignite your business growth.",
    type: "website",
    siteName: "Ignite AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ignite AI — Custom AI Automation",
    description: "Custom-tailored AI automation solutions that eliminate repetitive tasks and ignite your business growth.",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
