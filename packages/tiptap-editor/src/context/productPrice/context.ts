import { createContext } from 'react';
import { PriceListTypes } from '../../components/extensions/Price';

type ProductPriceContextTypes = {
  error: string | null;
  busy: boolean;
  productPrice?: PriceListTypes;
  getProductPrice: (_pageId: string) => void;
};

const ProductPriceContext = createContext<ProductPriceContextTypes>({
  error: null,
  busy: false,
  productPrice: undefined,
  getProductPrice: (_pageId: string) => {},
});

export default ProductPriceContext;
