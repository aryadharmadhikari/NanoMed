import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://nanomed.in'; // TODO: Update with actual domain

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/private/'], // Example of disallowed routes
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
