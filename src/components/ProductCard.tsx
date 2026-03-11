import Image from "next/image";
import { DatabaseProduct } from "../types/database";
import Link from "next/link";

export default function ProductCard({ product }: { product: DatabaseProduct }) {
    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300 flex flex-col h-full">

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
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-brand-teal font-bold uppercase tracking-wide font-body">
                    {product.product_categories?.name || "General"}
                </p>
                <h3 className="text-xl font-heading font-bold text-gray-900 mt-2 line-clamp-2 min-h-[3.5rem]">
                    {product.name}
                </h3>
                <div className="flex flex-col items-start gap-1 mt-auto pt-4">
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
