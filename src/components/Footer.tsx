import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-gray-950 text-gray-400 pt-16 pb-8 px-6 font-body">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Column 1: Brand & Mission */}
                <div className="col-span-1 md:col-span-1">
                    <Link href="/" className="inline-block mb-6">
                        <Image
                            src="/images/NanoMed-Logo-Vertical.png"
                            alt="NanoMed Logo"
                            width={1024}
                            height={1024}
                            className="h-42 w-auto object-contain brightness-110"
                        />
                    </Link>
                    <p className="text-sm leading-relaxed">
                        A premium brand by Maruti Enterprises. Dedicated to enhancing
                        mobility and independence through high-quality healthcare equipment.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                    <h4 className="text-white font-heading font-bold mb-6 uppercase tracking-wider text-md">Quick Links</h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link href="/" className="hover:text-brand-teal transition">Home</Link></li>
                        <li><Link href="/products" className="hover:text-brand-teal transition">Product Catalog</Link></li>
                        <li><Link href="/blog" className="hover:text-brand-teal transition">Blog</Link></li>
                        <li><Link href="/about" className="hover:text-brand-teal transition">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-brand-teal transition">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Column 3: Trust Factors */}
                <div>
                    <h4 className="text-white font-heading font-bold mb-6 uppercase tracking-wider text-md">Why Choose Us</h4>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal"></span>
                            Quality Certified
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal"></span>
                            Fast Delivery in Mumbai
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal"></span>
                            24/7 Support
                        </li>
                    </ul>
                </div>

                {/* Column 4: Contact Info */}
                <div>
                    <h4 className="text-white font-heading font-bold mb-6 uppercase tracking-wider text-md">Contact Us</h4>
                    <div className="text-sm space-y-4">
                        <p className="text-gray-200 font-medium">Maruti Enterprises</p>
                        <p>Mumbai, Maharashtra</p>
                        <p><a href="mailto:nanomedsales@gmail.com" className="text-brand-teal hover:underline font-bold">nanomedsales@gmail.com</a></p>
                        <p><a href="https://wa.me/917738281416" className="text-green-500 hover:underline font-bold">WhatsApp Support</a></p>
                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto border-t border-gray-800 mt-12 pt-8 text-center text-sm">
                <p>© {new Date().getFullYear()} Maruti Enterprises - NanoMed. All rights reserved.</p>
            </div>
        </footer>
    );
}