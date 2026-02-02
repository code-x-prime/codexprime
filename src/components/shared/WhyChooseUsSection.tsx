"use client";
import React from 'react';
import {
    Shield,
    Clock,
    Users,
    Headphones,
    CheckCircle,

    Zap,
    Trophy,
    ArrowRight,
    IndianRupee
} from 'lucide-react';
import HeadText from './Head-Text';
import CountUp from 'react-countup';

const WhyChooseUsSection = () => {
    const benefits = [
        {
            icon: <Users className="w-7 h-7" />,
            title: "Expert Team",
            description: "Skilled developers with 5+ years experience delivering world-class solutions for your business growth.",
            stat: "50+",
            label: "Experts",
            accent: "border-[#00C49A] text-[#00C49A]"
        },
        {
            icon: <Clock className="w-7 h-7" />,
            title: "On-Time Delivery",
            description: "98% projects delivered on time. Your deadlines are our priority with guaranteed project completion.",
            stat: "98%",
            label: "Success Rate",
            accent: "border-[#00C49A] text-[#00C49A]"
        },
        {
            icon: <IndianRupee className="w-7 h-7" />,
            title: "Best Pricing",
            description: "Premium quality at competitive rates. Get 40% more value compared to other agencies in market.",
            stat: "40%",
            label: "Cost Saving",
            accent: "border-[#00C49A] text-[#00C49A]"
        },
        {
            icon: <Headphones className="w-7 h-7" />,
            title: "24/7 Support",
            description: "Round-the-clock technical support and maintenance. We're always available when you need us.",
            stat: "24 hours",
            label: "Available",
            accent: "border-[#00C49A] text-[#00C49A]"
        },
        {
            icon: <Zap className="w-7 h-7" />,
            title: "Latest Tech",
            description: "Cutting-edge technology stack and modern frameworks to build future-ready scalable solutions.",
            stat: "100%",
            label: "Modern Stack",
            accent: "border-[#00C49A] text-[#00C49A]"
        },
        {
            icon: <Trophy className="w-7 h-7" />,
            title: "Proven Results",
            description: "150+ successful projects with 99% client satisfaction rate and industry-leading performance.",
            stat: "150+",
            label: "Projects Done",
            accent: "border-[#00C49A] text-[#00C49A]"
        }
    ];



    return (
        <section className="py-10 md:py-16 px-6 bg-white text-black relative">

            <div className="max-w-7xl mx-auto relative z-10">

                <HeadText title="We Don't Just Code, We Create Success" icon={<Shield className="w-4 h-4" />} icontitle="  WHY CHOOSE CODEXPRIME"
                    description="150+ businesses trust us for their digital transformation.
                        Here's why we're the right choice for your next project." />


                {/* Benefits Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6 mb-10">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="group p-4 sm:p-5 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:bg-gray-50"
                        >
                            {/* Header with icon and stat */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4 md:gap-5">
                                <div className="flex items-center gap-2">
                                    <div className="text-[#00C49A] bg-[rgba(0,196,154,0.1)] p-2">
                                        {benefit.icon}
                                    </div>
                                    <h3 className="text-[15px] sm:text-base font-semibold text-black leading-tight">
                                        {benefit.title}
                                    </h3>
                                </div>
                                <div className={`text-left md:text-right border-l-2 pl-3 ${benefit.accent}`}>
                                    <div className="text-lg font-bold">
                                        <CountUp
                                            end={parseInt(benefit.stat.replace(/[^0-9]/g, '')) || 0}
                                            duration={2.5}
                                            suffix={benefit.stat.replace(/[0-9]/g, '')}
                                            enableScrollSpy
                                            scrollSpyOnce
                                        />
                                    </div>
                                    <div className="text-xs text-gray-500">{benefit.label}</div>
                                </div>
                            </div>

                            <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-4">
                                {benefit.description}
                            </p>

                            {/* Bottom indicator */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-[#00C49A] text-xs md:text-sm font-medium">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>Guaranteed</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all duration-200" />
                            </div>
                        </div>
                    ))}
                </div>






            </div>
        </section>
    );
};

export default WhyChooseUsSection;