export interface Author {
    id: string;
    name: string;
    role: string;
    avatar: string; // URL to image
    bio?: string;
}

export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string; // HTML-like string or Markdown, but we'll use simple HTML tags for now
    date: string;
    readTime: string; // e.g., "5 min read"
    image: string;
    category: "Guides" | "Health Tips" | "Product News" | "Caregiving";
    author: Author;
    isFeatured?: boolean;
}

// Mock Authors
const AUTHOR_HARSHIT_GUPTA: Author = {
    id: "harshit-gupta",
    name: "Harshit Gupta",
    role: "Founder NanoMed",
    avatar: "https://placehold.co/100x100/png?text=HG",
    bio: "Harshit Gupta is the founder of NanoMed, a company that specializes in selling medical equipment to families. He has over 2 years of experience in medical equipment business."
};

const AUTHOR_TEAM_NANOMED: Author = {
    id: "aryad-dharmadhikari",
    name: "NanoMed",
    role: "Patient Care Team",
    avatar: "https://placehold.co/100x100/png?text=RM",
    bio: "NanoMed Patient Care Team helps families select the right medical equipment for home care setups."
};

export const blogs: BlogPost[] = [
    {
        id: 1,
        slug: "choosing-the-right-walking-stick",
        title: "How to Choose the Right Walking Stick for the Elderly: A Complete Guide",
        excerpt: "\"Stability is key when selecting mobility aids.\" Learn the critical factors: height, grip, and base type — that you must check before buying to prevent falls.",
        date: "Jan 15, 2026",
        readTime: "6 min read",
        image: "/images/blogs/elder-woman-holding-cane-her-hands.jpg",
        category: "Guides",
        author: AUTHOR_HARSHIT_GUPTA,
        isFeatured: true,
        content: `
            <h3>Choosing a walking stick might seem simple, but for an elderly person, it is a decision that directly affects their safety and independence. The wrong stick can cause back pain, shoulder strain, or even lead to a fall. In this guide, we will break down exactly how to select the perfect mobility aid.</h3>

            <h3>1. The Importance of Correct Height</h3>
            <p>The most common mistake people make is buying a stick that is too high or too low. A stick that is too high forces you to hunch your shoulders, leading to neck pain. One that is too low causes you to stoop, straining your back.</p>
            <p><strong>How to measure:</strong> Stand upright with your arms relaxed by your sides. The handle of the stick should align with the crease of your wrist. When you hold the handle, your elbow should bend slightly at about 15 degrees.</p>

            <h3>2. Choosing the Right Handle Grip</h3>
            <p>Hands come in all shapes and sizes, and so do walking stick handles. For those with arthritis, a standard crook handle might be painful to grip tightly. In such cases, a <strong>Fischer stick</strong> (orthopedic grip) is recommended as it contours to the hand and spreads the pressure.</p>
            
            <h3>3. Single Tip vs. Quadripod</h3>
            <p>Standard walking sticks have a single tip and are great for balance. However, if the user has had a stroke or has significant instability, a <strong>Quadripod (4-legged) stick</strong> provides a much wider base of support and can stand on its own, which is a huge convenience.</p>

            <p>Remember, a walking stick is not just a tool; it's a partner in your daily movement. Take the time to choose the right one.</p>
        `
    },
    {
        id: 2,
        slug: "benefits-of-quadripod-sticks",
        title: "Why Quadripod Sticks Are Lifesavers for Stroke Recovery",
        excerpt: "Standard canes often fail to provide enough support for stroke survivors. medical experts explain why four legs are significantly safer than one.",
        date: "Jan 10, 2026",
        readTime: "4 min read",
        image: "/images/blogs/elderly-man-holding-quadripod-stick.jpeg",
        category: "Health Tips",
        author: AUTHOR_HARSHIT_GUPTA,
        content: `
            <p>Stroke recovery involves relearning balance. A standard single-tip cane requires the user to have a fair amount of existing stability. For many stroke survivors, this isn't enough.</p>
            
            <h3>Superior Stability</h3>
            <p>A quadripod stick, or "quad cane", has four feet at the base. This design offers a superior level of stability, effectively acting as a mini-walker that can be used with one hand.</p>

            <h3>It Stands by Itself</h3>
            <p>One of the biggest frustrations with standard canes is that they fall over when you let go. For an elderly person, bending down to pick up a fallen cane is a major fall risk. Quad canes stand upright on their own, waiting for you whenever you need them.</p>

            <p>If you or a loved one is recovering from a stroke, do not compromise on stability. The quad cane is the gold standard for early rehabilitation.</p>
        `
    },
    {
        id: 3,
        slug: "maintaining-commode-chairs",
        title: "Essential Maintenance Tips for Commode Chairs",
        excerpt: "Hygiene and durability are vital for home medical equipment. Here is a simple checklist to keep your commode chair safe and sanitary.",
        date: "Jan 05, 2026",
        readTime: "3 min read",
        image: "/images/blogs/disinfection-equipment-table.jpg",
        category: "Caregiving",
        author: AUTHOR_TEAM_NANOMED,
        content: `
            <p>Commode chairs are essential for patients with limited mobility, but they require regular maintenance to ensure they remain safe and hygienic. Neglect can lead to rust, instability, or infection risks.</p>

            <h3>Daily Cleaning Protocol</h3>
            <p>After each use, the bucket should be emptied and cleaned with a disinfectant. Do not use harsh acids on the metal frame as this can cause corrosion. A mild detergent or a medical-grade surface disinfectant is best.</p>

            <h3>Check the Rubber Tips</h3>
            <p>Just like a car needs tires, a commode chair rests on rubber tips. If these wear out, the chair can slide during transfer, leading to dangerous falls. Check the tips once a month and replace them if they look worn or cracked.</p>

            <p>A well-maintained chair lasts for years and ensures the dignity and safety of the patient.</p>
        `
    },
    {
        id: 4,
        slug: "mobility-aids-travel",
        title: "Traveling with Mobility Aids: A Checklist",
        excerpt: "Don't let mobility challenges stop you from exploring. Here is how to pack and travel with walkers and wheelchairs.",
        date: "Dec 12, 2025",
        readTime: "5 min read",
        image: "/images/blogs/medium-shot-smiley-man-wheelchair.jpg",
        category: "Guides",
        author: AUTHOR_TEAM_NANOMED,
        content: `
            <p>Traveling with medical equipment requires planning, but it is entirely possible. Whether you are flying or taking a train, here are some tips to make the journey smoother.</p>
            
            <h3>1. Know Your Equipment Dimensions</h3>
            <p>If you are flying, airlines will need to know the weight and dimensions of your wheelchair or walker. Measure these beforehand to avoid delays at the check-in counter.</p>

            <h3>2. Foldable is Best</h3>
            <p>If you travel frequently, invest in foldable versions of your equipment. We offer foldable walkers and lightweight wheelchairs specifically designed to fit into car trunks and overhead bins.</p>
            
            <p>Travel opens up the world. With the right gear, you can go anywhere.</p>
        `
    }
];