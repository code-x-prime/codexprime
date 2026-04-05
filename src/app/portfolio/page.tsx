import Portfolio from '@/components/shared/Portfolio'
import ContactSection from '@/components/shared/ContactSection'
import type { Metadata } from 'next'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

export const metadata: Metadata = {
    title: 'Portfolio | CodeXprime — Real Projects, Real Results',
    description:
        "Explore CodeXprime's portfolio of web development, digital marketing, and MVP projects. EdTech, e-commerce, healthcare, NGO platforms built in Delhi.",
    alternates: { canonical: '/portfolio' },
    openGraph: {
        title: 'Portfolio | CodeXprime',
        description: "Real projects, real results — see how we've helped businesses transform their digital presence.",
        type: 'website',
        url: 'https://codexprime.in/portfolio',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CodeXprime Portfolio' }],
        siteName: 'CodeXprime',
    },
    robots: { index: true, follow: true },
}

const stats = [
    { value: '6+',   label: 'Projects Live' },
    { value: '5+',   label: 'Industries' },
    { value: '150+', label: 'Happy Clients' },
]

export default function PortfolioPage() {
    return (
        <main className="min-h-screen pb-16">

            {/* ── Hero ── */}
            <section className="relative overflow-hidden pt-14 pb-24 px-4 sm:px-6">
                {/* Blobs */}
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-200/25 blur-[130px] animate-blob pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-200/20 blur-[110px] animate-blob animation-delay-2 pointer-events-none" />
                <div className="absolute top-1/3 right-[6%] w-[260px] h-[260px] rounded-full bg-emerald-200/15 blur-[80px] animate-blob animation-delay-4 pointer-events-none" />

                <div className="relative max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-50 to-cyan-50 border border-violet-100 text-violet-600 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm mb-7">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-60" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
                        </span>
                        Our Work
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0a0a0a] leading-[1.06] tracking-tight mb-5">
                        Projects That{' '}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 60%, #10b981 100%)' }}
                        >
                            Speak Results
                        </span>
                    </h1>

                    <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                        Real clients, real challenges, real outcomes — from EdTech platforms and financial services
                        to e-commerce systems and NGO campaigns.
                    </p>

                    {/* Stats row */}
                    <div className="flex flex-wrap gap-8 justify-center mb-10">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl font-black text-[#0a0a0a]">{stat.value}</div>
                                <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-full font-semibold text-sm shadow-[0_4px_24px_rgba(124,58,237,0.35)] hover:shadow-[0_6px_32px_rgba(124,58,237,0.5)] hover:scale-[1.03] transition-all duration-200"
                        style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)' }}
                    >
                        Start Your Project
                        <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* ── Projects grid ── */}
            <Portfolio />

            {/* ── Contact ── */}
            <ContactSection />
        </main>
    )
}
