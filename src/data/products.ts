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
        image: "https://placehold.co/300x300/png?text=Pivot+Stick",
    },
    {
        id: 2,
        name: "Foldable Commode Chair",
        price: 3500,
        category: "Commode Chairs",
        image: "https://placehold.co/300x300/png?text=Commode+Chair",
    },
    {
        id: 3,
        name: "Premium Walker (Adjustable)",
        price: 2800,
        category: "Walkers",
        image: "https://placehold.co/300x300/png?text=Walker",
    },
    {
        id: 4,
        name: "Quadripod Stick",
        price: 1500,
        category: "Walking Sticks",
        image: "https://placehold.co/300x300/png?text=Quad+Stick",
    },
];