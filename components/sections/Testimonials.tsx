"use client";

import type { Testimonial } from "@/lib/data";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface TestimonialsProps {
    testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
    return (
        <section className="py-24 bg-neutral-900 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">Testimonials</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white">Trusted by Industry Leaders</h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-neutral-950 border border-white/10 p-8 rounded-xl shadow-lg relative group hover:-translate-y-2 transition-transform duration-300"
                        >
                            <Quote className="absolute top-8 right-8 text-primary/20 w-10 h-10 group-hover:text-primary/40 transition-colors" />

                            <div className="flex gap-1 mb-6">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                                ))}
                            </div>

                            <p className="text-gray-400 mb-6 leading-relaxed">
                                "{t.content}"
                            </p>

                            <div className="mt-auto">
                                <h4 className="font-bold text-white">{t.name}</h4>
                                <p className="text-sm text-primary">{t.company}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
