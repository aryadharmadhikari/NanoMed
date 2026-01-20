"use client";
import { useSearchParams } from "next/navigation";
import { products } from "../../data/products";
import ProductCard from "../../components/ProductCard";

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query")?.toLowerCase() || "";

    // Filter products based on search query
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );

    return (
        <main className="min-h-screen bg-white py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {query ? `Search results for "${query}"` : "Our Catalog"}
                </h1>
                <p className="text-gray-600 mb-8">
                    {filteredProducts.length} items found
                </p>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500">No products match your search.</p>
                        <button
                            onClick={() => window.location.href = '/products'}
                            className="mt-4 text-blue-600 font-bold hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}