import React from 'react'
import HeadText from '@/components/shared/Head-Text'
import ContactSection from '@/components/shared/ContactSection'

export const metadata = {
    title: 'Blog | CodeXprime',
}

const posts = [
    { title: 'Designing for Conversion', date: '2024-08-01', excerpt: 'Small design changes that improve conversion and reduce friction.' },
    { title: 'MVP Checklist for Founders', date: '2024-05-12', excerpt: 'A practical checklist to validate your idea without building everything.' },
    { title: 'Choosing the Right Tech Stack', date: '2023-11-20', excerpt: 'How we pick tools that balance speed, cost and maintainability.' },
]

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-white py-16">
            <div className="max-w-6xl mx-auto px-6">
                <HeadText
                    title="Insights & articles"
                    icon={<></>}
                    icontitle="BLOG"
                    description="Short, useful articles about product design, development and growth."
                />

                <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((p, i) => (
                        <article key={i} className="border rounded p-6 bg-gray-50">
                            <h4 className="font-semibold text-lg">{p.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">{p.date}</p>
                            <p className="mt-3 text-gray-700 text-sm">{p.excerpt}</p>
                            <div className="mt-4">
                                <a className="text-sm text-black font-medium" href="#">Read more →</a>
                            </div>
                        </article>
                    ))}
                </section>

                <ContactSection />
            </div>
        </main>
    )
}
