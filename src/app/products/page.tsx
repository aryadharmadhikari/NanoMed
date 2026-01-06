import ProductCard from "../../components/ProductCard";
import { products } from "../../data/products";

export default function ProductsPage() {
    return (
        <main className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Our Full Catalog
            </h1>

            {/* This is the Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* JS LESSON: The .map() method
          We take your 'products' list and for each one, we show a Card.
        */}
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}

            </div>
        </main>
    );
}