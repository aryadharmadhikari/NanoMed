export interface DatabaseProduct {
    id: string;
    category_id: string | null;
    name: string;
    price: number;
    mrp: number;
    image: string;
    description: string | null;
    features: string[];
    specifications: Record<string, string>;
    ideal_for: string[];
    created_at: string;
    updated_at: string;
    product_categories?: {
        name: string;
    };
}

export interface DatabaseCategory {
    id: string;
    name: string;
    slug: string;
    description: string | null;
}

export interface DatabaseAuthor {
    id: string;
    name: string;
    role: string;
    avatar: string;
    bio: string | null;
}

export interface DatabaseBlog {
    id: string;
    category_id: string | null;
    author_id: string | null;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    read_time: string;
    image: string;
    is_featured: boolean;
    blog_categories?: {
        name: string;
    };
    authors?: DatabaseAuthor;
}

export interface DatabaseReview {
    id: string;
    product_id: string | null;
    name: string;
    location: string;
    rating: number;
    comment: string;
    date: string;
    verified: boolean;
    avatar: string | null;
}
