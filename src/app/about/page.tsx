import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactSection from '@/components/shared/ContactSection'
import Testimonials from '@/components/shared/Testimonials'
import {
    FiArrowRight,
    FiCheck,
    FiUsers,
    FiZap,
    FiShield,
    FiTarget,
} from 'react-icons/fi'

export const metadata: Metadata = {
    title: 'About | CodeXprime — Small Team, Big Outcomes',
    description:
        'CodeXprime is a focused team of designers, developers and strategists based in Delhi. We partner with founders and businesses to ship digital products that perform.',
    alternates: { canonical: '/about' },
    openGraph: {
        title: 'About CodeXprime',
        description: 'Small team. Big outcomes. We build websites, apps, and marketing that help businesses grow.',
        type: 'website',
        url: 'https://codexprime.in/about',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'About CodeXprime' }],
        siteName: 'CodeXprime',
    },
    robots: { index: true, follow: true },
}

const values = [
    {
        icon: <FiTarget className="w-8 h-8 text-white" />,
        title: 'Client-first Thinking',
        desc: 'We prioritise outcomes over features. Every decision is measured against what delivers the most value to you.',
        gradientArea: 'from-blue-500 to-indigo-600',
        glow: 'shadow-blue-200',
    },
    {
        icon: <FiZap className="w-8 h-8 text-white" />,
        title: 'Clarity in Everything',
        desc: 'Clear scopes, transparent timelines, honest estimates. You always know exactly where your project stands.',
        gradientArea: 'from-emerald-500 to-teal-600',
        glow: 'shadow-emerald-200',
    },
    {
        icon: <FiShield className="w-8 h-8 text-white" />,
        title: 'Responsibility',
        desc: 'We protect your data, deliver reliable software, and stand behind the work we ship — every single time.',
        gradientArea: 'from-purple-500 to-violet-600',
        glow: 'shadow-purple-200',
    },
]

const processSteps = [
    { num: '01', title: 'Discovery Call', desc: 'We scope goals, audience, and success metrics in a short, focused conversation.' },
    { num: '02', title: 'Proposal & Scope', desc: 'Clear deliverables, timeline, and pricing. No surprises, no hidden costs.' },
    { num: '03', title: 'Design & Build', desc: 'We ship in short sprints with regular demos and tight feedback loops.' },
    { num: '04', title: 'Launch & Grow', desc: 'We track performance post-launch and keep improving results over time.' },
]

const industries = [
    'EdTech', 'FinTech', 'Healthcare', 'E-commerce',
    'Real Estate', 'NGO', 'Startups', 'SaaS',
]

export default function AboutPage() {
    return (
        <main className="min-h-screen pb-16">

            {/* ─── 1. HERO ─── */}
            <section className="relative overflow-hidden pt-16 pb-28 px-4 sm:px-6">
                {/* Animated blobs */}
                <div className="absolute top-[-60px] left-1/4 w-[560px] h-[560px] rounded-full bg-emerald-200/25 blur-[140px] animate-blob pointer-events-none" />
                <div className="absolute bottom-[-40px] right-1/4 w-[460px] h-[460px] rounded-full bg-blue-200/25 blur-[120px] animate-blob animation-delay-2 pointer-events-none" />
                <div className="absolute top-1/3 right-[4%] w-[300px] h-[300px] rounded-full bg-violet-200/20 blur-[90px] animate-blob animation-delay-4 pointer-events-none" />

                <div className="relative max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100 text-emerald-700 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        About CodeXprime
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0a0a0a] leading-[1.05] tracking-tight mb-6">
                        We Build Digital Products
                        <br />
                        That{' '}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: 'linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)' }}
                        >
                            Actually Work
                        </span>
                    </h1>

                    <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                        We&apos;re a focused team of designers, developers and strategists who partner with founders
                        and businesses to ship digital products that perform from day one.
                    </p>

                    {/* Trust chips */}
                    <div className="flex flex-wrap gap-3 justify-center mb-10">
                        {[
                            { label: 'Est. 2020' },
                            { label: 'Delhi, India' },
                            { label: '150+ Clients' },
                        ].map((chip) => (
                            <span
                                key={chip.label}
                                className="inline-flex items-center gap-2 bg-white/80 border border-gray-200 text-gray-600 text-xs font-semibold px-4 py-2 rounded-full shadow-sm backdrop-blur-sm"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                                {chip.label}
                            </span>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-full font-semibold text-sm shadow-[0_4px_28px_rgba(16,185,129,0.35)] hover:scale-[1.03] hover:shadow-[0_6px_32px_rgba(16,185,129,0.45)] transition-all duration-200"
                            style={{ background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)' }}
                        >
                            Work With Us <FiArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-2 bg-transparent border border-white/70 text-[#0a0a0a] px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-white/60 hover:scale-[1.02] transition-all duration-200 shadow-sm backdrop-blur-sm"
                        >
                            See Our Work
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── 2. MISSION QUOTE BAND ─── */}
            <section className="py-16 px-4 border-y border-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <div
                        className="text-6xl font-black leading-none mb-4 bg-clip-text text-transparent select-none"
                        style={{ backgroundImage: 'linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)' }}
                        aria-hidden="true"
                    >
                        &ldquo;
                    </div>
                    <p className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0a0a0a] tracking-tight leading-tight max-w-3xl mx-auto">
                        Building digital products that founders are proud of, and customers love to use.
                    </p>
                    <p className="mt-5 text-sm text-gray-400 font-medium tracking-wide">
                        — Our mission since 2020
                    </p>
                </div>
            </section>

            {/* ─── 3. STATS STRIP ─── */}
            <section className="bg-[#0a0a0a] py-16 px-4">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { value: '150+', label: 'Projects Delivered', color: 'text-blue-400', glow: '0 0 40px rgba(59,130,246,0.25)' },
                        { value: '98%', label: 'Client Satisfaction', color: 'text-emerald-400', glow: '0 0 40px rgba(16,185,129,0.25)' },
                        { value: '5+', label: 'Years Experience', color: 'text-orange-400', glow: '0 0 40px rgba(251,146,60,0.25)' },
                        { value: '24h', label: 'Response Time', color: 'text-purple-400', glow: '0 0 40px rgba(167,139,250,0.25)' },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center"
                            style={{ boxShadow: stat.glow }}
                        >
                            <div className={`text-4xl sm:text-5xl font-black mb-2 ${stat.color}`}>
                                {stat.value}
                            </div>
                            <div className="text-white/40 text-xs font-medium uppercase tracking-widest">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── 4. OUR STORY ─── */}
            <section className="section-padding">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-14 items-center">
                        {/* Left — text */}
                        <div>
                            <span className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 text-gray-600 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
                                Our Story
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-black text-[#0a0a0a] tracking-tight leading-tight mb-6">
                                Built to Help Businesses{' '}
                                <span
                                    className="bg-clip-text text-transparent"
                                    style={{ backgroundImage: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
                                >
                                    Win Online
                                </span>
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-[15px]">
                                <p>
                                    CodeXprime started with a simple belief: great digital products shouldn&apos;t be reserved
                                    for big companies with big budgets. Founders and growing businesses deserve the same
                                    quality of design, engineering, and strategy.
                                </p>
                                <p>
                                    We keep things practical. Rapid research, pragmatic design, and iterative build cycles
                                    ensure you get measurable results quickly — balancing engineering quality with time-to-market.
                                </p>
                                <p>
                                    Today, we&apos;ve helped 150+ businesses across EdTech, fintech, healthcare, e-commerce,
                                    and more launch products they&apos;re proud of.
                                </p>
                            </div>

                            <div className="mt-8 space-y-3">
                                {[
                                    'Remote-first — available across India',
                                    'Mon–Sat: 10 AM – 7 PM',
                                    'Established 2020',
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-3 text-sm text-gray-700">
                                        <span className="w-5 h-5 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <FiCheck className="w-3 h-3" />
                                        </span>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right — Role card visual */}
                        <div>
                            <div className="bg-[#0a0a0a] rounded-3xl p-7 relative overflow-hidden">
                                {/* Subtle glow overlay */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-indigo-500/15 blur-3xl pointer-events-none" />
                                <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/10 blur-3xl pointer-events-none" />

                                <div className="relative">
                                    <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-5">
                                        Who we are
                                    </p>

                                    {/* Role pill badges */}
                                    <div className="flex flex-wrap gap-3 mb-7">
                                        {[
                                            { label: 'Designers', bg: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
                                            { label: 'Developers', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
                                            { label: 'Strategists', bg: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
                                            { label: 'Marketers', bg: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
                                        ].map((role) => (
                                            <span
                                                key={role.label}
                                                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${role.bg}`}
                                            >
                                                {role.label}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t border-white/10 mb-6" />

                                    {/* Stat lines */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-white/50 text-sm">Projects completed</span>
                                            <span className="text-white font-black text-lg">150+</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-white/50 text-sm">Years in business</span>
                                            <span className="text-white font-black text-lg">5+</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-white/50 text-sm">Client satisfaction</span>
                                            <span
                                                className="font-black text-lg bg-clip-text text-transparent"
                                                style={{ backgroundImage: 'linear-gradient(135deg, #10b981, #3b82f6)' }}
                                            >
                                                98%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 5. VALUES ─── */}
            <section className="section-padding">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 text-gray-600 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">
                            What Drives Us
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-[#0a0a0a] tracking-tight">
                            Our Core Values
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {values.map((v, i) => (
                            <div
                                key={i}
                                className={`bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-sm ${v.glow}`}
                            >
                                {/* Gradient visual area */}
                                <div className={`h-36 bg-gradient-to-br ${v.gradientArea} flex items-center justify-center relative overflow-hidden`}>
                                    {/* Subtle noise overlay */}
                                    <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
                                    <div className="w-16 h-16 bg-white/20 border border-white/30 rounded-2xl flex items-center justify-center ring-2 ring-white/20 relative z-10">
                                        {v.icon}
                                    </div>
                                </div>
                                {/* Content */}
                                <div className="p-7">
                                    <h3 className="text-lg font-bold text-[#0a0a0a] mb-3">{v.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 6. HOW WE WORK (Timeline) ─── */}
            <section className="section-padding">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 text-gray-600 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">
                            Our Process
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-[#0a0a0a] tracking-tight">
                            From Idea to Launch
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
                            Most projects run in 2-week sprints so you always know what to expect.
                        </p>
                    </div>

                    {/* Desktop horizontal timeline */}
                    <div className="hidden md:block">
                        {/* Circles + connectors */}
                        <div className="flex items-center justify-between mb-8 px-4">
                            {processSteps.map((step, i) => (
                                <React.Fragment key={step.num}>
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center text-sm font-black shadow-lg flex-shrink-0">
                                            {step.num}
                                        </div>
                                    </div>
                                    {i < processSteps.length - 1 && (
                                        <div className="flex-1 border-t-2 border-dashed border-gray-200 mx-3" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                        {/* Labels below */}
                        <div className="grid grid-cols-4 gap-5">
                            {processSteps.map((step) => (
                                <div key={step.num} className="text-center px-2">
                                    <h3 className="text-sm font-bold text-[#0a0a0a] mb-2">{step.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile vertical stack */}
                    <div className="flex flex-col gap-5 md:hidden">
                        {processSteps.map((step, i) => (
                            <div key={step.num} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center text-xs font-black flex-shrink-0">
                                        {step.num}
                                    </div>
                                    {i < processSteps.length - 1 && (
                                        <div className="w-px flex-1 border-l-2 border-dashed border-gray-200 my-2" />
                                    )}
                                </div>
                                <div className="pt-1.5 pb-4">
                                    <h3 className="text-base font-bold text-[#0a0a0a] mb-1">{step.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 7. INDUSTRIES ─── */}
            <section className="section-padding">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 text-gray-600 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">
                        Industries We Serve
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-[#0a0a0a] tracking-tight mb-10">
                        Trusted Across Sectors
                    </h2>

                    <div className="flex flex-wrap gap-3 justify-center">
                        {industries.map((industry) => (
                            <span
                                key={industry}
                                className="bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                            >
                                {industry}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 8. TEAM CTA (dark card) ─── */}
            <section className="section-padding">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-[#0a0a0a] rounded-3xl p-12 sm:p-16 text-center relative overflow-hidden">
                        {/* Glows */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-40 bg-indigo-500/20 blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 blur-3xl pointer-events-none" />

                        <div className="relative">
                            <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <FiUsers className="w-7 h-7 text-white/80" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-5 tracking-tight">
                                A Small, Specialist Team
                            </h2>
                            <p className="text-white/60 leading-relaxed max-w-lg mx-auto mb-10 text-[15px]">
                                We&apos;re a lean team of designers and engineers. When a project needs a specialist,
                                we bring in vetted partners — so you always get the right expertise at the right time.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-white text-[#0a0a0a] px-8 py-3.5 rounded-full font-bold text-sm hover:bg-gray-100 hover:scale-[1.03] transition-all duration-200 shadow-lg"
                            >
                                Start a Conversation <FiArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 9. Testimonials + Contact ─── */}
            <Testimonials />
            <ContactSection />
        </main>
    )
}
