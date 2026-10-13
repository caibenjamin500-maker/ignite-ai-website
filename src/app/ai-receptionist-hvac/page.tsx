
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Receptionist for HVAC Companies | Ignite AI",
  description:
    "Explore how an AI receptionist helps HVAC companies answer calls, handle after-hours inquiries, and schedule appointments.",
  alternates: {
    canonical:
      "https://www.igniteaiagents.com/ai-receptionist-hvac",
  },
};

const benefits = [
  {
    title: "After-hours coverage",
    description:
      "Help customers reach your business during evenings, weekends, and busy periods.",
  },
  {
    title: "Appointment scheduling",
    description:
      "Connect with compatible calendars to check availability and schedule appointments.",
  },
  {
    title: "Human call transfers",
    description:
      "Route callers to your existing staff when a conversation needs a human.",
  },
];

const faqs = [
  {
    question: "What is an AI receptionist for HVAC companies?",
    answer:
      "An AI receptionist is a voice assistant that answers incoming calls, communicates with customers, collects information, and can assist with appointment scheduling.",
  },
  {
    question: "Can an AI receptionist answer HVAC calls at night?",
    answer:
      "Yes. AI receptionists can be configured to answer calls outside normal business hours.",
  },
  {
    question: "Can it book appointments?",
    answer:
      "Yes. With a compatible calendar integration, an AI receptionist can check availability and schedule appointments.",
  },
  {
    question: "Can customers speak to a human?",
    answer:
      "Yes. Call transfers can be configured so callers can reach existing office staff when needed.",
  },
  {
    question: "Does it replace office staff?",
    answer:
      "Not necessarily. AI receptionists can work alongside existing teams to help manage overflow calls and routine inquiries.",
  },
];

export default function HVACPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-12 md:py-20">
        <Link href="/" className="link link-block">
          ← Back to Ignite AI
        </Link>

        <header className="max-w-3xl py-16 md:py-24">
          <p className="eyebrow mb-5">
            IGNITE AI / HVAC SOLUTIONS
          </p>

          <h1 className="h1 mb-6">
            AI Receptionist for HVAC Companies
          </h1>

          <p className="lede prose-measure mb-8">
            Your technicians handle heating and cooling.
            Let AI help handle the phones.
          </p>

          <Link href="/demo" className="btn btn-primary">
            Meet RIO
          </Link>
        </header>

        <section
          className="border-t py-16"
          style={{ borderColor: "var(--line)" }}
        >
          <p className="eyebrow mb-4">THE PROBLEM</p>
          <h2 className="h2 mb-5">
            Every unanswered call is a missed opportunity.
          </h2>
          <p className="lede prose-measure">
            HVAC companies receive calls while technicians
            are in the field, office staff are busy, or
            the business is closed. Some of those callers
            need service immediately. Others want to
            schedule an appointment.
          </p>
        </section>

        <section className="py-16">
          <p className="eyebrow mb-4">THE SOLUTION</p>
          <h2 className="h2 mb-5">
            A front office that can answer around the clock.
          </h2>
          <p className="lede prose-measure mb-8">
            An AI receptionist can provide additional phone
            coverage, helping customers reach your business
            without relying entirely on staff availability.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div className="card" key={benefit.title}>
                <h3 className="h3 mb-3">
                  {benefit.title}
                </h3>
                <p style={{ color: "var(--fg-2)" }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="border-t py-16"
          style={{ borderColor: "var(--line)" }}
        >
          <p className="eyebrow mb-4">
            BUILT BY IGNITE AI
          </p>
          <h2 className="h2 mb-5">Meet RIO.</h2>

          <p className="lede prose-measure mb-5">
            RIO is an AI voice receptionist developed by
            Ignite AI in Greenville, South Carolina.
          </p>

          <p className="prose-measure mb-6"
             style={{ color: "var(--fg-2)" }}>
            RIO can answer business calls, communicate
            with customers, assist with appointment
            scheduling, and transfer callers to human
            staff when configured to do so.
          </p>

          <Link href="/demo" className="link link-block">
            Explore RIO →
          </Link>
        </section>

        <section
          className="border-t py-16"
          style={{ borderColor: "var(--line)" }}
        >
          <p className="eyebrow mb-4">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className="h2 mb-8">
            HVAC AI Receptionist FAQs
          </h2>

          <div className="max-w-3xl">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="border-b py-6"
                style={{ borderColor: "var(--line)" }}
              >
                <h3 className="h3 mb-3">
                  {faq.question}
                </h3>
                <p style={{ color: "var(--fg-2)" }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="border-t py-16"
          style={{ borderColor: "var(--line)" }}
        >
          <p className="eyebrow mb-4">NEXT STEP</p>
          <h2 className="h2 mb-5">
            See what an AI front office could do.
          </h2>
          <p className="lede prose-measure mb-8">
            Every HVAC company operates differently.
            Explore how Ignite AI can help with your
            business's incoming calls.
          </p>

          <Link href="/demo" className="btn btn-primary">
            Explore Ignite AI
          </Link>
        </section>
      </div>
    </main>
  );
}
