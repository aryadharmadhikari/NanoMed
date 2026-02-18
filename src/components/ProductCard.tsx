import Image from "next/image";
import { Product } from "../data/products"; // Importing the "Type" rule we made
import Link from "next/link";

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
                <p className="text-sm text-brand-teal font-bold uppercase tracking-wide font-body">
                    {product.category}
                </p>
                <h3 className="text-xl font-heading font-bold text-gray-900 mt-2">
                    {product.name}
                </h3>
                <div className="flex flex-col items-start gap-1 mt-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-brand-teal font-body">
                            ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        {product.mrp && product.mrp > product.price && (
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400 line-through font-body">
                                    ₹{product.mrp.toLocaleString("en-IN")}
                                </span>
                                <span className="text-xs font-bold text-brand-red font-body">
                                    {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                                </span>
                            </div>
                        )}
                    </div>
                    <Link
                        href={`/products/${product.id}`}
                        className="w-full bg-brand-teal text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-teal-700 transition text-center shadow-md hover:shadow-teal-100 font-body block mt-2"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}