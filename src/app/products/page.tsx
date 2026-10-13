import { db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { DatabaseProduct } from "../../types/database";
import ProductCatalogClient from "./ProductCatalogClient";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
    let products: DatabaseProduct[] = [];
    try {
        const snapshot = await getDocs(collection(db, "products"));
        products = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as DatabaseProduct[];
    } catch (err) {
        console.error("Error fetching products on server:", err);
    }

    return (
        <main className="min-h-screen bg-white py-12 px-6">
            <Suspense fallback={<div className="text-center py-20 font-body">Loading catalog...</div>}>
                <ProductCatalogClient initialProducts={products} />
            </Suspense>
        </main>
    );
}
