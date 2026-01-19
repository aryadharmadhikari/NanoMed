import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard"; // Relative path
import { products } from "../data/products";       // Relative path
import Link from "next/link";

export default function Home() {
  // JS LESSON: .slice(0, 3) creates a new smaller list with only the first 3 items
  const featuredProducts = products.slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      {/* The Hero Banner */}
      <Hero />

      {/* Bestselling Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Bestselling Equipment</h2>
              <p className="text-gray-600 mt-2">Trusted by 500+ families in Maharashtra</p>
            </div>
            <Link href="/products" className="text-blue-600 font-semibold hover:underline">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Use .slice(0, 4) to show the top 4 best sellers */}
            {products.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* The Featured Products Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Link to Full Catalog */}
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
