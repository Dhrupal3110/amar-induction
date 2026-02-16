"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import type { Founder } from "@/lib/data";
import Image from "next/image";

interface FounderSectionProps {
    founder: Founder;
}

export function FounderSection({ founder }: FounderSectionProps) {
    return (
        <section className="py-16 bg-gradient-to-b from-neutral-950 to-neutral-900 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group relative bg-secondary rounded-2xl border border-white/5 p-6 md:p-10 overflow-hidden"
                    >
                        {/* Background Decorations */}
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <Quote size={200} className="text-primary rotate-12" />
                        </div>

                        <div className="relative z-10 grid md:grid-cols-[300px_1fr] gap-8 md:gap-12 items-center">
                            {/* Image Side */}
                            <div className="relative mx-auto md:mx-0">
                                <div className="relative w-64 h-64 md:w-full md:h-[350px] rounded-xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-primary/30 transition-colors duration-500 bg-neutral-800">
                                    {/* Placeholder for actual image */}
                                    <div className="w-full h-full flex items-center justify-center bg-neutral-800">
                                        <Image
                                            src={founder?.image || "/placeholder/hero-poster.jpg"}
                                            alt={founder.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    {/* <Image
                     src={founder.image}
                     alt={founder.name}
                     fill
                     className="object-cover transition-transform duration-700 group-hover:scale-105"
                   /> */}
                                </div>
                                {/* Decorative Elements */}
                                <div className="absolute -inset-4 border border-primary/20 rounded-2xl -z-10 translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-500" />
                            </div>

                            {/* Content Side */}
                            <div className="text-center md:text-left space-y-6">
                                <div>
                                    <h2 className="text-primary font-medium tracking-wide text-sm uppercase mb-2">
                                        Message from Leadership
                                    </h2>
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                        {founder.name}
                                    </h3>
                                    <p className="text-lg text-muted-foreground">{founder.role}</p>
                                </div>

                                <div className="relative">
                                    <Quote className="absolute -top-2 -left-4 text-primary/40 transform -scale-x-100 hidden md:block" size={24} />
                                    <p className="text-lg md:text-xl text-white/90 leading-relaxed italic relative z-10">
                                        "{founder.quote}"
                                    </p>
                                </div>

                                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                                    {founder.bio}
                                </p>

                                {/* Signature Placeholder */}
                                {/* <div className="pt-4 flex justify-center md:justify-start opacity-60">
                  <div className="h-12 w-32 bg-white/10 rounded animate-pulse" />
                </div> */}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
