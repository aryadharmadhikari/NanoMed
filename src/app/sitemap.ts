import { MetadataRoute } from 'next';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://nano-med.vercel.app');

    // 1. Static Routes
    const staticRoutes = [
        '',
        '/about',
        '/contact',
        '/products',
        '/blog',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 1.0,
    }));

    // 2. Dynamic Product Routes from Firestore
    let productRoutes: MetadataRoute.Sitemap = [];
    try {
        const prodSnap = await getDocs(collection(db, 'products'));
        productRoutes = prodSnap.docs.map((doc) => {
            const data = doc.data();
            return {
                url: `${baseUrl}/products/${doc.id}`,
                lastModified: data.updated_at ? new Date(data.updated_at) : new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            };
        });
    } catch (e) {
        console.error("Error fetching products for sitemap:", e);
    }

    // 3. Dynamic Blog Routes from Firestore
    let blogRoutes: MetadataRoute.Sitemap = [];
    try {
        const blogSnap = await getDocs(collection(db, 'blogs'));
        blogRoutes = blogSnap.docs
            .filter((doc) => doc.data().slug)
            .map((doc) => {
                const data = doc.data();
                return {
                    url: `${baseUrl}/blog/${data.slug}`,
                    lastModified: data.date ? new Date(data.date) : new Date(),
                    changeFrequency: 'monthly' as const,
                    priority: 0.7,
                };
            });
    } catch (e) {
        console.error("Error fetching blogs for sitemap:", e);
    }

    return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
