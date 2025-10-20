import { buildURL, getPathAndSearchParams } from '@frameless/utils';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from 'next/link';
import { languages } from '@/app/i18n/settings';
import { Breadcrumbs, Grid, GridCell, Heading, ScrollToTopButton, UtrechtIconChevronUp } from '@/components';
import { KCMSurvey } from '@/components/KCMSurvey';
import { ProductListContainer } from '@/components/ProductListContainer';
import { SurveyLink } from '@/components/SurveyLink';
import { apiSettings, getStrapiGraphqlURL, mappingProducts, MappingProductsProps } from '@/util';
import { buildAlternateLinks, fetchData } from '@/util';
import { GetAllProductsSlugQueryQuery } from '../../../../../gql/graphql';
import { GET_ALL_PRODUCTS_SLUG } from '../../../../query';
import { useTranslation } from '../../../i18n';
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
    url: getStrapiGraphqlURL(),
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
  const url = buildURL({
    translations: t,
    env: process.env,
    key: 'FRONTEND_PUBLIC_URL',
    segments: ['segments.products'],
    locale,
  });

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${t('website-setting.website-name')}`,
      description,
      locale,
      url: url?.href,
      siteName: t('website-setting.website-name') || 'Gemeente Utrecht',
      countryName: 'NL',
      type: 'website',
    },
    alternates: {
      canonical: url?.href,
      languages: {
        ...buildAlternateLinks({ languages, segment: url?.href }),
      },
    },
  };
}

const Products = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { t } = await useTranslation(locale, ['products-page', 'common']);
  const nonce = headers().get('x-nonce') || '';
  const { pathSegments: productSegment } = getPathAndSearchParams({
    translations: t,
    segments: ['segments.products'],
    locale,
  });
  const surveyLinkURL = buildURL({
    translations: t,
    env: process.env,
    key: 'FRONTEND_PUBLIC_URL',
    segments: ['segments.products'],
    locale,
  });

  const { products } = await fetchAllProducts({ locale });
  const mappedProduct = mappingProducts(products?.data as MappingProductsProps[], productSegment);

  return (
    <>
      <Breadcrumbs
        label={
          t('components.breadcrumbs.ariaLabel', {
            defaultValue: 'Kruimelpad',
          }) as string
        }
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
            href: `/${productSegment}`,
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
      <main id="main">
        <Heading level={1}>{t('h1')}</Heading>
        {mappedProduct && mappedProduct.length > 0 && (
          <ProductListContainer
            showPaginationTitle
            locale={locale}
            total={products?.meta.pagination.total}
            initialData={mappedProduct}
          />
        )}
        <Grid justifyContent="space-between" spacing="sm">
          <GridCell sm={8}>
            <SurveyLink segment={surveyLinkURL.href} t={t} env={process.env} />
          </GridCell>
          <GridCell sm={4} justifyContent="flex-end">
            <ScrollToTopButton Icon={UtrechtIconChevronUp}>{t('actions.scroll-to-top')}</ScrollToTopButton>
          </GridCell>
          <KCMSurvey nonce={nonce} />
        </Grid>{' '}
      </main>
    </>
  );
};

export default Products;
