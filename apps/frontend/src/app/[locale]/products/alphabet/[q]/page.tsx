import { Heading1, HeadingGroup, Paragraph } from '@utrecht/component-library-react';
import type { Metadata } from 'next';
import { useTranslation } from '@/app/i18n';
import { ProductListContainer } from '@/components/ProductListContainer';
import { ProductNavigation } from '@/components/ProductNavigation';
import {
  // CHECK_ALPHABETICALLY_PRODUCTS_AVAILABILITY,
  GET_ALPHABETICALLY_PRODUCTS_BY_LETTER,
} from '@/query';
import { fetchData } from '@/util/fetchData';

type Params = {
  params: {
    locale: string;
    q: string;
  };
};

export interface Fields {
  title: string;
  body: string;
}

type fetchAllProductsTypes = {
  locale: string;
  page: number;
  pageSize: number;
  startsWith: string;
};

type ProductAttributes = {
  title: string;
  slug: string;
};

type Product = {
  attributes: ProductAttributes;
};

const mappingProducts = (products: Product[]): { title: string; url: string }[] | [] => {
  if (!products || products.length === 0) return [];
  return products.map(({ attributes }) => ({
    title: attributes.title,
    url: `/products/${attributes.slug}`,
  }));
};

const fetchAllProducts = async ({ locale, page, pageSize, startsWith }: fetchAllProductsTypes) => {
  const { data } = await fetchData({
    url: process.env.STRAPI_BACKEND_URL as string,
    query: GET_ALPHABETICALLY_PRODUCTS_BY_LETTER,
    variables: { locale, page, pageSize, startsWith },
  });
  return data;
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, 'alphabet-page');
  return {
    title: t('seo.title'),
    description: t('seo.description'),
  };
}
const ProductsAlphabetPage = async ({ params: { locale, q } }: Params) => {
  const { t } = await useTranslation(locale, ['alphabet-page']);
  const limit = 10;
  const page = 1;
  const { products: res } = await fetchAllProducts({ locale, page, pageSize: limit, startsWith: q });

  const readMoreButtonAction = async (pageIndex: number) => {
    'use server';

    const { products } = await fetchAllProducts({
      locale,
      page: pageIndex + 1,
      pageSize: limit,
      startsWith: q,
    });

    return {
      data: mappingProducts(products.data),
      pagination: products.meta.pagination,
    };
  };
  // TODO check if we need to disable the unavailable product start with letter
  // If we do we have each time call the api to check the whole products and that maybe cause a performance issue
  // Check with utrecht if we can have this option in the search bar component

  // const productsAvailability = alphabet.map(async (letter) => {
  //   const { data } = await fetchData({
  //     url: process.env.STRAPI_BACKEND_URL as string,
  //     query: CHECK_ALPHABETICALLY_PRODUCTS_AVAILABILITY,
  //     variables: { locale, startsWith: letter.toLocaleLowerCase() },
  //   });
  //   return { letter, available: data.products.data.length };
  // });
  // const alphabetAvailability = await Promise.all(productsAvailability);

  return (
    <>
      <HeadingGroup>
        <Heading1>{t('h1')}</Heading1>
        <Paragraph lead>{t('lead-paragraph')}</Paragraph>
      </HeadingGroup>
      <ProductNavigation component="button" currentLetter={q.toLocaleUpperCase()} />
      {mappingProducts(res.data) && mappingProducts(res.data).length > 0 ? (
        <ProductListContainer
          locale={locale}
          total={res.meta.pagination.total}
          initialData={mappingProducts(res.data)}
          onReadMoreButtonClickHandler={readMoreButtonAction}
        />
      ) : (
        <Paragraph style={{ paddingBlock: '1rem' }}>
          {t('product-notfound', { letter: q.toLocaleUpperCase() })}
        </Paragraph> //TODO build a message component
      )}
    </>
  );
};

export default ProductsAlphabetPage;
