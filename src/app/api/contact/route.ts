import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, category, message } = body;

    if (!email || !name || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    await resend.emails.send({
      from: "My Hayat <hayat@myhayat.app>",
      to: "joemaari@gmail.com",
      subject: `[My Hayat] Contact: ${category || "General"} — ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #1a0a14; color: #f3f3f3; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #F85BAA, #F98181); padding: 24px 32px;">
            <h1 style="margin: 0; font-size: 24px; color: white;">💌 New Contact Message</h1>
          </div>
          <div style="padding: 32px;">
            <p style="margin: 0 0 8px;"><strong style="color: #FEC810;">From:</strong> ${name}</p>
            <p style="margin: 0 0 8px;"><strong style="color: #FEC810;">Email:</strong> ${email}</p>
            <p style="margin: 0 0 16px;"><strong style="color: #FEC810;">Category:</strong> ${category || "General"}</p>
            <div style="background: #251320; border-left: 4px solid #F85BAA; padding: 16px; border-radius: 8px;">
              <p style="margin: 0; line-height: 1.6;">${message}</p>
            </div>
          </div>
        </div>
      `,
    });

    // Send auto-reply to the user
    await resend.emails.send({
      from: "My Hayat <hayat@myhayat.app>",
      to: email,
      subject: "We received your message 💛 — My Hayat",
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #F85BAA, #FEC810); padding: 24px 32px; border-radius: 16px 16px 0 0;">
            <h1 style="margin: 0; font-size: 24px; color: white;">Thank you, ${name}! 💛</h1>
          </div>
          <div style="padding: 32px; background: #FFF9FC; border-radius: 0 0 16px 16px;">
            <p style="color: #333; line-height: 1.6;">We've received your message and our team will get back to you soon.</p>
            <p style="color: #333; line-height: 1.6;">In the meantime, remember — <strong style="color: #F85BAA;">you are not alone.</strong></p>
            <p style="color: #999; font-size: 14px; margin-top: 24px;">— The My Hayat Team 🌸</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: "Message sent!" }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
