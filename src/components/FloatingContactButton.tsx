"use client";
import React, { useState } from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import WhatsAppDialog from './shared/WhatsAppDialog';
import CallDialog from './shared/CallDialog';
import { trackContactInteraction } from '@/lib/posthog';

const FloatingContactButton = () => {
    const [showWhatsAppDialog, setShowWhatsAppDialog] = useState(false);
    const [showCallDialog, setShowCallDialog] = useState(false);

    const phoneNumber = "+919354734436";
    const whatsappMessage = "Hi! I'm interested in CodeXprime IT services. Can you help me?";

    return (
        <>
            {/* ── Desktop only: Instagram bottom-left + WhatsApp bottom-right ── */}
            <a
                href="https://www.instagram.com/codexprime_official"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hidden md:flex fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
                style={{
                    background: 'radial-gradient(circle at 30% 110%, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                }}
            >
                <FaInstagram size={22} className="text-white" />
            </a>

            <button
                onClick={() => {
                    setShowWhatsAppDialog(true);
                    trackContactInteraction('whatsapp', { location: 'floating_whatsapp_desktop' });
                }}
                aria-label="WhatsApp"
                className="hidden md:flex fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#25D366] items-center justify-center shadow-lg hover:scale-110 hover:bg-[#20bd5a] transition-all duration-200"
            >
                <FaWhatsapp size={24} className="text-white" />
            </button>

            {/* ── Mobile only: clean bottom action bar ── */}
            <div className="fixed bottom-0 left-0 right-0 md:hidden z-50">
                {/* Gradient top fade */}
                <div className="h-6 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
                <div className="flex border-t border-gray-100 bg-white/95 backdrop-blur-sm">
                    <button
                        onClick={() => {
                            setShowWhatsAppDialog(true);
                            trackContactInteraction('whatsapp', { location: 'mobile_bottom_bar' });
                        }}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 text-sm font-semibold active:bg-[#20bd5a] transition-colors"
                    >
                        <FaWhatsapp size={19} />
                        WhatsApp
                    </button>
                    <div className="w-px bg-white/30" />
                    <button
                        onClick={() => {
                            setShowCallDialog(true);
                            trackContactInteraction('call', { location: 'mobile_bottom_bar' });
                        }}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#0a0a0a] text-white py-4 text-sm font-semibold active:bg-gray-800 transition-colors"
                    >
                        <FiPhone size={17} />
                        Call Now
                    </button>
                </div>
            </div>

            {/* Safe area spacer so content isn't hidden behind bar on mobile */}
            <div className="h-[64px] md:hidden" />

            <WhatsAppDialog
                show={showWhatsAppDialog}
                onClose={() => setShowWhatsAppDialog(false)}
                phoneNumber={phoneNumber}
                whatsappMessage={whatsappMessage}
            />
            <CallDialog
                phoneNumber={phoneNumber}
                show={showCallDialog}
                onClose={() => setShowCallDialog(false)}
            />
        </>
    );
};

export default FloatingContactButton;
