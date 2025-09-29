import React from 'react'
import HeadText from '@/components/shared/Head-Text'

export const metadata = {
    title: 'Privacy Policy | CodeXprime',
}

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white py-16">
            <div className="max-w-4xl mx-auto px-6">
                <HeadText
                    title="Privacy Policy"
                    icon={<></>}
                    icontitle="PRIVACY"
                    description="How we collect, use, and protect your information. We keep things simple and transparent."
                />

                <section className="prose prose-lg text-gray-700">
                    <h3>Information we collect</h3>
                    <p>We collect only the data you give us directly — for example, contact info you submit through forms (name, email, phone, message). We don’t collect payment information on this site.</p>

                    <h3>How we use your data</h3>
                    <p>We use contact information to reply to your questions, provide estimates, and communicate about projects. We may save anonymous analytics to understand site usage and improve the product.</p>

                    <h3>Third-party services</h3>
                    <p>We may use third-party services (analytics, hosting, chat) that may collect limited technical data. We choose trusted providers and don’t share personal data except to deliver services you request.</p>

                    <h3>Your choices</h3>
                    <p>You can ask us to remove your data by contacting hello@codexprime.in. We’ll respond quickly and delete your personal information where required.</p>

                    <h3>Contact</h3>
                    <p>If you have questions about privacy, email us at <a href="mailto:hello@codexprime.in">hello@codexprime.in</a>.</p>
                </section>
            </div>
        </main>
    )
}
