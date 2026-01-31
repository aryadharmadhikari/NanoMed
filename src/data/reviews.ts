export interface Review {
    id: number;
    name: string;
    location: string;
    rating: number; // 1 to 5
    comment: string;
    date: string;
    verified: boolean;
    avatar?: string; // Optional URL or initials
}

export const reviews: Review[] = [
    {
        id: 1,
        name: "Sanjay Deshmukh",
        location: "Pune, Maharashtra",
        rating: 5,
        comment: "Excellent quality walking stick. My father feels much more confident walking in the garden now. The height adjustment is very smooth. Harshit was very helpful in helping us choose the right gear.",
        date: "Jan 12, 2026",
        verified: true,
    },
    {
        id: 2,
        name: "Meera Kulkarni",
        location: "Mumbai",
        rating: 5,
        comment: "Ordered a commode chair for my mother post-surgery. The build quality is exceptional compared to what we saw in local shops. Delivery was fast and the product was easy to assemble.",
        date: "Jan 05, 2026",
        verified: true,
    },
    {
        id: 3,
        name: "Dr. Amit Patil",
        location: "Nagpur",
        rating: 4,
        comment: "As a physiotherapist, I recommend NanoMed's walkers to my patients. They are lightweight yet sturdy enough for stable rehabilitation. Professional service by the team.",
        date: "Dec 28, 2025",
        verified: true,
    },
    {
        id: 4,
        name: "Anjali Wadekar",
        location: "Nashik",
        rating: 5,
        comment: "The foldable round commode chair is a lifesaver for travel. It fits easily in the car trunk and the pot is very hygienic. Highly recommended for senior care.",
        date: "Dec 15, 2025",
        verified: true,
    },
    {
        id: 5,
        name: "Vikram Shah",
        location: "Aurangabad",
        rating: 5,
        comment: "Bought the 4-legged walking stick for my grandfather who has balance issues. It stands on its own which is great because he doesn't have to bend down to pick it up. Very thoughtful design.",
        date: "Nov 20, 2025",
        verified: true,
    }
];
