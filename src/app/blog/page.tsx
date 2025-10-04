import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import Breadcrumbs2 from '@/components/Breadcrumbs2';
import { safeImageUrl, shimmer, toBase64 } from '@/lib/utils';
import { format } from 'date-fns';
import { getPosts, getCategories } from '../../../lib/blog-api';

export const metadata: Metadata = {
    title: { absolute: 'Blog: Articles, Tutorials & Case Studies | CodeXprime' },
    description: 'Latest insights on web development, SEO, design, and growth. Practical, fast, and to the point.',
    alternates: { canonical: '/blog' },
    openGraph: {
        title: 'CodeXprime Blog',
        description: 'Insights on web, SEO, design, and growth.',
        url: 'https://codexprime.in/blog',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: 'CodeXprime Blog', images: ['/og-image.png'] },
    robots: { index: true, follow: true },
};

export default async function BlogPage({
    searchParams,
}: {
    searchParams: { page?: string; category?: string };
}) {
    const page = parseInt(searchParams.page || '1');
    const category = searchParams.category;

    // Fetch posts and categories with graceful fallback to avoid crash on ECONNREFUSED
    const [postsRes, catsRes] = await Promise.allSettled([
        getPosts({ page, limit: 12, category }),
        getCategories(),
    ]);

    const postsData = postsRes.status === 'fulfilled'
        ? postsRes.value
        : { posts: [], pagination: { totalPages: 1 } };
    const categoriesData = catsRes.status === 'fulfilled'
        ? catsRes.value
        : { categories: [] as Array<{ id: string | number; name: string; slug: string; _count?: { posts: number } }>, error: true };

    const hadError = postsRes.status === 'rejected' || catsRes.status === 'rejected';

    return (
        <div className="min-h-screen bg-white">
            {/* Hero - match Services page style */}
            <section className="relative overflow-hidden bg-gradient-to-b from-black to-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                    <Breadcrumbs2 items={[{ name: 'Home', href: '/' }, { name: 'Blog' }]} />
                    <h1 className="mt-6 text-4xl md:text-5xl font-extrabold leading-tight">Insights, how‑to guides, and ideas</h1>
                    <p className="mt-4 text-lg text-white/90 max-w-2xl">Short, practical articles on building fast websites, improving SEO, and shipping product.</p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-10">
                {/* Error banner (non-blocking) */}
                {hadError && (
                    <div className="mb-6 border border-amber-300 bg-amber-50 text-amber-900 px-4 py-3">
                        Some content couldn’t be loaded. Showing what’s available.
                    </div>
                )}

                {/* Categories Tabs (no rounded white/black chips) */}
                <div className="mb-8 overflow-x-auto">
                    <div className="inline-flex items-stretch gap-1 border-b border-gray-200">
                        <Link
                            href="/blog"
                            className={`px-4 py-2 text-sm ${!category ? 'text-black border-b-2 border-black' : 'text-gray-700 hover:text-black'}`}
                        >
                            All
                        </Link>
                        {categoriesData.categories.map((cat: { id: string | number; name: string; slug: string; _count?: { posts: number } }) => (
                            <Link
                                key={cat.id}
                                href={`/blog?category=${cat.slug}`}
                                className={`px-4 py-2 text-sm ${category === cat.slug ? 'text-black border-b-2 border-black' : 'text-gray-700 hover:text-black'}`}
                            >
                                {cat.name} {typeof cat._count?.posts === 'number' ? `(${cat._count.posts})` : ''}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Posts grid (2-column cards). Show image only when present. Whole card is clickable. */}
                {postsData.posts.length === 0 ? (
                    <p className="py-10 text-gray-600">No posts available right now.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {postsData.posts.map((post: { id: string | number; title: string; slug: string; excerpt?: string; featuredImage?: string | null; category?: { name: string }; publishedAt?: string | Date; views?: number }) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                                <article className="h-full border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
                                    {/* Image (only when present) */}
                                    {post.featuredImage ? (
                                        <div className="relative w-full h-40 mb-4 overflow-hidden bg-gray-100">
                                            <Image
                                                src={safeImageUrl(post.featuredImage)}
                                                alt={post.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 420px"
                                                className="object-cover"
                                                placeholder="blur"
                                                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(800, 400))}`}
                                            />
                                        </div>
                                    ) : null}

                                    <div>
                                        <div className="flex items-center gap-3 text-sm text-gray-500">
                                            {post.category?.name && <span className="text-black">{post.category.name}</span>}
                                            {post.publishedAt && <span>{format(new Date(post.publishedAt), 'yyyy-MM-dd')}</span>}
                                            <span className="text-gray-400">•</span>
                                            <span>{typeof post.views === 'number' ? `${post.views} views` : '0 views'}</span>
                                        </div>

                                        <h3 className="mt-3 text-xl font-semibold text-gray-900 group-hover:text-blue-700">{post.title}</h3>

                                        {post.excerpt && <p className="mt-3 text-gray-700 line-clamp-3">{post.excerpt}</p>}

                                        <div className="mt-4 text-sm text-black font-medium">Read more →</div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Pagination with Prev/Next and ellipsis */}
                {(() => {
                    const totalPages: number = postsData.pagination?.totalPages || 1;
                    if (totalPages <= 1) return null;

                    const makeHref = (p: number) => `/blog?page=${p}${category ? `&category=${category}` : ''}`;

                    const pages: (number | 'ellipsis')[] = [];
                    const add = (n: number) => pages.push(n);

                    const window = 1; // pages around current
                    const start = Math.max(1, page - window);
                    const end = Math.min(totalPages, page + window);
                    add(1);
                    if (start > 2) pages.push('ellipsis');
                    for (let p = start; p <= end; p++) if (p !== 1 && p !== totalPages) add(p);
                    if (end < totalPages - 1) pages.push('ellipsis');
                    if (totalPages > 1) add(totalPages);

                    return (
                        <nav className="mt-10 flex items-center justify-center gap-1" aria-label="Pagination">
                            <Link
                                href={makeHref(Math.max(1, page - 1))}
                                aria-disabled={page === 1}
                                className={`px-3 py-2 text-sm border ${page === 1 ? 'pointer-events-none text-gray-400 bg-gray-50' : 'hover:border-blue-600'}`}
                            >
                                Prev
                            </Link>
                            {pages.map((p, i) => p === 'ellipsis' ? (
                                <span key={`e-${i}`} className="px-2 text-gray-500">…</span>
                            ) : (
                                <Link
                                    key={p}
                                    href={makeHref(p)}
                                    aria-current={page === p ? 'page' : undefined}
                                    className={`px-3 py-2 text-sm border ${page === p ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:border-blue-600'}`}
                                >
                                    {p}
                                </Link>
                            ))}
                            <Link
                                href={makeHref(Math.min(totalPages, page + 1))}
                                aria-disabled={page === totalPages}
                                className={`px-3 py-2 text-sm border ${page === totalPages ? 'pointer-events-none text-gray-400 bg-gray-50' : 'hover:border-blue-600'}`}
                            >
                                Next
                            </Link>
                        </nav>
                    );
                })()}
            </div>
        </div>
    );
}