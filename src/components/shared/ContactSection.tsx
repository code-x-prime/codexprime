"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { Phone, Mail, Clock, Send } from "lucide-react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdCheck } from "react-icons/md";
import HeadText from './Head-Text';

type FormData = {
    name: string;
    email: string;
    phone: string;
    age?: string;
    message: string;
};

const PHONE_NUMBER = '+919354734436';
const WHATSAPP_MESSAGE = "Hi, I'm interested in your services. Please help me with a free consultation.";

const CallDialog = ({
    phoneNumber,
    onClose,
    onConfirm,
}: {
    phoneNumber: string;
    onClose: () => void;
    onConfirm: () => void;
}) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded p-6 max-w-sm w-full mx-4 shadow-2xl border border-gray-200 relative">
            <button
                aria-label="Close"
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 transition"
            >
                <IoMdClose size={24} />
            </button>
            <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded mx-auto mb-4 flex items-center justify-center">
                    <FaPhoneAlt className="w-8 h-8 text-gray-800" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Make a Call?</h3>
                <p className="text-gray-600 mb-2">Do you want to call CodeXprime?</p>
                <p className="text-lg font-semibold text-gray-800 mb-6">{phoneNumber}</p>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 bg-black text-white rounded hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                    >
                        <MdCheck size={18} />
                        Call Now
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const WhatsAppDialog = ({
    phoneNumber,
    message,
    onClose,
    onConfirm,
}: {
    phoneNumber: string;
    message: string;
    onClose: () => void;
    onConfirm: () => void;
}) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded p-6 max-w-sm w-full mx-4 shadow-2xl border border-gray-200 relative">
            <button
                aria-label="Close"
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 transition"
            >
                <IoMdClose size={24} />
            </button>
            <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded mx-auto mb-4 flex items-center justify-center">
                    <FaWhatsapp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Open WhatsApp?</h3>
                <p className="text-gray-600 mb-2">Chat with CodeXprime on WhatsApp</p>
                <p className="text-lg font-semibold text-gray-800 mb-4">{phoneNumber}</p>
                <div className="text-sm text-gray-600 mb-6 p-3 bg-gray-50 rounded border whitespace-pre-wrap">
                    <strong>Message:</strong> &quot;{message}&quot;
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 bg-black text-white rounded hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                    >
                        <MdCheck size={18} />
                        Open WhatsApp
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const ContactSection = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        age: "",
        message: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    const [showCallDialog, setShowCallDialog] = useState(false);
    const [showWhatsAppDialog, setShowWhatsAppDialog] = useState(false);

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: typeof errors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        const emailRe = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRe.test(formData.email)) newErrors.email = 'Enter a valid email';
        const phoneRe = /^[0-9]{7,15}$/;
        const cleaned = formData.phone.replace(/[^0-9]/g, '');
        if (!phoneRe.test(cleaned)) newErrors.phone = 'Enter a valid phone number';

        // Age validation (optional)
        if (formData.age && formData.age.trim()) {
            const ageClean = formData.age.replace(/[^0-9]/g, '');
            const ageNum = Number(ageClean || 0);
            if (!ageClean || isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
                newErrors.age = 'Enter a valid age';
            }
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        setIsSubmitting(true);

        try {
            const res = await fetch('/api/form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    mobileNumber: formData.phone,
                    age: formData.age,
                    message: formData.message,
                }),
            });

            const json = await res.json();

            if (!res.ok) {
                toast.error(json?.error || 'Failed to send message');
                setIsSubmitting(false);
                return;
            }

            toast.success(json?.message || 'Message sent');
            setIsSubmitted(true);
            setIsSubmitting(false);

            setTimeout(() => {
                setFormData({ name: "", email: "", phone: "", age: "", message: "" });
                setIsSubmitted(false);
            }, 2500);
        } catch (err) {
            console.error(err);
            toast.error('Network error. Please try again later.');
            setIsSubmitting(false);
        }
    };

    const openWhatsApp = () => {
        const url = `https://wa.me/${PHONE_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
        window.open(url, '_blank');
    };

    const callPhone = () => {
        window.location.href = `tel:${PHONE_NUMBER}`;
    };

    return (
        <section className="py-8 md:py-16 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <HeadText
                    title="Ready to Start Your Project?"
                    icon={<Send className="w-4 h-4" />}
                    icontitle="GET IN TOUCH"
                    description={"Let's discuss your ideas and turn them into reality. Get a free consultation and project estimate."}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */}
                    <div className="bg-white p-8 border border-gray-200 rounded shadow-sm">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>

                        {isSubmitted ? (
                            <div className="text-center py-10">
                                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">Thank you!</h4>
                                <p className="text-gray-600">We’ve received your message.</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Our team will try to call you within 12 hours (between 10 AM - 7 PM).
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange("name", e.target.value)}
                                            required
                                            className="w-full p-4 rounded border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-black focus:bg-white outline-none transition"
                                        />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            required
                                            className="w-full p-4 rounded border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-black focus:bg-white outline-none transition"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                <div>
                                    <input
                                        type="tel"
                                        placeholder="Your Phone"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                        required
                                        className="w-full p-4 rounded border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-black focus:bg-white outline-none transition"
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>

                                <textarea
                                    rows={5}
                                    placeholder="Tell us about your project"
                                    value={formData.message}
                                    onChange={(e) => handleInputChange("message", e.target.value)}
                                    required
                                    className="w-full p-4 rounded border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-black focus:bg-white outline-none resize-none transition"
                                ></textarea>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`flex-1 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-800'} bg-black text-white py-3 px-6 font-medium transition-colors  flex items-center justify-center gap-2 mb-3 sm:mb-0`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>


                                </div>

                                <div className="mt-4 text-sm text-gray-500 flex gap-3 justify-center sm:justify-start">
                                    <button
                                        onClick={() => setShowWhatsAppDialog(true)}
                                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 "
                                    >
                                        <FaWhatsapp className="w-4 h-4" />
                                        WhatsApp
                                    </button>
                                    <button
                                        onClick={() => setShowCallDialog(true)}
                                        className="inline-flex items-center gap-2 bg-black hover:bg-gray-900 text-white px-3 py-2 "
                                    >
                                        <FaPhoneAlt className="w-4 h-4" />
                                        Call
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Get in touch</h3>
                            <p className="text-gray-600">
                                We currently operate online and are planning our physical presence soon. Meanwhile, we&apos;re fully equipped to work remotely.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Phone Number</h4>
                                    <p className="text-gray-600">+91 9354734436</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                                    <p className="text-gray-600">hello@codexprime.in</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Business Hours</h4>
                                    <p className="text-gray-600">Monday - Saturday: 10:00 AM - 7:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dialogs */}
                {showCallDialog && (
                    <CallDialog
                        phoneNumber={PHONE_NUMBER}
                        onClose={() => setShowCallDialog(false)}
                        onConfirm={() => {
                            callPhone();
                            setShowCallDialog(false);
                        }}
                    />
                )}

                {showWhatsAppDialog && (
                    <WhatsAppDialog
                        phoneNumber={PHONE_NUMBER}
                        message={WHATSAPP_MESSAGE}
                        onClose={() => setShowWhatsAppDialog(false)}
                        onConfirm={() => {
                            openWhatsApp();
                            setShowWhatsAppDialog(false);
                        }}
                    />
                )}
            </div>
        </section>
    );
};

export default ContactSection;
