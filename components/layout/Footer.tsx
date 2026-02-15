
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-secondary text-secondary-foreground pt-16 pb-8 border-t border-white/10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div>
                        <div className="mb-6">
                            <span className="text-2xl font-bold tracking-tighter uppercase text-white">
                                Amar <span className="text-primary">Induction</span>
                            </span>
                        </div>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            Global leaders in manufacturing advanced induction melting, hardening, and forging solutions. Engineered for precision and built to last.
                        </p>
                        <div className="flex space-x-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'Products', 'About Us', 'Contact', 'Get a Quote'].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-muted-foreground hover:text-primary transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Our Products</h4>
                        <ul className="space-y-3">
                            {['Induction Melting', 'Hardening Systems', 'Forging Heaters', 'Brazing Machines', 'Jewellery Furnaces'].map((item) => (
                                <li key={item}>
                                    <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
                                <span className="text-muted-foreground">
                                    Plot No.26/2, Oscar Industrial Park-2, Ribda, Rajkot, Gujarat 360311, India
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <span className="text-muted-foreground">+91 76001 34687</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <span className="text-muted-foreground">sales@amarinduction.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-muted-foreground text-sm">
                        © {new Date().getFullYear()} Amar Induction. All Rights Reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
