"use client";

import React, { useState } from "react";
import CallDialog from "./CallDialog";
import { Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const StillConfusedSection = () => {
    const [showCallDialog, setShowCallDialog] = useState(false);
    const phoneNumber = "+919354734436";

    return (
        <section className="relative overflow-hidden border-t border-gray-100 py-20 px-4 sm:px-6">
            {/* Subtle blurred color blobs in background */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100 rounded-full opacity-30 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-100 rounded-full opacity-30 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="space-y-6"
                >
                    <span className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-500 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full shadow-sm">
                        Still Have Questions?
                    </span>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0a0a0a] leading-tight tracking-tight">
                        Let&apos;s Talk &mdash;{' '}
                        <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                            We&apos;re Ready
                        </span>
                    </h2>

                    <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
                        Have a project in mind or need expert advice? Give us a call — our team is available Mon–Sat, 10 AM to 7 PM.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                        <button
                            onClick={() => setShowCallDialog(true)}
                            className="inline-flex items-center gap-2.5 bg-black text-white px-7 py-4 rounded-full font-semibold text-sm hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            <Phone className="w-4 h-4" />
                            {phoneNumber}
                        </button>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 border border-gray-300 text-[#0a0a0a] px-7 py-4 rounded-full font-semibold text-sm hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                        >
                            Send a Message <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <p className="text-xs text-gray-400">
                        Available Monday – Saturday · 10:00 AM – 7:00 PM IST
                    </p>
                </motion.div>
            </div>

            <CallDialog
                phoneNumber={phoneNumber}
                show={showCallDialog}
                onClose={() => setShowCallDialog(false)}
            />
        </section>
    );
};

export default StillConfusedSection;
