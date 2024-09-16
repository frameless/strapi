import { GET_PRICE_PRODUCT } from '../types';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case GET_PRICE_PRODUCT:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
