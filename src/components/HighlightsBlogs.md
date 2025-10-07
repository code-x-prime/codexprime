import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { getHighlightsBlogs } from '../../lib/blog-api';
import { safeImageUrl, shimmer, toBase64 } from '@/lib/utils';

type Highlight = {
    id: string | number;
    title: string;
    slug: string;
    excerpt?: string;
    views?: number;
    publishedAt?: string | Date;
    featuredImage?: string | null;
};

export default async function HighlightsBlogs({ limit = 5, sort = 'mix', title = 'Latest Articles' }: { limit?: number; sort?: 'mix' | 'newest' | 'popular'; title?: string }) {
    let highlights: Highlight[] = [];
    try {
        const data = await getHighlightsBlogs({ limit, sort });
        highlights = Array.isArray(data) ? data : [];
    } catch {
        // swallow error and render nothing if no data
    }

    const visible = highlights.slice(0, limit);
    const hasMore = highlights.length > limit;

    // If nothing to show, render nothing (avoid showing error banners or empty shells)
    if (!visible.length) return null;

    return (
        <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {visible.map((blog) => (
                    <Link key={blog.id} href={`/blog/${blog.slug}`} className="block group">
                        <article className="h-full border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow">
                            {blog.featuredImage ? (
                                <div className="relative w-full h-36 mb-3 bg-gray-100 overflow-hidden">
                                    <Image
                                        src={safeImageUrl(blog.featuredImage)}
                                        alt={blog.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 420px"
                                        className="object-cover"
                                        placeholder="blur"
                                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(800, 400))}`}
                                    />
                                </div>
                            ) : null}

                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-black">{blog.title}</h3>
                            {blog.excerpt && <p className="mt-2 text-gray-700 line-clamp-2">{blog.excerpt}</p>}
                            <div className="mt-3 text-xs text-gray-500 flex items-center gap-2">
                                {blog.publishedAt && <span>{format(new Date(blog.publishedAt), 'yyyy-MM-dd')}</span>}
                                <span className="text-gray-400">•</span>
                                <span>{typeof blog.views === 'number' ? `${blog.views} views` : '0 views'}</span>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>

            {hasMore && (
                <div className="mt-6 flex justify-end">
                    <Link href="/blog" className="text-sm underline text-black hover:opacity-80">View all →</Link>
                </div>
            )}
        </section>
    );
}
