import { NextRequest, NextResponse } from "next/server";
import { isCloudinaryConfigured, uploadToCloudinary } from "../../../lib/cloudinary";
import { storage } from "../../../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const contentType = file.type || "image/jpeg";
        const fileName = file.name || "upload.jpg";

        // 1. Primary: Use Cloudinary if credentials are configured
        if (isCloudinaryConfigured()) {
            const { url, public_id } = await uploadToCloudinary(buffer, "nanomed/products");

            return NextResponse.json({
                success: true,
                url,
                public_id,
                provider: "cloudinary",
            });
        }

        // 2. Fallback: If Cloudinary keys are not yet provided, fall back to Firebase Storage
        console.warn(
            "[Upload] Cloudinary is not configured. Falling back to Firebase Storage. Please configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.local."
        );

        const fileExt = fileName.includes(".") ? fileName.split(".").pop() : "jpg";
        const uniqueName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const storageRef = ref(storage, `products/${uniqueName}`);

        const snapshot = await uploadBytes(storageRef, new Uint8Array(buffer), {
            contentType,
        });

        const downloadURL = await getDownloadURL(snapshot.ref);

        return NextResponse.json({
            success: true,
            url: downloadURL,
            provider: "firebase",
        });
    } catch (error: any) {
        console.error("Error handling file upload:", error);
        return NextResponse.json(
            { error: error.message || "Failed to upload image" },
            { status: 500 }
        );
    }
}
