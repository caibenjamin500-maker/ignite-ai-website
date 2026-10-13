
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Receptionist for HVAC Companies | Ignite AI",
  description:
    "Discover how an AI receptionist can help HVAC companies answer calls, handle after-hours inquiries, and book appointments. Explore Ignite AI.",
  alternates: {
    canonical:
      "https://www.igniteaiagents.com/ai-receptionist-hvac",
  },
};

const questions = [
  {
    question: "What is an AI receptionist for HVAC companies?",
    answer:
      "An AI receptionist is a voice assistant that answers incoming calls, speaks with customers, collects information, and can help schedule appointments. HVAC businesses can use one to assist their office staff during busy periods or after hours.",
  },
  {
    question: "Can an AI receptionist answer calls after hours?",
    answer:
      "Yes. An AI receptionist can be configured to answer calls outside normal business hours, including evenings and weekends.",
  },
  {
    question: "Can an AI receptionist book HVAC appointments?",
    answer:
      "Yes. When connected to a compatible scheduling system, an AI receptionist can check availability and help book appointments.",
  },
  {
    question: "Can callers speak to a real person?",
    answer:
      "Yes. A properly configured AI receptionist can transfer calls to a human team member when needed, depending on the business's call routing setup.",
  },
  {
    question: "Does AI replace an HVAC company's office staff?",
    answer:
      "Not necessarily. Many businesses can use AI alongside their existing team to help manage overflow calls, routine inquiries, and after-hours requests.",
  },
];

export default function HVACPage() {
  return (
    <main
      style={{
        background: "#090911",
        color: "#f5f5fa",
        minHeight: "100vh",
        padding: "72px 24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <article
        style={{
          maxWidth: 850,
          margin: "0 auto",
          lineHeight: 1.8,
        }}
      >
        <Link
          href="/"
          style={{ color: "#80e8f2" }}
        >
          ← Ignite AI
        </Link>

        <header style={{ margin: "70px 0" }}>
          <p style={{ color: "#d77aff" }}>
            IGNITE AI | HVAC AUTOMATION
          </p>

          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 58px)",
              lineHeight: 1.12,
            }}
          >
            AI Receptionist for HVAC Companies
          </h1>

          <p style={{ fontSize: 20, color: "#c4c2d0" }}>
            Your technicians handle the heating and cooling.
            Let AI help handle the phones.
          </p>

          <Link
            href="/demo"
            style={{
              display: "inline-block",
              background: "#b436d9",
              color: "#fff",
              padding: "14px 26px",
              borderRadius: 9,
              textDecoration: "none",
              fontWeight: "bold",
              marginTop: 18,
            }}
          >
            Explore Our AI Receptionist
          </Link>
        </header>

        <section>
          <h2>Why HVAC Companies Miss Calls</h2>
          <p>
            HVAC businesses often receive calls while
            technicians are working, office staff are
            assisting other customers, or the business
            is closed.
          </p>
          <p>
            Those calls might involve appointment
            requests, service questions, or urgent
            heating and cooling problems.
          </p>
          <p>
            A missed call means that lead went to another HVAC business.
          </p>
        </section>

        <section style={{ marginTop: 55 }}>
          <h2>How an AI Receptionist Helps</h2>
          <p>
            An AI receptionist can provide an additional
            layer of phone coverage without requiring
            someone to sit beside the phone all day.
          </p>

          <ul>
            <li>Answer incoming customer calls</li>
            <li>Respond to common service questions</li>
            <li>Collect customer contact information</li>
            <li>Help schedule available appointments</li>
            <li>Assist with nights and weekend coverage</li>
            <li>Transfer calls to human staff when needed</li>
          </ul>

          <p>
            The exact capabilities depend on the
            business's configuration, integrations,
            and operating procedures.
          </p>
        </section>

        <section style={{ marginTop: 55 }}>
          <h2>Meet RIO by Ignite AI</h2>
          <p>
            RIO is an AI voice receptionist developed
            by Ignite AI, a company based in Greenville,
            South Carolina.
          </p>
          <p>
            RIO is designed to answer business calls,
            communicate naturally with customers,
            assist with appointment scheduling, and
            transfer callers when appropriate.
          </p>
          <p>
            Ignite AI works with service businesses
            to configure AI-powered front-office
            experiences around their needs.
          </p>

          <Link
            href="/demo"
            style={{ color: "#80e8f2", fontWeight: "bold" }}
          >
            Learn more about RIO →
          </Link>
        </section>

        <section style={{ marginTop: 55 }}>
          <h2>Frequently Asked Questions</h2>

          {questions.map((item) => (
            <div
              key={item.question}
              style={{
                borderBottom: "1px solid #363044",
                padding: "17px 0",
              }}
            >
              <h3>{item.question}</h3>
              <p style={{ color: "#c4c2d0" }}>
                {item.answer}
              </p>
            </div>
          ))}
        </section>

        <section style={{ marginTop: 65 }}>
          <h2>See What an AI Front Office Could Do</h2>
          <p>
            Every HVAC company operates differently.
            Ignite AI helps businesses explore
            practical ways to handle incoming calls
            more efficiently.
          </p>

          <Link
            href="/demo"
            style={{
              display: "inline-block",
              background: "#b436d9",
              padding: "14px 26px",
              color: "white",
              borderRadius: 9,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Explore Ignite AI
          </Link>
        </section>
      </article>
    </main>
  );
}
