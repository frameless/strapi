import React from 'react';
import { Components } from 'react-markdown';
interface MarkdownProps {
    children: string;
    components?: Components;
}
export declare const Markdown: React.FC<MarkdownProps>;
export {};
