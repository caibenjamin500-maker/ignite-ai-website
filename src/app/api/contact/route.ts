import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Client as NotionClient } from "@notionhq/client";
import nodemailer from "nodemailer";

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
    timeZone: "America/Toronto",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// ─────────────────────────────────────────────
// Google Sheets
// ─────────────────────────────────────────────

async function appendToGoogleSheets(data: ContactFormData): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!spreadsheetId || !serviceAccountEmail || !privateKey) {
    console.warn("[Sheets] Missing env vars — skipping Google Sheets append.");
    return;
  }

  const auth = new google.auth.JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Ensure header row exists on first run
  const headerCheck = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A1:F1",
  });

  const hasHeader =
    headerCheck.data.values &&
    headerCheck.data.values[0]?.length > 0;

  if (!hasHeader) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Sheet1!A1:F1",
      valueInputOption: "RAW",
      requestBody: {
        values: [["Timestamp", "Full Name", "Email", "Phone", "Business Name", "Notes"]],
      },
    });
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:F",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          timestamp(),
          data.name,
          data.email,
          data.phone || "—",
          data.businessName,
          data.notes || "—",
        ],
      ],
    },
  });

  console.log("[Sheets] ✓ Row appended successfully.");
}

// ─────────────────────────────────────────────
// Notion
// ─────────────────────────────────────────────

async function appendToNotion(data: ContactFormData): Promise<void> {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!token || !databaseId) {
    console.warn("[Notion] Missing env vars — skipping Notion entry.");
    return;
  }

  const notion = new NotionClient({ auth: token });

  await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      // "Name" is typically the title property in Notion databases
      Name: {
        title: [
          {
            text: {
              content: `${data.name} — ${data.businessName}`,
            },
          },
        ],
      },
      "Full Name": {
        rich_text: [{ text: { content: data.name } }],
      },
      Email: {
        email: data.email,
      },
      Phone: {
        phone_number: data.phone || null,
      },
      "Business Name": {
        rich_text: [{ text: { content: data.businessName } }],
      },
      Notes: {
        rich_text: [{ text: { content: data.notes || "—" } }],
      },
      Status: {
        select: { name: "New Lead" },
      },
      "Submitted At": {
        date: { start: new Date().toISOString() },
      },
    },
  });

  console.log("[Notion] ✓ Page created successfully.");
}

// ─────────────────────────────────────────────
// Email
// ─────────────────────────────────────────────

async function sendEmailNotification(data: ContactFormData): Promise<void> {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;
  const recipientEmails = process.env.NOTIFICATION_EMAILS || "caibenjamin500@gmail.com,mavis@igniteaiagents.com";

  if (!gmailUser || !gmailPassword) {
    console.warn("[Email] Missing Gmail credentials — skipping email notification.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPassword,
    },
  });

  const recipients = recipientEmails.split(",").map((e) => e.trim());

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #0a0a0a; color: #ffffff; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { background: linear-gradient(135deg, #CC0044 0%, #9B30FF 60%, #00BFFF 100%); padding: 32px; border-radius: 16px 16px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; font-weight: 900; color: white; letter-spacing: 0.1em; }
    .header p { margin: 8px 0 0; color: rgba(255,255,255,0.7); font-size: 14px; }
    .body { background: #111111; border: 1px solid #222; border-top: none; border-radius: 0 0 16px 16px; padding: 32px; }
    .badge { display: inline-block; background: rgba(204,0,68,0.2); border: 1px solid rgba(204,0,68,0.4); color: #FF6688; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; padding: 4px 12px; border-radius: 999px; margin-bottom: 24px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 6px; }
    .value { font-size: 16px; color: #ffffff; background: #1a1a1a; padding: 12px 16px; border-radius: 10px; border: 1px solid #2a2a2a; word-break: break-word; }
    .notes-value { font-size: 14px; line-height: 1.6; }
    .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid #222; text-align: center; color: rgba(255,255,255,0.2); font-size: 12px; }
    .cta { display: inline-block; margin-top: 24px; background: linear-gradient(135deg, #CC0044, #9B30FF); color: white; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-weight: 700; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔥 IGNITE AI</h1>
      <p>New lead enquiry received</p>
    </div>
    <div class="body">
      <div class="badge">🚀 New Lead</div>

      <div class="field">
        <div class="label">Full Name</div>
        <div class="value">${data.name}</div>
      </div>

      <div class="field">
        <div class="label">Business Name</div>
        <div class="value">${data.businessName}</div>
      </div>

      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${data.email}" style="color: #00BFFF; text-decoration: none;">${data.email}</a></div>
      </div>

      <div class="field">
        <div class="label">Phone Number</div>
        <div class="value">${data.phone || "Not provided"}</div>
      </div>

      <div class="field">
        <div class="label">Notes / Message</div>
        <div class="value notes-value">${data.notes ? data.notes.replace(/\n/g, "<br>") : "No additional notes"}</div>
      </div>

      <div class="field">
        <div class="label">Submitted At</div>
        <div class="value">${timestamp()}</div>
      </div>

      <div style="text-align: center;">
        <a href="mailto:${data.email}?subject=Re: Your Ignite AI Enquiry&body=Hi ${encodeURIComponent(data.name)}," class="cta">
          Reply to ${data.name} →
        </a>
      </div>

      <div class="footer">
        <p>This notification was sent by Ignite AI's automated lead capture system.<br />
        New entry also saved to Google Sheets and Notion.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();

  await transporter.sendMail({
    from: `"Ignite AI Leads" <${gmailUser}>`,
    to: recipients.join(", "),
    subject: `🔥 New Lead: ${data.name} — ${data.businessName}`,
    html: htmlBody,
    text: `
New Ignite AI Lead
==================
Name: ${data.name}
Business: ${data.businessName}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Notes: ${data.notes || "Not provided"}
Submitted: ${timestamp()}
    `.trim(),
  });

  console.log(`[Email] ✓ Notification sent to: ${recipients.join(", ")}`);
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

    // Run all three integrations in parallel — if one fails, others still succeed
    const results = await Promise.allSettled([
      appendToGoogleSheets(data),
      appendToNotion(data),
      sendEmailNotification(data),
    ]);

    // Log any individual failures without failing the whole request
    results.forEach((result, i) => {
      const label = ["Google Sheets", "Notion", "Email"][i];
      if (result.status === "rejected") {
        console.error(`[${label}] Failed:`, result.reason);
      }
    });

    // Return success if at least one integration succeeded
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

// Only allow POST
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
