"use server"

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.INQUIRY_RECIPIENT_EMAIL;

// The state type should match the initialState in your component
type FormState = {
  success: boolean;
  error?: string | null;
};

// CORRECTED: The function now accepts 'prevState' as the first argument
export async function sendInquiry(prevState: FormState, formData: FormData): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Please fill out all fields." };
  }
  
  if (!toEmail) {
    console.error("INQUIRY_RECIPIENT_EMAIL is not set in .env.local");
    return { success: false, error: "Server configuration error." };
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: toEmail,
      subject: `New Inquiry from ${name} on Amar Induction Website`,
      replyTo: email,
      html: `
        <h1>New Website Inquiry</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    return { success: true, error: null };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}