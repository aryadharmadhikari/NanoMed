import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

function configureCloudinary() {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
    });
}

export function isCloudinaryConfigured(): boolean {
    return Boolean(
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
    );
}

export async function uploadToCloudinary(
    buffer: Buffer,
    folder: string = "nanomed/products"
): Promise<{ url: string; public_id: string }> {
    if (!isCloudinaryConfigured()) {
        throw new Error(
            "Cloudinary credentials (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are missing or server needs a restart."
        );
    }

    // Ensure config is fresh with current process.env
    configureCloudinary();

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image",
            },
            (error, result: UploadApiResponse | undefined) => {
                if (error || !result) {
                    return reject(error || new Error("Cloudinary upload failed"));
                }
                resolve({
                    url: result.secure_url,
                    public_id: result.public_id,
                });
            }
        );

        uploadStream.end(buffer);
    });
}
