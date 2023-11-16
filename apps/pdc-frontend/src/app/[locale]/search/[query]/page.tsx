import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { AdvancedLink, Article, Heading } from '@/components';
import { BottomBar, BottomBarItem } from '@/components/BottomBar';
import { Breadcrumbs } from '@/components/Breadcrumb';
import { ProductListContainer } from '@/components/ProductListContainer';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { useTranslation } from '../../../i18n/index';
import { getSuggestedSearch } from '../actions';

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
  const title = t('seo.title', { query });
  const description = t('seo.description');
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${t('website-setting.website-name')}`,
      description,
      locale,
      url: `${process.env.FRONTEND_PUBLIC_URL}/${locale}/search/${query}`,
      siteName: t('website-setting.website-name') || 'Gemeente Utrecht',
      countryName: 'NL',
      type: 'website',
    },
  };
}
const mappingResults = (data: any) => {
  if (!data || data.length === 0) return [];
  return data.map(({ url, fields }: any) => ({
    title: fields.title,
    url,
    body: fields.body,
  }));
};

const Search = async ({ params: { locale, query } }: SearchProps) => {
  const { t } = await useTranslation(locale, ['search-page', 'common']);
  const searchResults = await getSuggestedSearch(locale, query);

  if (searchResults && searchResults.hits && searchResults.hits.length === 0) {
    redirect(`/search/tips/${query}`);
  }

  const results = mappingResults(searchResults.hits);

  const readMoreButtonAction = async (pageIndex: number) => {
    'use server';
    const searchResults = await getSuggestedSearch(locale, query, {
      page: pageIndex + 1,
      size: 5,
    });

    return {
      data: mappingResults(searchResults.hits),
      pagination: { total: searchResults.total },
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
            href: `/search/${query}`,
            label: t('components.breadcrumbs.label.search'),
            current: true,
          },
        ]}
      />
      <Article>
        <Heading level={1}>{t('h1', { query })}</Heading>
        <ProductListContainer
          locale={locale}
          total={searchResults.total}
          initialData={results}
          onReadMoreButtonClickHandler={readMoreButtonAction}
        />
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
export default Search;
