import { notFound } from "next/navigation";
import BlogWriter from "../../../../../components/admin/blogWriter";
import { getBlogBySlug, getBlogCategories, getAuthors } from "../../../../../lib/actions/blogActions";
import { DatabaseBlog } from "../../../../../types/database";

export default async function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const [{ data: blog, error }, { data: categories }, { data: authors }] = await Promise.all([
        getBlogBySlug(slug),
        getBlogCategories(),
        getAuthors(),
    ]);

    if (error || !blog) notFound();

    return (
        <div>
            <BlogWriter initialData={blog as DatabaseBlog} categories={categories} authors={authors} />
        </div>
    );
}
