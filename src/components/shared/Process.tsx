import { Clock, Code, MessageSquare, PenTool, Rocket } from 'lucide-react';
import React from 'react';
import HeadText from './Head-Text';

const Process = () => {
    const steps = [
        {
            title: "Consultation",
            description: "Free discovery call to understand your requirements and business goals.",
            icon: <MessageSquare className="w-6 h-6" />,

        },
        {
            title: "Planning",
            description: "Detailed planning, wireframing, and tech selection tailored to your project.",
            icon: <PenTool className="w-6 h-6" />,

        },
        {
            title: "Development",
            description: "Agile development with regular updates and collaborative feedback.",
            icon: <Code className="w-6 h-6" />,

        },
        {
            title: "Launch",
            description: "Final testing, deployment, and performance optimization.",
            icon: <Rocket className="w-6 h-6" />,

        }
    ];

    return (
        <section className="bg-white py-8 md:py-16 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <HeadText title='Our Simple 4-Step Process' icon={<Clock className="w-4 h-4" />} icontitle='How We Work' description='We follow a clear, proven workflow to ensure your project moves from idea to execution smoothly and successfully.' />


                {/* Steps Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 hover:border-black transition duration-300 p-5 group bg-gray-50 hover:bg-white h-full relative"
                        >
                            {/* Step number top-right */}
                            <div className="absolute top-3 right-3 text-xs text-gray-400 font-semibold">
                                Step {index + 1}
                            </div>

                            {/* Icon block */}
                            <div className="flex items-center justify-center w-12 h-12 bg-black text-white mb-5">
                                {step.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-sm text-gray-600 mb-4">{step.description}</p>


                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
