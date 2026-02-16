
import { InquiryForm } from "@/components/InquiryForm";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { socialLinks } from "@/lib/data";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Contact Us | Amar Induction",
    description: "Get in touch with Amar Induction for quotes, support, or general inquiries.",
};

export default function ContactPage() {
    return (
        <div>
            {/* Header */}
            <section className="bg-secondary py-20 border-b border-border">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Our team of engineers is ready to assist you with your induction heating requirements.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-20">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-2xl font-bold mb-8 text-foreground">Get In Touch</h2>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-1">Factory Address</h3>
                                    <p className="text-muted-foreground">
                                        Plot No.26/2, Oscar Industrial Park-2,<br />
                                        Ribda, Rajkot, Gujarat 360311, India
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-1">Phone Number</h3>
                                    <p className="text-muted-foreground">
                                        <a href="tel:+917600134687" className="hover:text-primary transition-colors">+91 76001 34687</a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-1">Email Address</h3>
                                    <p className="text-muted-foreground">
                                        <a href="mailto:sales@amarinduction.com" className="hover:text-primary transition-colors">sales@amarinduction.com</a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-1">Working Hours</h3>
                                    <p className="text-muted-foreground">
                                        Monday - Saturday: 9:00 AM - 6:00 PM<br />
                                        Sunday: Closed
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                                    <div className="grid grid-cols-2 gap-0.5">
                                        <div className="w-2 h-2 bg-current rounded-full" />
                                        <div className="w-2 h-2 bg-current rounded-full" />
                                        <div className="w-2 h-2 bg-current rounded-full" />
                                        <div className="w-2 h-2 bg-current rounded-full" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-3">Follow Us</h3>
                                    <div className="flex gap-4">
                                        {socialLinks.map((social, i) => (
                                            <a
                                                key={i}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all text-muted-foreground"
                                                aria-label={social.name}
                                            >
                                                <social.icon className="w-5 h-5" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Google Map Embed */}
                        <div className="mt-12 w-full h-64 bg-secondary rounded-xl overflow-hidden border border-border">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3696.531564909696!2d70.77310907638889!3d22.105699649918733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3958370038f3c033%3A0x8b732295fd1f4e5e!2sAmar%20Induction!5e0!3m2!1sen!2sin!4v1771165950413!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>

                        </div>
                    </div>

                    {/* Inquiry Form */}
                    <div className="bg-card border border-border rounded-xl p-8 shadow-xl">
                        <h2 className="text-2xl font-bold mb-6 text-foreground">Send an Inquiry</h2>
                        <InquiryForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
