import Image from "next/image";
import { site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] px-5 py-12 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/ignite-logo.jpg"
                alt=""
                width={28}
                height={28}
                className="rounded-sm"
              />
              <span className="text-[15px] font-semibold tracking-tight">
                {site.name}
              </span>
            </div>
            <p className="mt-3 text-[14px] text-[var(--fg-3)]">
              {site.location}
            </p>
            <p className="mt-1 text-[14px]">
              <a href={site.phoneHref} className="link link-block">
                {site.phone}
              </a>
            </p>
            <p className="text-[14px]">
              <a href={`mailto:${site.email}`} className="link link-block">
                {site.email}
              </a>
            </p>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <nav aria-labelledby="footer-site-heading">
              <h2
                id="footer-site-heading"
                className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--fg-3)]"
              >
                Site
              </h2>
              <ul className="mt-3 space-y-2.5 text-[14px]">
                <li>
                  <a href="/demo" className="link link-block">
                    Free demo
                  </a>
                </li>
                <li>
                  <a href="/#problem" className="link link-block">
                    The problem
                  </a>
                </li>
                <li>
                  <a href="/#systems" className="link link-block">
                    What we build
                  </a>
                </li>
                <li>
                  <a href="/#process" className="link link-block">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="/#audit" className="link link-block">
                    Free audit
                  </a>
                </li>
              </ul>
            </nav>

            <nav aria-labelledby="footer-legal-heading">
              <h2
                id="footer-legal-heading"
                className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--fg-3)]"
              >
                Legal
              </h2>
              <ul className="mt-3 space-y-2.5 text-[14px]">
                <li>
                  <a href="/privacy" className="link link-block">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="link link-block">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <p className="mt-12 border-t border-[var(--line)] pt-6 text-[13px] text-[var(--fg-3)]">
          © {new Date().getFullYear()} {site.name} — {site.legalStructure}.
        </p>
      </div>
    </footer>
  );
}
