"use client";

import { useCart } from "../../context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "../../components/icons";
import Script from "next/script";
import { useState } from "react";

const WHATSAPP_NUMBER = "917738281416";

function buildWhatsAppMessage(cartItems: ReturnType<typeof useCart>["cartItems"], subtotal: number): string {
    const lines = cartItems.map(
        (item, i) =>
            `${i + 1}. ${item.name} (x${item.quantity}) — ₹${(item.price * item.quantity).toLocaleString("en-IN")}`
    );
    return [
        "Hi! I'd like to place an order for the following items:",
        "",
        ...lines,
        "",
        `Order Total: ₹${subtotal.toLocaleString("en-IN")}`,
        "",
        "Could you please help me complete this purchase?",
    ].join("\n");
}

export default function CartPage() {
    const { cartItems, itemCount, subtotal, removeFromCart, updateQuantity, clearCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            // 1. Create order
            const response = await fetch('/api/razorpay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: subtotal })
            });
            const order = await response.json();

            if (order.error) throw new Error(order.error);

            // 2. Initialize Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use NEXT_PUBLIC for client
                amount: order.amount,
                currency: order.currency,
                name: "NanoMed",
                description: "Checkout Payment",
                order_id: order.id,
                handler: function (response: any) {
                    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                    clearCart();
                },
                prefill: {
                    name: "Customer Name",
                    email: "customer@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#2d8c8f" // brand-teal
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', function (response: any) {
                alert(`Payment failed: ${response.error.description}`);
            });
            rzp.open();
        } catch (error) {
            console.error("Payment failed", error);
            alert("Failed to initiate payment. Please try again or use WhatsApp.");
        } finally {
            setIsProcessing(false);
        }
    };

    // ── Empty state ───────────────────────────────────────────────────────────
    if (cartItems.length === 0) {
        return (
            <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-24">
                <div className="text-center max-w-sm">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 10a4 4 0 01-8 0" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold font-heading text-gray-900 mb-2">Your cart is empty</h1>
                    <p className="text-gray-500 font-body mb-8">Add products from the catalog to get started.</p>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 bg-brand-teal text-white px-6 py-3 rounded-full font-bold hover:bg-teal-700 transition"
                    >
                        Browse Products
                    </Link>
                </div>
            </main>
        );
    }

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        buildWhatsAppMessage(cartItems, subtotal)
    )}`;

    return (
        <>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 py-12">

                {/* Back link */}
                <Link href="/products" className="inline-flex items-center gap-3 mb-10 group w-fit">
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white group-hover:bg-brand-teal transition-colors duration-200 shadow-sm border border-gray-100">
                        <ArrowLeft className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors duration-200" />
                    </span>
                    <span className="text-gray-500 group-hover:text-brand-teal font-semibold font-body transition-colors duration-200 text-sm">
                        Continue Shopping
                    </span>
                </Link>

                <h1 className="text-3xl md:text-4xl font-extrabold font-heading text-gray-900 mb-2">
                    Your Cart
                </h1>
                <p className="text-gray-400 font-body mb-10">
                    {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

                    {/* ── Item list ─────────────────────────────────────────── */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-5 items-center"
                            >
                                {/* Thumbnail */}
                                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50 flex-none border border-gray-100">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="80px"
                                        className="object-contain p-1"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold font-heading text-gray-900 leading-snug line-clamp-2">
                                        {item.name}
                                    </p>
                                    <p className="text-brand-teal font-bold font-body mt-1">
                                        ₹{item.price.toLocaleString("en-IN")}
                                        <span className="text-gray-400 font-normal text-sm"> / unit</span>
                                    </p>
                                </div>

                                {/* Quantity controls */}
                                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden flex-none">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition disabled:opacity-30 text-lg"
                                        aria-label="Decrease quantity"
                                    >
                                        −
                                    </button>
                                    <span className="w-10 text-center font-bold text-gray-900 font-body">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition text-lg"
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Line total */}
                                <p className="font-black font-body text-gray-900 w-24 text-right flex-none">
                                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                </p>

                                {/* Remove */}
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-gray-300 hover:text-red-400 transition flex-none ml-1"
                                    aria-label="Remove item"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}

                        {/* Clear cart */}
                        <div className="text-right pt-2">
                            <button
                                onClick={clearCart}
                                className="text-sm text-gray-400 hover:text-red-400 font-body transition underline underline-offset-2"
                            >
                                Clear all items
                            </button>
                        </div>
                    </div>

                    {/* ── Order summary ──────────────────────────────────────── */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 sticky top-28">
                        <h2 className="text-lg font-bold font-heading text-gray-900 mb-6">Order Summary</h2>

                        <div className="space-y-3 text-sm font-body">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between text-gray-600">
                                    <span className="line-clamp-1 flex-1 pr-2">{item.name} × {item.quantity}</span>
                                    <span className="font-semibold text-gray-800 flex-none">
                                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-100 mt-5 pt-5 flex justify-between items-center">
                            <span className="font-bold text-gray-900 font-heading text-base">Total</span>
                            <span className="text-2xl font-black text-brand-teal font-body">
                                ₹{subtotal.toLocaleString("en-IN")}
                            </span>
                        </div>

                        <p className="text-xs text-gray-400 font-body mt-2 mb-6">
                            Inclusive of all taxes. Delivery charges may apply.
                        </p>

                        {/* Checkout Actions */}
                        <div className="flex flex-col gap-3">
                            {/* Razorpay Checkout */}
                            <button
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className="w-full flex items-center justify-center gap-2 bg-brand-teal text-white px-6 py-4 rounded-2xl font-bold text-base hover:bg-teal-700 transition-all shadow-lg hover:shadow-teal-200 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? (
                                    <span>Processing...</span>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                        Pay Online
                                    </>
                                )}
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-3 my-1">
                                <div className="flex-1 h-px bg-gray-100" />
                                <span className="text-xs text-gray-400 font-body">or</span>
                                <div className="flex-1 h-px bg-gray-100" />
                            </div>

                            {/* WhatsApp Checkout */}
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-3 bg-green-500 text-white px-6 py-4 rounded-2xl font-bold text-base hover:bg-green-600 transition-all shadow-lg hover:shadow-green-200"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                Checkout via WhatsApp
                            </a>
                        </div>

                        <p className="text-xs text-center text-gray-400 font-body mt-3 flex items-center justify-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
                            We reply within 1 hour during business hours
                        </p>
                    </div>
                </div>
            </div>
        </main>
        </>
    );
}
