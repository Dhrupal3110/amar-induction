"use client"

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendInquiry } from "@/app/actions";

// The initial state for our form
const initialState = {
  success: false,
  error: null as string | null,
};

// A helper component to manage the submit button's state
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      // --- Color Update: Button now uses the orange and red brand colors ---
      className="w-full bg-brand-orange text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-brand-red transition-colors duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed"
    >
      {pending ? "Submitting..." : "Submit Inquiry"}
    </button>
  );
}


export function InquiryForm() {
  const [state, formAction] = useActionState(sendInquiry, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {/* --- Color Update: Focus ring is now brand-orange --- */}
      <input type="text" name="name" required className="w-full px-4 py-3 bg-neutral-white border border-gray-200/70 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent" placeholder="Full Name *" />
      <input type="email" name="email" required className="w-full px-4 py-3 bg-neutral-white border border-gray-200/70 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent" placeholder="Email Address *" />
      <textarea name="message" rows={4} required className="w-full px-4 py-3 bg-neutral-white border border-gray-200/70 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent resize-vertical" placeholder="Your Message... *"></textarea>
      
      <SubmitButton />

      {/* --- User Feedback Messages --- */}
      {state.success && (
        <p className="text-green-600 font-semibold mt-4 text-center">
          Thank you! Your inquiry has been sent successfully.
        </p>
      )}
      {state.error && (
        <p className="text-red-600 font-semibold mt-4 text-center">
          {state.error}
        </p>
      )}
    </form>
  );
}