import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdCheck } from "react-icons/md";

interface WhatsAppDialogProps {
    show: boolean;
    onClose: () => void;
    phoneNumber: string;
    whatsappMessage: string;
}

const WhatsAppDialog: React.FC<WhatsAppDialogProps> = ({
    show,
    onClose,
    phoneNumber,
    whatsappMessage,
}) => {
    const handleWhatsApp = () => {
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappLink = `https://wa.me/${phoneNumber.replace(
            /[^0-9]/g,
            ""
        )}?text=${encodedMessage}`;
        window.open(whatsappLink, "_blank");
        onClose();
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-auto shadow-xl border border-gray-200">
                <div className="text-center">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <IoLogoWhatsapp className="w-8 h-8 text-green-600" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Open WhatsApp?</h3>
                    <p className="text-gray-600">Chat with CodeXprime on WhatsApp</p>

                    {/* Phone */}
                    <p className="text-lg font-semibold text-gray-900 mt-3">{phoneNumber}</p>

                    {/* Message Preview */}
                    <div className="text-sm text-gray-600 my-5 p-3 bg-gray-50 rounded border">
                        <strong>Message:</strong> “{whatsappMessage}”
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={onClose}
                            className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleWhatsApp}
                            className="flex-1 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition flex items-center justify-center gap-2"
                        >
                            <MdCheck className="w-5 h-5" />
                            Open WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatsAppDialog;
