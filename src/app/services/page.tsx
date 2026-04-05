import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ContactSection from '@/components/shared/ContactSection'
import ServicesSection from '@/components/shared/ServicesSection'
import Process from '@/components/shared/Process'
import Faq from '@/components/shared/Faq'
import { services } from '@/data/services'
import { digital, graphic, mvp, web } from '@/assets'
import type { StaticImageData } from 'next/image'
import { FiArrowRight, FiCheck } from 'react-icons/fi'

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
    robots: { index: true, follow: true },
}

const serviceImages: Record<string, StaticImageData> = {
    'web-designing': web,
    'digital-marketing': digital,
    'graphic-design': graphic,
    'mvp-development': mvp,
}

const serviceAccents: Record<string, { bar: string; badge: string; text: string }> = {
    'web-designing':     { bar: 'from-blue-500 to-indigo-500',   badge: 'bg-blue-50 text-blue-600 border-blue-100',   text: 'text-blue-600' },
    'digital-marketing': { bar: 'from-emerald-500 to-teal-500',  badge: 'bg-emerald-50 text-emerald-700 border-emerald-100', text: 'text-emerald-600' },
    'graphic-design':    { bar: 'from-purple-500 to-violet-500', badge: 'bg-purple-50 text-purple-600 border-purple-100', text: 'text-purple-600' },
    'mvp-development':   { bar: 'from-orange-500 to-amber-500',  badge: 'bg-orange-50 text-orange-600 border-orange-100', text: 'text-orange-600' },
}

const heroStats = [
    { value: '150+', label: 'Projects Delivered' },
    { value: '5+',   label: 'Years Experience' },
    { value: '98%',  label: 'Client Satisfaction' },
]

const faqs = [
    { q: 'Do you provide SEO with development?', a: 'Yes. We implement on-page and technical SEO best practices during build, and offer ongoing SEO plans.' },
    { q: 'Can you manage Google Ads and Meta Ads?', a: 'Absolutely. We set up conversion tracking, write high-quality ad copy, and optimize campaigns weekly.' },
    { q: 'How do you price projects?', a: 'Fixed-price for well-scoped projects, and monthly retainers for ongoing work (SEO/Ads/design updates).' },
    { q: 'How long does a typical project take?', a: 'Most websites take 3–6 weeks. MVPs run 6–10 weeks. Timelines are defined during project scoping.' },
]

export default function ServicesPage() {
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

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
    }

    return (
        <main className="min-h-screen pb-16">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            {/* ── Hero ── */}
            <section className="relative overflow-hidden pt-14 pb-24 px-4 sm:px-6">
                {/* Blobs */}
                <div className="absolute top-0 left-1/4 w-[520px] h-[520px] rounded-full bg-blue-200/25 blur-[130px] animate-blob pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full bg-violet-200/20 blur-[110px] animate-blob animation-delay-4 pointer-events-none" />
                <div className="absolute top-1/2 left-[8%] w-[280px] h-[280px] rounded-full bg-cyan-200/15 blur-[80px] animate-blob animation-delay-2 pointer-events-none" />

                <div className="relative max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-100 text-blue-600 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm mb-7">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                        </span>
                        Our Services
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0a0a0a] leading-[1.06] tracking-tight mb-5">
                        Full-stack IT Services
                        <br />
                        that Drive{' '}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)' }}
                        >
                            Growth
                        </span>
                    </h1>

                    <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                        Websites that convert, marketing that scales, design that communicates,
                        and MVPs that ship fast — all under one roof.
                    </p>

                    {/* Service shortcut pills */}
                    <div className="flex flex-wrap gap-2.5 justify-center mb-10">
                        {services.map((s) => {
                            const accent = serviceAccents[s.id]
                            return (
                                <Link
                                    key={s.id}
                                    href={`#${s.id}`}
                                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 hover:scale-105 ${accent?.badge || 'bg-gray-50 text-gray-600 border-gray-200'}`}
                                >
                                    {s.title}
                                    <FiArrowRight className="w-3 h-3" />
                                </Link>
                            )
                        })}
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-8 justify-center">
                        {heroStats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl font-black text-[#0a0a0a]">{stat.value}</div>
                                <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Overview cards ── */}
            <ServicesSection />

            {/* ── Detailed service sections ── */}
            <section className="section-padding">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 text-gray-600 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-4">
                            Deep Dive
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-[#0a0a0a] tracking-tight">
                            What&apos;s Included in Each Service
                        </h2>
                    </div>

                    <div className="space-y-24">
                        {services.map((s, idx) => {
                            const accent = serviceAccents[s.id] || { bar: 'from-gray-400 to-gray-600', badge: 'bg-gray-50 text-gray-600 border-gray-200', text: 'text-gray-600' }
                            const img = serviceImages[s.id] || web
                            const isEven = idx % 2 === 0

                            return (
                                <div
                                    key={s.id}
                                    id={s.id}
                                    className="grid md:grid-cols-2 gap-12 items-center"
                                >
                                    {/* Text */}
                                    <div className={isEven ? 'md:order-1' : 'md:order-2'}>
                                        {/* Number */}
                                        <span className="text-xs font-black tracking-[0.25em] text-gray-300 mb-4 block">
                                            {String(idx + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                                        </span>

                                        {/* Accent bar */}
                                        <div className={`w-10 h-1 rounded-full bg-gradient-to-r ${accent.bar} mb-5`} />

                                        <h2 className="text-2xl sm:text-3xl font-black text-[#0a0a0a] tracking-tight mb-3">
                                            {s.title}
                                        </h2>
                                        <p className="text-gray-500 leading-relaxed mb-6">{s.description}</p>

                                        {/* Features */}
                                        {s.features && (
                                            <div className="grid grid-cols-2 gap-2 mb-8">
                                                {s.features.map((f) => (
                                                    <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                                                        <span className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 ${accent.badge}`}>
                                                            <FiCheck className="w-3 h-3" />
                                                        </span>
                                                        {f}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex flex-wrap gap-3">
                                            <Link
                                                href="/contact"
                                                className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 transition-all duration-200"
                                            >
                                                Get Started <FiArrowRight className="w-4 h-4" />
                                            </Link>
                                            <Link
                                                href="/portfolio"
                                                className="inline-flex items-center gap-2 border border-gray-200 text-[#0a0a0a] px-6 py-3 rounded-full font-semibold text-sm hover:bg-white hover:border-gray-300 transition-all duration-200"
                                            >
                                                See Work
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <div className={isEven ? 'md:order-2' : 'md:order-1'}>
                                        <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-[0_8px_40px_rgba(0,0,0,0.08)] bg-white">
                                            {/* Gradient top accent */}
                                            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accent.bar}`} />
                                            <Image
                                                src={img}
                                                alt={`${s.title} — CodeXprime`}
                                                width={640}
                                                height={400}
                                                className="w-full h-auto object-cover aspect-[16/10]"
                                                priority={idx === 0}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── Process ── */}
            <Process />

            {/* ── FAQ ── */}
            <Faq limit={4} />

            {/* ── Contact ── */}
            <ContactSection />
        </main>
    )
}
