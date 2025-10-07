
// import Image from 'next/image';
// import Link from 'next/link';
// import { format } from 'date-fns';
// import { notFound } from 'next/navigation';
// import { getPost } from '../../../../lib/blog-api';
// import type { Metadata } from 'next';
// import ArticleJsonLd from '@/components/JsonLd';
// import Breadcrumbs from '@/components/Breadcrumbs';
// import { shimmer, toBase64, safeImageUrl } from '@/lib/utils';

// // Generate metadata for SEO
// export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
//     try {
//         const data = await getPost(params.slug);
//         const post = data.post;

//         // Normalize title casing and ensure year context if applicable
//         const year = new Date().getFullYear();
//         let absoluteTitle = (post.metaTitle || post.title || '').trim();
//         absoluteTitle = absoluteTitle
//             .replace(/laravel/gi, 'Laravel')
//             .replace(/node\.?js/gi, 'Node.js');
//         if (/which is best/i.test(absoluteTitle) && !absoluteTitle.includes(String(year))) {
//             absoluteTitle = absoluteTitle.replace(/\??\s*$/i, ` in ${year}?`);
//         }

//         const url = new URL(`/blog/${params.slug}`, process.env.NEXT_PUBLIC_SITE_URL || 'https://codexprime.in').toString();

//         return {
//             title: { absolute: absoluteTitle || post.title },
//             description: post.metaDescription || post.excerpt,
//             keywords: post.keywords || ['laravel', 'nodejs', 'web development', 'php', 'javascript'],
//             authors: post.author ? [{ name: post.author }] : undefined,
//             alternates: { canonical: url },
//             openGraph: {
//                 title: absoluteTitle || post.title,
//                 description: post.metaDescription || post.excerpt,
//                 url,
//                 siteName: 'CodeXprime',
//                 images: [post.featuredImage].filter(Boolean) as string[],
//                 locale: 'en_US',
//                 type: 'article',
//                 publishedTime: post.publishedAt,
//                 modifiedTime: post.updatedAt,
//                 authors: post.author ? [post.author] : undefined,
//             },
//             twitter: {
//                 card: 'summary_large_image',
//                 title: absoluteTitle || post.title,
//                 description: post.metaDescription || post.excerpt,
//                 images: [post.featuredImage].filter(Boolean) as string[],
//             },
//             robots: {
//                 index: true,
//                 follow: true,
//                 googleBot: {
//                     index: true,
//                     follow: true,
//                     'max-video-preview': -1,
//                     'max-image-preview': 'large',
//                     'max-snippet': -1,
//                 },
//             },
//         } satisfies Metadata;
//     } catch {
//         return {};
//     }
// }

// export default async function BlogPostPage({
//     params,
// }: {
//     params: { slug: string };
// }) {
//     let data;
//     try {
//         data = await getPost(params.slug);
//     } catch {
//         notFound();
//     }

//     const { post, relatedPosts } = data;

//     // Normalize visual title casing and year for display consistency
//     const year = new Date().getFullYear();
//     const normalizeTitle = (t: string) => {
//         let abs = (t || '').trim();
//         abs = abs.replace(/laravel/gi, 'Laravel').replace(/node\.?js/gi, 'Node.js');
//         // Add colon after vs for readability if missing
//         abs = abs.replace(/\bvs\b/gi, 'vs');
//         // Ensure ending with question including the year if pattern matches
//         if (/which is best/i.test(abs) && !abs.includes(String(year))) {
//             abs = abs.replace(/\??\s*$/i, ` in ${year}?`);
//         }
//         return abs;
//     };
//     const displayTitle = normalizeTitle(post.title);


//     return (
//         <>
//             {/* JSON-LD Structured Data */}
//             <ArticleJsonLd post={{
//                 slug: params.slug,
//                 title: post.title,
//                 excerpt: post.excerpt,
//                 featuredImage: post.featuredImage,
//                 publishedAt: post.publishedAt,
//                 updatedAt: post.updatedAt,
//                 author: post.author,
//                 category: post.category?.name || post.category,
//                 wordCount: post.wordCount,
//             }} />

//             <article className="min-h-screen bg-white">
//                 {/* Hero Section */}
//                 {post.featuredImage && (
//                     <div className="relative h-[500px] w-full">
//                         <Image
//                             src={safeImageUrl(post.featuredImage)}
//                             alt={displayTitle}
//                             fill
//                             priority
//                             placeholder="blur"
//                             blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1200, 630))}`}
//                             className="object-cover"
//                             sizes="(max-width: 768px) 100vw, 1200px"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                         <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//                             <div className="max-w-4xl mx-auto">
//                                 {post.category && (
//                                     <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
//                                         {post.category?.name || post.category}
//                                     </span>
//                                 )}
//                                 <h1 className="text-5xl font-bold mb-4 leading-tight tracking-tight">{displayTitle}</h1>
//                                 <div className="flex items-center gap-4 text-sm">
//                                     <span>{post.author}</span>
//                                     <span>•</span>
//                                     <span>
//                                         {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
//                                     </span>
//                                     <span>•</span>
//                                     <span>{post.views} views</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Content */}
//                 <div className="max-w-4xl mx-auto px-4 py-12">
//                     {/* Breadcrumbs */}
//                     <div className="mb-6">
//                         <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog' }, { name: displayTitle }]} />
//                     </div>
//                     {post.excerpt && (
//                         <p className="text-xl text-gray-700 mb-8 leading-8 tracking-[0.005em]">
//                             {post.excerpt}
//                         </p>
//                     )}

//                     <div
//                         className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:mt-10 prose-h3:mt-8 prose-p:my-5 leading-8 prose-a:text-blue-600 prose-img:rounded-xl"
//                         dangerouslySetInnerHTML={{ __html: post.content }}
//                     />

//                     {/* Tags */}
//                     {post.tags.length > 0 && (
//                         <div className="mt-12 pt-8 border-t">
//                             <h3 className="text-lg font-semibold mb-4">Tags:</h3>
//                             <div className="flex flex-wrap gap-2">
//                                 {post.tags.map((tag: { id: string | number; name: string }) => (
//                                     <span
//                                         key={tag.id}
//                                         className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition"
//                                     >
//                                         #{tag.name}
//                                     </span>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* Related Posts */}
//                     {relatedPosts.length > 0 && (
//                         <div className="mt-16">
//                             <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
//                             <div className="grid md:grid-cols-3 gap-6">
//                                 {relatedPosts.map((related: { id: string | number; slug: string; title: string; excerpt?: string; featuredImage?: string; views?: number; publishedAt?: string }) => (
//                                     <Link
//                                         key={related.id}
//                                         href={`/blog/${related.slug}`}
//                                         className="block"
//                                     >
//                                         <article className="h-full border border-gray-200 bg-white p-4">
//                                             {related.featuredImage && (
//                                                 <div className="relative h-36 mb-3 bg-gray-100 overflow-hidden">
//                                                     <Image
//                                                         src={safeImageUrl(related.featuredImage)}
//                                                         alt={related.title}
//                                                         fill
//                                                         loading="lazy"
//                                                         sizes="(max-width: 768px) 100vw, 33vw"
//                                                         className="object-cover"
//                                                     />
//                                                 </div>
//                                             )}
//                                             <h3 className="font-semibold mb-2 text-black">{related.title}</h3>
//                                             <p className="text-sm text-gray-600 line-clamp-2">{related.excerpt}</p>
//                                             <div className="mt-3 text-xs text-gray-500">{related.publishedAt ? format(new Date(related.publishedAt), 'MMM dd, yyyy') : ''} • {related.views ?? 0} views</div>
//                                         </article>
//                                     </Link>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </article>
//         </>
//     );
// }