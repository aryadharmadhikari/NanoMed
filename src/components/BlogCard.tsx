import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "../data/blogs";

export default function BlogCard({ blog }: { blog: BlogPost }) {
    return (
        <Link href={`/blog/${blog.slug}`} className="group block h-full">
            <article className="bg-white h-full rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(45,140,143,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col group/card">
                {/* Image Container */}
                <div className="relative h-60 w-full overflow-hidden">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold font-body text-gray-800 shadow-sm border border-gray-100">
                        {blog.category}
                    </div>
                </div>

                {/* Content Container */}
                <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs font-medium font-body text-gray-400 mb-4 tracking-wide uppercase">
                        <span>{blog.date}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span>{blog.readTime}</span>
                    </div>

                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 leading-snug group-hover/card:text-brand-teal transition-colors">
                        {blog.title}
                    </h3>

                    <p className="text-gray-500 font-body text-sm leading-relaxed mb-6 line-clamp-3">
                        {blog.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-5">
                        <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                                <Image src={blog.author.avatar} alt={blog.author.name} fill className="object-cover" />
                            </div>
                            <span className="text-xs font-bold font-body text-gray-700">{blog.author.name}</span>
                        </div>
                        <span className="text-brand-teal text-sm font-bold font-body group-hover/card:translate-x-1 transition-transform">
                            Read →
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}