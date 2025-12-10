import GoogleAdsConversion from '@/components/GoogleAdsConversion';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function ThankYouPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20">
            {/* Google Ads Conversion Tracking */}
            <GoogleAdsConversion />

            <div className="container mx-auto px-4 max-w-2xl text-center">
                <div className="bg-white rounded-2xl shadow-xl p-12">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="bg-green-100 rounded-full p-4">
                            <CheckCircle className="w-16 h-16 text-green-600" />
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl font-satoshi-bold text-gray-900 mb-4">
                        Thank You!
                    </h1>

                    <p className="text-xl text-gray-600 mb-8">
                        We&apos;ve received your message and will get back to you within 24 hours.
                    </p>

                    {/* Additional Info */}
                    <div className="bg-blue-50 rounded-lg p-6 mb-8">
                        <h2 className="text-lg font-satoshi-medium text-gray-900 mb-2">
                            What happens next?
                        </h2>
                        <ul className="text-left text-gray-700 space-y-2">
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">✓</span>
                                <span>Our team will review your inquiry</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">✓</span>
                                <span>We&apos;ll prepare a customized response</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-2">✓</span>
                                <span>You&apos;ll receive an email within 24 hours</span>
                            </li>
                        </ul>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-satoshi-medium hover:bg-blue-700 transition-colors"
                        >
                            Back to Home
                        </Link>
                        <Link
                            href="/services"
                            className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-satoshi-medium hover:bg-blue-50 transition-colors"
                        >
                            View Our Services
                        </Link>
                    </div>
                </div>

                {/* Additional Contact Info */}
                <div className="mt-8 text-gray-600">
                    <p className="mb-2">Need immediate assistance?</p>
                    <a
                        href="tel:+919354734436"
                        className="text-blue-600 font-satoshi-medium hover:underline"
                    >
                        Call us at +91-9354734436
                    </a>
                </div>
            </div>
        </div>
    );
}
