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

    // Simple Grid Lines Component
    const AnimatedGrid = () => {
        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Simple Grid Lines Pattern */}
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(0, 0, 0, 0.18) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 0, 0, 0.18) 1px, transparent 1px)
                        `,
                        backgroundSize: '80px 80px'
                    }}
                />

                {/* Fade out gradient overlays for center disappearing effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/95 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60 pointer-events-none" />

                {/* Center radial fade */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 20%, transparent 70%)'
                    }}
                />
            </div>
        );
    };

    return (
        <div className="relative w-full md:h-[85dvh] md:bg-white p-2 overflow-hidden">
            {/* Desktop Video Background */}
            <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="https://pub-a3d2b35862c1483894ffbee942bb995e.r2.dev/Untitled%20design.mp4" type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Mobile Background Image */}
            <div
                className="md:hidden absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://pub-a3d2b35862c1483894ffbee942bb995e.r2.dev/photo-1460925895917-afdab827c52f%5B1%5D')`
                }}
            >
                <div className="absolute inset-0 bg-black/75"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 min-h-full flex items-center">
                <div className="w-full max-w-7xl mx-auto px-3 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">

                        {/* Left Content with Grid Background */}
                        <div className="relative md:text-black text-white space-y-8 order-first lg:order-first p-5">
                            {/* Grid Background - Only on desktop, covers full left area */}
                            <div className="hidden md:block absolute inset-0 -left-8 -right-8">
                                <AnimatedGrid />
                            </div>

                            {/* Content */}
                            <div className="relative z-20 space-y-6">
                                <p className="text-sm uppercase tracking-widest font-medium text-gray-300 md:text-gray-600">
                                    TRANSFORM YOUR BUSINESS
                                </p>

                                <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white md:text-gray-900 drop-shadow-lg">
                                    CodeXprime - Premier IT Services for Growing Businesses
                                </h1>
                                <div className="flex flex-col space-y-2">
                                    <p className="text-lg text-gray-100 md:text-gray-700 font-medium drop-shadow">
                                        Web Designing •  Digital Marketing •  Graphic Designing
                                    </p>
                                    <p className="text-lg text-gray-100 md:text-gray-700 font-medium drop-shadow">
                                        Web Development • MVP Development • IT Solutions
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Form */}
                        <div className="flex justify-center lg:justify-end order-first lg:order-last">
                            <div className="w-full max-w-md sm:max-w-md relative z-20">
                                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-2xl border border-gray-200/50">
                                    {!isSubmitted ? (
                                        <>
                                            <h3 className="text-2xl font-bold mb-6 text-gray-800">
                                                Get Free Consultation
                                            </h3>

                                            <div className="space-y-4">
                                                <div>
                                                    <input
                                                        aria-label="Your name"
                                                        type="text"
                                                        placeholder="Your Name"
                                                        value={formData.name}
                                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                                        className={`w-full p-4 sm:p-3 rounded-lg border-2 outline-none bg-gray-50 text-black placeholder:text-gray-600 transition-all duration-200 focus:bg-white focus:shadow-md ${errors.name
                                                            ? 'border-red-400 focus:border-red-500'
                                                            : 'border-gray-200 focus:border-blue-500'
                                                            }`}
                                                    />
                                                    {errors.name && (
                                                        <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <input
                                                        aria-label="Your email"
                                                        type="email"
                                                        placeholder="Your Email"
                                                        value={formData.email}
                                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                                        className={`w-full p-4 sm:p-3 rounded-lg border-2 outline-none bg-gray-50 text-black placeholder:text-gray-600 transition-all duration-200 focus:bg-white focus:shadow-md ${errors.email
                                                            ? 'border-red-400 focus:border-red-500'
                                                            : 'border-gray-200 focus:border-blue-500'
                                                            }`}
                                                    />
                                                    {errors.email && (
                                                        <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <input
                                                        aria-label="Your phone"
                                                        type="tel"
                                                        placeholder="Your Phone"
                                                        value={formData.phone}
                                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                                        className={`w-full p-4 sm:p-3 rounded-lg border-2 outline-none bg-gray-50 text-black placeholder:text-gray-600 transition-all duration-200 focus:bg-white focus:shadow-md ${errors.phone
                                                            ? 'border-red-400 focus:border-red-500'
                                                            : 'border-gray-200 focus:border-blue-500'
                                                            }`}
                                                    />
                                                    {errors.phone && (
                                                        <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <textarea
                                                        aria-label="Optional message"
                                                        placeholder="Message (Optional)"
                                                        rows={4}
                                                        value={formData.message}
                                                        onChange={(e) => handleInputChange('message', e.target.value)}
                                                        className="w-full p-4 sm:p-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-black placeholder:text-gray-600 outline-none resize-none focus:border-blue-500 focus:bg-white focus:shadow-md transition-all duration-200"
                                                    />
                                                </div>

                                                <button
                                                    onClick={handleSubmit}
                                                    disabled={isSubmitting}
                                                    className="w-full bg-gradient-to-r from-gray-900 to-black text-white py-5 sm:py-4 px-6 rounded-lg font-medium hover:from-gray-800 hover:to-gray-900 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-lg"
                                                >
                                                    {isSubmitting ? 'Submitting...' : 'Get Free Consultation'}
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center py-8">
                                            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 text-gray-800">Thank You!</h3>
                                            <p className="text-gray-600">We will contact you soon.</p>
                                            <p className="text-gray-500 text-sm mt-2">
                                                Our team will try to call you within 12 hours.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                .bg-gradient-radial {
                    background: radial-gradient(circle, var(--tw-gradient-stops));
                }
            `}</style>
        </div>
    );
};

export default HeroComponent;