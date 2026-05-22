import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import BlogCard from "../components/BlogCard";
import ReviewCard from "../components/ReviewCard";
import { supabase } from "../lib/supabase";
import { DatabaseProduct, DatabaseBlog, DatabaseReview } from "../types/database";
import Link from "next/link";

export default async function Home() {
  // 1. Fetch Bestselling Products (Top 4)
  const { data: bestsellingData } = await supabase
    .from('products')
    .select('*, product_categories(name)')
    .limit(4);

  // 2. Fetch Featured Selection (3 items)
  const { data: featuredData } = await supabase
    .from('products')
    .select('*, product_categories(name)')
    .range(4, 6); // Just get the next 3 for variety

  // 3. Fetch Latest Blogs (3 articles)
  const { data: latestBlogsData } = await supabase
    .from('blogs')
    .select('*, blog_categories(name), authors(*)')
    .order('date', { ascending: false })
    .limit(3);

  // 4. Fetch Home Reviews (up to 8 for a rich marquee strip)
  const { data: homeReviewsData } = await supabase
    .from('reviews')
    .select('*')
    .limit(8);

  const bestsellingProducts = (bestsellingData || []) as DatabaseProduct[];
  const featuredProducts = (featuredData || []) as DatabaseProduct[];
  const latestBlogs = (latestBlogsData || []) as DatabaseBlog[];
  const homeReviews = (homeReviewsData || []) as DatabaseReview[];

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
                className="inline-block bg-white border border-gray-200 px-8 py-3 rounded-full font-semibold text-gray-700 hover:bg-gray-50 transition shadow-sm"
              >
                View Full Catalog
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

      {/* 3. Social Proof (Trust & Recovery) */}
      <section className="bg-gray-900 py-24 overflow-hidden">
        {/* Heading — constrained */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Voices of Trust
            </h2>
            <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
              See how families across Maharashtra are reclaiming independence with NanoMed.
            </p>
          </div>
        </div>

        {/* Marquee strip — full-width, no padding */}
        {homeReviews.length > 0 && (
          <div className="overflow-hidden">
            <div className="flex gap-10 animate-marquee w-max">
              {/* Duplicated once for seamless infinite loop */}
              {[...homeReviews, ...homeReviews].map((review, i) => (
                <div key={i} className="w-[340px] flex-none">
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer — constrained */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 text-gray-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-800 flex items-center justify-center text-[10px] font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium">Trusted by 500+ caregivers</p>
            </div>
          </div>
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
