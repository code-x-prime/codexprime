"use client"
import { useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'

type FaqItem = {
    question: string
    answer: string
}

type FaqProps = {
    limit?: number
}

const DEFAULT_FAQS: FaqItem[] = [
    {
        question: 'What IT services does CodeXprime offer?',
        answer: 'CodeXprime provides web design, web development, digital marketing, MVP development, and graphic design services for businesses of all sizes.'
    },
    {
        question: 'How can professional web design improve my business website?',
        answer: 'Professional design improves user experience, increases traffic, and boosts conversion rates by making your site clear, fast, and easy to use.'
    },
    {
        question: 'Which modern technologies does CodeXprime use for web development in Delhi?',
        answer: 'We use JavaScript, TypeScript, ReactJS, Node.js, Express, and modern frameworks like Remix and TanStack for building scalable websites.'
    },
    {
        question: 'What is MVP development and why is it important?',
        answer: 'An MVP (Minimum Viable Product) helps startups validate ideas quickly, collect user feedback, and reduce risk before investing in a full product.'
    },
    {
        question: 'Do you provide paid-ads management (Google/Meta)?',
        answer: 'Yes — we plan and manage Google Ads and Meta Ads campaigns to maximize ROI and reach the right customers for your business.'
    },
    {
        question: 'Can CodeXprime build applications using GraphQL, Prisma ORM, and Redux Toolkit?',
        answer: 'Yes, we develop modern apps using GraphQL APIs, Prisma ORM for databases, and Redux Toolkit for state management.'
    },
    {
        question: 'What does CodeXprime’s digital marketing cover?',
        answer: 'Our services include SEO, social media marketing, content, and PPC to increase visibility and drive qualified traffic.'
    },
    {
        question: 'How long does it take to design and build a typical website?',
        answer: 'Most websites take around 3–6 weeks depending on complexity. Timelines are provided during project scoping.'
    },
    {
        question: 'Are your graphic design services suitable for startups?',
        answer: 'Yes, we create logos, brochures, and social media creatives that help startups build a strong brand identity.'
    },
    {
        question: 'How do you make websites SEO-friendly?',
        answer: 'We follow mobile-first design, optimize loading performance, apply structured data, and develop content strategies for better search visibility.'
    },
    {
        question: 'Can you redesign my existing website?',
        answer: 'Absolutely — we modernize designs, improve performance, and implement SEO best practices to refresh existing sites.'
    },
    {
        question: 'Do you offer cloud-based solutions with AWS and Firebase in Dwarka?',
        answer: 'Absolutely! We deploy applications on AWS, Firebase, and Docker for high performance and scalability.'
    },
    {
        question: 'What industries do you work with?',
        answer: 'We work with retail, healthcare, education, real estate, startups, and many small/medium businesses.'
    },
    {
        question: 'How do you measure marketing success?',
        answer: 'We track KPIs like traffic, leads, conversions, and ROI and provide transparent reporting so you can see progress.'
    },
    {
        question: 'Do you offer ongoing maintenance?',
        answer: 'Yes, we provide website maintenance, updates, backups, and security checks as ongoing services.'
    },
    {
        question: 'Can you help with branding and creatives?',
        answer: 'Yes — our team delivers branding packages including logos, style guides, and marketing creatives.'
    },
    {
        question: 'How much does a website cost?',
        answer: 'Costs depend on features and complexity. We offer tailored quotes and packages to fit different budgets.'
    },
    {
        question: 'How do I start a project?',
        answer: 'Contact us via phone, email, or the website to request a free consultation and project planning session.'
    }, {
        question: 'Which databases do you support for web development in Delhi?',
        answer: 'We work with MongoDB, PostgreSQL, and Redis to build secure and reliable backend systems. '
    }, {
        question: 'Does CodeXprime use DevOps tools like GitHub Actions, Nginx, and Docker?',
        answer: 'Yes, we use GitHub Actions for CI/CD, Docker for containerization, and Nginx for optimized server performance.'
    }, {
        question: 'Is WordPress development also available for businesses in Uttam Nagar?',
        answer: 'Yes, apart from advanced stacks, we also provide WordPress development for businesses in Uttam Nagar and Delhi.'
    }
]

const Faq: React.FC<FaqProps> = ({ limit }) => {
    const [showAll] = useState(false)
    const router = useRouter()

    const faqs = useMemo(() => DEFAULT_FAQS, [])

    const hasLimit = typeof limit === 'number' && limit > 0
    const initialCount = hasLimit ? Math.min(limit!, faqs.length) : faqs.length

    const visibleFaqs = showAll ? faqs : faqs.slice(0, initialCount)

    const shouldShowButton = hasLimit && limit! < faqs.length && !showAll

    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>

            <div className="space-y-4">
                {visibleFaqs.map((f, idx) => (
                    <div key={idx} className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
                        <button
                            type="button"
                            className="text-left w-full"
                        // Keep it a simple toggle-less list for now; clicking question won't collapse — answers are visible
                        >
                            <p className="font-semibold text-gray-900">{f.question}</p>
                            <p className="mt-2 text-gray-700">{f.answer}</p>
                        </button>
                    </div>
                ))}
            </div>

            {shouldShowButton && (
                <div className="mt-6 text-center">
                    <button
                        onClick={() => router.push('/faqs')}
                        className="inline-block bg-black text-white px-6 py-3  hover:bg-gray-900 transition"
                        aria-label="View all FAQs"
                    >
                        View all FAQs
                    </button>
                </div>
            )}
        </section>
    )
}

export default Faq
