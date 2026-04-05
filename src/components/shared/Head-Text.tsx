import React from 'react';

interface HeadTextProps {
    title: string;
    icon?: React.ReactNode;
    icontitle?: string;
    description?: string;
    align?: 'center' | 'left';
}

const HeadText = ({ title, icon, icontitle, description, align = 'center' }: HeadTextProps) => {
    const alignClass = align === 'left' ? 'text-left items-start' : 'text-center items-center';

    return (
        <div className={`flex flex-col gap-4 mb-12 md:mb-16 ${alignClass}`}>
            {icontitle && (
                <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 border border-gray-200 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full w-fit">
                    {icon}
                    {icontitle}
                </span>
            )}
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black text-[#0a0a0a] leading-tight tracking-tight ${align === 'center' ? 'max-w-3xl mx-auto' : 'max-w-2xl'}`}>
                {title}
            </h2>
            {description && (
                <p className={`text-gray-500 text-base sm:text-lg leading-relaxed ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
                    {description}
                </p>
            )}
        </div>
    );
};

export default HeadText;
