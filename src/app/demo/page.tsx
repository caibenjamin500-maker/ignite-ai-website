import type { Metadata } from "next";
import { FOUNDING_SLOTS, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Instant free demo — call and hear it answer",
  description:
    "Call (864) 702-2295 and talk to one of our AI receptionists. No form, no signup, no sales call. Hang up whenever you like.",
  alternates: { canonical: "/demo" },
  openGraph: {
    title: "Hear it answer the phone — Ignite AI",
    description:
      "One number. A working AI receptionist picks up. No form, no signup.",
    url: `${site.url}/demo`,
    type: "website",
  },
};

/**
 * The demo page exists to do exactly one thing: get a phone dialled. Every
 * element on it either helps that happen or is not here. There is no form,
 * because a form is a second thing to decide about.
 */

const TRY_THESE = [
  {
    prompt: "“How much do you charge?”",
    why: "The question every real caller opens with. Watch it handle a price question without either dodging or inventing a number.",
  },
  {
    prompt: "“Can you get me on a call Thursday morning?”",
    why: "This is the one that matters. Rio should book that call with you while you are still on the phone, rather than promising that somebody will get back to you.",
  },
  {
    prompt: "“Am I talking to a real person?”",
    why: "It will tell you it is not. Ask it anyway — you should know how it answers that before you ever put it in front of your own customers.",
  },
  {
    prompt: "Something off-script entirely",
    why: "Ask about a job it cannot possibly know, or talk over it. Finding the edges is the point. If it handles your worst caller, it handles your Tuesday.",
  },
];

export default function Demo() {
  return (
    <>
      {/* ── The number ────────────────────────── */}
      <section className="border-b border-[var(--line)] px-5 py-[var(--section-y)] md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">Instant free demo</p>

          <h1 className="h1 mt-5 max-w-3xl">
            Call this number. A machine answers.
          </h1>

          <p className="lede prose-measure mt-6">
            This is not a recording and not a video. It is Rio — the system that
            answers our own phone — running live, waiting for a call. There is
            no form to fill in and nobody will ring you back unless you ask.
          </p>

          <div className="mt-10">
            <a href={site.phoneHref} className="demo-number">
              {site.phone}
            </a>
            <p className="mt-4 text-[15px] text-[var(--fg-3)]">
              Tap to call, or dial it from a landline. Your usual call charges
              apply — we don&apos;t charge anything.
            </p>
          </div>
        </div>
      </section>

      {/* ── What to ask it ────────────────────── */}
      <section
        aria-labelledby="try-heading"
        className="border-b border-[var(--line)] px-5 py-[var(--section-y)] md:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">Try these</p>
          <h2 id="try-heading" className="h2 mt-4 max-w-2xl">
            Talk to it the way your customers do.
          </h2>
          <p className="prose-measure mt-5 text-[var(--fg-2)]">
            Most people are too polite to a machine and come away unconvinced.
            Be the real caller instead — that is the only test worth running.
          </p>

          <dl className="mt-12 grid gap-x-10 gap-y-9 md:grid-cols-2">
            {TRY_THESE.map((t) => (
              <div key={t.prompt} className="border-t border-[var(--line)] pt-5">
                <dt className="h3">{t.prompt}</dt>
                <dd className="mt-2.5 text-[15px] leading-relaxed text-[var(--fg-2)]">
                  {t.why}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Straight answers ──────────────────── */}
      <section
        aria-labelledby="honest-heading"
        className="border-b border-[var(--line)] px-5 py-[var(--section-y)] md:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">Before you call</p>
          <h2 id="honest-heading" className="h2 mt-4 max-w-2xl">
            The things you&apos;d rather know up front.
          </h2>

          <dl className="prose-measure mt-10 space-y-7">
            <div>
              <dt className="h3">It is an AI, and it will say so.</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-[var(--fg-2)]">
                We don&apos;t build systems that pretend to be people. Ask it
                directly and it will tell you what it is. We think a business
                that hides that is storing up a problem with its own customers.
              </dd>
            </div>

            <div>
              <dt className="h3">The call is recorded and transcribed.</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-[var(--fg-2)]">
                That is how the system works, and it is how we improve it. By
                calling, you&apos;re agreeing to that. We keep demo calls for
                thirty days and then delete them. Email us at{" "}
                <a href={`mailto:${site.email}`} className="link">
                  {site.email}
                </a>{" "}
                and we&apos;ll delete yours sooner. Full detail is in our{" "}
                <a href="/privacy" className="link">
                  Privacy Policy
                </a>
                .
              </dd>
            </div>

            <div>
              <dt className="h3">Nobody will chase you.</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-[var(--fg-2)]">
                Calling this number does not put you on a list. If you want to
                talk to a human afterwards you have to ask — either on the call
                or through the audit form. Otherwise that is the end of it.
              </dd>
            </div>

            <div>
              <dt className="h3">Rio answers for us, not for you.</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-[var(--fg-2)]">
                Rio is our receptionist, so it books calls — nobody is coming
                out to a job. Yours would be trained on your services, your
                pricing, your area, and the way you talk to your own customers,
                and it would book whatever you actually sell. Judge the
                handling, not the specifics.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── After the call ────────────────────── */}
      <section
        aria-labelledby="next-heading"
        className="px-5 py-[var(--section-y)] md:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">If you liked it</p>
          <h2 id="next-heading" className="h2 mt-4 max-w-2xl">
            One built for your business.
          </h2>

          {FOUNDING_SLOTS > 0 && (
            <p className="prose-measure mt-5 text-[var(--fg-2)]">
              <span className="font-semibold text-[var(--fg)]">
                Our first {FOUNDING_SLOTS} clients get the build free.
              </span>{" "}
              We are new, and we would rather earn the case study than charge
              for it. What it costs to run after that depends on what we build
              you — every system is priced to the business it is built for, so
              you get your number in writing after the audit, before any work
              starts.
            </p>
          )}

          <p className="prose-measure mt-4 text-[var(--fg-2)]">
            The next step is a twenty-minute call about how enquiries reach you
            today and where they stop. You get that written up either way.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-4">
            <a href="/#audit" className="btn btn-primary">
              Get a free audit
            </a>
            <a href={site.phoneHref} className="btn btn-secondary">
              Call {site.phone} again
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
