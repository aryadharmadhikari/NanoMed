import ProductForm from "../../../../../components/admin/ProductForm";
import Link from "next/link";
import { getAdminProducts } from "../../../../../lib/actions/productActions";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    // In a real app, you'd fetch a single product by ID. 
    // Reusing getAdminProducts here for simplicity, but ideally we'd have a getProductById action.
    const { data: products } = await getAdminProducts();
    const product = products?.find(p => p.id === id);

    if (!product) {
        notFound();
    }

    return (
        <div>
            <div className="mb-6 flex items-center gap-4">
                <Link href="/admin" className="text-gray-400 hover:text-gray-600 transition font-bold font-body">
                    &larr; Back to Inventory
                </Link>
            </div>
            <div className="mb-8">
                <h2 className="text-3xl font-heading font-black text-gray-900">Edit Product</h2>
                <p className="text-gray-500 font-body mt-1">Update details for {product.name}</p>
            </div>
            
            <ProductForm initialData={product} />
        </div>
    );
}
