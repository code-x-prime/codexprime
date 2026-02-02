"use client";
import React from 'react';
import HeadText from './Head-Text';
import { FiMonitor, FiTrendingUp, FiPenTool, FiZap } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { services } from '@/data/services';

const serviceIcons: Record<string, IconType> = {
    'web-designing': FiMonitor,
    'digital-marketing': FiTrendingUp,
    'graphic-design': FiPenTool,
    'mvp-development': FiZap,
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const ServicesSection: React.FC = () => {
    return (
        <section className="py-10 md:py-20 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <HeadText
                    title="Services"
                    icon={<Lightbulb className="w-4 h-4" />}
                    icontitle="What we do"
                    description={
                        'Practical services focussed on outcomes. Clear scope, simple delivery and measurable impact.'
                    }
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {services.slice(0, 4).map((svc) => {
                        const Icon = serviceIcons[svc.id];
                        return (
                            <motion.div key={svc.id} variants={cardVariants}>
                                <Link
                                    href={`/services#${svc.id}`}
                                    className="group block bg-white p-6 border border-gray-200 hover:border-black transition-all duration-300"
                                >
                                    <motion.div
                                        whileHover={{ y: -10 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="h-full"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-14 h-14 flex items-center justify-center text-black shrink-0 border border-gray-200 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                                {Icon ? <Icon className="w-6 h-6" /> : <Lightbulb className="w-6 h-6" />}
                                            </div>

                                            <div className="flex-1">
                                                <h4 className="text-lg font-semibold text-black">{svc.title}</h4>
                                                <p className="text-sm text-gray-700 mt-1">{svc.description}</p>
                                            </div>
                                        </div>

                                        {svc.features && (
                                            <div className="mt-4 text-sm text-gray-700">
                                                <ul className="ml-4 list-disc space-y-1">
                                                    {svc.features.map((f, i) => (
                                                        <li key={i}>{f}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <div className="mt-4">
                                            <span className="text-sm font-medium text-black underline group-hover:text-black">Learn more →</span>
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesSection;