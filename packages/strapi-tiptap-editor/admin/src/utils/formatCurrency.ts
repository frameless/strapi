import { PriceTypes } from '../types';

type ProductPriceType = Pick<PriceTypes, 'currency' | 'value'>;

export function formatCurrency(product: ProductPriceType, locale = 'nl') {
  const currency =
    product &&
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: product.currency,
    }).format(product.value);

  return currency;
}
