"use server";

import { supabase } from "../supabase";
import { DatabaseProduct } from "../../types/database";
import { revalidatePath } from "next/cache";

export async function getAdminProducts() {
    // For now, sorting by newest first
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            product_categories (
                name
            )
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching products row:", error);
        return { error: error.message, data: null };
    }

    return { data: data as DatabaseProduct[], error: null };
}

export async function deleteProduct(id: string) {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        console.error("Error deleting product:", error);
        return { error: error.message };
    }

    // Revalidate the admin and public product pages so the removed item disappears
    revalidatePath('/admin');
    revalidatePath('/products');
    
    return { success: true };
}

export async function createProduct(productData: any) {
    const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select();

    if (error) {
        console.error("Error creating product:", error);
        return { error: error.message };
    }

    revalidatePath('/admin');
    revalidatePath('/products');
    return { success: true, data };
}

export async function updateProduct(id: string, productData: any) {
    const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id)
        .select();

    if (error) {
        console.error("Error updating product:", error);
        return { error: error.message };
    }

    revalidatePath('/admin');
    revalidatePath('/products');
    revalidatePath(`/products/${id}`);
    return { success: true, data };
}
