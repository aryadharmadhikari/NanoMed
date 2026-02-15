import Link from "next/link";
import Image from "next/image";
import { blogs } from "../../data/blogs";
import BlogCard from "../../components/BlogCard";

export default function BlogListingPage() {
    // 1. Find the featured blog (or default to the first one)
    const featuredBlog = blogs.find(b => b.isFeatured) || blogs[0];

    // 2. Filter out the featured one for the main grid so we don't show it twice
    const otherBlogs = blogs.filter(b => b.id !== featuredBlog.id);

    return (
        <main className="min-h-screen bg-white">
            {/* Header / Intro */}
            <div className="bg-gray-50 border-b border-gray-100 py-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-gray-900 tracking-tight mb-4">
                        Health & Mobility Insights
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto font-body">
                        Expert guidance on choosing the right equipment, caregiving tips, and product innovations.
                    </p>
                </div>
            </div>

            {/* Featured Article Section */}
            <section className="max-w-7xl mx-auto px-6 -mt-10 mb-20">
                <div className="bg-white rounded-3xl p-2 shadow-xl border border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-brand-teal rounded-2xl overflow-hidden text-white p-8 md:p-12 relative">
                        {/* Background decoration or image could go here, but we'll stick to a clean dark layout or use the image on the right */}

                        <div className="relative z-10 order-2 lg:order-1">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6 font-body border border-white/20">
                                Featured Guide
                            </span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 leading-tight">
                                {featuredBlog.title}
                            </h2>
                            <p className="text-gray-300 text-lg mb-8 leading-relaxed line-clamp-3">
                                {featuredBlog.excerpt}
                            </p>

                            <div className="flex items-center gap-6 mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                                        <Image src={featuredBlog.author.avatar} alt={featuredBlog.author.name} fill className="object-cover" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-bold text-white">{featuredBlog.author.name}</p>
                                        <p className="text-gray-400">{featuredBlog.author.role}</p>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-400">
                                    {featuredBlog.readTime}
                                </div>
                            </div>

                            <Link
                                href={`/blog/${featuredBlog.slug}`}
                                className="inline-block bg-white text-brand-teal px-8 py-3 rounded-full font-bold hover:bg-teal-50 transition font-body"
                            >
                                Read Article
                            </Link>
                        </div>

                        <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden order-1 lg:order-2">
                            <Image
                                src={featuredBlog.image}
                                alt={featuredBlog.title}
                                fill
                                className="object-cover opacity-80"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Grid */}
            <section className="max-w-7xl mx-auto px-6 pb-24">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl font-heading font-bold text-gray-900">Latest Articles</h2>

                    {/* Categories (Mock for now, easy to make functional later) */}
                    <div className="hidden md:flex gap-4">
                        {['All', 'Guides', 'Health Tips', 'Product News'].map((cat) => (
                            <button key={cat} className={`text-sm font-semibold px-4 py-2 rounded-full transition ${cat === 'All' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {otherBlogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>
            </section>
        </main>
    );
}