"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DatabaseProduct } from "../../types/database";
import { uploadImage } from "../../lib/uploadImage";
import Image from "next/image";

// Basic form component for creating/editing products
export default function ProductForm({ initialData }: { initialData?: DatabaseProduct }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Form State
    const [name, setName] = useState(initialData?.name || "");
    const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
    const [price, setPrice] = useState(initialData?.price || 0);
    const [mrp, setMrp] = useState(initialData?.mrp || 0);
    const [description, setDescription] = useState(initialData?.description || "");
    const [images, setImages] = useState<string[]>(initialData?.images || []);
    const [isUploading, setIsUploading] = useState(false);

    // Arrays and JSON
    const [features, setFeatures] = useState<string[]>(initialData?.features || [""]);

    // For specifications, we populate common defaults for new products
    const defaultSpecs = [
        { key: "Material", value: "" },
        { key: "Weight", value: "" },
        { key: "Dimensions", value: "" },
        { key: "Weight Capacity", value: "" },
        { key: "Color", value: "" }
    ];

    const [specs, setSpecs] = useState<{ key: string, value: string }[]>(() => {
        if (initialData?.specifications && Object.keys(initialData.specifications).length > 0) {
            return Object.entries(initialData.specifications).map(([key, value]) => ({ key, value }));
        }
        return [...defaultSpecs];
    });

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
    };

    const addFeature = () => setFeatures([...features, ""]);
    const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));

    const handleSpecChange = (index: number, field: 'key' | 'value', value: string) => {
        const newSpecs = [...specs];
        newSpecs[index][field] = value;
        setSpecs(newSpecs);
    };

    const addSpec = () => setSpecs([...specs, { key: "", value: "" }]);
    const removeSpec = (index: number) => setSpecs(specs.filter((_, i) => i !== index));

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setIsUploading(true);
        setError("");

        const newUrls: string[] = [];

        for (const file of files) {
            const { url, error: uploadError } = await uploadImage(file);

            if (uploadError || !url) {
                setError(`Failed to upload one or more images. Please fix your Supabase RLS policies.`);
                // Continue trying to upload remaining files
            } else {
                newUrls.push(url);
            }
        }

        // Safely append new images to the existing ones
        if (newUrls.length > 0) {
            setImages(prev => [...prev, ...newUrls]);
        }

        e.target.value = ''; // Reset input to allow re-uploading the same file if needed
        setIsUploading(false);
    };

    const removeImage = (indexToRemove: number) => {
        setImages(images.filter((_, i) => i !== indexToRemove));
    };

    const moveImage = (index: number, direction: 'left' | 'right') => {
        if (direction === 'left' && index === 0) return;
        if (direction === 'right' && index === images.length - 1) return;

        const newImages = [...images];
        const swapIndex = direction === 'left' ? index - 1 : index + 1;

        // Swap
        [newImages[index], newImages[swapIndex]] = [newImages[swapIndex], newImages[index]];
        setImages(newImages);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            // Convert specs array back to Record object
            const specificationsObj = specs.reduce((acc, curr) => {
                if (curr.key.trim() && curr.value.trim()) {
                    acc[curr.key.trim()] = curr.value.trim();
                }
                return acc;
            }, {} as Record<string, string>);

            // Filter out empty features
            const cleanFeatures = features.filter(f => f.trim() !== "");

            // Import the server action dynamically to avoid client/server conflicts
            const { createProduct, updateProduct } = await import("../../lib/actions/productActions");

            const productData = {
                name,
                subtitle: subtitle.trim() || null,
                price: Number(price),
                mrp: Number(mrp),
                description,
                images,
                features: cleanFeatures,
                specifications: specificationsObj,
                ideal_for: [],
                category_id: initialData?.category_id || null
            };

            let result;
            if (initialData?.id) {
                result = await updateProduct(initialData.id, productData);
            } else {
                result = await createProduct(productData);
            }

            if (result.error) throw new Error(result.error);

            router.push('/admin');
            router.refresh(); // Force a refresh to show new data

        } catch (err: any) {
            setError(err.message || "Failed to save product.");
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-4xl">
            {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg font-bold">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Basic Info */}
                <div className="col-span-full">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none" placeholder="E.g., Foldable Aluminium Walking Stick" />
                </div>

                <div className="col-span-full">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Subtitle <span className="font-normal text-gray-400">(short tagline shown below the name)</span></label>
                    <input type="text" value={subtitle} onChange={e => setSubtitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none" placeholder="E.g., Lightweight Adjustable Cane for Men, Women & Seniors" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Selling Price (₹)</label>
                    <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Maximum Retail Price - MRP (₹)</label>
                    <input type="number" value={mrp} onChange={e => setMrp(Number(e.target.value))} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none" />
                </div>

                <div className="col-span-full">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none" placeholder="Detailed product description..."></textarea>
                </div>

                <div className="col-span-full">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Product Images (Gallery & Sequence)</label>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                        {images.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-6">
                                {images.map((img, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-lg border border-gray-200 bg-white overflow-hidden group shadow-sm">
                                        <Image src={img} alt={`Img ${idx}`} fill className="object-contain p-2" />

                                        {/* Status badges */}
                                        {idx === 0 && (
                                            <span className="absolute top-1 left-1 bg-brand-teal text-white text-[10px] font-bold px-2 py-0.5 rounded shadow z-10">Primary</span>
                                        )}

                                        {/* Removing */}
                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-md hover:bg-red-600 font-bold z-10"
                                            title="Remove Image"
                                        >
                                            ×
                                        </button>

                                        {/* Reordering Controls (Bottom) */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-1 flex justify-between opacity-0 group-hover:opacity-100 transition duration-200 items-center z-10">
                                            <button
                                                type="button"
                                                onClick={() => moveImage(idx, 'left')}
                                                disabled={idx === 0}
                                                className="text-white hover:text-brand-teal disabled:opacity-30 disabled:hover:text-white p-1"
                                                title="Move Left"
                                            >
                                                ◀
                                            </button>
                                            <span className="text-white text-xs font-mono font-bold">{idx + 1}</span>
                                            <button
                                                type="button"
                                                onClick={() => moveImage(idx, 'right')}
                                                disabled={idx === images.length - 1}
                                                className="text-white hover:text-brand-teal disabled:opacity-30 disabled:hover:text-white p-1"
                                                title="Move Right"
                                            >
                                                ▶
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex-1 max-w-md">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                disabled={isUploading}
                                className="block w-full text-sm text-gray-500 font-body file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-brand-teal hover:file:bg-teal-100 transition disabled:opacity-50"
                            />
                            {isUploading && <p className="text-sm text-brand-teal mt-2 font-bold animate-pulse">Uploading securely to Cloud Storage...</p>}
                            <p className="text-xs text-gray-400 mt-2 font-body">Select multiple images at once. Drag controls are below each image to choose the exact display sequence.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-100 pt-8 mb-8 pb-8 border-b">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900 font-heading">Key Features</h3>
                    <button type="button" onClick={addFeature} className="text-brand-teal text-sm font-bold hover:underline bg-teal-50 px-3 py-1 rounded-full">+ Add Feature</button>
                </div>
                {features.map((feature, i) => (
                    <div key={i} className="flex gap-3 mb-3">
                        <input type="text" value={feature} onChange={e => handleFeatureChange(i, e.target.value)} className="flex-1 px-4 py-2 rounded-lg border border-gray-200 outline-none" placeholder="E.g., Lightweight Aluminium Frame" />
                        <button type="button" onClick={() => removeFeature(i)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg">🗑️</button>
                    </div>
                ))}
            </div>

            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900 font-heading">Technical Specifications</h3>
                    <button type="button" onClick={addSpec} className="text-brand-teal text-sm font-bold hover:underline bg-teal-50 px-3 py-1 rounded-full">+ Add Spec</button>
                </div>
                {specs.map((spec, i) => (
                    <div key={i} className="flex gap-3 mb-3">
                        <input type="text" value={spec.key} onChange={e => handleSpecChange(i, 'key', e.target.value)} className="w-1/3 px-4 py-2 rounded-lg border border-gray-200 outline-none font-bold" placeholder="Key (e.g., Weight)" />
                        <input type="text" value={spec.value} onChange={e => handleSpecChange(i, 'value', e.target.value)} className="flex-1 px-4 py-2 rounded-lg border border-gray-200 outline-none" placeholder="Value (e.g., 4kg)" />
                        <button type="button" onClick={() => removeSpec(i)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg">🗑️</button>
                    </div>
                ))}
            </div>

            <div className="flex justify-end gap-4">
                <button type="button" onClick={() => router.push('/admin')} className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="bg-brand-teal text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-700 transition disabled:opacity-50 shadow-lg shadow-teal-100">
                    {isSubmitting ? 'Saving...' : (initialData ? 'Update Product' : 'Save New Product')}
                </button>
            </div>
        </form>
    );
}
