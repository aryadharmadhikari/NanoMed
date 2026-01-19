import { blogs } from "../../data/blogs";
import BlogCard from "../../components/BlogCard";

export default function BlogListingPage() {
    return (
        <main className="min-h-screen bg-white py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">Health & Mobility Blog</h1>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    Expert advice on choosing medical equipment and caring for your loved ones.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>
            </div>
        </main>
    );
}