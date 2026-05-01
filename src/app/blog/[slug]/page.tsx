import AuthorBadge from "../../../components/AuthorBadge";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { DatabaseBlog } from "../../../types/database";
import { ArrowLeft } from "../../../components/icons";

export default async function SingleBlogPost({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    // Fetch blog by slug with category and author
    const { data: blogData, error } = await supabase
        .from('blogs')
        .select('*, blog_categories(name), authors(*)')
        .eq('slug', slug)
        .single();

    if (error || !blogData) {
        console.error("Error fetching blog post:", error);
        notFound();
    }

    const blog = blogData as DatabaseBlog;

    return (
        <main className="min-h-screen bg-white pb-24">
            {/* Header / Hero */}
            <header className="pt-20 pb-16 px-6 max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 text-sm font-body font-bold text-brand-teal mb-6 bg-brand-teal/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    <span>{blog.blog_categories?.name || "Blog"}</span>
                </div>

                <h1 className="text-4xl md:text-5xl/tight font-heading font-extrabold text-gray-900 mb-8">
                    {blog.title}
                </h1>

                <div className="flex items-center justify-center gap-8 text-gray-500 mb-10">
                    {blog.authors && <AuthorBadge author={blog.authors} size="md" />}
                    <span className="text-sm font-medium">{blog.read_time}</span>
                    <span className="text-sm font-medium">{new Date(blog.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
            </header>

            {/* Main Image */}
            <div className="max-w-5xl mx-auto px-6 mb-16">
                <div className="relative w-full aspect-[2/1] rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            <article className="max-w-3xl mx-auto px-6 relative">
                {/* Social Share (Sticky Side - Mock) */}
                <div className="hidden xl:flex flex-col gap-4 absolute -left-20 top-0">
                    <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-twitter hover:text-blue-400 transition">
                        <span className="sr-only">Share</span>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                    </button>
                </div>

                {/* Content */}
                <div className="prose prose-lg prose-teal max-w-none text-gray-700 leading-relaxed font-body">
                    <p className="lead text-xl md:text-2xl font-medium text-gray-800 mb-8 border-l-4 border-brand-teal pl-6 font-body italic">
                        {blog.excerpt}
                    </p>

                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>

                {/* Tags / Footer */}
                {blog.authors && (
                    <div className="mt-16 pt-8 border-t border-gray-100">
                        <div className="bg-gray-50 rounded-2xl p-8 flex items-center gap-6">
                            <div className="relative w-20 h-20 shrink-0 rounded-full overflow-hidden border-4 border-white shadow-md">
                                <Image src={blog.authors.avatar} alt={blog.authors.name} fill className="object-cover" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-brand-teal uppercase tracking-wider mb-1 font-body">About the Author</p>
                                <h3 className="text-xl font-bold font-heading text-gray-900 leading-tight">
                                    {blog.authors.name}
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    {blog.authors.bio}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-center mt-12">
                    <Link href="/blog" className="inline-flex items-center gap-3 group w-fit">
                        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-50 group-hover:bg-brand-teal transition-colors duration-200 shadow-sm">
                            <ArrowLeft className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors duration-200" />
                        </span>
                        <span className="text-gray-500 group-hover:text-brand-teal font-semibold font-body transition-colors duration-200 text-sm">
                            Back to all blogs
                        </span>
                    </Link>
                </div>
            </article>
        </main>
    );
}
