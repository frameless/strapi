export const isFreeProduct = (value: number) => {
  let valueNumber = value;
  if (typeof value === 'string') {
    valueNumber = parseFloat(value);
  }
  return valueNumber === 0;
};
