"use client";
import React, { useState } from 'react';

interface FormData {
    name: string;
    email: string;
    phone: string;
    message?: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
}

const HeroComponent = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.table({
            'Name': formData.name,
            'Email': formData.email,
            'Phone': formData.phone,
            'Message': formData.message || 'Not provided',
            'Submitted At': new Date().toLocaleString()
        });

        setIsSubmitted(true);
        setIsSubmitting(false);

        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', phone: '', message: '' });
            setErrors({});
        }, 3000);
    };

    return (
        <div className="relative w-full min-h-screen bg-white">
            {/* Background Video - positioned on right side */}
            <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="https://hw-prod-static-assets.s3.ap-south-1.amazonaws.com/marketing/website/hellobg.webm" type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 min-h-screen flex items-center">
                <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left Content */}
                        <div className="text-black space-y-8">
                            <div className="space-y-6">
                                <p className="text-sm uppercase tracking-widest font-medium text-gray-600">
                                    TRANSFORM YOUR BUSINESS
                                </p>

                                <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-gray-900">
                                    CodeXprime - Premier IT Services in Dwarka & Uttam Nagar Delhi
                                </h1>

                                <p className="text-lg text-gray-700 font-medium">
                                    Web Designing •  Digital Marketing •  Graphic Designing
                                </p>

                            </div>
                        </div>

                        {/* Right Form */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="w-full max-w-md relative z-20">
                                <div className="bg-white/95 backdrop-blur-sm rounded p-8 shadow-2xl border border-gray-100">
                                    {!isSubmitted ? (
                                        <>
                                            <h3 className="text-2xl font-bold mb-6 text-gray-800">
                                                Get Free Consultation
                                            </h3>

                                            <div className="space-y-4">
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="Your Name"
                                                        value={formData.name}
                                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                                        className={`w-full p-3 rounded-lg border-2  outline-none bg-gray-100 text-black placeholder:text-gray-600 transition-colors ${errors.name
                                                            ? 'border-red-400 focus:border-red-500'
                                                            : 'border-gray-200 focus:border-black'
                                                            }`}
                                                    />
                                                    {errors.name && (
                                                        <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <input
                                                        type="email"
                                                        placeholder="Your Email"
                                                        value={formData.email}
                                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                                        className={`w-full p-3 rounded-lg border-2  outline-none bg-gray-100 text-black placeholder:text-gray-600 transition-colors ${errors.email
                                                            ? 'border-red-400 focus:border-red-500'
                                                            : 'border-gray-200 focus:border-black'
                                                            }`}
                                                    />
                                                    {errors.email && (
                                                        <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <input
                                                        type="tel"
                                                        placeholder="Your Phone"
                                                        value={formData.phone}
                                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                                        className={`w-full p-3 rounded-lg border-2  outline-none bg-gray-100 text-black placeholder:text-gray-600 transition-colors ${errors.phone
                                                            ? 'border-red-400 focus:border-red-500'
                                                            : 'border-gray-200 focus:border-black'
                                                            }`}
                                                    />
                                                    {errors.phone && (
                                                        <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <textarea
                                                        placeholder="Message (Optional)"
                                                        rows={3}
                                                        value={formData.message}
                                                        onChange={(e) => handleInputChange('message', e.target.value)}
                                                        className="w-full p-3 rounded-lg border-2 border-gray-200 bg-gray-100 text-black placeholder:text-gray-600 outline-none resize-none focus:border-black transition-colors"
                                                    />
                                                </div>

                                                <button
                                                    onClick={handleSubmit}
                                                    disabled={isSubmitting}
                                                    className="w-full bg-black text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-900 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                                                >
                                                    {isSubmitting ? 'Submitting...' : 'Get Free Consultation'}
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center py-8">
                                            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 text-gray-800">Thank You!</h3>
                                            <p className="text-gray-600">We will contact you soon.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroComponent;