import ContactSection from '@/components/shared/ContactSection'
import type { Metadata } from 'next'
import Link from 'next/link'
import { FiClock, FiMessageCircle, FiZap } from 'react-icons/fi'

export const metadata: Metadata = {
    title: 'Contact | CodeXprime — Get a Free Consultation',
    description:
        'Contact CodeXprime for a free consultation. Web development, digital marketing, and design services in Delhi. We respond within 24 hours.',
    alternates: { canonical: '/contact' },
    openGraph: {
        title: 'Contact CodeXprime',
        description: 'Reach out for a free consultation. We respond within 24 hours.',
        type: 'website',
        url: 'https://codexprime.in/contact',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Contact CodeXprime' }],
        siteName: 'CodeXprime',
    },
    robots: { index: true, follow: true },
}

const trustItems = [
    { icon: <FiClock className="w-4 h-4" />, label: '24h', sub: 'Response Time', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    { icon: <FiZap className="w-4 h-4" />, label: 'Free', sub: 'Consultation', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { icon: <FiMessageCircle className="w-4 h-4" />, label: 'No', sub: 'Obligation', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
]

export default function ContactPage() {
    return (
        <main className="min-h-screen pb-16">

            {/* ── Hero ── */}
            <section className="relative overflow-hidden pt-14 pb-20 px-4 sm:px-6">
                {/* Blobs */}
                <div className="absolute top-0 right-1/3 w-[480px] h-[480px] rounded-full bg-orange-200/20 blur-[130px] animate-blob pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-[380px] h-[380px] rounded-full bg-blue-200/20 blur-[110px] animate-blob animation-delay-2 pointer-events-none" />
                <div className="absolute top-1/3 left-[6%] w-[240px] h-[240px] rounded-full bg-pink-200/15 blur-[70px] animate-blob animation-delay-4 pointer-events-none" />

                <div className="relative max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-100 text-orange-600 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm mb-7">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-60" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                        </span>
                        Let&apos;s Connect
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0a0a0a] leading-[1.06] tracking-tight mb-5">
                        Let&apos;s Build{' '}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #8b5cf6 100%)' }}
                        >
                            Something Great
                        </span>
                    </h1>

                    <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                        Tell us about your project and we&apos;ll get back to you within 24 hours with ideas,
                        a rough scope, and a free consultation.
                    </p>

                    {/* Trust chips */}
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                        {trustItems.map((item, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-3 ${item.bg} border ${item.border} rounded-2xl px-5 py-3 shadow-sm`}
                            >
                                <div className={`w-8 h-8 bg-white border ${item.border} rounded-xl flex items-center justify-center ${item.color}`}>
                                    {item.icon}
                                </div>
                                <div className="text-left">
                                    <div className={`text-base font-black ${item.color} leading-none`}>{item.label}</div>
                                    <div className="text-xs text-gray-500 mt-0.5">{item.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Secondary link */}
                    <p className="text-sm text-gray-400">
                        Not sure what you need?{' '}
                        <Link href="/services" className="text-[#0a0a0a] font-semibold underline underline-offset-2 hover:text-gray-700 transition-colors">
                            Explore our services
                        </Link>
                        {' '}first.
                    </p>
                </div>
            </section>

            {/* ── Contact form + info ── */}
            <ContactSection />
        </main>
    )
}
