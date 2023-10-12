import { LiHTMLAttributes } from 'react';
interface NavigationItemProps extends LiHTMLAttributes<HTMLLIElement> {
    mobile?: boolean;
}
export declare const NavigationItem: import("react").ForwardRefExoticComponent<NavigationItemProps & {
    children?: import("react").ReactNode;
} & import("react").RefAttributes<HTMLLIElement>>;
export {};
