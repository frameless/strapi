import { GET_PRICE_PRODUCT, GET_PRICE_PRODUCT_ERROR } from '../types';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case GET_PRICE_PRODUCT:
      return {
        ...state,
        productPrice: action.payload,
        busy: false,
      };

    case GET_PRICE_PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload,
        busy: false,
      };
    default:
      return state;
  }
};

export default reducer;
