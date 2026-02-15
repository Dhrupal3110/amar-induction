"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ProductForm from "@/components/admin/ProductForm";
import { Product } from "@/lib/data";
import { ProductDetailSkeleton } from "@/components/skeletons";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    // Unwrap params using React.use() as per Next.js 15
    const { id } = use(params);

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (!id) return;

                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
                } else {
                    console.error("Product not found");
                    router.push("/dashboard/products");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, router]);

    const handleSubmit = async (data: any) => {
        setSaving(true);
        try {
            const docRef = doc(db, "products", id);
            await updateDoc(docRef, {
                ...data,
                updatedAt: new Date().toISOString(),
            });
            router.push("/dashboard/products");
            router.refresh();
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update product.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="h-10 w-48 bg-neutral-900 rounded-lg animate-pulse" />
                <ProductDetailSkeleton />
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto">
            <ProductForm initialData={product} onSubmit={handleSubmit} loading={saving} />
        </div>
    );
}
