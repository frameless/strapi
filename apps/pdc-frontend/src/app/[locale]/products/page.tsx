import { Metadata } from 'next';
import { AdvancedLink, Article, Heading } from '@/components';
import { BottomBar, BottomBarItem } from '@/components/BottomBar';
import { Breadcrumbs } from '@/components/Breadcrumb';
import { ProductListContainer } from '@/components/ProductListContainer';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
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
  const { t } = await useTranslation(locale, ['products-page', 'common']);
  const title = t('seo.title');
  const description = t('seo.description');
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${t('website-setting.website-name')}`,
      description,
      locale,
      url: `${process.env.FRONTEND_PUBLIC_URL}/${locale}/products`,
      siteName: t('website-setting.website-name') || 'Gemeente Utrecht',
      countryName: 'NL',
      type: 'website',
    },
  };
}

const Products = async ({ params: { locale } }: { params: any }) => {
  const { t } = await useTranslation(locale, ['products-page', 'common']);
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
            current: true,
          },
        ]}
      />
      <Article>
        <Heading level={1}>{t('h1')}</Heading>
        {mappingProducts(res.data) && mappingProducts(res.data).length > 0 && (
          <ProductListContainer
            locale={locale}
            total={res.meta.pagination.total}
            initialData={mappingProducts(res.data)}
            onReadMoreButtonClickHandler={readMoreButtonAction}
          />
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

export default Products;
