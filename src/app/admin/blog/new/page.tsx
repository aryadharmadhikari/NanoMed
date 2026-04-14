import BlogWriter from "../../../../components/admin/blogWriter";
import { getBlogCategories, getAuthors } from "../../../../lib/actions/blogActions";

export default async function NewBlogPage() {
    const [{ data: categories }, { data: authors }] = await Promise.all([
        getBlogCategories(),
        getAuthors(),
    ]);

    return (
        <div>
            <BlogWriter categories={categories ?? []} authors={authors ?? []} />
        </div>
    );
}
