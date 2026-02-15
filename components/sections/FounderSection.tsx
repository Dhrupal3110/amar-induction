"use client";

import Image from "next/image";
import { founder } from "@/lib/data";
import { motion } from "framer-motion";

export function FounderSection() {
    return (
        <section className="py-24 bg-secondary overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/5] rounded-lg overflow-hidden border-2 border-primary/20">
                            {/* Use a placeholder if actual image not available */}
                            <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                                <span className="text-muted-foreground">Founder Image</span>
                            </div>
                            {/* <Image
                src={founder.image}
                alt={founder.name}
                fill
                className="object-cover"
              /> */}

                            {/* Decorative Frame */}
                            <div className="absolute inset-0 border-2 border-primary/20 translate-x-4 translate-y-4 -z-10 rounded-lg"></div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Meet the Visionary</h2>
                        <h3 className="text-xl text-primary font-medium mb-8">{founder.name} — {founder.role}</h3>

                        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                            <p className="italic text-white/90 border-l-4 border-primary pl-6 py-2 text-base md:text-lg">
                                "{founder.quote}"
                            </p>
                            <p className="text-base md:text-lg">{founder.bio}</p>
                        </div>

                        <div className="mt-10">
                            <img src="/signature-placeholder.png" alt="Signature" className="h-16 opacity-50 invert" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
