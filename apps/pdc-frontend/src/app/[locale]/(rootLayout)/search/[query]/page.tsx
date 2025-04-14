import { buildURL, getPathAndSearchParams } from '@frameless/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSuggestedSearch } from '@/app/actions';
import { languages } from '@/app/i18n/settings';
import { Breadcrumbs, Grid, GridCell, Heading, ScrollToTopButton, UtrechtIconChevronUp } from '@/components';
import { ProductListContainer } from '@/components/ProductListContainer';
import { SurveyLink } from '@/components/SurveyLink';
import { buildAlternateLinks } from '@/util';
import { useTranslation } from '../../../../i18n/index';
type ParamsType = {
  locale: string;
  query: string;
};

interface SearchProps {
  params: ParamsType;
}

type Params = {
  params: {
    locale: string;
    query: string;
  };
};

export async function generateMetadata({ params: { locale, query } }: Params): Promise<Metadata> {
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

const Search = async ({ params: { locale, query } }: SearchProps) => {
  const { t } = await useTranslation(locale, ['search-page', 'common']);
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
  const surveyLinkURL = buildURL({
    translations: t,
    env: process.env,
    key: 'FRONTEND_PUBLIC_URL',
    segments: ['segments.search', query],
    locale,
  });

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
        Link={Link}
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
          <GridCell sm={8}>
            <SurveyLink segment={surveyLinkURL.href} t={t} env={process.env} />
          </GridCell>
          <GridCell sm={4} justifyContent="flex-end">
            <ScrollToTopButton Icon={UtrechtIconChevronUp}>{t('actions.scroll-to-top')}</ScrollToTopButton>
          </GridCell>
        </Grid>
      </main>
    </>
  );
};
export default Search;
