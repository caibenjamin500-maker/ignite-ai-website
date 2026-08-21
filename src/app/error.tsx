"use client";

import { useEffect } from "react";
import { site } from "@/lib/site";

/**
 * Shown if a page throws while rendering. Gives the visitor something to do
 * rather than a blank screen, and always leaves a way to reach us.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the digest only. The message can contain request detail we would
    // rather not write into logs.
    console.error(`[render error] digest: ${error.digest ?? "none"}`);
  }, [error]);

  return (
    <section className="px-5 py-[var(--section-y)] md:px-8">
      <div className="mx-auto max-w-[68ch]">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="h1 mt-4">This page didn&apos;t load properly.</h1>
        <p className="lede prose-measure mt-5">
          Sorry about that — the problem is on our end, not yours. Try loading
          it again, and if it keeps happening please email us so we can look
          into it.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
          <button type="button" onClick={reset} className="btn btn-primary">
            Try again
          </button>
          <a href={`mailto:${site.email}`} className="link link-block text-[15px]">
            Email {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
