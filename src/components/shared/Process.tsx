"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, PenTool, Code, Rocket } from 'lucide-react';

const steps = [
    {
        number: '01',
        title: 'Consultation',
        description: 'Free discovery call to understand your requirements, goals, and project vision.',
        icon: <MessageSquare className="w-5 h-5" />,
        accent: 'from-blue-500 to-blue-600',
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-500',
        borderTop: 'before:bg-gradient-to-r before:from-blue-400 before:to-blue-600',
    },
    {
        number: '02',
        title: 'Planning',
        description: 'Detailed wireframing, tech selection, and timeline crafted for your project.',
        icon: <PenTool className="w-5 h-5" />,
        accent: 'from-purple-500 to-violet-600',
        iconBg: 'bg-purple-50',
        iconColor: 'text-purple-500',
        borderTop: 'before:bg-gradient-to-r before:from-purple-400 before:to-violet-600',
    },
    {
        number: '03',
        title: 'Development',
        description: 'Agile sprints with regular demos, feedback loops, and transparent progress updates.',
        icon: <Code className="w-5 h-5" />,
        accent: 'from-orange-500 to-amber-500',
        iconBg: 'bg-orange-50',
        iconColor: 'text-orange-500',
        borderTop: 'before:bg-gradient-to-r before:from-orange-400 before:to-amber-500',
    },
    {
        number: '04',
        title: 'Launch',
        description: 'Final QA, deployment, performance optimization, and post-launch support.',
        icon: <Rocket className="w-5 h-5" />,
        accent: 'from-green-500 to-emerald-600',
        iconBg: 'bg-green-50',
        iconColor: 'text-green-500',
        borderTop: 'before:bg-gradient-to-r before:from-green-400 before:to-emerald-600',
    },
];

const Process = () => {
    return (
        <section id="process" className="section-padding">
            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <div className="flex flex-col items-center gap-4 mb-14 text-center">
                    <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 border border-gray-200 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full">
                        How We Work
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0a0a0a] leading-tight tracking-tight max-w-2xl mx-auto">
                        Our Simple 4-Step Process
                    </h2>
                    <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
                        A clear, proven workflow that takes your idea from concept to a live, high-performing product.
                    </p>
                </div>

                {/* Steps grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
                    {/* Dashed connector line (desktop only) */}
                    <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px">
                        <div className="w-full h-full border-t-2 border-dashed border-gray-200" />
                    </div>

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-shadow duration-300"
                        >
                            {/* Colored top accent bar */}
                            <div className={`h-1 w-full bg-gradient-to-r ${step.accent}`} />

                            <div className="p-6 pt-5 relative">
                                {/* Faded step number watermark */}
                                <span className="absolute top-2 right-4 text-[72px] font-black text-gray-100 leading-none select-none pointer-events-none">
                                    {step.number}
                                </span>

                                {/* Step badge */}
                                <span className="inline-block text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">
                                    Step {step.number}
                                </span>

                                {/* Icon circle */}
                                <div className={`relative z-10 w-12 h-12 ${step.iconBg} ${step.iconColor} rounded-xl flex items-center justify-center mb-5`}>
                                    {step.icon}
                                </div>

                                {/* Title */}
                                <h3 className="relative z-10 text-lg font-bold text-[#0a0a0a] mb-2 leading-snug">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="relative z-10 text-gray-500 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
