import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, contact, business, needs, preference, message } = req.body;

    // Validate required fields
    if (!name || !contact || !business || !needs || !preference) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing environment variables:", {
        hasUser: !!process.env.EMAIL_USER,
        hasPass: !!process.env.EMAIL_PASS,
      });
      return res.status(500).json({
        error: "Server configuration error",
        details: "Email credentials not configured",
      });
    }

    // Create transporter using environment variables or default to Namecheap
    const host = process.env.EMAIL_HOST || "mail.privateemail.com";
    const port = parseInt(process.env.EMAIL_PORT || "465");
    const secure = port === 465;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "start@alecsdesign.xyz",
      replyTo: contact,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 5px;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Contact:</strong> ${contact}</p>
            <p><strong>Preferred Contact Method:</strong> ${preference}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 5px;">Business Details</h3>
            <p><strong>Business Description:</strong></p>
            <p style="background: #f3f4f6; padding: 10px; border-radius: 5px;">${business}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 5px;">Project Information</h3>
            <p><strong>Service Needed:</strong> ${needs}</p>
          </div>

          ${
            message
              ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 5px;">Additional Message</h3>
            <p style="background: #f3f4f6; padding: 10px; border-radius: 5px;">${message}</p>
          </div>
          `
              : ""
          }

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>This email was sent from the contact form at alecsdesign.xyz</p>
          </div>
        </div>
      `,
    };

    // Verify transporter connection
    await transporter.verify();

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);

    // Provide detailed error information
    let errorMessage = "Failed to send email";
    let errorDetails = "Unknown error";

    if (error instanceof Error) {
      errorDetails = error.message;

      // Check for specific auth errors
      if (errorDetails.includes("Invalid login")) {
        errorMessage = "Email authentication failed";
        errorDetails =
          "Invalid credentials. Please check your email password.";
      } else if (errorDetails.includes("Username and Password not accepted")) {
        errorMessage = "Authentication failed";
        errorDetails =
          "The email server rejected the credentials. Please verify your password.";
      }
    }

    return res.status(500).json({
      error: errorMessage,
      details: errorDetails,
    });
  }
}
