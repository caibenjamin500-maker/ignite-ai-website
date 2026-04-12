"use client";

import { useState, useEffect, useRef } from "react";
import FogBackground from "@/components/FogBackground";
import Navigation from "@/components/Navigation";
import IgniteLogo from "@/components/IgniteLogo";
import ScrollReveal from "@/components/ScrollReveal";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const workflows = [
  {
    icon: "⚡",
    title: "AI Lead Qualification & CRM Entry",
    description:
      "Automatically scores incoming leads based on custom criteria, enriches their data, and logs qualified prospects directly into your CRM — no manual data entry required.",
    tags: ["Lead Gen", "CRM", "Sales"],
  },
  {
    icon: "📋",
    title: "Intelligent Document Processing",
    description:
      "Extracts key information from invoices, contracts, and intake forms and routes them through the appropriate approval workflows automatically.",
    tags: ["Documents", "Approvals", "Finance"],
  },
  {
    icon: "🤖",
    title: "AI Customer Support Triage",
    description:
      "Classifies incoming support requests by priority and type, drafts contextual first responses, and routes tickets to the right team — 24/7 without delay.",
    tags: ["Support", "Customer Service"],
  },
  {
    icon: "📧",
    title: "Multi-Stage Email Nurture Sequences",
    description:
      "Personalised, behaviour-triggered email flows that guide leads from first touch to booked call — adapting tone and timing based on how prospects engage.",
    tags: ["Email", "Marketing", "Automation"],
  },
  {
    icon: "📅",
    title: "Client Onboarding Automation",
    description:
      "From signed agreement to ready-to-go client — automatically generates onboarding docs, sends welcome sequences, and creates internal task checklists.",
    tags: ["Onboarding", "Operations"],
  },
  {
    icon: "📊",
    title: "Reporting & Market Intelligence",
    description:
      "Automatically aggregates data from multiple sources, generates executive summaries, and delivers scheduled intelligence reports to your inbox.",
    tags: ["Reporting", "Analytics", "Insights"],
  },
];

const problems = [
  {
    icon: "🕐",
    problem: "Hours lost to manual data entry",
    solution: "Automated capture and sync across every system you use",
  },
  {
    icon: "📉",
    problem: "Inconsistent lead follow-up",
    solution: "AI-powered sequences that never miss a touchpoint",
  },
  {
    icon: "🔄",
    problem: "Bottlenecks in approval workflows",
    solution: "Smart routing that keeps work moving without chasing anyone",
  },
  {
    icon: "❌",
    problem: "Human error in repetitive processes",
    solution: "Rule-based AI that executes consistently, every time",
  },
  {
    icon: "📈",
    problem: "Can't scale without hiring more people",
    solution: "AI agents that handle volume growth without headcount growth",
  },
  {
    icon: "💬",
    problem: "Slow or absent after-hours responses",
    solution: "24/7 AI-powered engagement that never sleeps",
  },
];

const faqs = [
  {
    q: "What is AI automation?",
    a: "AI automation uses intelligent software to handle repetitive, time-consuming tasks automatically — freeing your team to focus on higher-value work that actually moves the needle.",
  },
  {
    q: "How does Ignite AI build a solution for my business?",
    a: "We start with a deep discovery session to understand your workflows, pain points, and goals. From there, we design and build a custom AI solution tailored specifically to your business — no templates, no one-size-fits-all.",
  },
  {
    q: "Do I need technical knowledge to use your solutions?",
    a: "Not at all. We build solutions that integrate seamlessly into your existing workflows and are designed to be intuitive — no technical background required to operate them.",
  },
  {
    q: "How long does implementation take?",
    a: "Timelines vary by complexity. Simpler automations can be live in as little as 1–2 weeks, while more sophisticated systems typically take 4–8 weeks from discovery to deployment.",
  },
  {
    q: "Will it work with the tools my business already uses?",
    a: "In most cases, yes. We build integrations with the tools you already rely on — CRMs, spreadsheets, communication platforms, scheduling systems, and more.",
  },
  {
    q: "Is my business data secure?",
    a: "Absolutely. Data privacy and security are built into every solution we create, following industry-standard practices from day one.",
  },
  {
    q: "What support do I get after go-live?",
    a: "We don't hand you a tool and disappear. We provide ongoing support, monitoring, and can iterate on your solution as your business grows and evolves.",
  },
  {
    q: "How do I get started?",
    a: "Simply fill out our contact form below and we'll reach out to schedule a free discovery call to learn about your business and explore exactly how AI can work for you.",
  },
];

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
    >
      {/* Radial vignette for hero depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Animated particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${10 + i * 8}%`,
                top: `${15 + ((i * 17) % 70)}%`,
                width: `${3 + (i % 4)}px`,
                height: `${3 + (i % 4)}px`,
                backgroundColor:
                  i % 3 === 0
                    ? "rgba(204, 0, 68, 0.6)"
                    : i % 3 === 1
                    ? "rgba(155, 48, 255, 0.6)"
                    : "rgba(0, 191, 255, 0.6)",
                animationDuration: `${6 + (i % 5) * 2}s`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>
      )}

      <div
        className={`relative z-10 flex flex-col items-center gap-8 max-w-5xl mx-auto transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Logo */}
        <div className="animate-float">
          <IgniteLogo size={80} showText={false} />
        </div>

        {/* Eyebrow */}
        <div className="glass px-5 py-2 rounded-full border border-white/10">
          <span className="text-xs font-semibold tracking-[0.25em] text-white/60 uppercase">
            Custom AI Automation
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[1.0] tracking-tight">
          <span className="block text-white">We Build the AI</span>
          <span className="block gradient-text">That Works For You.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-white/55 max-w-2xl leading-relaxed font-light">
          Stop losing hours to repetitive tasks. Ignite AI designs and builds
          custom automation solutions — uniquely crafted for your business,
          your workflows, and your growth.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <button
            onClick={() => handleScroll("contact")}
            className="btn-primary px-10 py-4 text-base font-semibold tracking-wide"
          >
            Ignite Your Business →
          </button>
          <button
            onClick={() => handleScroll("what-we-do")}
            className="btn-secondary px-10 py-4 text-base font-medium"
          >
            See How It Works
          </button>
        </div>

        {/* Social proof bar */}
        <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm text-white/35">
          <span>✦ 100% Custom Solutions</span>
          <span>✦ No Hidden Pricing</span>
          <span>✦ Built Around Your Business</span>
          <span>✦ Ongoing Support</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs tracking-widest text-white/50 uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

function WhatWeDoSection() {
  const features = [
    {
      icon: "🔧",
      title: "Built for Your Business",
      description:
        "Every automation we build is designed from the ground up around your specific workflows, tools, and goals — not retrofitted from a template.",
    },
    {
      icon: "🧠",
      title: "Powered by Cutting-Edge AI",
      description:
        "We leverage the latest in large language models, machine learning, and intelligent agents to create solutions that think, adapt, and act.",
    },
    {
      icon: "🔗",
      title: "Seamless Integration",
      description:
        "Our automations connect directly with the tools you already use — no ripping out your stack, just making it smarter.",
    },
    {
      icon: "📐",
      title: "No Price List — On Purpose",
      description:
        "Every business problem is unique. That's why every Ignite AI solution is uniquely scoped and priced — you get exactly what you need, and nothing you don't.",
    },
    {
      icon: "🚀",
      title: "From Discovery to Deployment",
      description:
        "We walk you through every step: discovery, design, build, testing, and deployment — with full transparency and collaboration throughout.",
    },
    {
      icon: "🛡️",
      title: "Built to Last",
      description:
        "We engineer robust, secure automations with monitoring and ongoing support — so your AI keeps running, even as your business evolves.",
    },
  ];

  return (
    <section id="what-we-do" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-20">
          <div className="inline-block glass px-5 py-2 rounded-full border border-white/10 mb-6">
            <span className="text-xs font-semibold tracking-[0.25em] text-white/50 uppercase">
              What We Do
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            AI Automation That{" "}
            <span className="gradient-text">Actually Fits</span>
          </h2>
          <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
            Repetitive tasks are the hidden tax on your business. Every hour spent on
            manual processes is an hour stolen from growth, creativity, and the work that
            only you can do. We eliminate that tax with AI built precisely for you.
          </p>
        </ScrollReveal>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 80}>
              <div className="glass-card p-8 h-full flex flex-col gap-4">
                <div
                  className="text-3xl w-12 h-12 flex items-center justify-center rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1">{f.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Highlight callout */}
        <ScrollReveal delay={200}>
          <div className="mt-16 gradient-border glass-card p-10 text-center max-w-4xl mx-auto">
            <div
              className="text-5xl mb-4"
              style={{ filter: "drop-shadow(0 0 20px rgba(0,191,255,0.4))" }}
            >
              💡
            </div>
            <h3 className="text-3xl font-black mb-4">
              No Price List — <span className="gradient-text-cool">By Design</span>
            </h3>
            <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed">
              Every Ignite AI solution is custom-scoped to your business. We don't believe
              in one-size-fits-all pricing because your problem isn't one-size-fits-all.
              Book a discovery call and we'll design something built exactly for you.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function WorkflowsSection() {
  return (
    <section id="workflows" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Workflows */}
        <ScrollReveal className="text-center mb-20">
          <div className="inline-block glass px-5 py-2 rounded-full border border-white/10 mb-6">
            <span className="text-xs font-semibold tracking-[0.25em] text-white/50 uppercase">
              Real Solutions
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Workflows We've <span className="gradient-text">Already Built</span>
          </h2>
          <p className="text-xl text-white/50 max-w-3xl mx-auto">
            Here's a sample of the kinds of automations we've designed and deployed
            for real businesses — across industries, at every scale.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {workflows.map((w, i) => (
            <ScrollReveal key={w.title} delay={i * 70}>
              <div className="glass-card p-7 h-full flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <span
                    className="text-2xl w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl"
                    style={{ background: "rgba(155,48,255,0.12)", border: "1px solid rgba(155,48,255,0.2)" }}
                  >
                    {w.icon}
                  </span>
                  <h3 className="text-base font-bold text-white leading-snug">{w.title}</h3>
                </div>
                <p className="text-white/48 text-sm leading-relaxed flex-1">{w.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {w.tags.map((tag) => (
                    <span key={tag} className="workflow-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Divider */}
        <div className="section-divider mb-32" />

        {/* Problems We Solve */}
        <ScrollReveal className="text-center mb-20">
          <div className="inline-block glass px-5 py-2 rounded-full border border-white/10 mb-6">
            <span className="text-xs font-semibold tracking-[0.25em] text-white/50 uppercase">
              Problems We Solve
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Sound <span className="gradient-text-warm">Familiar?</span>
          </h2>
          <p className="text-xl text-white/50 max-w-3xl mx-auto">
            These are the pain points we hear most often from businesses before they
            work with us. If any of these hit home, we need to talk.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <ScrollReveal key={p.problem} delay={i * 70}>
              <div className="glass-card p-7 flex flex-col gap-4 group">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{p.icon}</span>
                  <div
                    className="h-px flex-1"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(204,0,68,0.4), transparent)",
                    }}
                  />
                </div>
                <div>
                  <p className="text-white/40 text-sm line-through mb-2 group-hover:text-white/30 transition-colors">
                    {p.problem}
                  </p>
                  <p className="text-white font-semibold text-base leading-snug">
                    ✓ {p.solution}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-block glass px-5 py-2 rounded-full border border-white/10 mb-6">
            <span className="text-xs font-semibold tracking-[0.25em] text-white/50 uppercase">
              FAQ
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Questions <span className="gradient-text">Answered</span>
          </h2>
          <p className="text-xl text-white/50">
            Everything you need to know before getting started.
          </p>
        </ScrollReveal>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <ScrollReveal key={i} delay={i * 50}>
                <div
                  className={`glass-card overflow-hidden transition-all duration-300 ${
                    isOpen ? "border-white/15" : "border-white/08"
                  }`}
                >
                  <button
                    className="w-full text-left px-7 py-5 flex items-center justify-between gap-4"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-white text-base leading-snug">
                      {faq.q}
                    </span>
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "bg-gradient-to-br from-crimson to-purple rotate-45"
                          : "bg-white/08"
                      }`}
                      style={
                        isOpen
                          ? {
                              background:
                                "linear-gradient(135deg, #CC0044, #9B30FF)",
                            }
                          : {}
                      }
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      >
                        <path
                          d="M6 1v10M1 6h10"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>

                  <div className={`faq-answer ${isOpen ? "open" : ""}`}>
                    <p className="px-7 pb-6 text-white/55 leading-relaxed text-sm">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", businessName: "", notes: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <section id="contact" className="relative py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass-card p-16 flex flex-col items-center gap-6">
            <div
              className="text-6xl animate-float"
              style={{ filter: "drop-shadow(0 0 20px rgba(0,191,255,0.5))" }}
            >
              🔥
            </div>
            <h2 className="text-4xl font-black gradient-text">You're Ignited!</h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Thanks for reaching out. We've received your details and will be
              in touch within one business day to schedule your free discovery call.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="btn-secondary px-8 py-3 text-sm font-medium mt-2"
            >
              Submit Another Enquiry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Copy */}
          <div className="lg:sticky lg:top-28">
            <ScrollReveal direction="left">
              <div className="inline-block glass px-5 py-2 rounded-full border border-white/10 mb-6">
                <span className="text-xs font-semibold tracking-[0.25em] text-white/50 uppercase">
                  Get Started
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Let's Build{" "}
                <span className="gradient-text">Something Great</span>
              </h2>
              <p className="text-xl text-white/50 leading-relaxed mb-8">
                Tell us about your business. We'll reach out to schedule a free
                discovery call where we learn about your workflows, challenges, and
                goals — and explore exactly how AI can work for you.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  { icon: "🎯", text: "Free discovery call — no commitment" },
                  { icon: "🔒", text: "Your information stays private" },
                  { icon: "⚡", text: "We respond within one business day" },
                  { icon: "🛠️", text: "Custom solution, not a template" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-white/60 text-sm">
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Form */}
          <ScrollReveal direction="right">
            <div className="glass-card gradient-border p-10">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold tracking-wider text-white/40 uppercase">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Jane Smith"
                      className="glass-input px-4 py-3 w-full text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold tracking-wider text-white/40 uppercase">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={form.businessName}
                      onChange={handleChange}
                      required
                      placeholder="Acme Corp"
                      className="glass-input px-4 py-3 w-full text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold tracking-wider text-white/40 uppercase">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="jane@example.com"
                    className="glass-input px-4 py-3 w-full text-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold tracking-wider text-white/40 uppercase">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="glass-input px-4 py-3 w-full text-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold tracking-wider text-white/40 uppercase">
                    Tell Us About Your Business & Challenges
                  </label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={5}
                    placeholder="What repetitive tasks are eating your team's time? What processes feel broken? We're all ears..."
                    className="glass-input px-4 py-3 w-full text-sm resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="glass px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary py-4 text-base font-semibold tracking-wide mt-2 w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg
                        className="animate-spin w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Ignite My Business →"
                  )}
                </button>

                <p className="text-center text-white/25 text-xs">
                  By submitting you agree to be contacted by Ignite AI. No spam, ever.
                </p>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/05 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <IgniteLogo size={28} />
        <p className="text-white/25 text-sm text-center">
          © {new Date().getFullYear()} Ignite AI. All rights reserved. Custom AI solutions for forward-thinking businesses.
        </p>
        <div className="flex gap-6 text-sm text-white/30">
          <button
            onClick={() => document.getElementById("what-we-do")?.scrollIntoView({ behavior: "smooth" })}
            className="hover:text-white/60 transition-colors"
          >
            What We Do
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="hover:text-white/60 transition-colors"
          >
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <FogBackground />
      <Navigation />

      <div className="relative z-10">
        <HeroSection />

        <div className="section-divider" />
        <WhatWeDoSection />

        <div className="section-divider" />
        <WorkflowsSection />

        <div className="section-divider" />
        <FAQSection />

        <div className="section-divider" />
        <ContactSection />

        <Footer />
      </div>
    </main>
  );
}
