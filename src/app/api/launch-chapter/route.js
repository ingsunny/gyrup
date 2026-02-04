import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, email, region, city, pincode, token } = body;

    // 1. Verify Turnstile Token
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Captcha missing" },
        { status: 400 },
      );
    }

    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      },
    );

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return NextResponse.json(
        { success: false, message: "Captcha verification failed" },
        { status: 403 },
      );
    }

    // 2. Parse Recipients
    const recipients = process.env.RECIPIENT_EMAIL?.split(",").map((e) =>
      e.trim(),
    );

    if (!recipients?.length) {
      throw new Error("No recipient email configured");
    }

    // 3. Configure Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // True for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 4. Send Email (Premium Design)
    await transporter.sendMail({
      from: `"GYR UP Website" <${process.env.SMTP_USER}>`,
      to: recipients,
      replyTo: email,
      subject: `New Chapter Launch Request: ${city}`,
      html: `
      <div style="background:#f6f8fb;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">
                
                <tr>
                  <td style="background:#0e1d34;padding:24px 32px;">
                    <h1 style="margin:0;color:#ffffff;font-size:20px;letter-spacing:1px;">
                      GYR UP INTERNATIONAL
                    </h1>
                    <p style="margin:6px 0 0;color:#b8c2d6;font-size:12px;">
                      Expansion & Chapter Launch
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:32px;color:#1f2937;font-size:14px;line-height:1.6;">
                    
                    <p style="margin-top:0;">
                      We have received a new request to launch a chapter.
                    </p>

                    <div style="margin:20px 0;padding:14px 18px;background:#f1f5ff;border-left:4px solid #4f46e5;">
                      <strong>Target City:</strong> ${city} (${pincode})
                    </div>

                    <h3 style="margin:28px 0 10px;font-size:16px;color:#0e1d34;border-bottom:1px solid #eee;padding-bottom:10px;">
                      Applicant Details
                    </h3>

                    <table width="100%" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
                      <tr><td width="35%" style="color:#6b7280;">Name</td><td style="font-weight:bold;">${name}</td></tr>
                      <tr><td style="color:#6b7280;">Phone</td><td><a href="tel:${phone}" style="color:#4f46e5;text-decoration:none;">${phone}</a></td></tr>
                      <tr><td style="color:#6b7280;">Email</td><td><a href="mailto:${email}" style="color:#4f46e5;text-decoration:none;">${email}</a></td></tr>
                    </table>

                    <h3 style="margin:28px 0 10px;font-size:16px;color:#0e1d34;border-bottom:1px solid #eee;padding-bottom:10px;">
                      Location Details
                    </h3>

                    <table width="100%" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
                      <tr><td width="35%" style="color:#6b7280;">Region/State</td><td>${region}</td></tr>
                      <tr><td style="color:#6b7280;">City</td><td>${city}</td></tr>
                      <tr><td style="color:#6b7280;">Pincode</td><td>${pincode}</td></tr>
                    </table>

                  </td>
                </tr>

                <tr>
                  <td style="background:#f3f4f6;padding:18px 32px;font-size:12px;color:#6b7280;">
                    This request was verified via Cloudflare Turnstile.
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Request sent successfully",
    });
  } catch (error) {
    console.error("LAUNCH MAIL ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Email failed" },
      { status: 500 },
    );
  }
}
