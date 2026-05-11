import { buildURL, getPathAndSearchParams } from '@frameless/utils';
import type { Metadata } from 'next';
import { headers } from 'next/headers';

import { CheckAlphabeticallyProductsAvailabilityQuery, Product } from '../../../../../../../gql/graphql';

import { useTranslation } from '@/app/i18n';
import { languages } from '@/app/i18n/settings';
import { Breadcrumbs, Grid, GridCell, Heading, IndexCharNav, IndexCharNavLink, Paragraph } from '@/components';
import { KCMSurvey } from '@/components/KCMSurvey';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { ProductListContainer } from '@/components/ProductListContainer';
import { CHECK_ALPHABETICALLY_PRODUCTS_AVAILABILITY } from '@/query';
import {
  alphabet,
  apiSettings,
  getAlphabeticallyProductsByLetter,
  getStrapiGraphqlURL,
  mappingProducts,
  buildAlternateLinks,
} from '@/util';
import { fetchData } from '@/util/fetchData';
export const revalidate = 3600; // revalidate the data at most every hour

type Params = {
  params: Promise<{
    locale: string;
    q: string;
  }>;
};

export interface Fields {
  title: string;
  body: string;
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const { locale, q } = params;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ['alphabet-page', 'common']);
  const title = t('seo.title');
  const description = t('seo.description');
  const url = buildURL({
    translations: t,
    env: process.env,
    key: 'FRONTEND_PUBLIC_URL',
    segments: ['segments.products', 'segments.alphabet', q],
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

const ProductsAlphabetPage = async (props: Params) => {
  const params = await props.params;
  const { locale, q } = params;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ['alphabet-page', 'common']);
  const nonce = (await headers()).get('x-nonce') || '';
  const { products_connection } = await getAlphabeticallyProductsByLetter({
    locale,
    page: 1,
    pageSize: apiSettings.pagination.pageAlphabetSize,
    startsWith: q.toUpperCase(),
  });

  const productsAvailability = alphabet.map(async (letter) => {
    const { data } = await fetchData<{ data: CheckAlphabeticallyProductsAvailabilityQuery }>({
      url: getStrapiGraphqlURL(),
      query: CHECK_ALPHABETICALLY_PRODUCTS_AVAILABILITY,
      variables: { locale, startsWith: letter },
    });

    const isAvailable = data.products.length > 0;
    return {
      char: letter,
      disabled: !isAvailable,
      href: !isAvailable ? undefined : `${letter.toLocaleLowerCase()}`,
    };
  });
  const { pathSegments: productSegment } = getPathAndSearchParams({
    translations: t,
    segments: ['segments.products'],
    locale,
  });
  const { pathSegments: alphabetSegment } = getPathAndSearchParams({
    translations: t,
    segments: ['segments.products', 'segments.alphabet', q],
    locale,
  });

  const alphabetAvailability = await Promise.all(productsAvailability);
  const mappedProduct = mappingProducts(products_connection?.nodes as Product[], productSegment);

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
          {
            href: `/${alphabetSegment}`,
            label: t('components.breadcrumbs.label.alphabet'),
            current: true,
          },
        ]}
        backLink={{
          href: `/${productSegment}`,
          label: t('components.breadcrumbs.label.products'),
          current: false,
        }}
      />
      <main id="main">
        <Heading level={1}>{t('h1')}</Heading>
        <Paragraph lead>{t('lead-paragraph')}</Paragraph>
        <IndexCharNav
          component="link"
          currentChar={q.toUpperCase()}
          characters={alphabetAvailability}
          Link={IndexCharNavLink}
        />
        {mappedProduct && mappedProduct.length > 0 ? (
          <ProductListContainer
            locale={locale}
            total={products_connection?.pageInfo.total}
            initialData={mappedProduct}
            currentQuery={q.toUpperCase()}
          />
        ) : (
          <Paragraph>{t('product-notfound', { letter: q.toUpperCase() })}</Paragraph>
        )}
        <Grid justifyContent="space-between" spacing="sm">
          <GridCell>
            <KCMSurvey nonce={nonce} />
          </GridCell>
          <GridCell justifyContent="flex-end">
            <ScrollToTopButton>{t('actions.scroll-to-top')}</ScrollToTopButton>
          </GridCell>
        </Grid>
      </main>
    </>
  );
};

export default ProductsAlphabetPage;
