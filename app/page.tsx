"use client";

import { Hero } from "@/components/sections/Hero";
import { StatsCounter } from "@/components/sections/StatsCounter";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { FounderSection } from "@/components/sections/FounderSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <StatsCounter />
      <ProductShowcase />
      <FounderSection />
      <Testimonials />
      <ContactCTA />
    </div>
  );
}