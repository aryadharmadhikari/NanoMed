import Link from "next/link";
import Image from "next/image";
import { getAdminBlogs } from "../../../lib/actions/blogActions";
import DeleteBlogButton from "../../../components/admin/DeleteBlogButton";

export default async function AdminBlogPage() {
    const { data: blogs, error } = await getAdminBlogs();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-black text-gray-900">Blog Posts</h1>
                    <p className="text-gray-500 font-body mt-1">{blogs?.length || 0} articles published</p>
                </div>
                <Link href="/admin/blog/new"
                    className="bg-brand-teal text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-700 transition shadow-lg shadow-teal-100 font-body">
                    + New Post
                </Link>
            </div>

            {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl font-bold mb-6">{error}</div>}

            {!blogs?.length ? (
                <div className="text-center py-24 text-gray-400">
                    <p className="text-5xl mb-4">✍️</p>
                    <p className="text-lg font-bold font-heading">No blog posts yet</p>
                    <p className="text-sm mt-2 font-body">Create your first article to get started.</p>
                    <Link href="/admin/blog/new" className="inline-block mt-6 bg-brand-teal text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-700 transition font-body">
                        Write First Post
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Article</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Author</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="text-right px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {blogs.map((blog: any) => (
                                <tr key={blog.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            {blog.image && (
                                                <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 hidden sm:block">
                                                    <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-bold text-gray-900 font-heading line-clamp-1">{blog.title}</p>
                                                <p className="text-xs text-gray-400 font-mono mt-0.5">/blog/{blog.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 font-body hidden md:table-cell">
                                        {blog.authors?.name || '—'}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 font-body text-xs hidden lg:table-cell">
                                        {blog.date ? new Date(blog.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {blog.is_featured ? (
                                            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">⭐ Featured</span>
                                        ) : (
                                            <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2.5 py-1 rounded-full">Published</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/blog/${blog.slug}/edit`}
                                                className="text-xs font-bold text-brand-teal hover:underline px-3 py-1.5 rounded-lg hover:bg-teal-50 transition">
                                                Edit
                                            </Link>
                                            <DeleteBlogButton id={blog.id} slug={blog.slug} title={blog.title} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
