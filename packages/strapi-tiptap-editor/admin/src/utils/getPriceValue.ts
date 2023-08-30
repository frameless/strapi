import { formatCurrency } from './formateCurrency';
import getTrad from './getTrad';
import { PriceTypes } from '../components/extensions/Price';

export const getPriceValue = (price: PriceTypes, freeProduct: string) => {
  if (Number(price.value) === 0) {
    return getTrad(freeProduct);
  }
  return formatCurrency(price);
};
