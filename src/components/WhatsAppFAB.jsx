"use client";
import { usePathname } from "next/navigation";

export default function WhatsAppFAB() {
    const pathname = usePathname();
    const whatsappNumber = "917738281416";
    const message = `Hi! I'm browsing ${pathname} on NANOMED and had a few questions.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 flex items-center justify-center"
            aria-label="Chat on WhatsApp"
        >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.483 8.413-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.308 1.654zm6.249-4.145c1.556.92 3.127 1.405 4.704 1.405 5.421 0 9.831-4.41 9.833-9.833.001-2.628-1.024-5.1-2.885-6.961-1.862-1.861-4.334-2.885-6.963-2.885-5.424 0-9.834 4.41-9.836 9.833-.001 1.762.467 3.48 1.354 5.003l-1.012 3.693 3.795-.995z" />
            </svg>
        </a>
    );
}