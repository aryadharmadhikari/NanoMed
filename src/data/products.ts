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
        name: "Foldable Aluminium Walking Stick | Lightweight Adjustable Cane for Men, Women & Seniors",
        price: 999,
        category: "Walking Sticks",
        image: "/images/products/folding-stick.jpg",
    },
    {
        id: 2,
        name: "Foldable Round Commode Chair with Pot Bucket & Handrest | Portable & Durable, Universal Size",
        price: 3499,
        category: "Commode Chairs",
        image: "/images/products/350.jpg",
    },
    {
        id: 3,
        name: "Premium Aluminium Walker For Adults Foldable Light Weight Height Adjustable Comfortable Grip",
        price: 2860,
        category: "Walkers",
        image: "/images/products/adjustable-walker.jpg",
    },
    {
        id: 4,
        name: "Mild Steel Folding Shower Commode Stool - Mobile Toilet Seat for Elderly, Disabled, Pregnant Women",
        price: 2499,
        category: "Commode Chairs",
        image: "/images/products/MS001.jpg",
    },
    {
        id: 5,
        name: "Walking Stick with Seat (Non-height adjustable) | Ultra-Light U-Shaped Handle",
        price: 2899,
        category: "Walking Sticks",
        image: "/images/products/non-height-adjustable-walking-stick.jpg",
    },
    {
        id: 6,
        name: "Walking Stick with Seat (Height adjustable) | Lightweight Aluminum & Comfortable Grip",
        price: 2999,
        category: "Walking Sticks",
        image: "/images/products/height-adjustable-walking-stick.jpg",
    },
    {
        id: 7,
        name: "1 Legged Walking Stick Height Adjustable Lightweight Mobility Aid for Adults and Seniors",
        price: 1599,
        category: "Walking Sticks",
        image: "/images/products/1-legged-walking-stick.jpg",
    },
    {
        id: 8,
        name: "Premium 4 Leg Walking Stick Light Weight Height Adjustable for Old People",
        price: 1599,
        category: "Walking Sticks",
        image: "/images/products/4-legged-walking-stick.jpg",
    },
    {
        id: 9,
        name: "Unisex Urine Pot 2-in-1 for Men and Women | Portable 1000 ML Medical-Grade Plastic with Cap & Lid",
        price: 499,
        category: "Urination Pot",
        image: "/images/products/urine-pot.jpg",
    }
];