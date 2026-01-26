import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "../data/blogs";

export default function BlogCard({ blog }: { blog: BlogPost }) {
    return (
        <Link href={`/blog/${blog.slug}`} className="group block h-full">
            <article className="bg-white h-full rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col">
                {/* Image Container */}
                <div className="relative h-56 w-full overflow-hidden">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-700 shadow-sm">
                        {blog.category}
                    </div>
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-3">
                        <span>{blog.date}</span>
                        <span>•</span>
                        <span>{blog.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                        {blog.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                        {blog.excerpt}
                    </p>

                    <div className="mt-auto flex items-center gap-2 border-t border-gray-50 pt-4">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden">
                            <Image src={blog.author.avatar} alt={blog.author.name} fill className="object-cover" />
                        </div>
                        <span className="text-xs font-semibold text-gray-700">{blog.author.name}</span>
                    </div>
                </div>
            </article>
        </Link>
    );
}