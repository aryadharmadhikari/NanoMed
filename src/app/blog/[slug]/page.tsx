import { blogs } from "../../../data/blogs";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SingleBlogPost({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    // 1. Unwrap the slug from the Promise (Next.js 15 requirement)
    const { slug } = await params;

    // 2. Find the blog post that matches the slug
    const blog = blogs.find((b) => b.slug === slug);

    // 3. Safety Check
    if (!blog) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white pb-20">
            {/* Article Header / Hero */}
            <div className="bg-gray-50 py-16 px-6 border-b border-gray-100">
                <div className="max-w-3xl mx-auto text-center">
                    <Link href="/blog" className="text-blue-600 font-bold text-sm uppercase tracking-widest hover:underline">
                        ← Back to Blog
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6 leading-tight">
                        {blog.title}
                    </h1>
                    <p className="text-gray-500 mt-4 font-medium">Published on {blog.date}</p>
                </div>
            </div>

            <article className="max-w-3xl mx-auto px-6 mt-12">
                {/* Main Image */}
                <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl mb-12">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Content Section */}
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                    <p className="text-xl font-medium text-gray-900 italic border-l-4 border-blue-600 pl-6 py-2 bg-blue-50/30">
                        {blog.excerpt}
                    </p>

                    {/* We split the content by new lines to create paragraphs */}
                    {blog.content.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 p-8 bg-blue-600 rounded-2xl text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">Need professional advice?</h3>
                    <p className="mb-6 opacity-90">Our team at Maruti Enterprises is here to help you choose the right equipment.</p>
                    <Link
                        href="/products"
                        className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition"
                    >
                        Explore Catalog
                    </Link>
                </div>
            </article>
        </main>
    );
}