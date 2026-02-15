import { Hero } from "@/components/sections/Hero";
import { StatsCounter } from "@/components/sections/StatsCounter";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { FounderSection } from "@/components/sections/FounderSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import type { Founder, Testimonial } from "@/lib/data";

export default async function Home() {
  // Fetch Founder Data. 
  // Note: We use try-catch to prevent build failures if DB is empty or unreachable during build
  let founder: Founder | null = null;
  try {
    const founderDoc = await getDoc(doc(db, "settings", "founder"));
    founder = founderDoc.exists() ? (founderDoc.data() as Founder) : null;
  } catch (error) {
    console.error("Error fetching founder data:", error);
  }

  // Fetch Testimonials
  const testimonials: Testimonial[] = [];
  try {
    const testimonialsSnapshot = await getDocs(collection(db, "testimonials"));
    testimonialsSnapshot.forEach((doc) => {
      testimonials.push({ id: doc.id, ...doc.data() } as Testimonial);
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
  }

  return (
    <div className="flex flex-col">
      <Hero />
      <StatsCounter />
      <ProductShowcase />
      {founder && <FounderSection founder={founder} />}
      <Testimonials testimonials={testimonials} />
      <ContactCTA />
    </div>
  );
}