"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background - Video or Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-40"
                    poster="/placeholder/hero-poster.jpg" // Fallback
                >
                    {/* Replace with your actual video source */}
                    <source src="https://videos.pexels.com/video-files/5827660/5827660-uhd_2560_1440_24fps.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
            </div>

            <div className="container relative z-10 px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-primary text-sm font-semibold mb-6 backdrop-blur-sm">
                    </div>

                    <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                        Forging the Future of <br />
                        <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-400">
                            Metal Heat Treatment
                        </span>
                    </h1>

                    <p className="text-base md:text-2xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                        Advanced Induction Melting & Hardening Systems engineered for precision, efficiency, and industrial durability.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/products"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black transition-all bg-primary rounded-lg hover:bg-orange-600 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(234,91,33,0.5)]"
                        >
                            Explore Products
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:border-primary/50 backdrop-blur-sm"
                        >
                            Request a Quote
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50"
            >
                <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
            </motion.div>
        </section>
    );
}
