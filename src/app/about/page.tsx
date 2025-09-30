import React from 'react'
import HeadText from '@/components/shared/Head-Text'
import ContactSection from '@/components/shared/ContactSection'

export const metadata = {
    title: 'About | CodeXprime',
}

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white py-16">
            <div className="max-w-6xl mx-auto px-6">
                <HeadText
                    title="About CodeXprime"
                    icon={<></>}
                    icontitle="ABOUT"
                    description="We build digital products, websites and marketing that help businesses grow. Small team. Big outcomes."
                />

                <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 prose prose-lg text-gray-700">
                        <h3>Who we are</h3>
                        <p>
                            CodeXprime is a small, focused team of designers, developers and strategists.
                            We partner with founders and teams to ship usable, delightful products — from marketing websites to MVP apps.
                        </p>

                        <h3>Our approach</h3>
                        <p>
                            We keep things practical. Rapid research, pragmatic design and iterative build cycles
                            ensure you get measurable results quickly. We balance engineering quality with time-to-market.
                        </p>

                        <h3>Values</h3>
                        <ul>
                            <li>Client-first thinking — we prioritise outcomes over features.</li>
                            <li>Clarity — clear scopes, timelines and honest estimates.</li>
                            <li>Responsibility — we protect your data and deliver reliable software.</li>
                        </ul>

                        <h3>How we work</h3>
                        <p>
                            Typical engagement starts with a short discovery call. We propose a clear scope, then move into design
                            and development with regular demos. Most projects run in 2-week sprints so you always know what to expect.
                        </p>
                    </div>

                    <aside className="space-y-6">
                        <div className="border p-6 bg-gray-50 text-gray-800">
                            <h4 className="font-semibold mb-2">Quick facts</h4>
                            <p className="text-sm">Remote-first • 10 AM - 7 PM (Mon-Sat)</p>
                            <p className="text-sm mt-2">Established: 2020</p>
                            <p className="text-sm mt-2">Clients: Startups & small businesses</p>
                        </div>

                        <div className="border p-6 bg-gray-50 text-gray-800">
                            <h4 className="font-semibold mb-2">Team</h4>
                            <p className="text-sm">Small team of designers and engineers. We scale by contracting specialist partners when needed.</p>
                        </div>
                    </aside>
                </section>

                {/* timeline removed as requested */}

                <ContactSection />
            </div>
        </main>
    )
}
