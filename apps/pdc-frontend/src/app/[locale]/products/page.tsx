import { Metadata } from 'next';
import Link from 'next/link';
import {
  AdvancedLink,
  Article,
  Breadcrumbs,
  Grid,
  GridCell,
  Heading,
  ScrollToTopButton,
  UtrechtIconChevronUp,
} from '@/components';
import { ProductListContainer } from '@/components/ProductListContainer';
import { apiSettings, mappingProducts, MappingProductsProps } from '@/util';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';
import { GetAllProductsSlugQueryQuery } from '../../../../gql/graphql';
import { GET_ALL_PRODUCTS_SLUG } from '../../../query';
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

const fetchAllProducts = async ({ locale }: { locale: string }) => {
  const { data } = await fetchData<{ data: GetAllProductsSlugQueryQuery }>({
    url: createStrapiURL(),
    query: GET_ALL_PRODUCTS_SLUG,
    variables: { locale, page: 1, pageSize: apiSettings.pagination.pageSize },
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

const Products = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { t } = await useTranslation(locale, ['products-page', 'common']);

  const { products } = await fetchAllProducts({ locale });
  const mappedProduct = mappingProducts(products?.data as MappingProductsProps[]);

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
        ]}
        backLink={{
          href: '/',
          label: t('components.breadcrumbs.label.online-loket'),
          current: false,
        }}
        Link={Link}
      />
      <Article>
        <Heading level={1}>{t('h1')}</Heading>
        {mappedProduct && mappedProduct.length > 0 && (
          <ProductListContainer locale={locale} total={products?.meta.pagination.total} initialData={mappedProduct} />
        )}
      </Article>
      <Grid justifyContent="space-between" spacing="sm">
        <GridCell sm={8}>
          <AdvancedLink
            rel="noopener noreferrer"
            external
            icon="arrow"
            color="red"
            href="https://www.kcmsurvey.com/qSwudd733b9c27c2e91ba8c7b598MaSd?webpagina=Alle%20producten"
          >
            {t('actions.reaction-link')}
          </AdvancedLink>
        </GridCell>
        <GridCell sm={4} justifyContent="flex-end">
          <ScrollToTopButton Icon={UtrechtIconChevronUp}>{t('actions.scroll-to-top')}</ScrollToTopButton>
        </GridCell>
      </Grid>
    </>
  );
};

export default Products;
