import { createContext } from 'react';
import { PriceListTypes } from '../../types';

export type FieldType = 'internal-field' | 'additional-information' | 'product';
export interface GetProductPriceProps {
  uuid: string;
  type: FieldType;
  uid: string;
}
type ProductPriceContextTypes = {
  error: string | null;
  busy: boolean;
  productPrice?: PriceListTypes;
  getProductPrice: ({ type, uid, uuid }: GetProductPriceProps) => void;
};

const ProductPriceContext = createContext<ProductPriceContextTypes>({
  error: null,
  busy: false,
  productPrice: undefined,
  getProductPrice: (_props: GetProductPriceProps) => {},
});

export default ProductPriceContext;
