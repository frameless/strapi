import { Metadata } from 'next';
import { Heading1 } from '@/components';
import { ProductListContainer } from '@/components/ProductListContainer';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';
import { GET_ALL_PRODUCTS_SLUG_FETCH } from '../../../query';
import { useTranslation } from '../../i18n';

export interface Fields {
  title: string;
  body: string;
}

type Params = {
  params: {
    locale: string;
  };
};

type fetchAllProductsTypes = {
  locale: string;
  page: number;
  pageSize: number;
};

type ProductAttributes = {
  title: string;
  slug: string;
  metaTags: {
    description: string;
  };
};

type Product = {
  attributes: ProductAttributes;
};

const mappingProducts = (products: Product[]): { title: string; url: string }[] | [] => {
  if (!products || products.length === 0) return [];
  return products.map(({ attributes }) => ({
    title: attributes.title,
    url: `/products/${attributes.slug}`,
    body: attributes?.metaTags?.description,
  }));
};

const fetchAllProducts = async ({ locale, page, pageSize }: fetchAllProductsTypes) => {
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_ALL_PRODUCTS_SLUG_FETCH,
    variables: { locale, page, pageSize },
  });
  return data;
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, 'products-page');
  return {
    title: t('seo.title'),
    description: t('seo.description'),
  };
}

const Products = async ({ params: { locale } }: { params: any }) => {
  const { t } = await useTranslation(locale, 'products-page');
  const limit = 10;
  const page = 1;
  const { products: res } = await fetchAllProducts({ locale, page, pageSize: limit });
  const readMoreButtonAction = async (pageIndex: number) => {
    'use server';

    const { products } = await fetchAllProducts({
      locale,
      page: pageIndex + 1,
      pageSize: limit,
    });

    return {
      data: mappingProducts(products.data),
      pagination: products.meta.pagination,
    };
  };

  return (
    <>
      <Heading1>{t('h1')}</Heading1>
      {mappingProducts(res.data) && mappingProducts(res.data).length > 0 && (
        <ProductListContainer
          locale={locale}
          total={res.meta.pagination.total}
          initialData={mappingProducts(res.data)}
          onReadMoreButtonClickHandler={readMoreButtonAction}
        />
      )}
    </>
  );
};

export default Products;
