
import { products } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Phone, Mail } from "lucide-react";
import type { Metadata } from 'next';

// 1. Generate Static Params for all products
export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

// 2. Generate Metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = await params;
    const product = products.find((p) => p.slug === slug);

    if (!product) {
        return { title: 'Product Not Found' };
    }

    return {
        title: `${product.title} | Amar Induction`,
        description: product.shortDescription,
    }
}

// 3. Page Component
export default async function ProductPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const product = products.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="pt-24 pb-20">
            <div className="container mx-auto px-4">
                {/* Breadcrumb / Back */}
                <Link href="/products" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
                </Link>

                <div className="grid lg:grid-cols-2 gap-12 mb-20">
                    {/* Image Section */}
                    <div>
                        <div className="aspect-[4/3] bg-secondary rounded-xl overflow-hidden mb-4 border border-border">
                            {/* Placeholder */}
                            <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-neutral-500">
                                Main Image: {product.title}
                            </div>
                        </div>
                        {/* Thumbnails if multiple images */}
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img, i) => (
                                <div key={i} className="aspect-square bg-secondary rounded-lg border border-border cursor-pointer hover:border-primary">
                                    {/* Thumb */}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Info Section */}
                    <div>
                        <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">{product.category} Series</span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{product.title}</h1>
                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                            {product.fullDescription}
                        </p>

                        <div className="bg-card border border-border rounded-xl p-8 mb-8">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                Key Features
                            </h3>
                            <ul className="space-y-3">
                                {product.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-foreground/90">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href={`/contact?product=${product.slug}`}
                                className="flex-1 bg-primary text-white font-bold py-4 px-8 rounded-lg text-center hover:bg-orange-600 transition-colors shadow-lg shadow-primary/20"
                            >
                                Request Quote
                            </Link>
                            <a
                                href="https://wa.me/917600134687"
                                target="_blank"
                                className="flex-1 border border-border text-foreground font-bold py-4 px-8 rounded-lg text-center hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                            >
                                <Phone className="w-4 h-4" /> WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

                {/* Specifications Table */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold mb-8 text-center">Technical Specifications</h2>
                    <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                            {Object.entries(product.specifications).map(([key, value], i) => (
                                <div key={key} className={`flex flex-col p-6 ${i % 2 === 0 ? 'bg-secondary/30' : ''}`}>
                                    <span className="text-sm text-muted-foreground uppercase font-semibold mb-1">{key}</span>
                                    <span className="text-lg font-medium text-foreground">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Applications */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-8">Industry Applications</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {product.applications.map((app, i) => (
                            <span key={i} className="px-6 py-3 rounded-full bg-secondary border border-border text-foreground font-medium">
                                {app}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
