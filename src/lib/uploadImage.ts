import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Uploads a file to Firebase Storage and returns the public download URL
 */
export async function uploadImage(file: File): Promise<{ url: string | null; error: string | null }> {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const storageRef = ref(storage, `products/${fileName}`);

        const snapshot = await uploadBytes(storageRef, file, {
            contentType: file.type,
        });

        const downloadURL = await getDownloadURL(snapshot.ref);
        return { url: downloadURL, error: null };
    } catch (err: any) {
        console.error("Unexpected upload error:", err);
        return { url: null, error: err.message || "Unknown error during upload" };
    }
}
