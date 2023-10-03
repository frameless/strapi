import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';
type NavigationListType = {
    title: string;
    link: string;
};
interface NavigationListProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
    list: NavigationListType[];
    mobile?: boolean;
}
export declare const NavigationList: import("react").ForwardRefExoticComponent<Omit<PropsWithChildren<NavigationListProps>, "ref"> & import("react").RefAttributes<HTMLUListElement>>;
export {};
