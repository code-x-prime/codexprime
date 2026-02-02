import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const ALLOWED_ORIGINS = [
  "https://codexprime.in",
  "https://www.codexprime.in",
  "https://landing.codexprime.in",
  "http://localhost:3000",
  "http://localhost:3001",
];

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.NEXT_PUBLIC_SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.NEXT_PUBLIC_SMTP_USER,
    pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
  },
});

// 🌟 ADMIN TEMPLATE
function buildAdminTemplate({
  name,
  email,
  mobileNumber,
  message,
  age,
}: {
  name: string;
  email: string;
  mobileNumber: string;
  message: string;
  age?: string;
}) {
  return `
  <html>
  <head>
    <meta charset="utf-8" />
    <style>
      body { background:#fff; font-family:'Segoe UI',Arial,sans-serif; margin:0; padding:20px; }
      .header { background:#000; color:#fff; text-align:center; padding:15px 0; }
      .content { padding:20px; color:#111; line-height:1.6; }
      .field { margin-bottom:14px; }
      .label { font-weight:600; color:#333; }
      .value { background:#fafafa; border-left:3px solid #000; padding:8px 10px; margin-top:5px; }
      .footer { background:#fafafa; padding:14px; font-size:13px; color:#555; text-align:center; border-top:1px solid #eee; }
    </style>
  </head>
  <body>
    <div class="header"><h2>📩 New Contact Form Submission</h2></div>
    <div class="content">
      <div class="field"><div class="label">👤 Name:</div><div class="value">${name}</div></div>
      <div class="field"><div class="label">📧 Email:</div><div class="value">${email}</div></div>
      <div class="field"><div class="label">📱 Mobile:</div><div class="value">${mobileNumber}</div></div>
      ${age ? `<div class="field"><div class="label">🎂 Age:</div><div class="value">${age}</div></div>` : ""}
      <div class="field"><div class="label">💬 Message:</div><div class="value">${message.replace(/\n/g, "<br>")}</div></div>
      <p style="font-size:12px;color:#777;text-align:right;">Submitted: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
    </div>
    <div class="footer">
      <strong>Code X Prime</strong><br/>
      Your Trusted IT Service Partner<br/>
      Web Development | Digital Marketing | Graphic Design | MVP Development<br/><br/>
      📞 +91 935 473 4436 • ✉️ hello@codexprime.in<br/>
      🌐 www.codexprime.in<br/>
      <em>We build digital experiences that grow your business.</em>
    </div>
  </body>
  </html>`;
}

// 🌟 CLIENT TEMPLATE
function buildUserTemplate({ name, message }: { name: string; message?: string }) {
  return `
  <html>
  <head>
    <meta charset="utf-8" />
    <style>
      body { background:#fff; font-family:'Segoe UI',Arial,sans-serif; margin:0; padding:20px; }
      .header { background:#000; color:#fff; text-align:center; padding:15px 0; }
      .body { padding:20px; color:#111; line-height:1.7; }
      .message-box { background:#fafafa; border-left:3px solid #000; padding:10px 12px; margin:20px 0; color:#333; }
      .footer { background:#fafafa; padding:14px; font-size:13px; color:#555; text-align:center; border-top:1px solid #eee; }
    </style>
  </head>
  <body>
    <div class="header"><h2>Thank You for Contacting Code X Prime</h2></div>
    <div class="body">
      <p>Hi <strong>${name}</strong>,</p>
      <p>We've received your message and our team will get back to you soon. Here's your message:</p>
      <div class="message-box">${(message || "").replace(/\n/g, "<br>")}</div>
      <p>If this is urgent, call us at <strong>+91 935 473 4436</strong> or reply to this email.</p>
      <p>Best Regards,<br/><strong>The Code X Prime Team</strong></p>
    </div>
    <div class="footer">
      <strong>Code X Prime</strong><br/>
      Your Trusted IT Service Partner<br/>
      Web Development | Digital Marketing | Graphic Design | MVP Development<br/><br/>
      📞 +91 935 473 4436 • ✉️ hello@codexprime.in<br/>
      🌐 www.codexprime.in<br/>
      <em>We build digital experiences that grow your business.</em>
    </div>
  </body>
  </html>`;
}

// 🔧 CORS Headers Helper
function setCorsHeaders(response: NextResponse, origin: string | null): NextResponse {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    response.headers.set("Access-Control-Max-Age", "86400"); // 24 hours
  }
  return response;
}

// ✅ Handle OPTIONS (Preflight Request)
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  const response = NextResponse.json({}, { status: 200 });
  return setCorsHeaders(response, origin);
}

// ✅ Handle POST
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");

  // Check if origin is allowed
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    const response = NextResponse.json(
      { error: "CORS policy: Origin not allowed" },
      { status: 403 }
    );
    return response;
  }

  try {
    const { name, email, mobileNumber, message, age } = await request.json();

    if (!name || !email || !mobileNumber || !message) {
      const response = NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
      return setCorsHeaders(response, origin);
    }

    const adminRecipients = process.env.NEXT_PUBLIC_TO_EMAIL?.split(",") || [];

    // 📨 Send both mails in parallel
    await Promise.all([
      transporter.sendMail({
        from: `"Code X Prime" <${process.env.NEXT_PUBLIC_FROM_EMAIL}>`,
        to: adminRecipients,
        subject: `New Contact: ${name} | ${mobileNumber}`,
        html: buildAdminTemplate({ name, email, mobileNumber, message, age }),
        replyTo: email,
      }),
      transporter.sendMail({
        from: `"Code X Prime" <${process.env.NEXT_PUBLIC_FROM_EMAIL}>`,
        to: email,
        subject: `Thanks for contacting Code X Prime`,
        html: buildUserTemplate({ name, message }),
      }),
    ]);

    const response = NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
    return setCorsHeaders(response, origin);
  } catch (error) {
    console.error("Mail error:", error);
    const response = NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
    return setCorsHeaders(response, origin);
  }
}