import { useFetchClient, useNotification } from '@strapi/helper-plugin';
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
  const abortController = new AbortController();
  const toggleNotification = useNotification();
  const client = useFetchClient();

  const fetchInternalFieldByUUID = async (uuid?: string) => {
    try {
      const { data } = await client.get('/content-manager/collection-types/api::internal-field.internal-field', {
        params: {
          filters: {
            content: {
              uuid: {
                $eq: uuid,
              },
            },
          },
        },
        signal: abortController?.signal,
      });
      return data?.results[0]?.product;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      if (!abortController.signal.aborted) {
        toggleNotification({
          type: 'warning',
          message: { id: 'notification.error' },
        });

        return error;
      }
    }
    return null;
  };

  const getProductPrice = React.useCallback(async (pageId: string, internalFieldUUID?: string) => {
    if (!pageId && !internalFieldUUID) {
      dispatch({ type: GET_PRICE_PRODUCT, payload: [] });
      return;
    }
    try {
      const internalField = await fetchInternalFieldByUUID(internalFieldUUID);

      const res = await fetch(`${process.env.STRAPI_ADMIN_BACKEND_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: GET_PRODUCT_PRICES,
          variables: { pageId: pageId ? pageId : internalField?.uuid },
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
