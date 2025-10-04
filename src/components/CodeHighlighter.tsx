"use client";
import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

// Optional: load popular languages
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';

export default function CodeHighlighter() {
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return null;
}
