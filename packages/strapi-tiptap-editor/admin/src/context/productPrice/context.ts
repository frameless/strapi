import { createContext } from 'react';

const ProductPriceContext = createContext({
  error: null,
  busy: '',
  productPrice: [],
  getProductPrice: (_pageId) => {},
});

export default ProductPriceContext;
