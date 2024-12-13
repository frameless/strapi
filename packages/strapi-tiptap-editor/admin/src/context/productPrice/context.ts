import { createContext } from 'react';
import { PriceListTypes } from '../../types';

type ProductPriceContextTypes = {
  error: string | null;
  busy: boolean;
  productPrice?: PriceListTypes;
  getProductPrice: (pageId: string, internalFieldUUID?: string) => void;
};

const ProductPriceContext = createContext<ProductPriceContextTypes>({
  error: null,
  busy: false,
  productPrice: undefined,
  getProductPrice: (_pageId: string, _internalFieldUUID?: string) => {},
});

export default ProductPriceContext;
