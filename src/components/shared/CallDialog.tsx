import React from "react";
import { FiPhone } from "react-icons/fi";
import { MdCheck } from "react-icons/md";

interface CallDialogProps {
    phoneNumber: string;
    show: boolean;
    onClose: () => void;
}

const CallDialog: React.FC<CallDialogProps> = ({ phoneNumber, show, onClose }) => {
    const handleCall = () => {
        // Trigger phone call
        window.location.href = `tel:${phoneNumber}`;
        onClose();
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-auto shadow-xl border border-gray-200">
                <div className="text-center">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <FiPhone className="w-7 h-7 text-gray-800" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Make a Call?</h3>
                    <p className="text-gray-600">Do you want to call CodeXprime?</p>

                    {/* Phone number */}
                    <p className="text-lg font-semibold text-gray-900 mt-4">{phoneNumber}</p>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={onClose}
                            className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCall}
                            className="flex-1 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition flex items-center justify-center gap-2"
                        >
                            <MdCheck className="w-5 h-5" />
                            Call Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallDialog;
