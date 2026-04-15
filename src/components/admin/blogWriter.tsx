'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Tiptap from '../Tiptap';
import { uploadImage } from '../../lib/uploadImage';
import { DatabaseBlog, DatabaseAuthor } from '../../types/database';

interface BlogCategory { id: string; name: string; slug: string; }

interface BlogWriterProps {
    initialData?: DatabaseBlog;
    categories: BlogCategory[];
    authors: DatabaseAuthor[];
}

const slugify = (text: string) =>
    text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

const calcReadTime = (html: string) => {
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = text ? text.split(' ').filter(Boolean).length : 0;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

// ─── Searchable Combobox ────────────────────────────────────────────────────
function SearchableCombobox({ options: initOptions, value, onChange, onCreateNew, placeholder }: {
    options: { id: string; name: string }[];
    value: string;
    onChange: (id: string, name: string) => void;
    onCreateNew: (name: string) => Promise<{ id: string; name: string } | null>;
    placeholder: string;
}) {
    // Keep server-fetched and locally created items separate so a parent
    // re-render (triggered by onChange) never wipes a just-created item.
    const [localCreated, setLocalCreated] = useState<{ id: string; name: string }[]>([]);
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [createError, setCreateError] = useState('');
    const ref = useRef<HTMLDivElement>(null);

    const options = [...initOptions, ...localCreated];
    const selected = options.find(o => o.id === value);
    const filtered = options.filter(o => o.name.toLowerCase().includes(search.toLowerCase()));
    const hasExact = options.some(o => o.name.toLowerCase() === search.toLowerCase());

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false); setSearch('');
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleSelect = (opt: { id: string; name: string }) => {
        onChange(opt.id, opt.name);
        setIsOpen(false); setSearch('');
    };

    const handleCreate = async () => {
        if (!search.trim()) return;
        setIsCreating(true);
        setCreateError('');
        const created = await onCreateNew(search.trim());
        if (created) {
            setLocalCreated(prev => [...prev, created]); // survives parent re-render
            onChange(created.id, created.name);
            setIsOpen(false); setSearch('');
        } else {
            setCreateError(`Failed to create "${search}". Check Supabase permissions.`);
        }
        setIsCreating(false);
    };

    return (
        <div ref={ref} className="relative">
            <div className="relative">
                <input
                    type="text"
                    value={isOpen ? search : (selected?.name ?? '')}
                    onChange={e => setSearch(e.target.value)}
                    onFocus={() => { setIsOpen(true); setSearch(''); }}
                    placeholder={placeholder}
                    className="w-full px-3 py-2.5 pr-8 rounded-lg border border-gray-200 focus:border-brand-teal outline-none text-sm"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
            </div>
            {createError && <p className="text-xs text-red-500 mt-1 font-bold">{createError}</p>}
            {isOpen && (
                <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-52 overflow-y-auto">
                    {filtered.length === 0 && !search && (
                        <p className="px-3 py-2 text-xs text-gray-400">Start typing to search…</p>
                    )}
                    {filtered.map(opt => (
                        <button key={opt.id} type="button" onClick={() => handleSelect(opt)}
                            className={`w-full text-left px-3 py-2 text-sm transition ${opt.id === value ? 'bg-teal-50 text-brand-teal font-bold' : 'hover:bg-gray-50'}`}>
                            {opt.name}
                        </button>
                    ))}
                    {search && !hasExact && (
                        <button type="button" onClick={handleCreate} disabled={isCreating}
                            className="w-full text-left px-3 py-2 text-sm text-brand-teal font-bold hover:bg-teal-50 transition border-t border-gray-100 disabled:opacity-50">
                            {isCreating ? 'Creating…' : `+ Create "${search}"`}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}


// ─── Main Component ──────────────────────────────────────────────────────────
export default function BlogWriter({ initialData, categories, authors }: BlogWriterProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [error, setError] = useState('');
    const [isPreview, setIsPreview] = useState(false);
    const [slugStatus, setSlugStatus] = useState<'idle' | 'checking' | 'ok' | 'taken'>('idle');
    const slugCheckTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    // Form state
    const [title, setTitle] = useState(initialData?.title || '');
    const [slug, setSlug] = useState(initialData?.slug || '');
    const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [readTime, setReadTime] = useState(initialData?.read_time || '1 min read');
    const [readTimeManual, setReadTimeManual] = useState(!!initialData?.read_time);
    const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
    const [isFeatured, setIsFeatured] = useState(initialData?.is_featured || false);
    const [categoryId, setCategoryId] = useState(initialData?.category_id || '');
    const [authorId, setAuthorId] = useState(initialData?.author_id || '');

    // Cover images
    const [uploadedImages, setUploadedImages] = useState<string[]>(initialData?.image ? [initialData.image] : []);
    const [coverIndex, setCoverIndex] = useState(0);
    const [isUploadingCover, setIsUploadingCover] = useState(false);
    const coverInputRef = useRef<HTMLInputElement>(null);

    const markDirty = useCallback(() => setIsDirty(true), []);

    // Browser close guard
    useEffect(() => {
        const handler = (e: BeforeUnloadEvent) => { if (isDirty) { e.preventDefault(); e.returnValue = ''; } };
        window.addEventListener('beforeunload', handler);
        return () => window.removeEventListener('beforeunload', handler);
    }, [isDirty]);

    // Auto-generate slug from title (new blogs only)
    useEffect(() => {
        if (!initialData && title) setSlug(slugify(title));
    }, [title, initialData]);

    // Debounced slug check
    useEffect(() => {
        if (!slug) { setSlugStatus('idle'); return; }
        setSlugStatus('checking');
        clearTimeout(slugCheckTimeout.current);
        slugCheckTimeout.current = setTimeout(async () => {
            const { checkSlugExists } = await import('../../lib/actions/blogActions');
            const { exists } = await checkSlugExists(slug, initialData?.id);
            setSlugStatus(exists ? 'taken' : 'ok');
        }, 500);
        return () => clearTimeout(slugCheckTimeout.current);
    }, [slug, initialData?.id]);

    // Auto read time from content
    useEffect(() => {
        if (!readTimeManual) setReadTime(calcReadTime(content));
    }, [content, readTimeManual]);

    // Cover image upload
    const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        setIsUploadingCover(true);
        const urls: string[] = [];
        for (const file of files) { const { url } = await uploadImage(file); if (url) urls.push(url); }
        setUploadedImages(prev => {
            const next = [...prev, ...urls];
            if (prev.length === 0 && urls.length > 0) setCoverIndex(0);
            return next;
        });
        setIsUploadingCover(false); markDirty(); e.target.value = '';
    };

    const removeImage = (idx: number) => {
        setUploadedImages(prev => {
            const next = prev.filter((_, i) => i !== idx);
            if (coverIndex >= next.length) setCoverIndex(Math.max(0, next.length - 1));
            return next;
        });
        markDirty();
    };

    // Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (slugStatus === 'taken') { setError('This slug is already taken. Please choose a different one.'); return; }
        if (!content || content === '<p></p>') { setError('Blog content cannot be empty.'); return; }
        setIsSubmitting(true); setError('');

        const blogData = {
            title, slug, excerpt, content, read_time: readTime, date, is_featured: isFeatured,
            category_id: categoryId || null, author_id: authorId || null,
            image: uploadedImages[coverIndex] || '',
        };

        try {
            const { createBlog, updateBlog } = await import('../../lib/actions/blogActions');
            const result = initialData?.id ? await updateBlog(initialData.id, blogData) : await createBlog(blogData);
            if (result.error) throw new Error(result.error);
            setIsDirty(false);
            router.push('/admin/blog'); router.refresh();
        } catch (err: any) { setError(err.message || 'Failed to save blog.'); setIsSubmitting(false); }
    };

    const handleCancel = () => {
        if (isDirty && !window.confirm('You have unsaved changes. Leave without saving?')) return;
        router.push('/admin/blog');
    };

    // Create handlers for comboboxes
    const handleCreateCategory = async (name: string) => {
        const { createBlogCategory } = await import('../../lib/actions/blogActions');
        const { data } = await createBlogCategory(name);
        return data ? { id: data.id, name: data.name } : null;
    };

    const handleCreateAuthor = async (name: string) => {
        const { createAuthor } = await import('../../lib/actions/blogActions');
        const { data } = await createAuthor(name);
        return data ? { id: data.id, name: data.name } : null;
    };

    const slugStatusUI = { idle: null, checking: <span className="text-xs text-gray-400">Checking…</span>, ok: <span className="text-xs text-green-600 font-bold">✓ Available</span>, taken: <span className="text-xs text-red-600 font-bold">✗ Already taken</span> };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-heading font-black text-gray-900">{initialData ? 'Edit Blog Post' : 'New Blog Post'}</h1>
                        <p className="text-sm text-gray-500 font-body mt-1">{initialData ? `Editing: ${initialData.slug}` : 'Craft and publish a new article'}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button type="button" onClick={handleCancel} className="px-5 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition font-body">Cancel</button>
                        <button type="button" onClick={() => setIsPreview(true)} className="px-5 py-2.5 rounded-xl font-bold border border-brand-teal text-brand-teal hover:bg-teal-50 transition font-body">Preview</button>
                        <button type="submit" disabled={isSubmitting || slugStatus === 'taken'}
                            className="bg-brand-teal text-white px-6 py-2.5 rounded-xl font-bold hover:bg-teal-700 transition disabled:opacity-50 shadow-lg shadow-teal-100 font-body">
                            {isSubmitting ? 'Publishing…' : (initialData ? 'Update Post' : 'Publish Post')}
                        </button>
                    </div>
                </div>

                {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl font-bold border border-red-100">{error}</div>}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT — Main fields */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Title <span className="text-red-500">*</span></label>
                            <input type="text" value={title} required onChange={e => { setTitle(e.target.value); markDirty(); }}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-lg font-heading font-bold"
                                placeholder="Your compelling blog title..." />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Slug</label>
                            <div className="flex items-center gap-3">
                                <input type="text" value={slug} onChange={e => { setSlug(slugify(e.target.value)); markDirty(); }}
                                    className={`flex-1 px-4 py-3 rounded-xl border outline-none font-mono text-sm ${slugStatus === 'taken' ? 'border-red-400' : 'border-gray-200 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal'}`}
                                    placeholder="auto-generated-from-title" />
                                <div className="w-32 text-right">{slugStatusUI[slugStatus]}</div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Excerpt <span className="text-gray-400 font-normal">(shown in blog cards)</span></label>
                            <textarea value={excerpt} rows={3} onChange={e => { setExcerpt(e.target.value); markDirty(); }}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
                                placeholder="A short, engaging summary of the post..." />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Content <span className="text-red-500">*</span></label>
                            <Tiptap content={content} onChange={html => { setContent(html); markDirty(); }} />
                        </div>
                    </div>

                    {/* RIGHT — Sidebar */}
                    <div className="space-y-6">
                        {/* Cover Image */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <h3 className="font-bold text-gray-900 font-heading mb-4">Cover Image</h3>
                            {uploadedImages.length > 0 && (
                                <div className="space-y-3 mb-4">
                                    {uploadedImages.map((img, idx) => (
                                        <div key={idx} className={`relative rounded-xl overflow-hidden border-2 transition ${idx === coverIndex ? 'border-brand-teal' : 'border-gray-200'}`}>
                                            <div className="relative aspect-video bg-gray-100">
                                                <Image src={img} alt={`Image ${idx + 1}`} fill className="object-cover" />
                                            </div>
                                            <div className="flex items-center justify-between px-3 py-2 bg-gray-50">
                                                <button type="button" onClick={() => { setCoverIndex(idx); markDirty(); }}
                                                    className={`text-xs font-bold px-3 py-1 rounded-full transition ${idx === coverIndex ? 'bg-brand-teal text-white' : 'bg-white border border-gray-300 text-gray-600 hover:border-brand-teal hover:text-brand-teal'}`}>
                                                    {idx === coverIndex ? '✓ Cover' : 'Set as Cover'}
                                                </button>
                                                <button type="button" onClick={() => removeImage(idx)} className="text-xs text-red-400 hover:text-red-600 font-bold">Remove</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <input ref={coverInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleCoverUpload} />
                            <button type="button" onClick={() => coverInputRef.current?.click()} disabled={isUploadingCover}
                                className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-sm font-bold text-gray-500 hover:border-brand-teal hover:text-brand-teal transition disabled:opacity-50">
                                {isUploadingCover ? '↑ Uploading…' : '+ Upload Images'}
                            </button>
                            <p className="text-xs text-gray-400 mt-2">First image is cover by default.</p>
                        </div>

                        {/* Post Details */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
                            <h3 className="font-bold text-gray-900 font-heading">Post Details</h3>

                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1.5">Category <span className="text-gray-400 font-normal">(type to search or create)</span></label>
                                <SearchableCombobox
                                    options={categories.map(c => ({ id: c.id, name: c.name }))}
                                    value={categoryId}
                                    onChange={(id) => { setCategoryId(id); markDirty(); }}
                                    onCreateNew={handleCreateCategory}
                                    placeholder="Search or create category…"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1.5">Author <span className="text-gray-400 font-normal">(type to search or create)</span></label>
                                <SearchableCombobox
                                    options={authors.map(a => ({ id: a.id, name: a.name }))}
                                    value={authorId}
                                    onChange={(id) => { setAuthorId(id); markDirty(); }}
                                    onCreateNew={handleCreateAuthor}
                                    placeholder="Search or create author…"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1.5">Publish Date</label>
                                <input type="date" value={date} onChange={e => { setDate(e.target.value); markDirty(); }}
                                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-brand-teal outline-none text-sm" />
                            </div>

                            {/* Read time with auto/manual toggle */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="text-xs font-bold text-gray-600">Read Time</label>
                                    <button type="button" onClick={() => setReadTimeManual(m => !m)}
                                        className={`text-xs font-bold px-2 py-0.5 rounded-full transition ${readTimeManual ? 'bg-gray-200 text-gray-600' : 'bg-teal-100 text-brand-teal'}`}>
                                        {readTimeManual ? '✎ Manual' : '⚡ Auto'}
                                    </button>
                                </div>
                                <input type="text" value={readTime}
                                    onChange={e => { setReadTime(e.target.value); setReadTimeManual(true); markDirty(); }}
                                    placeholder="e.g. 5 min read"
                                    className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition ${readTimeManual ? 'border-gray-300 bg-white focus:border-brand-teal' : 'border-teal-200 bg-teal-50 text-teal-700'}`} />
                                {!readTimeManual && <p className="text-xs text-gray-400 mt-1">Auto-calculated from word count. Click ✎ Manual to override.</p>}
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <div>
                                    <p className="text-xs font-bold text-gray-700">Featured Post</p>
                                    <p className="text-xs text-gray-400">Highlighted on the blog homepage</p>
                                </div>
                                <button type="button" onClick={() => { setIsFeatured(!isFeatured); markDirty(); }}
                                    className={`relative w-12 h-6 rounded-full transition-colors ${isFeatured ? 'bg-brand-teal' : 'bg-gray-300'}`}>
                                    <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${isFeatured ? 'translate-x-6' : ''}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/* Preview Modal */}
            {isPreview && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-auto">
                    <div className="min-h-screen bg-white max-w-4xl mx-auto">
                        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">Preview Mode</span>
                                <span className="text-sm text-gray-500 font-body">This is how the post will appear to readers</span>
                            </div>
                            <button onClick={() => setIsPreview(false)} className="bg-brand-teal text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-teal-700 transition">✕ Close Preview</button>
                        </div>
                        <article className="px-8 py-12">
                            {uploadedImages[coverIndex] && (
                                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 shadow-lg">
                                    <Image src={uploadedImages[coverIndex]} alt={title} fill className="object-cover" />
                                </div>
                            )}
                            <div className="max-w-2xl mx-auto">
                                <h1 className="text-4xl font-heading font-extrabold text-gray-900 leading-tight mb-4">{title || 'Untitled Post'}</h1>
                                {excerpt && <p className="text-xl text-gray-500 font-body mb-8 leading-relaxed">{excerpt}</p>}
                                <div className="flex items-center gap-4 text-sm text-gray-400 font-body mb-10 pb-8 border-b border-gray-100">
                                    {date && <span>{new Date(date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>}
                                    {readTime && <span>· {readTime}</span>}
                                </div>
                                <div className="prose prose-lg max-w-none prose-headings:font-heading prose-a:text-brand-teal"
                                    dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-400">No content yet…</p>' }} />
                            </div>
                        </article>
                    </div>
                </div>
            )}
        </>
    );
}
