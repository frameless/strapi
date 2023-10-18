type PriceTypes = {
    value: string;
    label: string;
    currency: string;
    id: string;
};
type FormatCurrencyTypes = {
    price: number;
    currency: string;
    freeProductText?: string;
    locale?: string;
};
export declare function formatCurrency({ price, locale, freeProductText, currency }: FormatCurrencyTypes): string;
export declare const PriceWidget: ({ priceData, locale, id, freeProductText, }: {
    priceData?: PriceTypes[] | undefined;
    locale: string;
    id?: string | undefined;
    freeProductText?: string | undefined;
}) => import("react/jsx-runtime").JSX.Element | null;
export {};
