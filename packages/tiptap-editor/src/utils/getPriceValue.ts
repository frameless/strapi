import { formatCurrency } from './formateCurrency';
import { PriceTypes } from '../components/extensions/Price';

export const getPriceValue = (price: PriceTypes, freeProduct: string) => {
  if (Number(price.value) === 0) {
    return freeProduct;
  }
  return formatCurrency(price);
};
