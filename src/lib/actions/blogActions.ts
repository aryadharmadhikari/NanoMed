"use server";

import { db } from "../firebase";
import { revalidatePath } from "next/cache";
import {
    collection,
    getDocs,
    doc,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
} from "firebase/firestore";
import { DatabaseBlog, DatabaseCategory, DatabaseAuthor } from "../../types/database";

export async function getAdminBlogs() {
    try {
        const snapshot = await getDocs(collection(db, "blogs"));
        const blogs = snapshot.docs.map(d => ({
            id: d.id,
            ...d.data(),
        })) as DatabaseBlog[];

        blogs.sort((a, b) => {
            const timeA = new Date(a.date || 0).getTime();
            const timeB = new Date(b.date || 0).getTime();
            return timeB - timeA;
        });

        return { data: blogs, error: null };
    } catch (error: any) {
        return { error: error.message, data: null };
    }
}

export async function getBlogBySlug(slug: string) {
    try {
        const q = query(collection(db, "blogs"), where("slug", "==", slug));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return { data: null, error: "Blog not found" };
        }

        const blogDoc = snapshot.docs[0];
        const blog = {
            id: blogDoc.id,
            ...blogDoc.data(),
        } as DatabaseBlog;

        return { data: blog, error: null };
    } catch (error: any) {
        return { error: error.message, data: null };
    }
}

export async function checkSlugExists(slug: string, excludeId?: string) {
    try {
        const q = query(collection(db, "blogs"), where("slug", "==", slug));
        const snapshot = await getDocs(q);

        const matchingDocs = snapshot.docs.filter(d => (excludeId ? d.id !== excludeId : true));
        return { exists: matchingDocs.length > 0, error: null };
    } catch (error: any) {
        return { exists: false, error: error.message };
    }
}

export async function createBlog(blogData: any) {
    try {
        const docRef = await addDoc(collection(db, "blogs"), blogData);

        revalidatePath('/admin/blog');
        revalidatePath('/blog');
        return { success: true, data: [{ id: docRef.id, ...blogData }] };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function updateBlog(id: string, blogData: any) {
    try {
        await updateDoc(doc(db, "blogs", id), blogData);

        revalidatePath('/admin/blog');
        revalidatePath('/blog');
        revalidatePath(`/blog/${blogData.slug}`);
        return { success: true, data: [{ id, ...blogData }] };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function deleteBlog(id: string, slug: string) {
    try {
        await deleteDoc(doc(db, "blogs", id));

        revalidatePath('/admin/blog');
        revalidatePath('/blog');
        revalidatePath(`/blog/${slug}`);
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function getBlogCategories() {
    try {
        const snapshot = await getDocs(collection(db, "blog_categories"));
        const categories = snapshot.docs.map(d => ({
            id: d.id,
            ...d.data(),
        })) as DatabaseCategory[];

        categories.sort((a, b) => a.name.localeCompare(b.name));
        return { data: categories, error: null };
    } catch (error: any) {
        return { data: [], error: error.message };
    }
}

export async function getAuthors() {
    try {
        const snapshot = await getDocs(collection(db, "authors"));
        const authors = snapshot.docs.map(d => ({
            id: d.id,
            ...d.data(),
        })) as DatabaseAuthor[];

        authors.sort((a, b) => a.name.localeCompare(b.name));
        return { data: authors, error: null };
    } catch (error: any) {
        return { data: [], error: error.message };
    }
}

export async function createBlogCategory(name: string) {
    try {
        const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const docRef = await addDoc(collection(db, "blog_categories"), { name, slug });
        revalidatePath('/admin/blog');
        return { data: { id: docRef.id, name, slug }, error: null };
    } catch (error: any) {
        return { error: error.message, data: null };
    }
}

export async function createAuthor(name: string) {
    try {
        const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const authorData = { id, name, role: 'Author', bio: null, avatar: '' };
        await setDoc(doc(db, "authors", id), authorData);
        return { data: authorData, error: null };
    } catch (error: any) {
        return { error: error.message, data: null };
    }
}
