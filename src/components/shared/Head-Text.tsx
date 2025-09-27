import { Lightbulb } from 'lucide-react'
import React from 'react'

const HeadText = () => {
    return (
        <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded text-sm font-medium mb-6">
                <Lightbulb className="w-4 h-4" />
                OUR EXPERTISE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Services We Provide
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Transform your business with our comprehensive IT solutions. From web development to digital marketing,
                we deliver results that drive growth and success.
            </p>
        </div>
    )
}

export default HeadText
