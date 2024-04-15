import React, { useReducer } from 'react';
import Context from './context';
import { GET_PRODUCT_PRICES } from './queries';
import Reducer from './reducer';
import { GET_PRICE_PRODUCT, GET_PRICE_PRODUCT_ERROR } from '../types';

const State = (props: any) => {
  const initialState = {
    productPrice: [],
    error: null,
    busy: true,
  };

  const [state, dispatch] = useReducer(Reducer, initialState);
  const getProductPrice = React.useCallback(async (pageId: string) => {
    try {
      const res = await fetch(`${process.env.STRAPI_ADMIN_BACKEND_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: GET_PRODUCT_PRICES,
          variables: { pageId },
        }),
      });
      const { data } = await res.json();
      dispatch({ type: GET_PRICE_PRODUCT, payload: data.products.data[0]?.attributes?.price?.data?.attributes || [] });
    } catch (error) {
      dispatch({
        type: GET_PRICE_PRODUCT_ERROR,
        payload: error,
      });
    }
  }, []);

  return (
    <Context.Provider
      value={{
        error: state.error,
        productPrice: state.productPrice,
        busy: state.busy,
        getProductPrice,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export default State;
