/**
 * Uploads a file via the server-side /api/upload endpoint (backed by Cloudinary)
 * and returns the public download URL.
 */
export async function uploadImage(file: File): Promise<{ url: string | null; error: string | null }> {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (!response.ok || !data.url) {
            return {
                url: null,
                error: data.error || `Upload failed with status ${response.status}`,
            };
        }

        return { url: data.url, error: null };
    } catch (err: any) {
        console.error("Unexpected upload error:", err);
        return { url: null, error: err.message || "Unknown error during upload" };
    }
}
