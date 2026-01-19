import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "../data/blogs";

export default function BlogCard({ blog }: { blog: BlogPost }) {
    return (
        <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="relative h-48 w-full">
                <Image src={blog.image} alt={blog.title} fill className="object-cover" />
            </div>
            <div className="p-5">
                <span className="text-xs font-bold text-blue-600 uppercase">{blog.date}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-2 line-clamp-2">
                    {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {blog.excerpt}
                </p>
                <Link href={`/blog/${blog.slug}`} className="inline-block mt-4 text-sm font-bold text-blue-600 hover:text-blue-800">
                    Read Full Article →
                </Link>
            </div>
        </div>
    );
}