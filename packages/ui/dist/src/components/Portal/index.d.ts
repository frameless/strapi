import React from 'react';
interface PortalProps {
    children?: React.ReactNode;
    parent?: string;
    className?: string;
}
export declare const Portal: React.ForwardRefExoticComponent<PortalProps & React.RefAttributes<HTMLDivElement>>;
export {};
