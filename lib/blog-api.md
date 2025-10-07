

// const BLOG_API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL || 'https://bloxly.vercel.app';
// const API_KEY = process.env.NEXT_PUBLIC_BLOG_API_KEY;

// export async function blogFetch(endpoint: string, options: RequestInit = {}) {
//     if (!BLOG_API_URL) throw new Error('NEXT_PUBLIC_BLOG_API_URL not found');
//     if (!API_KEY) throw new Error('NEXT_PUBLIC_BLOG_API_KEY not found');

//     const url = BLOG_API_URL + endpoint;
//     const res = await fetch(url, {
//         ...options,
//         headers: {
//             'x-api-key': API_KEY,
//             'Content-Type': 'application/json',
//             ...(options.headers || {}),
//         },
//     });

//     if (!res.ok) {
//         const text = await res.text();
//         throw new Error(`API Error ${res.status}: ${text}`);
//     }

//     return res.json();
// }

// export async function getPosts({ page = 1, limit = 10, category, tag }: { page?: number; limit?: number; category?: string; tag?: string } = {}) {
//     const q = new URLSearchParams();
//     q.set('page', String(page));
//     q.set('limit', String(limit));
//     if (category) q.set('category', category);
//     if (tag) q.set('tag', tag);

//     return blogFetch('/api/public/posts?' + q.toString(), { next: { revalidate: 60 } });
// }

// export async function getPost(slug: string) {
//     return blogFetch('/api/public/posts/' + slug, { next: { revalidate: 300 } });
// }

// export async function getCategories() {
//     return blogFetch('/api/public/categories', { next: { revalidate: 600 } });
// }

// export async function getSitemapData() {
//     return blogFetch('/api/public/sitemap', { next: { revalidate: 3600 } });
// }

// export async function getHighlightsBlogs({ limit = 5, sort = 'mix' }: { limit?: number; sort?: string } = {}) {
//     const q = new URLSearchParams();
//     if (limit) q.set('limit', String(limit));
//     if (sort) q.set('sort', sort);
//     const qs = q.toString();

//     return blogFetch('/api/public/highlights' + (qs ? `?${qs}` : ''), { next: { revalidate: 60 } });
// }
