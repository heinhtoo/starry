import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { render } from "@react-email/render";
import { MagicLinkEmail } from "@/emails/magic-link";

export async function POST(req: NextRequest) {
  try {
    console.log("WTF");
    const { email, url } = await req.json();

    const options: SMTPTransport.Options = {
      host: process.env.AUTH_MAIL_HOST ?? "",
      port: process.env.AUTH_MAIL_PORT
        ? parseInt(process.env.AUTH_MAIL_PORT)
        : undefined,
      secure: false,
      auth: {
        user: process.env.AUTH_MAIL_FROM,
        pass: process.env.AUTH_MAIL_PWD,
      },
    };

    const transporter = nodemailer.createTransport(options);

    const emailHtml = await render(MagicLinkEmail({ magicLink: url }));

    const message = {
      to: email,
      from: process.env.AUTH_MAIL_FROM,
      subject: "Sign in to your account",
      text: `Sign in by clicking this link: ${url}`,
      html: emailHtml,
    };

    await transporter.sendMail(message);
    return Response.json({ message: "Email sent successfully." });
  } catch (error) {
    console.log(error);
    throw Error("Failed to send email");
  }
}
