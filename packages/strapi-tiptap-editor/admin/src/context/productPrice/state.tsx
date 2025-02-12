import { useFetchClient, useNotification } from '@strapi/helper-plugin';
import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import Context, { GetProductPriceProps } from './context';
import { GET_PRODUCT_PRICES } from './queries';
import Reducer from './reducer';
import { GET_PRICE_PRODUCT, GET_PRICE_PRODUCT_ERROR } from '../types';

const fetchRelationalFieldsWithProductDataByUID = async ({
  uuid,
  uid,
  client,
  toggleNotification,
  signal,
}: {
  uuid: string;
  uid: string;
  client: any;
  toggleNotification: any;
  signal: AbortSignal;
}) => {
  try {
    const response = await client.get(`/content-manager/collection-types/${uid}`, {
      params: {
        filters: { content: { uuid: { $eq: uuid } } },
      },
      signal,
    });

    return response?.data?.results?.[0]?.product || null;
  } catch (error: any) {
    if (signal.aborted) return null; // Avoid logging if aborted

    toggleNotification({
      type: 'warning',
      message: { id: 'notification.error' },
    });

    return null;
  }
};

const fetchProductData = async (uuid: string) => {
  try {
    const response = await fetch(`${process.env.STRAPI_ADMIN_BACKEND_URL}/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: GET_PRODUCT_PRICES,
        variables: { pageId: uuid },
      }),
    });

    const { data } = await response.json();
    return data?.products?.data?.[0]?.attributes?.price?.data?.attributes || [];
  } catch (error) {
    return [];
  }
};

const State = (props: any) => {
  const initialState = { productPrice: [], error: null, busy: true };
  const [state, dispatch] = useReducer(Reducer, initialState);

  const abortControllerRef = useRef<AbortController | null>(null);
  const toggleNotification = useNotification();
  const client = useFetchClient();

  const getProductPrice = useCallback(
    async ({ type, uid, uuid }: GetProductPriceProps) => {
      if (!uuid) {
        dispatch({ type: GET_PRICE_PRODUCT, payload: [] });
        return;
      }

      // Ensure previous request is aborted before making a new one
      if (abortControllerRef.current) abortControllerRef.current.abort();
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        let productUuid = uuid;

        if (type === 'internal-field' || type === 'additional-information') {
          const relatedProduct = await fetchRelationalFieldsWithProductDataByUID({
            uuid,
            uid,
            client,
            toggleNotification,
            signal: abortController.signal,
          });

          if (relatedProduct?.uuid) {
            productUuid = relatedProduct.uuid;
          }
        }

        const data = await fetchProductData(productUuid);
        dispatch({ type: GET_PRICE_PRODUCT, payload: data });
      } catch (error) {
        dispatch({ type: GET_PRICE_PRODUCT_ERROR, payload: error });
      }
    },
    [client, toggleNotification],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
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
