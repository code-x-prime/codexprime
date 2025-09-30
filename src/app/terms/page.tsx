import React from 'react'
import HeadText from '@/components/shared/Head-Text'

export const metadata = {
    title: 'Terms & Conditions | CodeXprime',
}

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white py-16">
            <div className="max-w-4xl mx-auto px-6">
                <HeadText
                    title="Terms & Conditions"
                    icon={<></>}
                    icontitle="TERMS"
                    description="The terms that govern the use of our website and services. Keep it simple and fair."
                />

                <section className="prose prose-lg text-gray-700 mt-6">
                    <h3>Acceptance of terms</h3>
                    <p>By using the site you agree to these terms. If you don’t agree, please don’t use the site.</p>

                    <h3>Use of content</h3>
                    <p>All content on this site is provided for informational purposes. You may not redistribute or republish without permission.</p>

                    <h3>Limitation of liability</h3>
                    <p>We do our best to provide accurate information, but we aren’t liable for indirect damages. For custom work, see our agreement terms.</p>

                    <h3>Contact</h3>
                    <p>Questions about these terms? Email <a href="mailto:hello@codexprime.in">hello@codexprime.in</a>.</p>
                </section>
            </div>
        </main>
    )
}
