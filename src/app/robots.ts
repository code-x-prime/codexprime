import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codexprime.in';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/', '/_next/'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                crawlDelay: 0,
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
                crawlDelay: 5,
            },
            {
                userAgent: 'Yandex',
                allow: '/',
                crawlDelay: 10,
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}