'use client';
import { Fragment, useState } from 'react';
import { useTranslation } from '@/app/i18n/client';
import { LoadMore } from '../LoadMore';
import { ProductListItem, ProductListPaginationInfo, ProductsList } from '../ProductList';

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
  const { t } = useTranslation(locale, ['product-list-container-component']);
  return (
    <>
      <ProductsList>
        {productsList.data.map(({ paginationInfo, products }, index) => {
          return (
            <Fragment key={index}>
              {paginationInfo?.result && paginationInfo.to && (
                <ProductListPaginationInfo
                  paginationTitle={t('pagination-title', { result: paginationInfo?.result, to: paginationInfo?.to })}
                />
              )}
              {products &&
                products.map(({ title, url, body }) => (
                  <ProductListItem href={url} text={title} locale={locale} key={url} body={body} />
                ))}
            </Fragment>
          );
        })}
      </ProductsList>
      {totalProducts.length !== productsList.total && (
        <LoadMore
          locale={locale}
          onClick={async (pageIndex) => {
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
        />
      )}
    </>
  );
};