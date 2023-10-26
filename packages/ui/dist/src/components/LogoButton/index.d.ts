export interface LogoButtonProps {
    logo: 'digid' | 'eherkenning' | 'eidas' | 'without_logo';
    appearance: 'primary' | 'secondary' | 'magenta';
    href: string;
    text: string;
    label: string;
    headingLevel?: number;
}
export declare const LogoButton: ({ logo, appearance, href, text, label, headingLevel }: LogoButtonProps) => import("react/jsx-runtime").JSX.Element | null;
