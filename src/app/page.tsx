import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard"; // Relative path
import { products } from "../data/products";       // Relative path
import Link from "next/link";

export default function Home() {
  // JS LESSON: .slice(0, 3) creates a new smaller list with only the first 3 items
  const featuredProducts = products.slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      {/* 1. The Hero Banner */}
      <Hero />

      {/* 2. The Featured Products Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* 3. Link to Full Catalog */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="text-blue-600 font-semibold text-lg hover:underline"
          >
            View All Products →
          </Link>
        </div>
      </section>
    </main>
  );
}
