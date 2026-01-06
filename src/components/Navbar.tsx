import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full bg-white shadow-md p-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* LEFT: Logo */}
                <div className="text-2xl font-bold text-blue-600">
                    <Link href="/">NANOMED</Link>
                </div>

                {/* CENTER: Links (Hidden on mobile for now) */}
                <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <Link href="/products" className="hover:text-blue-600">Products</Link>
                    <Link href="/about" className="hover:text-blue-600">About Us</Link>
                </div>

                {/* RIGHT: CTA Button */}
                <div>
                    <a
                        href="https://wa.me/+917021472421" // Replace with real number later
                        target="_blank"
                        className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                    >
                        Chat on WhatsApp
                    </a>
                </div>
            </div>
        </nav>
    );
}