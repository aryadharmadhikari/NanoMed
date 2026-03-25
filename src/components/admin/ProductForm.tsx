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
    const [price, setPrice] = useState(initialData?.price || 0);
    const [mrp, setMrp] = useState(initialData?.mrp || 0);
    const [description, setDescription] = useState(initialData?.description || "");
    const [image, setImage] = useState(initialData?.image || "");
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
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setError("");

        const { url, error: uploadError } = await uploadImage(file);

        if (uploadError || !url) {
            setError(uploadError || "Failed to upload image. Make sure the 'product-images' bucket is completely public.");
            setIsUploading(false);
            return;
        }

        setImage(url);
        setIsUploading(false);
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
                price: Number(price),
                mrp: Number(mrp),
                description,
                image,           // Temporary string input until we build the Uploader
                features: cleanFeatures,
                specifications: specificationsObj,
                ideal_for: [],   // Simplification for now
                category_id: null // Uncategorized for now
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
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none" placeholder="E.g., Folding Walking Stick" />
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
                    <label className="block text-sm font-bold text-gray-700 mb-2">Product Image</label>
                    <div className="flex items-start gap-6">
                        {image && (
                            <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200 shrink-0">
                                <Image src={image} alt="Preview" fill className="object-cover" />
                            </div>
                        )}
                        <div className="flex-1">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={isUploading}
                                className="block w-full text-sm text-gray-500 font-body file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-brand-teal hover:file:bg-teal-100 transition disabled:opacity-50"
                            />
                            {isUploading && <p className="text-sm text-brand-teal mt-2 font-bold animate-pulse">Uploading image to Supabase...</p>}
                            <p className="text-xs text-gray-400 mt-2 font-body">Uploading an image overrides the previous one.</p>
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
