import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative bg-gray-50 py-20 lg:py-32">
            <div className="max-w-7xl mx-auto px-6 text-center">

                {/* Main Headline */}
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                    Restoring Mobility, <br />
                    <span className="text-blue-600">Restoring Independence.</span>
                </h1>

                {/* Sub-text */}
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Premium Walkers, Commode Chairs, and Sticks designed for safety.
                    Built for the elderly, engineered for stability.
                </p>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link
                        href="/products"
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        View Catalog
                    </Link>
                    <Link
                        href="/about"
                        className="bg-white text-gray-700 border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                    >
                        About Us
                    </Link>
                </div>

            </div>
        </section>
    );
}