import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export function ProductCardSkeleton() {
    return (
        <div className="group relative overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800">
            <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-800 relative">
                <Skeleton className="h-full w-full" />
            </div>
            <div className="p-6 space-y-3">
                <Skeleton className="h-4 w-1/3 bg-neutral-800" />
                <Skeleton className="h-6 w-3/4 bg-neutral-800" />
                <Skeleton className="h-4 w-full bg-neutral-800" />
                <Skeleton className="h-4 w-2/3 bg-neutral-800" />
                <div className="pt-4 flex items-center justify-between">
                    <Skeleton className="h-10 w-28 rounded-lg bg-neutral-800" />
                    <Skeleton className="h-10 w-10 rounded-full bg-neutral-800" />
                </div>
            </div>
        </div>
    );
}

export function ProductDetailSkeleton() {
    return (
        <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image Gallery Skeleton */}
            <div className="space-y-4">
                <Skeleton className="aspect-square w-full rounded-2xl bg-neutral-900 border border-neutral-800" />
                <div className="grid grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="aspect-square rounded-lg bg-neutral-900" />
                    ))}
                </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="space-y-8">
                <div className="space-y-4">
                    <Skeleton className="h-6 w-32 rounded-full bg-primary/20" />
                    <Skeleton className="h-12 w-3/4 bg-neutral-800" />
                    <Skeleton className="h-6 w-1/2 bg-neutral-800" />
                </div>

                <div className="space-y-6 py-8 border-y border-neutral-800">
                    <div className="grid grid-cols-2 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-4 w-20 bg-neutral-800" />
                                <Skeleton className="h-5 w-32 bg-neutral-800" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <Skeleton className="h-8 w-40 bg-neutral-800" />
                    <div className="space-y-2">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-4 w-full bg-neutral-800" />
                        ))}
                    </div>
                </div>

                <div className="pt-8 flex gap-4">
                    <Skeleton className="h-12 w-full rounded-lg bg-primary/20" />
                    <Skeleton className="h-12 w-40 rounded-lg bg-neutral-800" />
                </div>
            </div>
        </div>
    );
}

export function StatsSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
                <Card key={i} className="bg-neutral-900 border-neutral-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <Skeleton className="h-4 w-24 bg-neutral-800" />
                        <Skeleton className="h-4 w-4 bg-neutral-800" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-16 mb-2 bg-neutral-800" />
                        <Skeleton className="h-3 w-32 bg-neutral-800" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
    return (
        <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-0">
                <div className="space-y-4 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <Skeleton className="h-8 w-48 bg-neutral-800" />
                        <Skeleton className="h-8 w-24 bg-neutral-800" />
                    </div>
                    {[...Array(rows)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 py-3 border-b border-neutral-800 last:border-0">
                            {[...Array(columns)].map((_, j) => (
                                <Skeleton key={j} className="h-6 w-full bg-neutral-800" />
                            ))}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
