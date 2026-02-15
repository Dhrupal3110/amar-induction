"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import ProductForm from "@/components/admin/ProductForm";
import { Product } from "@/lib/data";

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: any) => {
        setLoading(true);
        try {
            await addDoc(collection(db, "products"), {
                ...data,
                createdAt: new Date().toISOString(),
            });
            router.push("/dashboard/products");
            router.refresh();
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Failed to create product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <ProductForm onSubmit={handleSubmit} loading={loading} />
        </div>
    );
}
