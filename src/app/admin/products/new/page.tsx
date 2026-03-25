import ProductForm from "../../../../components/admin/ProductForm";
import Link from "next/link";

export default function NewProductPage() {
    return (
        <div>
            <div className="mb-6 flex items-center gap-4">
                <Link href="/admin" className="text-gray-400 hover:text-gray-600 transition font-bold font-body">
                    &larr; Back to Inventory
                </Link>
            </div>
            <div className="mb-8">
                <h2 className="text-3xl font-heading font-black text-gray-900">Add New Product</h2>
                <p className="text-gray-500 font-body mt-1">Fill in the details to add a new item to your store.</p>
            </div>
            
            <ProductForm />
        </div>
    );
}
