const BLOG_API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_BLOG_API_KEY;

interface FetchOptions extends RequestInit {
    cache?: RequestCache;
    next?: { revalidate?: number | false; tags?: string[] };
}

async function blogFetch(endpoint: string, options: FetchOptions = {}) {
    if (process.env.NODE_ENV !== 'production') {
        console.log('🌐 Fetching from Blog API:', endpoint);
        console.log('Options:', options);
    }
    if (!BLOG_API_URL) {
        throw new Error('❌ NEXT_PUBLIC_BLOG_API_URL not found in .env.local');
    }

    if (!API_KEY) {
        throw new Error('❌ NEXT_PUBLIC_BLOG_API_KEY not found in .env.local');
    }

    const url = `${BLOG_API_URL}${endpoint}`;

    console.log('📡 API Request:', url);

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            if (process.env.NODE_ENV !== 'production') {
                console.log(`❌ API Error Response: ${response.status} - ${errorText}`);
            }
            throw new Error(`API Error: ${response.status} - ${errorText}`);
        }

        return response.json();
    } catch (error) {
        console.error('❌ Fetch Error:', error);
        throw error;
    }
}

export async function getPosts(params: {
    page?: number;
    limit?: number;
    category?: string;
    tag?: string;
} = {}) {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.category) queryParams.append('category', params.category);
    if (params.tag) queryParams.append('tag', params.tag);

    return blogFetch(`/api/public/posts?${queryParams}`, {
        next: { revalidate: 60 }
    });
}

export async function getPost(slug: string) {
    return blogFetch(`/api/public/posts/${slug}`, {
        next: { revalidate: 300 }
    });
}

export async function getCategories() {
    return blogFetch('/api/public/categories', {
        next: { revalidate: 600 }
    });
}

export async function getSitemapData() {
    return blogFetch('/api/public/sitemap', {
        next: { revalidate: 3600 }
    });
}