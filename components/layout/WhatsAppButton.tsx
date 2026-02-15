
import { Phone } from "lucide-react";

export function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/917600134687"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
            aria-label="Chat on WhatsApp"
        >
            <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75"></div>
            <Phone className="w-6 h-6 relative z-10 fill-current" />
            <span className="absolute right-full mr-4 bg-white text-black px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                Chat with us
            </span>
        </a>
    );
}
