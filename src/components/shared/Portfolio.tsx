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
        title: "Monark FX",
        category: "Financial Services",
        description:
            "A modern financial services platform that integrates seamless payment systems and live Zoom sessions for an enhanced user experience in trading and consultations.",
        image: "https://g0p7auwucr.ufs.sh/f/ULWZqXBivs80g1M2zj90TDwQ1qFAjO9JoI2uaLHf4ZBU8vPk",
        tags: ["React", "NextJS", "NodeJS", "PostgreSQL", "Razorpay", "Zoom SDK", "CI/CD (GitHub Actions)"],
        results: "Streamlined payment and live session features",
        link: "https://monarkfx.com",
    },
    {
        title: "EDAWS",
        category: "NGO Platform",
        description:
            "An intuitive donation platform crafted for NGOs, enabling smooth online contributions and campaign tracking to boost transparency and donor trust.",
        image: "https://utfs.io/f/1e42b816-777d-4944-8aa3-dfc8b3c2991a-qmpdsf.jpg",
        tags: ["Next.js", "Tailwind CSS", "React", "Prisma", "Razorpay"],
        results: "Increased donations for NGOs",
        link: "https://www.edaws.in",
    },
    {
        title: "Nifty Nitesh",
        category: "Stock Market Platform",
        description:
            "A comprehensive stock market education and trading platform offering both online and offline resources for traders and investors to stay ahead.",
        image: "https://g0p7auwucr.ufs.sh/f/ULWZqXBivs80Mb0Qz3TSLB512YwCRDUN9ynZh8mf0v6akAK4",
        tags: ["Next.js", "React", "Google Sheet (DB)", "Cloudinary"],
        results: "Improved data management and performance",
        link: "https://niftynitesh.com",
    },
    {
        title: "TRX SOL",
        category: "Stock Market Platform",
        description:
            "TRX SOL bridges offline and online stock trading with smart communication tools, making financial insights more accessible to all users.",
        image: "https://g0p7auwucr.ufs.sh/f/ULWZqXBivs806BjgsRFSjeMkAxVIgZocBUl7f23DdOuvHqNn",
        tags: ["Next.js", "React", "Brevo", "Nodemailer"],
        results: "Optimized client communication",
        link: "https://trxsol.com",
    },
    {
        title: "Equity Tank",
        category: "Stock Market Platform",
        description:
            "An engaging and user-friendly stock trading platform focused on simplifying investments with real-time tools and visually rich dashboards.",
        image: "https://utfs.io/f/add4e9aa-851e-48f6-bb30-e8c8a0b564cd-iyt33x.jpg",
        tags: ["React", "NextJS", "TailwindCSS", "Framer Motion"],
        results: "Improved user engagement and performance",
        link: "https://equitytank.com",
    },
    {
        title: "EOAN",
        category: "E-commerce",
        description:
            "A beautifully designed online furniture store showcasing an extensive range of high-quality products with optimized shopping experience.",
        image: "https://utfs.io/f/0cb7d590-e0d1-4ce8-8807-7db34d50d1be-da5jf4.jpg",
        tags: ["WordPress", "Elementor", "PHP", "CSS", "HTML", "WooCommerce", "JavaScript", "Theme Customization"],
        results: "Boosted online sales and traffic",
        link: "https://eoan.in",
    },
    {
        title: "TRX Academy",
        category: "Stock Market Platform",
        description:
            "A dedicated learning hub for stock market education offering live sessions, tutorials, and offline classes for beginner to advanced traders.",
        image: "https://g0p7auwucr.ufs.sh/f/ULWZqXBivs80DwIeWWmEwLedJguv0UbtiA6GHWYay4nfP9BK",
        tags: ["React", "NextJS", "NodeJS", "PostgreSQL", "Razorpay", "Zoom SDK", "CI/CD (GitHub Actions)"],
        results: "Enhanced user trading experience",
    },
    {
        title: "Sharma Fitness",
        category: "E-commerce",
        description:
            "An e-commerce platform for gym equipment and accessories, designed for smooth shopping and mobile-first performance across devices.",
        image: "https://utfs.io/f/0d43ad81-130f-481f-9567-37e491bff626-hswoyi.jpg",
        tags: ["WordPress", "Elementor", "PHP", "CSS", "HTML", "WooCommerce", "JavaScript", "Theme Customization"],
        results: "Increased sales in gym equipment",
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
