"use client";

import React, { useEffect, useRef, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { MessageCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { FaStar, FaRegStar } from "react-icons/fa";
import HeadText from "./Head-Text";
import { FcGoogle } from "react-icons/fc";


// Only include testimonials that have website links per your list
const testimonials = [
    {
        name: "Dinesh Verma",
        company: "MonarkFX",
        role: "Founder & CEO",
        website: "https://monarkfx.com/",
        quote: "Bahut badhiya kaam kiya — professional aur time pe deliver kiya. Website bilkul expected jaisa mila.",
        date: "2 months ago"
    },
    {
        name: "Sanjeev Kumar",
        company: "EDAWS",
        role: "Founder",
        website: "https://www.edaws.in/",
        quote: "Reliable partner hai ye — sab kuch smooth chal raha hai. Quality work guarantee hai.",
        date: "3 months ago"
    },
    {
        name: "Nitesh",
        company: "Nifty Nitesh",
        role: "Founder",
        website: "https://niftynitesh.com/",
        quote: "Solid development and excellent support. These guys really know their stuff and deliver on time.",
        date: "1 month ago"
    },
    {
        name: "Rohit Kaushik",
        company: "TRX Sol",
        role: "Co-Founder",
        website: "https://trxsol.com/",
        quote: "Delivered a modern, high-performance website for us. Great attention to detail and responsive design.",
        date: "4 months ago"
    },
    {
        name: "Shyam Verma",
        company: "EquityTank",
        role: "Founder",
        website: "https://www.equitytank.com/",
        quote: "Professional designers and attentive communication throughout the project. Highly recommended!",
        date: "2 months ago"
    },
    {
        name: "Ranvijay",
        company: "EOAN",
        role: "CEO",
        website: "https://eoan.in/",
        quote: "Great process and clear deliverables. They understood our requirements perfectly and executed flawlessly.",
        date: "1 month ago"
    },
    {
        name: "Sager",
        company: "TRX Academy",
        role: "Founder",
        website: "#",
        quote: "Amazing work on our educational platform. The UI/UX is exactly what we needed for our students.",
        date: "3 weeks ago"
    },
    {
        name: "Sushil Sharma",
        company: "Sharma Fitness",
        role: "Founder",
        website: "#",
        quote: "Perfect fitness website with booking system. My clients love the new interface and easy navigation.",
        date: "2 weeks ago"
    }
];

const Testimonials: React.FC = () => {
    const apiRef = useRef<CarouselApi | null>(null);
    const autoRef = useRef<number | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    // start autoplay
    useEffect(() => {
        const start = () => {
            if (!apiRef.current || testimonials.length <= 1) return;
            stop();
            autoRef.current = window.setInterval(() => {
                try {
                    apiRef.current?.scrollNext();
                } catch {
                    // ignore errors from embla during teardown
                }
            }, 3000);
        };

        const stop = () => {
            if (autoRef.current) {
                window.clearInterval(autoRef.current);
                autoRef.current = null;
            }
        };

        if (!isPaused) start();
        else stop();

        return () => stop();
    }, [isPaused]);

    return (
        <section className="bg-gray-50 text-black py-10  px-4 sm:px-6 relative">
            <div className="max-w-6xl mx-auto">
                <HeadText
                    icon={<MessageCircle size={18} />}
                    icontitle="What Our Clients Say"
                    title="Testimonials & Experiences"
                    description="Real stories from clients — name, company and their short note with a link to their site."
                />

                {/* Google-style rating display (react-icons) */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-8 mb-10">
                    <div className="flex items-center gap-1 text-yellow-400">
                        {[...Array(4)].map((_, i) => (
                            <FaStar key={i} className="w-5 h-5" />
                        ))}
                        <FaRegStar className="w-5 h-5" />
                    </div>
                    <div className="text-lg font-semibold text-gray-800">4.9 out of 5</div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">(Based on <FcGoogle size={22} /> Reviews)</div>
                </div>

                <div
                    className="relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <Carousel
                        opts={{ loop: true, align: "start" }}
                        setApi={(api) => {
                            apiRef.current = api;
                        }}
                    >
                        <CarouselContent className="-ml-2 sm:-ml-3">
                            {testimonials.map((t, idx) => (
                                <CarouselItem
                                    key={idx}
                                    className="pl-2 sm:pl-3 basis-1/2 lg:basis-1/3"
                                >
                                    <div className="relative bg-white border-l-4 border-black shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6 h-full min-h-[280px]">

                                        {/* Review Content */}
                                        <div className="pt-2 h-full flex flex-col">
                                            <p className="text-gray-800 text-sm sm:text-base leading-relaxed mb-2 sm:mb-6 font-medium flex-grow">
                                                {t.quote}
                                            </p>

                                            {/* User Info */}
                                            <div className="border-t border-gray-100 pt-2 sm:pt-4 mt-auto">
                                                <div className="flex items-start justify-between mb-2 sm:mb-3">
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                                                            {t.name}
                                                        </h4>
                                                        <p className="text-xs sm:text-sm text-gray-600">{t.role}</p>
                                                        <p className="text-xs sm:text-sm font-medium text-black">{t.company}</p>
                                                    </div>
                                                    {/* Date removed as requested */}
                                                </div>

                                                {/* Website Link - only show if website exists and is not # */}
                                                {t.website && t.website !== "#" && (
                                                    <a
                                                        href={t.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                                                    >
                                                        Visit {t.company} →
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>

                    {/* Navigation buttons - bottom right corner */}
                    <div className="flex items-center justify-end gap-2 mt-6">
                        <button
                            aria-label="Previous testimonial"
                            onClick={() => apiRef.current?.scrollPrev()}
                            className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 bg-black text-white hover:bg-gray-800 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button
                            aria-label="Next testimonial"
                            onClick={() => apiRef.current?.scrollNext()}
                            className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 bg-black text-white hover:bg-gray-800 transition-colors"
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
