import { HTMLAttributes } from 'react';
export type NavigationListType = {
    title: string;
    link: string;
    children?: NavigationListType[];
};
interface NavigationProps extends HTMLAttributes<HTMLElement> {
    list: NavigationListType[];
    mobileBreakpoint: number;
    toggleButton?: {
        openText?: string;
        closeText?: string;
    };
}
export declare const Navigation: import("react").ForwardRefExoticComponent<NavigationProps & {
    children?: import("react").ReactNode;
} & import("react").RefAttributes<HTMLElement>>;
export {};
