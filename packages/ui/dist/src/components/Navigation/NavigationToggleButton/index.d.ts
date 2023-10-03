import { ButtonHTMLAttributes } from 'react';
interface NavToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: 'hamburger' | 'close';
    text?: string;
}
export declare const NavToggleButton: import("react").ForwardRefExoticComponent<NavToggleButtonProps & {
    children?: import("react").ReactNode;
} & import("react").RefAttributes<HTMLButtonElement>>;
export {};
