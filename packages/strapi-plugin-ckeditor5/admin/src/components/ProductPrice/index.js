import React from "react";
import { Combobox, ComboboxOption } from "@strapi/design-system";


export const formatCurrency = (product, locale = 'nl') => {
    if (product) {
        const currency = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: product.currency,
        }).format(Number(product.value));
        return currency
    }
}

export const ProductPriceList = ({ products, onChange, selectedValue }) => {
    return (
        <Combobox label="Product price" value={selectedValue} onChange={onChange}>
            {products &&
                products.length > 0 &&
                products.map((product) => (
                    <ComboboxOption value={product.id} id={product.id} key={product.id}>
                        {`${product.label} ${formatCurrency(product)}`}
                    </ComboboxOption>
                ))}
        </Combobox>
    );
};
