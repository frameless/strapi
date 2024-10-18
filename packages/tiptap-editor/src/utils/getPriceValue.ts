import { formatCurrency } from './formateCurrency';
import type { Price } from '../types';

interface GetPriceValueProps extends Pick<Price, 'value' | 'currency'> {
  freeProduct: string;
}
export const getPriceValue = ({ value, currency, freeProduct }: GetPriceValueProps) => {
  let valueNumber = value;
  if (typeof value === 'string') {
    valueNumber = parseFloat(value);
  }
  if (valueNumber && valueNumber === 0) {
    return freeProduct;
  }
  return formatCurrency({ value: value, currency: currency });
};
