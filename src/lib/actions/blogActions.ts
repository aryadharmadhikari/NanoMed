"use server";

import { supabase } from "../supabase";
import { revalidatePath } from "next/cache";

export async function getAdminBlogs() {
    const { data, error } = await supabase
        .from('blogs')
        .select('*, blog_categories(name), authors(name)')
        .order('date', { ascending: false });

    if (error) return { error: error.message, data: null };
    return { data, error: null };
}

export async function getBlogBySlug(slug: string) {
    const { data, error } = await supabase
        .from('blogs')
        .select('*, blog_categories(name), authors(*)')
        .eq('slug', slug)
        .single();

    if (error) return { error: error.message, data: null };
    return { data, error: null };
}

export async function checkSlugExists(slug: string, excludeId?: string) {
    let query = supabase.from('blogs').select('id').eq('slug', slug);
    if (excludeId) query = query.neq('id', excludeId);

    const { data, error } = await query;
    if (error) return { exists: false, error: error.message };
    return { exists: (data?.length ?? 0) > 0, error: null };
}

export async function createBlog(blogData: any) {
    const { data, error } = await supabase
        .from('blogs')
        .insert([blogData])
        .select();

    if (error) return { error: error.message };

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    return { success: true, data };
}

export async function updateBlog(id: string, blogData: any) {
    const { data, error } = await supabase
        .from('blogs')
        .update(blogData)
        .eq('id', id)
        .select();

    if (error) return { error: error.message };

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    revalidatePath(`/blog/${blogData.slug}`);
    return { success: true, data };
}

export async function deleteBlog(id: string, slug: string) {
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) return { error: error.message };

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    return { success: true };
}

export async function getBlogCategories() {
    const { data, error } = await supabase.from('blog_categories').select('*').order('name');
    return { data: data || [], error };
}

export async function getAuthors() {
    const { data, error } = await supabase.from('authors').select('*').order('name');
    return { data: data || [], error };
}

export async function createBlogCategory(name: string) {
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const { data, error } = await supabase
        .from('blog_categories')
        .insert([{ name, slug }])
        .select()
        .single();
    if (error) return { error: error.message, data: null };
    revalidatePath('/admin/blog');
    return { data, error: null };
}

export async function createAuthor(name: string) {
    const { data, error } = await supabase
        .from('authors')
        .insert([{ name, role: 'Author', bio: null, avatar: null }])
        .select()
        .single();
    if (error) return { error: error.message, data: null };
    return { data, error: null };
}
