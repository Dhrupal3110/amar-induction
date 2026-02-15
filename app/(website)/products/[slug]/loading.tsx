import { ProductDetailSkeleton } from "@/components/skeletons";

export default function Loading() {
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 bg-neutral-950">
            <div className="max-w-7xl mx-auto">
                <ProductDetailSkeleton />
            </div>
        </div>
    );
}
