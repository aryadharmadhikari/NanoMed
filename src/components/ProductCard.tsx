import Image from "next/image";
import { DatabaseProduct } from "../types/database";
import Link from "next/link";

export default function ProductCard({ product }: { product: DatabaseProduct }) {
    return (
        <Link href={`/products/${product.id}`} className="block group/card h-full">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300 flex flex-col h-full cursor-pointer">

                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-50 border-b border-gray-100 group">
                    <Image
                        src={product.images?.[0] || '/images/products/placeholder.jpg'}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {/* Product Details */}
                <div className="p-6 flex flex-col flex-grow">
                    <p className="text-sm text-brand-teal font-bold uppercase tracking-wide font-body">
                        {product.product_categories?.name || "General"}
                    </p>
                    <h3 className="text-xl font-heading font-bold text-gray-900 mt-2 line-clamp-2">
                        {product.name}
                    </h3>
                    {product.subtitle && (
                        <p className="text-sm text-gray-500 font-body mt-1 line-clamp-2 min-h-[2.5rem]">
                            {product.subtitle}
                        </p>
                    )}
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
                        <span className="w-full bg-brand-teal text-white px-4 py-2 rounded-full text-sm font-bold group-hover/card:bg-teal-700 transition text-center shadow-md hover:shadow-teal-100 font-body block mt-2">
                            View Details
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
