"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export function ContactCTA() {
    return (
        <section className="py-24 bg-primary relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
            <div className="container mx-auto px-4 relative z-10 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    Ready to Upgrade Your Production?
                </h2>
                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                    Contact us today for a free consultation and quote. Our engineers are ready to design the perfect solution for your needs.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-primary bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-xl"
                    >
                        Get a Quote <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                    <a
                        href="https://wa.me/917600134687"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white border-2 border-white rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <Phone className="w-5 h-5 mr-2" /> WhatsApp Us
                    </a>
                </div>
            </div>
        </section>
    );
}
