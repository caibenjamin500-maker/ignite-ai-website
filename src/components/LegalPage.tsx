import { site } from "@/lib/site";

/**
 * Shared shell for /privacy and /terms so both pages use the same measure,
 * heading rhythm, and spacing as the rest of the site.
 */
export default function LegalPage({
  title,
  summary,
  children,
}: {
  title: string;
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <article className="px-5 py-[var(--section-y)] md:px-8">
      <div className="mx-auto max-w-[68ch]">
        <h1 className="h1">{title}</h1>
        <p className="lede mt-5">{summary}</p>
        <p className="mt-5 text-[14px] text-[var(--fg-3)]">
          Last updated {site.legalUpdated}
        </p>

        <div className="legal mt-12">{children}</div>

        <p className="mt-14 border-t border-[var(--line)] pt-6 text-[15px] text-[var(--fg-2)]">
          Questions about this page? Email{" "}
          <a href={`mailto:${site.email}`} className="link">
            {site.email}
          </a>
          .
        </p>
      </div>
    </article>
  );
}
