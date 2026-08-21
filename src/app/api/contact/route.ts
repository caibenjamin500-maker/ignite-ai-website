import { NextRequest, NextResponse } from "next/server";
import { Client as NotionClient } from "@notionhq/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ─────────────────────────────────────────────
// Shape of an accepted submission
// ─────────────────────────────────────────────

interface Lead {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  notes: string;
  smsConsent: boolean;
}

/**
 * Length caps. The client sets the same maxLength values, but the client is
 * not a security control — anything can POST to this route, so the limits are
 * enforced here as well and a request that breaks them is rejected outright.
 */
const LIMITS = {
  name: 120,
  businessName: 160,
  email: 254,
  phone: 32,
  notes: 2000,
} as const;

/** Reject an oversized body before parsing it. */
const MAX_BODY_BYTES = 16 * 1024;

// ─────────────────────────────────────────────
// Rate limiting
// ─────────────────────────────────────────────

/**
 * A small fixed-window limiter, keyed on client IP.
 *
 * This lives in the memory of one serverless instance, so it is a speed bump
 * rather than a guarantee: a burst spread across instances can exceed the
 * limit. It stops the common case (one script hammering the form) at no cost.
 * If the form ever starts attracting real abuse, move this to a shared store
 * such as Vercel KV or Upstash.
 */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string): boolean {
  const now = Date.now();

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
  }

  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_PER_WINDOW) return false;
  entry.count += 1;
  return true;
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

// ─────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validate(body: Record<string, unknown>):
  | { ok: true; lead: Lead }
  | { ok: false; error: string } {
  const name = asString(body.name);
  const businessName = asString(body.businessName);
  const email = asString(body.email).toLowerCase();
  const phone = asString(body.phone);
  const notes = asString(body.notes);
  const smsConsent = body.smsConsent === true;

  if (!name) return { ok: false, error: "Please enter your name." };
  if (!businessName)
    return { ok: false, error: "Please enter your business name." };
  if (!email) return { ok: false, error: "Please enter your email address." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    return { ok: false, error: "Please enter a valid email address." };
  if (smsConsent && !phone)
    return {
      ok: false,
      error: "Please add a phone number, or untick the text-message box.",
    };

  for (const [field, limit] of Object.entries(LIMITS)) {
    const value = { name, businessName, email, phone, notes }[
      field as keyof typeof LIMITS
    ];
    if (value.length > limit)
      return { ok: false, error: `That ${field} is too long.` };
  }

  return {
    ok: true,
    lead: { name, businessName, email, phone, notes, smsConsent },
  };
}

function timestamp(): string {
  return new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "long",
    timeStyle: "medium",
  });
}

// ─────────────────────────────────────────────
// Destinations
// ─────────────────────────────────────────────

async function appendToGoogleSheet(lead: Lead): Promise<void> {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl) throw new Error("GOOGLE_SCRIPT_URL is not configured");

  const response = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      timestamp: timestamp(),
      name: lead.name,
      email: lead.email,
      phone: lead.phone || "—",
      businessName: lead.businessName,
      notes: lead.notes || "—",
      smsConsent: lead.smsConsent ? "Yes" : "No",
    }),
    redirect: "follow",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Apps Script responded ${response.status}`);
  }
}

async function createNotionPage(lead: Lead): Promise<void> {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!token || !databaseId) {
    throw new Error("Notion credentials are not configured");
  }

  const notion = new NotionClient({ auth: token });

  const base = {
    "Business Name": { title: [{ text: { content: lead.businessName } }] },
    "Decision Maker": { rich_text: [{ text: { content: lead.name } }] },
    Email: { email: lead.email },
    Phone: { phone_number: lead.phone || null },
    Notes: { rich_text: [{ text: { content: lead.notes || "—" } }] },
    Status: { select: { name: "New Lead" } },
    "Last Contacted": { date: { start: new Date().toISOString() } },
  };

  try {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        ...base,
        // Requires an "SMS Consent" checkbox property on the database.
        "SMS Consent": { checkbox: lead.smsConsent },
      },
    });
  } catch (error) {
    // If the database has no "SMS Consent" property yet, Notion rejects the
    // whole page. Losing a lead over a missing column is the worse outcome, so
    // fall back to writing the lead without it and record the consent in the
    // note instead — the Google Sheet row still carries it in its own column.
    const message = error instanceof Error ? error.message : "";
    if (!/SMS Consent/i.test(message)) throw error;

    console.warn(
      "[contact] notion is missing the 'SMS Consent' checkbox property — " +
        "add it to keep a clean consent record"
    );

    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        ...base,
        Notes: {
          rich_text: [
            {
              text: {
                content: `${lead.notes || "—"}\n\n[SMS consent: ${
                  lead.smsConsent ? "yes" : "no"
                }]`,
              },
            },
          ],
        },
      },
    });
  }
}

// ─────────────────────────────────────────────
// Handler
// ─────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const GENERIC_FAILURE =
    "We couldn't save your request just now. Please try again in a moment, or email us directly.";

  try {
    if (!rateLimit(clientIp(request))) {
      return NextResponse.json(
        {
          error:
            "That's a few too many requests. Please wait a little while, or email us directly.",
        },
        { status: 429, headers: { "Retry-After": "3600" } }
      );
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "That request is too large." }, { status: 413 });
    }

    let body: Record<string, unknown>;
    try {
      const parsed = await request.json();
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("not an object");
      }
      body = parsed as Record<string, unknown>;
    } catch {
      return NextResponse.json({ error: "That request was malformed." }, { status: 400 });
    }

    // Honeypot. A real person never sees this field, so anything in it is a bot.
    // Answer 200 so the bot has no signal that it was caught, but store nothing.
    if (asString(body.website)) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const result = validate(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const outcomes = await Promise.allSettled([
      appendToGoogleSheet(result.lead),
      createNotionPage(result.lead),
    ]);

    // Log only which destination failed and why — never the lead's own details.
    outcomes.forEach((outcome, i) => {
      if (outcome.status === "rejected") {
        const label = ["google-sheet", "notion"][i];
        const reason =
          outcome.reason instanceof Error
            ? outcome.reason.message
            : "unknown error";
        console.error(`[contact] ${label} failed: ${reason}`);
      }
    });

    if (!outcomes.some((o) => o.status === "fulfilled")) {
      return NextResponse.json({ error: GENERIC_FAILURE }, { status: 502 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(
      `[contact] unexpected error: ${
        error instanceof Error ? error.message : "unknown"
      }`
    );
    return NextResponse.json({ error: GENERIC_FAILURE }, { status: 500 });
  }
}
