"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { ImagePlus, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ImageUploadProps {
    value: string[];
    onChange: (value: string[]) => void;
    onRemove: (value: string) => void;
}

export default function ImageUpload({
    value,
    onChange,
    onRemove,
}: ImageUploadProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange([...value, result.info.secure_url]);
    };

    if (!isMounted) {
        return <div className="h-40 w-full bg-neutral-800 rounded-lg animate-pulse" />;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4 flex-wrap">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden border border-neutral-700">
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                type="button"
                                onClick={() => onRemove(url)}
                                variant="destructive"
                                size="icon"
                                className="h-6 w-6"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>
            <CldUploadWidget
                onSuccess={onUpload}
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                options={{
                    maxFiles: 5,
                    resourceType: "image",
                    clientAllowedFormats: ["image"],
                }}
            >
                {({ open }) => {
                    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        open();
                    }
                    return (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleOnClick}
                            className="bg-neutral-800 border-neutral-700 hover:bg-neutral-700 text-white"
                        >
                            <ImagePlus className="h-4 w-4 mr-2" />
                            Upload an Image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
}
