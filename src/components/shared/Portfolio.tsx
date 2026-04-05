"use client";

import React from 'react';
import { ExternalLink, Globe } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import HeadText from './Head-Text';
import { motion } from 'framer-motion';

type Project = {
    title: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
    results: string;
    link?: string;
};

interface PortfolioProps {
    limit?: number;
}

const projects: Project[] = [
    {
        title: 'Shrestha Academy',
        category: 'EdTech Platform',
        description: 'A complete MERN stack education platform offering online courses, e-books, progress indicators, and offline classroom management for students.',
        image: 'https://pub-a3d2b35862c1483894ffbee942bb995e.r2.dev/shreeshta.jpeg',
        tags: ['Next.js', 'React', 'Node.js', 'Express', 'PostgreSQL'],
        results: 'Centralized learning with online & offline course management',
        link: 'https://shresthaacademy.com/',
    },
    {
        title: 'Monark FX',
        category: 'Financial Services',
        description: 'A modern financial services platform with integrated payment systems and live Zoom sessions for trading consultations and financial education.',
        image: 'https://pub-a3d2b35862c1483894ffbee942bb995e.r2.dev/monark.jpeg',
        tags: ['Next.js', 'React', 'PostgreSQL', 'Razorpay', 'Zoom SDK'],
        results: 'Streamlined payments and live trading sessions',
        link: 'https://monarkfx.com',
    },
    {
        title: 'Nifty Nitesh',
        category: 'Stock Market Platform',
        description: 'A stock market education platform providing practical trading knowledge, tools, and resources for investors and traders.',
        image: 'https://pub-a3d2b35862c1483894ffbee942bb995e.r2.dev/nifty.jpeg',
        tags: ['Next.js', 'React', 'Cloudinary', 'Google Sheets'],
        results: 'Improved learning experience and data handling',
        link: 'https://niftynitesh.com',
    },
    {
        title: 'EDAWS',
        category: 'NGO Platform',
        description: 'A donation and campaign management platform for NGOs to increase transparency, donor trust, and online contributions.',
        image: 'https://pub-a3d2b35862c1483894ffbee942bb995e.r2.dev/edaws.jpeg',
        tags: ['Next.js', 'React', 'Prisma', 'Razorpay', 'Tailwind CSS'],
        results: 'Boosted NGO donations and campaign tracking',
        link: 'https://www.edaws.in',
    },
    {
        title: 'DFIX Kart',
        category: 'E-commerce Platform',
        description: 'A full-scale e-commerce platform with a Next.js client, React admin panel, and Node.js backend using PostgreSQL.',
        image: 'https://pub-a3d2b35862c1483894ffbee942bb995e.r2.dev/difx.jpeg',
        tags: ['Next.js 14', 'React (Vite)', 'Node.js', 'PostgreSQL'],
        results: 'Scalable multi-panel e-commerce system',
        link: 'https://dfixkart.com/',
    },
    {
        title: 'Panacea Medcare',
        category: 'Healthcare Website',
        description: 'A multilingual doctor and healthcare website built with Next.js, supporting English, French, and Arabic for a global audience.',
        image: 'https://pub-a3d2b35862c1483894ffbee942bb995e.r2.dev/panacea.jpeg',
        tags: ['Next.js', 'i18n', 'Healthcare'],
        results: 'Expanded reach with multilingual support',
        link: 'https://panaceamedcare.com/',
    },
];

const Portfolio: React.FC<PortfolioProps> = ({ limit }) => {
    const router = useRouter();
    const visibleProjects = limit ? projects.slice(0, limit) : projects;

    return (
        <section id="portfolio" className="section-padding">
            <div className="max-w-6xl mx-auto">
                <HeadText
                    icon={<Globe className="w-3.5 h-3.5" />}
                    icontitle="Our Work"
                    title="Turning Visions into Digital Reality"
                    description="Real projects, real results — see how we've helped businesses transform their digital presence."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {visibleProjects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: 'easeOut' }}
                            className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden card-hover cursor-pointer"
                            onClick={() => project.link && window.open(project.link, '_blank')}
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden h-52">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    width={500}
                                    height={300}
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="flex items-center gap-2 text-white font-semibold text-sm border border-white/40 px-5 py-2.5 rounded-full backdrop-blur-sm">
                                        View Project <ExternalLink size={14} />
                                    </span>
                                </div>
                                {/* Category badge */}
                                <div className="absolute top-3 left-3 bg-black/80 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                                    {project.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-[#0a0a0a] mb-1.5">{project.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>

                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {project.tags.slice(0, 4).map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                                    {project.results}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {limit && projects.length > limit && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => router.push('/portfolio')}
                            className="inline-flex items-center gap-2 border border-gray-300 text-[#0a0a0a] px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                        >
                            View All Projects →
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Portfolio;
