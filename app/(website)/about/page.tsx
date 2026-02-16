
import { FounderSection } from "@/components/sections/FounderSection";
import { StatsCounter } from "@/components/sections/StatsCounter";
import { Testimonials } from "@/components/sections/Testimonials";
import { Factory, Globe, ShieldCheck, Users } from "lucide-react";
import type { Metadata } from 'next';
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { Founder, Testimonial } from "@/lib/data";

export const metadata: Metadata = {
    title: "About Us | Amar Induction",
    description: "Learn about Amar Induction's journey, mission, and commitment to quality manufacturing.",
};

async function getFounderData(): Promise<Founder | null> {
    try {
        const docRef = doc(db, "settings", "founder");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as Founder;
        }
    } catch (error) {
        console.error("Error fetching founder data:", error);
    }
    return null;
}

async function getTestimonialsData(): Promise<Testimonial[]> {
    try {
        const testimonialsRef = collection(db, "testimonials");
        const snapshot = await getDocs(testimonialsRef);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Testimonial[];
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return [];
    }
}

export default async function AboutPage() {
    const founder = await getFounderData();
    const testimonials = await getTestimonialsData();

    return (
        <div>
            {/* Hero */}
            <section className="bg-secondary py-20 border-b border-border">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Amar Induction</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Engineering excellence since 1999. We are committed to powering the future of metal heat treatment.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="prose prose-invert max-w-none">
                            <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                To manufacture world-class induction heating equipment that delivers superior performance, energy efficiency, and reliability to our global clients. We strive to be the preferred partner for industries seeking advanced heat treatment solutions.
                            </p>
                            <h2 className="text-3xl font-bold text-primary mb-6">Our Vision</h2>
                            <p className="text-lg text-muted-foreground">
                                To become a global benchmark in the induction technology sector by continuously innovating and adhering to the highest standards of quality and customer service.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { icon: Factory, label: "State-of-the-Art Factory" },
                                { icon: Globe, label: "Global Export Network" },
                                { icon: ShieldCheck, label: "ISO 9001:2015 Certified" },
                                { icon: Users, label: "Expert Engineering Team" }
                            ].map((item, i) => (
                                <div key={i} className="bg-card border border-border p-6 rounded-xl flex flex-col items-center justify-center text-center hover:border-primary transition-colors">
                                    <item.icon className="w-10 h-10 text-primary mb-4" />
                                    <span className="font-bold text-foreground">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <StatsCounter />
            {founder && <FounderSection founder={founder} />}

            {/* Values Section */}
            <section className="py-20 bg-card border-t border-border">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-12 text-foreground">Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 bg-background rounded-xl">
                            <h3 className="text-xl font-bold text-primary mb-4">Innovation</h3>
                            <p className="text-muted-foreground">Constantly evolving our technology to meet the changing needs of the industry.</p>
                        </div>
                        <div className="p-8 bg-background rounded-xl">
                            <h3 className="text-xl font-bold text-primary mb-4">Quality</h3>
                            <p className="text-muted-foreground">Rigorous testing and quality control at every stage of manufacturing.</p>
                        </div>
                        <div className="p-8 bg-background rounded-xl">
                            <h3 className="text-xl font-bold text-primary mb-4">Integrity</h3>
                            <p className="text-muted-foreground">Building lasting relationships through transparent and honest business practices.</p>
                        </div>
                    </div>
                </div>
            </section>

            {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
        </div>
    );
}
