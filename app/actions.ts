"use server";

import {Resend} from "resend";
import {db} from "@/lib/firebase";
import {collection, addDoc} from "firebase/firestore";

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

  // Save to Firestore
  try {
    await addDoc(collection(db, "inquiries"), {
      name,
      email,
      message,
      status: "new",
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error saving inquiry to Firestore:", error);
    // Continue execution to try sending email even if DB save fails
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
