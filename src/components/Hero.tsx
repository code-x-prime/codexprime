"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import Link from 'next/link';
import { FiArrowRight, FiZap, FiClock, FiUsers } from 'react-icons/fi';

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
};

const avatars = [
    { initials: 'DV', bg: 'bg-blue-500' },
    { initials: 'SK', bg: 'bg-violet-500' },
    { initials: 'N', bg: 'bg-emerald-500' },
];

const floatStats = [
    { icon: <FiZap className="w-4 h-4" />, value: '150+', label: 'Projects Done', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: <FiClock className="w-4 h-4" />, value: '98%', label: 'On-Time Delivery', color: 'text-violet-500', bg: 'bg-violet-50' },
    { icon: <FiUsers className="w-4 h-4" />, value: '5+', label: 'Years Experience', color: 'text-emerald-500', bg: 'bg-emerald-50' },
];

const HeroComponent = () => {
    return (
        <section className="relative w-full min-h-[calc(100vh-4.5rem)] bg-white overflow-hidden flex items-center justify-center">

            {/* ── Grid lines background ── */}
            <div className="absolute inset-0 bg-grid-lines opacity-100 pointer-events-none" />

            {/* ── Edge fade mask so grid fades at all 4 edges ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, white 100%)
                    `,
                }}
            />

            {/* ── Animated color blobs ── */}
            <div className="absolute top-10 left-[10%] w-[480px] h-[480px] rounded-full bg-blue-400/10 blur-[120px] animate-blob pointer-events-none" />
            <div className="absolute top-20 right-[8%] w-[380px] h-[380px] rounded-full bg-violet-400/12 blur-[100px] animate-blob animation-delay-2 pointer-events-none" />
            <div className="absolute bottom-10 left-[35%] w-[340px] h-[340px] rounded-full bg-pink-300/10 blur-[90px] animate-blob animation-delay-4 pointer-events-none" />
            <div className="absolute top-1/2 right-[20%] w-[260px] h-[260px] rounded-full bg-cyan-300/08 blur-[80px] animate-blob animation-delay-6 pointer-events-none" />

            {/* ── Content ── */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-14 md:py-20 text-center">
                <motion.div
                    className="flex flex-col items-center gap-6"
                    initial="initial"
                    animate="animate"
                    transition={{ staggerChildren: 0.09 }}
                >
                    {/* Badge */}
                    <motion.div variants={fadeUp} transition={{ duration: 0.45 }}>
                        <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-100/80 text-blue-600 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                            </span>
                            Transform Your Business
                        </span>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        variants={fadeUp}
                        transition={{ duration: 0.6 }}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-black text-[#0a0a0a] leading-[1.04] tracking-tight"
                    >
                        Turning Ideas Into
                        <br />
                        <span
                            className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 45%, #06b6d4 100%)',
                            }}
                        >
                            Scalable Products
                        </span>
                    </motion.h1>

                    {/* Typewriter */}
                    <motion.div
                        variants={fadeUp}
                        transition={{ duration: 0.45 }}
                        className="flex items-center justify-center gap-2 text-base sm:text-lg text-gray-500"
                    >
                        <span>We provide</span>
                        <span className="font-semibold text-[#0a0a0a] min-w-[200px] text-left">
                            <Typewriter
                                options={{
                                    strings: ['Web Designing', 'Digital Marketing', 'MVP Development', 'Graphic Designing', 'IT Solutions'],
                                    autoStart: true,
                                    loop: true,
                                    cursor: '|',
                                    delay: 55,
                                    deleteSpeed: 30,
                                }}
                            />
                        </span>
                    </motion.div>

                    {/* Floating stat cards */}
                    <motion.div
                        variants={fadeUp}
                        transition={{ duration: 0.5 }}
                        className="flex flex-wrap items-center justify-center gap-3"
                    >
                        {floatStats.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                                className="flex items-center gap-2.5 bg-white/90 backdrop-blur-md border border-gray-100/80 rounded-2xl px-4 py-2.5 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.1)] transition-shadow"
                            >
                                <div className={`w-7 h-7 ${s.bg} ${s.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                    {s.icon}
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-black text-[#0a0a0a] leading-none">{s.value}</div>
                                    <div className="text-xs text-gray-400 mt-0.5 whitespace-nowrap">{s.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA buttons */}
                    <motion.div
                        variants={fadeUp}
                        transition={{ duration: 0.45 }}
                        className="flex flex-wrap gap-3 items-center justify-center"
                    >
                        <a
                            href="#contact"
                            className="group relative inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-full font-semibold text-sm overflow-hidden transition-all duration-200 hover:scale-[1.03] shadow-[0_4px_24px_rgba(99,102,241,0.35)] hover:shadow-[0_6px_32px_rgba(99,102,241,0.5)]"
                            style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)' }}
                        >
                            {/* Shine sweep on hover */}
                            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)' }}
                            />
                            Get Free Consultation
                            <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-[#0a0a0a] px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 hover:scale-[1.02] transition-all duration-200 shadow-sm"
                        >
                            View Our Work
                        </Link>
                    </motion.div>

                    {/* Trust avatars */}
                    <motion.div
                        variants={fadeUp}
                        transition={{ duration: 0.45 }}
                        className="flex items-center justify-center gap-3"
                    >
                        <div className="flex items-center">
                            {avatars.map((av, i) => (
                                <div
                                    key={i}
                                    className={`w-8 h-8 rounded-full ${av.bg} text-white flex items-center justify-center text-[10px] font-bold border-2 border-white flex-shrink-0 ${i !== 0 ? '-ml-2.5' : ''}`}
                                    style={{ zIndex: avatars.length - i }}
                                >
                                    {av.initials}
                                </div>
                            ))}
                        </div>
                        <span className="text-sm text-gray-500">
                            Trusted by{' '}
                            <span className="font-bold text-[#0a0a0a]">150+ Businesses</span>
                        </span>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        className="flex flex-col items-center gap-1.5 mt-2"
                    >
                        <span className="text-[10px] text-gray-300 tracking-[0.2em] uppercase">Scroll</span>
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-px h-7 rounded-full"
                            style={{ background: 'linear-gradient(to bottom, #9ca3af, transparent)' }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroComponent;
