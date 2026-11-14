import { NextRequest, NextResponse } from "next/server";
import { isCloudinaryConfigured, uploadToCloudinary } from "../../../lib/cloudinary";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Check if Cloudinary is configured
        if (!isCloudinaryConfigured()) {
            console.error(
                "[Upload Error] Cloudinary credentials are not detected in process.env. Did you restart the Next.js dev server after editing .env.local?"
            );
            return NextResponse.json(
                {
                    error: "Cloudinary credentials not detected. Please restart your Next.js development server (Ctrl+C then npm run dev) to load .env.local.",
                },
                { status: 500 }
            );
        }

        // Upload to Cloudinary
        const { url, public_id } = await uploadToCloudinary(buffer, "nanomed/products");

        return NextResponse.json({
            success: true,
            url,
            public_id,
            provider: "cloudinary",
        });
    } catch (error: any) {
        console.error("[Upload Error]:", error);
        return NextResponse.json(
            { error: error.message || "Failed to upload image to Cloudinary" },
            { status: 500 }
        );
    }
}
