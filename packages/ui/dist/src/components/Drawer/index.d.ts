import { HTMLAttributes } from 'react';
interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
    onDrawerClose: () => void;
    open: boolean;
    initialFocus?: string | false;
}
export declare const Drawer: import("react").ForwardRefExoticComponent<DrawerProps & {
    children?: import("react").ReactNode;
} & import("react").RefAttributes<HTMLDivElement>>;
export {};
