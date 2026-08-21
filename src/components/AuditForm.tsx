"use client";

import { useId, useRef, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

type Fields = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  notes: string;
  smsConsent: boolean;
  /** Honeypot. Real people never fill this in; bots usually do. */
  website: string;
};

const EMPTY: Fields = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  notes: "",
  smsConsent: false,
  website: "",
};

const MAX = {
  name: 120,
  businessName: 160,
  email: 254,
  phone: 32,
  notes: 2000,
};

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="mt-[3px] shrink-0"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="8" />
      <path d="M10 6v4.5M10 13.6v.1" />
    </svg>
  );
}

export default function AuditForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  const id = (key: string) => `${uid}-${key}`;

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((f) => ({ ...f, [key]: value }));
    setFieldErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  }

  /** Mirrors the server rules exactly. The server is what actually enforces them. */
  function validate(f: Fields) {
    const errors: Record<string, string> = {};
    if (!f.name.trim()) errors.name = "Enter your name.";
    if (!f.businessName.trim()) errors.businessName = "Enter your business name.";
    if (!f.email.trim()) {
      errors.email = "Enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) {
      errors.email = "That doesn't look like an email address. Check for a typo.";
    }
    if (f.smsConsent && !f.phone.trim()) {
      errors.phone = "Add a mobile number, or untick the text-message box.";
    }
    return errors;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const errors = validate(fields);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setStatus("idle");
      setFormError("");
      const firstKey = Object.keys(errors)[0];
      formRef.current
        ?.querySelector<HTMLElement>(`#${CSS.escape(id(firstKey))}`)
        ?.focus();
      return;
    }

    setStatus("submitting");
    setFormError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.error ||
            "We couldn't send that just now. Please try again, or email caibenjamin500@gmail.com."
        );
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setFormError(
        err instanceof Error
          ? err.message
          : "We couldn't send that just now. Please try again, or email caibenjamin500@gmail.com."
      );
      // Move focus to the message so it is announced and reachable by keyboard.
      window.setTimeout(() => errorRef.current?.focus(), 0);
    }
  }

  if (status === "success") {
    return (
      <div className="card" role="status">
        <h3 className="h3">Request received</h3>
        <p className="prose-measure mt-3 text-[var(--fg-2)]">
          Thanks, {fields.name.trim().split(" ")[0] || "there"}. Your request is
          in — Cai will get back to you within one business day to set up a time.
        </p>
        <p className="prose-measure mt-3 text-[15px] text-[var(--fg-3)]">
          If it&apos;s urgent, email{" "}
          <a href="mailto:caibenjamin500@gmail.com" className="link">
            caibenjamin500@gmail.com
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card">
      {/* Honeypot — hidden from sighted users and from screen readers alike. */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor={id("website")}>Leave this field empty</label>
        <input
          id={id("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fields.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <p className="text-[13px] text-[var(--fg-3)]">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">required</span> are required.
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className="field-label">
            Your name <span aria-hidden="true">*</span>
          </label>
          <input
            id={id("name")}
            name="name"
            type="text"
            className="field"
            autoComplete="name"
            maxLength={MAX.name}
            required
            aria-required="true"
            aria-invalid={fieldErrors.name ? "true" : undefined}
            aria-describedby={fieldErrors.name ? id("name-error") : undefined}
            value={fields.name}
            onChange={(e) => update("name", e.target.value)}
          />
          {fieldErrors.name && (
            <p id={id("name-error")} className="field-error">
              <AlertIcon />
              {fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={id("businessName")} className="field-label">
            Business name <span aria-hidden="true">*</span>
          </label>
          <input
            id={id("businessName")}
            name="businessName"
            type="text"
            className="field"
            autoComplete="organization"
            maxLength={MAX.businessName}
            required
            aria-required="true"
            aria-invalid={fieldErrors.businessName ? "true" : undefined}
            aria-describedby={
              fieldErrors.businessName ? id("businessName-error") : undefined
            }
            value={fields.businessName}
            onChange={(e) => update("businessName", e.target.value)}
          />
          {fieldErrors.businessName && (
            <p id={id("businessName-error")} className="field-error">
              <AlertIcon />
              {fieldErrors.businessName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={id("email")} className="field-label">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            className="field"
            autoComplete="email"
            inputMode="email"
            maxLength={MAX.email}
            required
            aria-required="true"
            aria-invalid={fieldErrors.email ? "true" : undefined}
            aria-describedby={fieldErrors.email ? id("email-error") : undefined}
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
          />
          {fieldErrors.email && (
            <p id={id("email-error")} className="field-error">
              <AlertIcon />
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={id("phone")} className="field-label">
            Phone
          </label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            className="field"
            autoComplete="tel"
            inputMode="tel"
            maxLength={MAX.phone}
            aria-invalid={fieldErrors.phone ? "true" : undefined}
            aria-describedby={
              fieldErrors.phone ? id("phone-error") : id("phone-hint")
            }
            value={fields.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
          {fieldErrors.phone ? (
            <p id={id("phone-error")} className="field-error">
              <AlertIcon />
              {fieldErrors.phone}
            </p>
          ) : (
            <p id={id("phone-hint")} className="field-hint">
              Optional. Only needed if you&apos;d rather talk than email.
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={id("notes")} className="field-label">
          What&apos;s slipping through right now?
        </label>
        <textarea
          id={id("notes")}
          name="notes"
          className="field min-h-[120px] resize-y"
          maxLength={MAX.notes}
          aria-describedby={id("notes-hint")}
          value={fields.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
        <p id={id("notes-hint")} className="field-hint">
          Optional. A sentence or two is plenty.
        </p>
      </div>

      <div className="mt-5 flex items-start gap-3">
        <input
          id={id("smsConsent")}
          name="smsConsent"
          type="checkbox"
          /* 24px square: the WCAG 2.2 minimum target size */
          className="mt-0.5 h-6 w-6 shrink-0 accent-[var(--accent)]"
          aria-describedby={id("sms-hint")}
          checked={fields.smsConsent}
          onChange={(e) => update("smsConsent", e.target.checked)}
        />
        <div>
          <label htmlFor={id("smsConsent")} className="text-[15px] text-[var(--fg-2)]">
            Text me at this number about my audit.
          </label>
          <p id={id("sms-hint")} className="field-hint">
            Optional — you&apos;ll hear from us by email either way. Message and
            data rates may apply. Reply STOP at any time to stop receiving texts.
          </p>
        </div>
      </div>

      {status === "error" && formError && (
        <p
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="mt-5 flex items-start gap-2 rounded-[var(--radius)] border border-[var(--error)] bg-[rgba(255,138,158,0.08)] px-4 py-3 text-[14px] text-[var(--error)]"
        >
          <AlertIcon />
          <span>{formError}</span>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-primary mt-6 w-full"
      >
        {status === "submitting" ? "Sending…" : "Request my free audit"}
      </button>

      <p aria-live="polite" className="sr-only">
        {status === "submitting" ? "Sending your request." : ""}
      </p>

      <p className="mt-4 text-[13px] leading-relaxed text-[var(--fg-3)]">
        We use your details only to contact you about the audit. See our{" "}
        <a href="/privacy" className="link">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
