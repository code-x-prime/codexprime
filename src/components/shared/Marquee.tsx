"use client";

import React from 'react';
import {
    SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs,
    SiMongodb, SiPostgresql, SiDocker, SiFirebase, SiRedis,
    SiGraphql, SiWordpress, SiShopify, SiAmazonwebservices, SiGit,
    SiPrisma, SiExpress, SiHtml5, SiCss3, SiGithub,
} from 'react-icons/si';

interface TechItem {
    name: string;
    icon: React.ReactNode;
    color: string;
}

const row1: TechItem[] = [
    { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
    { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
    { name: 'React.js', icon: <SiReact />, color: '#61DAFB' },
    { name: 'Next.js', icon: <SiNextdotjs />, color: '#000000' },
    { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
    { name: 'Express.js', icon: <SiExpress />, color: '#404040' },
    { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
    { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1' },
    { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
    { name: 'Docker', icon: <SiDocker />, color: '#2496ED' },
];

const row2: TechItem[] = [
    { name: 'Redis', icon: <SiRedis />, color: '#DC382D' },
    { name: 'GraphQL', icon: <SiGraphql />, color: '#E535AB' },
    { name: 'Prisma', icon: <SiPrisma />, color: '#5A67D8' },
    { name: 'AWS', icon: <SiAmazonwebservices />, color: '#FF9900' },
    { name: 'WordPress', icon: <SiWordpress />, color: '#21759B' },
    { name: 'Shopify', icon: <SiShopify />, color: '#96BF48' },
    { name: 'Git', icon: <SiGit />, color: '#F05032' },
    { name: 'GitHub', icon: <SiGithub />, color: '#333333' },
    { name: 'HTML5', icon: <SiHtml5 />, color: '#E34F26' },
    { name: 'CSS3', icon: <SiCss3 />, color: '#1572B6' },
];

const MarqueeRow = ({ items, reverse = false }: { items: TechItem[]; reverse?: boolean }) => {
    const doubled = [...items, ...items];
    return (
        <div className="relative flex items-center overflow-hidden py-2">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className={`flex items-center whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
                {doubled.map((tech, i) => (
                    <div
                        key={i}
                        className="inline-flex items-center gap-2.5 mx-5 select-none bg-gray-50/80 border border-gray-100 rounded-xl px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                        <span
                            className="text-xl flex-shrink-0"
                            style={{ color: tech.color === '#000000' || tech.color === '#333333' || tech.color === '#404040' ? '#374151' : tech.color }}
                        >
                            {tech.icon}
                        </span>
                        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                            {tech.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Marquee = () => {
    return (
        <section className="py-8 bg-white/70 backdrop-blur-sm border-y border-gray-100 overflow-hidden">
            <MarqueeRow items={row1} reverse={false} />
            <div className="py-1" />
            <MarqueeRow items={row2} reverse={true} />
        </section>
    );
};

export default Marquee;
