"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/app/actions";
import { useToast } from "@/components/ui/use-toast";

interface Testimonial {
    id: string;
    name: string;
    company: string;
    content: string;
    rating: number;
}

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const { toast } = useToast();

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        content: "",
        rating: 5,
    });

    useEffect(() => {
        const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Testimonial[];
            setTestimonials(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateTestimonial(editingId, formData);
                toast({ title: "Updated", description: "Testimonial updated successfully" });
            } else {
                await createTestimonial(formData);
                toast({ title: "Created", description: "Testimonial created successfully" });
            }
            setIsOpen(false);
            resetForm();
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Something went wrong" });
        }
    };

    const handleEdit = (t: Testimonial) => {
        setFormData({
            name: t.name,
            company: t.company,
            content: t.content,
            rating: t.rating,
        });
        setEditingId(t.id);
        setIsOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this testimonial?")) {
            await deleteTestimonial(id);
            toast({ title: "Deleted", description: "Testimonial deleted successfully" });
        }
    };

    const resetForm = () => {
        setFormData({ name: "", company: "", content: "", rating: 5 });
        setEditingId(null);
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Testimonials</h2>
                <Button onClick={() => { resetForm(); setIsOpen(true); }} className="gap-2">
                    <Plus size={16} /> Add New
                </Button>
            </div>

            <div className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-neutral-800 hover:bg-neutral-900">
                            <TableHead className="text-neutral-400">Name</TableHead>
                            <TableHead className="text-neutral-400">Company</TableHead>
                            <TableHead className="text-neutral-400">Content</TableHead>
                            <TableHead className="text-neutral-400">Rating</TableHead>
                            <TableHead className="text-neutral-400 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {testimonials.map((t) => (
                            <TableRow key={t.id} className="border-neutral-800 hover:bg-neutral-800/50">
                                <TableCell className="font-medium text-white">{t.name}</TableCell>
                                <TableCell className="text-neutral-300">{t.company}</TableCell>
                                <TableCell className="text-neutral-400 max-w-md truncate">{t.content}</TableCell>
                                <TableCell className="text-neutral-300">{t.rating} / 5</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(t)}>
                                            <Pencil size={16} className="text-blue-400" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(t.id)}>
                                            <Trash2 size={16} className="text-red-400" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {testimonials.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-neutral-500 py-8">
                                    No testimonials found. Add one to get started.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg w-full max-w-md p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">
                                {editingId ? "Edit Testimonial" : "Add Testimonial"}
                            </h3>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                <X size={20} />
                            </Button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-neutral-400">Name</label>
                                <Input
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="bg-neutral-800 border-neutral-700 text-white"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-neutral-400">Company</label>
                                <Input
                                    required
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    className="bg-neutral-800 border-neutral-700 text-white"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-neutral-400">Content</label>
                                <Textarea
                                    required
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="bg-neutral-800 border-neutral-700 text-white"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-neutral-400">Rating (1-5)</label>
                                <Input
                                    type="number"
                                    min="1"
                                    max="5"
                                    required
                                    value={formData.rating}
                                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                                    className="bg-neutral-800 border-neutral-700 text-white"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    {editingId ? "Update" : "Create"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
