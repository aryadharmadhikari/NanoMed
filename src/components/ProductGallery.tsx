"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
    images: string[];
    fallbackImage: string;
    productName: string;
    categoryName: string;
}

export default function ProductGallery({ images, fallbackImage, productName, categoryName }: ProductGalleryProps) {
    // Determine the list of images to display. If the images array is empty or undefined, use the fallback primary image.
    const galleryImages = images && images.length > 0 ? images : [fallbackImage];
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="space-y-4 sticky top-24">
            {/* Main Image View */}
            <div className="relative aspect-square w-full bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 group">
                <Image
                    src={galleryImages[activeIndex]}
                    alt={`${productName} - Image ${activeIndex + 1}`}
                    fill
                    className="object-contain p-12 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur shadow-sm px-4 py-1 rounded-full text-xs font-bold text-brand-teal font-body">
                    {categoryName}
                </div>
            </div>

            {/* Thumbnails Row */}
            {galleryImages.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                    {galleryImages.map((imgUrl, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                                activeIndex === index 
                                    ? "border-brand-teal shadow-md opacity-100" 
                                    : "border-transparent opacity-60 hover:opacity-100 hover:border-gray-200"
                            }`}
                        >
                            <div className="absolute inset-0 bg-gray-50"></div>
                            <Image
                                src={imgUrl}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                className="object-contain p-2"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
