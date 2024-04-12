type ProductTypes = {
  currency: string;
  value: string;
};
export function formatCurrency(product: ProductTypes, locale = 'nl') {
  const currency =
    product &&
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: product.currency,
    }).format(Number(product.value));

  return currency;
}
