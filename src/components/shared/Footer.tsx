'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { trackFooterClick } from '@/lib/posthog';

const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About Us' },
    { href: '/blog/', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
];

const resourceLinks = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
    { href: '/refund', label: 'Refund Policy' },
];

const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 3000);
    };

    return (
        <footer className="bg-white border-t border-gray-100 pt-20 pb-0 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Main row */}
                <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
                    {/* Left: Contact + Subscribe */}
                    <div className="max-w-sm">
                        <p className="text-gray-400 text-sm mb-1">Contact us at</p>
                        <a
                            href="mailto:hello@codexprime.in"
                            className="text-[#0a0a0a] font-semibold text-lg hover:text-gray-600 transition-colors"
                            onClick={() => trackFooterClick('Email', 'mailto:hello@codexprime.in')}
                        >
                            hello@codexprime.in
                        </a>

                        {/* Subscribe form */}
                        <form onSubmit={handleSubscribe} className="mt-6">
                            {subscribed ? (
                                <p className="text-sm text-green-600 font-medium py-3">Thanks for subscribing!</p>
                            ) : (
                                <div className="flex items-center gap-0 bg-white border border-gray-200 rounded-full overflow-hidden shadow-sm">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        className="flex-1 px-5 py-3 text-sm text-[#0a0a0a] placeholder:text-gray-400 bg-transparent outline-none"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-black text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-gray-800 transition-colors mr-0.5 my-0.5 flex-shrink-0"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Right: Link columns */}
                    <div className="flex gap-16 sm:gap-24">
                        <div>
                            <h4 className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-5">Links</h4>
                            <ul className="space-y-3">
                                {quickLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-600 text-sm hover:text-black transition-colors"
                                            onClick={() => trackFooterClick(link.label, link.href)}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-5">More Resources</h4>
                            <ul className="space-y-3">
                                {resourceLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-600 text-sm hover:text-black transition-colors"
                                            onClick={() => trackFooterClick(link.label, link.href)}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Copyright line */}
                <div className="border-t border-gray-100 py-4 text-center">
                    <span className="text-gray-400 text-xs">
                        © {new Date().getFullYear()} CodeXprime. All rights reserved.
                    </span>
                </div>
            </div>

            {/* Giant watermark text */}
            <div className="overflow-hidden pointer-events-none select-none -mb-4 sm:-mb-6 lg:-mb-10 mt-2">
                <p className="text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] font-black text-gray-100 text-center leading-none tracking-tighter whitespace-nowrap">
                    CODEXPRIME
                </p>
            </div>
        </footer>
    );
};

export default Footer;
