import { Option, Select } from '@strapi/design-system/Select';
import React from 'react';
import { useIntl } from 'react-intl';
import { PriceListTypes, PriceTypes } from '../../types';
import { formatCurrency, getTrad, isFreeProduct } from '../../utils';
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

  const handlePriceChange = (id: string) => {
    const selectedPrice = productPrice.price?.find((price) => price?.uuid === id);
    if (selectedPrice) {
      onPriceChange(selectedPrice);
    }
  };
  const isPriceHasUUID = productPrice?.price?.every((price) => price?.uuid);

  return (
    <Select
      required
      size="S"
      value={value}
      placeholder={formatMessage({ id: getTrad('components.priceList.placeholder') })}
      onChange={handlePriceChange}
    >
      {productPrice?.title && isPriceHasUUID && <Option value={productPrice?.title}>{productPrice?.title}</Option>}
      {!isPriceHasUUID && (
        <Option className="icon" value={getTrad('components.priceList.option.errorMessage')}>
          {formatMessage({
            id: getTrad('components.priceList.option.errorMessage'),
            defaultMessage: 'Please save the price collection to display the prices.',
          })}
        </Option>
      )}
      {productPrice?.price?.map(
        (price) =>
          price?.uuid && (
            <Option key={price.uuid} className="icon" value={price.uuid}>
              {formatMessage(
                { id: getTrad('components.priceList.option') },
                {
                  label: price.label,
                  value: isFreeProduct(price.value)
                    ? formatMessage({ id: getTrad('common.words.freeProduct'), defaultMessage: 'free' })
                    : formatCurrency(price),
                },
              )}
            </Option>
          ),
      )}
    </Select>
  );
};
