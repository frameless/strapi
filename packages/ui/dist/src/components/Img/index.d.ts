import React, { ComponentType } from 'react';
export interface ImgProps extends Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'ref'> {
    Image?: ComponentType<any>;
    figure?: string;
}
export declare const Img: React.ForwardRefExoticComponent<ImgProps & {
    children?: React.ReactNode;
} & React.RefAttributes<HTMLAnchorElement>>;
