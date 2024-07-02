import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSuggestedSearch } from '@/app/actions';
import { languages } from '@/app/i18n/settings';
import {
  AdvancedLink,
  Breadcrumbs,
  Grid,
  GridCell,
  Heading,
  ScrollToTopButton,
  UtrechtIconChevronUp,
} from '@/components';
import { ProductListContainer } from '@/components/ProductListContainer';
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
  const url = `${process.env.FRONTEND_PUBLIC_URL}/${locale}/search/${decodeQuery}`;
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${t('website-setting.website-name')}`,
      description,
      locale,
      url,
      siteName: t('website-setting.website-name') || 'Gemeente Utrecht',
      countryName: 'NL',
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}/search/${decodeQuery}`,
      languages: {
        ...buildAlternateLinks({ languages, segment: `search/${decodeQuery}` }),
      },
    },
  };
}

const Search = async ({ params: { locale, query } }: SearchProps) => {
  const { t } = await useTranslation(locale, ['search-page', 'common']);
  const decodeQuery = decodeURIComponent(query)?.trim();
  const searchResults = await getSuggestedSearch(locale, decodeQuery);

  if (searchResults && searchResults.hits && searchResults.hits.length === 0) {
    redirect(`/search/tips?query=${decodeQuery}`);
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
            href: `/search/${decodeQuery}`,
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
        <Heading level={1}>{t('h1', { query: decodeQuery, interpolation: { escapeValue: false } })}</Heading>
        <h2>{decodeQuery}</h2>
        <ProductListContainer
          locale={locale}
          total={searchResults.total}
          initialData={results}
          currentQuery={decodeQuery}
          segment="search"
        />
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
      </main>
    </>
  );
};
export default Search;
