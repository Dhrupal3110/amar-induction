"use client";

import Link from "next/link";
import { categories } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function ProductShowcase() {
    return (
        <section className="py-24 bg-neutral-950">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div className="max-w-2xl">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm">Our Solutions</span>
                        <h2 className="text-3xl md:text-5xl font-bold mt-2 text-white">
                            Engineered for <span className="text-primary">Performance</span>
                        </h2>
                        <p className="text-gray-400 mt-4 text-lg">
                            Discover our comprehensive range of induction heating solutions designed for efficiency and precision.
                        </p>
                    </div>
                    <Link
                        href="/products"
                        className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
                    >
                        View All Products <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat, i) => (
                        <Link key={cat.slug} href={`/products?category=${cat.slug}`} className="group">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative h-full min-h-[280px] p-8 rounded-3xl bg-neutral-900/40 border border-white/5 overflow-hidden transition-all duration-500 hover:border-primary/50 hover:bg-neutral-900/80 hover:shadow-[0_0_30px_-5px_var(--primary)]"
                            >
                                {/* Background Gradients */}
                                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-primary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Icon */}
                                    <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        <cat.icon className="w-7 h-7" />
                                    </div>

                                    {/* Text Content */}
                                    <div className="mt-auto">
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">
                                            {cat.name}
                                        </h3>
                                        <p className="text-neutral-400 text-base leading-relaxed mb-6 group-hover:text-neutral-300 transition-colors duration-300">
                                            Advanced {cat.name.toLowerCase()} solutions engineering for high efficiency.
                                        </p>

                                        <div className="flex items-center text-sm font-semibold text-primary/90 tracking-wide group-hover:text-primary transition-colors">
                                            Explore Solutions
                                            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-primary font-bold"
                    >
                        View All Products <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
