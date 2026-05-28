"use client"
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, Suspense } from "react";
import { supabase } from "../../lib/supabase";
import { DatabaseProduct } from "../../types/database";
import ProductCard from "../../components/ProductCard";

// ── Sort config ───────────────────────────────────────────────────────────────

type SortKey = 'default' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
    { key: 'default',    label: 'Default' },
    { key: 'price_asc',  label: 'Price: Low to High' },
    { key: 'price_desc', label: 'Price: High to Low' },
    { key: 'name_asc',   label: 'Name: A → Z' },
    { key: 'name_desc',  label: 'Name: Z → A' },
];

// ── Icon components ───────────────────────────────────────────────────────────

const FilterIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <line x1="4" y1="6" x2="20" y2="6" strokeLinecap="round" />
        <line x1="7" y1="12" x2="17" y2="12" strokeLinecap="round" />
        <line x1="10" y1="18" x2="14" y2="18" strokeLinecap="round" />
    </svg>
);

const SortIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M7 12h10M11 18h2" />
    </svg>
);

// ── Product list ──────────────────────────────────────────────────────────────

function ProductList() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query")?.toLowerCase() || "";

    const [products, setProducts] = useState<DatabaseProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter & sort state
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<SortKey>('default');
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    const filterRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);

    // Fetch all products once
    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*, product_categories(name)');
                if (error) throw error;
                setProducts(data as any);
            } catch (err: any) {
                console.error("Error fetching products:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    // Close panels on outside click
    useEffect(() => {
        function handleOutside(e: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false);
            if (sortRef.current  && !sortRef.current.contains(e.target as Node))  setSortOpen(false);
        }
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, []);

    // Derive unique category names from fetched data
    const categories = Array.from(
        new Set(products.map(p => p.product_categories?.name).filter(Boolean))
    ) as string[];

    // Search → category filter → sort
    let displayedProducts = products.filter(product => {
        const nameMatch     = product.name?.toLowerCase().includes(query);
        const catNameMatch  = product.product_categories?.name?.toLowerCase().includes(query);
        const searchPass    = nameMatch || catNameMatch;
        const filterPass    = selectedCategories.length === 0 ||
                              selectedCategories.includes(product.product_categories?.name || '');
        return searchPass && filterPass;
    });

    displayedProducts = [...displayedProducts].sort((a, b) => {
        if (sortBy === 'price_asc')  return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'name_asc')   return a.name.localeCompare(b.name);
        if (sortBy === 'name_desc')  return b.name.localeCompare(a.name);
        return 0;
    });

    const activeFilterCount = selectedCategories.length;
    const activeSortLabel   = SORT_OPTIONS.find(o => o.key === sortBy)?.label;

    // ── Loading / error states ────────────────────────────────────────────────

    if (loading) return <div className="text-center py-20 font-body">Loading our catalog...</div>;
    if (error)   return <div className="text-center py-20 text-red-500 font-body">Error loading products: {error}</div>;

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <div className="max-w-7xl mx-auto">

            {/* ── Header row ─────────────────────────────────────────────── */}
            <div className="flex items-start justify-between mb-8 gap-4">
                {/* Left: title + count */}
                <div>
                    <h1 className="text-3xl font-heading font-bold text-gray-900 mb-1">
                        {query ? `Results for "${query}"` : "Our Catalog"}
                    </h1>
                    <p className="text-gray-500 font-body text-sm">
                        {displayedProducts.length} item{displayedProducts.length !== 1 ? 's' : ''} found
                        {activeFilterCount > 0 && (
                            <button
                                onClick={() => setSelectedCategories([])}
                                className="ml-3 text-brand-teal hover:underline text-xs font-semibold"
                            >
                                Clear filters
                            </button>
                        )}
                    </p>
                </div>

                {/* Right: Sort + Filter icon buttons */}
                <div className="flex items-center gap-2 flex-none pt-1">

                    {/* Sort ───────────────────────────────────────── */}
                    <div className="relative" ref={sortRef}>
                        <button
                            onClick={() => { setSortOpen(v => !v); setFilterOpen(false); }}
                            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-semibold font-body transition-all ${
                                sortBy !== 'default'
                                    ? 'border-brand-teal text-brand-teal bg-brand-teal/5'
                                    : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                            }`}
                        >
                            <SortIcon />
                            <span className="hidden sm:inline">Sort</span>
                            {sortBy !== 'default' && (
                                <span className="hidden md:inline text-xs opacity-70">· {activeSortLabel}</span>
                            )}
                        </button>

                        {sortOpen && (
                            <div className="absolute right-0 top-11 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 z-30 overflow-hidden py-1">
                                {SORT_OPTIONS.map(({ key, label }) => (
                                    <button
                                        key={key}
                                        onClick={() => { setSortBy(key); setSortOpen(false); }}
                                        className={`w-full text-left px-4 py-2.5 text-sm font-body font-medium transition hover:bg-gray-50 flex items-center justify-between ${
                                            sortBy === key ? 'text-brand-teal' : 'text-gray-700'
                                        }`}
                                    >
                                        {label}
                                        {sortBy === key && (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Filter ─────────────────────────────────────── */}
                    <div className="relative" ref={filterRef}>
                        <button
                            onClick={() => { setFilterOpen(v => !v); setSortOpen(false); }}
                            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-semibold font-body transition-all ${
                                activeFilterCount > 0
                                    ? 'border-brand-teal text-brand-teal bg-brand-teal/5'
                                    : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                            }`}
                        >
                            <FilterIcon />
                            <span className="hidden sm:inline">Filter</span>
                            {activeFilterCount > 0 && (
                                <span className="w-5 h-5 bg-brand-teal text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>

                        {filterOpen && (
                            <div className="absolute right-0 top-11 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-30 p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-bold text-gray-900 font-heading">Category</span>
                                    {activeFilterCount > 0 && (
                                        <button
                                            onClick={() => setSelectedCategories([])}
                                            className="text-xs text-brand-teal font-semibold hover:underline font-body"
                                        >
                                            Clear all
                                        </button>
                                    )}
                                </div>
                                <div className="space-y-2.5">
                                    {categories.length > 0 ? categories.map(cat => (
                                        <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(cat)}
                                                onChange={e => {
                                                    setSelectedCategories(prev =>
                                                        e.target.checked ? [...prev, cat] : prev.filter(c => c !== cat)
                                                    );
                                                }}
                                                className="w-4 h-4 rounded accent-[#2d8c8f]"
                                            />
                                            <span className="text-sm font-body text-gray-700 group-hover:text-brand-teal transition">
                                                {cat}
                                            </span>
                                        </label>
                                    )) : (
                                        <p className="text-sm text-gray-400 font-body">No categories available</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Product grid ───────────────────────────────────────────── */}
            {displayedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayedProducts.map(product => (
                        <ProductCard key={product.id} product={product as any} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-500 font-body">No products match your search or filters.</p>
                    <button
                        onClick={() => {
                            setSelectedCategories([]);
                            window.location.href = '/products';
                        }}
                        className="mt-4 text-brand-teal font-bold hover:underline font-body"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    );
}

export default function ProductsPage() {
    return (
        <main className="min-h-screen bg-white py-12 px-6">
            <Suspense fallback={<div className="text-center py-20">Loading catalog...</div>}>
                <ProductList />
            </Suspense>
        </main>
    );
}
