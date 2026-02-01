"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            setIsOpen(false); // Close mobile menu if open
            router.push(`/products?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-20">
                    {/* LEFT: Logo Image */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/images/NanoMed-Logo-Horizontal.png"
                            alt="NanoMed Logo"
                            width={2048}
                            height={1024}
                            className="h-10 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* 2. Desktop Menu (Hidden on Mobile) */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-600 hover:text-brand-teal font-medium transition">Home</Link>
                        <Link href="/products" className="text-gray-600 hover:text-brand-teal font-medium transition">Products</Link>
                        <Link href="/blog" className="text-gray-600 hover:text-brand-teal font-medium transition">Blog</Link>
                        <Link href="/about" className="text-gray-600 hover:text-brand-teal font-medium transition">About Us</Link>
                        <Link href="/contact" className="text-gray-600 hover:text-brand-teal font-medium transition">Contact Us</Link>
                        <Link
                            href="/products"
                            className="bg-brand-teal text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-teal-700 transition"
                        >
                            Order Now
                        </Link>
                        <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-40 text-gray-700 placeholder-gray-400"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        window.location.href = `/products?query=${e.currentTarget.value}`;
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* 3. Mobile Hamburger Button (Hidden on Desktop) */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-blue-600 focus:outline-none"
                        >
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* 4. Mobile Menu Overlay (Animated) */}
            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 py-6 px-6 space-y-4 shadow-xl">
                    {/* Mobile Search Bar (Inside the Menu) */}
                    <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search medical equipment..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none focus:ring-0 text-base ml-2 w-full text-gray-700"
                            onKeyDown={handleSearch}
                        />
                    </div>
                    <Link href="/" onClick={() => setIsOpen(false)} className="block text-lg font-semibold text-gray-900">Home</Link>
                    <Link href="/products" onClick={() => setIsOpen(false)} className="block text-lg font-semibold text-gray-900">Products</Link>
                    <Link href="/blog" onClick={() => setIsOpen(false)} className="block text-lg font-semibold text-gray-900">Blog</Link>
                    <Link href="/about" onClick={() => setIsOpen(false)} className="block text-lg font-semibold text-gray-900">About Us</Link>
                    <Link href="/contact" onClick={() => setIsOpen(false)} className="block text-lg font-semibold text-gray-900">Contact Us</Link>
                    <Link
                        href="/products"
                        onClick={() => setIsOpen(false)}
                        className="block w-full text-center bg-brand-teal text-white py-4 rounded-xl font-bold shadow-lg"
                    >
                        Order Now
                    </Link>
                </div>
            )}
        </nav>
    );
}

