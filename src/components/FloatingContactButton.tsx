"use client";
import React, { useState } from 'react';
import { FiPhone, FiX } from 'react-icons/fi';
import { IoLogoWhatsapp } from 'react-icons/io';
import CallDialog from './shared/CallDialog';
import WhatsAppDialog from './shared/WhatsAppDialog';

const FloatingContactButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showCallDialog, setShowCallDialog] = useState(false);
    const [showWhatsAppDialog, setShowWhatsAppDialog] = useState(false);

    const phoneNumber = "+919354734436";
    const whatsappMessage = "Hi! I'm interested in CodeXprime IT services. Can you help me?";

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Main Floating Button */}
            <div className="fixed bottom-6 right-6 z-50">
                {/* Action Buttons - Show when menu is open */}
                <div className={`absolute bottom-16 right-0 flex flex-col gap-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}>
                    {/* WhatsApp Button */}
                    <button
                        onClick={() => setShowWhatsAppDialog(true)}
                        className="flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-4 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        <IoLogoWhatsapp size={20} className="text-green-600" />
                        <span className="hidden md:block text-sm font-medium whitespace-nowrap">WhatsApp</span>
                    </button>

                    {/* Call Button */}
                    <button
                        onClick={() => setShowCallDialog(true)}
                        className="flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-4 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        <FiPhone size={20} className="text-blue-600" />
                        <span className="hidden md:block text-sm font-medium whitespace-nowrap">Call Now</span>
                    </button>
                </div>

                {/* Main Toggle Button */}
                <button
                    onClick={toggleMenu}
                    className={`hidden md:flex w-14 h-14 rounded shadow-lg hover:shadow-xl transition-all duration-300  items-center justify-center border ${isOpen
                        ? 'bg-black hover:bg-gray-950 text-gray-200 rotate-180'
                        : 'bg-black hover:bg-gray-950 text-gray-100 border-gray-300'
                        }`}
                >
                    {isOpen ? <FiX size={24} /> : <FiPhone size={24} />}
                </button>
            </div>

            <CallDialog
                phoneNumber={phoneNumber}
                show={showCallDialog}
                onClose={() => setShowCallDialog(false)}
            />


            {/* WhatsApp Confirmation Dialog */}
            <WhatsAppDialog
                show={showWhatsAppDialog}
                onClose={() => setShowWhatsAppDialog(false)}
                phoneNumber={phoneNumber}
                whatsappMessage={whatsappMessage}
            />

            {/* Mobile Bottom Fixed Buttons - Show on small screens */}
            <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200  z-40">
                <div className="flex ">
                    <button
                        onClick={() => setShowWhatsAppDialog(true)}
                        className="flex-1 bg-green-600 hover:bg-green-500 border border-gray-300 text-gray-100 py-3 px-4  font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        <IoLogoWhatsapp size={25} className="text-green-600 p-[0.5px] rounded-full bg-white" />
                        WhatsApp
                    </button>
                    <button
                        onClick={() => setShowCallDialog(true)}
                        className="flex-1 bg-black hover:bg-gray-950 text-white py-3 px-4  font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        <FiPhone size={20} />
                        Call Now
                    </button>
                </div>
            </div>
        </>
    );
};

export default FloatingContactButton;