'use client';

import classnames from 'classnames';
import Link from 'next/link';
import { Fragment, useState } from 'react';
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
  total: number;
  onReadMoreButtonClickHandler: (
    // eslint-disable-next-line no-unused-vars
    limit: number,
  ) => Promise<{ data: Product[]; pagination: any }>;
}

type PaginationType = {
  result: number;
  to: number;
};

type ProductsType = {
  data: { paginationInfo?: PaginationType | null; products: Product[] }[];
  total: number;
};

export const ProductListContainer = ({
  initialData,
  locale,
  onReadMoreButtonClickHandler,
  total,
}: ProductsListProps) => {
  const [productsList, setProductsList] = useState<ProductsType>({
    data: [{ paginationInfo: null, products: initialData }],
    total,
  });
  const [totalProducts, setTotalProducts] = useState(initialData);
  const { t } = useTranslation(locale, ['product-list-container-component', 'load-more-button']);
  return (
    <>
      <ProductsList>
        {productsList.data.map(({ paginationInfo, products }, index) => {
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
      {totalProducts.length !== productsList.total && (
        <LoadMoreButton
          locale={locale}
          onLoadMoreClick={async (pageIndex) => {
            onReadMoreButtonClickHandler(pageIndex).then(({ pagination, data }) => {
              setTotalProducts((prevArray) => {
                return [...prevArray, ...data];
              });
              if (data.length > 0) {
                setProductsList((prevArray) => {
                  return {
                    data: [
                      ...prevArray.data,
                      {
                        paginationInfo: {
                          to: totalProducts.length + data.length,
                          result: totalProducts.length + 1,
                        },
                        products: data,
                      },
                    ],
                    total: pagination.total,
                  };
                });
              }
            });
          }}
        >
          {t('load-more')}
        </LoadMoreButton>
      )}
    </>
  );
};
