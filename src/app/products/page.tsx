"use client"
import { useSearchParams } from "next/navigation";
import { products } from "../../data/products";
import ProductCard from "../../components/ProductCard";
import { Suspense } from "react"; // 1. Import Suspense

// 2. Move your logic into a separate internal component
function ProductList() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query")?.toLowerCase() || "";

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
                {query ? `Search results for "${query}"` : "Our Catalog"}
            </h1>
            <p className="text-gray-600 mb-8 font-body">
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
                    <p className="text-xl text-gray-500 font-body">No products match your search.</p>
                    <button
                        onClick={() => window.location.href = '/products'}
                        className="mt-4 text-brand-teal font-bold hover:underline font-body"
                    >
                        Clear search
                    </button>
                </div>
            )}
        </div>
    );
}

// 3. The main Page export just wraps the list in Suspense
export default function ProductsPage() {
    return (
        <main className="min-h-screen bg-white py-12 px-6">
            <Suspense fallback={<div className="text-center py-20">Loading catalog...</div>}>
                <ProductList />
            </Suspense>
        </main>
    );
}