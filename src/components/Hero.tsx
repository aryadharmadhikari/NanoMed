import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative bg-gray-50 py-20 lg:py-32">
            <div className="max-w-7xl mx-auto px-6 text-center">

                {/* Main Headline */}
                <h1 className="text-5xl md:text-7xl font-heading font-black text-gray-900 mb-6 tracking-tighter">
                    Restoring Mobility, <br />
                    <span className="text-brand-teal">Restoring Independence.</span>
                </h1>

                {/* Sub-text */}
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-body">
                    Premium Walkers, Commode Chairs, and Sticks designed for safety.
                    Built for the elderly, engineered for stability.
                </p>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link
                        href="/products"
                        className="bg-brand-red text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition shadow-xl hover:shadow-red-200 font-body"
                    >
                        View Catalog
                    </Link>
                    <Link
                        href="/about"
                        className="bg-white text-brand-teal border border-brand-teal/20 px-10 py-4 rounded-full font-bold text-lg hover:bg-teal-50 transition font-body"
                    >
                        About Us
                    </Link>
                </div>

            </div>
        </section>
    );
}