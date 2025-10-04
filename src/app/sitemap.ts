import type { MetadataRoute } from 'next'
import { getSitemapData } from '../../lib/blog-api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codexprime.in';


    try {
        const data = await getSitemapData();

        const blogUrls = data.posts.map((post: { slug: string; updatedAt: string | Date }) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.updatedAt),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

        // Category URLs
        const categoryUrls = data.categories.map((category: { slug: string; updatedAt: string | Date }) => ({
            url: `${baseUrl}/blog?category=${category.slug}`,
            lastModified: new Date(category.updatedAt),
            changeFrequency: 'daily' as const,
            priority: 0.7,
        }));

        const staticPages = [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'yearly',
                priority: 1,
            },
            {
                url: `${baseUrl}/about`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.8,
            },
            {
                url: `${baseUrl}/services`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.9,
            },
            {
                url: `${baseUrl}/blog`,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 0.9,
            },
            {
                url: `${baseUrl}/portfolio`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.7,
            },
            {
                url: `${baseUrl}/contact`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.9,
            },
            {
                url: `${baseUrl}/faqs`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.5,
            },
            {
                url: `${baseUrl}/privacy`,
                lastModified: new Date(),
                changeFrequency: 'yearly',
                priority: 0.3,
            },
            {
                url: `${baseUrl}/terms`,
                lastModified: new Date(),
                changeFrequency: 'yearly',
                priority: 0.2,
            },
        ]

        return [...staticPages, ...blogUrls, ...categoryUrls];
    } catch (e) {
        console.error('Sitemap generation error:', e);
        // Return static pages if API fails
        return [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'yearly',
                priority: 1,
            },
        ];
    }
}