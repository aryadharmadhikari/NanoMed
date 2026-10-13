import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { products } from '../mockdata/products';
import { blogs } from '../mockdata/blogs';
import { reviews } from '../mockdata/reviews';

const slugify = (text: string) => text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

export async function seedDatabase() {
    console.log('--- Starting Firestore Seed ---');

    // 1. Seed Product Categories
    console.log('Seeding Product Categories...');
    const categoryNames = Array.from(new Set(products.map(p => p.category)));
    for (const name of categoryNames) {
        const slug = slugify(name);
        await setDoc(doc(db, 'product_categories', slug), {
            id: slug,
            name,
            slug,
            description: null
        }, { merge: true });
    }

    // 2. Seed Products
    console.log('Seeding Products...');
    for (const p of products) {
        const catSlug = slugify(p.category);
        const now = new Date().toISOString();
        await setDoc(doc(db, 'products', String(p.id)), {
            id: String(p.id),
            name: p.name.split(' | ')[0].trim(),
            subtitle: p.name.includes(' | ') ? p.name.split(' | ')[1].trim() : null,
            price: p.price,
            mrp: p.mrp,
            category_id: catSlug,
            product_categories: { name: p.category },
            images: [p.image],
            description: p.description || null,
            features: p.features || [],
            specifications: p.specifications || {},
            ideal_for: p.idealFor || [],
            created_at: now,
            updated_at: now
        }, { merge: true });
    }

    // 3. Seed Authors, Blog Categories & Blogs
    console.log('Seeding Authors, Categories & Blogs...');
    for (const b of blogs) {
        if (b.author) {
            await setDoc(doc(db, 'authors', b.author.id), {
                id: b.author.id,
                name: b.author.name,
                role: b.author.role,
                avatar: b.author.avatar,
                bio: b.author.bio || null
            }, { merge: true });
        }

        const catSlug = slugify(b.category);
        await setDoc(doc(db, 'blog_categories', catSlug), {
            id: catSlug,
            name: b.category,
            slug: catSlug
        }, { merge: true });

        await setDoc(doc(db, 'blogs', b.slug), {
            id: b.slug,
            slug: b.slug,
            title: b.title,
            excerpt: b.excerpt,
            content: b.content,
            date: b.date,
            read_time: b.readTime,
            image: b.image,
            category_id: catSlug,
            author_id: b.author?.id || null,
            is_featured: !!b.isFeatured,
            blog_categories: { name: b.category },
            authors: b.author
        }, { merge: true });
    }

    // 4. Seed Reviews
    console.log('Seeding Reviews...');
    for (const r of reviews) {
        await setDoc(doc(db, 'reviews', String(r.id)), {
            id: String(r.id),
            name: r.name,
            location: r.location,
            rating: r.rating,
            comment: r.comment,
            date: new Date(r.date).toISOString().split('T')[0],
            verified: r.verified,
            avatar: r.avatar || null
        }, { merge: true });
    }

    console.log('--- Firestore Seeding Complete! ---');
    return { success: true };
}
