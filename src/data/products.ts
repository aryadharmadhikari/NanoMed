export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
}

export const products: Product[] = [
    {
        id: 1,
        name: "Pivot Explorer Stick",
        price: 1200,
        category: "Walking Sticks",
        image: "/images/products/folding-stick.jpg",
    },
    {
        id: 2,
        name: "Foldable Commode Chair",
        price: 3500,
        category: "Commode Chairs",
        image: "/images/products/350.jpg",
    },
    {
        id: 3,
        name: "Premium Walker (Adjustable)",
        price: 2800,
        category: "Walkers",
        image: "/images/products/MS001.jpg",
    },
    {
        id: 4,
        name: "Quadripod Stick",
        price: 1500,
        category: "Walking Sticks",
        image: "/images/products/height-adjustable-walking-stick.jpg",
    },
];