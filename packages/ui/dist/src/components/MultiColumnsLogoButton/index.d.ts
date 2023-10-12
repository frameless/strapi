import { LogoButtonProps } from '../LogoButton';
interface MultiColumnsButtonProps {
    columns: {
        title?: string;
        logoButton: LogoButtonProps[];
    }[];
}
export declare const MultiColumnsButton: ({ columns }: MultiColumnsButtonProps) => import("react/jsx-runtime").JSX.Element;
export {};
