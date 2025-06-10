"use client"

import { useActionState } from "react"; // <-- CORRECT: Imported from 'react'
import { useFormStatus } from "react-dom"; // Note: useFormStatus stays in react-dom for now
import { sendInquiry } from "@/app/actions"; // Adjust path if needed

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
      className="w-full bg-brand-purple text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-brand-blue transition-colors duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed"
    >
      {pending ? "Submitting..." : "Submit Inquiry"}
    </button>
  );
}


export function InquiryForm() {
  // --- The Fix: Renamed useFormState to useActionState ---
  const [state, formAction] = useActionState(sendInquiry, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input type="text" name="name" required className="w-full px-4 py-3 bg-neutral-gray border-transparent rounded-lg focus:ring-2 focus:ring-brand-purple" placeholder="Full Name *" />
      <input type="email" name="email" required className="w-full px-4 py-3 bg-neutral-gray border-transparent rounded-lg focus:ring-2 focus:ring-brand-purple" placeholder="Email Address *" />
      <textarea name="message" rows={4} required className="w-full px-4 py-3 bg-neutral-gray border-transparent rounded-lg focus:ring-2 focus:ring-brand-purple resize-vertical" placeholder="Your Message... *"></textarea>
      
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