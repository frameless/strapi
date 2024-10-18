import type { Price } from '../types';

interface FormatCurrencyProps extends Pick<Price, 'currency' | 'value'> {
  locale?: string;
}

export const formatCurrency = ({ currency, locale = 'nl', value }: FormatCurrencyProps) => {
  if (currency && value) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(Number(value));
  }
  return null;
};
