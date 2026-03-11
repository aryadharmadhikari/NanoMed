import { MetadataRoute } from 'next';
import { supabase } from '../lib/supabase';

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

    // 2. Dynamic Product Routes from Supabase
    const { data: products } = await supabase
        .from('products')
        .select('id, updated_at');
    
    const productRoutes = (products || []).map((product) => ({
        url: `${baseUrl}/products/${product.id}`,
        lastModified: new Date(product.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // 3. Dynamic Blog Routes from Supabase
    const { data: blogs } = await supabase
        .from('blogs')
        .select('slug, date');

    const blogRoutes = (blogs || []).map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
