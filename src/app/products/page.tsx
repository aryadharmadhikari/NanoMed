"use client"
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { DatabaseProduct } from "@/types/database";
import ProductCard from "@/components/ProductCard";

function ProductList() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query")?.toLowerCase() || "";
    
    const [products, setProducts] = useState<DatabaseProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                // Fetch products with their category name
                const { data, error } = await supabase
                    .from('products')
                    .select('*, product_categories(name)');
                
                if (error) throw error;
                setProducts(data as any);
            } catch (err: any) {
                console.error("Error fetching products:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query) ||
        product.product_categories?.name.toLowerCase().includes(query)
    );

    if (loading) {
        return <div className="text-center py-20 font-body">Loading our catalog...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500 font-body">Error loading products: {error}</div>;
    }

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
                        <ProductCard key={product.id} product={product as any} />
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

export default function ProductsPage() {
    return (
        <main className="min-h-screen bg-white py-12 px-6">
            <Suspense fallback={<div className="text-center py-20">Loading catalog...</div>}>
                <ProductList />
            </Suspense>
        </main>
    );
}
