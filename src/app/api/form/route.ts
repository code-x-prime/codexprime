// API route for /api/form (lowercase). Implementation follows.
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configure transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.NEXT_PUBLIC_SMTP_HOST,
  port: Number(process.env.NEXT_PUBLIC_SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.NEXT_PUBLIC_SMTP_USER,
    pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
  },
});

function buildAdminTemplate({ name, email, mobileNumber, message, age }: { name: string; email: string; mobileNumber: string; message: string; age?: string }) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>New Contact Form Submission - CodeXprime</title>
        <style>
          body { font-family: Arial, sans-serif; color: #111; }
          .container{ max-width:680px;margin:0 auto;padding:20px;background:#ffffff;border:1px solid #e6e6e6 }
          .header{ background:#111;padding:18px;color:#fff;text-align:center }
          .field{ margin:16px 0 }
          .label{ font-weight:700;color:#374151;margin-bottom:6px }
          .value{ background:#fafafa;padding:12px;border-left:4px solid #111 }
          a{ color: #111; text-decoration:none }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
            <p>CodeXprime</p>
          </div>

          <div class="field">
            <div class="label">Name</div>
            <div class="value">${name}</div>
          </div>

          <div class="field">
            <div class="label">Email</div>
            <div class="value">${email}</div>
          </div>

          <div class="field">
            <div class="label">Mobile Number</div>
            <div class="value">${mobileNumber}</div>
          </div>

          ${age ? `
          <div class="field">
            <div class="label">Age</div>
            <div class="value">${age}</div>
          </div>
          ` : ''}

          <div class="field">
            <div class="label">Message</div>
            <div class="value">${message.replace(/\n/g, "<br>")}</div>
          </div>

          <p style="font-size:12px;color:#666;margin-top:18px">Submitted on: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
          <div style="font-size:13px;color:#6b7280;margin-top:12px;border-top:1px solid #eee;padding-top:12px">Contact: +91 9354734436 • <a href="mailto:hello@codexprime.in">hello@codexprime.in</a></div>
        </div>
      </body>
    </html>
  `;
}

function buildUserTemplate({ name, message }: { name: string; message?: string }) {
  // A polished, responsive confirmation email for the user
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Thanks for contacting CodeXprime</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; background:#f9fafb; margin:0; padding:18px; }
          .card { max-width:680px; margin:0 auto; background:#ffffff; overflow:hidden; border:1px solid #e6e6e6 }
          .hero { background:#111; padding:20px; color:white; text-align:center }
          .logo { height:48px; display:inline-block; vertical-align:middle }
          .title { margin:8px 0 0; font-size:20px; font-weight:700 }
          .body { padding:20px; color:#111827; }
          .greeting { font-size:18px; margin:0 0 12px }
          .muted { color:#374151; font-size:14px }
          .message-box { background:#fafafa; border:1px solid #eee; padding:12px 14px; margin:14px 0; color:#374151; white-space:pre-wrap }
          .cta { display:block; text-align:center; margin:18px 0 }
          .btn { display:inline-block; background:#111; color:white; padding:10px 18px; text-decoration:none; font-weight:600 }
          .footer { padding:16px 18px; color:#6b7280; font-size:13px; text-align:center; border-top:1px solid #f1f1f1 }
          @media (max-width:520px){ .body{padding:16px} .hero{padding:16px} }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="hero">
            <div class="title">Thanks for contacting CodeXprime</div>
          </div>
          <div class="body">
            <p class="greeting">Hi ${name},</p>
            <p class="muted">Thanks for reaching out — we received your message and one of our team members will respond within 24 business hours. Below is a copy of your message for your records.</p>

            <div class="message-box">${(message || '').replace(/\n/g, '<br>')}</div>

           

            <p class="muted">If this is urgent, please call us at +91 9354734436 or reply directly to this email.</p>
          </div>
          <div class="footer">© ${new Date().getFullYear()} CodeXprime • Phone: +91 9354734436 • Email: <a href="mailto:hello@codexprime.in">hello@codexprime.in</a></div>
        </div>
      </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    // Ensure SMTP config exists
    if (!process.env.NEXT_PUBLIC_SMTP_HOST || !process.env.NEXT_PUBLIC_SMTP_USER || !process.env.NEXT_PUBLIC_SMTP_PASSWORD) {
      console.error("Missing SMTP environment variables");
      return NextResponse.json({ error: "Email service configuration error" }, { status: 500 });
    }

    const payload = await request.json();
    const { name, email, mobileNumber, message, age } = payload;

    // Basic validation
    if (!name || !email || !mobileNumber || !message) {
      return NextResponse.json({ error: "Please fill in all required fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    if (String(mobileNumber).replace(/\D/g, '').length < 10) {
      return NextResponse.json({ error: "Please enter a valid mobile number" }, { status: 400 });
    }

    // Build and send admin email (include optional age)
    const adminHtml = buildAdminTemplate({ name, email, mobileNumber, message, age });
    const adminMail = {
      from: process.env.NEXT_PUBLIC_FROM_EMAIL,
      to: process.env.NEXT_PUBLIC_TO_EMAIL,
      subject: `New Contact: ${name} | ${mobileNumber}`,
      html: adminHtml,
      replyTo: email,
    };

    await transporter.sendMail(adminMail);

    // Send confirmation email to user (if allowed)
    try {
      const userHtml = buildUserTemplate({ name, message });
      const userMail = {
        from: process.env.NEXT_PUBLIC_FROM_EMAIL,
        to: email,
        subject: `We've received your message — CodeXprime`,
        html: userHtml,
      };

      await transporter.sendMail(userMail);
    } catch (uErr: unknown) {
      // Log user mail failure but don't fail the whole request
      const u = uErr as Record<string, unknown>;
      const msg = uErr && typeof uErr === 'object' && 'message' in u ? String(u.message) : String(uErr);
      console.warn('User confirmation email failed:', msg);
    }

    return NextResponse.json({ success: true, message: "Your message has been sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 500 });
  }
}
