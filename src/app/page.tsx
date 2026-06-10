"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────
// Reveal-on-scroll
// ─────────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Pointer-tracked glass card
// ─────────────────────────────────────────────────────────────

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  return (
    <div ref={ref} onMouseMove={onMove} className={`glass glass-card ${className}`}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Icons (inline SVG — stroke style, no emoji)
// ─────────────────────────────────────────────────────────────

const icon = {
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  ),
  filter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M3 4h18l-7 8.5V19l-4 2v-8.5L3 4Z" />
    </svg>
  ),
  workflow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
      <path d="M10 6.5h4a3 3 0 0 1 3 3V14M6.5 10v4a3 3 0 0 0 3 3H14" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  ),
  build: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M14.7 6.3a4.5 4.5 0 0 0-6.07 5.32L3 17.25V21h3.75l5.63-5.63A4.5 4.5 0 0 0 17.7 9.3l-2.62 2.62-2.12-.88-.88-2.12L14.7 6.3Z" />
    </svg>
  ),
  run: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 2 4 5.5v5.06c0 5.05 3.41 9.76 8 10.94 4.59-1.18 8-5.89 8-10.94V5.5L12 2Z" />
      <path d="m9 12 2 2 4-4.5" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  ),
};

// ─────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`glass flex w-full max-w-5xl items-center justify-between gap-6 !rounded-full px-5 py-3 transition-all duration-500 ${
          scrolled ? "shadow-2xl" : "!border-transparent !bg-transparent !shadow-none !backdrop-blur-none [&::before]:opacity-0"
        }`}
      >
        <a href="#top" className="flex items-center gap-3">
          <Image
            src="/ignite-logo.jpg"
            alt="Ignite AI"
            width={36}
            height={36}
            className="rounded-full"
            priority
          />
          <span className="text-[15px] font-semibold tracking-wide">
            IGNITE&nbsp;AI
          </span>
        </a>

        <div className="hidden items-center gap-8 text-[14px] text-white/60 md:flex">
          <a href="#systems" className="transition hover:text-white">Systems</a>
          <a href="#process" className="transition hover:text-white">Process</a>
          <a href="#about" className="transition hover:text-white">About</a>
        </div>

        <a
          href="#audit"
          className="btn-primary !px-6 !py-2.5 !text-[13.5px]"
        >
          Free AI Audit
        </a>
      </nav>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pb-28 pt-44 md:pt-52">
      <div className="orb orb-1 -left-40 top-10" />
      <div className="orb orb-2 -right-32 top-64" />

      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <div className="glass mx-auto mb-8 inline-flex items-center gap-2.5 !rounded-full px-5 py-2 text-[13px] text-white/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ignite-cyan opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ignite-cyan" />
            </span>
            Now taking on 3 new builds for July
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-[-0.03em] md:text-7xl">
            Every missed call is
            <br />
            revenue you{" "}
            <span className="font-serif-accent text-gradient-flame font-normal">
              already earned
            </span>
            .
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-white/55 md:text-xl">
            Ignite AI builds managed front-office systems for growing service
            businesses — answering, qualifying, and booking your leads around
            the clock, so nothing slips through while your team does the real
            work.
          </p>
        </Reveal>

        <Reveal delay={360}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#audit" className="btn-primary">
              Get your free AI audit {icon.arrow}
            </a>
            <a href="#process" className="btn-glass">
              See how it works
            </a>
          </div>
        </Reveal>

        <Reveal delay={480}>
          <div className="mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              ["24/7", "coverage — nights, weekends, holidays"],
              ["60 sec", "from inquiry to first response"],
              ["30-day", "results guarantee on every build"],
            ].map(([stat, label]) => (
              <div key={stat} className="glass px-6 py-5">
                <div className="text-3xl font-bold tracking-tight">{stat}</div>
                <div className="mt-1 text-[13px] leading-snug text-white/45">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// The problem
// ─────────────────────────────────────────────────────────────

function Problem() {
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/35">
            The leak
          </p>
          <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-[-0.02em] md:text-5xl">
            Your phone rings.
            <br />
            Your crew is on a roof.{" "}
            <span className="font-serif-accent text-white/50 font-normal">
              Then what?
            </span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            {
              ic: icon.phone,
              stat: "27%",
              head: "of inbound calls to service businesses go unanswered",
              body: "And 80% of those callers won't leave a voicemail. They just dial your competitor.",
            },
            {
              ic: icon.filter,
              stat: "78%",
              head: "of customers buy from whoever responds first",
              body: "Speed isn't a nice-to-have. After five minutes, your odds of qualifying a lead drop 21×.",
            },
            {
              ic: icon.workflow,
              stat: "62%",
              head: "of buying research happens outside business hours",
              body: "Your website goes quiet at 5pm. Your future customers don't.",
            },
          ].map((c, i) => (
            <Reveal key={c.stat} delay={i * 120}>
              <GlassCard className="h-full p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70">
                  {c.ic}
                </div>
                <div className="mt-6 text-4xl font-bold tracking-tight text-gradient-flame">
                  {c.stat}
                </div>
                <h3 className="mt-3 text-[17px] font-semibold leading-snug">
                  {c.head}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/45">
                  {c.body}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Systems
// ─────────────────────────────────────────────────────────────

function Systems() {
  return (
    <section id="systems" className="relative px-6 py-28">
      <div className="orb orb-3 -left-24 top-1/3" />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/35">
            What we build
          </p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-xl text-4xl font-bold tracking-[-0.02em] md:text-5xl">
              One front office.{" "}
              <span className="font-serif-accent font-normal text-white/50">
                Fully managed.
              </span>
            </h2>
            <p className="max-w-sm text-[15px] leading-relaxed text-white/45">
              Every system is custom-built for your business, installed in
              days, and run by us month after month. You never touch the
              machinery.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {[
            {
              ic: icon.phone,
              name: "AI Reception",
              body: "Every call, text, and website chat answered instantly — in your company's voice. Missed calls get a text back in seconds, after-hours inquiries get real answers, and every conversation is captured.",
              points: ["Missed-call text-back", "24/7 website chat", "After-hours coverage"],
            },
            {
              ic: icon.filter,
              name: "Lead Qualification",
              body: "Not every inquiry deserves your time. Our systems ask the right questions, score every lead against your criteria, and put the serious ones at the top of your inbox with full context.",
              points: ["Custom qualifying questions", "Lead scoring & routing", "Full conversation history"],
            },
            {
              ic: icon.workflow,
              name: "Booking & Follow-up",
              body: "Qualified leads book straight onto your calendar. The ones who hesitate enter automatic follow-up that stays politely persistent for weeks — so deals stop dying of silence.",
              points: ["Direct calendar booking", "Multi-touch follow-up", "CRM sync & reporting"],
            },
          ].map((s, i) => (
            <Reveal key={s.name} delay={i * 120}>
              <GlassCard className="flex h-full flex-col p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70">
                  {s.ic}
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                  {s.name}
                </h3>
                <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-white/45">
                  {s.body}
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-6">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[14px] text-white/60">
                      <span className="text-ignite-cyan">{icon.check}</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Process
// ─────────────────────────────────────────────────────────────

function Process() {
  return (
    <section id="process" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/35">
            How it works
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-[-0.02em] md:text-5xl">
            Three steps.{" "}
            <span className="font-serif-accent font-normal text-white/50">
              No homework for you.
            </span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            {
              ic: icon.search,
              n: "01",
              name: "The audit",
              time: "20 minutes · free",
              body: "We sit down with you and find the leak: how many calls, forms, and after-hours inquiries you're losing — and what they're worth in dollars per month. If the numbers don't justify a build, we'll tell you that, too.",
            },
            {
              ic: icon.build,
              n: "02",
              name: "The build",
              time: "Live within days",
              body: "We design your system around how your business actually runs — your services, your service area, your way of talking to customers. You review it working live before anything goes public.",
            },
            {
              ic: icon.run,
              n: "03",
              name: "The run",
              time: "Managed monthly",
              body: "We host it, watch it, and tune it — and you get a monthly report showing exactly what it captured. Backed by our guarantee: measurable results in 30 days, or your setup investment back.",
            },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <GlassCard className="h-full p-8">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70">
                    {s.ic}
                  </div>
                  <span className="font-serif-accent text-5xl text-white/[0.12]">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight">{s.name}</h3>
                <p className="mt-1 text-[13px] font-medium uppercase tracking-[0.12em] text-ignite-cyan/80">
                  {s.time}
                </p>
                <p className="mt-4 text-[14.5px] leading-relaxed text-white/45">
                  {s.body}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="glass glass-deep mt-5 flex flex-col items-center gap-5 p-8 text-center md:flex-row md:text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-ignite-cyan">
              {icon.shield}
            </div>
            <p className="text-[15px] leading-relaxed text-white/60">
              <span className="font-semibold text-white">The 30-day guarantee.</span>{" "}
              If your system doesn&apos;t produce measurable results in its first
              thirty days, we refund your setup investment. We can offer that
              because we scope every build against your real numbers first.
            </p>
            <a href="#audit" className="btn-glass shrink-0 !px-6 !py-3 !text-[14px]">
              Start with the audit
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// About
// ─────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="orb orb-2 -right-40 top-10" />
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="glass glass-deep p-10 md:p-14">
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/35">
              Built in Greenville
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] md:text-4xl">
              Local enough to shake your hand.{" "}
              <span className="font-serif-accent font-normal text-white/50">
                Technical enough to build it all.
              </span>
            </h2>
            <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-white/55">
              <p>
                Ignite AI is run by Cai Benjamin out of Greenville, South
                Carolina. No offshore team, no ticket queue — when you call,
                you get the person who built your system.
              </p>
              <p>
                We work with a small number of Upstate service businesses at a
                time, on purpose. Every build gets designed, installed, and
                managed personally — which is why we cap new projects at three
                per month.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Greenville, SC", "Serving the Upstate & beyond", "Founder-built & managed"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[13px] text-white/50"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Lead capture
// ─────────────────────────────────────────────────────────────

type FormState = "idle" | "submitting" | "success" | "error";

function AuditForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    notes: "",
  });
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setState("success");
    } catch (err) {
      setState("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <section id="audit" className="relative px-6 py-28">
      <div className="orb orb-1 -left-32 bottom-0" />
      <div className="mx-auto max-w-6xl">
        <div className="glass glass-deep overflow-hidden md:grid md:grid-cols-5">
          {/* Left — pitch */}
          <div className="border-b border-white/[0.07] p-10 md:col-span-2 md:border-b-0 md:border-r md:p-12">
            <Reveal>
              <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/35">
                Free AI audit
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] md:text-4xl">
                Find out what missed calls{" "}
                <span className="font-serif-accent font-normal text-gradient-flame">
                  actually cost you
                </span>
                .
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-white/50">
                Twenty minutes. We&apos;ll map where leads are slipping through
                your front office and put a dollar figure on it. No pitch
                unless the numbers justify one.
              </p>
              <ul className="mt-8 space-y-3.5">
                {[
                  "Your estimated monthly revenue leak, quantified",
                  "The top three gaps in your lead handling",
                  "A clear fix — even if you build it without us",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[14.5px] text-white/60">
                    <span className="mt-0.5 text-ignite-cyan">{icon.check}</span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right — form */}
          <div className="p-10 md:col-span-3 md:p-12">
            {state === "success" ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-ignite-cyan/30 bg-ignite-cyan/10 text-ignite-cyan">
                  {icon.check}
                </div>
                <h3 className="mt-6 text-2xl font-semibold">You&apos;re on the list.</h3>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/50">
                  Check your inbox — we&apos;ve sent a booking link so you can
                  lock in your audit time now. Otherwise, we&apos;ll reach out
                  within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="f-name" className="mb-2 block text-[13px] font-medium text-white/50">
                      Your name *
                    </label>
                    <input
                      id="f-name"
                      className="field"
                      placeholder="Jordan Smith"
                      value={form.name}
                      onChange={set("name")}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="f-biz" className="mb-2 block text-[13px] font-medium text-white/50">
                      Business name *
                    </label>
                    <input
                      id="f-biz"
                      className="field"
                      placeholder="Smith Heating & Air"
                      value={form.businessName}
                      onChange={set("businessName")}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="f-email" className="mb-2 block text-[13px] font-medium text-white/50">
                      Work email *
                    </label>
                    <input
                      id="f-email"
                      type="email"
                      className="field"
                      placeholder="jordan@smithhvac.com"
                      value={form.email}
                      onChange={set("email")}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="f-phone" className="mb-2 block text-[13px] font-medium text-white/50">
                      Phone
                    </label>
                    <input
                      id="f-phone"
                      type="tel"
                      className="field"
                      placeholder="(864) 555-0123"
                      value={form.phone}
                      onChange={set("phone")}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="f-notes" className="mb-2 block text-[13px] font-medium text-white/50">
                    What&apos;s slipping through right now?
                  </label>
                  <textarea
                    id="f-notes"
                    className="field min-h-[110px] resize-y"
                    placeholder="e.g. We miss calls when the crews are out, and web leads sit until the evening…"
                    value={form.notes}
                    onChange={set("notes")}
                  />
                </div>

                {state === "error" && (
                  <p className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-[14px] text-red-300">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="btn-primary w-full !py-4"
                >
                  {state === "submitting" ? "Sending…" : <>Request my free audit {icon.arrow}</>}
                </button>
                <p className="text-center text-[12.5px] text-white/30">
                  No spam, no obligation. Your details go straight to Cai — and
                  nowhere else.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <Image
            src="/ignite-logo.jpg"
            alt="Ignite AI"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <div className="text-[14px] font-semibold tracking-wide">IGNITE AI</div>
            <div className="text-[12px] text-white/35">Greenville, South Carolina</div>
          </div>
        </div>
        <div className="flex items-center gap-8 text-[13.5px] text-white/45">
          <a href="#systems" className="transition hover:text-white">Systems</a>
          <a href="#process" className="transition hover:text-white">Process</a>
          <a href="#audit" className="transition hover:text-white">Free audit</a>
          <a href="mailto:caibenjamin500@gmail.com" className="transition hover:text-white">
            Email us
          </a>
        </div>
        <p className="text-[12.5px] text-white/25">
          © {new Date().getFullYear()} Ignite AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="relative">
      <div className="ambient" />
      <div className="grain" />
      <Nav />
      <Hero />
      <Problem />
      <Systems />
      <Process />
      <About />
      <AuditForm />
      <Footer />
    </main>
  );
}
