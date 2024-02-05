import type { Metadata } from 'next';
import Link from 'next/link';
import { useTranslation } from '@/app/i18n';
import {
  AdvancedLink,
  Article,
  Breadcrumbs,
  Grid,
  GridCell,
  Heading,
  IndexCharNav,
  Paragraph,
  ScrollToTopButton,
  UtrechtIconChevronUp,
} from '@/components';
import { ProductListContainer } from '@/components/ProductListContainer';
import { CHECK_ALPHABETICALLY_PRODUCTS_AVAILABILITY } from '@/query';
import {
  alphabet,
  apiSettings,
  getAlphabeticallyProductsByLetter,
  mappingProducts,
  MappingProductsProps,
} from '@/util';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';
import { CheckAlphabeticallyProductsAvailabilityQuery } from '../../../../../../gql/graphql';
export const revalidate = 3600; // revalidate the data at most every hour

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

export async function generateMetadata({ params: { locale, q } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ['alphabet-page', 'common']);
  const title = t('seo.title');
  const description = t('seo.description');
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${t('website-setting.website-name')}`,
      description,
      locale,
      url: `${process.env.FRONTEND_PUBLIC_URL}/${locale}/search/${q}`,
      siteName: t('website-setting.website-name') || 'Gemeente Utrecht',
      countryName: 'NL',
      type: 'website',
    },
  };
}

const ProductsAlphabetPage = async ({ params: { locale, q } }: Params) => {
  const { t } = await useTranslation(locale, ['alphabet-page', 'common']);

  const { products } = await getAlphabeticallyProductsByLetter({
    locale,
    page: 1,
    pageSize: apiSettings.pagination.pageSize,
    startsWith: q.toUpperCase(),
  });

  const productsAvailability = alphabet.map(async (letter) => {
    const { data } = await fetchData<{ data: CheckAlphabeticallyProductsAvailabilityQuery }>({
      url: createStrapiURL(),
      query: CHECK_ALPHABETICALLY_PRODUCTS_AVAILABILITY,
      variables: { locale, startsWith: letter },
    });
    return {
      char: letter,
      disabled: data.products?.data && data.products.data.length > 0 ? false : true,
      href: `${letter.toLocaleLowerCase()}`,
    };
  });
  const alphabetAvailability = await Promise.all(productsAvailability);
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
          {
            href: `/products/alphabet/${q}`,
            label: t('components.breadcrumbs.label.alphabet'),
            current: true,
          },
        ]}
      />
      <Article>
        <Heading level={1}>{t('h1')}</Heading>
        <Paragraph lead>{t('lead-paragraph')}</Paragraph>
        <IndexCharNav component="link" currentChar={q.toUpperCase()} characters={alphabetAvailability} Link={Link} />
        {mappedProduct && mappedProduct.length > 0 ? (
          <ProductListContainer
            locale={locale}
            total={products?.meta.pagination.total}
            initialData={mappedProduct}
            currentQuery={q.toUpperCase()}
          />
        ) : (
          <Paragraph>{t('product-notfound', { letter: q.toUpperCase() })}</Paragraph>
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

export default ProductsAlphabetPage;
