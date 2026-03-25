import { supabase } from "./supabase";

/**
 * Uploads a file to Supabase Storage and returns the public URL
 * Note: You must create a 'public' bucket named 'product-images' in Supabase first.
 */
export async function uploadImage(file: File): Promise<{ url: string | null; error: string | null }> {
    try {
        // Generate a unique file name
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `products/${fileName}`; // Folders inside the bucket

        const { data, error } = await supabase.storage
            .from('product-images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error("Upload error:", error);
            return { url: null, error: error.message };
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);

        return { url: publicUrlData.publicUrl, error: null };
    } catch (err: any) {
        console.error("Unexpected upload error:", err);
        return { url: null, error: err.message || "Unknown error during upload" };
    }
}
