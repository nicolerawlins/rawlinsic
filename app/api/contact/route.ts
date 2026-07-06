import { NextResponse } from "next/server";

/* Primary recipients for contact form submissions. Add/remove here. */
const RECIPIENTS = [
  "info@rawlinsic.com",
  "nicole@rawlinsic.com",
];

/* In-memory rate limit (per-IP) for the API route. Persists across
   requests within a single server instance. */
const RATE_WINDOW_MS = 60 * 1000;
const RATE_MAX = 5; // max 5 submissions per IP per minute
const rateMap = new Map<string, { count: number; start: number }>();

function getClientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now - entry.start > RATE_WINDOW_MS) {
    rateMap.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count += 1;
  if (entry.count > RATE_MAX) return true;
  return false;
}

/**
 * Store the submission in Convex so there's a persistent, searchable
 * record in the Convex dashboard. Fails silently if Convex isn't
 * configured yet (site keeps working, just no storage).
 */
async function storeInConvex(data: {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  interest?: string;
  message: string;
  userAgent?: string;
  referrer?: string;
  ip?: string;
}): Promise<void> {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) return; // graceful no-op until Convex is wired up
  try {
    const mod = await import("convex/browser");
    const client = new mod.ConvexHttpClient(url);
    // Use the string form of the function reference so this file
    // doesn't depend on convex/_generated existing at build time.
    await client.mutation("contactSubmissions:create" as never, {
      ...data,
      submittedAt: Date.now(),
    } as never);
  } catch (err) {
    console.error("Convex store failed (non-fatal):", err);
  }
}

async function verifyRecaptcha(token: string | undefined): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true; // reCAPTCHA not configured — skip verification
  if (!token) return false;
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    });
    const data = await res.json();
    if (!data.success) return false;
    // v3 score check: require 0.5+
    if (typeof data.score === "number" && data.score < 0.5) return false;
    return true;
  } catch (err) {
    console.error("reCAPTCHA verification error:", err);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, organization, interest, message, honeypot, recaptchaToken } = body;

    // Honeypot: real users never fill this. Silently accept and discard.
    if (honeypot && String(honeypot).trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !organization || !interest || !message) {
      return NextResponse.json(
        { error: "Name, email, organization, area of interest, and message are required." },
        { status: 400 }
      );
    }

    // Basic length/type sanitation to prevent abuse
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      name.length > 200 ||
      email.length > 200 ||
      (phone && String(phone).length > 50) ||
      (organization && String(organization).length > 200) ||
      (interest && String(interest).length > 200) ||
      message.length > 5000
    ) {
      return NextResponse.json(
        { error: "Invalid submission." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA if configured
    const recaptchaOk = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaOk) {
      return NextResponse.json(
        { error: "Could not verify that you are human. Please try again." },
        { status: 400 }
      );
    }

    // Persist submission to Convex (fire-and-forget, non-blocking)
    await storeInConvex({
      name,
      email,
      phone,
      organization,
      interest,
      message,
      userAgent: request.headers.get("user-agent") || undefined,
      referrer: request.headers.get("referer") || undefined,
      ip,
    });

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Email service not configured (RESEND_API_KEY missing on server)." },
        { status: 500 }
      );
    }

    // Escape user input for HTML email body
    const escape = (s: string) =>
      s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Rawlins IC Website <contact@rawlinsic.com>",
        to: RECIPIENTS,
        subject: `New Contact Form: ${escape(name)}`,
        reply_to: email,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escape(name)}</p>
          <p><strong>Email:</strong> ${escape(email)}</p>
          <p><strong>Phone:</strong> ${phone ? escape(String(phone)) : "Not provided"}</p>
          <p><strong>Organization/Agency:</strong> ${organization ? escape(String(organization)) : "Not provided"}</p>
          <p><strong>Area of Interest:</strong> ${interest ? escape(String(interest)) : "Not specified"}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${escape(message).replace(/\n/g, "<br />")}</p>
        `,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", JSON.stringify(data));
      const message =
        (data && (data.message || data.error || data.name)) ||
        `Resend returned status ${res.status}`;
      return NextResponse.json(
        { error: `Email send failed: ${message}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Server error: ${message}` },
      { status: 500 }
    );
  }
}

/**
 * Diagnostic GET endpoint. Hit /api/contact in a browser to verify
 * the server-side configuration without exposing any secret values.
 * Returns: API key presence, recipient count, and from address.
 */
export async function GET() {
  return NextResponse.json({
    resendKeyPresent: Boolean(process.env.RESEND_API_KEY),
    convexUrlPresent: Boolean(process.env.NEXT_PUBLIC_CONVEX_URL),
    recipientCount: RECIPIENTS.length,
    fromAddress: "Rawlins IC Website <contact@rawlinsic.com>",
  });
}
