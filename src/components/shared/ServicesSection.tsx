"use client";
import React from 'react';
import { FiMonitor, FiTrendingUp, FiPenTool, FiZap, FiCheck } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { motion, Variants } from 'framer-motion';
import { services } from '@/data/services';

interface ServiceCardConfig {
    icon: IconType;
    bgFrom: string;
    bgTo: string;
    circleColor: string;
    barFrom: string;
    barTo: string;
    iconRing: string;
    iconColor: string;
    featureBadge: string;
    numColor: string;
}

const serviceConfig: Record<string, ServiceCardConfig> = {
    'web-designing': {
        icon: FiMonitor,
        bgFrom: 'from-[#EEF2FF]',
        bgTo: 'to-[#C7D2FE]',
        circleColor: 'bg-indigo-300/50',
        barFrom: 'from-blue-500',
        barTo: 'to-indigo-500',
        iconRing: 'ring-blue-100',
        iconColor: 'text-blue-600',
        featureBadge: 'bg-blue-50 text-blue-700 border-blue-100',
        numColor: 'text-indigo-900/10',
    },
    'digital-marketing': {
        icon: FiTrendingUp,
        bgFrom: 'from-[#ECFDF5]',
        bgTo: 'to-[#A7F3D0]',
        circleColor: 'bg-emerald-300/50',
        barFrom: 'from-emerald-500',
        barTo: 'to-teal-500',
        iconRing: 'ring-emerald-100',
        iconColor: 'text-emerald-600',
        featureBadge: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        numColor: 'text-emerald-900/10',
    },
    'graphic-design': {
        icon: FiPenTool,
        bgFrom: 'from-[#F5F3FF]',
        bgTo: 'to-[#DDD6FE]',
        circleColor: 'bg-violet-300/50',
        barFrom: 'from-purple-500',
        barTo: 'to-violet-500',
        iconRing: 'ring-purple-100',
        iconColor: 'text-purple-600',
        featureBadge: 'bg-purple-50 text-purple-700 border-purple-100',
        numColor: 'text-violet-900/10',
    },
    'mvp-development': {
        icon: FiZap,
        bgFrom: 'from-[#FFF7ED]',
        bgTo: 'to-[#FED7AA]',
        circleColor: 'bg-orange-300/50',
        barFrom: 'from-orange-500',
        barTo: 'to-amber-500',
        iconRing: 'ring-orange-100',
        iconColor: 'text-orange-600',
        featureBadge: 'bg-orange-50 text-orange-700 border-orange-100',
        numColor: 'text-orange-900/10',
    },
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const ServicesSection: React.FC = () => {
    return (
        <section id="services" className="section-padding">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col items-center gap-4 mb-12 md:mb-16 text-center">
                    <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 border border-gray-200 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full w-fit">
                        Services
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0a0a0a] leading-tight tracking-tight max-w-3xl mx-auto">
                        Everything You Need to{' '}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)' }}
                        >
                            Grow Online
                        </span>
                    </h2>
                    <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                        Practical services focused on outcomes — clear scope, simple delivery, and measurable impact.
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                >
                    {services.slice(0, 4).map((svc, idx) => {
                        const cfg = serviceConfig[svc.id] ?? serviceConfig['mvp-development'];
                        const Icon = cfg.icon;

                        return (
                            <motion.div
                                key={svc.id}
                                variants={cardVariants}
                                whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
                                className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-[0_20px_60px_rgba(0,0,0,0.09)] hover:border-gray-200 transition-all duration-300"
                            >
                                {/* Top gradient accent bar */}
                                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${cfg.barFrom} ${cfg.barTo}`} />

                                {/* Visual area */}
                                <div className={`relative h-52 bg-gradient-to-br ${cfg.bgFrom} ${cfg.bgTo} flex items-center justify-center overflow-hidden`}>
                                    {/* Decorative circles */}
                                    <div className={`absolute -top-8 -right-8 w-44 h-44 rounded-full ${cfg.circleColor} blur-sm`} />
                                    <div className={`absolute -bottom-8 -left-8 w-36 h-36 rounded-full ${cfg.circleColor} blur-sm`} />

                                    {/* Watermark number */}
                                    <span className={`absolute bottom-3 right-5 text-[80px] font-black leading-none select-none pointer-events-none ${cfg.numColor}`}>
                                        {idx + 1}
                                    </span>

                                    {/* Central icon */}
                                    <div className={`relative z-10 w-20 h-20 rounded-3xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.10)] ring-4 ${cfg.iconRing} flex items-center justify-center group-hover:scale-105 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all duration-400`}>
                                        <Icon className={`w-9 h-9 ${cfg.iconColor}`} />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-[#0a0a0a] mb-2 tracking-tight">
                                        {svc.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-5">
                                        {svc.description}
                                    </p>

                                    {/* Feature chips */}
                                    {svc.features && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {svc.features.map((f) => (
                                                <span
                                                    key={f}
                                                    className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${cfg.featureBadge}`}
                                                >
                                                    <FiCheck className="w-3 h-3 flex-shrink-0" />
                                                    {f}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesSection;
