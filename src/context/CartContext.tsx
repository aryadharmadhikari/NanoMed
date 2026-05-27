"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CartItem {
    id: string;
    name: string;
    price: number;
    mrp: number | null;
    image: string;
    quantity: number;
}

interface CartContextValue {
    cartItems: CartItem[];
    itemCount: number;
    subtotal: number;
    addToCart: (item: Omit<CartItem, "quantity">, qty?: number) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

// ── Context ───────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "nanomed_cart";

// ── Provider ──────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [hydrated, setHydrated] = useState(false);

    // Rehydrate from localStorage on mount (client-only)
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) setCartItems(JSON.parse(stored));
        } catch {
            // Corrupt storage — start fresh
        }
        setHydrated(true);
    }, []);

    // Persist to localStorage whenever cart changes (after hydration)
    useEffect(() => {
        if (!hydrated) return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems, hydrated]);

    // ── Actions ───────────────────────────────────────────────────────────────

    const addToCart = useCallback((item: Omit<CartItem, "quantity">, qty = 1) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                // Increment quantity if already in cart
                return prev.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
                );
            }
            return [...prev, { ...item, quantity: qty }];
        });
    }, []);

    const removeFromCart = useCallback((id: string) => {
        setCartItems(prev => prev.filter(i => i.id !== id));
    }, []);

    const updateQuantity = useCallback((id: string, quantity: number) => {
        if (quantity < 1) return; // Prevent zero/negative quantities
        setCartItems(prev =>
            prev.map(i => (i.id === id ? { ...i, quantity } : i))
        );
    }, []);

    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    // ── Derived values ────────────────────────────────────────────────────────

    const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cartItems, itemCount, subtotal, addToCart, removeFromCart, updateQuantity, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useCart(): CartContextValue {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
    return ctx;
}
