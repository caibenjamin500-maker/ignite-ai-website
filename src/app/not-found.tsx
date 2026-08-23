import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="px-5 py-[var(--section-y)] md:px-8">
      <div className="mx-auto max-w-[68ch]">
        <p className="eyebrow">Error 404</p>
        <h1 className="h1 mt-4">This page doesn&apos;t exist.</h1>
        <p className="lede prose-measure mt-5">
          The link may be out of date, or the address may have a typo in it.
          Everything on this site lives on the homepage.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
          <a href="/" className="btn btn-primary">
            Go to the homepage
          </a>
          <a href="/#audit" className="link link-block text-[15px]">
            Request a free audit
          </a>
        </div>
      </div>
    </section>
  );
}
