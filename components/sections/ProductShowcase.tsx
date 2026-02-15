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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat, i) => (
                        <Link key={cat.slug} href={`/products?category=${cat.slug}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative h-[300px] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 hover:border-primary/50 transition-colors"
                            >
                                {/* Background Image Placeholder - In real app use cat.image */}
                                <div className="absolute inset-0 bg-neutral-900/50 group-hover:bg-neutral-900/70 transition-colors z-10"></div>
                                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 z-0"></div>

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                                    <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <cat.icon className="w-6 h-6" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                                        {cat.name}
                                    </h3>

                                    <p className="text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                        Explore {cat.name.toLowerCase()} systems &rarr;
                                    </p>
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
