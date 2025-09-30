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

                                <h4 className="mt-4 font-medium">Process</h4>
                                <p className="text-gray-700">Discovery → Scope → Design → Build → Test → Launch. We adapt the process to the project scale and client&apos;s priorities.</p>

                                <div className="mt-6">
                                    <Link href="/contact" className="inline-block bg-black text-white px-4 py-2 shadow">Talk to us about {s.title}</Link>
                                </div>
                            </div>

                            <aside className="mt-6 md:mt-0 md:col-span-1">
                                <div className="p-6 border rounded bg-gray-50">
                                    <h5 className="font-semibold">Quick facts</h5>
                                    <p className="text-sm text-gray-700 mt-2">Typical engagement: 4-12 weeks depending on scope.</p>
                                    <p className="text-sm text-gray-700 mt-2">Deliverables: Design, code, docs, deployment plan and 30-day support window.</p>
                                </div>
                            </aside>
                        </section>
                    ))}
                </div>

                <section className="mt-12">
                    <h3 className="text-xl font-semibold">How we price</h3>
                    <p className="text-gray-700 mt-2">We provide fixed-price estimates for well-scoped projects and time & materials for ongoing work. Every project starts with a discovery to clarify the scope and reduce surprises.</p>
                </section>

                <ContactSection />
            </div>
        </main>
    )
}
