import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory store for MVP (would be database in production)
const waitlist: string[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (waitlist.includes(email)) {
      return NextResponse.json({ message: "Already on waitlist!" }, { status: 200 });
    }

    waitlist.push(email);

    // Notify admin
    await resend.emails.send({
      from: "My Hayat <hayat@myhayat.app>",
      to: "joemaari@gmail.com",
      subject: `[My Hayat] New Waitlist Signup #${waitlist.length}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #1a0a14; color: #f3f3f3; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #FEC810, #F85BAA); padding: 24px 32px;">
            <h1 style="margin: 0; font-size: 24px; color: white;">🎉 New Waitlist Signup</h1>
          </div>
          <div style="padding: 32px;">
            <p style="margin: 0 0 8px;"><strong style="color: #FEC810;">Email:</strong> ${email}</p>
            <p style="margin: 0;"><strong style="color: #FEC810;">Total signups:</strong> ${waitlist.length}</p>
          </div>
        </div>
      `,
    });

    // Send confirmation to user
    await resend.emails.send({
      from: "My Hayat <hayat@myhayat.app>",
      to: email,
      subject: "You're on the list! 💛 — My Hayat",
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #FEC810, #F85BAA); padding: 24px 32px; border-radius: 16px 16px 0 0;">
            <h1 style="margin: 0; font-size: 24px; color: white;">Welcome to the family! 🌸</h1>
          </div>
          <div style="padding: 32px; background: #FFF9FC; border-radius: 0 0 16px 16px;">
            <p style="color: #333; line-height: 1.6;">You've been added to the My Hayat early access waitlist.</p>
            <p style="color: #333; line-height: 1.6;">We're building the first AI mental health companion designed specifically for the Lebanese community — trained on real anonymized clinical data by our team of Lebanese psychologists and psychiatrists.</p>
            <p style="color: #333; line-height: 1.6;">We'll reach out soon with exclusive early access. 💛</p>
            <p style="color: #999; font-size: 14px; margin-top: 24px;">— The My Hayat Team</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: "Added to waitlist!", count: waitlist.length }, { status: 201 });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
