
import React from 'react'

const HeadText = ({ title, icon, icontitle, description }: { title: string, icon: React.ReactNode, icontitle: string, description: string }) => {
    return (
        <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded text-sm font-medium mb-6">
                {icon} {icontitle}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {description}
            </p>
        </div>
    )
}

export default HeadText
