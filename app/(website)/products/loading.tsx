import { ProductCardSkeleton } from "@/components/skeletons";

export default function Loading() {
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 bg-neutral-950">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="space-y-4">
                    <div className="h-10 w-48 bg-neutral-900 rounded-lg animate-pulse" />
                    <div className="h-6 w-96 bg-neutral-900 rounded animate-pulse" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}
