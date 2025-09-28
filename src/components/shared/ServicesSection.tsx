import React from 'react';
import { digital, graphic, mvp, web } from '@/assets';
import Image from 'next/image';
import HeadText from './Head-Text';
import { Lightbulb } from 'lucide-react';

const ServicesSection = () => {
    const services = [
        {

            title: "Web Development",
            description: "Custom websites and web applications built with modern technologies for optimal performance and user experience.",
            features: ["React/Next.js", "Node.js", "Database Design", "API Integration"],
            color: "from-blue-500 to-blue-600",
            hoverColor: "group-hover:from-blue-600 group-hover:to-blue-700",
            imgSrc: web
        },
        {

            title: "Digital Marketing",
            description: "Comprehensive digital marketing strategies to boost your online presence and drive qualified leads to your business.",
            features: ["SEO Optimization", "Social Media", "Google Ads", "Content Strategy"],
            color: "from-green-500 to-green-600",
            hoverColor: "group-hover:from-green-600 group-hover:to-green-700",
            imgSrc: digital
        },
        {

            title: "Graphic Design",
            description: "Creative visual solutions that represent your brand identity and communicate your message effectively.",
            features: ["Logo Design", "Branding", "Print Design", "UI/UX Design"],
            color: "from-red-500 to-red-600",
            hoverColor: "group-hover:from-red-600 group-hover:to-red-700",
            imgSrc: graphic
        },
        {

            title: "MVP Development",
            description: "Rapid development of Minimum Viable Products to validate your business ideas and get to market quickly.",
            features: ["Fast Prototyping", "Core Features", "User Testing", "Iterative Design"],
            color: "from-yellow-500 to-yellow-600",
            hoverColor: "group-hover:from-yellow-600 group-hover:to-yellow-700",
            imgSrc: mvp
        },

    ];

    return (
        <section className="py-10 md:py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <HeadText title="Services We Provide" icon={<Lightbulb className="w-4 h-4" />} icontitle="Our Expertise"
                    description={"Transform your business with our comprehensive IT solutions. From web development to digital marketing, we deliver results that drive growth and success."} />

                {/* Services Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group bg-white  p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                        >
                            <Image src={service.imgSrc} alt={service.title} className="my-2 object-cover rounded h-12 md:h-24" width={700} height={100} />
                            {/* Icon */}


                            {/* Content */}
                            <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-4 group-hover:text-gray-800 transition-colors md:text-left text-center">
                                {service.title}
                            </h3>

                            <p className="text-gray-600 mb-3 md:mb-6 leading-relaxed text-xs md:text-sm">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
};

export default ServicesSection;