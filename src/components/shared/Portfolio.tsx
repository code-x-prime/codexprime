"use client";

import React from 'react';
import { ExternalLink, Globe } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import HeadText from './Head-Text';

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
        title: "Shrestha Academy",
        category: "EdTech Platform",
        description:
            "A complete MERN stack education platform offering online courses, e-books, progress indicators, and offline classroom management for students.",
        image:
            "https://pub-a3d2b35862c1483894ffbee942bb995e.r2.dev/shreeshta.jpeg",
        tags: [
            "Next.js",
            "React",
            "Node.js",
            "Express",
            "PostgreSQL",
            "MERN Stack",
        ],
        results: "Centralized learning with online & offline course management",
        link: "https://shresthaacademy.com/",
    },
    {
        title: "Monark FX",
        category: "Financial Services",
        description:
            "A modern financial services platform with integrated payment systems and live Zoom sessions for trading consultations and financial education.",
        image:
            "https://pub-a3d2b35862c1483894ffbee942bb995e.r2.dev/monark.jpeg",
        tags: [
            "Next.js",
            "React",
            "Node.js",
            "PostgreSQL",
            "Razorpay",
            "Zoom SDK",
        ],
        results: "Streamlined payments and live trading sessions",
        link: "https://monarkfx.com",
    },
    {
        title: "Nifty Nitesh",
        category: "Stock Market Platform",
        description:
            "A stock market education platform providing practical trading knowledge, tools, and resources for investors and traders.",
        image:
            "https://pub-a3d2b35862c1483894ffbee942bb995e.r2.dev/nifty.jpeg",
        tags: ["Next.js", "React", "Cloudinary", "Google Sheets"],
        results: "Improved learning experience and data handling",
        link: "https://niftynitesh.com",
    },
    {
        title: "EDAWS",
        category: "NGO Platform",
        description:
            "A donation and campaign management platform for NGOs to increase transparency, donor trust, and online contributions.",
        image:
            "https://pub-a3d2b35862c1483894ffbee942bb995e.r2.dev/edaws.jpeg",
        tags: ["Next.js", "React", "Prisma", "Razorpay", "Tailwind CSS"],
        results: "Boosted NGO donations and campaign tracking",
        link: "https://www.edaws.in",
    },
    {
        title: "DFIX Kart",
        category: "E-commerce Platform",
        description:
            "A full-scale tape-selling e-commerce platform with a Next.js client, React (Vite) admin panel, and Node.js backend using PostgreSQL.",
        image:
            "https://pub-a3d2b35862c1483894ffbee942bb995e.r2.dev/difx.jpeg",
        tags: [
            "Next.js 14",
            "React (Vite)",
            "Node.js",
            "PostgreSQL",
            "E-commerce",
        ],
        results: "Scalable multi-panel e-commerce system",
        link: "https://dfixkart.com/",
    },
    {
        title: "Panacea Medcare",
        category: "Healthcare Website",
        description:
            "A multilingual doctor and healthcare website built with Next.js, supporting English, French, and Arabic for a global audience.",
        image:
            "https://pub-a3d2b35862c1483894ffbee942bb995e.r2.dev/panacea.jpeg",
        tags: ["Next.js", "Internationalization (i18n)", "Healthcare"],
        results: "Expanded reach with multilingual support",
        link: "https://panaceamedcare.com/",
    },
];



const Portfolio: React.FC<PortfolioProps> = ({ limit }) => {
    const router = useRouter();
    const visibleProjects = limit ? projects.slice(0, limit) : projects;

    const handleCardClick = (title: string) => {
        const project = projects.find((p) => p.title === title);
        if (!project?.link) return;
        window.open(project.link, '_blank');
    };

    return (
        <section className="py-16 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <HeadText
                    icon={<Globe className="w-4 h-4" />}
                    icontitle="OUR WORK"
                    title="Success Stories That Inspire"
                    description="Real projects, real results. See how we’ve helped businesses transform their digital presence."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleProjects.map((project, index) => (
                        <div
                            key={index}
                            role={project.link ? "button" : undefined}
                            tabIndex={project.link ? 0 : -1}
                            onClick={project.link ? () => handleCardClick(project.title) : undefined}
                            onKeyDown={(e) => {
                                if ((e.key === 'Enter' || e.key === ' ') && project.link) {
                                    handleCardClick(project.title);
                                }
                            }}
                            className={`border border-gray-300 hover:border-gray-400 transition-all duration-300 ${project.link
                                ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00C49A]'
                                : 'cursor-default'
                                }`}
                        >
                            <div className="relative overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-48 object-cover"
                                    width={500}
                                    height={300}
                                />
                                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-sm">
                                    {project.category}
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                                <p className="text-gray-600 mb-3 text-sm">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-3">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="bg-gray-100 text-gray-700 px-2 py-1 text-xs"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-[#00C49A]">
                                        ✓ {project.results}
                                    </span>

                                    {project.link ? (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCardClick(project.title);
                                            }}
                                            className="flex items-center gap-1 text-black hover:gap-2 transition-all whitespace-nowrap"
                                            type="button"
                                        >
                                            View <ExternalLink className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <span className="text-sm text-gray-400 italic"></span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {limit && projects.length > limit && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => router.push('/portfolio')}
                            className="bg-black text-white px-8 py-4 font-medium hover:bg-gray-800 transition-colors"
                        >
                            View All Projects
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Portfolio;
