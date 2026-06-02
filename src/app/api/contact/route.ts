import { NextRequest, NextResponse } from "next/server";
import { Client as NotionClient } from "@notionhq/client";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  notes: string;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function validateForm(data: Partial<ContactFormData>): string | null {
  if (!data.name?.trim()) return "Name is required.";
  if (!data.email?.trim()) return "Email is required.";
  if (!data.businessName?.trim()) return "Business name is required.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) return "Please provide a valid email address.";
  return null;
}

function timestamp(): string {
  return new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// ─────────────────────────────────────────────
// Google Sheets (Apps Script webhook)
// ─────────────────────────────────────────────

async function appendToGoogleSheets(data: ContactFormData): Promise<void> {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    console.warn("[Sheets] Missing GOOGLE_SCRIPT_URL — skipping.");
    return;
  }

  const response = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      timestamp: timestamp(),
      name: data.name,
      email: data.email,
      phone: data.phone || "—",
      businessName: data.businessName,
      notes: data.notes || "—",
    }),
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`[Sheets] Apps Script returned ${response.status}`);
  }

  console.log("[Sheets] ✓ Row appended via Apps Script.");
}

// ─────────────────────────────────────────────
// Notion
// ─────────────────────────────────────────────

async function appendToNotion(data: ContactFormData): Promise<void> {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!token || !databaseId) {
    console.warn("[Notion] Missing env vars — skipping.");
    return;
  }

  const notion = new NotionClient({ auth: token });

  await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      "Business Name": {
        title: [{ text: { content: data.businessName } }],
      },
      "Decision Maker": {
        rich_text: [{ text: { content: data.name } }],
      },
      Email: {
        email: data.email,
      },
      Phone: {
        phone_number: data.phone || null,
      },
      Notes: {
        rich_text: [{ text: { content: data.notes || "—" } }],
      },
      Status: {
        select: { name: "New Lead" },
      },
      "Last Contacted": {
        date: { start: new Date().toISOString() },
      },
    },
  });

  console.log("[Notion] ✓ Page created successfully.");
}

// ─────────────────────────────────────────────
// Route Handler
// ─────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationError = validateForm(body);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const data: ContactFormData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || "",
      businessName: body.businessName.trim(),
      notes: body.notes?.trim() || "",
    };

    const results = await Promise.allSettled([
      appendToGoogleSheets(data),
      appendToNotion(data),
    ]);

    results.forEach((result, i) => {
      const label = ["Google Sheets", "Notion"][i];
      if (result.status === "rejected") {
        console.error(`[${label}] Failed:`, result.reason);
      }
    });

    const anySuccess = results.some((r) => r.status === "fulfilled");

    if (!anySuccess) {
      return NextResponse.json(
        { error: "All integrations failed. Please try again or contact us directly." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We'll be in touch within one business day.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API] Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
