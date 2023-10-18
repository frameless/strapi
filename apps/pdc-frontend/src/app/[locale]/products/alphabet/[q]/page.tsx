import type { Metadata } from 'next';
import { useTranslation } from '@/app/i18n';
import { AdvancedLink, Article, PageTitle, Paragraph } from '@/components';
import { BottomBar, BottomBarItem } from '@/components/BottomBar';
import { Breadcrumbs } from '@/components/Breadcrumb';
import { ProductListContainer } from '@/components/ProductListContainer';
import { ProductNavigation } from '@/components/ProductNavigation';
import { alphabet } from '@/components/ProductNavigation/alphabet';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { CHECK_ALPHABETICALLY_PRODUCTS_AVAILABILITY, GET_ALPHABETICALLY_PRODUCTS_BY_LETTER } from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
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

const fetchAllProducts = async ({ locale, page, pageSize, startsWith }: fetchAllProductsTypes) => {
  const { data } = await fetchData({
    url: createStrapiURL(),
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
  const { t } = await useTranslation(locale, ['alphabet-page', 'common']);
  const limit = 10;
  const page = 1;
  const { products: res } = await fetchAllProducts({
    locale,
    page,
    pageSize: limit,
    startsWith: q.toLocaleUpperCase(),
  });

  const readMoreButtonAction = async (pageIndex: number) => {
    'use server';

    const { products } = await fetchAllProducts({
      locale,
      page: pageIndex + 1,
      pageSize: limit,
      startsWith: q.toLocaleUpperCase(),
    });

    return {
      data: mappingProducts(products.data),
      pagination: products.meta.pagination,
    };
  };

  const productsAvailability = alphabet.map(async (letter) => {
    const { data } = await fetchData({
      url: createStrapiURL(),
      query: CHECK_ALPHABETICALLY_PRODUCTS_AVAILABILITY,
      variables: { locale, startsWith: letter },
    });
    return { letter, availability: data.products.data.length > 0 ? true : false };
  });
  const alphabetAvailability = await Promise.all(productsAvailability);

  return (
    <>
      <Breadcrumbs
        links={[
          {
            href: 'https://www.utrecht.nl/',
            label: t('components.breadcrumbs.label.home'),
            current: false,
          },
          {
            href: '/',
            label: t('components.breadcrumbs.label.online-loket'),
            current: false,
          },
          {
            href: '/products',
            label: t('components.breadcrumbs.label.products'),
            current: false,
          },
          {
            href: `/products/alphabet/${q}`,
            label: t('components.breadcrumbs.label.alphabet'),
            current: true,
          },
        ]}
      />
      <Article>
        <PageTitle>{t('h1')}</PageTitle>
        <Paragraph lead>{t('lead-paragraph')}</Paragraph>
        <ProductNavigation component="button" currentLetter={q.toLocaleUpperCase()} alphabet={alphabetAvailability} />
        {mappingProducts(res.data) && mappingProducts(res.data).length > 0 ? (
          <ProductListContainer
            locale={locale}
            total={res.meta.pagination.total}
            initialData={mappingProducts(res.data)}
            onReadMoreButtonClickHandler={readMoreButtonAction}
          />
        ) : (
          <Paragraph>{t('product-notfound', { letter: q.toLocaleUpperCase() })}</Paragraph>
        )}
      </Article>
      <BottomBar>
        <BottomBarItem>
          <AdvancedLink
            rel="noopener noreferrer"
            external
            icon="arrow"
            color="red"
            href="https://www.kcmsurvey.com/qSwudd733b9c27c2e91ba8c7b598MaSd?webpagina=Alle%20producten"
          >
            {t('actions.reaction-link')}
          </AdvancedLink>
        </BottomBarItem>
        <BottomBarItem>
          <ScrollToTopButton>{t('actions.scroll-to-top')}</ScrollToTopButton>
        </BottomBarItem>
      </BottomBar>
    </>
  );
};

export default ProductsAlphabetPage;
