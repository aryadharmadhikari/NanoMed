import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import BlogCard from "../components/BlogCard";
import { products } from "../data/products";
import { blogs } from "../data/blogs";
import Link from "next/link";

export default function Home() {
  // Logic: Get specific sets of data for different sections
  const bestsellingProducts = products.slice(0, 4); // Top 4 for the gray section
  const featuredProducts = products.slice(0, 3);    // 3 different ones for the white section
  const latestBlogs = blogs.slice(0, 3);            // Latest 3 articles

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero Section (The Face of the Brand) */}
      <Hero />

      {/* 2. Bestselling Section (Social Proof & Trust) */}
      <section className="bg-gray-50 py-20 px-6 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          {/* Header: Centered Alignment */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Bestselling Equipment
            </h2>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
              Trusted by 500+ families across Maharashtra.
            </p>

            {/* Action Button below with vertical space */}
            <div className="mt-10">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 bg-white border border-gray-200 px-8 py-3 rounded-full font-bold text-blue-600 hover:text-blue-700 hover:shadow-md transition-all whitespace-nowrap"
              >
                View Full Catalog
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Selection (Highlighting Quality) */}
      <section className="bg-blue-50/50 py-20 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Featured Innovation</h2>
          <p className="text-gray-500 mt-2">Premium mobility solutions from NANOMED.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Blog Space (Education & Authority) */}
      <section className="bg-blue-50/50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Health & Mobility Insights</h2>
            <p className="text-gray-500 mt-2">Expert advice from the Maruti Enterprises healthcare team.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-block bg-white border border-gray-200 px-8 py-3 rounded-full font-semibold text-gray-700 hover:bg-gray-50 transition shadow-sm"
            >
              Visit Our Blog
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}