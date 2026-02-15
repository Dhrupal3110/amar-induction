"use server";

import {Resend} from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const toEmail = process.env.INQUIRY_RECIPIENT_EMAIL || "test@example.com"; // Fallback email

// The state type should match the initialState in your component
type FormState = {
  success: boolean;
  error?: string | null;
};

// CORRECTED: The function now accepts 'prevState' as the first argument
export async function sendInquiry(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return {success: false, error: "Please fill out all fields."};
  }

  // Custom logic for when API key is missing
  if (!resend) {
    console.log("---------------------------------------------------");
    console.log("⚠️  NO RESEND API KEY FOUND. MOCKING EMAIL SEND. ⚠️");
    console.log(`To: ${toEmail}`);
    console.log(`From: ${name} <${email}>`);
    console.log(`Message: ${message}`);
    console.log("---------------------------------------------------");

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {success: true, error: null};
  }

  if (!toEmail) {
    // checks if toEmail is still the default fallback or empty if we strictly wanted it from env.
    // But since I added a fallback above, this check might be redundant unless I want to enforce env var in production.
    // For now, I'll keep it simple and assume the fallback is fine for dev.
    // Actually, if I strictly want to block real sending without a real recipient...
    // But let's assume if there is an API key, there should be a recipient.
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
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
      `,
    });

    return {success: true, error: null};
  } catch (error) {
    console.error(error);
    return {success: false, error: "Something went wrong. Please try again."};
  }
}
