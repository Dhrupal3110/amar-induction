"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import {
    LayoutDashboard,
    Package,
    MessageSquare,
    LogOut,
    Menu,
    X,
    Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/login");
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/login");
    };

    const navItems = [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard/products", label: "Products", icon: Package },
        { href: "/dashboard/inquiries", label: "Inquiries", icon: MessageSquare },
        { href: "/dashboard/testimonials", label: "Testimonials", icon: MessageSquare },
        { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-primary">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-950 flex">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-neutral-900 border-r border-neutral-800 transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
                <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-800">
                    <span className="text-xl font-bold text-white">Amar<span className="text-primary">Admin</span></span>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden text-neutral-400 hover:text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                                    }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-800">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Header */}
                <header className="h-16 border-b border-neutral-800 bg-neutral-900/50 backdrop-blur flex items-center px-4 md:px-8">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="md:hidden mr-4 text-neutral-400 hover:text-white"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <h1 className="text-lg font-medium text-white capitalize">
                        {pathname.split("/").pop() || "Dashboard"}
                    </h1>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
