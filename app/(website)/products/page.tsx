"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { categories, type Product } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ArrowRight } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";


// Mobile Filter Component (Horizontal Scroll)
const MobileCategoryFilter = ({
    currentCategory,
    onCategoryChange
}: {
    currentCategory: string | null;
    onCategoryChange: (slug: string | null) => void;
}) => (
    <div className="flex gap-3 overflow-x-auto py-4 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <button
            onClick={() => onCategoryChange(null)}
            className={`whitespace-nowrap px-4 py-2 rounded-full border text-sm font-medium transition-colors ${!currentCategory
                ? "bg-primary text-white border-primary"
                : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"
                }`}
        >
            All Products
        </button>
        {categories.map((cat) => (
            <button
                key={cat.slug}
                onClick={() => onCategoryChange(cat.slug)}
                className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full border text-sm font-medium transition-colors ${currentCategory === cat.slug
                    ? "bg-primary text-white border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"
                    }`}
            >
                <cat.icon className="w-4 h-4" />
                {cat.name}
            </button>
        ))}
    </div>
);

// Desktop Filter Component (Vertical Sidebar)
const DesktopCategoryFilter = ({
    currentCategory,
    onCategoryChange
}: {
    currentCategory: string | null;
    onCategoryChange: (slug: string | null) => void;
}) => (
    <div className="space-y-2">
        <button
            onClick={() => onCategoryChange(null)}
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
                onClick={() => onCategoryChange(cat.slug)}
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
);

// Separate component to wrap in Suspense for useSearchParams
function ProductListContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentCategory = searchParams.get("category");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const fetchedProducts: Product[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedProducts.push(doc.data() as Product);
                });
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        if (!currentCategory) return products;
        return products.filter(
            (p) => p.category.toLowerCase() === currentCategory.toLowerCase() ||
                categories.find(c => c.slug === currentCategory)?.name === p.category
        );
    }, [currentCategory, products]);

    const handleCategoryChange = (slug: string | null) => {
        if (slug) {
            router.push(`/products?category=${slug}`);
        } else {
            router.push("/products");
        }
    };

    if (loading) {
        return <div className="min-h-screen pt-24 text-center">Loading Products...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-24">
            <div className="flex flex-col md:flex-row md:gap-12">
                {/* Mobile Filter (Horizontal Scroll) */}
                <div className="md:hidden w-full mb-8">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Filter className="w-4 h-4 text-primary" /> Categories
                    </h3>
                    <MobileCategoryFilter
                        currentCategory={currentCategory}
                        onCategoryChange={handleCategoryChange}
                    />
                </div>

                {/* Desktop Sidebar Filter */}
                <aside className="hidden md:block w-64 flex-shrink-0">
                    <div className="sticky top-24">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Filter className="w-5 h-5 text-primary" /> Filter by Category
                        </h3>
                        <DesktopCategoryFilter
                            currentCategory={currentCategory}
                            onCategoryChange={handleCategoryChange}
                        />
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
                                        {product.images?.[0] ? (
                                            <img
                                                src={product.images[0]}
                                                alt={product.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-600">
                                                Image: {product.title}
                                            </div>
                                        )}

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
                                            {product.features?.slice(0, 3).map((feat, i) => (
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
