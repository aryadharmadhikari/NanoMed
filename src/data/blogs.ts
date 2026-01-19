export interface BlogPost {
    id: number;
    slug: string; // This will be the URL (e.g., /blog/choosing-a-walker)
    title: string;
    excerpt: string;
    content: string;
    date: string;
    image: string;
}

export const blogs: BlogPost[] = [
    {
        id: 1,
        slug: "choosing-the-right-walking-stick",
        title: "How to Choose the Right Walking Stick for the Elderly",
        excerpt: "Stability is key when selecting mobility aids. Learn the 3 things you must check before buying.",
        content: "When it comes to mobility, the height and grip of a walking stick are the most critical factors...",
        date: "Jan 15, 2026",
        image: "https://placehold.co/600x400/png?text=Walking+Stick+Guide"
    },
    {
        id: 2,
        slug: "benefits-of-quadripod-sticks",
        title: "The Benefits of Quadripod Sticks over Standard Canes",
        excerpt: "Why four legs are better than one for stroke recovery patients and high-risk falls.",
        content: "A quadripod stick offers a wider base of support, allowing it to stand on its own...",
        date: "Jan 10, 2026",
        image: "https://placehold.co/600x400/png?text=Quadripod+Benefits"
    },
    {
        id: 3,
        slug: "maintaining-commode-chairs",
        title: "Essential Maintenance Tips for Commode Chairs",
        excerpt: "Hygiene and durability are vital. Here is how to keep your medical equipment in top shape.",
        content: "Regular cleaning with non-corrosive disinfectants ensures the longevity of the metal frame...",
        date: "Jan 05, 2026",
        image: "https://placehold.co/600x400/png?text=Maintenance+Tips"
    }
];