'use client';

import classnames from 'classnames';
import Link from 'next/link';
import { Fragment, useReducer } from 'react';
import { setPageIndex } from '@/app/actions';
import { useTranslation } from '@/app/i18n/client';
import { LoadMoreButton, Markdown, ProductListItem, ProductListPaginationInfo, ProductsList } from '@/components';

type Product = {
  title: string;
  url: string;
  body?: string;
};

interface ProductsListProps {
  initialData: Product[];
  locale: string;
  total?: number;
  currentQuery?: string;
  segment?: string;
}

type PaginationType = {
  result: number;
  to: number;
};

type ProductsType = {
  data: { paginationInfo?: PaginationType | null; products: Product[] }[];
  total?: number;
};

const reducer = (state: any, action: any) => ({
  ...state,
  totalProducts: [...state.totalProducts, ...action.payload.data],
  productsList: action.payload.data.length > 0 && {
    data: [
      ...state.productsList.data,
      {
        paginationInfo: {
          to: state.totalProducts.length + action.payload.data.length,
          result: state.totalProducts.length + 1,
        },
        products: action.payload.data,
      },
    ],
    total: action.payload.pagination?.total,
  },
});

export const ProductListContainer = ({ initialData, locale, total, currentQuery, segment }: ProductsListProps) => {
  const { t } = useTranslation(locale, ['product-list-container-component', 'common']);
  const initialState = {
    productsList: {
      data: [{ paginationInfo: null, products: initialData }],
      total,
    },
    totalProducts: initialData,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const onLoadMoreClickHandler = async (pageIndex: number) => {
    // bind arguments to a Server Action https://nextjs.org/docs/app/api-reference/functions/server-actions#binding-arguments
    setPageIndex.bind(null, String(pageIndex), currentQuery as string, locale, segment);
    setPageIndex(String(pageIndex), currentQuery as string, locale, segment)
      .then(({ pagination, data }) => dispatch({ payload: { pagination, data } }))
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
      });
  };

  return (
    <>
      <ProductsList>
        {(state.productsList as ProductsType)?.data?.map(({ paginationInfo, products }, index) => {
          return (
            <Fragment key={index}>
              {paginationInfo?.result && paginationInfo.to && (
                <ProductListPaginationInfo>
                  {t('pagination-title', { result: paginationInfo?.result, to: paginationInfo?.to })}
                </ProductListPaginationInfo>
              )}
              {products &&
                products?.map(({ title, url, body }, index: number) => (
                  <ProductListItem key={index}>
                    {url && (
                      <Link
                        className={classnames('utrecht-link', 'utrecht-link--html-a')}
                        href={url}
                        locale={locale}
                        dangerouslySetInnerHTML={{ __html: title }}
                      />
                    )}
                    {body && <Markdown>{body}</Markdown>}
                  </ProductListItem>
                ))}
            </Fragment>
          );
        })}
      </ProductsList>
      {state.totalProducts.length !== state.productsList.total && (
        <LoadMoreButton locale={locale} onLoadMoreClick={onLoadMoreClickHandler}>
          {t('actions.load-more')}
        </LoadMoreButton>
      )}
    </>
  );
};
