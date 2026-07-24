import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

type HelpRequestBody = {
  category?: string;
  details?: string;
  email?: string;
  honeypot?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatCategory(category: string) {
  const labels: Record<string, string> = {
    website: "Website or app",
    email: "Email or messages",
    account: "Account or login",
    device: "Phone or computer",
    other: "Something else",
  };
  return labels[category] || category;
}

function buildHelpText(params: {
  category: string;
  email: string;
  details: string;
}) {
  return [
    "New digital help request",
    "",
    `Category: ${formatCategory(params.category)}`,
    `Email: ${params.email}`,
    "",
    "Details:",
    params.details,
    "",
    "Sent from alecsdesign.xyz/help/request",
  ].join("\n");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    let body = req.body as HelpRequestBody | string | undefined;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body) as HelpRequestBody;
      } catch {
        body = {};
      }
    }

    const { category, details, email, honeypot } = body || {};
    const cleanCategory = typeof category === "string" ? category.trim() : "";
    const cleanDetails = typeof details === "string" ? details.trim() : "";
    const cleanEmail = typeof email === "string" ? email.trim() : "";
    const trapValue = typeof honeypot === "string" ? honeypot.trim() : "";

    if (trapValue) {
      return res.status(200).json({ success: true, message: "Received" });
    }

    if (!cleanCategory || !cleanDetails || !cleanEmail) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!cleanEmail.includes("@")) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    if (cleanDetails.length < 10) {
      return res.status(400).json({ error: "Message is too short" });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({
        error: "Server configuration error",
        details: "Email credentials not configured",
      });
    }

    const emailUser = process.env.EMAIL_USER.trim();
    const emailPass = process.env.EMAIL_PASS.trim();
    const host = (process.env.EMAIL_HOST || "mail.privateemail.com").trim();
    const port = parseInt(process.env.EMAIL_PORT || "465", 10);
    const secure = port === 465;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user: emailUser, pass: emailPass },
      tls: { rejectUnauthorized: true },
    });

    const safeCategory = escapeHtml(formatCategory(cleanCategory));
    const safeEmail = escapeHtml(cleanEmail);
    const safeDetails = escapeHtml(cleanDetails).replace(/\n/g, "<br />");
    const plainText = buildHelpText({
      category: cleanCategory,
      email: cleanEmail,
      details: cleanDetails,
    });

    await transporter.sendMail({
      from: `alecsdesign help <${emailUser}>`,
      to: "start@alecsdesign.xyz",
      replyTo: cleanEmail,
      subject: `[Help] ${formatCategory(cleanCategory)} request`,
      text: plainText,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; color: #0f172a; background: #ffffff;">
          <div style="padding: 24px 24px 8px; border-bottom: 3px solid #FF6321;">
            <p style="margin: 0 0 8px; color: #FF6321; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">Digital Help Request</p>
            <h2 style="margin: 0; font-size: 22px; line-height: 1.3;">New request from the help page</h2>
            <p style="margin: 8px 0 0; color: #64748b; font-size: 14px; line-height: 1.6;">This request came through the dedicated help form, not the main contact form.</p>
          </div>

          <div style="padding: 24px;">
            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 14px 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;">
                  <p style="margin: 0 0 6px; color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;">Category</p>
                  <p style="margin: 0; font-size: 16px; font-weight: 700; color: #0f172a;">${safeCategory}</p>
                </td>
              </tr>
            </table>

            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 14px 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;">
                  <p style="margin: 0 0 6px; color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;">Reply email</p>
                  <p style="margin: 0; font-size: 16px; font-weight: 700; color: #0f172a;">${safeEmail}</p>
                </td>
              </tr>
            </table>

            <div style="padding: 18px 16px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px;">
              <p style="margin: 0 0 8px; color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;">Problem details</p>
              <div style="color: #0f172a; font-size: 15px; line-height: 1.75; white-space: normal;">${safeDetails}</div>
            </div>

            <p style="margin: 20px 0 0; color: #94a3b8; font-size: 12px; line-height: 1.6;">Sent from alecsdesign.xyz/help/request</p>
          </div>
        </div>
     `,
    });

    return res.status(200).json({ success: true, message: "Request sent" });
  } catch (error) {
    console.error("Error sending help request:", error);
    let details = "Failed to send request";
    if (error instanceof Error && error.message) {
      details = error.message;
    }
    return res.status(500).json({ error: "Failed to send request", details });
  }
}
