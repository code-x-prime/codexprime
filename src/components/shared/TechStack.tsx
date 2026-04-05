"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    SiJavascript, SiTypescript, SiHtml5, SiCss3, SiReact, SiRedux, SiNextdotjs, SiJquery,
    SiNodedotjs, SiExpress, SiPrisma, SiMongodb, SiFirebase, SiRedis, SiGraphql, SiPostgresql, SiNginx,
    SiGit, SiGithub, SiDocker,
    SiWordpress, SiShopify, SiAmazonwebservices,
    SiLinux, SiUbuntu,
} from 'react-icons/si';
import { FiCode, FiServer, FiSettings, FiCloud, FiMonitor } from 'react-icons/fi';

interface Tech {
    name: string;
    icon: React.ReactNode;
    color: string;
}

interface Category {
    id: string;
    label: string;
    categoryIcon: React.ReactNode;
    techs: Tech[];
}

const categories: Category[] = [
    {
        id: 'frontend',
        label: 'Frontend',
        categoryIcon: <FiCode className="w-4 h-4" />,
        techs: [
            { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
            { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
            { name: 'HTML5', icon: <SiHtml5 />, color: '#E34F26' },
            { name: 'CSS3', icon: <SiCss3 />, color: '#1572B6' },
            { name: 'React.js', icon: <SiReact />, color: '#61DAFB' },
            { name: 'Redux Toolkit', icon: <SiRedux />, color: '#764ABC' },
            { name: 'Next.js', icon: <SiNextdotjs />, color: '#ffffff' },
            { name: 'jQuery', icon: <SiJquery />, color: '#0769AD' },
        ],
    },
    {
        id: 'backend',
        label: 'Backend',
        categoryIcon: <FiServer className="w-4 h-4" />,
        techs: [
            { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
            { name: 'Express.js', icon: <SiExpress />, color: '#ffffff' },
            { name: 'Prisma ORM', icon: <SiPrisma />, color: '#2D3748' },
            { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
            { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
            { name: 'Redis', icon: <SiRedis />, color: '#DC382D' },
            { name: 'GraphQL', icon: <SiGraphql />, color: '#E535AB' },
            { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1' },
            { name: 'Nginx', icon: <SiNginx />, color: '#009639' },
        ],
    },
    {
        id: 'devops',
        label: 'DevOps & Version Control',
        categoryIcon: <FiSettings className="w-4 h-4" />,
        techs: [
            { name: 'Git', icon: <SiGit />, color: '#F05032' },
            { name: 'GitHub', icon: <SiGithub />, color: '#ffffff' },
            { name: 'Docker', icon: <SiDocker />, color: '#2496ED' },
        ],
    },
    {
        id: 'cms',
        label: 'CMS & Cloud',
        categoryIcon: <FiCloud className="w-4 h-4" />,
        techs: [
            { name: 'WordPress', icon: <SiWordpress />, color: '#21759B' },
            { name: 'Shopify', icon: <SiShopify />, color: '#96BF48' },
            { name: 'AWS', icon: <SiAmazonwebservices />, color: '#FF9900' },
        ],
    },
    {
        id: 'os',
        label: 'Operating Systems',
        categoryIcon: <FiMonitor className="w-4 h-4" />,
        techs: [
            { name: 'Linux', icon: <SiLinux />, color: '#FCC624' },
            { name: 'Ubuntu', icon: <SiUbuntu />, color: '#E95420' },
        ],
    },
];

const TechItem = ({ tech }: { tech: Tech }) => (
    <motion.div
        whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
        className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl px-3.5 py-2.5 cursor-default transition-colors duration-200"
    >
        <span className="text-lg flex-shrink-0" style={{ color: tech.color }}>{tech.icon}</span>
        <span className="text-sm font-medium text-white/85 whitespace-nowrap">{tech.name}</span>
    </motion.div>
);

const TechStack = () => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const visibleCategories = activeCategory
        ? categories.filter(c => c.id === activeCategory)
        : categories;

    return (
        <section className="bg-[#0a0a0a] relative overflow-hidden py-20 md:py-28 px-4 sm:px-6">
            {/* Subtle top gradient glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-40 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
            />
            {/* Grain overlay */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px 200px',
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/70 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 inline-block" />
                        Tech Stack
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4">
                        Powered by{' '}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: 'linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #38bdf8 100%)' }}
                        >
                            Modern Technologies
                        </span>
                    </h2>
                    <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                        We use the latest tools and frameworks to build scalable, secure, and high-performance solutions.
                    </p>
                </motion.div>

                {/* Category filter pills */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-wrap items-center justify-center gap-2 mb-12"
                >
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                            activeCategory === null
                                ? 'bg-white text-[#0a0a0a]'
                                : 'bg-white/10 text-white/60 hover:bg-white/15 hover:text-white/80'
                        }`}
                    >
                        All
                    </button>
                    {categories.map(c => (
                        <button
                            key={c.id}
                            onClick={() => setActiveCategory(activeCategory === c.id ? null : c.id)}
                            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                                activeCategory === c.id
                                    ? 'bg-white text-[#0a0a0a]'
                                    : 'bg-white/10 text-white/60 hover:bg-white/15 hover:text-white/80'
                            }`}
                        >
                            {c.categoryIcon}
                            {c.label}
                        </button>
                    ))}
                </motion.div>

                {/* Category grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {visibleCategories.map((cat, i) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className={`bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] transition-colors duration-300 ${
                                cat.id === 'frontend' ? 'md:row-span-1' : ''
                            }`}
                        >
                            {/* Category header */}
                            <div className="flex items-center gap-2.5 mb-5">
                                <div className="w-7 h-7 rounded-lg bg-white/10 text-white/70 flex items-center justify-center flex-shrink-0">
                                    {cat.categoryIcon}
                                </div>
                                <h3 className="text-white font-bold text-base">{cat.label}</h3>
                                <span className="ml-auto text-white/30 text-xs">{cat.techs.length} tools</span>
                            </div>

                            {/* Tech items */}
                            <div className="flex flex-wrap gap-2">
                                {cat.techs.map((tech) => (
                                    <TechItem key={tech.name} tech={tech} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
