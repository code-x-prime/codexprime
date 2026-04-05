"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdCheck } from "react-icons/md";
import { motion } from "framer-motion";
import { trackFormSubmission, trackContactInteraction, trackButtonClick } from '@/lib/posthog';

type FormData = {
    name: string;
    email: string;
    phone: string;
    message: string;
};

const PHONE_NUMBER = '+919354734436';
const WHATSAPP_MESSAGE = "Hi, I'm interested in your services. Please help me with a free consultation.";

const CallDialog = ({
    phoneNumber, onClose, onConfirm,
}: {
    phoneNumber: string; onClose: () => void; onConfirm: () => void;
}) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-7 max-w-sm w-full shadow-2xl border border-gray-100 relative">
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50" aria-label="Close">
                <IoMdClose size={16} className="text-gray-600" />
            </button>
            <div className="text-center">
                <div className="w-14 h-14 bg-[#0a0a0a] rounded-2xl mx-auto mb-5 flex items-center justify-center">
                    <FaPhoneAlt className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#0a0a0a]">Call CodeXprime?</h3>
                <p className="text-gray-500 text-sm mb-2">You&apos;re about to call</p>
                <p className="text-lg font-bold text-[#0a0a0a] mb-6">{phoneNumber}</p>
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="flex-1 px-4 py-2.5 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                        <MdCheck size={16} /> Call Now
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const WhatsAppDialog = ({
    phoneNumber, message, onClose, onConfirm,
}: {
    phoneNumber: string; message: string; onClose: () => void; onConfirm: () => void;
}) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-7 max-w-sm w-full shadow-2xl border border-gray-100 relative">
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50" aria-label="Close">
                <IoMdClose size={16} className="text-gray-600" />
            </button>
            <div className="text-center">
                <div className="w-14 h-14 bg-green-600 rounded-2xl mx-auto mb-5 flex items-center justify-center">
                    <FaWhatsapp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#0a0a0a]">Open WhatsApp?</h3>
                <p className="text-gray-500 text-sm mb-4">{phoneNumber}</p>
                <p className="text-xs text-gray-400 mb-6 bg-gray-50 rounded-xl p-3 text-left leading-relaxed">
                    &quot;{message}&quot;
                </p>
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                        <MdCheck size={16} /> Open WhatsApp
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const contactInfo = [
    { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '+91 9354734436', href: 'tel:+919354734436', iconBg: 'bg-blue-500', iconRing: 'ring-blue-100' },
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'hello@codexprime.in', href: 'mailto:hello@codexprime.in', iconBg: 'bg-purple-500', iconRing: 'ring-purple-100' },
    { icon: <Clock className="w-5 h-5" />, label: 'Hours', value: 'Mon–Sat: 10 AM – 7 PM', href: null, iconBg: 'bg-orange-500', iconRing: 'ring-orange-100' },
];

const ContactSection = () => {
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [showCallDialog, setShowCallDialog] = useState(false);
    const [showWhatsAppDialog, setShowWhatsAppDialog] = useState(false);

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: typeof errors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        const emailRe = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRe.test(formData.email)) newErrors.email = 'Enter a valid email';
        const phoneRe = /^[0-9]{7,15}$/;
        if (!phoneRe.test(formData.phone.replace(/[^0-9]/g, ''))) newErrors.phone = 'Enter a valid phone number';
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: formData.name, email: formData.email, mobileNumber: formData.phone, message: formData.message }),
            });
            const json = await res.json();
            if (!res.ok) { toast.error(json?.error || 'Failed to send message'); setIsSubmitting(false); return; }
            toast.success(json?.message || 'Message sent!');
            trackFormSubmission('contact_form', { name: formData.name, email: formData.email, phone: formData.phone, message_length: formData.message.length });
            setIsSubmitted(true);
            setIsSubmitting(false);
            setTimeout(() => { setFormData({ name: '', email: '', phone: '', message: '' }); setIsSubmitted(false); }, 2500);
        } catch { toast.error('Network error. Please try again.'); setIsSubmitting(false); }
    };

    const openWhatsApp = () => {
        window.open(`https://wa.me/${PHONE_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`, '_blank');
    };

    return (
        <section id="contact" className="section-padding">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-14">
                    <span className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 text-gray-600 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">
                        <MessageSquare className="w-3.5 h-3.5" />
                        Get In Touch
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0a0a0a] leading-tight tracking-tight mb-4 max-w-2xl mx-auto">
                        Ready to Start Your Project?
                    </h2>
                    <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                        Let&apos;s discuss your ideas and turn them into reality. Get a free consultation and project estimate.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="lg:col-span-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-7 sm:p-9"
                    >
                        {isSubmitted ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-black rounded-2xl mx-auto mb-5 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-[#0a0a0a] mb-2">Thank You!</h3>
                                <p className="text-gray-600 text-sm">We&apos;ve received your message.</p>
                                <p className="text-gray-400 text-xs mt-2">Our team will call you within 12 hours (10 AM – 7 PM).</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <h3 className="text-xl font-bold text-[#0a0a0a] mb-6">Send us a message</h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="text" placeholder="Your Name" value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)} required
                                            className={`w-full px-4 py-3.5 rounded-xl border bg-white text-[#0a0a0a] placeholder:text-gray-400 text-sm outline-none transition-all duration-200 focus:shadow-sm ${errors.name ? 'border-red-400' : 'border-gray-200 focus:border-black'}`}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <input
                                            type="email" placeholder="Your Email" value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)} required
                                            className={`w-full px-4 py-3.5 rounded-xl border bg-white text-[#0a0a0a] placeholder:text-gray-400 text-sm outline-none transition-all duration-200 focus:shadow-sm ${errors.email ? 'border-red-400' : 'border-gray-200 focus:border-black'}`}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                <div>
                                    <input
                                        type="tel" placeholder="Your Phone Number" value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)} required
                                        className={`w-full px-4 py-3.5 rounded-xl border bg-white text-[#0a0a0a] placeholder:text-gray-400 text-sm outline-none transition-all duration-200 focus:shadow-sm ${errors.phone ? 'border-red-400' : 'border-gray-200 focus:border-black'}`}
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>

                                <textarea
                                    rows={4} placeholder="Tell us about your project..." value={formData.message}
                                    onChange={(e) => handleInputChange('message', e.target.value)} required
                                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-[#0a0a0a] placeholder:text-gray-400 text-sm outline-none resize-none focus:border-black focus:shadow-sm transition-all duration-200"
                                />

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        type="submit" disabled={isSubmitting}
                                        className="flex-1 bg-black text-white py-3.5 px-6 rounded-xl font-semibold text-sm hover:bg-gray-800 disabled:opacity-60 transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Sending...</>
                                        ) : (
                                            <><Send className="w-4 h-4" /> Send Message</>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setShowWhatsAppDialog(true); trackButtonClick('WhatsApp Quick', 'contact_form'); }}
                                        className="flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-3.5 rounded-xl font-semibold text-sm hover:bg-green-700 transition-colors"
                                    >
                                        <FaWhatsapp className="w-4 h-4" /> WhatsApp
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setShowCallDialog(true); trackButtonClick('Call Quick', 'contact_form'); }}
                                        className="flex items-center justify-center gap-2 border border-gray-200 text-[#0a0a0a] px-5 py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
                                    >
                                        <FaPhoneAlt className="w-4 h-4" /> Call
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.div>

                    {/* Contact info */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                        className="lg:col-span-2 space-y-4"
                    >
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-[#0a0a0a] mb-2">Get in touch</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                We operate online and are fully equipped to work remotely with clients across India and beyond.
                            </p>
                        </div>

                        {contactInfo.map((info, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-sm transition-shadow duration-200">
                                <div className={`w-10 h-10 ${info.iconBg} ring-2 ${info.iconRing} text-white rounded-xl flex items-center justify-center flex-shrink-0`}>
                                    {info.icon}
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{info.label}</p>
                                    {info.href ? (
                                        <a href={info.href} className="text-sm font-semibold text-[#0a0a0a] hover:text-gray-600 transition-colors">
                                            {info.value}
                                        </a>
                                    ) : (
                                        <p className="text-sm font-semibold text-[#0a0a0a]">{info.value}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Dialogs */}
            {showCallDialog && (
                <CallDialog
                    phoneNumber={PHONE_NUMBER}
                    onClose={() => setShowCallDialog(false)}
                    onConfirm={() => { window.location.href = `tel:${PHONE_NUMBER}`; trackContactInteraction('call', { location: 'contact_section_dialog' }); setShowCallDialog(false); }}
                />
            )}
            {showWhatsAppDialog && (
                <WhatsAppDialog
                    phoneNumber={PHONE_NUMBER}
                    message={WHATSAPP_MESSAGE}
                    onClose={() => setShowWhatsAppDialog(false)}
                    onConfirm={() => { openWhatsApp(); trackContactInteraction('whatsapp', { location: 'contact_section_dialog' }); setShowWhatsAppDialog(false); }}
                />
            )}
        </section>
    );
};

export default ContactSection;
