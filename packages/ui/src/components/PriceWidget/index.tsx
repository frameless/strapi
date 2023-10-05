type PriceTypes = {
  value: string;
  label: string;
  currency: string;
  id: string;
};

type FormatCurrencyTypes = {
  price: number;
  currency: string;
  freeProductText?: string;
  locale?: string;
};
export function formatCurrency({ price, locale = 'nl', freeProductText = 'Gratis', currency }: FormatCurrencyTypes) {
  if (price === undefined) {
    throw new Error('Price is required');
  } else if (!currency) {
    throw new Error('Currency is required');
  }

  const freeProducts = price === 0;
  if (freeProducts) {
    return freeProductText;
  }

  const result = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(price);

  return result;
}

export const PriceWidget = ({
  priceData,
  locale,
  id,
  freeProductText,
}: {
  priceData?: PriceTypes[];
  locale: string;
  id?: string;
  freeProductText?: string;
}) => {
  if (id && priceData && priceData.length > 0) {
    const product = priceData.find(({ id: priceDataId }) => priceDataId === id);
    const price = formatCurrency({
      price: Number(product?.value),
      currency: product?.currency || 'EUR',
      locale,
      freeProductText,
    });
    return <data value={price}>{price}</data>;
  } else {
    return null;
  }
};
