'use client';

import { useTransition } from 'react';
import { deleteBlog } from '../../lib/actions/blogActions';

export default function DeleteBlogButton({ id, slug, title }: { id: string; slug: string; title: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
        startTransition(async () => {
            await deleteBlog(id, slug);
        });
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="text-xs font-bold text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition disabled:opacity-40">
            {isPending ? 'Deleting…' : 'Delete'}
        </button>
    );
}
