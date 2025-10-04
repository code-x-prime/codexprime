import React from 'react';

export type TocHeading = { id: string; text: string };

export const TableOfContents = ({ headings }: { headings: TocHeading[] }) => (
    <nav className="toc sticky top-24 p-4 rounded-lg bg-gray-50 border border-gray-200">
        <h3 className="text-sm font-semibold mb-3 text-gray-800">Table of Contents</h3>
        <ul className="space-y-2 text-sm">
            {headings.map((h) => (
                <li key={h.id}>
                    <a href={`#${h.id}`} className="text-blue-600 hover:underline">
                        {h.text}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
);

export default TableOfContents;
