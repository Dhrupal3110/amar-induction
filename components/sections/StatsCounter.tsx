"use client";

import { useRef } from "react";
import { stats } from "@/lib/data";
import { motion, useInView } from "framer-motion";

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Simple counter animation logic or use a library like react-countup if installed
    // For now, simpler CSS transition or just static number with motion
    return (
        <span ref={ref} className="text-5xl md:text-6xl font-bold text-primary block mb-2">
            {/* Visual simplification: Display full value immediately if in view for now, 
          in real imp use framer-motion useSpring/useTransform for counting up */}
            {isInView ? value : 0}{suffix}
        </span>
    );
}

export function StatsCounter() {
    return (
        <section className="py-20 bg-secondary relative overflow-hidden">
            {/* Industrial background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="p-6 border border-white/5 rounded-2xl bg-white/5 backdrop-blur-sm hover:border-primary/30 transition-colors"
                        >
                            <Counter value={stat.value} suffix={stat.suffix} />
                            <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
