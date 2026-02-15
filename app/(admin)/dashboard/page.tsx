"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit, getCountFromServer } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, MessageSquare, Users, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { StatsSkeleton, TableSkeleton } from "@/components/skeletons";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ElementType;
    description: string;
}

function StatCard({ title, value, icon: Icon, description }: StatCardProps) {
    return (
        <Card className="bg-neutral-900 border-neutral-800 text-neutral-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-neutral-400">{title}</CardTitle>
                <Icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-neutral-500 mt-1">{description}</p>
            </CardContent>
        </Card>
    );
}

export default function DashboardOverview() {
    const [stats, setStats] = useState({
        products: 0,
        inquiries: 0,
        testimonials: 0
    });
    const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch counts - Note: getCountFromServer requires specific index configuration sometimes
                // If it fails, we fall back to manual counting or just 0
                let productsCount = 0;
                let inquiriesCount = 0;
                let testimonialsCount = 0;

                try {
                    const pSnap = await getCountFromServer(collection(db, "products"));
                    productsCount = pSnap.data().count;

                    const iSnap = await getCountFromServer(collection(db, "inquiries"));
                    inquiriesCount = iSnap.data().count;

                    const tSnap = await getCountFromServer(collection(db, "testimonials"));
                    testimonialsCount = tSnap.data().count;
                } catch (e) {
                    console.warn("Count server failed, falling back to basic fetch for length", e);
                    // Fallback if aggregation query fails (e.g. index issue)
                    const pDocs = await getDocs(collection(db, "products"));
                    productsCount = pDocs.size;
                }

                setStats({
                    products: productsCount,
                    inquiries: inquiriesCount,
                    testimonials: testimonialsCount
                });

                // Fetch recent inquiries
                const start = Date.now();
                const inquiriesQuery = query(
                    collection(db, "inquiries"),
                    orderBy("createdAt", "desc"),
                    limit(5)
                );

                let queriesSnapshot;
                try {
                    queriesSnapshot = await getDocs(inquiriesQuery);
                } catch (e) {
                    console.warn("Recent inquiries query failed, likely index missing. Fetching without sort temporarily.");
                    queriesSnapshot = await getDocs(query(collection(db, "inquiries"), limit(5)));
                }

                const inquiries = queriesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setRecentInquiries(inquiries);

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // ... (imports moved to top)
    // ... (keep other imports)

    // ... (inside component)

    if (loading) {
        return (
            <div className="space-y-8">
                <StatsSkeleton />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <div className="col-span-4">
                        <TableSkeleton rows={5} columns={3} />
                    </div>
                    <div className="col-span-3">
                        <TableSkeleton rows={3} columns={1} />
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white tracking-tight">Overview</h2>

            <div className="grid gap-4 md:grid-cols-3">
                <StatCard
                    title="Total Products"
                    value={stats.products}
                    icon={Package}
                    description="Active machines listed"
                />
                <StatCard
                    title="Total Inquiries"
                    value={stats.inquiries}
                    icon={MessageSquare}
                    description="Leads from website"
                />
                <StatCard
                    title="Testimonials"
                    value={stats.testimonials}
                    icon={Users}
                    description="Client reviews"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 space-y-4">
                    <Card className="bg-neutral-900 border-neutral-800 text-neutral-100 h-full">
                        <CardHeader>
                            <CardTitle>Recent Inquiries</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentInquiries.length === 0 ? (
                                    <p className="text-neutral-500 text-sm">No inquiries yet.</p>
                                ) : (
                                    recentInquiries.map((inquiry) => (
                                        <div key={inquiry.id} className="flex items-center justify-between border-b border-neutral-800 last:border-0 pb-4 last:pb-0">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium leading-none text-white">{inquiry.name}</p>
                                                <p className="text-xs text-neutral-500">{inquiry.email}</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <span className="text-xs text-neutral-400">
                                                    {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString() : 'N/A'}
                                                </span>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full capitalize ${inquiry.status === 'new' ? 'bg-primary/20 text-primary' : 'bg-neutral-800 text-neutral-400'
                                                    }`}>
                                                    {inquiry.status || 'new'}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="col-span-3 space-y-4">
                    <Card className="bg-neutral-900 border-neutral-800 text-neutral-100 h-full">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Link href="/dashboard/products/new" className="flex items-center justify-between p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors group">
                                <span className="text-sm font-medium group-hover:text-white transition-colors">Add New Product</span>
                                <ArrowUpRight className="h-4 w-4 text-neutral-500 group-hover:text-primary transition-colors" />
                            </Link>
                            <Link href="/dashboard/products" className="flex items-center justify-between p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors group">
                                <span className="text-sm font-medium group-hover:text-white transition-colors">Manage Products</span>
                                <ArrowUpRight className="h-4 w-4 text-neutral-500 group-hover:text-primary transition-colors" />
                            </Link>
                            <Link href="/" target="_blank" className="flex items-center justify-between p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors group">
                                <span className="text-sm font-medium group-hover:text-white transition-colors">View Live Site</span>
                                <ArrowUpRight className="h-4 w-4 text-neutral-500 group-hover:text-primary transition-colors" />
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
