import React from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'
import { biglogoremove } from '@/assets'
import Link from 'next/link'

const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

                    {/* Company Info Section */}
                    <div className="sm:col-span-2 lg:col-span-2">
                        {/* Logo */}
                        <Link href="/" className="inline-block mb-4">
                            <Image src={biglogoremove} alt="CodeXprime Logo" width={150} height={40} className="h-10 w-auto object-cover" />
                        </Link>

                        {/* Description */}
                        <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed max-w-md">
                            We build modern websites, digital products and marketing that help businesses grow.
                        </p>

                        {/* Location */}
                        <div className="flex items-center gap-3 text-gray-600 text-sm sm:text-base">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span>Online-first — serving clients remotely</span>
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <div className="sm:col-span-1 lg:col-span-1">
                        <h4 className="text-gray-900 font-semibold mb-3 text-sm sm:text-base">Quick links</h4>
                        <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                            <li>
                                <Link href="/" className="hover:text-gray-900 hover:underline transition-colors duration-200">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="hover:text-gray-900 hover:underline transition-colors duration-200">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/portfolio" className="hover:text-gray-900 hover:underline transition-colors duration-200">
                                    Portfolio
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-gray-900 hover:underline transition-colors duration-200">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="sm:col-span-1 lg:col-span-1">
                        <h4 className="text-gray-900 font-semibold mb-3 text-sm sm:text-base">Contact</h4>

                        {/* Phone Contact */}
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0">
                                <Phone className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <a
                                    href="tel:+918882304322"
                                    className="text-gray-700 font-medium text-sm sm:text-base hover:text-gray-900 transition-colors duration-200 block"
                                >
                                    +91 8882304322
                                </a>
                                <div className="text-gray-600 text-xs sm:text-sm mt-1">
                                    Call us for a quick chat
                                </div>
                            </div>
                        </div>

                        {/* Email Contact */}
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0">
                                <Mail className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <a
                                    href="mailto:hello@codexprime.in"
                                    className="text-gray-700 font-medium text-sm sm:text-base hover:text-gray-900 transition-colors duration-200 block break-all"
                                >
                                    hello@codexprime.in
                                </a>
                                <div className="text-gray-600 text-xs sm:text-sm mt-1">
                                    We reply within 24 hours
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-8 lg:mt-10 border-t border-gray-100 pt-6 lg:pt-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-xs sm:text-sm">
                        {/* Copyright */}
                        <div className="text-center sm:text-left">
                            © {new Date().getFullYear()} CodeXprime. All rights reserved.
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-2 text-center pb-10 md:pb-0">
                            <span>Made with care</span>
                            <span className="text-gray-300">•</span>
                            <Link href="/privacy" className="hover:text-gray-700 transition-colors duration-200">
                                Privacy
                            </Link>
                            <span className="text-gray-300">•</span>
                            <Link href="/terms" className="hover:text-gray-700 transition-colors duration-200">
                                Terms
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer