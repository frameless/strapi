import { Link as UtrechtLink } from '@utrecht/component-library-react/dist/css-module';
import React, { ComponentType } from 'react';
interface AdvancedLinkProps extends React.ComponentProps<typeof UtrechtLink> {
    hint?: 'danger';
    icon?: 'arrow';
    Link?: ComponentType<any>;
}
export declare const AdvancedLink: React.ForwardRefExoticComponent<Omit<React.PropsWithChildren<AdvancedLinkProps>, "ref"> & React.RefAttributes<HTMLAnchorElement>>;
export {};
