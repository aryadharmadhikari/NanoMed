import { MetadataRoute } from 'next';
import { products } from '../data/products';
import { blogs } from '../data/blogs';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://nanomed.in'; // TODO: Update this with your actual domain

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

    // 2. Dynamic Product Routes
    const productRoutes = products.map((product) => ({
        url: `${baseUrl}/products/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // 3. Dynamic Blog Routes
    const blogRoutes = blogs.map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
