"use client";
import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const stats = [
    { value: 150, suffix: '+', label: 'Projects Delivered', color: 'text-blue-400', glow: 'shadow-[0_0_24px_rgba(96,165,250,0.15)]' },
    { value: 98, suffix: '%', label: 'On-Time Delivery', color: 'text-emerald-400', glow: 'shadow-[0_0_24px_rgba(52,211,153,0.15)]' },
    { value: 40, suffix: '%', label: 'Cost Savings', color: 'text-orange-400', glow: 'shadow-[0_0_24px_rgba(251,146,60,0.15)]' },
    { value: 5, suffix: '+', label: 'Years Experience', color: 'text-purple-400', glow: 'shadow-[0_0_24px_rgba(167,139,250,0.15)]' },
    { value: 24, suffix: '/7', label: 'Support Available', color: 'text-amber-400', glow: 'shadow-[0_0_24px_rgba(251,191,36,0.15)]' },
    { value: 99, suffix: '%', label: 'Client Satisfaction', color: 'text-teal-400', glow: 'shadow-[0_0_24px_rgba(45,212,191,0.15)]' },
];

const marqueeText = [
    'We Don\'t Just Code',
    'We Create Success',
    'We Don\'t Just Code',
    'We Create Success',
    'We Don\'t Just Code',
    'We Create Success',
    'We Don\'t Just Code',
    'We Create Success',
];

const fadeUp = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' } as const,
    transition: { duration: 0.6 },
};

const WhyChooseUsSection = () => {
    return (
        <section className="bg-[#0a0a0a] text-white relative overflow-hidden">
            {/* Warm gradient glow at top */}
            <div
                className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(120,60,10,0.18) 0%, transparent 70%)' }}
            />

            {/* Subtle grain texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px 200px',
                }}
            />

            {/* Scrolling marquee strip at top */}
            <div className="relative overflow-hidden border-b border-white/10 py-4">
                <div className="flex animate-marquee-dark whitespace-nowrap">
                    {[...marqueeText, ...marqueeText].map((text, i) => (
                        <span
                            key={i}
                            className="inline-flex items-center gap-4 mx-8 text-white/50 text-sm font-semibold tracking-widest uppercase select-none"
                        >
                            <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                            {text}
                        </span>
                    ))}
                </div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
                {/* Header */}
                <motion.div {...fadeUp} className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/70 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />
                        Why Choose CodeXprime
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight max-w-3xl mx-auto">
                        We Don&apos;t Just Code &mdash;{' '}
                        <span className="text-white/50">We Create Success</span>
                    </h2>
                    <p className="text-white/50 mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                        150+ businesses trust us for their digital transformation. Here&apos;s why we&apos;re the right choice.
                    </p>
                </motion.div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                            className={`bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-all duration-300 ${stat.glow}`}
                        >
                            <div className={`text-3xl sm:text-4xl font-black mb-1 leading-none ${stat.color}`}>
                                <CountUp
                                    end={stat.value}
                                    duration={2.2}
                                    suffix={stat.suffix}
                                    enableScrollSpy
                                    scrollSpyOnce
                                />
                            </div>
                            <div className="text-white/70 text-xs font-semibold leading-snug">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUsSection;
