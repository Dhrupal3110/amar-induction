"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
// import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMobileMenuOpen]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                isScrolled || isMobileMenuOpen
                    ? "bg-background/95 backdrop-blur-md border-border shadow-lg"
                    : "bg-transparent border-transparent",
                isScrolled && !isMobileMenuOpen ? "py-2" : "py-4 md:py-6"
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 relative z-50">
                        <Image
                            src="/default.png"
                            alt="Amar Induction Logo"
                            width={144}
                            height={144}
                            className="w-144 h-144 object-contain rounded-sm"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                        <Link
                            href="/"
                            className={cn("text-sm font-medium hover:text-primary transition-colors",
                                isScrolled ? "text-foreground/80" : "text-white/90"
                            )}
                        >
                            Home
                        </Link>

                        {/* Products Dropdown */}
                        <div
                            className="relative group"
                            onMouseEnter={() => setIsProductMenuOpen(true)}
                            onMouseLeave={() => setIsProductMenuOpen(false)}
                        >
                            <button
                                className={cn(
                                    "flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors py-2",
                                    isScrolled ? "text-foreground/80" : "text-white/90"
                                )}
                            >
                                Products <ChevronDown className="w-4 h-4" />
                            </button>

                            <AnimatePresence>
                                {isProductMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-card border border-border rounded-lg shadow-2xl p-6 grid grid-cols-2 gap-4 mt-2 hidden lg:grid"
                                    >
                                        {categories.map((cat) => (
                                            <Link
                                                key={cat.slug}
                                                href={`/products?category=${cat.slug}`}
                                                className="flex items-start gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors group/item"
                                            >
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                                    <cat.icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-foreground group-hover/item:text-primary transition-colors">
                                                        {cat.name}
                                                    </h4>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        Explore our {cat.name.toLowerCase()} solutions
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                        <div className="col-span-2 mt-2 pt-4 border-t border-border">
                                            <Link href="/products" className="block text-center text-sm font-bold text-primary hover:underline">
                                                View All Products &rarr;
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link
                            href="/about"
                            className={cn("text-sm font-medium hover:text-primary transition-colors",
                                isScrolled ? "text-foreground/80" : "text-white/90"
                            )}
                        >
                            Company
                        </Link>
                        <Link
                            href="/contact"
                            className={cn("text-sm font-medium hover:text-primary transition-colors",
                                isScrolled ? "text-foreground/80" : "text-white/90"
                            )}
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* CTA, Mode Toggle & Mobile Toggle */}
                    <div className="flex items-center gap-2 md:gap-4">
                        {/* <ModeToggle /> */}

                        <a
                            href="https://wa.me/917600134687"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn("hidden md:flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all",
                                isScrolled
                                    ? "bg-primary text-white hover:bg-primary/90"
                                    : "bg-white text-primary hover:bg-white/90"
                            )}
                        >
                            <Phone className="w-4 h-4" />
                            <span>Get Quote</span>
                        </a>

                        <button
                            className="lg:hidden p-2 text-foreground md:text-white z-50 relative"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Filter Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 top-0 left-0 w-full h-screen bg-background z-40 px-6 pb-8 pt-24 overflow-y-auto lg:hidden border-t border-border shadow-inner"
                    >
                        <div className="flex flex-col space-y-6">
                            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-foreground border-b border-border pb-2">Home</Link>

                            <div className="space-y-4">
                                <h4 className="text-muted-foreground text-sm uppercase tracking-wider font-bold">Our Products</h4>
                                <div className="grid grid-cols-1 gap-2 pl-2">
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat.slug}
                                            href={`/products?category=${cat.slug}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-3 text-lg font-medium text-foreground/80 py-2 hover:bg-secondary/50 rounded-lg px-2 transition-colors"
                                        >
                                            <cat.icon className="w-5 h-5 text-primary" />
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>
                                <Link
                                    href="/products"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-center text-primary font-bold py-2 bg-secondary/30 rounded-lg"
                                >
                                    View All Products
                                </Link>
                            </div>

                            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-foreground border-b border-border pb-2">Company</Link>
                            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-foreground border-b border-border pb-2">Contact</Link>

                            <div className="pt-8 mt-auto">
                                <a href="tel:+917600134687" className="flex items-center gap-3 text-lg font-bold text-primary mb-4 bg-primary/10 p-4 rounded-xl justify-center">
                                    <Phone className="w-5 h-5" /> Call Now
                                </a>
                                <a href="mailto:sales@amarinduction.com" className="flex items-center gap-3 text-lg font-medium text-foreground justify-center">
                                    <Mail className="w-5 h-5" /> Email Sales
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
