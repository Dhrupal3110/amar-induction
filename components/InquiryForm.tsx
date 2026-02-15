"use client"

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendInquiry } from "@/app/actions";
import { cn } from "@/lib/utils";

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
      className="w-full bg-primary text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-brand-red transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:bg-muted disabled:scale-100 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
    >
      {pending ? "Submitting Request..." : "Submit Inquiry"}
    </button>
  );
}

export function InquiryForm({ className }: { className?: string }) {
  const [state, formAction] = useActionState(sendInquiry, initialState);

  return (
    <form action={formAction} className={cn("space-y-6", className)}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-muted-foreground/50"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-muted-foreground/50"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Your Message</label>
        <textarea
          name="message"
          id="message"
          rows={5}
          required
          className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-muted-foreground/50 resize-y"
          placeholder="Tell us about your requirements..."
        ></textarea>
      </div>

      <SubmitButton />

      {/* --- User Feedback Messages --- */}
      {state.success && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 text-center font-medium animate-fade-in">
          Thank you! Your inquiry has been sent successfully. Our team will contact you shortly.
        </div>
      )}
      {state.error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-center font-medium animate-fade-in">
          {state.error}
        </div>
      )}
    </form>
  );
}