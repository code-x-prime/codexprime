"use client";
import React, { useState } from 'react';
import { FiPhone, FiX } from 'react-icons/fi';
import { IoLogoWhatsapp } from 'react-icons/io';
import { MdCheck } from 'react-icons/md';

const FloatingContactButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showCallDialog, setShowCallDialog] = useState(false);
    const [showWhatsAppDialog, setShowWhatsAppDialog] = useState(false);

    const phoneNumber = "+918882304322";
    const whatsappMessage = "Hi! I'm interested in CodeXprime IT services. Can you help me?";

    const handleCall = () => {
        setShowCallDialog(false);
        window.location.href = `tel:${phoneNumber}`;
    };

    const handleWhatsApp = () => {
        setShowWhatsAppDialog(false);
        const url = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(url, '_blank');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeDialogs = () => {
        setShowCallDialog(false);
        setShowWhatsAppDialog(false);
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

            {/* Call Confirmation Dialog */}
            {showCallDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-2xl border border-gray-200">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                <FiPhone className="w-8 h-8 text-gray-800" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Make a Call?</h3>
                            <p className="text-gray-600 mb-2">Do you want to call CodeXprime?</p>
                            <p className="text-lg font-semibold text-gray-800 mb-6">{phoneNumber}</p>

                            <div className="flex gap-3">
                                <button
                                    onClick={closeDialogs}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCall}
                                    className="flex-1 px-4 py-2 bg-black text-white rounded hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                                >
                                    <MdCheck size={18} />
                                    Call Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* WhatsApp Confirmation Dialog */}
            {showWhatsAppDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-2xl border border-gray-200">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                <IoLogoWhatsapp className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Open WhatsApp?</h3>
                            <p className="text-gray-600 mb-2">Chat with CodeXprime on WhatsApp</p>
                            <p className="text-lg font-semibold text-gray-800 mb-4">{phoneNumber}</p>
                            <div className="text-sm text-gray-600 mb-6 p-3 bg-gray-50 rounded border">
                                <strong>Message:</strong> &quot;{whatsappMessage}&quot;
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={closeDialogs}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleWhatsApp}
                                    className="flex-1 px-4 py-2 bg-black text-white rounded hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                                >
                                    <MdCheck size={18} />
                                    Open WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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