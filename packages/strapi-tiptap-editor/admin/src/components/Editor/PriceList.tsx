import { Option, Select } from '@strapi/design-system/Select';
import type { Editor as EditorTypes } from '@tiptap/react';
import React from 'react';
import { formatCurrency } from '../../utils/formateCurrency';
import { PriceListTypes } from '../extensions/Price/index';

interface PriceListProps {
  editor: EditorTypes;
  productPrice: PriceListTypes;
}

export const PriceList = ({ editor, productPrice }: PriceListProps) => {
  if (productPrice && productPrice.price && productPrice.price.length === 0) {
    return null;
  }
  const title = `${productPrice?.title} price`;

  return (
    <Select
      required
      size="S"
      placeholder="Select Price"
      onChange={(event: string | number) => {
        const price = productPrice.price?.find(({ id }) => Number(id) === Number(event));

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
};
