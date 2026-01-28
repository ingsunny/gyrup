import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const formData = await req.formData();

const turnstileToken = formData.get("cf_turnstile_token");

if (!turnstileToken) {
  return Response.json(
    { success: false, message: "Captcha missing" },
    { status: 400 }
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
      secret: process.env.TURNSTILE_SECRET_KEY!,
      response: turnstileToken.toString(),
    }),
  }
);

const verifyData = await verifyRes.json();

if (!verifyData.success) {
  return Response.json(
    { success: false, message: "Captcha verification failed" },
    { status: 403 }
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
        <h2>New Membership Application</h2>
        <p>Interested in ${membershipClicked}</p>

        <h3>Applicant</h3>
        <ul>
          <li>Name: ${fullname}</li>
          <li>Business: ${businessname}</li>
          <li>Category: ${category}</li>
          <li>Email: ${email}</li>
          <li>Phone: ${phone}</li>
          <li>Location: ${location}</li>
        </ul>

        <h3>Business</h3>
        <ul>
          <li>Turnover: ${turnover}</li>
          <li>Years: ${years}</li>
          <li>CIBIL: ${cibil}</li>
        </ul>

        <h3>Reason</h3>
        <p>${reason}</p>
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
