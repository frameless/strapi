import { Option, Select } from '@strapi/design-system/Select';
import React from 'react';
import { formatCurrency } from '../../utils/formateCurrency';

export function PriceList({ editor, productPrice }) {
  if (productPrice && productPrice.price && productPrice.price.length === 0) {
    return null;
  }
  const title = `${productPrice?.title} price`;

  return (
    <Select
      required
      size="S"
      placeholder="Select Price"
      onChange={(event) => {
        const price = productPrice.price?.find(({ id }) => id === event);

        if (price && editor) {
          editor.chain().focus().insertReactComponent(price).run();
        }
      }}
    >
      {title && <Option value="price">{title}</Option>}
      {productPrice?.price?.map((price) => (
        <Option key={price.id} className="icon" value={price.id.toString()}>
          {`${price.label}: ${formatCurrency(price)}`}
        </Option>
      ))}
    </Select>
  );
}
