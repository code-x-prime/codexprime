import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ContactSection from '@/components/shared/ContactSection'
import ServicesSection from '@/components/shared/ServicesSection'
import { services } from '@/data/services'
import { digital, graphic, mvp, web } from '@/assets'
import Breadcrumbs2 from '@/components/Breadcrumbs2'
import { StaticImageData } from 'next/image'

export const metadata: Metadata = {
    title: {
        absolute: 'IT Services in Delhi: Web Development, Digital Marketing, Graphic Design, MVP | CodeXprime',
    },
    description:
        'End-to-end IT services in Delhi: web development, digital marketing (SEO, Google Ads, Meta), graphic design, and MVP development. Transparent pricing, fast delivery, and measurable results.',
    keywords: [
        'IT services Delhi', 'web development Delhi', 'web designing Dwarka', 'digital marketing Delhi', 'SEO Delhi',
        'Google Ads', 'Meta Ads', 'graphic design Delhi', 'logo design', 'MVP development Delhi', 'startup MVP',
    ],
    alternates: { canonical: '/services' },
    openGraph: {
        title: 'IT Services in Delhi | CodeXprime',
        description: 'Web development, SEO/Ads, graphic design, and MVP services built to perform.',
        type: 'website',
        url: 'https://codexprime.in/services',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CodeXprime Services' }],
        siteName: 'CodeXprime',
        locale: 'en_IN',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'IT Services in Delhi | CodeXprime',
        description: 'Web development, SEO/Ads, graphic design, and MVP services built to perform.',
        images: ['/og-image.png'],
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function ServicesPage() {
    const serviceImages: Record<string, StaticImageData> = {
        'web-designing': web,
        'digital-marketing': digital,
        'graphic-design': graphic,
        'mvp-development': mvp,
    }

    const faqs = [
        {
            q: 'Do you provide SEO with development?',
            a: 'Yes. We implement on-page and technical SEO best practices during build, and offer ongoing SEO plans.'
        },
        {
            q: 'Can you manage Google Ads and Meta Ads?',
            a: 'Absolutely. We set up conversion tracking, write high-quality ad copy, and optimize campaigns weekly.'
        },
        {
            q: 'How do you price projects?',
            a: 'Fixed-price for well-scoped projects, and monthly retainers for ongoing work (SEO/Ads/design updates).'
        }
    ]

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
    }

    const serviceListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: services.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
                '@type': 'Service',
                name: s.title,
                description: s.description,
                areaServed: 'IN',
                provider: { '@type': 'Organization', name: 'CodeXprime' },
            },
        })),
    }

    return (
        <main className="min-h-screen bg-white pb-16">
            {/* JSON-LD for Services and FAQs */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-b from-black to-gray-800 text-white">
                <div className="absolute inset-0 opacity-20" aria-hidden />
                <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                    <Breadcrumbs2 items={[{ name: 'Home', href: '/' }, { name: 'Services' }]} />
                    <h1 className="mt-6 text-4xl md:text-5xl font-extrabold leading-tight">
                        Full‑stack IT Services that drive growth
                    </h1>
                    <p className="mt-4 max-w-2xl text-gray-200 text-lg">
                        Websites that convert, marketing that scales, design that communicates, and MVPs that ship fast.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="#web-designing" className="px-5 py-2.5 bg-white text-black rounded-md hover:bg-gray-100 transition">Web Development</Link>
                        <Link href="#digital-marketing" className="px-5 py-2.5 bg-white/10 backdrop-blur text-white rounded-md hover:bg-white/20 transition">Digital Marketing</Link>
                        <Link href="#graphic-design" className="px-5 py-2.5 bg-white/10 backdrop-blur text-white rounded-md hover:bg-white/20 transition">Graphic Design</Link>
                        <Link href="#mvp-development" className="px-5 py-2.5 bg-white/10 backdrop-blur text-white rounded-md hover:bg-white/20 transition">MVP Development</Link>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6">
                {/* Overview cards */}
                <ServicesSection />

                {/* Detailed sections */}
                <div className="mt-16 space-y-16">
                    {services.map((s, idx) => (
                        <section key={s.id} id={s.id} className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="order-2 md:order-1">
                                <h2 className="text-3xl font-bold text-gray-900">{s.title}</h2>
                                <p className="mt-3 text-gray-700 leading-7">{s.description}</p>
                                {s.features && (
                                    <ul className="mt-5 grid sm:grid-cols-2 gap-2 text-gray-800">
                                        {s.features.map((f, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-gray-900" />
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <div className="mt-6 flex gap-3">
                                    <Link href="/contact" className="inline-block rounded-md bg-black text-white px-5 py-2.5 hover:bg-gray-900 transition">Talk to us about {s.title}</Link>
                                    <Link href="/portfolio" className="inline-block rounded-md border border-gray-300 px-5 py-2.5 hover:border-black transition">See work</Link>
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white">
                                    <Image
                                        src={serviceImages[s.id] || web}
                                        alt={`${s.title} illustration`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority={idx === 0}
                                    />
                                </div>
                            </div>
                        </section>
                    ))}
                </div>

                {/* Process */}
                <section className="mt-20">
                    <h2 className="text-2xl font-bold text-gray-900">Our Process</h2>
                    <div className="mt-4 grid md:grid-cols-3 gap-6 text-sm">
                        {[
                            { t: 'Discovery', d: 'We scope goals, audience, and success metrics.' },
                            { t: 'Design & Build', d: 'Ship in short sprints with clear demos and feedback.' },
                            { t: 'Launch & Grow', d: 'Track conversions and keep improving performance.' },
                        ].map((step) => (
                            <div key={step.t} className="rounded-xl border border-gray-200 p-5 bg-white">
                                <h3 className="font-semibold text-gray-900">{step.t}</h3>
                                <p className="text-gray-700 mt-2">{step.d}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Pricing note */}
                <section className="mt-12">
                    <h2 className="text-xl font-semibold text-gray-900">How we price</h2>
                    <p className="text-gray-700 mt-2">Fixed-price for clear scope. Monthly retainers for ongoing SEO/Ads/updates. Every project starts with discovery to reduce surprise and risk.</p>
                </section>

                {/* FAQs */}
                <section className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900">FAQs</h2>
                    <div className="mt-4 divide-y divide-gray-200 border border-gray-200 rounded-xl bg-white">
                        {faqs.map((f, i) => (
                            <details key={i} className="p-5 group open:bg-gray-50">
                                <summary className="cursor-pointer font-medium text-gray-900 list-none flex justify-between items-center">
                                    <span>{f.q}</span>
                                    <span className="transition group-open:rotate-180">▾</span>
                                </summary>
                                <p className="mt-2 text-gray-700">{f.a}</p>
                            </details>
                        ))}
                    </div>
                </section>

                <ContactSection />
            </div>
        </main>
    )
}
