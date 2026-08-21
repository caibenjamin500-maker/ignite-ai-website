"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/#problem", label: "The problem" },
  { href: "/#systems", label: "What we build" },
  { href: "/#process", label: "How it works" },
  { href: "/#about", label: "About" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close on Escape and keep focus inside the panel while it is open.
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>("a, button");
    focusables?.[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (e.key !== "Tab" || !focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--bg)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 md:px-8">
        <a
          href="/"
          className="flex shrink-0 items-center gap-2.5 text-[15px] font-semibold tracking-tight"
        >
          <Image
            src="/ignite-logo.jpg"
            alt=""
            width={28}
            height={28}
            className="rounded-sm"
            priority
          />
          <span>Ignite AI</span>
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7 text-[15px]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  /* py-2 keeps the clickable box above the 24px minimum
                     target size rather than just the height of the text */
                  className="inline-block py-2 text-[var(--fg-2)] transition-colors hover:text-[var(--fg)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="/#audit" className="btn btn-primary hidden md:inline-flex">
          Get a free audit
        </a>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius)] text-[var(--fg)] md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="border-t border-[var(--line)] bg-[var(--bg)] md:hidden"
        >
          <nav aria-label="Main" className="mx-auto max-w-6xl px-5 py-3">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-[var(--line)] py-3.5 text-[16px] text-[var(--fg-2)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="/#audit"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-4 w-full"
            >
              Get a free audit
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
