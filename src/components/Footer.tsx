import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Column 1: Brand & Mission */}
                <div className="col-span-1 md:col-span-1">
                    <h3 className="text-white text-xl font-bold mb-4 italic tracking-tighter">
                        NANOMED
                    </h3>
                    <p className="text-sm leading-relaxed">
                        A premium brand by Maruti Enterprises. Dedicated to enhancing
                        mobility and independence through high-quality healthcare equipment.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
                        <li><Link href="/products" className="hover:text-blue-400 transition">Product Catalog</Link></li>
                        <li><Link href="/about" className="hover:text-blue-400 transition">About Us</Link></li>
                    </ul>
                </div>

                {/* Column 3: Trust Factors */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Why Choose Us</h4>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">✅ Quality Certified</li>
                        <li className="flex items-center gap-2">🚀 Fast Delivery in Mumbai</li>
                        <li className="flex items-center gap-2">📞 24/7 Support</li>
                    </ul>
                </div>

                {/* Column 4: Contact Info */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                    <div className="text-sm space-y-2">
                        <p>Maruti Enterprises</p>
                        <p>Mumbai, Maharashtra</p>
                        <p className="pt-2 text-blue-400 font-medium">Email: info@nanomed.com</p>
                        <p className="text-green-400 font-medium">WhatsApp: +91 99999 99999</p>
                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto border-t border-gray-800 mt-12 pt-8 text-center text-xs">
                <p>© {new Date().getFullYear()} Maruti Enterprises - NANOMED. All rights reserved.</p>
            </div>
        </footer>
    );
}