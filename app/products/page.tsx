"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { products, categories } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ArrowRight } from "lucide-react";

// Separate component to wrap in Suspense for useSearchParams
function ProductListContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentCategory = searchParams.get("category");

    const filteredProducts = useMemo(() => {
        if (!currentCategory) return products;
        return products.filter(
            (p) => p.category.toLowerCase() === currentCategory.toLowerCase() ||
                categories.find(c => c.slug === currentCategory)?.name === p.category
        );
    }, [currentCategory]);

    const handleCategoryChange = (slug: string | null) => {
        if (slug) {
            router.push(`/products?category=${slug}`);
        } else {
            router.push("/products");
        }
    };

    return (
        <div className="container mx-auto px-4 py-24">
            <div className="flex flex-col md:flex-row gap-12">
                {/* Sidebar Filter */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="sticky top-24">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Filter className="w-5 h-5 text-primary" /> Filter by Category
                        </h3>
                        <div className="space-y-2">
                            <button
                                onClick={() => handleCategoryChange(null)}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${!currentCategory
                                        ? "bg-primary text-white font-bold"
                                        : "hover:bg-accent text-muted-foreground"
                                    }`}
                            >
                                All Products
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.slug}
                                    onClick={() => handleCategoryChange(cat.slug)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${currentCategory === cat.slug
                                            ? "bg-primary text-white font-bold"
                                            : "hover:bg-accent text-muted-foreground"
                                        }`}
                                >
                                    <cat.icon className="w-4 h-4" />
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-grow">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">
                            {currentCategory
                                ? `${categories.find(c => c.slug === currentCategory)?.name} Solutions`
                                : "All Products"
                            }
                        </h1>
                        <p className="text-muted-foreground">
                            Showing {filteredProducts.length} results
                        </p>
                    </div>

                    <motion.div
                        layout
                        className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
                    >
                        <AnimatePresence>
                            {filteredProducts.map((product) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    key={product.id}
                                    className="group border border-border bg-card rounded-xl overflow-hidden hover:border-primary/50 transition-all shadow-lg hover:shadow-primary/10"
                                >
                                    <div className="h-64 bg-secondary relative overflow-hidden">
                                        {/* Placeholder image logic */}
                                        <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-600">
                                            Image: {product.title}
                                        </div>
                                        {/* <img 
                            src={product.images[0]} 
                            alt={product.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        /> */}
                                        <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                                            {product.category}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                            {product.title}
                                        </h3>
                                        <p className="text-muted-foreground mb-6 line-clamp-2">
                                            {product.shortDescription}
                                        </p>

                                        <div className="space-y-4 mb-6">
                                            {product.features.slice(0, 3).map((feat, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                    {feat}
                                                </div>
                                            ))}
                                        </div>

                                        <Link
                                            href={`/products/${product.slug}`}
                                            className="inline-flex items-center font-bold text-primary hover:gap-2 transition-all"
                                        >
                                            View Specifications <ArrowRight className="w-4 h-4 ml-1" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredProducts.length === 0 && (
                        <div className="py-20 text-center text-muted-foreground">
                            No products found in this category.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-24 text-center">Loading Products...</div>}>
            <ProductListContent />
        </Suspense>
    )
}
