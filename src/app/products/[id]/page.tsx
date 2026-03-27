import { supabase } from "../../../lib/supabase";
import { DatabaseProduct } from "../../../types/database";
import ProductSpecs from "../../../components/ProductSpecs";
import ProductCard from "../../../components/ProductCard";
import ProductGallery from "../../../components/ProductGallery";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SingleProductPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    // 1. Fetch main product with category info
    const { data: productData, error } = await supabase
        .from('products')
        .select('*, product_categories(name)')
        .eq('id', id)
        .single();

    if (error || !productData) {
        console.error("Error fetching product:", error);
        notFound();
    }

    const product = productData as DatabaseProduct;

    // 2. Fetch Related Products: Same category_id, excluding current product
    const { data: relatedData } = await supabase
        .from('products')
        .select('*, product_categories(name)')
        .eq('category_id', product.category_id)
        .neq('id', product.id)
        .limit(4);

    const relatedProducts = (relatedData || []) as DatabaseProduct[];

    // Setup WhatsApp details
    const whatsappNumber = "917738281416";
    const message = `Hi, I am interested in the ${product.name} (Price: ₹${product.price}). Can you please help me with more details?`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <Link href="/products" className="text-gray-500 hover:text-brand-teal transition flex items-center gap-2 mb-12 font-medium font-body">
                    ← Back to Medical Catalog
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* LEFT: Product Image & Gallery */}
                    <div className="w-full">
                        <ProductGallery 
                            images={product.images || []} 
                            fallbackImage={'/images/products/placeholder.jpg'}
                            productName={product.name}
                            categoryName={product.product_categories?.name || "General"}
                        />
                    </div>

                    {/* RIGHT: Product Details */}
                    <div className="flex flex-col">
                        <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-gray-900 leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-end gap-3 mt-6">
                            <span className="text-4xl md:text-5xl font-body font-black text-brand-teal">
                                ₹{product.price.toLocaleString("en-IN")}
                            </span>
                            {product.mrp && product.mrp > product.price && (
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="text-xl text-gray-500 line-through font-body">
                                        ₹{product.mrp.toLocaleString("en-IN")}
                                    </span>
                                    <span className="text-lg font-bold text-brand-red font-body">
                                        {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                                    </span>
                                </div>
                            )}
                        </div>
                        <p className="text-sm font-medium font-body text-gray-400 mt-2">Inclusive of all taxes</p>

                        {/* Ideal For Tags */}
                        {product.ideal_for && product.ideal_for.length > 0 && (
                            <div className="mt-8">
                                <p className="text-xs font-body font-bold uppercase text-gray-400 tracking-wider mb-3">Best Suited For</p>
                                <div className="flex flex-wrap gap-2">
                                    {product.ideal_for.map(tag => (
                                        <span key={tag} className="bg-brand-teal/10 text-brand-teal px-4 py-1.5 rounded-full text-sm font-semibold border border-brand-teal/20 font-body">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <p className="text-gray-700 text-lg leading-relaxed italic">
                                "{product.description}"
                            </p>
                        </div>

                        {/* CTA Section */}
                        <div className="mt-12 space-y-4">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-3 bg-green-500 text-white px-8 py-5 rounded-2xl font-bold text-xl hover:bg-green-600 transition-all shadow-xl hover:shadow-green-200"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                Consult with Us
                            </a>
                            <p className="text-center text-sm text-gray-400 flex items-center justify-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                We typically respond within one hour during standard business hours.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RICH CONTENT SECTIONS */}
                <ProductSpecs specs={product.specifications} features={product.features} />

                {/* RELATED PRODUCTS */}
                {relatedProducts.length > 0 && (
                    <section className="mt-32 pt-16 border-t border-gray-100">
                        <div className="flex justify-between items-end mb-10">
                            <div>
                                <h2 className="text-3xl font-bold font-heading text-gray-900">Recommended Alternatives</h2>
                                <p className="text-gray-500 mt-2">More {product.product_categories?.name || "Medical"} solutions for your needs.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}
