import React from 'react'
import ContactSection from '@/components/shared/ContactSection'
import ServicesSection, { services } from '@/components/shared/ServicesSection'
import Link from 'next/link'

export const metadata = {
    title: 'Services | CodeXprime',
}

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-white pb-10">
            <div className="max-w-7xl mx-auto px-6">


                <ServicesSection />

                <div className="mt-12 space-y-12">
                    {services.map((s) => (
                        <section key={s.id} id={s.id} className="md:grid md:grid-cols-3 gap-8 items-start">
                            <div className="md:col-span-2 prose prose-lg text-gray-700">
                                <h3 className="text-2xl font-semibold text-gray-900">{s.title}</h3>
                                <p className="mt-2">{s.description}</p>

                                <h4 className="mt-4 font-medium">What we deliver</h4>
                                <ul className="list-disc list-inside mt-2 text-gray-700">
                                    {(s.features || []).map((f, i) => (
                                        <li key={i}>{f}</li>
                                    ))}
                                </ul>

                                <div className="mt-6">
                                    <Link href="/contact" className="inline-block bg-black text-white px-4 py-2 shadow">Talk to us about {s.title}</Link>
                                </div>
                            </div>

                        </section>
                    ))}
                </div>

                {/* Shared Process section (single instance) */}
                <section className="mt-12">
                    <h3 className="text-2xl font-semibold text-gray-900">Our Process</h3>
                    <p className="text-gray-700 mt-2">Discovery → Scope → Design → Build → Test → Launch. We adapt the process to the project scale and client&apos;s priorities. For most projects we run short, focused sprints with regular demos so you always know progress and priorities.</p>
                </section>

                <section className="mt-12">
                    <h3 className="text-xl font-semibold">How we price</h3>
                    <p className="text-gray-700 mt-2">We provide fixed-price estimates for well-scoped projects and time & materials for ongoing work. Every project starts with a discovery to clarify the scope and reduce surprises.</p>
                </section>

                <ContactSection />
            </div>
        </main>
    )
}
