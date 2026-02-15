"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash, Plus, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TableSkeleton } from "@/components/skeletons";

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            const productsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            await deleteDoc(doc(db, "products", id));
            setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product.");
        }
    };



    // ...

    if (loading) return <div className="space-y-8"><TableSkeleton rows={5} columns={4} /></div>;


    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white tracking-tight">Products</h2>
                <Link href="/dashboard/products/new">
                    <Button className="bg-primary hover:bg-orange-600 border-none text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Product
                    </Button>
                </Link>
            </div>

            <Card className="bg-neutral-900 border-neutral-800 text-neutral-100">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-neutral-800 hover:bg-neutral-800/50">
                                <TableHead className="text-neutral-400">Image</TableHead>
                                <TableHead className="text-neutral-400">Title</TableHead>
                                <TableHead className="text-neutral-400">Category</TableHead>
                                <TableHead className="text-right text-neutral-400">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-neutral-500">
                                        No products found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                products.map((product) => (
                                    <TableRow key={product.id} className="border-neutral-800 hover:bg-neutral-800/50">
                                        <TableCell>
                                            <div className="relative h-12 w-12 rounded overflow-hidden bg-neutral-800">
                                                {product.images?.[0] ? (
                                                    <Image
                                                        src={product.images[0]}
                                                        alt={product.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-neutral-500">
                                                        <ImageIcon className="h-6 w-6" />
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium text-white">
                                            {product.title}
                                        </TableCell>
                                        <TableCell className="text-neutral-300">
                                            {product.category}
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Link href={`/dashboard/products/${product.id}`}>
                                                <Button variant="ghost" size="icon" className="hover:bg-neutral-700 hover:text-white">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(product.id)}
                                                className="hover:bg-red-900/20 hover:text-red-400 text-red-500"
                                            >
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
