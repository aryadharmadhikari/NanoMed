"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "./icons";

interface ProductGalleryProps {
    images: string[];
    fallbackImage: string;
    productName: string;
    categoryName: string;
}

function ArrowButton({ dir, disabled, onClick }: { dir: 'left' | 'right'; disabled: boolean; onClick: () => void }) {
    return (
        <button
            onClick={(e) => { e.stopPropagation(); if (!disabled) onClick(); }}
            className={`absolute ${dir === 'left' ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm shadow-lg rounded-full flex items-center justify-center text-brand-teal hover:bg-white hover:scale-110 transition-all duration-200 ${disabled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            {dir === 'left' ? <ChevronLeft /> : <ChevronRight />}
        </button>
    );
}

export default function ProductGallery({ images, fallbackImage, productName, categoryName }: ProductGalleryProps) {
    const galleryImages = images && images.length > 0 ? images : [fallbackImage];
    const total = galleryImages.length;
    const [activeIndex, setActiveIndex] = useState(0);
    const [fadeKey, setFadeKey] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lbIndex, setLbIndex] = useState(0);

    const goTo = useCallback((i: number) => {
        setActiveIndex(i);
        setFadeKey(k => k + 1);
    }, []);

    const openLightbox = () => {
        setLbIndex(activeIndex);
        setLightboxOpen(true);
    };

    // Lock body scroll when lightbox open
    useEffect(() => {
        document.body.style.overflow = lightboxOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [lightboxOpen]);

    // Keyboard nav in lightbox
    useEffect(() => {
        if (!lightboxOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightboxOpen(false);
            if (e.key === 'ArrowLeft') setLbIndex(i => Math.max(0, i - 1));
            if (e.key === 'ArrowRight') setLbIndex(i => Math.min(total - 1, i + 1));
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [lightboxOpen, total]);

    return (
        <>
            {/* ── Main gallery view ───────────────────────────── */}
            <div className="space-y-4 sticky top-24">
                <div className="relative aspect-square w-full bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 group">
                    <Image
                        key={fadeKey}
                        src={galleryImages[activeIndex]}
                        alt={`${productName} - view ${activeIndex + 1}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-contain p-12 gallery-image-fade cursor-zoom-in"
                        onDoubleClick={openLightbox}
                    />

                    {/* Category badge */}
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur shadow-sm px-4 py-1 rounded-full text-xs font-bold text-brand-teal font-body z-10 pointer-events-none">
                        {categoryName}
                    </div>

                    {/* Double-click hint */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 text-white text-[10px] font-bold px-2.5 py-1 rounded-full pointer-events-none">
                        Double-click to enlarge
                    </div>

                    {/* Left / Right arrows (only when multiple images) */}
                    {total > 1 && (
                        <>
                            <ArrowButton dir="left" disabled={activeIndex === 0} onClick={() => goTo(activeIndex - 1)} />
                            <ArrowButton dir="right" disabled={activeIndex === total - 1} onClick={() => goTo(activeIndex + 1)} />
                        </>
                    )}
                </div>

                {/* Thumbnail strip */}
                {total > 1 && (
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                        {galleryImages.map((src, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeIndex === i
                                    ? 'border-brand-teal shadow-md opacity-100'
                                    : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-200'
                                    }`}
                            >
                                <div className="absolute inset-0 bg-gray-50" />
                                <Image src={src} alt={`Thumb ${i + 1}`} fill sizes="10vw" className="object-contain p-2" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Lightbox ────────────────────────────────────── */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center"
                    onClick={() => setLightboxOpen(false)}
                >
                    {/* Close button */}
                    <button
                        className="absolute top-5 right-5 z-20 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl font-bold transition"
                        onClick={() => setLightboxOpen(false)}
                    >
                        ✕
                    </button>

                    {/* Image counter */}
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 bg-white/10 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                        {lbIndex + 1} / {total}
                    </div>

                    {/* Image area — no stopPropagation so clicking backdrop/letterbox closes */}
                    <div
                        className="relative w-[90vw] h-[90vh] flex items-center justify-center"
                    >
                        {/* Left arrow */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setLbIndex(i => Math.max(0, i - 1)); }}
                            className={`absolute left-0 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition ${lbIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                        >
                            <ChevronLeft />
                        </button>

                        {/* Right arrow */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setLbIndex(i => Math.min(total - 1, i + 1)); }}
                            className={`absolute right-0 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition ${lbIndex === total - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                        >
                            <ChevronRight />
                        </button>

                        {/* Zoomable image container */}
                        <div className="relative w-full h-full select-none">
                            <Image
                                key={lbIndex}
                                src={galleryImages[lbIndex]}
                                alt={`${productName} enlarged`}
                                fill
                                sizes="90vw"
                                className="object-contain gallery-image-fade"
                                draggable={false}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
