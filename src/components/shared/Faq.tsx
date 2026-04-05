"use client";
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiArrowRight } from 'react-icons/fi';

type FaqItem = { question: string; answer: string };
type FaqProps = { limit?: number };

const DEFAULT_FAQS: FaqItem[] = [
    {
        question: 'What IT services does CodeXprime offer?',
        answer: 'CodeXprime provides web design, web development, digital marketing, MVP development, and graphic design services for businesses of all sizes.',
    },
    {
        question: 'How can professional web design improve my business website?',
        answer: 'Professional design improves user experience, increases traffic, and boosts conversion rates by making your site clear, fast, and easy to use.',
    },
    {
        question: 'Which modern technologies does CodeXprime use for web development?',
        answer: 'We use JavaScript, TypeScript, ReactJS, Node.js, Express, and modern frameworks like Remix and TanStack for building scalable websites.',
    },
    {
        question: 'What is MVP development and why is it important?',
        answer: 'An MVP (Minimum Viable Product) helps startups validate ideas quickly, collect user feedback, and reduce risk before investing in a full product.',
    },
    {
        question: 'Do you provide paid-ads management (Google/Meta)?',
        answer: 'Yes — we plan and manage Google Ads and Meta Ads campaigns to maximize ROI and reach the right customers for your business.',
    },
    {
        question: 'What does CodeXprime digital marketing cover?',
        answer: 'Our services include SEO, social media marketing, content, and PPC to increase visibility and drive qualified traffic.',
    },
    {
        question: 'How long does it take to design and build a typical website?',
        answer: 'Most websites take around 3–6 weeks depending on complexity. Timelines are provided during project scoping.',
    },
    {
        question: 'Are your graphic design services suitable for startups?',
        answer: 'Yes, we create logos, brochures, and social media creatives that help startups build a strong brand identity.',
    },
    {
        question: 'How do you make websites SEO-friendly?',
        answer: 'We follow mobile-first design, optimize loading performance, apply structured data, and develop content strategies for better search visibility.',
    },
    {
        question: 'Can you redesign my existing website?',
        answer: 'Absolutely — we modernize designs, improve performance, and implement SEO best practices to refresh existing sites.',
    },
    {
        question: 'Do you offer cloud-based solutions with AWS and Firebase?',
        answer: 'Yes! We deploy applications on AWS, Firebase, and Docker for high performance and scalability.',
    },
    {
        question: 'What industries do you work with?',
        answer: 'We work with retail, healthcare, education, real estate, startups, and many small/medium businesses.',
    },
    {
        question: 'How much does a website cost?',
        answer: 'Costs depend on features and complexity. We offer tailored quotes and packages to fit different budgets.',
    },
    {
        question: 'How do I start a project?',
        answer: 'Contact us via phone, email, or the website to request a free consultation and project planning session.',
    },
];

const FaqItem = ({
    item,
    index,
    isOpen,
    onToggle,
}: {
    item: FaqItem;
    index: number;
    isOpen: boolean;
    onToggle: () => void;
}) => (
    <div
        className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
            isOpen
                ? 'border-blue-200 bg-blue-50/40 shadow-sm'
                : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50/50'
        }`}
    >
        <button
            type="button"
            onClick={onToggle}
            className="w-full text-left flex items-center gap-4 px-5 py-4 focus:outline-none"
            aria-expanded={isOpen}
        >
            {/* Number badge */}
            <span
                className={`flex-shrink-0 w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-colors duration-200 ${
                    isOpen ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'
                }`}
            >
                {String(index + 1).padStart(2, '0')}
            </span>

            <span className={`flex-1 text-sm sm:text-base font-semibold leading-snug transition-colors duration-200 ${
                isOpen ? 'text-blue-700' : 'text-[#0a0a0a]'
            }`}>
                {item.question}
            </span>

            <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className={`flex-shrink-0 transition-colors duration-200 ${isOpen ? 'text-blue-500' : 'text-gray-400'}`}
            >
                <FiChevronDown className="w-4 h-4" />
            </motion.span>
        </button>

        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="overflow-hidden"
                >
                    <p className="text-gray-600 text-sm leading-relaxed px-5 pb-5 pl-16">
                        {item.answer}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const Faq: React.FC<FaqProps> = ({ limit }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const router = useRouter();

    const faqs = useMemo(() => DEFAULT_FAQS, []);
    const hasLimit = typeof limit === 'number' && limit > 0;
    const visibleFaqs = hasLimit ? faqs.slice(0, limit) : faqs;
    const shouldShowButton = hasLimit && limit! < faqs.length;

    return (
        <section id="faq" className="section-padding">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

                    {/* ── Left: sticky heading ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="lg:col-span-2 lg:sticky lg:top-28"
                    >
                        {/* Badge */}
                        <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
                            FAQ
                        </span>

                        <h2 className="text-3xl sm:text-4xl font-black text-[#0a0a0a] leading-tight tracking-tight mb-4">
                            Frequently Asked{' '}
                            <span
                                className="bg-clip-text text-transparent"
                                style={{ backgroundImage: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
                            >
                                Questions
                            </span>
                        </h2>
                        <p className="text-gray-500 text-base leading-relaxed mb-8">
                            Can&apos;t find what you&apos;re looking for? We&apos;re happy to help.
                        </p>

                        {/* Stats */}
                        <div className="flex gap-6 mb-8">
                            <div>
                                <div className="text-2xl font-black text-[#0a0a0a]">{faqs.length}+</div>
                                <div className="text-xs text-gray-400 mt-0.5">Questions answered</div>
                            </div>
                            <div className="w-px bg-gray-100" />
                            <div>
                                <div className="text-2xl font-black text-[#0a0a0a]">24h</div>
                                <div className="text-xs text-gray-400 mt-0.5">Response time</div>
                            </div>
                        </div>

                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 transition-all duration-200 group shadow-sm"
                        >
                            Ask a Question
                            <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                    </motion.div>

                    {/* ── Right: accordion ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                        className="lg:col-span-3 flex flex-col gap-2.5"
                    >
                        {visibleFaqs.map((f, idx) => (
                            <FaqItem
                                key={idx}
                                item={f}
                                index={idx}
                                isOpen={openIndex === idx}
                                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                            />
                        ))}
                    </motion.div>
                </div>

                {shouldShowButton && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => router.push('/faqs')}
                            className="inline-flex items-center gap-2 border border-gray-200 text-[#0a0a0a] px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                        >
                            View All FAQs <FiArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Faq;
