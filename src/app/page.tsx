import AuditForm from "@/components/AuditForm";
import { FOUNDING_SLOTS, MONTHLY_BUILD_SLOTS, currentMonth, site } from "@/lib/site";

/**
 * Regenerate hourly. This is what makes the availability line in the hero roll
 * over to the new month on its own, without anyone editing a file.
 */
export const revalidate = 3600;

/**
 * Structured data describing the business to search engines.
 *
 * Every field restates something that is true and visible on the page or on
 * the Google Business Profile — no ratings, no review counts, no staff
 * numbers. Markup that claims more than the page shows is what gets sites
 * penalised, and an invented star rating is exactly the kind of thing Google
 * acts on. The service-area list matches the Business Profile exactly.
 */
const SERVICE_AREA = [
  "Greenville",
  "Greer",
  "Simpsonville",
  "Mauldin",
  "Taylors",
  "Travelers Rest",
  "Fountain Inn",
  "Easley",
  "Spartanburg",
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description:
    "Managed AI reception, lead qualification, and booking systems for service businesses.",
  url: site.url,
  email: site.email,
  telephone: site.phone,
  logo: `${site.url}/icon.png`,
  image: `${site.url}/icon.png`,
  founder: { "@type": "Person", name: site.owner },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Greenville",
    addressRegion: "SC",
    addressCountry: "US",
  },
  areaServed: SERVICE_AREA.map((name) => ({
    "@type": "City",
    name,
    addressRegion: "SC",
  })),
  knowsAbout: [
    "AI receptionist",
    "missed call text back",
    "lead qualification",
    "appointment booking automation",
    "after-hours call answering",
  ],
};

const SYSTEMS = [
  {
    name: "AI reception",
    body: "Calls, texts, and website chats get answered in your company's voice — including the ones that come in at 9pm on a Sunday. Missed calls get a text back automatically, and every conversation is written down.",
    points: [
      "Missed-call text-back",
      "Website chat",
      "After-hours coverage",
    ],
  },
  {
    name: "Lead qualification",
    body: "Not every inquiry deserves your time. The system asks the questions you would have asked, scores each lead against your criteria, and puts the serious ones in front of you with the full context attached.",
    points: [
      "Your qualifying questions",
      "Scoring and routing",
      "Full conversation history",
    ],
  },
  {
    name: "Booking and follow-up",
    body: "Qualified leads book straight onto your calendar. The ones who hesitate go into a follow-up sequence that stays politely persistent for weeks, so fewer deals die of silence.",
    points: [
      "Direct calendar booking",
      "Multi-touch follow-up",
      "CRM sync and monthly reporting",
    ],
  },
];

const PROBLEMS = [
  {
    head: "Calls go to voicemail",
    body: "When the crew is on a job, the phone rings out. Most people who reach a voicemail greeting don't leave a message — they call the next name on their list.",
  },
  {
    head: "Web forms sit overnight",
    body: "An inquiry that arrives at 9pm gets read at 9am, if someone remembers to check. By then whoever replied first has usually already booked the job.",
  },
  {
    head: "Follow-up runs on memory",
    body: "The lead you meant to call back on Thursday is the one you've forgotten by Monday. Nothing is broken, exactly. It just quietly leaks.",
  },
];

const STEPS = [
  {
    n: "01",
    name: "The audit",
    meta: "20 minutes · free",
    body: "We go through how inquiries reach you today and where they stop — calls, forms, chats, after-hours. You leave with a written picture of where things are slipping, whether or not you build anything with us.",
  },
  {
    n: "02",
    name: "The build",
    meta: "Live within days",
    body: "We design the system around how your business actually runs: your services, your service area, the way you talk to customers. You review it working before it ever touches a real caller.",
  },
  {
    n: "03",
    name: "The run",
    meta: "Managed monthly",
    body: "We host it, monitor it, and tune it as your business changes. Each month you get a report of what it handled and what it passed to you.",
  },
];

export default function Home() {
  const month = currentMonth();

  return (
    <>
      <script
        type="application/ld+json"
        // Built above from our own constants, never from user input, so there
        // is nothing here that could carry injected markup.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ── Hero ──────────────────────────────── */}
      <section className="border-b border-[var(--line)] px-5 py-[var(--section-y)] md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">
            Founding clients · {month} {new Date().getFullYear()}
          </p>

          <h1 className="h1 mt-5 max-w-4xl">
            Every missed call is revenue you already earned.
          </h1>

          <p className="lede prose-measure mt-6">
            Ignite AI builds and runs the front office for service businesses in
            the Upstate — answering, qualifying, and booking your inbound leads
            around the clock, so nothing slips through while your crew does the
            actual work.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-4">
            <a href={site.phoneHref} className="btn btn-primary">
              Call {site.phone}
            </a>
            <a href="#audit" className="btn btn-secondary">
              Get a free audit
            </a>
          </div>

          <p className="prose-measure mt-4 text-[15px] text-[var(--fg-2)]">
            That number is answered by one of our systems, not by a person.
            Ask it whatever a customer of yours would ask —{" "}
            <a href="/demo" className="link">
              here is what to try
            </a>
            .
          </p>

          {FOUNDING_SLOTS > 0 && (
            <p className="prose-measure mt-8 border-t border-[var(--line)] pt-6 text-[15px] text-[var(--fg-2)]">
              <span className="font-semibold text-[var(--fg)]">
                Our first {FOUNDING_SLOTS} clients get the build free.
              </span>{" "}
              We are new, and we would rather earn the case study than charge
              for it. No setup fee, {"\u0024"}1,000 a month once it is live, and you
              can walk at any point in the first ninety days.
            </p>
          )}
        </div>
      </section>

      {/* ── The problem ───────────────────────── */}
      <section
        id="problem"
        aria-labelledby="problem-heading"
        className="border-b border-[var(--line)] px-5 py-[var(--section-y)] md:px-8"
      >
        <div className="mx-auto max-w-6xl">
            <p className="eyebrow">The problem</p>
            <h2 id="problem-heading" className="h2 mt-4 max-w-2xl">
              Your phone rings while your crew is on a roof.
            </h2>
            <p className="prose-measure mt-5 text-[var(--fg-2)]">
              Nobody loses leads on purpose. They leak out through three gaps
              that every busy service business has, and that nobody has time to
              stand over all day.
            </p>

            <dl className="mt-12 grid gap-x-10 gap-y-9 md:grid-cols-3">
              {PROBLEMS.map((p) => (
                <div key={p.head} className="border-t border-[var(--line)] pt-5">
                  <dt className="h3">{p.head}</dt>
                  <dd className="mt-2.5 text-[15px] leading-relaxed text-[var(--fg-2)]">
                    {p.body}
                  </dd>
                </div>
              ))}
            </dl>
        </div>
      </section>

      {/* ── What we build ─────────────────────── */}
      <section
        id="systems"
        aria-labelledby="systems-heading"
        className="border-b border-[var(--line)] px-5 py-[var(--section-y)] md:px-8"
      >
        <div className="mx-auto max-w-6xl">
            <p className="eyebrow">What we build</p>
            <h2 id="systems-heading" className="h2 mt-4 max-w-2xl">
              One front office, fully managed.
            </h2>
            <p className="prose-measure mt-5 text-[var(--fg-2)]">
              Each system is built for your business, installed in days, and run
              by us month after month. You never have to touch the machinery.
            </p>

            <ul className="mt-12 grid gap-5 md:grid-cols-3">
              {SYSTEMS.map((s) => (
                <li key={s.name} className="card flex flex-col">
                  <h3 className="h3">{s.name}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[var(--fg-2)]">
                    {s.body}
                  </p>
                  <ul className="mt-6 space-y-2 border-t border-[var(--line)] pt-5 text-[14px] text-[var(--fg-3)]">
                    {s.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
        </div>
      </section>

      {/* ── How it works ──────────────────────── */}
      <section
        id="process"
        aria-labelledby="process-heading"
        className="border-b border-[var(--line)] px-5 py-[var(--section-y)] md:px-8"
      >
        <div className="mx-auto max-w-6xl">
            <p className="eyebrow">How it works</p>
            <h2 id="process-heading" className="h2 mt-4 max-w-2xl">
              Three steps, and no homework for you.
            </h2>

            <ol className="mt-12 grid gap-x-10 gap-y-9 md:grid-cols-3">
              {STEPS.map((s) => (
                <li key={s.n} className="border-t border-[var(--line)] pt-5">
                  <p className="text-[13px] font-semibold tabular-nums text-[var(--fg-3)]">
                    {s.n}
                  </p>
                  <h3 className="h3 mt-3">{s.name}</h3>
                  <p className="mt-1 text-[14px] text-[var(--fg-3)]">{s.meta}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--fg-2)]">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-12 border-t border-[var(--line)] pt-6">
              <h3 className="h3">The 30-day guarantee</h3>
              <p className="prose-measure mt-3 text-[15px] leading-relaxed text-[var(--fg-2)]">
                We agree on what &ldquo;working&rdquo; means for your build
                before we start, in writing. If your system hasn&apos;t hit that
                mark thirty days after it goes live, we refund your setup fee.
                The specific terms and what the refund covers are set out in our{" "}
                <a href="/terms" className="link">
                  Terms of Service
                </a>
                .
              </p>
            </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────── */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="border-b border-[var(--line)] px-5 py-[var(--section-y)] md:px-8"
      >
        <div className="mx-auto max-w-6xl">
            <p className="eyebrow">About</p>
            <h2 id="about-heading" className="h2 mt-4 max-w-2xl">
              Local enough to shake your hand.
            </h2>
            <div className="prose-measure mt-5 space-y-4 text-[var(--fg-2)]">
              <p>
                Ignite AI is run by {site.owner} out of {site.location}. There
                is no offshore team and no ticket queue — when you call, you get
                the person who built your system.
              </p>
              <p>
                We work with a small number of Upstate service businesses at a
                time, on purpose. Every build is designed, installed, and managed
                personally, which is why new projects are capped at{" "}
                {MONTHLY_BUILD_SLOTS} a month.
              </p>
            </div>
        </div>
      </section>

      {/* ── Free audit ────────────────────────── */}
      <section
        id="audit"
        aria-labelledby="audit-heading"
        className="px-5 py-[var(--section-y)] md:px-8"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">Free audit</p>
            <h2 id="audit-heading" className="h2 mt-4">
              Find out what&apos;s slipping through.
            </h2>
            <p className="prose-measure mt-5 text-[var(--fg-2)]">
              Twenty minutes on a call. We map how inquiries reach you today and
              where they stop, and you get that written up whether or not you
              work with us.
            </p>
            <ul className="mt-7 space-y-3 text-[15px] text-[var(--fg-2)]">
              {[
                "Where your inbound leads are dropping today",
                "The three gaps worth fixing first",
                "A plan you can act on, with us or without us",
              ].map((t) => (
                <li
                  key={t}
                  className="border-t border-[var(--line)] pt-3 first:border-t-0 first:pt-0"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <AuditForm />
        </div>
      </section>
    </>
  );
}
