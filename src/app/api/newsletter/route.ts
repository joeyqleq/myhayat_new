import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const subscribers: string[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (subscribers.includes(email)) {
      return NextResponse.json({ message: "Already subscribed!" }, { status: 200 });
    }

    subscribers.push(email);

    // Notify admin
    await resend.emails.send({
      from: "My Hayat <hayat@myhayat.app>",
      to: "joemaari@gmail.com",
      subject: `[My Hayat] New Newsletter Subscriber #${subscribers.length}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #1a0a14; color: #f3f3f3; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #F98181, #FEC810); padding: 24px 32px;">
            <h1 style="margin: 0; font-size: 24px; color: white;">📬 New Newsletter Subscriber</h1>
          </div>
          <div style="padding: 32px;">
            <p style="margin: 0 0 8px;"><strong style="color: #FEC810;">Email:</strong> ${email}</p>
            <p style="margin: 0;"><strong style="color: #FEC810;">Total subscribers:</strong> ${subscribers.length}</p>
          </div>
        </div>
      `,
    });

    // Send welcome to subscriber
    await resend.emails.send({
      from: "My Hayat <hayat@myhayat.app>",
      to: email,
      subject: "Welcome to the My Hayat Newsletter 🌸",
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #F98181, #FEC810); padding: 24px 32px; border-radius: 16px 16px 0 0;">
            <h1 style="margin: 0; font-size: 24px; color: white;">You're subscribed! 📬</h1>
          </div>
          <div style="padding: 32px; background: #FFF9FC; border-radius: 0 0 16px 16px;">
            <p style="color: #333; line-height: 1.6;">Thank you for subscribing to the My Hayat newsletter.</p>
            <p style="color: #333; line-height: 1.6;">You'll receive updates on our clinical research, mental health resources tailored for the Lebanese community, and exclusive early access announcements.</p>
            <p style="color: #999; font-size: 14px; margin-top: 24px;">— The My Hayat Team 💛</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: "Subscribed!" }, { status: 201 });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
