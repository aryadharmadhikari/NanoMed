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
      <section className="bg-slate-50 py-20 px-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Bestselling Equipment
              </h2>
              <p className="text-gray-500 mt-2">The most trusted mobility aids in our collection.</p>
            </div>
            <Link href="/products" className="mt-4 md:mt-0 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold rounded-full hover:bg-blue-600 hover:text-white transition tracking-wide text-sm uppercase">
              Explore All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Use .slice(0, 4) to show the first 4 products as 'Bestsellers' */}
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
