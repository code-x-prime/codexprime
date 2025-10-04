// Client-safe JSON-LD injector component for Articles and related schemas
import React from 'react';

type ArticleJsonLdProps = {
    post: {
        slug: string;
        title: string;
        excerpt?: string;
        featuredImage?: string;
        publishedAt?: string;
        updatedAt?: string;
        author?: string;
        authorSlug?: string;
        wordCount?: number;
        category?: string | { name: string };
    };
};

export function ArticleJsonLd({ post }: ArticleJsonLdProps) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codexprime.in';
    const categoryName = typeof post.category === 'string' ? post.category : post.category?.name;

    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                '@id': `${baseUrl}/blog/${post.slug}/#article`,
                headline: post.title,
                description: post.excerpt,
                image: post.featuredImage
                    ? {
                        '@type': 'ImageObject',
                        url: post.featuredImage,
                        width: 1200,
                        height: 630,
                    }
                    : undefined,
                datePublished: post.publishedAt,
                dateModified: post.updatedAt,
                author: post.author
                    ? {
                        '@type': 'Person',
                        name: post.author,
                        url: `${baseUrl}/author/${post.authorSlug || ''}`,
                    }
                    : undefined,
                publisher: {
                    '@type': 'Organization',
                    name: 'CodeXprime',
                    logo: {
                        '@type': 'ImageObject',
                        url: `${baseUrl}/logo.png`,
                    },
                },
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': `${baseUrl}/blog/${post.slug}/`,
                },
                wordCount: post.wordCount,
                articleSection: categoryName,
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${baseUrl}/blog/${post.slug}/#breadcrumb`,
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
                    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${baseUrl}/blog` },
                    { '@type': 'ListItem', position: 3, name: post.title },
                ],
            },
            {
                '@type': 'WebSite',
                '@id': `${baseUrl}/#website`,
                url: baseUrl,
                name: 'CodeXprime',
                description: 'IT Services in Delhi',
                potentialAction: {
                    '@type': 'SearchAction',
                    target: `${baseUrl}/search?q={search_term_string}`,
                    'query-input': 'required name=search_term_string',
                },
            },
        ],
    } as const;

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export default ArticleJsonLd;
