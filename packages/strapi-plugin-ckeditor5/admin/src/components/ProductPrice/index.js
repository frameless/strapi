import React from 'react';

export const formatCurrency = (product, locale = 'nl') => {
  if (product) {
    const currency = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: product.currency,
    }).format(Number(product.value));
    return currency;
  }
};

export const ProductPriceList = ({ products, onChange, selectedValue }) => {
  return products && products.length > 0 ? (
    <select
      value={selectedValue}
      onChange={onChange}
      style={{
        position: 'relative',
        border: '1px solid #dcdce4',
        paddingRight: '12px',
        paddingLeft: '12px',
        paddingTop: '10px',
        paddingBottom: '12px',
        borderRadius: '4px',
        background: '#ffffff',
        outline: 'none',
        boxShadow: 0,
      }}
    >
      <option defaultChecked>Select price</option>
      {products.map((product) => (
        <option value={product.id} id={product.id} key={product.id}>
          {`${product.label}: ${formatCurrency(product)}`}
        </option>
      ))}
    </select>
  ) : null;
};
