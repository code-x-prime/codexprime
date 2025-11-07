import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const ALLOWED_ORIGINS =
  process.env.NEXT_PUBLIC_ALLOWED_ORIGINS?.split(",") || [];

function corsHeaders(origin: string | null) {
  const allowed =
    origin && ALLOWED_ORIGINS.includes(origin)
      ? origin
      : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
}

export function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}

const transporter = nodemailer.createTransport({
  host: process.env.NEXT_PUBLIC_SMTP_HOST,
  port: Number(process.env.NEXT_PUBLIC_SMTP_PORT || 465),
  secure: true,
  auth: {
    user: process.env.NEXT_PUBLIC_SMTP_USER,
    pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
  },
});

// 🌟 Professional ADMIN Template
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
      body { background:#f5f5f5; font-family:'Segoe UI',Arial,sans-serif; margin:0; padding:30px; }
      .card { background:#fff; max-width:700px; margin:auto; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1); }
      .header { background:#000; color:#fff; text-align:center; padding:20px 0; }
      .header h2 { margin:0; font-size:22px; letter-spacing:1px; }
      .content { padding:28px; color:#111; line-height:1.6; }
      .field { margin-bottom:18px; }
      .label { font-weight:600; color:#333; }
      .value { background:#fafafa; border-left:4px solid #000; padding:10px 14px; margin-top:5px; border-radius:6px; }
      .footer { background:#fafafa; padding:16px 22px; font-size:13px; color:#555; border-top:1px solid #eee; text-align:center; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header">
        <h2>📩 New Contact Form Submission</h2>
      </div>
      <div class="content">
        <div class="field"><div class="label">👤 Name:</div><div class="value">${name}</div></div>
        <div class="field"><div class="label">📧 Email:</div><div class="value">${email}</div></div>
        <div class="field"><div class="label">📱 Mobile:</div><div class="value">${mobileNumber}</div></div>
        ${age
      ? `<div class="field"><div class="label">🎂 Age:</div><div class="value">${age}</div></div>`
      : ""
    }
        <div class="field"><div class="label">💬 Message:</div><div class="value">${message.replace(
      /\n/g,
      "<br>"
    )}</div></div>

        <p style="font-size:12px;color:#666;margin-top:25px;text-align:right;">Submitted on: ${new Date().toLocaleString(
      "en-IN",
      { timeZone: "Asia/Kolkata" }
    )}</p>
      </div>

      <div class="footer">
        <strong>Code X Prime</strong><br/>
        Your Trusted IT Service Partner<br/>
        <span style="color:#000;">Web Development | Digital Marketing | Graphic Design | MVP Development</span><br/><br/>
        📞 +91 935 473 4436 • ✉️ <a href="mailto:hello@codexprime.in" style="color:#000;text-decoration:none;">hello@codexprime.in</a><br/>
        🌐 <a href="https://www.codexprime.in" style="color:#000;text-decoration:none;">www.codexprime.in</a><br/><br/>
        <em>We build digital experiences that grow your business.</em>
      </div>
    </div>
  </body>
  </html>`;
}

// 🌟 Professional CLIENT Template (With Signature)
function buildUserTemplate({
  name,
  message,
}: {
  name: string;
  message?: string;
}) {
  return `
  <html>
  <head>
    <meta charset="utf-8" />
    <style>
      body { background:#f5f5f5; font-family:'Segoe UI',Arial,sans-serif; margin:0; padding:30px; }
      .card { background:#fff; max-width:700px; margin:auto; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1); }
      .header { background:#000; color:#fff; text-align:center; padding:22px 0; }
      .header h2 { margin:0; font-size:22px; letter-spacing:1px; }
      .body { padding:28px; color:#111; line-height:1.7; }
      .message-box { background:#fafafa; border-left:4px solid #000; padding:14px 16px; margin:20px 0; border-radius:6px; color:#333; }
      .footer { background:#fafafa; padding:16px 22px; font-size:13px; color:#555; border-top:1px solid #eee; text-align:center; }
      a { color:#000; text-decoration:none; font-weight:500; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header">
        <h2>Thank You for Contacting Code X Prime</h2>
      </div>

      <div class="body">
        <p>Hi <strong>${name}</strong>,</p>
        <p>We’ve received your message and our team will get back to you within 24 business hours. Here’s a copy of your message:</p>

        <div class="message-box">${(message || "").replace(/\n/g, "<br>")}</div>

        <p>If this is urgent, feel free to call us at <strong>+91 935 473 4436</strong> or reply directly to this email.</p>

        <p style="margin-top:22px;">Best Regards,<br/><strong>The Code X Prime Team</strong></p>
      </div>

      <div class="footer">
        <strong>Code X Prime</strong><br/>
        Your Trusted IT Service Partner<br/>
        Web Development | Digital Marketing | Graphic Design | MVP Development<br/><br/>
        📞 +91 935 473 4436 • ✉️ <a href="mailto:hello@codexprime.in">hello@codexprime.in</a><br/>
        🌐 <a href="https://www.codexprime.in">www.codexprime.in</a><br/><br/>
        <em>We build digital experiences that grow your business.</em>
      </div>
    </div>
  </body>
  </html>`;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  try {
    const { name, email, mobileNumber, message, age } = await request.json();

    if (!name || !email || !mobileNumber || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    const adminRecipients =
      process.env.NEXT_PUBLIC_TO_EMAIL?.split(",") || [];

    // Send to Admin
    await transporter.sendMail({
      from: `"Code X Prime" <${process.env.NEXT_PUBLIC_FROM_EMAIL}>`,
      to: adminRecipients,
      subject: `New Contact: ${name} | ${mobileNumber}`,
      html: buildAdminTemplate({ name, email, mobileNumber, message, age }),
      replyTo: email,
    });

    // Send to Client
    await transporter.sendMail({
      from: `"Code X Prime" <${process.env.NEXT_PUBLIC_FROM_EMAIL}>`,
      to: email,
      subject: `Thanks for contacting Code X Prime`,
      html: buildUserTemplate({ name, message }),
    });

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200, headers: corsHeaders(origin) }
    );
  } catch (error) {
    console.error("Mail error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}
