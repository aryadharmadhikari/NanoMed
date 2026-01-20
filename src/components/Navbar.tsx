"use client"; // Required because we are using State (interactivity)

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-20">
                    {/* LEFT: Logo */}
                    <div className="text-2xl font-bold text-blue-600">
                        <Link href="/">NANOMED</Link>
                    </div>

                    {/* 2. Desktop Menu (Hidden on Mobile) */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition">Home</Link>
                        <Link href="/products" className="text-gray-600 hover:text-blue-600 font-medium transition">Catalog</Link>
                        <Link href="/blog" className="text-gray-600 hover:text-blue-600 font-medium transition">Blog</Link>
                        <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium transition">About</Link>
                        <Link
                            href="/products"
                            className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition"
                        >
                            Order Now
                        </Link>
                        {/* Replace the Desktop Menu code in Navbar.tsx with this to include the search input */}
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
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 py-6 px-6 space-y-4 shadow-xl">
                    <Link href="/" onClick={() => setIsOpen(false)} className="block text-lg font-semibold text-gray-900">Home</Link>
                    <Link href="/products" onClick={() => setIsOpen(false)} className="block text-lg font-semibold text-gray-900">Catalog</Link>
                    <Link href="/blog" onClick={() => setIsOpen(false)} className="block text-lg font-semibold text-gray-900">Blog</Link>
                    <Link href="/about" onClick={() => setIsOpen(false)} className="block text-lg font-semibold text-gray-900">About</Link>
                    <Link
                        href="/products"
                        onClick={() => setIsOpen(false)}
                        className="block w-full text-center bg-blue-600 text-white py-4 rounded-xl font-bold"
                    >
                        Order Now
                    </Link>
                </div>
            )}
        </nav>
    );
}

