import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const turnstileToken = formData.get("cf_turnstile_token");

    if (!turnstileToken) {
      return Response.json(
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
          response: turnstileToken.toString(),
        }),
      },
    );

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return Response.json(
        { success: false, message: "Captcha verification failed" },
        { status: 403 },
      );
    }

    const fullname = formData.get("fullname");
    const businessname = formData.get("businessname");
    const category = formData.get("category");
    const turnover = formData.get("turnover");
    const years = formData.get("years");
    const cibil = formData.get("cibil");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const location = formData.get("location");
    const reason = formData.get("reason");
    const membershipClicked = formData.get("membershipClicked");

    const MAX_SIZE = 2 * 1024 * 1024; // 2MB

    const files = formData.getAll("companyFiles");

    for (const file of files) {
      if (file.size > MAX_SIZE) {
        return NextResponse.json(
          {
            success: false,
            message: `File "${file.name}" exceeds 2MB limit`,
          },
          { status: 400 },
        );
      }
    }

    const attachments = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();

        return {
          filename: file.name,
          content: Buffer.from(arrayBuffer),
          contentType: file.type,
        };
      }),
    );

    // ✅ parse recipients correctly
    const recipients = process.env.RECIPIENT_EMAIL?.split(",").map((e) =>
      e.trim(),
    );

    if (!recipients?.length) {
      throw new Error("No recipient email configured");
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"GYR UP Website" <${process.env.SMTP_USER}>`,
      to: recipients,
      replyTo: email,
      subject: `New Membership Application: ${fullname}`,
      html: `
  <div style="background:#f6f8fb;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

            <!-- HEADER -->
            <tr>
              <td style="background:#0e1d34;padding:24px 32px;">
                <h1 style="margin:0;color:#ffffff;font-size:20px;letter-spacing:1px;">
                  GYR UP INTERNATIONAL
                </h1>
                <p style="margin:6px 0 0;color:#b8c2d6;font-size:12px;">
                  New Membership Application
                </p>
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:32px;color:#1f2937;font-size:14px;line-height:1.6;">

                <p style="margin-top:0;">
                  A new membership application has been submitted through the website.
                </p>

                <div style="margin:20px 0;padding:14px 18px;background:#f1f5ff;border-left:4px solid #4f46e5;">
                  <strong>Selected Membership:</strong> ${membershipClicked || "Not specified"}
                </div>

                <!-- APPLICANT -->
                <h3 style="margin:28px 0 10px;font-size:16px;color:#0e1d34;">
                  Applicant Details
                </h3>

                <table width="100%" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
                  <tr><td width="35%"><strong>Name</strong></td><td>${fullname}</td></tr>
                  <tr><td><strong>Business</strong></td><td>${businessname}</td></tr>
                  <tr><td><strong>Category</strong></td><td>${category}</td></tr>
                  <tr><td><strong>Email</strong></td><td>${email}</td></tr>
                  <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
                  <tr><td><strong>Location</strong></td><td>${location}</td></tr>
                </table>

                <!-- BUSINESS -->
                <h3 style="margin:28px 0 10px;font-size:16px;color:#0e1d34;">
                  Business Information
                </h3>

                <table width="100%" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
                  <tr><td width="35%"><strong>Annual Turnover</strong></td><td>${turnover}</td></tr>
                  <tr><td><strong>Years in Business</strong></td><td>${years}</td></tr>
                  <tr><td><strong>CIBIL Score</strong></td><td>${cibil}</td></tr>
                </table>

                <!-- REASON -->
                <h3 style="margin:28px 0 10px;font-size:16px;color:#0e1d34;">
                  Reason for Joining
                </h3>

                <div style="background:#f9fafb;padding:14px 16px;border-radius:6px;">
                  ${reason || "Not provided"}
                </div>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background:#f3f4f6;padding:18px 32px;font-size:12px;color:#6b7280;">
                This application was submitted via the official GYR UP International website.
                <br />
                Please do not reply directly to this email.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
`,
      attachments,
    });

    return NextResponse.json({
      success: true,
      message: "Application sent successfully",
    });
  } catch (error) {
    console.error("MAIL ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Email failed" },
      { status: 500 },
    );
  }
}
