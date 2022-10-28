import React from "react";
import { Combobox, ComboboxOption } from "@strapi/design-system";
export const ProductPriceList = ({ products, onChange, selectedValue }) => {
    return (
        <Combobox label="Product price" value={selectedValue} onChange={onChange}>
            {products &&
                products.length > 0 &&
                products.map(({ value, label, id, currency }) => (
                    <ComboboxOption value={id} id={id} key={id}>
                        {label} {currency} {value}
                    </ComboboxOption>
                ))}
        </Combobox>
    );
};
