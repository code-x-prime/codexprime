import React from 'react';
import HeadText from './Head-Text';
import { FiMonitor, FiTrendingUp, FiPenTool, FiZap } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { Lightbulb } from 'lucide-react';
import Link from 'next/link';

export const services: Array<{
    id: string;
    title: string;
    description: string;
    features?: string[];
    Icon?: IconType;
}> = [
        {
            id: 'web-designing',
            title: 'Web Designing',
            description: 'Clean, conversion-focused website design optimized for clarity and usability.',
            features: ["Advanced Techniques", 'Database Design', 'API Integration', 'Performance Optimization'],
            Icon: FiMonitor,
        },
        {
            id: 'digital-marketing',
            title: 'Digital Marketing',
            description: 'Strategies to grow visibility and attract qualified leads with measurable campaigns.',
            features: ['SEO & Technical SEO', 'Social Media', 'Paid Ads (Google, Meta)', 'Content Strategy'],
            Icon: FiTrendingUp,
        },
        {
            id: 'graphic-design',
            title: 'Graphic Design',
            description: 'Brand and visual design that communicates clearly across web and print.',
            features: ['Logo & Identity', 'Brand Guidelines', 'Print & Digital Assets', 'UI/UX Design'],
            Icon: FiPenTool,
        },
        {
            id: 'mvp-development',
            title: 'MVP Development',
            description: 'Rapid delivery of core product experiences to validate ideas and learn quickly.',
            features: ['Rapid Prototyping', 'Core Feature Focus', 'User Testing', 'Iterative Releases'],
            Icon: FiZap,
        },
    ];

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

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.slice(0, 4).map((svc) => {
                        const Icon = svc.Icon;
                        return (
                            <Link
                                key={svc.id}
                                href={`/services#${svc.id}`}
                                className="group block bg-white p-6 border border-gray-200 hover:border-black transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 flex items-center justify-center text-black shrink-0 border border-gray-200">
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
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;