import Image from "next/image";
import { Product } from "../data/products"; // Importing the "Type" rule we made

// JS Concept: "Destructuring"
// Instead of saying props.product, we just extract { product } directly.
export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300">

            {/* Product Image */}
            <div className="relative h-64 w-full bg-gray-100">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Product Details */}
            <div className="p-6">
                <p className="text-sm text-blue-600 font-bold uppercase tracking-wide">
                    {product.category}
                </p>
                <h3 className="text-xl font-bold text-gray-900 mt-2">
                    {product.name}
                </h3>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-gray-900">
                        ₹{product.price.toLocaleString("en-IN")} {/* Formats 1200 to 1,200 */}
                    </span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}