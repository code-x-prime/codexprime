"use client";

import React, { useState } from "react";
import CallDialog from "./CallDialog";
import { Phone } from "lucide-react";

const StillConfusedSection = () => {
    const [showCallDialog, setShowCallDialog] = useState(false);
    const phoneNumber = "+918882304322";

    return (
        <section className="bg-black text-white py-10 px-6">
            <div className="max-w-6xl mx-auto text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                    Still Confused? <br className="md:hidden" /> Contact Us Now
                </h2>

                <button
                    onClick={() => setShowCallDialog(true)}
                    className="inline-flex items-center justify-center gap-3 bg-white text-black py-4 px-6 shadow-lg text-xl font-semibold hover:bg-gray-200 transition"
                >
                    <Phone className="w-6 h-6 text-black" />
                    {phoneNumber}
                </button>

                <p className="text-sm text-gray-400">
                    Available between <strong>10:00 AM – 7:00 PM</strong> (Mon–Sat)
                </p>
            </div>

            {/* Call Dialog Component */}
            <CallDialog
                phoneNumber={phoneNumber}
                show={showCallDialog}
                onClose={() => setShowCallDialog(false)}
            />
        </section>
    );
};

export default StillConfusedSection;
