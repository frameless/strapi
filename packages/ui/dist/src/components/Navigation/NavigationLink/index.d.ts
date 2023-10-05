import { AnchorHTMLAttributes } from 'react';
interface NavigationLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'placeholder'> {
    placeholder?: boolean;
    mobile?: boolean;
}
export declare const NavigationLink: import("react").ForwardRefExoticComponent<NavigationLinkProps & {
    children?: import("react").ReactNode;
} & import("react").RefAttributes<HTMLAnchorElement>>;
export {};
