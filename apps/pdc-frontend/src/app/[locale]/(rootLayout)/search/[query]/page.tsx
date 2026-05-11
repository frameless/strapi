import { buildURL, getPathAndSearchParams } from '@frameless/utils';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { useTranslation } from '../../../../i18n/index';

import { getSuggestedSearch } from '@/app/actions';
import { languages } from '@/app/i18n/settings';
import { Grid, GridCell, Heading } from '@/components';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { KCMSurvey } from '@/components/KCMSurvey';
import { ProductListContainer } from '@/components/ProductListContainer';
import { buildAlternateLinks } from '@/util';
type ParamsType = {
  locale: string;
  query: string;
};

interface SearchProps {
  params: Promise<ParamsType>;
}

type Params = {
  params: Promise<{
    locale: string;
    query: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const { locale, query } = params;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ['search-page', 'common']);
  const decodeQuery = decodeURIComponent(query)?.trim();
  const title = t('seo.title', { query: decodeQuery, interpolation: { escapeValue: false } });
  const description = t('seo.description');

  const url = buildURL({
    translations: t,
    env: process.env,
    key: 'FRONTEND_PUBLIC_URL',
    segments: ['segments.search', decodeQuery],
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

const Search = async (props: SearchProps) => {
  const params = await props.params;
  const { locale, query } = params;
  const { t } = await useTranslation(locale, ['search-page', 'common']);
  const nonce = (await headers()).get('x-nonce') || '';
  const decodeQuery = decodeURIComponent(query)?.trim();
  const searchResults = await getSuggestedSearch(locale, decodeQuery);

  const { fullURL: tipsSegment } = getPathAndSearchParams({
    translations: t,
    segments: ['segments.search', 'tips'],
    queryParams: { query: decodeQuery },
    locale,
  });

  const { pathSegments: searchSegment } = getPathAndSearchParams({
    translations: t,
    segments: ['segments.search', decodeQuery],
    locale,
  });

  if (searchResults && searchResults.hits && searchResults.hits.length === 0) {
    redirect(`/${tipsSegment}`);
  }

  const results =
    searchResults.hits.length > 0
      ? searchResults.hits.map(({ url, fields }: any) => ({
          title: fields.title,
          url,
          body: fields.body,
        }))
      : [];

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
            href: `/${searchSegment}`,
            label: t('components.breadcrumbs.label.search'),
            current: true,
          },
        ]}
        backLink={{
          href: '/',
          label: t('components.breadcrumbs.label.online-loket'),
          current: false,
        }}
      />
      <main id="main">
        <Heading level={1}>{t('page-title', { query: decodeQuery, interpolation: { escapeValue: false } })}</Heading>
        <ProductListContainer
          currentQuery={decodeQuery}
          initialData={results}
          locale={locale}
          segment="search"
          showPaginationTitle
          showQuery
          total={searchResults.total}
        />
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
export default Search;
