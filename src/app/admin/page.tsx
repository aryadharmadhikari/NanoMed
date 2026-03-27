import { getAdminProducts, deleteProduct } from "../../lib/actions/productActions";
import Link from "next/link";
import Image from "next/image";

export default async function AdminDashboardPage() {
    const { data: products, error } = await getAdminProducts();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-heading font-black text-gray-900">Product Inventory</h2>
                    <p className="text-gray-500 font-body mt-1">Manage your storefront items.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="bg-brand-teal text-white px-6 py-3 rounded-xl font-bold font-body shadow-lg shadow-teal-100 hover:bg-teal-700 transition"
                >
                    + Add New Product
                </Link>
            </div>

            {error ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 font-body">
                    Error loading products: {error}
                    <br />
                    <span className="text-sm">Make sure you have seeded your Supabase Database.</span>
                </div>
            ) : products?.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                    <div className="text-5xl mb-4">📦</div>
                    <h3 className="text-xl font-bold text-gray-900 font-heading mb-2">No Products Found</h3>
                    <p className="text-gray-500 font-body mb-6">Your inventory is currently empty.</p>
                    <Link
                        href="/admin/products/new"
                        className="bg-brand-teal text-white px-6 py-3 rounded-full font-bold font-body"
                    >
                        Create Your First Product
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="py-4 px-6 font-bold text-sm text-gray-500 font-body uppercase tracking-wider">Product</th>
                                <th className="py-4 px-6 font-bold text-sm text-gray-500 font-body uppercase tracking-wider">Category</th>
                                <th className="py-4 px-6 font-bold text-sm text-gray-500 font-body uppercase tracking-wider">Price/MRP</th>
                                <th className="py-4 px-6 font-bold text-sm text-gray-500 font-body uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products?.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50/50 transition group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-12 h-12 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                                                {product.images?.[0] ? (
                                                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-xs text-brand-teal bg-teal-50 font-bold">Img</div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 font-body line-clamp-1">{product.name}</p>
                                                <p className="text-xs text-gray-400 font-body font-mono mt-0.5">{product.id.substring(0, 8)}...</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-block bg-teal-50 text-brand-teal px-3 py-1 rounded-full text-xs font-bold font-body">
                                            {product.product_categories?.name || 'Uncategorized'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="font-body">
                                            <span className="font-bold text-brand-teal">₹{product.price.toLocaleString("en-IN")}</span>
                                            {product.mrp && product.mrp > product.price && (
                                                <span className="text-xs text-gray-400 line-through ml-2">₹{product.mrp.toLocaleString("en-IN")}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            {/* Edit Button */}
                                            <Link
                                                href={`/admin/products/${product.id}/edit`}
                                                className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition"
                                                title="Edit Product"
                                            >
                                                Edit
                                            </Link>

                                            {/* We use a form to securely call the Server Action for deletion */}
                                            <form action={async () => {
                                                "use server";
                                                await deleteProduct(product.id);
                                            }}>
                                                <button
                                                    type="submit"
                                                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                                                    title="Delete Product"
                                                >
                                                    Delete
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
