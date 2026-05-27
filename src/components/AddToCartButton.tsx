"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

interface AddToCartButtonProps {
    id: string;
    name: string;
    price: number;
    mrp: number | null;
    image: string;
}

export default function AddToCartButton({ id, name, price, mrp, image }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addToCart({ id, name, price, mrp, image }, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="space-y-4">
            {/* Quantity selector */}
            <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-500 font-body uppercase tracking-wide">Qty</span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition text-xl font-light"
                        aria-label="Decrease quantity"
                    >
                        −
                    </button>
                    <span className="w-12 text-center font-bold text-gray-900 font-body text-lg">
                        {quantity}
                    </span>
                    <button
                        onClick={() => setQuantity(q => q + 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition text-xl font-light"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Add to Cart */}
            <button
                onClick={handleAdd}
                className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-200 border-2 ${
                    added
                        ? "bg-green-50 border-green-400 text-green-700"
                        : "bg-white border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white"
                }`}
            >
                {added ? (
                    <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Added to Cart!
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 10a4 4 0 01-8 0" />
                        </svg>
                        Add to Cart
                    </>
                )}
            </button>
        </div>
    );
}
