import { Option, Select } from '@strapi/design-system/Select';
import React from 'react';
import { useIntl } from 'react-intl';
import { getPriceValue, getTrad } from '../../utils';
import { PriceListTypes, PriceTypes } from '../extensions/Price/index';
interface PriceListProps {
  productPrice: PriceListTypes;
  // eslint-disable-next-line no-unused-vars
  onPriceChange: (selectedPrice: PriceTypes) => void;
  value: string;
}

export const PriceList = ({ productPrice, onPriceChange, value }: PriceListProps) => {
  const { formatMessage } = useIntl();
  if (productPrice && productPrice.price && productPrice.price.length === 0) {
    return null;
  }

  const handlePriceChange = (event: string | number) => {
    const selectedPrice = productPrice.price?.find(({ id }) => Number(id) === Number(event));
    if (selectedPrice) {
      onPriceChange(selectedPrice);
    }
  };

  return (
    <Select
      required
      size="S"
      value={value}
      placeholder={formatMessage({ id: getTrad('components.priceList.placeholder') })}
      onChange={handlePriceChange}
    >
      {productPrice?.title && <Option value={productPrice?.title}>{productPrice?.title}</Option>}
      {productPrice?.price?.map((price) => (
        <Option key={price.id} className="icon" value={price.id.toString()}>
          {formatMessage(
            { id: getTrad('components.priceList.option') },
            {
              label: price.label,
              value: formatMessage({ id: getPriceValue(price, 'common.words.freeProduct') }),
            },
          )}
        </Option>
      ))}
    </Select>
  );
};
