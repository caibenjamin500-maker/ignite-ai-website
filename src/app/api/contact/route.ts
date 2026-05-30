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
    timeZone: "America/New_York",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function getFirstName(fullName: string): string {
  return fullName.trim().split(" ")[0];
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

  const headerCheck = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A1:F1",
  });

  const hasHeader = headerCheck.data.values && headerCheck.data.values[0]?.length > 0;

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
      values: [[timestamp(), data.name, data.email, data.phone || "—", data.businessName, data.notes || "—"]],
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
      Name: { title: [{ text: { content: `${data.name} — ${data.businessName}` } }] },
      "Full Name": { rich_text: [{ text: { content: data.name } }] },
      Email: { email: data.email },
      Phone: { phone_number: data.phone || null },
      "Business Name": { rich_text: [{ text: { content: data.businessName } }] },
      Notes: { rich_text: [{ text: { content: data.notes || "—" } }] },
      Status: { select: { name: "New Lead" } },
      "Submitted At": { date: { start: new Date().toISOString() } },
    },
  });

  console.log("[Notion] ✓ Page created successfully.");
}

// ─────────────────────────────────────────────
// Email: Internal Notification (to Cai)
// ─────────────────────────────────────────────

async function sendInternalNotification(
  transporter: nodemailer.Transporter,
  gmailUser: string,
  data: ContactFormData
): Promise<void> {
  const recipientEmails = process.env.NOTIFICATION_EMAILS || "caibenjamin500@gmail.com";
  const recipients = recipientEmails.split(",").map((e) => e.trim());
  const bookingUrl = process.env.BOOKING_URL || "https://cal.com/cai-benjamin-igniteai/30min";

  const htmlBody = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><style>body{font-family:'Helvetica Neue',Arial,sans-serif;background:#0a0a0a;color:#fff;margin:0;padding:0}.container{max-width:600px;margin:0 auto;padding:40px 20px}.header{background:linear-gradient(135deg,#CC0044 0%,#9B30FF 60%,#00BFFF 100%);padding:32px;border-radius:16px 16px 0 0;text-align:center}.header h1{margin:0;font-size:28px;font-weight:900;color:#fff;letter-spacing:.1em}.header p{margin:8px 0 0;color:rgba(255,255,255,.7);font-size:14px}.body{background:#111;border:1px solid #222;border-top:none;border-radius:0 0 16px 16px;padding:32px}.badge{display:inline-block;background:rgba(204,0,68,.2);border:1px solid rgba(204,0,68,.4);color:#FF6688;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;padding:4px 12px;border-radius:999px;margin-bottom:24px}.field{margin-bottom:20px}.label{font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:6px}.value{font-size:16px;color:#fff;background:#1a1a1a;padding:12px 16px;border-radius:10px;border:1px solid #2a2a2a;word-break:break-word}.footer{margin-top:32px;padding-top:24px;border-top:1px solid #222;text-align:center;color:rgba(255,255,255,.2);font-size:12px}.cta{display:inline-block;margin-top:8px;background:linear-gradient(135deg,#CC0044,#9B30FF);color:#fff;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:700;font-size:14px}.cta-secondary{display:inline-block;margin-top:8px;margin-left:12px;background:transparent;border:1px solid #9B30FF;color:#9B30FF;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:700;font-size:14px}</style></head><body><div class="container"><div class="header"><h1>🔥 IGNITE AI</h1><p>New lead enquiry received</p></div><div class="body"><div class="badge">🚀 New Lead</div><div class="field"><div class="label">Full Name</div><div class="value">${data.name}</div></div><div class="field"><div class="label">Business Name</div><div class="value">${data.businessName}</div></div><div class="field"><div class="label">Email Address</div><div class="value"><a href="mailto:${data.email}" style="color:#00BFFF;text-decoration:none">${data.email}</a></div></div><div class="field"><div class="label">Phone Number</div><div class="value">${data.phone || "Not provided"}</div></div><div class="field"><div class="label">Notes / Message</div><div class="value">${data.notes ? data.notes.replace(/\n/g, "<br>") : "No additional notes"}</div></div><div class="field"><div class="label">Submitted At</div><div class="value">${timestamp()}</div></div><div class="field"><div class="label">Auto-response status</div><div class="value" style="color:#00BFFF">✓ Booking link sent to ${data.email}</div></div><div style="text-align:center;margin-top:24px"><a href="mailto:${data.email}?subject=Re: Your Ignite AI Enquiry&body=Hi ${encodeURIComponent(getFirstName(data.name))}," class="cta">Reply to ${getFirstName(data.name)} →</a><a href="${bookingUrl}" class="cta-secondary">View Booking Page</a></div><div class="footer"><p>Auto-response with booking link sent to the lead.<br/>Entry saved to Notion pipeline.</p></div></div></div></body></html>`;

  await transporter.sendMail({
    from: `"Ignite AI Leads" <${gmailUser}>`,
    to: recipients.join(", "),
    subject: `🔥 New Lead: ${data.name} — ${data.businessName}`,
    html: htmlBody,
    text: `New Ignite AI Lead\n==================\nName: ${data.name}\nBusiness: ${data.businessName}\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\nNotes: ${data.notes || "Not provided"}\nSubmitted: ${timestamp()}\nAuto-response: Booking link sent to lead.`,
  });

  console.log(`[Email] ✓ Internal notification sent to: ${recipients.join(", ")}`);
}

// ─────────────────────────────────────────────
// Email: Auto-Response (to the Lead)
// ─────────────────────────────────────────────

async function sendAutoResponse(
  transporter: nodemailer.Transporter,
  gmailUser: string,
  data: ContactFormData
): Promise<void> {
  const firstName = getFirstName(data.name);
  const bookingUrl = process.env.BOOKING_URL || "https://cal.com/cai-benjamin-igniteai/30min";

  const htmlBody = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><style>body{font-family:'Helvetica Neue',Arial,sans-serif;background:#0a0a0a;color:#fff;margin:0;padding:0}.container{max-width:600px;margin:0 auto;padding:40px 20px}.header{background:linear-gradient(135deg,#CC0044 0%,#9B30FF 60%,#00BFFF 100%);padding:40px 32px;border-radius:16px 16px 0 0;text-align:center}.header h1{margin:0;font-size:32px;font-weight:900;color:#fff;letter-spacing:.1em}.header p{margin:10px 0 0;color:rgba(255,255,255,.8);font-size:16px}.body{background:#111;border:1px solid #222;border-top:none;border-radius:0 0 16px 16px;padding:40px 32px}h2{font-size:22px;font-weight:800;color:#fff;margin:0 0 16px}p{font-size:15px;line-height:1.7;color:rgba(255,255,255,.75);margin:0 0 16px}.highlight{color:#fff}.booking-box{background:linear-gradient(135deg,rgba(204,0,68,.15),rgba(155,48,255,.15));border:1px solid rgba(155,48,255,.3);border-radius:16px;padding:32px;text-align:center;margin:32px 0}.booking-box h3{font-size:20px;font-weight:800;color:#fff;margin:0 0 8px}.booking-box p{font-size:14px;color:rgba(255,255,255,.6);margin:0 0 24px}.cta{display:inline-block;background:linear-gradient(135deg,#CC0044,#9B30FF);color:#fff;text-decoration:none;padding:16px 40px;border-radius:12px;font-weight:800;font-size:16px;letter-spacing:.03em}.steps{margin:24px 0}.step{display:flex;align-items:flex-start;margin-bottom:16px}.step-num{background:linear-gradient(135deg,#CC0044,#9B30FF);color:#fff;font-weight:800;font-size:13px;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-right:14px;margin-top:2px}.step-text{font-size:14px;color:rgba(255,255,255,.7);line-height:1.5}.step-text strong{color:#fff}.divider{border:none;border-top:1px solid #222;margin:28px 0}.footer{text-align:center;color:rgba(255,255,255,.25);font-size:12px;line-height:1.6}.social-link{color:rgba(255,255,255,.4);text-decoration:none}</style></head><body><div class="container"><div class="header"><h1>🔥 IGNITE AI</h1><p>We received your enquiry — here's what happens next</p></div><div class="body"><h2>Hey ${firstName}, you're in. 🚀</h2><p>Thanks for reaching out to <span class="highlight">Ignite AI</span>. We help businesses like <span class="highlight">${data.businessName}</span> cut costs and accelerate growth with custom AI agents and automation — and we'd love to explore what that looks like for you.</p><p>We've received your message and will personally follow up within <span class="highlight">one business day</span>. But if you'd rather skip the back-and-forth and lock in a time now, you can book directly on our calendar below.</p><div class="booking-box"><h3>📅 Book Your Free Discovery Call</h3><p>30 minutes · No pitch, no pressure · Just real talk about what AI can do for your business</p><a href="${bookingUrl}" class="cta">Book a Time That Works →</a></div><p>Here's what to expect on the call:</p><div class="steps"><div class="step"><div class="step-num">1</div><div class="step-text"><strong>We learn about your business</strong> — your operations, your bottlenecks, your goals.</div></div><div class="step"><div class="step-num">2</div><div class="step-text"><strong>We identify your highest-leverage AI opportunities</strong> — no fluff, just the stuff that actually moves the needle.</div></div><div class="step"><div class="step-num">3</div><div class="step-text"><strong>You get a clear picture of what's possible</strong> — timeline, investment, and expected ROI.</div></div></div><hr class="divider"/><p style="font-size:13px;color:rgba(255,255,255,.4)">You submitted the following details — just so you know we got everything:</p><p style="font-size:13px;color:rgba(255,255,255,.5);background:#1a1a1a;padding:14px 16px;border-radius:10px;border:1px solid #2a2a2a;margin-bottom:0"><strong style="color:rgba(255,255,255,.6)">Name:</strong> ${data.name}<br/><strong style="color:rgba(255,255,255,.6)">Business:</strong> ${data.businessName}<br/>${data.phone ? `<strong style="color:rgba(255,255,255,.6)">Phone:</strong> ${data.phone}<br/>` : ""}${data.notes ? `<strong style="color:rgba(255,255,255,.6)">Message:</strong> ${data.notes.replace(/\n/g, "<br/>")}` : ""}</p><hr class="divider"/><div class="footer"><p>This email was sent because you submitted a contact form at <a href="https://igniteaiagents.com" class="social-link">igniteaiagents.com</a>.<br/>If you didn't submit this form, you can safely ignore this email.</p><p style="margin-top:12px">© ${new Date().getFullYear()} Ignite AI · Greenville, SC</p></div></div></div></body></html>`;

  await transporter.sendMail({
    from: `"Cai @ Ignite AI" <${gmailUser}>`,
    to: data.email,
    replyTo: gmailUser,
    subject: `Hey ${firstName} — here's how to book your free discovery call 🔥`,
    html: htmlBody,
    text: `Hey ${firstName},\n\nThanks for reaching out to Ignite AI! We help businesses like ${data.businessName} cut costs and grow faster with custom AI agents and automation.\n\nWe've received your enquiry and will personally follow up within one business day.\n\nBook your free 30-minute discovery call here:\n${bookingUrl}\n\nNo pitch, no pressure — just real talk about what AI can do for your business.\n\nTalk soon,\nCai\nIgnite AI\nhttps://igniteaiagents.com`,
  });

  console.log(`[Email] ✓ Auto-response sent to: ${data.email}`);
}

// ─────────────────────────────────────────────
// Email: Main Handler
// ─────────────────────────────────────────────

async function sendEmails(data: ContactFormData): Promise<void> {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPassword) {
    console.warn("[Email] Missing Gmail credentials — skipping all emails.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPassword },
  });

  await Promise.all([
    sendInternalNotification(transporter, gmailUser, data),
    sendAutoResponse(transporter, gmailUser, data),
  ]);
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
      sendEmails(data),
    ]);

    results.forEach((result, i) => {
      const label = ["Google Sheets", "Notion", "Email"][i];
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
      { success: true, message: "Thank you! We'll be in touch within one business day." },
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
