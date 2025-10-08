"use client";

import { biglogoremove } from '@/assets'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { PhoneCall } from 'lucide-react';

const Navigation = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/services', label: 'Services' },
        { href: '/about', label: 'About' },
        { href: '/portfolio', label: 'Portfolio' },
        // { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Contact' }
    ]

    return (
        <div className='w-full h-[4.5rem] text-black flex items-center justify-between bg-white shadow-sm px-4 lg:px-8'>
            {/* Logo */}
            <Link href="/" className='flex items-center'>
                <Image
                    src={biglogoremove}
                    alt='CodeXprime Logo'
                    width={150}
                    height={50}
                    className='h-auto w-auto md:max-h-12 max-h-10'
                />
            </Link>

            {/* Desktop Navigation */}
            <nav className='hidden md:flex'>
                <ul className='flex space-x-8'>
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.href}
                                className='text-body hover:text-gray-600 transition-colors duration-200 font-medium'
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Contact Number - All Screens */}
            <div className='flex items-center space-x-2'>
                <div className='flex flex-col items-end text-xs md:text-base'>
                    <span className='text-caption text-gray-500'>Get Expert Support</span>
                    <a
                        href="tel:+919354734436"
                        className='text-body font-semibold hover:text-gray-600 transition-colors duration-200'
                    >
                        +91 935 473 4436
                    </a>
                </div>

                {/* Mobile Call Button */}
                {/* <a
                    href="tel:+919354734436"
                    className='hidden bg-black text-white px-3 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors duration-200 '
                >
                    Call Now
                </a> */}

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className='md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 ml-3'
                >
                    <span
                        className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                            }`}
                    ></span>
                    <span
                        className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''
                            }`}
                    ></span>
                    <span
                        className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                            }`}
                    ></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden' onClick={toggleMobileMenu}></div>
            )}

            {/* Mobile Menu */}
            <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                {/* Close Button */}
                <button
                    onClick={toggleMobileMenu}
                    className='absolute top-4 right-4 w-8 h-8 flex items-center justify-center'
                >
                    <span className='w-6 h-0.5 bg-black rotate-45 absolute'></span>
                    <span className='w-6 h-0.5 bg-black -rotate-45 absolute'></span>
                </button>

                {/* Mobile Navigation */}
                <nav className='pt-16 px-6'>
                    <ul className='space-y-4'>
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    onClick={toggleMobileMenu}
                                    className='block text-body hover:text-gray-600 transition-colors duration-200 font-medium py-3 border-b border-gray-100'
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Contact Section - Mobile */}
                    <div className='mt-8 p-4 bg-gray-50 rounded-lg'>
                        <h3 className='text-body font-semibold mb-2'>Ready to Start Your Project?</h3>
                        <p className='text-caption text-gray-600 mb-3'>Contact our expert team for consultation</p>
                        <a
                            href="tel:+919354734436"
                            className='inline-flex items-center justify-center w-full bg-black text-white py-3 px-4 text-body font-medium hover:bg-gray-800 transition-colors duration-200 gap-3'
                        >
                            <PhoneCall /> +91 935 473 4436
                        </a>
                    </div>

                    {/* Quick Info */}
                    <div className='mt-6 text-center'>
                        <p className='text-caption text-gray-500'>Available Mon-Sat • 10 AM - 7 PM</p>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navigation