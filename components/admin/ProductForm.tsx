"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash, Save, ArrowLeft } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import Link from "next/link";

interface ProductFormProps {
    initialData?: Product | null;
    onSubmit: (data: any) => Promise<void>;
    loading: boolean;
}

const CATEGORIES = [
    "Melting",
    "Hardening",
    "Forging",
    "Brazing",
    "Jewellery",
    "Heating",
];

export default function ProductForm({
    initialData,
    onSubmit,
    loading,
}: ProductFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        category: initialData?.category || "",
        shortDescription: initialData?.shortDescription || "",
        fullDescription: initialData?.fullDescription || "",
        images: initialData?.images || [],
        features: initialData?.features || [""],
        applications: initialData?.applications || [""],
        specifications: initialData?.specifications
            ? Object.entries(initialData.specifications)
            : [["", ""]],
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, category: value }));
    };

    const handleArrayChange = (
        field: "features" | "applications",
        index: number,
        value: string
    ) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData((prev) => ({ ...prev, [field]: newArray }));
    };

    const addArrayItem = (field: "features" | "applications") => {
        setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
    };

    const removeArrayItem = (
        field: "features" | "applications",
        index: number
    ) => {
        const newArray = [...formData[field]];
        newArray.splice(index, 1);
        setFormData((prev) => ({ ...prev, [field]: newArray }));
    };

    const handleSpecChange = (index: number, key: string, value: string) => {
        const newSpecs = [...formData.specifications];
        newSpecs[index] = [key, value];
        setFormData((prev) => ({ ...prev, specifications: newSpecs }));
    };

    const addSpecItem = () => {
        setFormData((prev) => ({
            ...prev,
            specifications: [...prev.specifications, ["", ""]],
        }));
    };

    const removeSpecItem = (index: number) => {
        const newSpecs = [...formData.specifications];
        newSpecs.splice(index, 1);
        setFormData((prev) => ({ ...prev, specifications: newSpecs }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const specsObject = formData.specifications.reduce(
            (acc: any, [key, value]) => {
                if (key && value) acc[key] = value;
                return acc;
            },
            {}
        );

        const cleanFeatures = formData.features.filter((f) => f.trim() !== "");
        const cleanApplications = formData.applications.filter(
            (a) => a.trim() !== ""
        );

        await onSubmit({
            ...formData,
            features: cleanFeatures,
            applications: cleanApplications,
            specifications: specsObject,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/products">
                        <Button
                            variant="outline"
                            size="icon"
                            type="button"
                            className="bg-neutral-800 border-neutral-700 hover:bg-neutral-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold text-white">
                        {initialData ? "Edit Product" : "Create Product"}
                    </h1>
                </div>
                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-primary hover:bg-orange-600"
                >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Saving..." : "Save Product"}
                </Button>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2 space-y-8">
                    <Card className="bg-neutral-900 border-neutral-800 text-neutral-100">
                        <CardContent className="pt-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Product Title"
                                        required
                                        className="bg-neutral-800 border-neutral-700"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Slug</Label>
                                    <Input
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        placeholder="product-url-slug"
                                        required
                                        className="bg-neutral-800 border-neutral-700"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={handleSelectChange}
                                >
                                    <SelectTrigger className="bg-neutral-800 border-neutral-700">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                                        {CATEGORIES.map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Short Description</Label>
                                <Textarea
                                    name="shortDescription"
                                    value={formData.shortDescription}
                                    onChange={handleChange}
                                    rows={2}
                                    className="bg-neutral-800 border-neutral-700"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Full Description</Label>
                                <Textarea
                                    name="fullDescription"
                                    value={formData.fullDescription}
                                    onChange={handleChange}
                                    rows={6}
                                    className="bg-neutral-800 border-neutral-700"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-neutral-900 border-neutral-800 text-neutral-100">
                        <CardContent className="pt-6 space-y-4">
                            <Label className="text-lg font-semibold">Images</Label>
                            <ImageUpload
                                value={formData.images}
                                onChange={(urls) =>
                                    setFormData((prev) => ({ ...prev, images: urls }))
                                }
                                onRemove={(url) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        images: prev.images.filter((i) => i !== url),
                                    }))
                                }
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="bg-neutral-900 border-neutral-800 text-neutral-100">
                        <CardContent className="pt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-lg font-semibold">Features</Label>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => addArrayItem("features")}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            {formData.features.map((item, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        value={item}
                                        onChange={(e) =>
                                            handleArrayChange("features", index, e.target.value)
                                        }
                                        placeholder="Feature"
                                        className="bg-neutral-800 border-neutral-700"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeArrayItem("features", index)}
                                    >
                                        <Trash className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-neutral-900 border-neutral-800 text-neutral-100">
                        <CardContent className="pt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-lg font-semibold">Applications</Label>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => addArrayItem("applications")}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            {formData.applications.map((item, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        value={item}
                                        onChange={(e) =>
                                            handleArrayChange("applications", index, e.target.value)
                                        }
                                        placeholder="Application"
                                        className="bg-neutral-800 border-neutral-700"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeArrayItem("applications", index)}
                                    >
                                        <Trash className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-neutral-900 border-neutral-800 text-neutral-100">
                        <CardContent className="pt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-lg font-semibold">Specifications</Label>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={addSpecItem}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            {formData.specifications.map((item, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        value={item[0]}
                                        onChange={(e) =>
                                            handleSpecChange(index, e.target.value, item[1])
                                        }
                                        placeholder="Key"
                                        className="bg-neutral-800 border-neutral-700 w-1/3"
                                    />
                                    <Input
                                        value={item[1]}
                                        onChange={(e) =>
                                            handleSpecChange(index, item[0], e.target.value)
                                        }
                                        placeholder="Value"
                                        className="bg-neutral-800 border-neutral-700 w-2/3"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeSpecItem(index)}
                                    >
                                        <Trash className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
