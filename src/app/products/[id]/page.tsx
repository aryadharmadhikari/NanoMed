import { products } from "../../../data/products";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// 1. Add "async" before the function
export default async function SingleProductPage({
    params
}: {
    params: Promise<{ id: string }> // 2. Tell TypeScript this is a Promise
}) {

    // 3. "Open the envelope" (Unwrap the params)
    const { id } = await params;

    // 4. Now 'id' is a normal string, and we can use it
    const product = products.find((p) => p.id === parseInt(id));

    if (!product) {
        notFound();
    }

    // Setup WhatsApp details
    const whatsappNumber = "917021472421"; // Maruti Enterprises Number
    const message = `Hi, I am interested in the ${product.name} (Price: ₹${product.price}). Can you please provide more details?`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <main className="max-w-7xl mx-auto px-6 py-12">
            <Link href="/products" className="text-blue-600 hover:underline mb-8 inline-block">
                ← Back to Catalog
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* LEFT: Product Image */}
                <div className="relative h-[400px] w-full bg-gray-100 rounded-2xl overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-8"
                    />
                </div>

                {/* RIGHT: Product Details */}
                <div className="flex flex-col justify-center">
                    <p className="text-blue-600 font-bold uppercase tracking-widest">{product.category}</p>
                    <h1 className="text-4xl font-bold text-gray-900 mt-2">{product.name}</h1>
                    <p className="text-3xl font-bold text-gray-900 mt-6">₹{product.price.toLocaleString("en-IN")}</p>

                    <div className="mt-8 space-y-4">
                        <p className="text-gray-600 leading-relaxed">
                            Experience superior stability with our {product.name}.
                            Engineered for comfort and safety as part of the NANOMED premium healthcare line.
                        </p>
                    </div>

                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-10 inline-block bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition shadow-lg text-center"
                    >
                        Order via WhatsApp
                    </a>
                </div>
            </div>
        </main>
    );
}