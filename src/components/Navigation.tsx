"use client";

import { biglogoremove } from '@/assets';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { trackNavigation, trackContactInteraction } from '@/lib/posthog';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const leftLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog/', label: 'Blog' },
];

const rightLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
];

const allLinks = [...leftLinks, ...rightLinks];

const Navigation = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    const isScrolled = scrollY > 20;
    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <>
            {/* ── Floating navbar ── */}
            <motion.div
                className="fixed top-0 left-0 right-0 z-50 flex justify-center"
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
                <div
                    className={`
                        relative flex items-center justify-between
                        mx-3 sm:mx-4 w-full max-w-4xl
                        rounded-full border
                        transition-all duration-300 ease-out
                        ${isScrolled
                            ? 'mt-2 px-4 sm:px-5 py-2.5 bg-white/90 backdrop-blur-2xl border-gray-200/80 shadow-[0_4px_32px_rgba(0,0,0,0.10),0_1px_0_rgba(255,255,255,0.8)_inset]'
                            : 'mt-4 px-5 sm:px-6 py-3 bg-white/70 backdrop-blur-xl border-gray-100/80 shadow-[0_2px_16px_rgba(0,0,0,0.06)]'
                        }
                    `}
                >
                    {/* Left nav links — desktop */}
                    <nav className="hidden md:flex items-center gap-0.5">
                        {leftLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => trackNavigation(item.label, item.href)}
                                className={`relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                                    isActive(item.href)
                                        ? 'text-[#0a0a0a] bg-gray-100/80'
                                        : 'text-gray-500 hover:text-[#0a0a0a] hover:bg-gray-100/60'
                                }`}
                            >
                                {item.label}
                                {isActive(item.href) && (
                                    <motion.span
                                        layoutId="nav-dot"
                                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Center logo */}
                    <Link
                        href="/"
                        onClick={() => trackNavigation('Logo', '/')}
                        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 flex-shrink-0 md:relative md:left-auto md:translate-x-0"
                    >
                        <Image
                            src={biglogoremove}
                            alt="CodeXprime"
                            width={140}
                            height={45}
                            className="h-auto w-auto max-h-7 sm:max-h-8"
                            priority
                        />
                    </Link>

                    {/* Right nav links + hamburger */}
                    <div className="flex items-center gap-0.5">
                        <nav className="hidden md:flex items-center gap-0.5">
                            {rightLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => {
                                        trackNavigation(item.label, item.href);
                                        if (item.label === 'Contact Us') trackContactInteraction('form', { location: 'header_nav' });
                                    }}
                                    className={`relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                                        item.label === 'Contact Us'
                                            ? isActive(item.href)
                                                ? 'bg-black text-white'
                                                : 'bg-black text-white hover:bg-gray-800'
                                            : isActive(item.href)
                                                ? 'text-[#0a0a0a] bg-gray-100/80'
                                                : 'text-gray-500 hover:text-[#0a0a0a] hover:bg-gray-100/60'
                                    }`}
                                >
                                    {item.label}
                                    {item.label !== 'Contact Us' && isActive(item.href) && (
                                        <motion.span
                                            layoutId="nav-dot"
                                            className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile hamburger */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-gray-200/80 bg-white/60 hover:bg-white transition-all duration-200"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen
                                ? <HiX size={17} className="text-gray-700" />
                                : <HiMenuAlt3 size={17} className="text-gray-700" />
                            }
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Spacer */}
            <div className="h-[4.5rem]" />

            {/* ── Mobile menu ── */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                            onClick={toggleMobileMenu}
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: -12, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -12, scale: 0.98 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed top-[4.5rem] left-3 right-3 z-50 md:hidden"
                        >
                            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden">
                                {/* Links */}
                                <nav className="p-3">
                                    <ul className="space-y-0.5">
                                        {allLinks.map((item, i) => (
                                            <motion.li
                                                key={item.href}
                                                initial={{ opacity: 0, x: -8 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.04, duration: 0.2 }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    onClick={() => {
                                                        toggleMobileMenu();
                                                        trackNavigation(`Mobile - ${item.label}`, item.href);
                                                    }}
                                                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-150 ${
                                                        isActive(item.href)
                                                            ? 'bg-blue-50 text-blue-700'
                                                            : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                                                    }`}
                                                >
                                                    {item.label}
                                                    {isActive(item.href) && (
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                    )}
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </nav>

                                {/* Divider + CTA */}
                                <div className="px-3 pb-3 border-t border-gray-100 pt-2">
                                    <Link
                                        href="/contact"
                                        onClick={() => {
                                            toggleMobileMenu();
                                            trackContactInteraction('form', { location: 'mobile_menu_cta' });
                                        }}
                                        className="flex items-center justify-center w-full py-3 px-4 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
                                    >
                                        Get Free Consultation →
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
