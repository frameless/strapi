import React, { ReactNode } from 'react';
type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Spacing = 'sm' | 'md' | 'lg';
type JustifyContent = 'flex-start' | 'center' | 'flex-end' | 'space-between';
type AlignItems = 'flex-start' | 'center' | 'flex-end';
type FlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse';
export interface GridProps extends React.HTMLAttributes<HTMLElement> {
    children?: ReactNode;
    spacing?: Spacing;
    justifyContent?: JustifyContent;
    justifyContentSm?: JustifyContent;
    justifyContentMd?: JustifyContent;
    justifyContentLg?: JustifyContent;
    alignItems?: AlignItems;
    alignItemsSm?: AlignItems;
    alignItemsMd?: AlignItems;
    alignItemsLg?: AlignItems;
    flexDirection?: FlexDirection;
}
export interface GridCellProps extends React.HTMLAttributes<HTMLElement> {
    children: ReactNode;
    xs?: Cols;
    sm?: Cols;
    md?: Cols;
    lg?: Cols;
    justifyContent?: JustifyContent;
    justifyContentSm?: JustifyContent;
    justifyContentMd?: JustifyContent;
    justifyContentLg?: JustifyContent;
    alignItems?: AlignItems;
    alignItemsSm?: AlignItems;
    alignItemsMd?: AlignItems;
    alignItemsLg?: AlignItems;
}
export declare const Grid: React.ForwardRefExoticComponent<GridProps & {
    children?: React.ReactNode;
} & React.RefAttributes<HTMLDivElement>>;
export declare const GridCell: React.ForwardRefExoticComponent<GridCellProps & {
    children?: React.ReactNode;
} & React.RefAttributes<HTMLDivElement>>;
export {};
