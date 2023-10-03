/// <reference types="react" />
type NavigationListType = {
    title: string;
    link: string;
};
interface NavigationProps {
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
