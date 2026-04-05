"use client";

import React, { useEffect, useRef, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { MessageCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import HeadText from "./Head-Text";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

// Color palette cycling per card
const cardColors = [
    { bar: 'bg-blue-500', quote: 'text-blue-400', avatar: 'bg-blue-500', ring: 'ring-blue-100' },
    { bar: 'bg-purple-500', quote: 'text-purple-400', avatar: 'bg-purple-500', ring: 'ring-purple-100' },
    { bar: 'bg-emerald-500', quote: 'text-emerald-400', avatar: 'bg-emerald-500', ring: 'ring-emerald-100' },
    { bar: 'bg-orange-500', quote: 'text-orange-400', avatar: 'bg-orange-500', ring: 'ring-orange-100' },
    { bar: 'bg-teal-500', quote: 'text-teal-400', avatar: 'bg-teal-500', ring: 'ring-teal-100' },
    { bar: 'bg-rose-500', quote: 'text-rose-400', avatar: 'bg-rose-500', ring: 'ring-rose-100' },
    { bar: 'bg-indigo-500', quote: 'text-indigo-400', avatar: 'bg-indigo-500', ring: 'ring-indigo-100' },
    { bar: 'bg-amber-500', quote: 'text-amber-400', avatar: 'bg-amber-500', ring: 'ring-amber-100' },
];

const testimonials = [
    {
        name: "Dinesh Verma",
        company: "MonarkFX",
        role: "Founder & CEO",
        website: "https://monarkfx.com/",
        quote: "Bahut badhiya kaam kiya — professional aur time pe deliver kiya. Website bilkul expected jaisa mila.",
        initials: "DV",
    },
    {
        name: "Sanjeev Kumar",
        company: "EDAWS",
        role: "Founder",
        website: "https://www.edaws.in/",
        quote: "Reliable partner hai ye — sab kuch smooth chal raha hai. Quality work guarantee hai.",
        initials: "SK",
    },
    {
        name: "Nitesh",
        company: "Nifty Nitesh",
        role: "Founder",
        website: "https://niftynitesh.com/",
        quote: "Solid development and excellent support. These guys really know their stuff and deliver on time.",
        initials: "N",
    },
    {
        name: "Rohit Kaushik",
        company: "TRX Sol",
        role: "Co-Founder",
        website: "https://trxsol.com/",
        quote: "Delivered a modern, high-performance website for us. Great attention to detail and responsive design.",
        initials: "RK",
    },
    {
        name: "Shyam Verma",
        company: "EquityTank",
        role: "Founder",
        website: "https://www.equitytank.com/",
        quote: "Professional designers and attentive communication throughout the project. Highly recommended!",
        initials: "SV",
    },
    {
        name: "Ranvijay",
        company: "EOAN",
        role: "CEO",
        website: "https://eoan.in/",
        quote: "Great process and clear deliverables. They understood our requirements perfectly and executed flawlessly.",
        initials: "R",
    },
    {
        name: "Sager",
        company: "TRX Academy",
        role: "Founder",
        website: "#",
        quote: "Amazing work on our educational platform. The UI/UX is exactly what we needed for our students.",
        initials: "S",
    },
    {
        name: "Sushil Sharma",
        company: "Sharma Fitness",
        role: "Founder",
        website: "#",
        quote: "Perfect fitness website with booking system. My clients love the new interface and easy navigation.",
        initials: "SS",
    },
];

const Testimonials: React.FC = () => {
    const apiRef = useRef<CarouselApi | null>(null);
    const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const start = () => {
            if (!apiRef.current) return;
            stop();
            autoRef.current = setInterval(() => {
                try { apiRef.current?.scrollNext(); } catch { /* ignore */ }
            }, 3500);
        };
        const stop = () => {
            if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = null; }
        };
        if (!isPaused) start(); else stop();
        return () => stop();
    }, [isPaused]);

    return (
        <section className="section-padding">
            <div className="max-w-6xl mx-auto">
                <HeadText
                    icon={<MessageCircle className="w-3.5 h-3.5" />}
                    icontitle="Client Testimonials"
                    title="Happy Clients Speak for Us"
                    description="Real stories from businesses we've helped grow — from startups to established brands."
                />

                {/* Rating badge */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-3 mb-10"
                >
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                        ))}
                    </div>
                    <span className="text-lg font-bold text-[#0a0a0a]">4.9 / 5</span>
                    <span className="text-sm text-gray-500 flex items-center gap-1.5">
                        Based on <FcGoogle size={18} /> Reviews
                    </span>
                </motion.div>

                {/* Carousel */}
                <div
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <Carousel
                        opts={{ loop: true, align: "start" }}
                        setApi={(api) => { apiRef.current = api; }}
                    >
                        <CarouselContent className="-ml-4">
                            {testimonials.map((t, idx) => {
                                const colors = cardColors[idx % cardColors.length];
                                return (
                                    <CarouselItem key={idx} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                                        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden h-full flex flex-col min-h-[240px] hover:shadow-md transition-all duration-300 group">
                                            {/* Colored top accent bar */}
                                            <div className={`h-1 w-full ${colors.bar}`} />

                                            <div className="p-6 flex flex-col flex-1">
                                                {/* Colored quote mark */}
                                                <span className={`text-4xl font-black leading-none mb-3 ${colors.quote} select-none`}>&ldquo;</span>

                                                {/* Quote text */}
                                                <p className="text-gray-700 text-sm leading-relaxed flex-grow mb-5">
                                                    {t.quote}
                                                </p>

                                                {/* Stars */}
                                                <div className="flex items-center gap-0.5 mb-4">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar key={i} className="w-3 h-3 text-yellow-400" />
                                                    ))}
                                                </div>

                                                {/* Author */}
                                                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                                                    <div className={`w-9 h-9 rounded-full ${colors.avatar} ring-2 ${colors.ring} text-white flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                                                        {t.initials}
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <div className="font-bold text-[#0a0a0a] text-sm truncate">{t.name}</div>
                                                        <div className="text-gray-400 text-xs truncate">{t.role}, {t.company}</div>
                                                    </div>
                                                    {t.website && t.website !== '#' && (
                                                        <a
                                                            href={t.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`flex items-center gap-1 text-xs font-medium opacity-50 group-hover:opacity-100 transition-opacity ${colors.quote}`}
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            Visit <FiExternalLink size={11} />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>
                    </Carousel>

                    {/* Navigation buttons */}
                    <div className="flex items-center justify-center gap-3 mt-8">
                        <button
                            aria-label="Previous testimonial"
                            onClick={() => apiRef.current?.scrollPrev()}
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button
                            aria-label="Next testimonial"
                            onClick={() => apiRef.current?.scrollNext()}
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                        >
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
