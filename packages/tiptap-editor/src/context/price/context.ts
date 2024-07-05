import { createContext } from 'react';
import type { Price } from '../../types';

type PriceData = {
  title: string;
  price: Price[];
};

type PriceContextTypes = {
  data?: PriceData;

  getPrice: (data: PriceData) => void;
};

const PriceContext = createContext<PriceContextTypes>({
  data: {
    title: '',
    price: [],
  },
  getPrice: () => {},
});

export default PriceContext;
