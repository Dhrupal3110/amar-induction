import {NextResponse} from "next/server";
import {db} from "@/lib/firebase";
import {collection, doc, setDoc, writeBatch} from "firebase/firestore";
import {products, founder, testimonials, faqs} from "@/lib/data";

export async function POST() {
  try {
    const batch = writeBatch(db);

    // Seed Products
    products.forEach((product) => {
      const productRef = doc(db, "products", product.id);
      batch.set(productRef, {
        ...product,
        createdAt: new Date().toISOString(),
      });
    });

    // Seed Founder (Single Document in 'settings' collection)
    const founderRef = doc(db, "settings", "founder");
    batch.set(founderRef, founder);

    // Seed Testimonials
    testimonials.forEach((t) => {
      const tRef = doc(db, "testimonials", t.id.toString());
      batch.set(tRef, t);
    });

    // Seed FAQs (optional, but good to have)
    // We can store them as individual documents or a single array in settings
    // Let's store individually for easier editing
    faqs.forEach((faq, index) => {
      const faqRef = doc(db, "faqs", `faq-${index}`);
      batch.set(faqRef, faq);
    });

    await batch.commit();

    return NextResponse.json({message: "Database seeded successfully!"});
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}
